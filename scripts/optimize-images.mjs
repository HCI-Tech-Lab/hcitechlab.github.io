/**
 * Batch image optimizer for the HCI Tech Lab website (static export / GitHub Pages).
 *
 * What it does:
 *  - Walks public/ for .jpg/.jpeg/.png files
 *  - Resizes anything wider than MAX_WIDTH down to MAX_WIDTH (no enlargement)
 *  - Recompresses JPEGs (mozjpeg, quality 78) and PNGs (palette, quality 85)
 *  - Overwrites the original ONLY if the new file is meaningfully smaller,
 *    so file paths in the code never change and nothing gets bigger
 *
 * Usage:
 *    npm run optimize:images
 *
 * Run it whenever you add new photos, then commit the changes.
 * It is safe to run repeatedly — already-optimized files are skipped.
 */

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public');
const MAX_WIDTH = 1600;          // widest any image is displayed on the site (incl. retina)
const MIN_BYTES = 200 * 1024;    // skip files under 200 KB — already cheap
const KEEP_RATIO = 0.95;         // only replace if new file is <95% of original size

const exts = new Set(['.jpg', '.jpeg', '.png']);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (exts.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let optimized = 0;
let skipped = 0;
let failed = 0;

for await (const file of walk(ROOT)) {
  try {
    const { size: before } = await fs.stat(file);
    if (before < MIN_BYTES) { skipped++; continue; }

    const ext = path.extname(file).toLowerCase();
    // rotate() bakes in EXIF orientation so photos don't flip after stripping metadata
    let img = sharp(file, { failOn: 'none' }).rotate();
    const meta = await img.metadata();

    if (meta.width && meta.width > MAX_WIDTH) {
      img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    img = ext === '.png'
      ? img.png({ palette: true, quality: 85, compressionLevel: 9 })
      : img.jpeg({ quality: 78, mozjpeg: true });

    const buf = await img.toBuffer();

    if (buf.length < before * KEEP_RATIO) {
      await fs.writeFile(file, buf);
      totalBefore += before;
      totalAfter += buf.length;
      optimized++;
      console.log(`✓ ${path.relative(ROOT, file)}  ${(before / 1e6).toFixed(2)} MB → ${(buf.length / 1e6).toFixed(2)} MB`);
    } else {
      skipped++;
    }
  } catch (err) {
    failed++;
    console.warn(`✗ ${path.relative(ROOT, file)}: ${err.message}`);
  }
}

console.log('\n──────────────────────────────────────');
console.log(`Optimized: ${optimized} files   Skipped: ${skipped}   Failed: ${failed}`);
console.log(`Size of optimized files: ${(totalBefore / 1e6).toFixed(1)} MB → ${(totalAfter / 1e6).toFixed(1)} MB`);
console.log(`Saved: ${((totalBefore - totalAfter) / 1e6).toFixed(1)} MB`);
