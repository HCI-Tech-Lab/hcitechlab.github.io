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
            <div className="mb-4">
                <span className="section-eyebrow">Funded research</span>
                <h2 className="section-title">Research Projects</h2>
            </div>

            {/* Filter Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-5">
                {['Ongoing', 'Completed', 'All'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`filter-pill ${filter === tab ? 'active' : ''}`}
                    >
                        {tab} Projects
                    </button>
                ))}
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
                                    <span className="tag-badge" style={{ backgroundColor: project.status === 'Ongoing' ? '#1260de' : '#98A2B3' }}>
                                        {project.status}
                                    </span>
                                </div>

                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.4' }}>
                                    {project.title}
                                </h4>

                                <table style={{ width: '100%', fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
                                    <tbody>
                                        <tr>
                                            <td className="project-label" style={{ width: '90px', paddingBottom: '8px' }}>Agency</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.agency}</td>
                                        </tr>
                                        <tr>
                                            <td className="project-label" style={{ paddingBottom: '8px' }}>Period</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.period}</td>
                                        </tr>
                                        <tr>
                                            <td className="project-label" style={{ paddingBottom: '8px' }}>Role</td>
                                            <td style={{ paddingBottom: '8px' }}>{project.role}</td>
                                        </tr>
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
                        <p style={{ color: '#888' }}>No projects found for this category.</p>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}