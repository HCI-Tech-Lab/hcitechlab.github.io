import SectionContainer from "@/components/section_container";
import Link from "next/link";
import { postdocs, phdStudents, interns, msStudents, gradAlumni, internAlumni } from "@/data/members_data";
import MemberImage from "@/components/member_image";
import { Fragment, useState, useRef } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function Team() {
    return (
        <SectionContainer>
            {/* 1. Hero Group Photo Section */}
            <div className="text-center mb-5 pb-3">
                <div className="mb-4">
                    <span className="section-eyebrow">People of HCI Tech Lab</span>
                    <h1 className="section-title">Our Team</h1>
                </div>
                <div className="media-frame" style={{ maxWidth: "450px", margin: "0 auto" }}>
                    <img className="img-fluid" src="./img/Lab/Group/2024_05_0.jpg" alt="HCI Tech Lab Group" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div className="mt-4">
                    <Link href="/gallery" className="section-link">
                        View All Group Photos ↗
                    </Link>
                </div>
            </div>

            {/* 2. Faculty Section (Custom Layout) */}
            <ProfessorCard />

            {/* 3. Reusable Member Sections */}
            <MemberSection title="Post-Doc" members={postdocs} />
            <MemberSection title="Ph.D. Students" members={phdStudents} />
            <MemberSection title="M.S. Students" members={msStudents} />
            <MemberSection title="Interns" members={interns} />

            {/* 4. Administrative Staff */}
            <AdministrativeStaff />

            {/* 5. Alumni Sections */}
            <div className="row mt-5 pt-4 border-top">
                <div className="col-md-6 mb-4">
                    <AlumniSection title="Alumni (Graduate Students)" alumniData={gradAlumni} type="grad" />
                </div>
                <div className="col-md-6 mb-4">
                    <AlumniSection title="Alumni (Interns)" alumniData={internAlumni} type="intern" />
                </div>
            </div>
        </SectionContainer>
    );
}

