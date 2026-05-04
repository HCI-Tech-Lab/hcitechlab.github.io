import Carousel from "@/components/carousel";
import Link from 'next/link';
import {news} from '../data/news_data';
import { research_temp } from "@/data/research_data";
import { useState } from 'react';

// MainBody
export default function Home() {
  return (
    <div>
      <div className = "container">
        <div className = "row">

          <WelcomeCard />

          <div className = "col-lg-7 col-md-12 mb-3">
            <div className="card h-100 border-0" style={{ marginTop: 0 }}>
              <div className="card-body" style={{ padding: 0 }}>
                <Carousel />
              </div>
            </div>
          </div>

          <NewsCard />

          <div className = "container mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
              <h2 className="card-title">HCI Tech Youtube </h2>
                <iframe
                  style={{ width: "100%", height: "500px", border: "none" }}
                  className="mt-4"
                  src="https://www.youtube.com/embed/videoseries?list=PLsnyS9wZul9ZVvpTg3ElUwnnQQ7uiD8Uj"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          

          {/* <ResearchHighlights /> */}

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
      <div className="card h-100">
        <div className="card-body">
            <h2>Welcome to HCI Tech Lab!</h2>
            <h4>
              <p> We are a multidisciplinary research group working on physical computing, natural user interface, and socially acceptable interactions. Our research focuses on enabling novel interactions for Extended Reality (XR) through sensing/haptic feedback technology and wearable interface with the aid of applied machine learning while supporting intelligent authoring systems.</p>
              
              <p> We envision natural user interactions that overcome physical, mental, and social barriers. To achieve this, we will focus on</p>
              
              <ul>
                  <li key="embedding"><b>Embedding Interactive Technologies</b></li>
                  <li key="advancing"><b>Advancing Interaction Techniques</b></li>
                  <li key="authoring"><b>Authoring User Interface & Experience</b></li>
              </ul>
            </h4>
            
            <Link className="btn btn-primary" href="https://www.youtube.com/@HCI_Tech" target="_blank"><b>HCI Tech Youtube</b></Link>
            <br />
            <br />
            <Link className="btn btn-dark" href="https://youtu.be/BndS5KMmBHA" target="_blank"><b>Learn More about HCI Tech Lab (Korean)</b></Link>
        </div>
      </div>
    </div>
  );
}

//NewsCard

const NewsCard = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <div className = "container mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h2 className="card-title">News </h2>
          <div className="scroll-box" style={{ height: '400px' }}>
            <div className="scroll">
              <div className="row news_item mt-4">
              {
                news
                  .filter((newsItem) => {
                    const oneYearAgo = new Date();
                    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
                    const newsDate = new Date(newsItem.date);
                    return newsDate >= oneYearAgo && newsDate <= new Date();
                  })
                  .map((newsItem, _) => (
                    <div className="news-item col-md-6 col-12" key={_}>
                      <div className="title_news">
                        {newsItem["icon"] === "" ? null : (
                          <img
                            alt="icon"
                            src={newsItem["icon"]}
                            width={newsItem["tall"] ? 41.88 : 25}
                            height={newsItem["tall"] ? 35 : 25}
                          />
                        )}
                        &nbsp; {newsItem["title"]}
                      </div>
                      <div className="date"> {newsItem["date"]}</div>
                      <div className="context_news mb-3">{newsItem["content"]}</div>
                      {newsItem["images"].map((src, index) => (
                        <img
                          key={index}
                          alt="news_image"
                          src={src}
                          width={5000}
                          height={200}
                          style={{ width: 'auto', marginRight: '5px' }}
                        />
                      ))}
                      {newsItem.extraContent && (
                          <button 
                              className="read-more-btn" 
                              onClick={() => setSelectedNews(newsItem)}
                          >
                              Read More
                          </button>
                      )}
                    </div>
                  ))
                }
                {selectedNews && (
                    <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setSelectedNews(null)}>✖</button>
                            <h3>{selectedNews.title}</h3>
                            <p>{selectedNews.extraContent}</p>
                        </div>
                    </div>
                )}
              </div>
              <Link href="/news">More News</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//HighlightedPublications

const HighlightedPublicatons = () => {
  return (
    <div className = "container">
      <div className = "row">
        <div className="col-lg-12 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Highlighted Publications</h2>
              {
                Object.keys(research_temp).reverse().map((year, index) => (
                  research_temp[year].map((item, index) => (
                    item["highlight"] == false ? null : (
                      <div key = {index} className = "row research_item">
                        <div className = "col-md-3">
                            <video  className="img-fluid" autoPlay loop muted playsInline poster={item["poster"]}>
                              <source type="video/mp4" src={item['demo']} />
                            </video>
                        </div>
                        <div className="col-md-9">
                            <h4><b>{item.title}</b></h4>
                            <h6><b>AUTHORS:</b> {item.authors}</h6>
                            <h6>
                                {item.status}
                                {item.conferenceLink && (
                                    <Link className="link-success" href={item.conferenceLink} target="_blank">
                                        {" "}{item.conference}
                                    </Link>
                                )}
                            </h6>
                            {item.award &&  <h6 className="d-flex align-items-center">
                                <img
                                    src="/img/icon/award_small.png"
                                    alt="award"
                                    style={{ width: "20px", height: "20px", marginRight: "5px" }}
                                    />
                                <b>AWARD:&nbsp;</b> {item.award}</h6>}
                            {item.website && <Link className="publication-link" href={item.website} target="_blank">Project Website</Link>}
                            {item.doi && <Link className="publication-link" href={item.doi} target="_blank">DOI</Link>}
                            {item.video && <Link className="publication-link" href={item.video} target="_blank">VIDEO</Link>}
                            {item.pdf && <Link className="publication-link" href={item.pdf} target="_blank">PDF</Link>}
                            {item.presentation && <Link className="publication-link" href={item.presentation} target="_blank">PRESENTATION</Link>}
                            {item.media && <Link className="publication-link" href={item.media} target="_blank">MEDIA</Link>}
                        </div>
                      </div>
                    )
                  ))
                ))
              }
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
}
