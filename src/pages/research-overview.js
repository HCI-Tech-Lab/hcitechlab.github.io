import { useState, useEffect, useRef, useCallback } from 'react';
import ResearchHeader from '@/components/research_header';

/*
 * HOW TO UPDATE THE SLIDES
 * 1. Export your lab overview presentation as images
 *    (PowerPoint: File > Export > JPEG; it names them Slide1.jpg, Slide2.jpg, ...)
 * 2. Put the images in:  public/overview_slides/
 * 3. Set SLIDE_COUNT below to the number of slides.
 * File names are case-sensitive on GitHub Pages, but if the extension case
 * doesn't match, the viewer automatically retries the other case (.PNG/.png).
 */
const SLIDE_COUNT = 12;
const SLIDE_DIR = '/overview_slides';
const SLIDE_EXT = 'webp';

// GitHub Pages is case-sensitive, so if Slide1.PNG is missing we retry Slide1.png
const ALT_EXT = SLIDE_EXT === SLIDE_EXT.toLowerCase() ? SLIDE_EXT.toUpperCase() : SLIDE_EXT.toLowerCase();
const slidePath = (i, useAlt) => `${SLIDE_DIR}/Slide${i + 1}.${useAlt ? ALT_EXT : SLIDE_EXT}`;
const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => slidePath(i, false));

export default function ResearchOverview() {
  const [current, setCurrent] = useState(0);
  const [broken, setBroken] = useState({});
  const [altCase, setAltCase] = useState({}); // slides whose file uses the other extension case
  const [isFullscreen, setIsFullscreen] = useState(false);   // native fullscreen (desktop, Android)
  const [pseudoFull, setPseudoFull] = useState(false);       // CSS fallback (iOS Safari/Chrome)
  const stageRef = useRef(null);
  const thumbsRef = useRef(null);
  const touchX = useRef(null);
  const count = slides.length;

  const goTo = useCallback((i) => setCurrent(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Preload neighboring slides so flipping feels instant
  useEffect(() => {
    [current + 1, current - 1].forEach((i) => {
      const img = new Image();
      img.src = slides[((i % count) + count) % count];
    });
  }, [current, count]);

  // Keep the active thumbnail centered in the strip (scrolls the strip only, never the page)
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip && strip.children[current];
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [current]);

  // Track native fullscreen state (webkit prefix covers older Safari on macOS)
  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  // While in the CSS fallback, lock page scroll and let Esc close it
  useEffect(() => {
    if (!pseudoFull) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setPseudoFull(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [pseudoFull]);

  const expanded = isFullscreen || pseudoFull;

  const toggleFullscreen = () => {
    const el = stageRef.current;
    const doc = document;

    // Already expanded: leave whichever mode we are in
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
      return;
    }
    if (pseudoFull) {
      setPseudoFull(false);
      return;
    }

    // iOS Safari / Chrome on iOS have no element fullscreen, so fall back to CSS
    const request = el && (el.requestFullscreen || el.webkitRequestFullscreen);
    if (!request) {
      setPseudoFull(true);
      return;
    }
    Promise.resolve(request.call(el))
      .then(() => {
        // Landscape is a much better fit for 16:9 slides on phones (Android only)
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      })
      .catch(() => setPseudoFull(true));
  };

  // Touch swipe on mobile
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  // First failure: retry with the other extension case. Second failure: show placeholder.
  const handleError = (i) => {
    if (!altCase[i]) setAltCase((a) => ({ ...a, [i]: true }));
    else setBroken((b) => ({ ...b, [i]: true }));
  };
  const srcFor = (i) => slidePath(i, Boolean(altCase[i]));

  return (
    <>
      <ResearchHeader current="overview" />

      <div className="container pb-5">
        <div className="mb-4">
          <span className="section-eyebrow">Lab overview</span>
          <h2 className="section-title">Research Highlights</h2>
          <p className="section-sub">A walkthrough of our research vision, themes, and recent work.</p>
        </div>

        <div className="deck">
          {/* Main stage */}
          <div
            ref={stageRef}
            className={`deck-stage ${pseudoFull ? 'is-pseudo-fullscreen' : ''}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {broken[current] ? (
              <div className="deck-missing">
                <i className="bi bi-image" />
                <div>Slide {current + 1}</div>
                <small>Add <code>public{slides[current]}</code></small>
              </div>
            ) : (
              <img
                key={`${current}-${altCase[current] ? 'alt' : 'std'}`}
                src={srcFor(current)}
                alt={`Lab overview slide ${current + 1} of ${count}`}
                onError={() => handleError(current)}
              />
            )}

            <button className="deck-arrow deck-arrow-prev" onClick={prev} aria-label="Previous slide">
              <i className="bi bi-chevron-left" />
            </button>
            <button className="deck-arrow deck-arrow-next" onClick={next} aria-label="Next slide">
              <i className="bi bi-chevron-right" />
            </button>

            <div className="deck-counter">{current + 1} / {count}</div>

            {expanded && (
              <button className="deck-close" onClick={toggleFullscreen} aria-label="Exit full screen">
                <i className="bi bi-x-lg" />
              </button>
            )}

            <button
              className="deck-fullscreen"
              onClick={toggleFullscreen}
              aria-label={expanded ? 'Exit full screen' : 'Full screen'}
            >
              <i className={`bi ${expanded ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="deck-thumbs" ref={thumbsRef}>
            {slides.map((src, i) => (
              <button
                key={src}
                className={`deck-thumb ${i === current ? 'current' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
              >
                {broken[i] ? (
                  <span className="deck-thumb-num">{i + 1}</span>
                ) : (
                  <img src={srcFor(i)} alt="" loading="lazy" decoding="async" onError={() => handleError(i)} />
                )}
              </button>
            ))}
          </div>

          <p className="deck-hint">Tip: use the ← → keys, swipe on mobile, or open full screen.</p>
        </div>
      </div>
    </>
  );
}
