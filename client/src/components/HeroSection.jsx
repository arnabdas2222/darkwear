import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  // 4 hanging t-shirts featured on the rack inspired by the reference image
  const rackTees = [
    {
      id: 'prod_4',
      name: 'Off-Grid Bone Tee',
      colorName: 'Bone Cream',
      colorHex: '#e8e4dc',
      tag: 'Raw 270 GSM',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod_1',
      name: 'Mustard Clay Oversized',
      colorName: 'Mustard Clay',
      colorHex: '#d99726',
      tag: 'Heavyweight',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod_2',
      name: 'Cyber Monolith Jet',
      colorName: 'Matte Obsidian',
      colorHex: '#141416',
      tag: 'Boxy Fit',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod_7',
      name: 'Washed Moss Utility',
      colorName: 'Forest Moss',
      colorHex: '#253d2c',
      tag: 'Mineral Dye',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <section style={{
      position: 'relative',
      paddingTop: '3.5rem',
      paddingBottom: '3rem',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 10%, rgba(35, 45, 38, 0.28) 0%, rgba(9, 9, 11, 1) 75%)'
    }}>
      
      {/* Ambient background glows */}
      <div
        className="ambient-glow-orb"
        style={{
          width: '500px',
          height: '400px',
          top: '-50px',
          left: '10%',
          background: 'rgba(52, 211, 153, 0.12)'
        }}
      />
      <div
        className="ambient-glow-orb"
        style={{
          width: '450px',
          height: '400px',
          bottom: '20px',
          right: '8%',
          background: 'rgba(245, 158, 11, 0.1)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Header Row: Headline on left, Description & Pill CTA on right */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          
          {/* Main Headline */}
          <div style={{ flex: '1 1 480px', maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-outline" style={{ background: 'rgba(255,255,255,0.04)', color: '#ffffff' }}>
                <Sparkles size={12} style={{ color: '#bef264' }} />
                NEW SEASON DROP 2026
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              Best T-Shirt for your summer
            </h1>
          </div>

          {/* Description & Reference-Accurate Pill "Shop Now" Button */}
          <div style={{
            flex: '1 1 320px',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.5rem',
            paddingTop: '0.75rem'
          }}>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#a1a1aa'
            }}>
              Explore the newest streetwear silhouettes each season and elevate every moment with our heavy-GSM boxy t-shirt collection.
            </p>

            <Link to="/shop" className="btn-pill-light">
              <span>Shop Now</span>
              <div className="icon-bubble">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>
        </div>

        {/* Clothing Rack Showcase (Inspired directly by user reference image) */}
        <div className="hero-rack-container">
          
          {/* Matte Black Horizontal Rail */}
          <div className="rack-horizontal-bar" />

          {/* Hanging T-Shirts on Wooden Hangers */}
          <div className="hanger-items-row">
            {rackTees.map((tee, index) => (
              <Link
                key={tee.id}
                to={`/product/${tee.id}`}
                className="hanging-tee-item"
                style={{
                  transform: `translateY(${index % 2 === 1 ? '12px' : '0px'})`,
                }}
              >
                {/* Detailed Wooden Hanger SVG */}
                <svg
                  className="hanger-hook-svg"
                  viewBox="0 0 100 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Metal Hook */}
                  <path
                    d="M50 32C50 20 62 10 56 4C51 -1 44 2 45 10C45.5 14 47 18 50 24"
                    stroke="#cfd3dc"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Wooden Triangle Contour */}
                  <path
                    d="M10 60L50 30L90 60C78 64 22 64 10 60Z"
                    fill="#a47148"
                    stroke="#7a4e2d"
                    strokeWidth="2"
                  />
                  {/* Wood Grain Highlights */}
                  <path
                    d="M20 58L50 34L80 58"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Apparel Card Preview with Realistic Shadows */}
                <div
                  className="hanging-tee-card"
                  style={{
                    borderTop: `4px solid ${tee.colorHex}`
                  }}
                >
                  <img src={tee.image} alt={tee.name} />
                  
                  {/* Overlay Tag */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '0.65rem 0.5rem',
                    background: 'linear-gradient(to top, rgba(9, 9, 11, 0.95), transparent)',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {tee.name}
                    </p>
                    <span style={{ fontSize: '0.68rem', color: '#a1a1aa' }}>
                      {tee.tag}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Under-rack shadow / depth gradient */}
          <div style={{
            width: '80%',
            height: '24px',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)',
            marginTop: '1.25rem',
            filter: 'blur(6px)'
          }} />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
