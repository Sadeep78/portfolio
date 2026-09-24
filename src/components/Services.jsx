import React, { useState } from 'react';
import { CheckCircle2, CreditCard, Upload, Send, MessageSquare, ArrowRight, X, ShieldCheck, FileText, Building2, HelpCircle, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Services() {
  const { services, bankDetails } = portfolioData;
  const [selectedService, setSelectedService] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' or 'stripe'
  
  // Booking Form State
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', message: '' });
  const [slipFile, setSlipFile] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);
  const [stripeCard, setStripeCard] = useState({ name: '', number: '', expiry: '', cvc: '' });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setFormErrors({});
    setBookingSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setSlipFile(null);
    setSlipPreview(null);
    setCustomerInfo({ name: '', email: '', phone: '', message: '' });
    setFormErrors({});
    setBookingSubmitted(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlipFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setSlipPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setSlipPreview(null); // PDF or non-image
      }
      if (formErrors.slip) {
        setFormErrors({ ...formErrors, slip: null });
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customerInfo.name.trim()) {
      errors.name = 'Please enter your name.';
    } else if (/\d/.test(customerInfo.name)) {
      errors.name = 'Name cannot contain numbers.';
    }

    if (!customerInfo.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(customerInfo.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!customerInfo.phone.trim()) {
      errors.phone = 'Please enter your phone / WhatsApp number.';
    }

    if (paymentMethod === 'bank' && !slipFile) {
      errors.slip = 'Please upload your bank transfer deposit slip file.';
    }

    if (paymentMethod === 'stripe') {
      if (!stripeCard.name.trim()) errors.stripeName = 'Cardholder name is required.';
      if (!stripeCard.number.trim() || stripeCard.number.length < 15) errors.stripeNumber = 'Valid 16-digit card number required.';
      if (!stripeCard.expiry.trim()) errors.stripeExpiry = 'Expiry date required (MM/YY).';
      if (!stripeCard.cvc.trim()) errors.stripeCvc = 'CVC required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const serviceTitle = selectedService.title;
    const advanceFee = selectedService.advancePrice;
    const fullPrice = selectedService.fullPrice;
    const remainingFee = selectedService.remainingPrice;

    let paymentMethodText = '';
    if (paymentMethod === 'bank') {
      paymentMethodText = `🏦 *Payment Method:* Commercial Bank Slip Upload%0A📌 *Bank Details:* ${bankDetails.bankName} (${bankDetails.branch}) - Acc: ${bankDetails.accountNumber}%0A🏷️ *Payment Reference Used:* ${encodeURIComponent(customerInfo.name.trim())}%0A📎 *Slip File Attached:* ${encodeURIComponent(slipFile ? slipFile.name : 'Uploaded')}`;
    } else {
      paymentMethodText = `💳 *Payment Method:* Stripe Credit/Debit Card (Advance Paid LKR 1,000)%0A🔒 *Cardholder Name:* ${encodeURIComponent(stripeCard.name)}`;
    }

    const whatsappMessage = `Hello Sadeep,%0A%0AI have booked a service on your portfolio website and submitted my advance payment details:%0A%0A🎯 *Service Booked:* ${encodeURIComponent(serviceTitle)}%0A💰 *Advance Fee Paid:* ${encodeURIComponent(advanceFee)}%0A💵 *Full Service Price:* ${encodeURIComponent(fullPrice)}%0A⏳ *Remaining Balance:* ${encodeURIComponent(remainingFee)} (Payable within 1 week of delivery)%0A%0A👤 *Customer Name:* ${encodeURIComponent(customerInfo.name.trim())}%0A📧 *Email:* ${encodeURIComponent(customerInfo.email.trim())}%0A📱 *Phone / WhatsApp:* ${encodeURIComponent(customerInfo.phone.trim())}%0A💬 *Additional Notes:* ${encodeURIComponent(customerInfo.message.trim() || 'N/A')}%0A%0A${paymentMethodText}%0A%0APlease verify and confirm my booking request. Thank you!`;

    const whatsappUrl = `https://wa.me/${bankDetails.whatsappNumber}?text=${whatsappMessage}`;

    setTimeout(() => {
      setLoading(false);
      setBookingSubmitted(true);
      window.open(whatsappUrl, '_blank');
      setTimeout(() => {
        handleCloseModal();
      }, 3500);
    }, 600);
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Full Package Price:</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>{service.fullPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#25D366', fontWeight: 600 }}>Advance to Book:</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#25D366' }}>{service.advancePrice}</span>
                </div>
                {service.id === 'fullstack-dev' && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                    * Remaining LKR 11,000 payable within 1 week after project completion. Deployed to Vercel/Netlify.
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
                  Advance Booking Fee: <strong style={{ color: '#25D366' }}>{selectedService.advancePrice}</strong> (Full Price: {selectedService.fullPrice})
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
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Ruwan Silva" 
                        className="form-input"
                        style={formErrors.name ? { borderColor: '#ef4444' } : {}}
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      />
                      {formErrors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.name}</span>}
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="e.g. ruwan@gmail.com" 
                        className="form-input"
                        style={formErrors.email ? { borderColor: '#ef4444' } : {}}
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      />
                      {formErrors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Phone / WhatsApp Number *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +94 77 123 4567" 
                      className="form-input"
                      style={formErrors.phone ? { borderColor: '#ef4444' } : {}}
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                    {formErrors.phone && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.phone}</span>}
                  </div>

                  {/* Payment Method Tabs */}
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={18} style={{ color: 'var(--accent-cyan)' }} />
                    <span>2. Select Advance Payment Method (LKR 1,000)</span>
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: paymentMethod === 'bank' ? '2px solid #25D366' : '1px solid var(--border-color)',
                        background: paymentMethod === 'bank' ? 'rgba(37, 211, 102, 0.12)' : 'var(--bg-tertiary)',
                        color: paymentMethod === 'bank' ? '#25D366' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Building2 size={18} />
                      <span>Commercial Bank Slip</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: paymentMethod === 'stripe' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: paymentMethod === 'stripe' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-tertiary)',
                        color: paymentMethod === 'stripe' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <CreditCard size={18} />
                      <span>Pay via Stripe</span>
                    </button>
                  </div>

                  {/* Payment Method 1: Bank Transfer Slip Upload */}
                  {paymentMethod === 'bank' ? (
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
                        <strong style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>Your Full Name (e.g. {customerInfo.name || 'Ruwan Silva'})</strong>
                      </div>

                      <div style={{ backgroundColor: 'rgba(6, 182, 212, 0.12)', borderLeft: '3px solid var(--accent-cyan)', padding: '0.6rem 0.85rem', borderRadius: '4px', fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                        ⚠️ <strong>Important Note:</strong> Please type your <strong>Full Name</strong> in the Payment Reference / Remarks field when making the bank transfer or online deposit.
                      </div>

                      {/* Browse Slip File */}
                      <label className="form-label" style={{ marginBottom: '0.5rem' }}>Upload Bank Deposit / Transfer Slip (Image or PDF) *</label>
                      <div style={{ border: formErrors.slip ? '2px dashed #ef4444' : '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center', background: 'var(--bg-secondary)', cursor: 'pointer' }}>
                        <input 
                          type="file" 
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id="slip-upload-input"
                        />
                        <label htmlFor="slip-upload-input" style={{ cursor: 'pointer', display: 'block' }}>
                          <Upload size={28} style={{ color: 'var(--accent-cyan)', margin: '0 auto 0.5rem auto' }} />
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                            {slipFile ? slipFile.name : 'Click here to Browse & Upload Payment Slip from PC'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            Supports JPG, PNG, WEBP, or PDF
                          </div>
                        </label>
                      </div>

                      {formErrors.slip && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.35rem', display: 'block' }}>{formErrors.slip}</span>}

                      {/* Slip Preview */}
                      {slipPreview && (
                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Uploaded Slip Image Preview:</span>
                          <img src={slipPreview} alt="Payment Slip" style={{ maxHeight: '140px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Payment Method 2: Stripe Credit Card */
                    <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CreditCard size={16} />
                        <span>Stripe Card Payment (LKR 1,000 Advance)</span>
                      </div>

                      <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                        <label className="form-label">Cardholder Name *</label>
                        <input 
                          type="text" 
                          placeholder="Name as printed on card" 
                          className="form-input"
                          style={formErrors.stripeName ? { borderColor: '#ef4444' } : {}}
                          value={stripeCard.name}
                          onChange={(e) => setStripeCard({ ...stripeCard, name: e.target.value })}
                        />
                        {formErrors.stripeName && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.stripeName}</span>}
                      </div>

                      <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                        <label className="form-label">Card Number *</label>
                        <input 
                          type="text" 
                          placeholder="1234 5678 9012 3456" 
                          className="form-input"
                          style={formErrors.stripeNumber ? { borderColor: '#ef4444' } : {}}
                          value={stripeCard.number}
                          onChange={(e) => setStripeCard({ ...stripeCard, number: e.target.value })}
                        />
                        {formErrors.stripeNumber && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.stripeNumber}</span>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Expiry Date *</label>
                          <input 
                            type="text" 
                            placeholder="MM / YY" 
                            className="form-input"
                            style={formErrors.stripeExpiry ? { borderColor: '#ef4444' } : {}}
                            value={stripeCard.expiry}
                            onChange={(e) => setStripeCard({ ...stripeCard, expiry: e.target.value })}
                          />
                          {formErrors.stripeExpiry && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.stripeExpiry}</span>}
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">CVC / CVV *</label>
                          <input 
                            type="text" 
                            placeholder="123" 
                            className="form-input"
                            style={formErrors.stripeCvc ? { borderColor: '#ef4444' } : {}}
                            value={stripeCard.cvc}
                            onChange={(e) => setStripeCard({ ...stripeCard, cvc: e.target.value })}
                          />
                          {formErrors.stripeCvc && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.stripeCvc}</span>}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                        <ShieldCheck size={15} style={{ color: '#25D366' }} />
                        <span>Secured by Stripe 256-bit SSL Payment Gateway</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Booking Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', backgroundColor: '#25D366', borderColor: '#25D366', color: '#070c18', fontWeight: 800 }}
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
