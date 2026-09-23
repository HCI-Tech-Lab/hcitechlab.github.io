import { useState, useEffect, useRef, useCallback } from 'react';
import ResearchHeader from '@/components/research_header';

/*
 * HOW TO UPDATE THE SLIDES
 * 1. Export your lab overview presentation as images
 *    (PowerPoint: File > Export > JPEG; it names them Slide1.jpg, Slide2.jpg, ...)
 * 2. Put the images in:  public/overview_slides/
 * 3. Set SLIDE_COUNT below to the number of slides.
 * File names are case-sensitive on GitHub Pages (Slide1.jpg is not Slide1.JPG).
 */
const SLIDE_COUNT = 9;
const SLIDE_DIR = '/overview_slides';
const SLIDE_EXT = 'png';

const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => `${SLIDE_DIR}/Slide${i + 1}.${SLIDE_EXT}`);

export default function ResearchOverview() {
  const [current, setCurrent] = useState(0);
  const [broken, setBroken] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  // Track fullscreen state
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stageRef.current && stageRef.current.requestFullscreen) stageRef.current.requestFullscreen();
  };

  // Touch swipe on mobile
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  const markBroken = (i) => setBroken((b) => ({ ...b, [i]: true }));

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
            className="deck-stage"
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
                key={current}
                src={slides[current]}
                alt={`Lab overview slide ${current + 1} of ${count}`}
                onError={() => markBroken(current)}
              />
            )}

            <button className="deck-arrow deck-arrow-prev" onClick={prev} aria-label="Previous slide">
              <i className="bi bi-chevron-left" />
            </button>
            <button className="deck-arrow deck-arrow-next" onClick={next} aria-label="Next slide">
              <i className="bi bi-chevron-right" />
            </button>

            <div className="deck-counter">{current + 1} / {count}</div>

            <button
              className="deck-fullscreen"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
            >
              <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`} />
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
                  <img src={src} alt="" loading="lazy" decoding="async" onError={() => markBroken(i)} />
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
