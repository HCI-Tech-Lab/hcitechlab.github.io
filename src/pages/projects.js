// src/pages/projects.js

import { useState } from 'react';
import SectionContainer from '@/components/section_container';
import { projectsData } from '@/data/projects_data';

export default function Projects() {
    const [category, setCategory] = useState('Lab'); // Default to Lab Projects

    // Filter by project category (entries without a type default to Lab)
    const filteredProjects = projectsData.filter(project => (project.type || 'Lab') === category);

    return (
        <SectionContainer>
            {/* Header Section */}
            <div className="mb-4">
                <span className="section-eyebrow">Funded research</span>
                <h2 className="section-title">Research Projects</h2>
            </div>

            {/* Category Tabs: Lab (blue) / Researcher (green) */}
            <div className="d-flex flex-wrap gap-2 mb-5">
                <button
                    onClick={() => setCategory('Lab')}
                    className={`filter-pill ${category === 'Lab' ? 'active' : ''}`}
                >
                    Lab Projects
                </button>
                <button
                    onClick={() => setCategory('Researcher')}
                    className={`filter-pill pill-green ${category === 'Researcher' ? 'active' : ''}`}
                >
                    Researcher Projects
                </button>
            </div>

            {/* Projects List */}
            <div className="row">
                {filteredProjects.map((project) => (
                    <div className="col-12 mb-4" key={project.id}>
                        <div className="project-card">
                        <div className="row align-items-center">
                            <div className="col-md-5 mb-4 mb-md-0">
                                <div className="project-media">
                                    {/* Fallback empty tile if image is missing, otherwise shows image */}
                                    {project.image && (
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Project Details (FSL / ARML Style) */}
                            <div className="col-md-7 ps-md-4">
                                <div className="d-flex gap-2 mb-2 align-items-center">
                                    <span className="tag-badge" style={{ backgroundColor: '#0B2A6B' }}>
                                        {project.field}
                                    </span>
                                    <span className="tag-badge" style={{ backgroundColor: project.status === 'Ongoing' ? ((project.type || 'Lab') === 'Researcher' ? '#0A7D4D' : '#1260de') : '#98A2B3' }}>
                                        {project.status}
                                    </span>
                                </div>

                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.4' }}>
                                    {project.title}
                                </h4>

                                <table style={{ width: '100%', fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
                                    <tbody>
                                        {project.agency && (
                                            <tr>
                                                <td className="project-label" style={{ width: '90px', paddingBottom: '8px' }}>Agency</td>
                                                <td style={{ paddingBottom: '8px' }}>{project.agency}</td>
                                            </tr>
                                        )}
                                        {project.researcher && (
                                            <tr>
                                                <td className="project-label" style={{ width: '90px', paddingBottom: '8px' }}>Researcher</td>
                                                <td style={{ paddingBottom: '8px' }}>{project.researcher}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="project-label" style={{ paddingBottom: '8px' }}>Period</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.period}</td>
                                        </tr>
                                        {project.role && (
                                            <tr>
                                                <td className="project-label" style={{ paddingBottom: '8px' }}>Role</td>
                                                <td style={{ paddingBottom: '8px' }}>{project.role}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
                                    {project.description}
                                </p>
                            </div>

                        </div>
                        </div>
                    </div>
                ))}
                
                {/* Fallback if no projects match the filter */}
                {filteredProjects.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <p style={{ color: '#888' }}>No {category === 'Lab' ? 'lab' : 'researcher'} projects listed yet.</p>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}