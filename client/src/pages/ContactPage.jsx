import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Check, ChevronDown } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order Inquiry', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: 'Order Inquiry', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: 'How does DarkWear sizing run?',
      a: 'Our silhouettes feature an intentional boxy, relaxed cut with dropped shoulders. If you prefer a tailored regular fit, we recommend ordering one size down. For the authentic intended streetwear drape, select your true standard size.'
    },
    {
      q: 'What are your shipping delivery timeframes?',
      a: 'Domestic orders are processed within 24 hours and delivered in 2–4 business days. International express orders arrive in 4–7 business days with end-to-end tracked courier service.'
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We offer hassle-free 30-day returns and exchanges on all unworn garments with original packaging and tags attached.'
    },
    {
      q: 'How should I care for heavyweight 280 GSM cotton?',
      a: 'Wash inside out in cold water on a gentle cycle with like colors. Hang dry in shade or tumble dry low to preserve the vintage enzyme wash finish.'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge badge-outline" style={{ marginBottom: '0.75rem' }}>
          GLOBAL CUSTOMER CARE
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          Contact DarkWear Support
        </h1>
        <p style={{ color: '#8e909d', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
          Need sizing advice, order status updates, or custom batch collaboration? Our studio team is here to assist.
        </p>
      </div>

      {/* 2-Column: Form & Studio Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '4rem',
        marginBottom: '6rem',
        alignItems: 'flex-start'
      }}>
        
        {/* Contact Form */}
        <div style={{
          background: '#121217',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem'
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
            Send us a Dispatch
          </h3>

          {sent ? (
            <div style={{
              padding: '1.5rem',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Check size={24} />
              <div>
                <p style={{ fontWeight: 700, margin: 0 }}>Message Received</p>
                <p style={{ fontSize: '0.85rem', margin: '4px 0 0', color: '#a7f3d0' }}>
                  Our concierge team will reply within 4 business hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  className="input-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="input-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Inquiry Topic</label>
                <select
                  className="input-control"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option value="Order Inquiry">Order Inquiry / Tracking</option>
                  <option value="Sizing Advice">Sizing & GSM Recommendation</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Wholesale">Wholesale & Editorial</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="How can our studio assist you today?"
                  className="input-control"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn-pill-light"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                Dispatch Message
              </button>
            </form>
          )}
        </div>

        {/* Studio Details & FAQs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div style={{
            background: '#121217',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
              Flagship Logistics Studio
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.925rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#bef264" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Design Studio & Warehouse</strong>
                  <span style={{ color: '#8e909d' }}>101 Streetwear Blvd, Loft 4B, Los Angeles, CA 90013</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} color="#bef264" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Email Concierge</strong>
                  <span style={{ color: '#8e909d' }}>support@darkwear.com</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} color="#bef264" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Client Desk</strong>
                  <span style={{ color: '#8e909d' }}>+1 (213) 555-0144 (Mon–Fri 9am–6pm PST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQs */}
          <div style={{
            background: '#121217',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
              Frequently Asked Questions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: openFaq === index ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {openFaq === index && (
                    <div style={{ padding: '1rem', fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactPage;
