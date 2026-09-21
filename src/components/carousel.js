import { useState, useEffect } from 'react';

// Carousel slides. `title` and `subtitle` are optional — when set, they are
// overlaid on the image automatically. A plain string (just the path) also works.
const slides = [
  { src: "carousel_images/C1.jpeg", title: "Graduation Ceremony, KAIST", subtitle: "Feb, 2026" },
  { src: "carousel_images/C01.jpeg", title: "Graduation Ceremony, KAIST", subtitle: "Feb, 2024" },
  { src: "carousel_images/CHI1.jpg", title: "CHI, Spain", subtitle: "May,2026" },
  { src: "carousel_images/Brain1.jpg", title: "BrainLink, Korea", subtitle: "Aug, 2026" },
  { src: "carousel_images/C2.jpeg", title: "CHI(Japan) & UIST(Korea)", subtitle: "2025" },
  { src: "carousel_images/KCC1.jpg", title: "KCC, Jeju", subtitle: "Jul,2025" },
  { src: "carousel_images/WHC4.jpg", title: "World Haptics Conference, Korea", subtitle: "Jul,2025" },
  { src: "carousel_images/Workshop1.jpg", title: "CHI Workshop", subtitle: "Apr, 2025" },
  { src: "carousel_images/C02.jpeg", title: "CHI, Hawaii", subtitle: "May, 2024" },
  { src: "carousel_images/C3.jpeg", title: "HCI Tech Lab, KAIST", subtitle: "" },
  { src: "carousel_images/Equipment.jpeg", title: "HCI Tech Lab, KAIST", subtitle: "" },
  { src: "carousel_images/2023.jpg", title: "HCI Tech Lab, KAIST", subtitle: "2023" },
  { src: "carousel_images/C4.jpeg", title: "HCI Tech Lab Research", subtitle: "" },

  // Example:
  // { src: "carousel_images/AAAI.jpg", title: "AAAI, Singapore", subtitle: "January, 2026" },
];

// Normalize so plain strings and objects are both accepted
const images = slides.map((s) => (typeof s === 'string' ? { src: s } : s));

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
        {images.map(({ src, title, subtitle }, index) => (
          <div
            key={src}
            className={`hero-slide ${index === current ? 'is-active' : ''}`}
            aria-hidden={index !== current}
          >
            <div className="hero-slide-bg" style={{ backgroundImage: `url(${src})` }} />
            <img src={src} alt={title || `Lab highlight ${index + 1} of ${count}`} />

            {/* Caption overlay (only when a title or subtitle is set) */}
            {(title || subtitle) && (
              <div className="hero-caption">
                {title && <div className="hero-caption-title">{title}</div>}
                {subtitle && <div className="hero-caption-sub">{subtitle}</div>}
              </div>
            )}
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