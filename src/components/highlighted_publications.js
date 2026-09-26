// Shared "Selected Publication" carousel + "Recent Publication" grid.
// Used on the homepage and on Research > Highlights.
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { research_temp } from '@/data/research_data';

// --- UPDATED COMPONENT: Selected Video Carousel ---
// Short labels for the playlist: "HapticGen: Generative..." -> "HapticGen",
// "IEEE Transactions ... (TVCG/ISMAR2025)" -> "TVCG/ISMAR2025"
const shortTitle = (t = '') => (t.includes(':') ? t.split(':')[0].trim() : t);
const shortVenue = (v = '') => {
  const m = v.match(/\(([^)]+)\)\s*$/);
  return m ? m[1] : v;
};

// m:ss for the timeline tooltip
const fmtTime = (t) => {
  if (!Number.isFinite(t) || t < 0) return '0:00';
  const m = Math.floor(t / 60);
  const sec = Math.floor(t % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

// Selected Publication: video player + full playlist of every highlight video
const SelectedCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);      // 0-100
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);         // muted by default so autoplay is allowed
  const [hover, setHover] = useState(null);         // { x, f, t } while hovering the timeline
  const [scrubbing, setScrubbing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // native fullscreen
  const [pseudoFull, setPseudoFull] = useState(false);     // CSS fallback
  const [showInfo, setShowInfo] = useState(true);  // title overlay visibility
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const barRef = useRef(null);
  const infoTimer = useRef(null);
  const touchStart = useRef(null);

  const expanded = isFullscreen || pseudoFull;

  // ---------- playback ----------
  const handleVideoEnd = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!scrubbing && v && v.duration > 0) setProgress((v.currentTime / v.duration) * 100);
  };

  const handleJumpTo = (index) => {
    setActiveIndex(index);
    setProgress(0);
    setPaused(false);
  };

  const goNext = () => handleJumpTo((activeIndex + 1) % items.length);
  const goPrev = () => handleJumpTo((activeIndex - 1 + items.length) % items.length);

  // Title overlay: show it, then fade it out after `ms`
  const revealInfo = (ms = 3000) => {
    setShowInfo(true);
    clearTimeout(infoTimer.current);
    infoTimer.current = setTimeout(() => setShowInfo(false), ms);
  };

  // Each new video shows its title for 5 seconds
  useEffect(() => {
    revealInfo(5000);
  }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(infoTimer.current), []);

  // Swipe left/right to change videos (full screen only; ignores swipes that start on the timeline)
  const onPlayerTouchStart = (e) => {
    if (!expanded || e.target.closest('.hl-timeline, .hl-ctrl, .hl-nav')) {
      touchStart.current = null;
      return;
    }
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onPlayerTouchEnd = (e) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // horizontal, deliberate swipes only (so vertical drags and taps are ignored)
    if (Math.abs(dx) > 50 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  useEffect(() => {
    const v = videoRef.current;
    setDuration(0);
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    setProgress(0);
  }, [activeIndex]);

  // React's `muted` prop doesn't update reliably after mount, so set it directly
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, activeIndex]);

  // ---------- timeline: hover preview, click to seek, drag to scrub ----------
  const posAt = (clientX) => {
    const bar = barRef.current;
    if (!bar) return null;
    const r = bar.getBoundingClientRect();
    const f = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    return { f, x: f * r.width, width: r.width, t: f * (duration || 0) };
  };

  const seekTo = (pos) => {
    const v = videoRef.current;
    if (!v || !pos || !(v.duration > 0)) return;
    v.currentTime = pos.f * v.duration;
    setProgress(pos.f * 100);
  };

  const onBarPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
    setScrubbing(true);
    const pos = posAt(e.clientX);
    setHover(pos);
    seekTo(pos);
  };

  const onBarPointerMove = (e) => {
    const pos = posAt(e.clientX);
    setHover(pos);
    if (scrubbing) seekTo(pos);
  };

  const endScrub = (e) => {
    if (!scrubbing) return;
    e.currentTarget.releasePointerCapture && e.currentTarget.releasePointerCapture(e.pointerId);
    setScrubbing(false);
    if (e.pointerType !== 'mouse') setHover(null); // touch: hide tooltip after release
  };

  const onBarKeyDown = (e) => {
    const v = videoRef.current;
    if (!v || !(v.duration > 0)) return;
    if (e.key === 'ArrowRight') { v.currentTime = Math.min(v.duration, v.currentTime + 5); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { v.currentTime = Math.max(0, v.currentTime - 5); e.preventDefault(); }
  };

  // ---------- fullscreen: desktop, Android, iPad, iPhone ----------
  useEffect(() => {
    const onChange = () => {
      const el = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(Boolean(el && playerRef.current && el === playerRef.current));
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  // iPhone: the native video player reports its own enter/exit events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onBegin = () => setIsFullscreen(true);
    const onEnd = () => {
      setIsFullscreen(false);
      // iOS pauses the video when leaving its player; keep our button in sync
      setPaused(v.paused);
    };
    v.addEventListener('webkitbeginfullscreen', onBegin);
    v.addEventListener('webkitendfullscreen', onEnd);
    return () => {
      v.removeEventListener('webkitbeginfullscreen', onBegin);
      v.removeEventListener('webkitendfullscreen', onEnd);
    };
  }, []);

  // CSS fallback: lock page scroll while expanded
  useEffect(() => {
    if (!pseudoFull) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [pseudoFull]);

  // Keyboard shortcuts while expanded: Space play/pause, arrows seek, Esc exits fallback
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => {
      const v = videoRef.current;
      if (e.key === 'Escape' && pseudoFull) setPseudoFull(false);
      if (!v) return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); return; }
      if (e.key === 'n' || (e.shiftKey && e.key === 'ArrowRight')) { goNext(); return; }
      if (e.key === 'p' || (e.shiftKey && e.key === 'ArrowLeft')) { goPrev(); return; }
      if (e.key === 'ArrowRight' && v.duration > 0) v.currentTime = Math.min(v.duration, v.currentTime + 5);
      if (e.key === 'ArrowLeft') v.currentTime = Math.max(0, v.currentTime - 5);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, pseudoFull, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFullscreen = () => {
    const doc = document;
    const el = playerRef.current;
    const v = videoRef.current;

    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
      return;
    }
    if (pseudoFull) {
      setPseudoFull(false);
      return;
    }

    // 1) Desktop, Android, iPad: fullscreen the whole player (keeps our overlay + playlist-driven controls)
    const request = el && (el.requestFullscreen || el.webkitRequestFullscreen);
    if (request) {
      Promise.resolve(request.call(el))
        .then(() => {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(() => {});
          }
        })
        .catch(() => setPseudoFull(true));
      return;
    }

    // 2) iPhone (Safari and Chrome): only the native video player can go fullscreen
    if (v && v.webkitEnterFullscreen) {
      try {
        v.webkitEnterFullscreen();
        return;
      } catch (err) {
        /* fall through to the CSS fallback */
      }
    }

    // 3) Anything else (e.g. some in-app browsers): CSS fullscreen
    setPseudoFull(true);
  };

  if (!items || items.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100" style={{ minHeight: '400px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
        <p className="text-muted">No items marked with play: "true"</p>
      </div>
    );
  }

  const activeItem = items[activeIndex];

  // keep the hover tooltip inside the bar
  const tipLeft = hover ? Math.min(Math.max(hover.x, 22), hover.width - 22) : 0;

  return (
    <div className="d-flex flex-column h-100">
      {/* 1. Header */}
      <div className="d-flex justify-content-between align-items-end mb-3">
        <h3 style={{ fontWeight: '800', margin: 0, color: '#333' }}>Selected Publication</h3>
        <Link href="/publications" className="section-link">
          All Publication ↗
        </Link>
      </div>

      {/* 2. Player */}
      <div
        ref={playerRef}
        className={`hl-player ${pseudoFull ? 'is-pseudo-fullscreen' : ''} ${scrubbing ? 'is-scrubbing' : ''}`}
        onMouseMove={() => revealInfo(3000)}
        onTouchStart={onPlayerTouchStart}
        onTouchEnd={onPlayerTouchEnd}
      >
        <video
          ref={videoRef}
          src={activeItem.demo || activeItem.video}
          poster={activeItem.poster}
          muted
          playsInline
          autoPlay
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onEnded={handleVideoEnd}
        />

        <div className="hl-chip">
          Now playing {activeIndex + 1} / {items.length}
        </div>

        <div className="hl-controls">
          <button className="hl-ctrl" onClick={togglePlay} aria-label={paused ? 'Play video' : 'Pause video'}>
            <i className={`bi ${paused ? 'bi-play-fill' : 'bi-pause-fill'}`} />
          </button>
          <button className="hl-ctrl" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'}>
            <i className={`bi ${muted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`} />
          </button>
          <button className="hl-ctrl" onClick={toggleFullscreen} aria-label={expanded ? 'Exit full screen' : 'Full screen'}>
            <i className={`bi ${expanded ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`} />
          </button>
        </div>

        <div className={`hl-overlay ${showInfo || paused || scrubbing ? '' : 'is-hidden'}`}>
          <span className="hl-venue">{activeItem.conference || 'Publication'}</span>
          <h4 className="hl-title">{activeItem.title}</h4>
          <p className="hl-authors">{activeItem.authors}</p>
        </div>

        {/* Previous / next video (full screen) */}
        {expanded && items.length > 1 && (
          <>
            <button className="hl-nav hl-nav-prev" onClick={goPrev} aria-label="Previous video">
              <i className="bi bi-chevron-left" />
            </button>
            <button className="hl-nav hl-nav-next" onClick={goNext} aria-label="Next video">
              <i className="bi bi-chevron-right" />
            </button>
          </>
        )}

        {/* Scrubbable timeline */}
        <div
          ref={barRef}
          className="hl-timeline"
          role="slider"
          tabIndex={0}
          aria-label="Seek video"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round((progress / 100) * duration)}
          aria-valuetext={`${fmtTime((progress / 100) * duration)} of ${fmtTime(duration)}`}
          onPointerDown={onBarPointerDown}
          onPointerMove={onBarPointerMove}
          onPointerUp={endScrub}
          onPointerCancel={endScrub}
          onPointerLeave={() => { if (!scrubbing) setHover(null); }}
          onKeyDown={onBarKeyDown}
        >
          <div className="hl-track">
            {hover && <div className="hl-track-hover" style={{ width: `${hover.f * 100}%` }} />}
            <div className="hl-track-fill" style={{ width: `${progress}%` }} />
            <div className="hl-knob" style={{ left: `${progress}%` }} />
          </div>
          {hover && duration > 0 && (
            <div className="hl-tooltip" style={{ left: `${tipLeft}px` }}>
              {fmtTime(hover.t)} / {fmtTime(duration)}
            </div>
          )}
        </div>
      </div>

      {/* 3. Playlist: every highlight video visible at once */}
      <div className="hl-playlist-head">
        <span className="project-label">All highlight videos · {items.length}</span>
      </div>
      <div className="hl-playlist" role="list">
        {items.map((item, idx) => (
          <button
            key={`${item.title}-${idx}`}
            role="listitem"
            className={`hl-item ${idx === activeIndex ? 'current' : ''}`}
            onClick={() => handleJumpTo(idx)}
            title={item.title}
            aria-current={idx === activeIndex}
          >
            <div className="hl-thumb">
              {item.poster ? (
                <img src={item.poster} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className="hl-thumb-fallback"><i className="bi bi-play-circle" /></span>
              )}
              {idx === activeIndex ? (
                <span className="hl-thumb-badge"><i className={`bi ${paused ? 'bi-pause-fill' : 'bi-play-fill'}`} /></span>
              ) : (
                <span className="hl-thumb-hover"><i className="bi bi-play-fill" /></span>
              )}
              {idx === activeIndex && <span className="hl-thumb-progress" style={{ width: `${progress}%` }} />}
            </div>
            <span className="hl-item-title">{shortTitle(item.title)}</span>
            <span className="hl-item-venue">{shortVenue(item.conference || '')}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const HighlightedPublications = ({ showHeader = true }) => {
  // 1. Flatten Data
  const allResearch = Object.keys(research_temp)
    .sort((a, b) => b - a)
    .flatMap(year => research_temp[year]);
  
  // 2. Filter: Carousel Items (Only items with play: "true" or true)
const carouselItems = allResearch
    .filter(item => item.play === "true" || item.play === true)
    // SORT LOGIC: Sorts by playOrder (1, 2, 3...). Items without playOrder go to the end.
    .sort((a, b) => {
        const orderA = a.playOrder || 999; // Default to 999 if undefined
        const orderB = b.playOrder || 999;
        return orderA - orderB;
    });
      
  // 3. Filter: Grid Items (Take the top 4 items that are NOT in the carousel)
  // We exclude carousel items to avoid showing duplicates
  const carouselTitles = new Set(carouselItems.map(item => item.title));
  const gridItems = allResearch
    .filter(item => item.highlight === true)     // <--- USER REQUEST: Only non-highlighted items
    .filter(item => !carouselTitles.has(item.title))
    .slice(0, 4);

  return (
    <div className="col-12">
      <div className="container">
        
        {/* Section Header (hidden on the Research > Highlights page, which has its own banner) */}
        {showHeader && (
          <div className="mb-4">
            <span className="section-eyebrow">Selected work</span>
            <h2 className="section-title">Research</h2>
            <p className="section-sub">Highlighted &amp; Recent Publications from HCI Tech Lab</p>
          </div>
        )}

        {/* --- SPLIT LAYOUT SECTION --- */}
        {/* 'align-items-stretch' ensures Left and Right columns are same height */}
        <div className="row align-items-stretch">
          
          {/* LEFT COLUMN: Carousel */}
          {/* mb-4 mb-lg-0 adds spacing on mobile, but removes it on desktop */}
          <div className="col-lg-6 col-12 mb-4 mb-lg-0">
            <SelectedCarousel items={carouselItems} />
          </div>

          {/* RIGHT COLUMN: 2x2 Grid */}
          <div className="col-lg-6 col-12">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <h3 style={{ fontWeight: '800', margin: 0, color: '#333' }}>Recent Publication</h3>
              <Link href="/publications" className="section-link">
                All Publication ↗
              </Link>
            </div>
            <div className="row h-100"> {/* h-100 ensures the inner row fills the column */}
              {gridItems.map((item, index) => (
                <div key={index} className="col-md-6 col-12 mb-4">
                  <div className="news-grid-card h-100" style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Video/Preview (uniform 16:9 frame with blurred fill) */}
                    <div className="pub-media mb-2">
                      {item.poster && <div className="pub-media-bg" style={{ backgroundImage: `url(${item.poster})` }} />}
                      <video 
                        muted 
                        playsInline 
                        autoPlay 
                        loop
                        poster={item.poster}
                      >
                        <source type="video/mp4" src={item.demo || item.video} />
                      </video>
                    </div>

                    {/* Content */}
                    <div>
                      <h6 style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '8px', lineHeight: '1.3' }}>
                        {item.title}
                      </h6>
                      
                      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '5px' }}>
                         {item.conference}
                      </div>

                      {/* Compact Links */}
                      <div className="d-flex flex-wrap gap-2 mt-2" style={{ fontSize: '0.75rem' }}>
                        {item.award &&  <h6 className="d-flex align-items-center">
                                                <img
                                                    src="/img/icon/award_small.png"
                                                    alt="award"
                                                    style={{ width: "20px", height: "20px", marginRight: "5px" }}
                                                    />
                                                <b>AWARD:&nbsp;</b> {item.award}</h6>}
                        {item.website && <Link className="publication-link" href={item.website} target="_blank">Project Website</Link>}
                        {item.doi && <Link className="publication-link" href={item.doi} target="_blank">DOI</Link>}
                        {item.video && <Link className="publication-link" href={item.video} target="_blank">Video</Link>}
                        {item.pdf && <Link className="publication-link" href={item.pdf} target="_blank">PDF</Link>}
                        {item.media && <Link className="publication-link" href={item.media} target="_blank">MEDIA</Link>}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightedPublications;
