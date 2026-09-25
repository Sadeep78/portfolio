import React, { useState } from 'react';
import { Mail, MapPin, PhoneCall, Send, CheckCircle2, MessageSquare, Linkedin, ExternalLink, Briefcase, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { countryCodes, validatePhoneByCountry, validateEmailStrict, SearchableCountrySelect } from './Services';

export default function Contact() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    countryCode: '+94',
    phone: '',
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappNumber = '94705922792'; // Sadeep's primary WhatsApp number (+94 70 592 2792)

  // Real-time Single Field Validation
  const validateField = (field, value, currentForm = formData) => {
    const nameRegex = /^[a-zA-Z\s\.\'-]+$/;

    if (field === 'name') {
      if (!value || !value.trim()) return 'Please enter your full name.';
      const trimmed = value.trim();
      const words = trimmed.split(/\s+/).filter(Boolean);
      if (words.length < 2) {
        return 'Please enter both First Name and Last Name with a space (e.g. Ruwan Silva).';
      }
      if (/\d/.test(trimmed)) return 'Name cannot contain numbers. Please use letters only.';
      if (!nameRegex.test(trimmed)) return 'Name should contain letters and spaces only.';
      return null;
    }

    if (field === 'email') {
      return validateEmailStrict(value);
    }

    if (field === 'phone') {
      if (value && value.trim()) {
        return validatePhoneByCountry(currentForm.countryCode, value);
      }
      return null;
    }

    if (field === 'message') {
      if (!value || !value.trim()) return 'Please enter contract details or a message.';
      if (value.trim().length < 5) return 'Message must be at least 5 characters long.';
      return null;
    }

    return null;
  };

  const markTouchedAndValidate = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const validateAll = () => {
    const activeErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message)
    };

    setTouched({ name: true, email: true, phone: true, message: true });

    const filtered = {};
    Object.keys(activeErrors).forEach(k => {
      if (activeErrors[k]) filtered[k] = activeErrors[k];
    });

    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);

    const fullPhone = formData.phone.trim() ? `${formData.countryCode} ${formData.phone.trim()}` : 'N/A';

    const formattedText = `Hello Sadeep,%0A%0AI found your portfolio site (https://sadeep.vercel.app) and would like to reach out regarding a contract / inquiry:%0A%0A👤 *Name:* ${encodeURIComponent(formData.name.trim())}%0A📧 *Email:* ${encodeURIComponent(formData.email.trim())}%0A📞 *Phone:* ${encodeURIComponent(fullPhone)}%0A💬 *Contract Details / Message:*%0A${encodeURIComponent(formData.message.trim())}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedText}`;

    setLoading(false);
    setSubmitted(true);

    setTimeout(() => {
      try {
        window.location.href = whatsappUrl;
      } catch (err) {
        window.open(whatsappUrl, '_blank');
      }
      setFormData({ name: '', email: '', countryCode: '+94', phone: '', message: '' });
      setErrors({});
      setTouched({});
      setTimeout(() => setSubmitted(false), 6000);
    }, 400);
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
              
              {/* Full Name */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" htmlFor="name" style={{ margin: 0 }}>Your Name *</label>
                  {touched.name && !errors.name && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Valid Name
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Ruwan Silva"
                  className="form-input"
                  autoCapitalize="words"
                  style={
                    touched.name && errors.name
                      ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                      : touched.name && !errors.name && formData.name
                      ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                      : {}
                  }
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, name: val });
                    markTouchedAndValidate('name', val);
                  }}
                  onBlur={() => markTouchedAndValidate('name', formData.name)}
                />
                {touched.name && errors.name && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} />
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" htmlFor="email" style={{ margin: 0 }}>Email Address *</label>
                  {touched.email && !errors.email && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Valid Email
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  id="email"
                  inputMode="email"
                  placeholder="e.g. ruwan@gmail.com"
                  className="form-input"
                  style={
                    touched.email && errors.email
                      ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                      : touched.email && !errors.email && formData.email
                      ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                      : {}
                  }
                  value={formData.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, email: val });
                    markTouchedAndValidate('email', val);
                  }}
                  onBlur={() => markTouchedAndValidate('email', formData.email)}
                />
                {touched.email && errors.email && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Contact Phone (Optional with Country Code) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" htmlFor="phone" style={{ margin: 0 }}>Contact Phone Number (Optional)</label>
                  {touched.phone && !errors.phone && formData.phone && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Valid Phone
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <SearchableCountrySelect
                    value={formData.countryCode}
                    onChange={(code) => setFormData({ ...formData, countryCode: code })}
                  />

                  <input
                    type="tel"
                    id="phone"
                    inputMode="tel"
                    placeholder="e.g. 771234567"
                    className="form-input"
                    style={{
                      flexGrow: 1,
                      ...(touched.phone && errors.phone
                        ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                        : touched.phone && !errors.phone && formData.phone
                        ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                        : {})
                    }}
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({ ...formData, phone: val });
                      markTouchedAndValidate('phone', val);
                    }}
                    onBlur={() => markTouchedAndValidate('phone', formData.phone)}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} />
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" htmlFor="message" style={{ margin: 0 }}>Contract Details / Message *</label>
                  {touched.message && !errors.message && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Message Ready
                    </span>
                  )}
                </div>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Details regarding your project, contract terms, scope, or hiring inquiry..."
                  className="form-textarea"
                  style={
                    touched.message && errors.message
                      ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                      : touched.message && !errors.message && formData.message
                      ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                      : {}
                  }
                  value={formData.message}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, message: val });
                    markTouchedAndValidate('message', val);
                  }}
                  onBlur={() => markTouchedAndValidate('message', formData.message)}
                ></textarea>
                {touched.message && errors.message && (
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
