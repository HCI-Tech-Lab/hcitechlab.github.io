import { useState, useEffect } from "react";
import SectionContainer from "@/components/section_container";
import baguetteBox from 'baguettebox.js';
// Make sure to import baguetteBox CSS in your app if you haven't globally!
// import 'baguettebox.js/dist/baguetteBox.min.css';

// ... (Keep your galleries object here exactly as you have it) ...

export default function Gallery() {
    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Lowered to 4 since we show ALL photos per event now
    
    const keys = Object.keys(galleries);
    const totalPages = Math.ceil(keys.length / itemsPerPage);

    // Calculate indices for slicing
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentKeys = keys.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    // Initialize lightbox popups. 
    // We put [currentPage] in the dependency array so it re-runs when we change pages!
    useEffect(() => {
        baguetteBox.run('.gallery-event-container');
    }, [currentPage]);

    // Dynamic Pagination Logic
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
            {/* Standardized Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ fontWeight: '800', margin: 0 }}>HCI Tech Lab Gallery</h2>
            </div>
            
            {/* Gallery Events Mapping */}
            <div className="gallery-wrapper">
                {currentKeys.map((key, index) => (
                    <div key={index} className="gallery-event-container mb-5 pb-4">
                        
                        {/* Event Title Header */}
                        <div className="d-flex align-items-center mb-4 mt-3">
                            {/* Applied the new custom class here */}
                            <h4 className="gallery-event-title">{key}</h4>
                            
                            {/* Keeping the elegant horizontal line next to it */}
                            <div style={{ flex: 1, height: "2px", backgroundColor: "#e2e8f0" }}></div>
                        </div>

                        {/* Masonry Grid for this specific event */}
                        <div className="masonry-grid">
                            {galleries[key].map((src, imgIndex) => (
                                <a 
                                    href={src} 
                                    key={imgIndex} 
                                    className="masonry-item" 
                                    data-caption={`${key}`}
                                >
                                    <img 
                                        src={src} 
                                        alt={`${key} photo ${imgIndex + 1}`} 
                                        loading="lazy" /* Improves performance by only loading images as they scroll into view */
                                    />
                                </a>
                            ))}
                        </div>
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
        </SectionContainer>
    );
}

const galleries = {
  "Apr, 2026 (Lab Retreat)": [
    "img/Lab/2604/SP1.jpg",
    "img/Lab/2604/SP2.jpg",
  ],
  "Apr, 2026 (CHI)": [
    "img/Lab/2604/CHI1.jpg",
    "img/Lab/2604/CHI2.jpg",
    "img/Lab/2604/CHI3.jpg",
    "img/Lab/2604/CHI4.jpg",
    "img/Lab/2604/CHI5.jpg",
    "img/Lab/2604/CHI6.jpg",
  ],
  "Mar, 2026 (VR)": [
    "img/Lab/2603/VR1.jpg",
    "img/Lab/2603/VR2.jpg",
    "img/Lab/2603/VR3.jpeg",
    "img/Lab/2603/VR4.jpeg",
    "img/Lab/2603/VR5.jpeg",
  ],
  "March, 2026 (External Visit, Mar Gonzalez)": [
    "img/Lab/2603/G1.jpg",
    "img/Lab/2603/G2.jpg",
    "img/Lab/2603/G3.jpg",
  ],
  "February, 2026 (Graduation)": [
    "img/Lab/2602/Grad_1.jpg",
    "img/Lab/2602/Grad_2.jpg",
    "img/Lab/2602/Grad_3.jpg",
    "img/Lab/2602/Grad_4.jpg",
  ],
  "January, 2026 (Lab Retreat)": [
    "img/Lab/2601/1.jpg",
    "img/Lab/2601/2.jpg",
    "img/Lab/2601/3.jpg",
    "img/Lab/2601/4.jpg",
    "img/Lab/2601/5.jpg",
  ],
  "January, 2026 (External Visit, Korea University)": [
    "img/Lab/2601/CY_Visit.jpg",
  ],
  "December, 2025 (End of Year Gathering)": [
    "img/Lab/2512/EOY.png",
    "img/Lab/2512/EOY1.png",
  ],
  "December, 2025 (External Visit, HITSZ)": [
    "img/Lab/2512/YItian_Visit1.jpg",
    "img/Lab/2512/Yitian_Visit2.jpg",
    "img/Lab/2512/Yitian_Visit3.jpg",
  ],

  "November, 2025 (External Visit, Distinguished professors from Denmark)": [
    "img/Lab/2511/Denmark1.jpg",
    "img/Lab/2511/Denmark2.jpg",
    "img/Lab/2511/Denmark3.jpg",
    "img/Lab/2511/Denmark4.jpg",
    "img/Lab/2511/Denmark5.jpg",
    "img/Lab/2511/Denmark6.jpg",
    "img/Lab/2511/Denmark7.jpg",
  ],
  "October, 2025 (External Visit, Google, Aarhus Univ., MIT)": [
    "img/Lab/2509/GoogleVisit1.png",
    "img/Lab/2509/GoogleVisit2.jpg",
    "img/Lab/2509/GoogleVisit3.jpg",
    "img/Lab/2509/GoogleVisit4.jpg",
    "img/Lab/2510/Kenvisit1.jpg",
    "img/Lab/2510/Kenvisit2.jpg",
    "img/Lab/2510/Kenvisit3.jpg",
    "img/Lab/2510/mitvisit1.jpg",
    "img/Lab/2510/mitvisit2.jpg",
    "img/Lab/2510/mitvisit3.jpg",
  ],
  "October, 2025 (ISMAR)": [
    "img/Lab/2510/ISMAR0.jpg",
    "img/Lab/2510/ISMAR1.jpg",
    "img/Lab/2510/ISMAR2.jpg",
    "img/Lab/2510/ISMAR3.jpg",
    "img/Lab/2510/ISMAR4.jpg",
    "img/Lab/2510/ISMAR5.jpg",
    "img/Lab/2510/ISMAR6.jpg",
    "img/Lab/2510/ISMAR7.jpg",
    "img/Lab/2510/ISMAR8.jpg",
    "img/Lab/2510/ISMAR9.jpg",
  ],
  "September, 2025 (UIST)": [
    "img/Lab/2509/UIST1.jpg",
    "img/Lab/2509/UIST2.jpg",
    "img/Lab/2509/UIST3.jpg",
    "img/Lab/2509/UIST4.jpg",
    "img/Lab/2509/UIST6.jpg",
    "img/Lab/2509/UIST7.jpg",
    "img/Lab/2509/UIST8.jpg",
    "img/Lab/2509/UIST9.jpg",
    "img/Lab/2509/UIST10.jpg",
    "img/Lab/2509/UIST11.jpg",
    "img/Lab/2509/UIST12.jpg",
  ],
  "September, 2025 (PreUIST)": [
    "img/Lab/2509/PreUIST0.jpg",
    "img/Lab/2509/PreUIST1.jpg",
    "img/Lab/2509/PreUIST2.jpg",
    "img/Lab/2509/PreUIST3.jpg",
    "img/Lab/2509/PreUIST4.jpg",
    "img/Lab/2509/PreUIST5.jpg",
  ],
  "July, 2025 (External Visit, Distinguished professors from China)": [
    "img/Lab/2507/Beihang1.jpg",
    "img/Lab/2507/Beihang2.jpg",
    "img/Lab/2507/Beihang3.jpg",
    "img/Lab/2507/Beihang4.jpg",
    "img/Lab/2507/Beihang5.jpg",
  ],
  "July, 2025 (WHC)": [
    "img/Lab/2507/WHC1.jpg",
    "img/Lab/2507/WHC2.jpg",
    "img/Lab/2507/WHC3.jpg",
    "img/Lab/2507/WHC4.jpg",
    "img/Lab/2507/WHC5.jpg",
    "img/Lab/2507/WHC6.jpg",
    "img/Lab/2507/WHC7.jpg",
    "img/Lab/2507/WHC8.jpg",
    "img/Lab/2507/WHC9.jpg",
    "img/Lab/2507/WHC10.jpg",
  ],
    "July, 2025 (KCC)": [
    "img/Lab/2507/KCC.jpg",
    "img/Lab/2507/KCC1.jpg",
    "img/Lab/2507/KCC2.jpg",
    "img/Lab/2507/KCC3.jpg",
  ],
  "May, 2025 (Teacher's Day)": [
    "img/Lab/2505/Teacher1.jpg",
    "img/Lab/2505/Teacher2.jpg",
    "img/Lab/2505/Teacher3.jpg",
    "img/Lab/2505/Teacher4.jpg",
  ],
  "May, 2025 (CHI)": [
    "img/Lab/2504/Pic2.jpg",
    "img/Lab/2504/Pic6.JPG",
    "img/Lab/2504/Pic1.jpg",
    "img/Lab/2504/Pic0.jpg",
    "img/Lab/2504/Pic3.jpg",
    "img/Lab/2504/Pic4.jpg",
    "img/Lab/2504/Pic5.JPG",
  ],
  "Apr, 2025 (CHI Workshop)": [
    "img/Lab/2504/Workshop1.jpg",
    "img/Lab/2504/Workshop2.jpg",
    "img/Lab/2504/Workshop3.jpg",
    "img/Lab/2504/Workshop4.jpg",
    "img/Lab/2504/Workshop5.jpg",
  ],
  "Apr, 2025 (ITRC)": [
    "img/Lab/2504/ITRC1.jpg",
    "img/Lab/2504/ITRC2.jpg",
    "img/Lab/2504/ITRC3.jpg",
    "img/Lab/2504/ITRC4.jpg",
    "img/Lab/2504/ITRC5.jpg",
  ],
  "Mar, 2025": [
    "img/Lab/2503/2503_3.jpg",
    "img/Lab/2503/2503_2.jpg",
    "img/Lab/2503/2503_1.jpg",
  ],
  "February, 2025 (Graduation)": [
    "img/Lab/2502/Grad_1.jpeg",
    "img/Lab/2502/Grad_2.png",
    "img/Lab/2502/Grad_3.jpg",
    "img/Lab/2502/Grad_4.jpeg",
    "img/Lab/2502/Grad_5.jpg",
    "img/Lab/2502/Grad_6.jpg",
    "img/Lab/2502/Grad_7.jpg",
    "img/Lab/2502/Grad_8.jpg",
    "img/Lab/2502/Grad_9.jpg",

  ],
  "February, 2025 (HCI Korea)": [
    "img/Lab/2502/hcik1.jpg",
    "img/Lab/2502/hcik2.jpg",
    "img/Lab/2502/hcik3.jpg",
    "img/Lab/2502/hcik4.png",
    "img/Lab/2502/hcik5.jpg",
  ],
  "December, 2024 (KSC)": [
    "img/Lab/2412/KCC2024_1.jpg",
    "img/Lab/2412/KCC2024_2.jpg",
    "img/Lab/2412/KCC2024_3.jpg",
  ],
  "December, 2024 (NeurIPS)": [
    "img/Lab/2412/NeurIPS24_1.jpg",
    "img/Lab/2412/NeurIPS24_2.jpg",
    "img/Lab/2412/NeurIPS24_3.jpg",
    "img/Lab/2412/NeurIPS24_4.jpg",
    "img/Lab/2412/NeurIPS24_5.jpg",
  ],
  "November, 2024 (Community Service)": [
    "img/Lab/2412/HCIT_1.jpg",
    "img/Lab/2412/HCIT_2.jpg",
    "img/Lab/2412/HCIT_3.jpg",
    "img/Lab/2412/HCIT_4.jpg",
    "img/Lab/2412/HCIT_5.jpg",
  ],
  "October, 2024 (UbiComp & ISMAR)": [
    "img/Lab/2411/ubicomp1.jpg",
    "img/Lab/2411/ubicomp2.jpg",
    "img/Lab/2411/ubicomp3.jpg",
    "img/Lab/2411/ISMAR1.png",
    "img/Lab/2411/ISMAR3.jpeg",
    "img/Lab/2411/ISMAR2.jpeg",
  ],
  "August, 2024 (KHC)": [
    "img/Lab/2408/2408_0.jpg",
    "img/Lab/2408/2408_1.jpg",
    "img/Lab/2408/2408_2.jpg",
    "img/Lab/2408/2408_3.jpg",
  ],
  "July, 2024": [
    "img/Lab/2407/2407_0.jpg",
    "img/Lab/2407/2407_1.jpg",
    "img/Lab/2407/2407_2.jpg",
    "img/Lab/2407/2407_3.jpg",
  ],
  "May, 2024": [
    "img/Lab/2405/2405_1.jpg",
    "img/Lab/2405/2405_2.jpg",
    "img/Lab/2405/2405_3.jpg",
  ],
  "May, 2024 (CHI)": [
    "img/Lab/2405/CHI1.jpg",
    "img/Lab/2405/CHI2.jpg",
    "img/Lab/2405/CHI3.png",
    "img/Lab/2405/CHI4.png",
    "img/Lab/2405/CHI5.jpg",
    "img/Lab/2405/CHI6.jpg",
    "img/Lab/2405/CHI7.jpg",
  ],
  "Apr, 2024": [
    "img/Lab/2404/2404_2.jpg",
    "img/Lab/2404/2404_1.jpg",
    "img/Lab/2404/2404_3.jpg"
  ],
  "Feb, 2024 (Graduation)": [
    "img/Lab/2402/Graduation1.JPG",
    "img/Lab/2402/Graduation2.JPG",
    "img/Lab/2402/Graduation3.JPG",
    "img/Lab/2402/Graduation4.JPG",
    "img/Lab/2402/Graduation5.JPG"
  ],
  "Dec, 2023 (Lab Photo)": [
    "img/Lab/2312/2312_1.jpg",
    "img/Lab/2312/2312_2.jpg",
    "img/Lab/2312/2312_3.jpg",
    "img/Lab/2312/2312_4.jpg",
    "img/Lab/2312/2312_5.jpg",
  ],
  "Nov, 2023 (KHC)": [
    "img/Lab/2311/KHC1.JPG",
    "img/Lab/2311/KHC2.JPG",
    "img/Lab/2311/KHC3.JPG",
    "img/Lab/2311/KHC4.JPG",
    "img/Lab/2311/KHC5.JPG",
    "img/Lab/2311/KHC6.JPG",
    "img/Lab/2311/KHC7.JPG",
    "img/Lab/2311/KHC8.JPG",
    "img/Lab/2311/KHC9.JPG",
    "img/Lab/2311/KHC10.JPG",
    "img/Lab/2311/KHC11.JPG",
    "img/Lab/2311/KHC12.JPG",
    "img/Lab/2311/KHC13.JPG"
  ],
  "Oct, 2023 (UIST)": [
    "img/Lab/2310/UIST1.jpg",
    "img/Lab/2310/UIST4.png",
    "img/Lab/2310/UIST3.jpg",
    "img/Lab/2310/UIST6.JPG",
    "img/Lab/2310/UIST7.JPG"
  ],
  "Oct, 2023 (ISMAR)": [
    "img/Lab/2310/ISMAR2.JPG",
    "img/Lab/2310/ISMAR1.JPG",
    "img/Lab/2310/ISMAR3.JPG",
    "img/Lab/2310/ISMAR4.JPG",
    "img/Lab/2310/ISMAR5.JPG"
  ],
  "Oct, 2023 (SUI)": [
    "img/Lab/2310/SUI1.jpeg",
    "img/Lab/2310/SUI2.jpeg"
  ],
  "Aug, 2023 (1Million Visit)": [
    "img/Lab/2308/1Mil.JPG",
    "img/Lab/2308/1Mil_1.jpg",
    "img/Lab/2308/1Mil_2.jpg"
  ],
  "July, 2023 (WHC)": [
    "img/Lab/2307/WHC3.JPG",
    "img/Lab/2308/1Mil_1.jpg",
    "img/Lab/2308/1Mil_2.jpg"
  ],
  "June, 2023 (1Million Visit)": [
    "img/Lab/2306/Visit2.jpeg",
    "img/Lab/2306/Visit1.jpeg"
  ],
  "May, 2023 (Teacher's Day)": [
    "img/Lab/2305/230514_1.jpg",
    "img/Lab/2305/230522.jpg"
  ],
  "March, 2023": [
    "img/Lab/2303/230301.png",
    "img/Lab/2303img_0694.jpg"
  ],
  "Feb, 2023": [
    "img/Lab/2302_1/G1.png",
    "img/Lab/2302_1/Graduate4.jpg",
    "img/Lab/2302_1/Graduate8.jpg"
  ],
  "Feb, 2023 (HCI Korea)": [
    "img/Lab/2302/HCIKorea2023.png",
    "img/Lab/2302/HCIK_23_2.jpeg",
    "img/Lab/2302/HCIK_23_9.jpeg"
  ],
  "Dec, 2022": [
    "img/Lab/2212/221209_Lab_Dinner.jpg",
    "img/Lab/2303img_0694.jpg"
  ],
  "Aug, 2022": [
    "img/Lab/2208/image1.jpg",
    "img/Lab/2208/image2.jpg",
    "img/Lab/2208/image3.jpg",
    "img/Lab/2208/image4.jpg",
    "img/Lab/2208/image5.jpg"
  ],
  "Jun, 2022": [
    "img/Lab/220624_Meeting.jpg"
  ],
  "May, 2022": [
    "img/Lab/2205/2205_7.jpg",
    "img/Lab/2205/2205_5.jpg"
  ],
  "Apr, 2022": [
    "img/Lab/220429_Lab Meeting.jpg",
    "img/Lab/220429_Lunch.jpg"
  ],
  "Dec, 2021": [
    "img/Lab/211201_Group.jpg"
  ]
}