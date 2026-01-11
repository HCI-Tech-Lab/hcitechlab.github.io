import Carousel from "@/components/carousel";
import Link from 'next/link';
import {news} from '../data/news_data';
import { research_temp } from "@/data/research_data";
import { useState } from 'react';

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

      {/* SECTION 3: Video Section (White Background) */}
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

      {/* SECTION 4: Highlighted Publications (Light Gray Background) */}
      <div style={{ backgroundColor: '#ebf3f8ff', width: '100%', padding: '3px 0', borderTop: '1px solid #eee' }}>
        <div className="container">
          <HighlightedPublicatons />
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

//NewsCard
const getCategoryColor = (category) => {
  if (!category) return '#1260de'; // Default Blue
  const lower = category.toLowerCase();

  if (lower.includes('position')) return '#008924ff'; // Default Grey for other position statuses
  if (lower.includes('opening')) return '#6c757d'; // Grey
  if (lower.includes('news')) return '#000000ff'; // Green
  if (lower.includes('award')) return '#c4c732ff'; // Green
  return '#1260de';
};

const NewsCard = () => {
  const latestNews = news.slice(0, 4);

  return (
    <div className="col-12">
      <div className="container">
        {/* Section Header */}
          <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
          <h2 style={{ fontWeight: '800', marginBottom: '5px' }}>News</h2>
          <p className="text-muted">Latest news from HCI Tech Lab</p>

        {/* News Grid */}
        <div className="news-grid">
          {latestNews.map((newsItem, index) => (
            <div className="news-grid-card" key={index}>
              <div className="d-flex gap-2 mb-2">
                <span 
                  className="tag-badge" 
                  style={{ backgroundColor: getCategoryColor(newsItem.category || "News") }}
                >
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

              {newsItem.images && newsItem.images.length > 0 && (
                /* The d-flex wrapper ensures images sit side-by-side if there are multiple */
                <div className="d-flex gap-2">
                  {newsItem.images.slice(0, 2).map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt="news-thumb" 
                      style={{ 
                        width: '50%',        /* Automatically fits maximally to the grid width */
                        objectFit: 'cover',   /* Crops the image to fill the area without distortion */
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

        <div className="text-center mt-3">
          <Link href="/news" className="btn btn-light" style={{ 
              border: '1px solid #ddd', 
              padding: '10px 40px', 
              fontWeight: '600',
              borderRadius: '2px',
              backgroundColor: '#f8f9fa'
            }}>
            See More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

//HighlightedPublications
const HighlightedPublicatons = () => {
  return (
    <div className="col-12 mb-5 mt-4">
      <div className="container">
        {/* Section Header */}
        <div className="mb-4">
          <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
          <h2 style={{ fontWeight: '800', marginBottom: '5px' }}>Research</h2>
          <p className="text-muted">Highlighted & Recent Publications from HCI Tech Lab</p>
        </div>

        {/* Use news-grid class to organize cards */}
        <div className="news-grid">
          {Object.keys(research_temp)
            .sort((a, b) => b - a) // Ensure descending year order
            .map((year) =>
              research_temp[year].map((item, index) =>
                item["highlight"] === false ? null : (
                  /* We use the news-grid-card class to match the news section's look */
                  <div key={`${year}-${index}`} className="news-grid-card" style={{ display: 'block' }}>
                    
                    {/* Video/Preview Section */}
                    <div className="mb-3">
                      <video 
                        className="img-fluid" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        poster={item["poster"]}
                        style={{ borderRadius: '4px', width: '100%' }}
                      >
                        <source type="video/mp4" src={item['demo']} />
                      </video>
                    </div>

                    {/* Content Section */}
                    <div>
                      <h5 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px', lineHeight: '1.4' }}>
                        {item.title}
                      </h5>
                      
                      <div style={{ fontSize: '0.85rem', marginBottom: '5px' }}>
                        <b>AUTHORS:</b> {item.authors}
                      </div>
                      
                      <div style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                        {item.status}
                        {item.conferenceLink && (
                          <Link className="link-success" href={item.conferenceLink} target="_blank">
                            {" "}{item.conference}
                          </Link>
                        )}
                      </div>

                      {item.award && (
                        <div className="d-flex align-items-center mb-3" style={{ fontSize: '0.85rem', color: '#d4af37' }}>
                          <img
                            src="/img/icon/award_small.png"
                            alt="award"
                            style={{ width: "16px", height: "16px", marginRight: "5px" }}
                          />
                          <b>AWARD:</b>&nbsp;{item.award}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="d-flex flex-wrap gap-1 mt-auto">
                        {item.website && <Link className="publication-link" href={item.website} target="_blank">Project Website</Link>}
                        {item.doi && <Link className="publication-link" href={item.doi} target="_blank">DOI</Link>}
                        {item.video && <Link className="publication-link" href={item.video} target="_blank">VIDEO</Link>}
                        {item.pdf && <Link className="publication-link" href={item.pdf} target="_blank">PDF</Link>}
                        {item.presentation && <Link className="publication-link" href={item.presentation} target="_blank">PRESENTATION</Link>}
                        {item.media && <Link className="publication-link" href={item.media} target="_blank">MEDIA</Link>}
                      </div>
                    </div>
                  </div>
                )
              )
            )}
        </div>

        <div className="text-center mt-3">
          <Link href="/publications" className="btn btn-light" style={{ 
              border: '1px solid #ddd', 
              padding: '10px 40px', 
              fontWeight: '600',
              borderRadius: '2px',
              backgroundColor: '#f8f9fa'
            }}>
            See More &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};
