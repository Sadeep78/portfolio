import React, { useState } from 'react';
import { Mail, MapPin, PhoneCall, Send, CheckCircle2, MessageSquare, Linkedin, ExternalLink, Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Let's Connect & Collaborate</div>
          <h2 className="section-title">Contract & Professional Inquiries</h2>
          <p className="section-subtitle">Looking for a Project Manager, Business Analyst, or Cloud Engineer for contract, consulting, or full-time roles? Reach out today!</p>
        </div>

        <div className="contact-container">
          <div className="glass-card contact-info-card">
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Contact & Hiring Details
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Available for Contract, Consulting, and Full-time positions in Colombo, Galle, On-site, Hybrid, or Remote.
              </p>

              <div className="contact-item">
                <div className="contact-icon">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone Number</div>
                  <a href="tel:+94705922792" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {personal.phone}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email Address</div>
                  <a href={`mailto:${personal.email}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>LinkedIn Profile</div>
                  <a 
                    href={personal.socials.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ fontWeight: 600, color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>linkedin.com/in/sadeep-sasanka-618a951b8</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{personal.location}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Briefcase size={18} />
                <span>Open for Contract & Hiring</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Seeking Project Manager & Business Analyst contract roles. Direct response within 24 hours.
              </p>
            </div>
          </div>

          <div className="glass-card contact-form-card">
            {submitted && (
              <div className="form-toast">
                <CheckCircle2 size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Thank you! Your inquiry has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Contract Details / Message</label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  placeholder="Details regarding your project, contract terms, or hiring inquiry..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
