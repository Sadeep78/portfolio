import React, { useState } from 'react';
import { ShieldCheck, Cpu, LayoutGrid, CheckCircle, Award, Users, Globe, ExternalLink, Eye, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import CertificateModal from './CertificateModal';

export default function About() {
  const { about, stats, certifications, organizations, languages } = portfolioData;
  const [activeCert, setActiveCert] = useState(null);

  const principleIcons = [
    <Cpu size={24} key="cpu" />,
    <LayoutGrid size={24} key="layout" />,
    <ShieldCheck size={24} key="shield" />
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">{about.title}</h2>
          <p className="section-subtitle">{about.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ marginBottom: '4rem' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card stat-card">
              <div className="stat-number" style={{ fontSize: '2.2rem' }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Specialization & Principles */}
        <div className="about-content" style={{ marginBottom: '5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Project Management & Systems Engineering
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Pursuing Information Systems Engineering at SLIIT Malabe with 2+ years of experience in Project Management and Business Analysis. I bridge business requirements with software development lifecycles, AWS cloud infrastructure, and enterprise Java & Node.js platforms.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }} />
                <span>University of Moratuwa (CODL) Certified in Python & Web Design</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }} />
                <span>SLIIT Faculty of Computing (CODE) Certified AI/ML Engineer Stage 1 & 2</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }} />
                <span>Certified Agile Scrum Master (Simplilearn) & AWS Cloud Intern (Decodelabs)</span>
              </div>
            </div>

            {/* Languages Spoken */}
            {languages && (
              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
                  <Globe size={18} />
                  <span>Languages Spoken</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {languages.map((lang, lIdx) => (
                    <span key={lIdx} className="badge" style={{ backgroundColor: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)', borderColor: 'rgba(6, 182, 212, 0.25)' }}>
                      <strong>{lang.name}</strong>: {lang.level}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="principles-grid">
            {about.principles.map((principle, idx) => (
              <div key={idx} className="glass-card principle-card">
                <div className="principle-icon">
                  {principleIcons[idx % principleIcons.length]}
                </div>
                <div>
                  <h4 className="principle-title">{principle.title}</h4>
                  <p className="principle-desc">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Licenses & Certifications Grid */}
        <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>Verified Licenses & Certifications</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Official certificates from University of Moratuwa (CODL), SLIIT CODE, Simplilearn, and Google Developer Groups. Click to view or download!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={24} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{cert.title}</h4>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', backgroundColor: 'rgba(6, 182, 212, 0.12)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                      {cert.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0.75rem 0', lineHeight: 1.5 }}>
                    {cert.issuer}
                    <div style={{ marginTop: '0.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Credential Code: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cert.credentialId}</span>
                    </div>
                  </div>

                  {/* View & Download Certificate Actions */}
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                    {cert.pdfUrl && (
                      <button 
                        onClick={() => setActiveCert(cert)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Eye size={14} />
                        <span>View Certificate</span>
                      </button>
                    )}

                    {cert.pdfUrl && (
                      <a 
                        href={cert.pdfUrl}
                        download={cert.fileName || `${cert.title}.pdf`}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Download size={14} />
                        <span>{cert.pdfUrlAlt ? 'Download Files' : 'Download PDF'}</span>
                      </a>
                    )}

                    {cert.verifyUrl && (
                      <a 
                        href={cert.verifyUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', alignSelf: 'center' }}
                      >
                        <span>open.uom.lk</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                  <div className="project-tags">
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="project-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Modal Popup */}
        <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />

        {/* Organizations & Leadership */}
        {organizations && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Organizations & Leadership</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Community development, youth leadership, and developer group participation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {organizations.map((org, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{org.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{org.period}</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {org.role}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {org.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