// --- REUSABLE COMPONENT FOR ALL STANDARD MEMBERS ---
const MemberSection = ({ title, members }) => {
    if (!members || members.length === 0) return null;

    return (
        <div className="mb-5 pb-1">
            <h2 className="team-title mb-4">{title}</h2>
            <div className="row justify-content-center g-4">
                {members.map((member, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
                        <div className="card h-100 border-0 shadow-sm text-center p-3 member-card" style={{ borderRadius: "16px", transition: "transform 0.3s ease, box-shadow 0.3s ease", backgroundColor: "#fdfdfd" }}>
                            
                            {/* FIX: Removed 'height', 'overflow: hidden', and 'borderRadius: 50%'. 
                                Now it just restrains the max-width and lets the original component breathe. */}
                            <div className="mb-3 mx-auto" style={{ maxWidth: "160px" }}>
                                <MemberImage originalImage={member.img} hoverImage={member.hoverImg} />
                            </div>
                            
                            <h5 className="fw-bold mb-1">{member.name}</h5>
                            
                            <p className="text-muted small mb-0" style={{ minHeight: "40px", lineHeight: "1.3" }}>
                                {member.interest === "Research Interest" ? "HCI Researcher" : member.interest}
                            </p>

                            {/* Contact Icons */}
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                {member.link !== "#" && (
                                    <Link href={member.link} target="_blank" className="contact-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-house-door-fill" style={{ color: "#1260de" }} />
                                    </Link>
                                )}
                                {member.mail !== "#" && (
                                    <Link href={`mailto:${member.mail}`} target="_blank" className="contact-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-envelope-fill" style={{ color: '#005184' }} />
                                    </Link>
                                )}
                                {member.linkedin !== "#" && (
                                    <Link href={member.linkedin} target="_blank" className="contact-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-linkedin" style={{ color: "#0A66C2" }} />
                                    </Link>
                                )}
                            </div>
                            
                            {/* Notes/Advising info */}
                            {member.note && (
                                <div className="mt-3 pt-2 border-top">
                                    <span className="text-secondary" style={{ fontSize: "0.75rem", fontStyle: "italic" }}>{member.note}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PROFESSOR CARD ---
const ProfessorCard = () => {
    return (
        <div className="mb-5 pb-3">
            <h2 className="team-title mb-4">Professor</h2>
            <div className="card member-card p-4" style={{ borderRadius: "16px" }}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-4 text-center mb- mb-md-0">
                        {/* FIX: Removed strict cropping wrapper here too */}
                        <div className="mx-auto" style={{ maxWidth: "220px" }}>
                            <MemberImage originalImage="img/Member/Sang.jpg" hoverImage="main_icon.png" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3 className="fw-bold mb-3" style={{ color: "#1260de" }}>Sang Ho Yoon</h3>
                        
                        <div className="mb-3" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                            <strong>Associate Professor</strong> @ <Link href="https://ct.kaist.ac.kr/boards/view/faculty_board/119" target="_blank" className="text-decoration-none">Graduate School of Culture Technology</Link><br />
                            <strong>Joint Professor</strong>@<br></br>
                            <Link href="https://cs.kaist.ac.kr/people/view?idx=626&kind=faculty&menu=160" target="_blank" className="text-muted text-decoration-none ms-3">• School of Computing</Link><br />
                            <Link href="https://meta.kaist.ac.kr/" target="_blank" className="text-muted text-decoration-none ms-3">• Graduate School of Metaverse</Link><br />
                            <Link href="https://robots.kaist.ac.kr/" target="_blank" className="text-muted text-decoration-none ms-3">• Robotics Program</Link><br />
                            <Link href="https://ax.kaist.ac.kr/" target="_blank" className="text-muted text-decoration-none ms-3">• Department of AX</Link><br />
                            <strong>Member</strong> of <Link href="https://hci.kaist.ac.kr/" target="_blank" className="text-decoration-none">KAIST HCI Group</Link>
                        </div>
                        
                        <p className="text-muted small mb-4"><i className="bi bi-geo-alt-fill me-2"></i>Office: KAIST N5</p>
                        
                        <div className="d-flex gap-3 align-items-center">
                            <Link href="https://sanghoy.com/" target="_blank" className="btn btn-primary rounded-pill px-4">
                                <i className="bi bi-house-door-fill me-2" />Homepage
                            </Link>
                            <Link href="mailto:sangho@kaist.ac.kr" target="_blank" className="contact-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-envelope-fill" style={{ color: '#005184' }}/>
                            </Link>
                            <Link href="https://www.linkedin.com/in/sanghoy" target="_blank" className="contact-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-linkedin" style={{ color: "#0A66C2" }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ADMIN STAFF ---
const AdministrativeStaff = () => {
    const staff = [
        { name: "Nahyeong Kim", img: "img/Member/NK.jpg", email: "kimnahyeong@kaist.ac.kr" },
        { name: "EunJi Cho", img: "img/Member/EC.png", email: "choangie@kaist.ac.kr" }
    ];

    return (
        <div className="mb-3">
            <h2 className="team-title mb-4">Administrative Staff</h2>
            <div className="row justify-content-center g-4">
                {staff.map((member, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
                        <div className="card h-100 border-0 shadow-sm text-center p-3 member-card" style={{ borderRadius: "16px", backgroundColor: "#fdfdfd", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                            {/* FIX: Removed strict cropping wrapper */}
                            <div className="mb-3 mx-auto" style={{ maxWidth: "160px" }}>
                                <MemberImage originalImage={member.img} hoverImage="main_icon.png" />
                            </div>
                            <h6 className="fw-bold mb-3">{member.name}</h6>
                            <div className="mt-auto">
                                <Link href={`mailto:${member.email}`} target="_blank" className="contact-icon rounded-circle d-flex align-items-center justify-content-center mx-auto">
                                    <i className="bi bi-envelope-fill" style={{ color: '#005184' }}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- ALUMNI ACCORDION ---
const AlumniSection = ({ title, alumniData, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div className="card border-0" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #E6ECF5", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)" }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-light d-flex justify-content-between align-items-center w-100 p-4 text-start border-0"
                style={{ backgroundColor: isOpen ? "#f1f5f9" : "#ffffff" }}
            >
                <h5 className="fw-bold m-0" style={{ color: "#001f3f" }}>{title}</h5>
                {isOpen ? <ChevronDown size={20} className="text-primary" /> : <ChevronRight size={20} className="text-secondary" />}
            </button>
            
            <div 
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: isOpen ? 1 : 0,
                    backgroundColor: "#ffffff"
                }}
            >
                <div className="p-4 pt-2">
                    <ul className="list-group list-group-flush">
                        {alumniData.map((member, index) => (
                            <li key={index} className="list-group-item px-0 py-3 border-bottom-0 border-top" style={{ fontSize: "0.95rem" }}>
                                
                                {/* LINE 1: Name, Degree Type, and Thesis (if applicable) */}
                                <div className="mb-1 d-flex align-items-center flex-wrap gap-2">
                                    {member.nameLink === '#' ? 
                                        <strong className="fs-6" style={{ color: "#001f3f" }}>{member.name}</strong> : 
                                        <Link href={member.nameLink} target="_blank" className="fw-bold text-primary fs-6 text-decoration-none">{member.name}</Link>
                                    }
                                    <span className="badge rounded-pill" style={{ backgroundColor: "#EDF3FE", color: "#0B2A6B", border: "1px solid #D6E4FD", fontWeight: 600 }}>{member.title}</span>
                                    
                                    {/* Moved Thesis link up here so it sits neatly next to the degree type */}
                                    {type === 'grad' && member.thesisLink !== '#' && (
                                        <Link href={member.thesisLink} target="_blank" className="btn btn-sm btn-outline-primary rounded-pill py-0 px-2" style={{ fontSize: "0.75rem" }}>
                                            <i className="bi bi-journal-text me-1"></i>Thesis
                                        </Link>
                                    )}
                                </div>
                                
                                {/* LINE 2: Period */}
                                <div className="text-muted small mb-1">
                                    <i className="bi bi-calendar3 me-2"></i>{member.period}
                                </div>
                                
                                {/* LINE 3: Next Destination (Only renders if it exists) */}
                                {member.current && String(member.current).trim() !== '' && (
                                    <div className="text-dark small">
                                        <i className="bi bi-building me-2 text-muted"></i>{member.current}
                                    </div>
                                )}

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};