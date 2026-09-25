import React, { useState } from 'react';
import { CheckCircle2, Upload, Send, MessageSquare, ArrowRight, X, ShieldCheck, FileText, Building2, Check, AlertCircle, Phone, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const countryCodes = [
  { code: '+94', country: 'Sri Lanka (+94)', flag: '🇱🇰' },
  { code: '+1', country: 'USA / Canada (+1)', flag: '🇺🇸' },
  { code: '+44', country: 'UK (+44)', flag: '🇬🇧' },
  { code: '+61', country: 'Australia (+61)', flag: '🇦🇺' },
  { code: '+91', country: 'India (+91)', flag: '🇮🇳' },
  { code: '+971', country: 'UAE (+971)', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore (+65)', flag: '🇸🇬' },
  { code: '+974', country: 'Qatar (+974)', flag: '🇶🇦' },
  { code: '+60', country: 'Malaysia (+60)', flag: '🇲🇾' },
  { code: '+64', country: 'New Zealand (+64)', flag: '🇳🇿' },
  { code: '+49', country: 'Germany (+49)', flag: '🇩🇪' },
  { code: '+33', country: 'France (+33)', flag: '🇫🇷' },
  { code: '+81', country: 'Japan (+81)', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea (+82)', flag: '🇰🇷' },
  { code: '+966', country: 'Saudi Arabia (+966)', flag: '🇸🇦' },
  { code: '+968', country: 'Oman (+968)', flag: '🇴🇲' },
  { code: '+965', country: 'Kuwait (+965)', flag: '🇰🇼' },
  { code: '+973', country: 'Bahrain (+973)', flag: '🇧🇭' },
  { code: '+39', country: 'Italy (+39)', flag: '🇮🇹' },
  { code: '+86', country: 'China (+86)', flag: '🇨🇳' }
];

export default function Services() {
  const { services, bankDetails } = portfolioData;
  const [selectedService, setSelectedService] = useState(null);
  
  // Booking Form State
  const [customerInfo, setCustomerInfo] = useState({ 
    name: '', 
    email: '', 
    countryCode: '+94',
    phone: '', 
    sameAsPhone: true,
    whatsappCountryCode: '+94',
    whatsapp: '', 
    message: '' 
  });
  const [confirmYes, setConfirmYes] = useState('');
  const [slipFile, setSlipFile] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Real-time Single Field Validation
  const validateField = (fieldName, fieldValue, currentInfo = customerInfo, currentYes = confirmYes, currentSlip = slipFile) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s\.\'-]+$/;

    if (fieldName === 'name') {
      if (!fieldValue || !fieldValue.trim()) return 'Please enter your full name.';
      if (fieldValue.trim().length < 2) return 'Name must be at least 2 characters long.';
      if (/\d/.test(fieldValue)) return 'Name cannot contain numbers. Please use letters only.';
      if (!nameRegex.test(fieldValue.trim())) return 'Name should contain letters and spaces only.';
      return null;
    }

    if (fieldName === 'email') {
      if (!fieldValue || !fieldValue.trim()) return 'Please enter your email address.';
      if (!emailRegex.test(fieldValue.trim())) {
        return 'Please enter a complete email address (e.g. name@gmail.com, name@outlook.com).';
      }
      return null;
    }

    if (fieldName === 'phone') {
      const clean = (fieldValue || '').replace(/[\s\-\(\)]/g, '');
      if (!clean) return 'Please enter your contact phone number.';
      if (!/^\d+$/.test(clean)) return 'Phone number must contain digits only.';
      if (clean.length < 7 || clean.length > 12) return 'Phone number must be between 7 and 12 digits.';
      return null;
    }

    if (fieldName === 'whatsapp') {
      if (!currentInfo.sameAsPhone) {
        const clean = (fieldValue || '').replace(/[\s\-\(\)]/g, '');
        if (!clean) return 'Please enter your separate WhatsApp number.';
        if (!/^\d+$/.test(clean)) return 'WhatsApp number must contain digits only.';
        if (clean.length < 7 || clean.length > 12) return 'WhatsApp number must be between 7 and 12 digits.';
      }
      return null;
    }

    if (fieldName === 'confirmYes') {
      if (!fieldValue || !fieldValue.trim() || fieldValue.trim().toUpperCase() !== 'YES') {
        return 'Please type "YES" to confirm you added your Full Name & Phone Number as Payment Reference.';
      }
      return null;
    }

    if (fieldName === 'slip') {
      if (!currentSlip) return 'Please upload your bank transfer deposit slip file (Photo or PDF).';
      return null;
    }

    return null;
  };

  const markTouchedAndValidate = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setFormErrors({});
    setTouched({});
    setBookingSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setSlipFile(null);
    setSlipPreview(null);
    setCustomerInfo({ 
      name: '', 
      email: '', 
      countryCode: '+94', 
      phone: '', 
      sameAsPhone: true, 
      whatsappCountryCode: '+94', 
      whatsapp: '', 
      message: '' 
    });
    setConfirmYes('');
    setFormErrors({});
    setTouched({});
    setBookingSubmitted(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTouched(prev => ({ ...prev, slip: true }));
    if (file) {
      setSlipFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setSlipPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setSlipPreview(null);
      }
      const err = validateField('slip', file, customerInfo, confirmYes, file);
      setFormErrors(prev => ({ ...prev, slip: err }));
    } else {
      setSlipFile(null);
      setSlipPreview(null);
      setFormErrors(prev => ({ ...prev, slip: 'Please select a slip file.' }));
    }
  };

  const validateAllForm = () => {
    const errors = {
      name: validateField('name', customerInfo.name),
      email: validateField('email', customerInfo.email),
      phone: validateField('phone', customerInfo.phone),
      whatsapp: validateField('whatsapp', customerInfo.whatsapp),
      confirmYes: validateField('confirmYes', confirmYes),
      slip: validateField('slip', slipFile)
    };

    const newTouched = {
      name: true,
      email: true,
      phone: true,
      whatsapp: !customerInfo.sameAsPhone,
      confirmYes: true,
      slip: true
    };

    setTouched(newTouched);
    
    // Filter out null errors
    const activeErrors = {};
    Object.keys(errors).forEach(k => {
      if (errors[k]) activeErrors[k] = errors[k];
    });

    setFormErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!validateAllForm()) return;

    setLoading(true);

    const serviceTitle = selectedService.title;
    const advanceFee = selectedService.advancePrice;
    const fullPrice = selectedService.fullPrice;
    const remainingFee = selectedService.remainingPrice;

    const fullPhone = `${customerInfo.countryCode} ${customerInfo.phone.trim()}`;
    const fullWhatsApp = customerInfo.sameAsPhone 
      ? fullPhone 
      : `${customerInfo.whatsappCountryCode} ${customerInfo.whatsapp.trim()}`;

    const activeReference = `${customerInfo.name.trim()} (${fullPhone})`;

    const paymentMethodText = `🏦 *Payment Method:* Commercial Bank Slip Upload%0A📌 *Bank Details:* ${bankDetails.bankName} (${bankDetails.branch}) - Acc: ${bankDetails.accountNumber}%0A🏷️ *Payment Reference Used:* ${encodeURIComponent(activeReference)}%0A📎 *Slip File Attached:* ${encodeURIComponent(slipFile ? slipFile.name : 'Uploaded')}`;

    const whatsappMessage = `Hello Sadeep,%0A%0AI have booked a service on your portfolio website and submitted my advance payment details:%0A%0A🎯 *Service Booked:* ${encodeURIComponent(serviceTitle)}%0A💰 *Advance Fee Paid:* ${encodeURIComponent(advanceFee)}%0A💵 *Full Service Price:* ${encodeURIComponent(fullPrice)}%0A⏳ *Remaining Balance:* ${encodeURIComponent(remainingFee)} (Payable within 1 week of delivery)%0A%0A👤 *Customer Name:* ${encodeURIComponent(customerInfo.name.trim())}%0A📧 *Email:* ${encodeURIComponent(customerInfo.email.trim())}%0A📞 *Contact Phone:* ${encodeURIComponent(fullPhone)}%0A💬 *WhatsApp Number:* ${encodeURIComponent(fullWhatsApp)}%0A💬 *Additional Notes:* ${encodeURIComponent(customerInfo.message.trim() || 'N/A')}%0A%0A${paymentMethodText}%0A%0APlease verify and confirm my booking request. Thank you!`;

    const whatsappUrl = `https://wa.me/${bankDetails.whatsappNumber}?text=${whatsappMessage}`;

    setLoading(false);
    setBookingSubmitted(true);

    // Mobile & Desktop popup-blocker proof navigation
    setTimeout(() => {
      try {
        window.location.href = whatsappUrl;
      } catch (err) {
        window.open(whatsappUrl, '_blank');
      }
      setTimeout(() => {
        handleCloseModal();
      }, 3500);
    }, 400);
  };

  return (
    <section className="section" id="services" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Services & Booking</div>
          <h2 className="section-title">Professional Services & Advance Booking</h2>
          <p className="section-subtitle">
            Order custom Full-Stack Web Development, Business Analysis, or Project Management. Confirm your project booking with a minimal LKR 1,000 advance payment!
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
          {services.map((service, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
              {service.badge && (
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  {service.badge}
                </div>
              )}

              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', tracking: '0.05em', marginBottom: '0.5rem' }}>
                {service.category}
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {service.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {service.description}
              </p>

              {/* Price Breakdown Card */}
              <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.88rem', color: '#25D366', fontWeight: 700 }}>Advance Booking Fee:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#25D366' }}>{service.advancePrice}</span>
                </div>
                {service.id === 'fullstack-dev' && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-color)', paddingTop: '0.55rem', marginTop: '0.55rem', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>Remaining Amount:</strong> Payable within 1 week after project completion. Deployed to Vercel/Netlify.
                  </div>
                )}
              </div>

              {/* Features Checklist */}
              <div style={{ flexGrow: 1, marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>INCLUDED IN SERVICE:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Check size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '0.15rem' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Book Service Button */}
              <button 
                onClick={() => handleOpenModal(service)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Book Service & Pay Advance</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking & Payment Modal */}
      {selectedService && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--bg-secondary)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>SERVICE BOOKING</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.2rem' }}>{selectedService.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Advance Booking Fee: <strong style={{ color: '#25D366' }}>{selectedService.advancePrice}</strong>
                </p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.5rem' }}>
              {bookingSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={56} style={{ color: '#25D366', margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Booking Submitted Successfully!</h4>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Opening WhatsApp to send your booking and payment details directly to Sadeep for instant verification...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} noValidate>
                  {/* Customer Information */}
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} style={{ color: 'var(--accent-cyan)' }} />
                    <span>1. Your Contact Details</span>
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                    
                    {/* Full Name Field */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <label className="form-label" style={{ margin: 0 }}>Full Name *</label>
                        {touched.name && !formErrors.name && (
                          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={13} /> Valid Name
                          </span>
                        )}
                      </div>
                      <input 
                        type="text" 
                        placeholder="e.g. Ruwan Silva" 
                        className="form-input"
                        autoCapitalize="words"
                        style={
                          touched.name && formErrors.name
                            ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                            : touched.name && !formErrors.name && customerInfo.name
                            ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                            : {}
                        }
                        value={customerInfo.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomerInfo({ ...customerInfo, name: val });
                          markTouchedAndValidate('name', val);
                        }}
                        onBlur={() => markTouchedAndValidate('name', customerInfo.name)}
                      />
                      {touched.name && formErrors.name && (
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertCircle size={13} />
                          <span>{formErrors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Email Address Field */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <label className="form-label" style={{ margin: 0 }}>Email Address *</label>
                        {touched.email && !formErrors.email && (
                          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={13} /> Valid Email
                          </span>
                        )}
                      </div>
                      <input 
                        type="email" 
                        inputMode="email"
                        placeholder="e.g. ruwan@gmail.com, ruwan@outlook.com" 
                        className="form-input"
                        style={
                          touched.email && formErrors.email
                            ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                            : touched.email && !formErrors.email && customerInfo.email
                            ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                            : {}
                        }
                        value={customerInfo.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomerInfo({ ...customerInfo, email: val });
                          markTouchedAndValidate('email', val);
                        }}
                        onBlur={() => markTouchedAndValidate('email', customerInfo.email)}
                      />
                      {touched.email && formErrors.email && (
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertCircle size={13} />
                          <span>{formErrors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number Field with Country Code */}
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label className="form-label" style={{ margin: 0 }}>Contact Phone Number (Country Code + Number) *</label>
                      {touched.phone && !formErrors.phone && (
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle2 size={13} /> Valid Phone
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select
                        value={customerInfo.countryCode}
                        onChange={(e) => {
                          const code = e.target.value;
                          const updated = { ...customerInfo, countryCode: code };
                          setCustomerInfo(updated);
                          if (touched.phone) markTouchedAndValidate('phone', customerInfo.phone);
                        }}
                        className="form-input"
                        style={{ width: '145px', flexShrink: 0, fontWeight: 700, color: 'var(--accent-cyan)', paddingRight: '0.5rem' }}
                      >
                        {countryCodes.map((c, idx) => (
                          <option key={idx} value={c.code} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                            {c.flag} {c.code} ({c.country.split(' ')[0]})
                          </option>
                        ))}
                      </select>

                      <input 
                        type="tel" 
                        inputMode="tel"
                        placeholder="e.g. 771234567" 
                        className="form-input"
                        style={{
                          flexGrow: 1,
                          ...(touched.phone && formErrors.phone
                            ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                            : touched.phone && !formErrors.phone && customerInfo.phone
                            ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                            : {})
                        }}
                        value={customerInfo.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomerInfo({ ...customerInfo, phone: val });
                          markTouchedAndValidate('phone', val);
                        }}
                        onBlur={() => markTouchedAndValidate('phone', customerInfo.phone)}
                      />
                    </div>
                    {touched.phone && formErrors.phone && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertCircle size={13} />
                        <span>{formErrors.phone}</span>
                      </span>
                    )}
                  </div>

                  {/* Checkbox: WhatsApp same as Phone */}
                  <div style={{ marginBottom: '1.25rem', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      <input 
                        type="checkbox" 
                        checked={customerInfo.sameAsPhone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, sameAsPhone: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: '#25D366' }}
                      />
                      <span>WhatsApp Number is the same as Contact Phone Number</span>
                    </label>

                    {!customerInfo.sameAsPhone && (
                      <div className="form-group" style={{ marginTop: '0.85rem', marginBottom: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <label className="form-label" style={{ margin: 0 }}>Separate WhatsApp Number *</label>
                          {touched.whatsapp && !formErrors.whatsapp && (
                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <CheckCircle2 size={13} /> Valid WhatsApp
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <select
                            value={customerInfo.whatsappCountryCode}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, whatsappCountryCode: e.target.value })}
                            className="form-input"
                            style={{ width: '145px', flexShrink: 0, fontWeight: 700, color: 'var(--accent-cyan)' }}
                          >
                            {countryCodes.map((c, idx) => (
                              <option key={idx} value={c.code} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>

                          <input 
                            type="tel" 
                            inputMode="tel"
                            placeholder="e.g. 709876543" 
                            className="form-input"
                            style={{
                              flexGrow: 1,
                              ...(touched.whatsapp && formErrors.whatsapp
                                ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                                : touched.whatsapp && !formErrors.whatsapp && customerInfo.whatsapp
                                ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                                : {})
                            }}
                            value={customerInfo.whatsapp}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomerInfo({ ...customerInfo, whatsapp: val });
                              markTouchedAndValidate('whatsapp', val);
                            }}
                            onBlur={() => markTouchedAndValidate('whatsapp', customerInfo.whatsapp)}
                          />
                        </div>
                        {touched.whatsapp && formErrors.whatsapp && (
                          <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <AlertCircle size={13} />
                            <span>{formErrors.whatsapp}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Commercial Bank Transfer Details Section */}
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={18} style={{ color: '#25D366' }} />
                    <span>2. Commercial Bank Deposit & Slip Upload</span>
                  </h4>

                  <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#25D366', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Building2 size={16} />
                      <span>Commercial Bank Transfer Details:</span>
                    </div>

                    <div style={{ fontSize: '0.85rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.4rem 1rem', marginBottom: '1rem', background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Account Name:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{bankDetails.accountName}</strong>

                      <span style={{ color: 'var(--text-muted)' }}>Bank:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{bankDetails.bankName}</strong>

                      <span style={{ color: 'var(--text-muted)' }}>Branch:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{bankDetails.branch}</strong>

                      <span style={{ color: 'var(--text-muted)' }}>Account No:</span>
                      <strong style={{ color: '#25D366', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{bankDetails.accountNumber}</strong>

                      <span style={{ color: 'var(--text-muted)' }}>Payment Reference:</span>
                      <strong style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        {customerInfo.name ? `${customerInfo.name} - ${customerInfo.countryCode} ${customerInfo.phone || 'Phone'}` : 'Your Full Name & Phone Number (e.g. Ruwan Silva - +94 771234567)'}
                      </strong>
                    </div>

                    <div style={{ backgroundColor: 'rgba(6, 182, 212, 0.12)', borderLeft: '3px solid var(--accent-cyan)', padding: '0.6rem 0.85rem', borderRadius: '4px', fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                      ⚠️ <strong>Important Note:</strong> Please type your <strong>Full Name & Phone Number</strong> in the Payment Reference / Remarks field when making the bank transfer or online deposit.
                    </div>

                    {/* Mandatory YES Confirmation Field */}
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <label className="form-label" htmlFor="confirm-yes" style={{ margin: 0 }}>Type "YES" to confirm you added Payment Reference *</label>
                        {touched.confirmYes && !formErrors.confirmYes && (
                          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={13} /> Confirmed YES
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        id="confirm-yes"
                        placeholder='Type "YES" to confirm'
                        className="form-input"
                        style={
                          touched.confirmYes && formErrors.confirmYes
                            ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.06)' }
                            : touched.confirmYes && !formErrors.confirmYes && confirmYes
                            ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.06)' }
                            : {}
                        }
                        value={confirmYes}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConfirmYes(val);
                          setTouched(prev => ({ ...prev, confirmYes: true }));
                          const err = validateField('confirmYes', val);
                          setFormErrors(prev => ({ ...prev, confirmYes: err }));
                        }}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, confirmYes: true }));
                          const err = validateField('confirmYes', confirmYes);
                          setFormErrors(prev => ({ ...prev, confirmYes: err }));
                        }}
                      />
                      {touched.confirmYes && formErrors.confirmYes && (
                        <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertCircle size={14} />
                          <span>{formErrors.confirmYes}</span>
                        </span>
                      )}
                    </div>

                    {/* Browse & Tap Slip File (Touch & Desktop Compatible) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label className="form-label" style={{ margin: 0 }}>Upload Bank Deposit / Transfer Slip (Image or PDF) *</label>
                      {touched.slip && !formErrors.slip && slipFile && (
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle2 size={13} /> Slip Ready
                        </span>
                      )}
                    </div>

                    <div 
                      style={{ 
                        position: 'relative', 
                        border: touched.slip && formErrors.slip
                          ? '2px dashed #ef4444' 
                          : touched.slip && !formErrors.slip && slipFile
                          ? '2px dashed #10b981'
                          : '2px dashed var(--accent-cyan)', 
                        borderRadius: 'var(--radius-md)', 
                        padding: '1.5rem 1rem', 
                        textAlign: 'center', 
                        background: touched.slip && !formErrors.slip && slipFile ? 'rgba(16, 185, 129, 0.06)' : 'rgba(6, 182, 212, 0.04)', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        overflow: 'hidden'
                      }}
                    >
                      <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,.pdf,.jpg,.jpeg,.png,.webp"
                        onChange={handleFileChange}
                        style={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          opacity: 0, 
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                        id="slip-upload-input"
                        aria-label="Upload Bank Deposit or Transfer Slip"
                      />
                      
                      <div style={{ pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
                        <Upload size={32} style={{ color: slipFile ? '#10b981' : 'var(--accent-cyan)', margin: '0 auto 0.6rem auto', display: 'block' }} />
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          {slipFile ? `Selected: ${slipFile.name}` : 'Tap or Click here to Choose & Upload Payment Slip'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Supports Photo Gallery, Camera Photo, or PDF File
                        </div>
                      </div>
                    </div>

                    {slipFile && (
                      <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>
                          ✓ File Ready: {slipFile.name} ({(slipFile.size / 1024).toFixed(0)} KB)
                        </span>
                        <button 
                          type="button" 
                          onClick={(e) => {
                            e.preventDefault();
                            setSlipFile(null);
                            setSlipPreview(null);
                            setFormErrors(prev => ({ ...prev, slip: 'Please select a payment slip file.' }));
                          }}
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Change / Remove File
                        </button>
                      </div>
                    )}

                    {touched.slip && formErrors.slip && (
                      <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertCircle size={13} />
                        <span>{formErrors.slip}</span>
                      </span>
                    )}

                    {/* Slip Preview */}
                    {slipPreview && (
                      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Uploaded Slip Image Preview:</span>
                        <img src={slipPreview} alt="Payment Slip" style={{ maxHeight: '140px', borderRadius: '8px', border: '1px solid var(--border-color)', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>

                  {/* Submit Booking Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.9rem', backgroundColor: '#25D366', borderColor: '#25D366', color: '#070c18', fontWeight: 800, minHeight: '48px' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Submitting Order & Opening WhatsApp...</span>
                    ) : (
                      <>
                        <MessageSquare size={18} />
                        <span>Submit Slip & Confirm Booking on WhatsApp</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
