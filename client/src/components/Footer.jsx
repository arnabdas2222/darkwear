import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Instagram, Twitter, Disc as Discord, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#070709',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        
        {/* Top Newsletter Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #15151e 0%, #101015 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          marginBottom: '4rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem'
        }}>
          <div style={{ maxWidth: '480px' }}>
            <span className="badge badge-lime" style={{ marginBottom: '0.75rem' }}>
              EXCLUSIVE ACCESS
            </span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Unlock 15% off your first streetwear drop.
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#a1a1aa' }}>
              Subscribe to the DarkWear dispatch for secret midnight releases, limited deadstock restocks, and architectural design stories.
            </p>
          </div>

          <div style={{ flex: '1 1 320px', maxWidth: '420px' }}>
            {isSubscribed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                color: '#34d399',
                fontSize: '0.925rem',
                fontWeight: 600
              }}>
                <Check size={18} />
                <span>You're in. Use promo code <strong>DARK15</strong> at checkout!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#09090b',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.75rem 1.25rem',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-pill-light"
                  style={{ padding: '0.55rem 0.65rem 0.55rem 1.15rem' }}
                >
                  <span>Join</span>
                  <div className="icon-bubble">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Brand Bio */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff'
              }}>
                DARKWEAR
              </span>
            </Link>
            <p style={{ fontSize: '0.9rem', color: '#8e909d', lineHeight: 1.6, maxWidth: '340px', marginBottom: '1.5rem' }}>
              Engineered t-shirts crafted from heavyweight 260–300 GSM combed cotton. Boxy cuts, dropped shoulders, and architectural silhouettes designed for longevity.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="#instagram" aria-label="Instagram" style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Instagram size={17} />
              </a>
              <a href="#twitter" aria-label="Twitter" style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Twitter size={17} />
              </a>
              <a href="#discord" aria-label="Discord" style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Discord size={17} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff', marginBottom: '1.25rem' }}>
              Collection
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#8e909d' }}>
              <li><Link to="/shop?category=all" style={{ transition: 'color 0.2s ease' }}>All Drops</Link></li>
              <li><Link to="/shop?category=oversized">Oversized Boxy Tees</Link></li>
              <li><Link to="/shop?category=graphic">Graphic & Typographic</Link></li>
              <li><Link to="/shop?category=minimal">Minimal Blanks</Link></li>
              <li><Link to="/shop?category=basic">Heavyweight Basics</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff', marginBottom: '1.25rem' }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#8e909d' }}>
              <li><Link to="/my-orders">Order Tracking</Link></li>
              <li><Link to="/contact">Shipping & Returns</Link></li>
              <li><Link to="/about">Fabric & GSM Guide</Link></li>
              <li><Link to="/contact">Support Center</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff', marginBottom: '1.25rem' }}>
              Studio
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#8e909d' }}>
              <li><Link to="/about">About DarkWear</Link></li>
              <li><Link to="/contact">Flagship Store</Link></li>
              <li><Link to="/login">Member Portal</Link></li>
              <li><Link to="/admin">Admin Console</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Copyright Row */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#71717a'
        }}>
          <div>
            © {new Date().getFullYear()} DARKWEAR Streetwear Apparel Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms & Conditions</Link>
            <Link to="/contact">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
