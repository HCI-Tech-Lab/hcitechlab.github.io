import Carousel from "@/components/carousel";
import Link from 'next/link';
import {news} from '../data/news_data';
import { research_temp } from "@/data/research_data";
import { useState, useRef, useEffect } from 'react';

// MainBody
export default function Home() {
  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      
      {/* SECTION 1: Welcome & Carousel (White Background) */}
      <div style={{ backgroundColor: '#ffffff', width: '100%', padding: '15px 0' }}>
        <div className="container">
          <div className="row align-items-stretch">
            <WelcomeCard />
            <div className="col-lg-7 col-md-12">
              <Carousel />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: News (Light Gray Background) */}
      <div style={{ 
        backgroundColor: '#ebf3f8ff', width: '100%', padding: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <NewsCard />
        </div>
      </div>

      {/* SECTION 3: Highlighted Publications (Light Gray Background) */}
      <div style={{ backgroundColor: '#ebf3f8ff', width: '100%', padding: '3px 0', borderTop: '1px solid #eee' }}>
        <div className="container">
          <HighlightedPublicatons />
        </div>
      </div>

        {/* SECTION 4: Video Section (White Background) */}
      <div style={{ backgroundColor: '#ffffff', width: '100%', padding: '20px 0' }}>
        <div className="container">
          <div className="col-12">
            <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
            <h2 style={{ fontWeight: '800', marginBottom: '30px' }}>Lab Introduction Video</h2>
            <iframe
              style={{ width: "100%", height: "500px", border: "none", borderRadius: '8px' }}
              src="https://www.youtube.com/embed/TTPGI4IXRyk"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>


    </div>
  );
}

//WelcomeCard

