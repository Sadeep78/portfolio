import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle, Zap, Image as ImageIcon } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        <div className="modal-header" style={{ background: project.imageBg }}>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
          
          <div style={{ padding: '2rem 1rem 1rem 1rem', color: '#ffffff' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', border: 'none', marginBottom: '0.75rem' }}>
              {project.category}
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{project.title}</h2>
            <p style={{ opacity: 0.9, fontSize: '1rem' }}>{project.subtitle}</p>
          </div>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0' }}>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              <ExternalLink size={16} />
              <span>Live Profile / Demo</span>
            </a>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
              <Github size={16} />
              <span>Source Code</span>
            </a>
          </div>

          {/* Interactive ML Visualizations Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div style={{ marginBottom: '2rem', padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                <ImageIcon size={20} />
                <span>Model Evaluation Charts & Visualizations</span>
              </div>

              {/* Main Active Chart */}
              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#ffffff', padding: '0.5rem', marginBottom: '0.75rem' }}>
                <img 
                  src={project.galleryImages[activeImageIndex].url} 
                  alt={project.galleryImages[activeImageIndex].title} 
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block' }}
                />
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', marginBottom: '1rem' }}>
                {project.galleryImages[activeImageIndex].title}
              </div>

              {/* Thumbnails Navigation */}
              <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {project.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '72px',
                      height: '52px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                      backgroundColor: '#ffffff',
                      padding: '2px'
                    }}
                  >
                    <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Project Overview</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {project.description}
          </p>

          {project.highlights && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Key Highlights & Architecture</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <CheckCircle size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
              <Zap size={16} />
              <span>Performance Metric</span>
            </div>
            <div style={{ color: 'var(--text-primary)', marginTop: '0.25rem', fontSize: '0.95rem' }}>
              {project.metrics}
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Technologies Used</h3>
          <div className="project-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag" style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
