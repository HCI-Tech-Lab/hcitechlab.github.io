import { useRef, useState, useMemo } from "react";
import SectionContainer from "@/components/section_container";
import Link from "next/link";
import { research_temp } from "@/data/research_data";

export default function Publications() {
    const yearRefs = useRef({});
    
    // State for filtering and searching
    const [selectedCategory, setSelectedCategory] = useState("Conference / Journal (peer-reviewed)");
    const [searchQuery, setSearchQuery] = useState("");

    const scrollToYear = (year) => {
      if (yearRefs.current[year]) {
          const yOffset = -80; // Adjust based on your navbar height
          const y = yearRefs.current[year].getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // Filter options
    const categories = [
        "All",
        "Conference / Journal (peer-reviewed)",
        "Poster / Demo / Workshop",
        "Preprint",
        "Submitted"
    ];

    // --- NEW: Calculate Statistics and Filter Data ---
    const { stats, filteredData } = useMemo(() => {
        let total = 0;
        let confJournal = 0;
        let posterDemo = 0;
        let preprint = 0;
        let submitted = 0;

        const filtered = {};

        Object.keys(research_temp).forEach(year => {
            const yearData = research_temp[year];
            
            // 1. Calculate Stats (independent of search/filter)
            yearData.forEach(item => {
                total++;
                if (item.category === "Conference / Journal (peer-reviewed)") confJournal++;
                else if (item.category === "Poster / Demo / Workshop") posterDemo++;
                else if (item.category === "Preprint") preprint++;
                else if (item.category === "Submitted") submitted++;
            });

            // 2. Apply Filters (Category AND Search Query)
            const query = searchQuery.toLowerCase();
            const filteredYearData = yearData.filter(item => {
                // Check Category
                const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
                
                // Check Search Query (Title, Authors, or Conference)
                const matchesSearch = 
                    (item.title && item.title.toLowerCase().includes(query)) ||
                    (item.authors && item.authors.toLowerCase().includes(query)) ||
                    (item.conference && item.conference.toLowerCase().includes(query));

                return matchesCategory && matchesSearch;
            });

            // Only add the year if there are matching items
            if (filteredYearData.length > 0) {
                filtered[year] = filteredYearData;
            }
        });

        return { 
            stats: { total, confJournal, posterDemo, preprint, submitted }, 
            filteredData: filtered 
        };
    }, [searchQuery, selectedCategory]); 


    return (
        <SectionContainer>
            <div className="row">
                 {/* 1. TOP SECTION: Header & Summary Cards */}
                <div className="mb-4">
                    <div className="text-center mb-4">
                        <span className="section-eyebrow">Research output</span>
                        <h1 className="section-title">Publications</h1>
                    </div>
                    
                    {/* Summary Cards Row */}
                    <div className="row g-3 justify-content-center mb-5">
                        <div className="col-6 col-md-2">
                            <div className="card border-0 text-center py-4 h-100 stat-card" style={{ backgroundColor: '#e5efff' }}>
                                <h2 className="fw-bold mb-1" style={{ color: '#006eff' }}>{stats.total}</h2>
                                <span className="text-muted small">Total Papers</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border-0 text-center py-4 h-100 stat-card" style={{ backgroundColor: '#f3e8fd' }}>
                                <h2 className="fw-bold mb-1" style={{ color: '#9334e6' }}>{stats.confJournal}</h2>
                                <span className="text-muted small">Conference & Journal</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border-0 text-center py-4 h-100 stat-card" style={{ backgroundColor: '#e6f4ea' }}>
                                <h2 className="fw-bold mb-1" style={{ color: '#137333' }}>{stats.posterDemo}</h2>
                                <span className="text-muted small">Poster & Demo</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card border-0 text-center py-4 h-100 stat-card" style={{ backgroundColor: '#fef7e0' }}>
                                <h2 className="fw-bold mb-1" style={{ color: '#b06000' }}>{stats.preprint}</h2>
                                <span className="text-muted small">Preprint</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card border-0 text-center py-4 h-100 stat-card" style={{ backgroundColor: '#e0f2f1' }}>
                                <h2 className="fw-bold mb-1" style={{ color: '#00796b' }}>{stats.submitted}</h2>
                                <span className="text-muted small">Submitted</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Controls */}
                    <div className="card border-0 p-3 mb-4" style={{ borderRadius: '14px', border: '1px solid #E6ECF5', boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04)' }}>
                        <div className="row g-3">
                            <div className="col-md-8">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search by title, author, or venue..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #E6ECF5' }}
                                />
                            </div>
                            <div className="col-md-4">
                                <select 
                                    className="form-select border" 
                                    value={selectedCategory} 
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F5F7FB', border: '1px solid #E6ECF5' }}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Research Publications List */}
                <div className="col-md-10">
                    {/* Check if there are no results after filtering */}
                    {Object.keys(filteredData).length === 0 && (
                        <div className="text-center py-5">
                            <h5 className="text-muted">No publications found matching your search criteria.</h5>
                        </div>
                    )}

                    {/* Render Filtered Data */}
                    {Object.keys(filteredData)
                    .sort((a, b) => {
                        if (a === "2021 and Before") return 1;
                        if (b === "2021 and Before") return -1;
                        return parseInt(b) - parseInt(a);
                    })
                    .map(year => (
                        <div key={year} ref={(el) => (yearRefs.current[year] = el)}>
                            <div className="d-flex align-items-center mb-4">
                                <h2 className="m-0 me-3 pub-year">{year}</h2>
                                <div className="pub-year-rule"></div>
                            </div>
                            
                            {filteredData[year].map((item, index) => (
                                <div key={`${year}-${index}`} className="row research_item align-items-center mb-3 pub-item">
                                    <div className="col-md-4 mb-3 mb-md-0">
                                        <div className="pub-media">
                                            {item.poster && <div className="pub-media-bg" style={{ backgroundImage: `url(${item.poster})` }} />}
                                            <video autoPlay loop muted playsInline poster={item.poster}>
                                                {item.demo && <source type="video/mp4" src={item.demo} />}
                                            </video>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        {/* Display category badge on the item */}
                                        <span className="badge mb-2 pub-badge">
                                            {item.category || "Uncategorized"}
                                        </span>
                                        
                                        <h4 className="mb-2"><b>{item.title}</b></h4>
                                        <h6 className="mb-1 text-muted" style={{ fontSize: "0.8rem" }}><b>AUTHORS:</b> {item.authors}</h6>
                                        <h6 className="mb-3" style={{ fontSize: "0.8rem" }}>
                                            {item.status}
                                            {item.conferenceLink && (
                                                <Link className="link-success text-decoration-none fw-bold" href={item.conferenceLink} target="_blank">
                                                    {" "}{item.conference}
                                                </Link>
                                            )}
                                            {!item.conferenceLink && item.conference && (
                                                 <span className="text-success fw-bold">{" "}{item.conference}</span>
                                            )}
                                        </h6>
                                        
                                        {item.award &&  <h6 className="d-flex align-items-center mb-3" style={{ color: "#b08d00" }}>
                                            <img
                                                src="/img/icon/award_small.png"
                                                alt="award"
                                                style={{ width: "18px", height: "18px", marginRight: "6px" }}
                                                />
                                            <b>AWARD:&nbsp;</b> {item.award}</h6>}
                                            
                                        <div className="d-flex flex-wrap gap-2 mt-2" style={{ fontSize: '0.8rem' }}>
                                            {item.website && <Link className="publication-link" href={item.website} target="_blank">Project Website</Link>}
                                            {item.doi && <Link className="publication-link" href={item.doi} target="_blank">DOI</Link>}
                                            {item.video && <Link className="publication-link" href={item.video} target="_blank">VIDEO</Link>}
                                            {item.pdf && <Link className="publication-link" href={item.pdf} target="_blank">PDF</Link>}
                                            {item.presentation && <Link className="publication-link" href={item.presentation} target="_blank">PRESENTATION</Link>}
                                            {item.media && <Link className="publication-link" href={item.media} target="_blank">MEDIA</Link>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Sticky Sidebar Navigation */}
                <div className="col-md-2 d-none d-md-block" style={{ position: 'relative' }}>
                  <div style={{ 
                      position: "sticky", 
                      top: "100px", 
                      alignSelf: "start" 
                  }}>
                      <div className="text-end ps-3" style={{ borderLeft: '2px solid #E6ECF5' }}>
                        <p className="mb-3" style={{ fontFamily: "'Share Tech', monospace", fontSize: '0.8rem', letterSpacing: '0.15em', color: '#1260de' }}>JUMP TO YEAR</p>
                        
                        {Object.keys(filteredData)
                            .sort((a, b) => {
                                if (a === "2021 and Before") return 1;
                                if (b === "2021 and Before") return -1;
                                return parseInt(b) - parseInt(a);
                            })
                            .map(year => (
                            <div key={year} className="mb-2">
                                <button 
                                    onClick={() => scrollToYear(year)}
                                    className="year-nav-btn"
                                >
                                    {year}
                                </button>
                            </div>
                        ))}
                      </div>
                  </div>
                </div>

            </div>
        </SectionContainer>
    );
}