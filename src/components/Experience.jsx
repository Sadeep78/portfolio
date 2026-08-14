import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Career Path</div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">My journey across engineering teams and product delivery.</p>
        </div>

        <div className="timeline">
          {experience.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 className="timeline-role">{item.role}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="timeline-company">{item.company}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="timeline-desc">{item.description}</p>

                <div className="project-tags">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="project-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
