/**
 * Builds 3:2 (9:6) logo banners for news items from official logo files.
 *
 *   1. Put an official logo in scripts/news-logos/<key>.png (or .svg / .jpg / .webp)
 *      using a key listed in scripts/news-logos/manifest.json.
 *   2. Run:  node scripts/make-news-banners.mjs
 *
 * Every banner whose logo(s) exist is (re)written at the path in the manifest,
 * which is the same path news_data.js already uses, so no data edits are needed.
 * Banners whose logos are still missing are left untouched (they keep the
 * text banner) and are listed at the end.
 */
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const W = 1200;
const H = 800; // 3:2 (9:6)
const LOGO_DIR = 'scripts/news-logos';
const MANIFEST = path.join(LOGO_DIR, 'manifest.json');
const EXTS = ['.svg', '.png', '.jpg', '.jpeg', '.webp'];

const exists = (p) => fs.access(p).then(() => true, () => false);

async function findLogo(key) {
  for (const ext of EXTS) {
    const p = path.join(LOGO_DIR, key + ext);
    if (await exists(p)) return p;
  }
  return null;
}

// Background = the logo's own corner colour when it's opaque (so a logo on a
// light-grey card blends seamlessly), otherwise white.
async function cornerColour(file) {
  const { data, info } = await sharp(file, { density: 300 })
    .ensureAlpha()
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const [r, g, b, a] = data;
  if (info.channels === 4 && a < 250) return { r: 255, g: 255, b: 255 };
  // only accept near-white backgrounds; anything darker falls back to white
  return r > 225 && g > 225 && b > 225 ? { r, g, b } : { r: 255, g: 255, b: 255 };
}

// Trim the logo's empty margin so every logo is sized by its visible artwork,
// then fit it inside the given box.
async function prepLogo(file, maxW, maxH) {
  let input = await sharp(file, { density: 300 }).ensureAlpha().png().toBuffer();
  try {
    input = await sharp(input).trim({ threshold: 18 }).png().toBuffer();
  } catch {
    /* nothing to trim */
  }
  const { data, info } = await sharp(input)
    .resize({ width: maxW, height: maxH, fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { buf: data, w: info.width, h: info.height };
}

async function render(out, logoFiles) {
  const bg = logoFiles.length === 1 ? await cornerColour(logoFiles[0]) : { r: 255, g: 255, b: 255 };
  let layers = [];
  if (logoFiles.length === 1) {
    const l = await prepLogo(logoFiles[0], 1100, 620);
    layers = [{ input: l.buf, left: Math.round((W - l.w) / 2), top: Math.round((H - l.h) / 2) }];
  } else {
    // two (or more) logos side by side
    const GAP = 60;
    const boxW = Math.floor((1120 - GAP * (logoFiles.length - 1)) / logoFiles.length);
    const ls = await Promise.all(logoFiles.map((f) => prepLogo(f, boxW, 420)));
    const total = ls.reduce((s, l) => s + l.w, 0) + GAP * (ls.length - 1);
    let x = Math.round((W - total) / 2);
    layers = ls.map((l) => {
      const layer = { input: l.buf, left: x, top: Math.round((H - l.h) / 2) };
      x += l.w + GAP;
      return layer;
    });
  }
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 4, background: { ...bg, alpha: 1 } } })
    .composite(layers)
    .flatten({ background: bg })
    .webp({ quality: 90 })
    .toFile(out);
}

const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
const missing = {};
let made = 0;

for (const [banner, entry] of Object.entries(manifest.banners)) {
  const files = await Promise.all(entry.logos.map(findLogo));
  if (files.some((f) => !f)) {
    entry.logos.forEach((k, i) => { if (!files[i]) (missing[k] ||= []).push(entry.news); });
    continue;
  }
  await render(path.join('public', banner), files);
  made++;
}

console.log(`Logo banners written: ${made}`);
const keys = Object.keys(missing);
if (keys.length) {
  console.log(`\nStill using text banners — add these logos to ${LOGO_DIR}/ to upgrade them:`);
  for (const k of keys.sort()) console.log(`  ${k.padEnd(16)} ← ${missing[k].join('; ')}`);
}
