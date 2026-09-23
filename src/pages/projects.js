// src/pages/projects.js

import { useState } from 'react';
import ResearchHeader from '@/components/research_header';
import { projectsData } from '@/data/projects_data';

const ProjectCard = ({ project, number, variant }) => (
    <div className={`project-tile ${variant === 'Researcher' ? 'is-green' : ''}`}>
        <div className="project-tile-media">
            {project.image ? (
                <img loading="lazy" decoding="async" src={project.image} alt={project.title} />
            ) : (
                <i className="bi bi-image" aria-hidden="true" />
            )}
        </div>

        <div className="project-tile-body">
            <div className="mb-2">
                <span
                    className="tag-badge"
                    style={{
                        backgroundColor:
                            project.status === 'Ongoing'
                                ? (variant === 'Researcher' ? '#0A7D4D' : '#1260de')
                                : '#98A2B3',
                    }}
                >
                    {project.status}
                </span>
            </div>

            <h3 className="project-tile-title">
                {number}. {project.title}
            </h3>

            <dl className="project-meta">
                {project.agency && (<><dt className="project-label">Agency</dt><dd>{project.agency}</dd></>)}
                {project.program && (<><dt className="project-label">Program</dt><dd>{project.program}</dd></>)}
                {project.researcher && (<><dt className="project-label">Researcher</dt><dd>{project.researcher}</dd></>)}
                {project.period && (<><dt className="project-label">Period</dt><dd>{project.period}</dd></>)}
                {project.role && (<><dt className="project-label">Role</dt><dd>{project.role}</dd></>)}
                {project.field && (<><dt className="project-label">Field</dt><dd>{project.field}</dd></>)}
            </dl>

            {project.description && <p className="project-tile-desc">{project.description}</p>}
        </div>
    </div>
);

const ProjectGroup = ({ title, projects, variant }) => {
    if (projects.length === 0) return null;
    return (
        <section className="mb-5">
            <h2 className={`project-group-title ${variant === 'Researcher' ? 'is-green' : ''}`}>{title}</h2>
            {/* 2 per row on desktop (lg+), 1 per row below */}
            <div className="row g-4">
                {projects.map((project, i) => (
                    <div className="col-12 col-lg-6" key={`${project.title}-${i}`}>
                        <ProjectCard project={project} number={i + 1} variant={variant} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default function Projects() {
    const [category, setCategory] = useState('Lab'); // Default to Lab Projects

    // Entries without a type default to Lab
    const inCategory = projectsData.filter((p) => (p.type || 'Lab') === category);
    const ongoing = inCategory.filter((p) => p.status === 'Ongoing');
    const completed = inCategory.filter((p) => p.status !== 'Ongoing');

    return (
        <>
            <ResearchHeader current="projects" />

            <div className="container pb-5">
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

                <ProjectGroup title="Ongoing projects" projects={ongoing} variant={category} />
                <ProjectGroup title="Completed projects" projects={completed} variant={category} />

                {inCategory.length === 0 && (
                    <div className="text-center py-5">
                        <p style={{ color: '#888' }}>
                            No {category === 'Lab' ? 'lab' : 'researcher'} projects listed yet.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
