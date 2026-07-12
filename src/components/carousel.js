import { useState, useEffect } from 'react';

const images = ["carousel_images/C1.jpeg", "carousel_images/C2.jpeg", "carousel_images/C3.jpeg", "carousel_images/C4.jpeg"];

// NOTE: must match the `heroFill` animation duration in globals.css (5s)
const SLIDE_MS = 5000;

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  // Autoplay: advance after SLIDE_MS unless hovered/paused
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % count), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current, paused, count]);

  const goTo = (i) => setCurrent(((i % count) + count) % count);

  return (
    <div className="carousel-container">
      <div
        className="hero-carousel media-frame"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides: blurred cover backdrop + full sharp image, crossfading */}
        {images.map((src, index) => (
          <div
            key={src}
            className={`hero-slide ${index === current ? 'is-active' : ''}`}
            aria-hidden={index !== current}
          >
            <div className="hero-slide-bg" style={{ backgroundImage: `url(${src})` }} />
            <img src={src} alt={`Lab highlight ${index + 1} of ${count}`} />
          </div>
        ))}

        {/* Slide counter chip */}
        <div className="hero-counter">{current + 1} / {count}</div>

        {/* Prev / Next (appear on hover) */}
        <button className="hero-arrow hero-arrow-prev" onClick={() => goTo(current - 1)} aria-label="Previous slide">
          &#8249;
        </button>
        <button className="hero-arrow hero-arrow-next" onClick={() => goTo(current + 1)} aria-label="Next slide">
          &#8250;
        </button>

        {/* Story-style segmented progress: one segment per image, active fills in real time */}
        <div className="hero-progress" role="tablist" aria-label="Slides">
          {images.map((_, index) => (
            <button
              key={index}
              className="hero-progress-seg"
              onClick={() => goTo(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                key={index === current ? `fill-${current}` : `idle-${index}`}
                className={index < current ? 'done' : index === current ? 'filling' : ''}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;