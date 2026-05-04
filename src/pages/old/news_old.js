import { useState } from 'react';
import SectionContainer from '@/components/section_container';
import { news } from '../data/news_data';

export default function News() {
    const [selectedNews, setSelectedNews] = useState(null);

    return (
        <SectionContainer>
            <h2 className="card-title">News</h2>
            <div className="row news_item">
                {news.map((item, index) => (
                    <div key={index} className="news-item col-md-6 col-12">
                        <div className="title_news">
                            {item.icon && (
                                <img 
                                    alt="icon" 
                                    src={item.icon} 
                                    width={25} 
                                    height={25} 
                                />
                            )}
                            &nbsp; {item.title}
                        </div>
                        <div className="date">{item.date}</div>
                        <div className="context_news mb-3">{item.content}</div>
                        <div className="news-images">
                            {item.images.map((src, imgIndex) => (
                                <img alt="news_image" src={src} width = {5000} height={120} style={{ height: '150', width: 'auto', marginRight: '4px' }} />
                            ))}
                        </div>

                        {/* Read More Button (Only for items with extra content) */}
                        {item.extraContent && (
                            <button 
                                className="read-more-btn" 
                                onClick={() => setSelectedNews(item)}
                            >
                                Read More
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal Pop-Up */}
            {selectedNews && (
                <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedNews(null)}>✖</button>
                        <h3>{selectedNews.title}</h3>
                        <p>{selectedNews.extraContent}</p>
                    </div>
                </div>
            )}

        </SectionContainer>
    );
}



