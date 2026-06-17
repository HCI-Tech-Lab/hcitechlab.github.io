import { useState } from 'react';
import SectionContainer from '@/components/section_container';
import { news } from '../data/news_data';

// Helper function to color-code the badges
const getCategoryColor = (category) => {
    if (!category) return '#1260de'; 
    const lower = category.toLowerCase();
    if (lower.includes('position')) return '#008924ff'; 
    if (lower.includes('opening')) return '#6c757d'; 
    if (lower.includes('news')) return '#000000ff'; 
    if (lower.includes('award')) return '#c4c732ff'; 
    return '#1260de';
};

export default function News() {
    const [selectedNews, setSelectedNews] = useState(null);

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(news.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <SectionContainer>
            <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
            <h2 style={{ fontWeight: '800', marginBottom: '30px' }}>All News</h2>

            {/* News Grid */}
            <div className="news-grid">
                {currentItems.map((item, index) => (
                    // Added onClick and cursor: pointer to make the whole card clickable
                    <div 
                        className="news-grid-card" 
                        key={index}
                        onClick={() => setSelectedNews(item)}
                        style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                    >
                        <div className="d-flex gap-2 mb-2 align-items-center">
                            {item.icon && <img alt="icon" src={item.icon} width={20} height={20} style={{ objectFit: 'contain' }} />}
                            <span className="tag-badge" style={{ backgroundColor: getCategoryColor(item.category || "News") }}>
                                {item.category || "News"}
                            </span>
                            {item.status && <span className="tag-badge" style={{ backgroundColor: '#6c757d', color: '#ffffffff' }}>{item.status}</span>}
                        </div>

                        <h5 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px', lineHeight: '1.4' }}>{item.title}</h5>
                        <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '15px' }}>{item.date}</div>
                        
                        <div style={{ fontSize: '0.8rem', color: '#555', flex: 1, marginBottom: '15px' }}>
                            {/* If there is extraContent, we truncate the preview. If not, we show the whole thing. */}
                            {item.extraContent && item.content.length > 120 ? item.content.substring(0, 120) + '...' : item.content}
                        </div>

                        {item.images && item.images.length > 0 && (
                            <div className="d-flex gap-2 mt-auto">
                                {item.images.slice(0, 2).map((src, i) => (
                                    <img key={i} src={src} alt="news-thumb" style={{ width: '50%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="d-flex flex-wrap justify-content-center align-items-center mt-5 mb-4" style={{ gap: '4px' }}>
                    {getPageNumbers().map((number, index) => (
                        number === '...' ? (
                            <span key={`ellipsis-${index}`} style={{ padding: '8px 12px', color: '#333' }}>...</span>
                        ) : (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                style={{ 
                                    padding: '6px 14px', borderRadius: '0', cursor: 'pointer', border: '1px solid #333',
                                    fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s ease',
                                    backgroundColor: currentPage === number ? '#ffffff' : '#2b2b2b',
                                    color: currentPage === number ? '#2b2b2b' : '#ffffff',
                                }}
                            >
                                {number}
                            </button>
                        )
                    ))}
                    <button 
                        onClick={handleNext} disabled={currentPage === totalPages}
                        style={{ 
                            padding: '6px 14px', border: '1px solid #333', borderRadius: '0', fontSize: '0.9rem', fontWeight: '500', marginLeft: '4px',
                            backgroundColor: currentPage === totalPages ? '#f8f9fa' : '#2b2b2b',
                            color: currentPage === totalPages ? '#ccc' : '#ffffff',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        }}
                    >
                        NEXT &raquo;
                    </button>
                </div>
            )}

            {/* EXPANDED MODAL POP-UP */}
            {selectedNews && (
                <div 
                    className="modal-overlay" 
                    onClick={() => setSelectedNews(null)}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background blur
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        zIndex: 9999 // Ensure it sits on top of everything including the navbar
                    }}
                >
                    <div 
                        className="modal-content" 
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
                        style={{
                            backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
                            width: '90%', maxWidth: '700px', // Makes it bigger and centered
                            maxHeight: '85vh', overflowY: 'auto', // Allows scrolling if content is very long
                            position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        {/* Close 'X' Button */}
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

                        {/* Badges inside the modal */}
                        <div className="d-flex gap-2 mb-3 align-items-center">
                            {selectedNews.icon && <img alt="icon" src={selectedNews.icon} width={24} height={24} style={{ objectFit: 'contain' }} />}
                            <span className="tag-badge" style={{ backgroundColor: getCategoryColor(selectedNews.category || "News"), padding: '4px 10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }}>
                                {selectedNews.category || "News"}
                            </span>
                        </div>

                        {/* Modal Content */}
                        <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{selectedNews.title}</h2>
                        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '20px' }}>{selectedNews.date}</div>
                        
                        <div style={{ fontSize: '1rem', color: '#333', lineHeight: '1.6', marginBottom: '20px' }}>
                            {selectedNews.content}
                            {/* If extra content exists, render it here safely */}
                            {selectedNews.extraContent && (
                                <div className="mt-3">
                                {selectedNews.extraContent}
                            </div>
                            )}
                        </div>

                        {/* Larger Images in Modal */}
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
        </SectionContainer>
    );
}