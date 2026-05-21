// src/pages/projects.js

import { useState } from 'react';
import SectionContainer from '@/components/section_container';
import { projectsData } from '@/data/projects_data';

export default function Projects() {
    const [filter, setFilter] = useState('Ongoing'); // Default to showing ongoing projects

    // Filter the projects based on the selected tab
    const filteredProjects = projectsData.filter(project => {
        if (filter === 'All') return true;
        return project.status === filter;
    });

    return (
        <SectionContainer>
            {/* Header Section */}
            <div style={{ width: '50px', height: '5px', backgroundColor: '#1260de', marginBottom: '10px' }}></div>
            <h2 style={{ fontWeight: '800', marginBottom: '20px' }}>Research Projects</h2>

            {/* Filter Tabs */}
            <div className="d-flex gap-3 mb-5 border-bottom pb-2">
                {['Ongoing', 'Completed', 'All'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0 0 5px 0',
                            fontSize: '1rem',
                            fontWeight: filter === tab ? 'bold' : 'normal',
                            color: filter === tab ? '#1260de' : '#666',
                            borderBottom: filter === tab ? '3px solid #1260de' : '3px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {tab} Projects
                    </button>
                ))}
            </div>

            {/* Projects List */}
            <div className="row">
                {filteredProjects.map((project) => (
                    <div className="col-12 mb-5" key={project.id}>
                        <div className="row align-items-center">
                            <div className="col-md-5 mb-4 mb-md-0">
                                <div style={{
                                    width: '100%',
                                    paddingTop: '60%',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '1px solid #eee',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                }}>
                                    {/* Fallback gray box if image is missing, otherwise shows image */}
                                    {project.image ? (
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }}
                                        />
                                    ) : (
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#f8f9fa' }}></div>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Project Details (FSL / ARML Style) */}
                            <div className="col-md-7 ps-md-4">
                                <div className="d-flex gap-2 mb-2 align-items-center">
                                    <span className="tag-badge" style={{ backgroundColor: '#333', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {project.field}
                                    </span>
                                    <span className="tag-badge" style={{ backgroundColor: project.status === 'Ongoing' ? '#1260de' : '#6c757d', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {project.status}
                                    </span>
                                </div>

                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.4' }}>
                                    {project.title}
                                </h4>

                                <table style={{ width: '100%', fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '80px', fontWeight: 'bold', paddingBottom: '8px' }}>Agency</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.agency}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold', paddingBottom: '8px' }}>Period</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.period}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold', paddingBottom: '8px' }}>Role</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.role}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
                                    {project.description}
                                </p>
                            </div>

                        </div>
                        {/* Divider line between projects */}
                        <hr style={{ marginTop: '40px', borderTop: '1px solid #eee' }} />
                    </div>
                ))}
                
                {/* Fallback if no projects match the filter */}
                {filteredProjects.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <p style={{ color: '#888' }}>No projects found for this category.</p>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}