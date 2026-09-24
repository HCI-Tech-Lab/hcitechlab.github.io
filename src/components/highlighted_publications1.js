// Shared "Selected Publication" carousel + "Recent Publication" grid.
// Used on the homepage and on Research > Highlights.
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { research_temp } from '@/data/research_data';

// --- UPDATED COMPONENT: Selected Video Carousel ---
const SelectedCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleJumpTo = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
    setProgress(0);
  }, [activeIndex]);

  if (!items || items.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100" style={{ minHeight: '400px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
        <p className="text-muted">No items marked with play: "true"</p>
      </div>
    );
  }

  const activeItem = items[activeIndex];

  return (
    <div className="d-flex flex-column h-100">
      {/* 1. Header */}
      <div className="d-flex justify-content-between align-items-end mb-3">
        <h3 style={{ fontWeight: '800', margin: 0, color: '#333' }}>Selected Publication</h3>
        <Link href="/publications" className="section-link">
          All Publication ↗
        </Link>
      </div>

      {/* 2. Main Video Card */}
      <div style={{ 
        flex: 1,                 
        position: 'relative', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        backgroundColor: '#000', 
        minHeight: '400px',      
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <video
          ref={videoRef}
          src={activeItem.demo || activeItem.video}
          poster={activeItem.poster}
          style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'black' }} 
          muted
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
        />

        {/* Text Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '25px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
        }}>
          <span style={{ 
            backgroundColor: '#007bff', 
            color: '#fff', 
            padding: '3px 8px', 
            borderRadius: '4px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'inline-block'
          }}>
            {activeItem.conference || "Publication"}
          </span>

          <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}>
            {activeItem.title}
          </h4>
          <p style={{ color: '#ddd', fontSize: '0.9rem', margin: 0 }}>
            {activeItem.authors}
          </p>
        </div>
      </div>

      {/* 3. Progress Indicators (Thicker & Dynamic Width) */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginTop: '15px',
        alignItems: 'center',
        height: '14px' // Ensure container is tall enough for the thicker bars
      }}>
        {items.map((_, idx) => (
          <div 
            key={idx} 
            onClick={() => handleJumpTo(idx)}
            style={{ 
              // --- KEY CHANGE 1: Dynamic Width (Flex) ---
              // Active item takes 3x more space than inactive items
              flex: idx === activeIndex ? 3 : 1, 

              // --- KEY CHANGE 2: Thicker Height ---
              // Inactive: 6px, Active: 10px (you can adjust these numbers)
              height: idx === activeIndex ? '10px' : '6px', 
              
              backgroundColor: '#e0e0e0', 
              borderRadius: '5px', 
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              
              // Smooth transition for both width (flex) and height
              transition: 'all 0.4s ease-in-out' 
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              backgroundColor: '#555',
              // Fill logic remains the same
              width: idx < activeIndex ? '100%' : idx === activeIndex ? `${progress}%` : '0%',
              transition: idx === activeIndex ? 'width 0.1s linear' : 'none'
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

//HighlightedPublications
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
