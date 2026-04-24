import SectionContainer from "@/components/section_container";
import { gct565_data } from "@/data/course_data/gct565_data";
import { ctp445_data } from "@/data/course_data/ctp445_data";
import { gct722_data } from "@/data/course_data/gct722_data";
import { gct623_data } from "@/data/course_data/gct623_data";
import Link from "next/link";

export default function Courses() {
    return (
      <SectionContainer>
        {/* Standardized Header matching News/Gallery */}
        <h2 style={{ fontWeight: '800', marginBottom: '5px' }}>Courses</h2>

        <div className="row g-4"> {/* g-4 adds consistent gap spacing between grid items */}
            
            {/* Course Card 1 */}
            <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
                    <div className="mb-3">
                        <span className="badge mb-2" style={{ backgroundColor: '#e5f4ff', color: '#005bb6', padding: '6px 10px', fontSize: '1rem' }}>GCT 565</span>
                        <h4 className="fw-bold mb-2" style={{ color: '#001f3f' }}>Augmented Humans</h4>
                    </div>
                    <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This course explores various aspects (interfaces, sensing & haptics, applications) of augmented humans.
                    </p>
                    
                    <div className="mt-auto">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '1px' }}>Semester Archives</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {gct565_data.slice().reverse().map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={`/gct565/${item.course_info.code.toLowerCase()}`}
                                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                                    style={{ fontSize: '0.9rem' }}
                                    target="_blank"             
                                    rel="noopener noreferrer" 
                                >
                                    {item.course_info.code.replace('GCT565 ', '').replace('GCT.50065 ', '')}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Card 2 */}
            <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
                    <div className="mb-3">
                        <span className="badge mb-2" style={{ backgroundColor: '#f3e8fd', color: '#9334e6', padding: '6px 10px', fontSize: '1rem' }}>CTP 445</span>
                        <h4 className="fw-bold mb-2" style={{ color: '#001f3f' }}>Augmented Reality</h4>
                    </div>
                    <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This course explores core knowledge relating to augmented reality including augmented interfaces, sensing technology, visualization, and applications.
                    </p>
                    
                    <div className="mt-auto">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '1px' }}>Semester Archives</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {ctp445_data.slice().reverse().map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={`/ctp445/${item.course_info.code.toLowerCase()}`}
                                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                                    style={{ fontSize: '0.9rem' }}
                                    target="_blank"             
                                    rel="noopener noreferrer" 
                                >
                                    {item.course_info.code.replace('CTP445 ', '').replace('CTP.40045 ', '')}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Card 3 */}
            <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
                    <div className="mb-3">
                        <span className="badge mb-2" style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '6px 10px', fontSize: '1rem' }}>GCT 722</span>
                        <h4 className="fw-bold mb-2" style={{ color: '#001f3f' }}>Interactive Haptic Technologies</h4>
                        <span className="text-success small fw-bold">Offered Biennially</span>
                    </div>
                    <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This course will cover interactive haptic technologies for XR/AR/VR, Mobile/Ubiquitous Computing, and Tangible & Object Interface.
                    </p>
                    
                    <div className="mt-auto">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '1px' }}>Semester Archives</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {gct722_data.slice().reverse().map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={`/gct722/${item.course_info.code.toLowerCase()}`}
                                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                                    style={{ fontSize: '0.9rem' }}
                                    target="_blank"             
                                    rel="noopener noreferrer" 
                                >
                                    {item.course_info.code.replace('GCT722 ', '')}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Card 4 */}
            <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
                    <div className="mb-3">
                        <span className="badge mb-2" style={{ backgroundColor: '#fef7e0', color: '#b06000', padding: '6px 10px', fontSize: '1rem' }}>GCT/MV 623</span>
                        <h4 className="fw-bold mb-2" style={{ color: '#001f3f' }}>Interaction Sensing Principle & Application</h4>
                    </div>
                    <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This course will educate core principles of 3D & Physical sensing adopted for human-computer interaction.
                    </p>
                    
                    <div className="mt-auto">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '1px' }}>Semester Archives</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {gct623_data.slice().reverse().map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={`/gct623/${item.course_info.code.toLowerCase()}`}
                                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                                    style={{ fontSize: '0.9rem' }}
                                    target="_blank"             
                                    rel="noopener noreferrer" 
                                >
                                    {item.course_info.code.replace('GCT & MV 623 ', '')}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </SectionContainer>
    );
}