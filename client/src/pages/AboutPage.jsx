import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem', maxWidth: '900px' }}>
      
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge badge-lime" style={{ marginBottom: '0.75rem' }}>
          ARCHITECTURAL FABRIC DESIGN
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Engineering the perfect heavyweight streetwear t-shirt.
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
          DarkWear was founded on a singular conviction: modern streetwear had sacrificed fabric integrity for fleeting graphics. We stripped away excess to build structured, heavyweight garments built for decades of rotation.
        </p>
      </div>

      {/* 3 Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        marginBottom: '5rem'
      }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Feather size={22} color="#bef264" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            260–300 GSM Combed Cotton
          </h3>
          <p style={{ fontSize: '0.925rem', color: '#8e909d', lineHeight: 1.6 }}>
            Twice the density of commercial fast-fashion tees. Woven with long-staple combed cotton ring-spun yarns that offer crisp drape and immense softness.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Layers size={22} color="#bef264" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Boxy Drop-Shoulder Silhouette
          </h3>
          <p style={{ fontSize: '0.925rem', color: '#8e909d', lineHeight: 1.6 }}>
            Engineered with a relaxed chest, lowered armholes, and tailored sleeve lengths so the t-shirt hangs with natural geometric architecture.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <ShieldCheck size={22} color="#bef264" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Anti-Deformation Collar
          </h3>
          <p style={{ fontSize: '0.925rem', color: '#8e909d', lineHeight: 1.6 }}>
            Dense 1.25" ribbing with internal cotton neck tape and twin-needle edge stitching. Tested across 50 wash cycles with zero baconing.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', background: '#121217', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          Feel the difference in hand.
        </h2>
        <p style={{ color: '#8e909d', maxWidth: '440px', margin: '0 auto 2rem' }}>
          Backed by our 30-day wear trial and complimentary exchanges worldwide.
        </p>
        <Link to="/shop" className="btn-pill-light" style={{ display: 'inline-flex' }}>
          <span>Explore Streetwear Drops</span>
          <div className="icon-bubble">
            <ArrowRight size={16} />
          </div>
        </Link>
      </div>

    </div>
  );
};

export default AboutPage;