const WelcomeCard = () => {
  return (
    <div className="col-lg-5 col-md-12 mb-3">
      <div className="card h-100 hero-text-card">
        <div className="card-body ps-0">
            <h1 className="text-container">
              Welcome to <span style={{ color: '#000080' }}>HCI TECH LAB</span>!
            </h1>

            <h4 className="mb-4">
               <strong>Pioneering Embodied and Physical Human–AI Interaction</strong>
            </h4>
          
             <div style={{ textAlign: 'left', marginTop: '15px' }}>
             
             <div style={{ 
               textAlign: 'left', 
               marginTop: '15px', 
               fontFamily: "'Inter', sans-serif", // Matches your h6 font-family
               fontSize: '14px',                 // Matches your h6 size
               fontWeight: 'normal'              // Matches your h6 weight
             }}>
              <p>
                The Human-Centered Interactive Technologies Lab (HCI Tech Lab) is a multidisciplinary research group at KAIST. 
                Our mission is to empower human potential by bridging the physical and digital worlds through embodied intelligence (Physical AI) and immersive technologies (XR). <br></br>
              </p>
                Our research focuses on:<br />
                <ul style={{ listStylePosition: 'inside', marginLeft: 15, paddingLeft: 0 }}>
                    <li key="embedding"><b>Advanced Sensing Technology</b></li>
                    <li key="advancing"><b>Multimodal Haptic Technology</b></li>
                    <li key="authoring"><b>Authoring User Experience</b></li>
                </ul>
              </div>
              </div>
            
            <div className="d-flex gap-2">
              <Link className="btn btn-primary" href="https://www.youtube.com/@HCI_Tech" target="_blank">
                <b>HCI Tech Lab Youtube</b>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for the modal badges
const getCategoryColor = (category) => {
  if (!category) return '#1260de';
  const lower = category.toLowerCase();
  if (lower.includes('position')) return '#008924ff';
  if (lower.includes('opening')) return '#6c757d';
  if (lower.includes('news')) return '#000000ff';
  if (lower.includes('award')) return '#c4c732ff';
  return '#1260de';
};

const NewsCard = () => {
  const latestNews = news.slice(0, 8);
  const [selectedNews, setSelectedNews] = useState(null);

  // Helper to render icon smartly (handles both file paths and emojis)
  const renderIcon = (iconStr, height = '20px') => {
      if (!iconStr) return null;
      if (iconStr.includes('/') || iconStr.includes('.')) {
          return <img src={iconStr} alt="icon" style={{ height: height, width: 'auto', objectFit: 'contain' }} />;
      }
      return <span style={{ fontSize: '1.2rem' }}>{iconStr}</span>;
  };

  return (
    <div className="col-12">
      <div className="container">
        
        {/* Inline CSS for the Zoom-in Animation */}
        <style>{`
            @keyframes modalZoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `}</style>

        {/* Section Header */}
        <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
        <h2 style={{ fontWeight: '800', marginBottom: '5px' }}>News</h2>
        <div className="d-flex justify-content-between align-items-end mb-3">
            Latest news from HCI Tech Lab
            <Link href="/news" style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'none' }}>
            All News ↗
            </Link>
        </div>

        {/* News Grid */}
        <div className="news-grid">
          {latestNews.map((newsItem, index) => (
            <div 
                className="news-grid-card" 
                key={index}
                onClick={() => setSelectedNews(newsItem)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <div className="d-flex gap-2 mb-2 align-items-center">
                
                {/* --- FIX 2: Smart Icon Rendering --- */}
                {renderIcon(newsItem.icon)}
                
                <span className="tag-badge" style={{ backgroundColor: getCategoryColor(newsItem.category || "News") }}>
                  {newsItem.category || "News"}
                </span>
                              
                {newsItem.status && (
                  <span className="tag-badge" style={{ backgroundColor: '#6c757d', color: '#ffffffff' }}>
                    {newsItem.status}
                  </span>
                )}
              </div>

              <h5 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px', lineHeight: '1.4' }}>
                {newsItem.title}
              </h5>

              <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '15px' }}>
                {newsItem.date}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#555', flex: 1, marginBottom: '15px' }}>
                {newsItem.content.length > 120 
                  ? newsItem.content.substring(0, 120) + '...' 
                  : newsItem.content}
              </div>

              {newsItem.extraContent && (
                  <div style={{ color: '#1260de', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>
                      Read More &rarr;
                  </div>
              )}

              {/* --- FIX 1: Fixed Image Overflow Layout --- */}
              {newsItem.images && newsItem.images.length > 0 && (
                <div className="d-flex gap-2 mt-auto" style={{ height: '120px', width: '100%' }}>
                  {newsItem.images.slice(0, 2).map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt="news-thumb" 
                      style={{ 
                        flex: 1,
                        minWidth: 0,          /* CRITICAL FIX: Stops images from overflowing */
                        height: '100%',
                        objectFit: 'cover',   
                        borderRadius: '4px', 
                        border: '1px solid #eee' 
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MODAL POP-UP WITH ZOOM ANIMATION */}
        {selectedNews && (
            <div 
                className="modal-overlay" 
                onClick={() => setSelectedNews(null)}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 9999 
                }}
            >
                <div 
                    className="modal-content" 
                    onClick={(e) => e.stopPropagation()} 
                    style={{
                        backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
                        width: '90%', maxWidth: '700px', 
                        maxHeight: '85vh', overflowY: 'auto', 
                        position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        textAlign: 'left',
                        animation: 'modalZoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' 
                    }}
                >
                    <button 
                        className="close-btn" 
                        onClick={() => setSelectedNews(null)}
                        style={{
                            position: 'absolute', top: '15px', right: '20px',
                            background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666'
                        }}
                    >
                        ✖
                    </button>

                    <div className="d-flex gap-2 mb-3 align-items-center">
                        {/* --- FIX 2: Applied smart icon to modal as well --- */}
                        {renderIcon(selectedNews.icon, '24px')}
                        
                        <span className="tag-badge" style={{ backgroundColor: getCategoryColor(selectedNews.category || "News"), padding: '4px 10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }}>
                            {selectedNews.category || "News"}
                        </span>
                    </div>

                    <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{selectedNews.title}</h2>
                    <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '20px' }}>{selectedNews.date}</div>
                    
                    <div style={{ fontSize: '1rem', color: '#333', lineHeight: '1.6', marginBottom: '20px' }}>
                        {selectedNews.content}
                        {selectedNews.extraContent && (
                            <div className="mt-3">
                                {selectedNews.extraContent}
                            </div>
                        )}
                    </div>

                    {selectedNews.images && selectedNews.images.length > 0 && (
                        <div className="d-flex flex-column gap-3 mt-4">
                            {selectedNews.images.map((src, i) => (
                                <img 
                                    key={i} 
                                    src={src} 
                                    alt="news-large" 
                                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #eee' }} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

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
        <Link href="/publications" style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'none' }}>
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
const HighlightedPublicatons = () => {
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
    <div className="col-12 mb-5 mt-4">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-4">
          <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
          <h2 style={{ fontWeight: '800', marginBottom: '5px' }}>Research</h2>
          <p className="text-muted">Highlighted & Recent Publications from HCI Tech Lab</p>
        </div>

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
              <Link href="/publications" style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'none' }}>
                All Publication ↗
              </Link>
            </div>
            <div className="row h-100"> {/* h-100 ensures the inner row fills the column */}
              {gridItems.map((item, index) => (
                <div key={index} className="col-md-6 col-12 mb-4">
                  <div className="news-grid-card h-100" style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Video/Preview (Fixed Aspect Ratio 16:9) */}
                    <div className="mb-2" style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', borderRadius: '4px' }}>
                       <video 
                        muted 
                        playsInline 
                        autoPlay 
                        loop
                        poster={item.poster}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
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