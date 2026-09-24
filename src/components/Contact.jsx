import React, { useState } from 'react';
import { Mail, MapPin, PhoneCall, Send, CheckCircle2, MessageSquare, Linkedin, ExternalLink, Briefcase, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappNumber = '94705922792'; // Sadeep's primary WhatsApp number (+94 70 592 2792)

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. sarah@company.com).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter contract details or a message.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const formattedText = `Hello Sadeep,%0A%0AI found your portfolio site (https://sadeep.vercel.app) and would like to reach out regarding a contract / inquiry:%0A%0A👤 *Name:* ${encodeURIComponent(formData.name.trim())}%0A📧 *Email:* ${encodeURIComponent(formData.email.trim())}%0A💬 *Contract Details / Message:*%0A${encodeURIComponent(formData.message.trim())}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedText}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitted(false), 7000);
    }, 500);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Let's Connect & Collaborate</div>
          <h2 className="section-title">Contract & Professional Inquiries</h2>
          <p className="section-subtitle">Looking for a Project Manager, Business Analyst, or Cloud Engineer for contract, consulting, or full-time roles? Send a direct message to WhatsApp today!</p>
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
                <div className="contact-icon" style={{ backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>WhatsApp Direct</div>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Hi%20Sadeep,%20I%20would%20like%20to%20connect%20regarding%20a%20project/role.`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ fontWeight: 600, color: '#25D366', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>+94 70 592 2792</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone Call</div>
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
                    <span>linkedin.com/in/sadeep-sasanka</span>
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

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25D366', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Briefcase size={18} />
                <span>Open for Contract & Hiring</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Submitting the form below will instantly format your contract details and send them directly to Sadeep's WhatsApp!
              </p>
            </div>
          </div>

          <div className="glass-card contact-form-card">
            {submitted && (
              <div className="form-toast" style={{ backgroundColor: 'rgba(37, 211, 102, 0.2)', borderColor: '#25D366', color: '#f8fafc' }}>
                <CheckCircle2 size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle', color: '#25D366' }} />
                Redirecting to WhatsApp with your formatted contract message...
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Sarah Jenkins"
                  className="form-input"
                  style={errors.name ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' } : {}}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                {errors.name && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} />
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g. sarah@company.com"
                  className="form-input"
                  style={errors.email ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' } : {}}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {errors.email && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Contract Details / Message *</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Details regarding your project, contract terms, scope, or hiring inquiry..."
                  className="form-textarea"
                  style={errors.message ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' } : {}}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                ></textarea>
                {errors.message && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} />
                    <span>{errors.message}</span>
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', backgroundColor: '#25D366', borderColor: '#25D366', color: '#070c18', fontWeight: 700 }} 
                disabled={loading}
              >
                {loading ? (
                  <span>Opening WhatsApp...</span>
                ) : (
                  <>
                    <MessageSquare size={18} />
                    <span>Send Contract Inquiry to WhatsApp</span>
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
