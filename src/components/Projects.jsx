import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles, Image as ImageIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Featured Work</div>
          <h2 className="section-title">Projects & Applications</h2>
          <p className="section-subtitle">A collection of machine learning models, web platforms, and cloud infrastructure I've engineered.</p>
        </div>

        {/* Filter Tabs */}
        <div className="project-filter-tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              <div 
                className="project-preview" 
                style={{ background: project.imageBg }}
              >
                {project.galleryImages ? (
                  <img 
                    src={project.galleryImages[0].url} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff', padding: '0.5rem', borderRadius: '12px' }}
                  />
                ) : (
                  <div className="project-mockup-title">{project.title}</div>
                )}

                <div className="project-preview-overlay">
                  <button 
                    onClick={() => setSelectedProject(project)} 
                    className="btn btn-primary btn-sm"
                  >
                    {project.galleryImages ? <ImageIcon size={16} /> : <Eye size={16} />}
                    <span>{project.galleryImages ? 'View 5 ML Charts' : 'Quick View'}</span>
                  </button>
                </div>
              </div>

              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>

                <div className="project-footer">
                  <span className="project-metric">{project.metrics}</span>
                  <div className="project-link-group">
                    <button 
                      onClick={() => setSelectedProject(project)} 
                      className="social-icon-btn" 
                      style={{ width: '34px', height: '34px' }}
                      title="Project Info & Charts"
                    >
                      <Eye size={16} />
                    </button>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="social-icon-btn"
                      style={{ width: '34px', height: '34px' }}
                      title="View GitHub"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
