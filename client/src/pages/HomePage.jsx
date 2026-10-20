import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Shield, Flame, Feather, Truck, RefreshCw } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import api from '../services/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/products/meta/categories')
        ]);
        if (prodRes.data?.success) {
          setProducts(prodRes.data.data);
        }
        if (catRes.data?.success) {
          setCategories(catRes.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch home products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section with Reference-Accurate Layout and Apparel Rack */}
      <HeroSection />

      {/* 2. Value Props Bar */}
      <section style={{
        background: '#0e0e13',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1.75rem 0'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Feather size={20} color="#bef264" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff' }}>260–300 GSM Heavyweight</h4>
              <p style={{ fontSize: '0.78rem', color: '#8e909d' }}>Combed organic cotton, high density</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={20} color="#bef264" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff' }}>Free Worldwide Shipping</h4>
              <p style={{ fontSize: '0.78rem', color: '#8e909d' }}>Complimentary on all orders over $75</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="#bef264" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff' }}>Double Stitched Neckband</h4>
              <p style={{ fontSize: '0.78rem', color: '#8e909d' }}>Zero collar deformation guaranteed</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={20} color="#bef264" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff' }}>30-Day Easy Exchanges</h4>
              <p style={{ fontSize: '0.78rem', color: '#8e909d' }}>Hassle-free size or fit replacements</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Streetwear Drops */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          
          {/* Section Header with Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                <Flame size={16} color="#f59e0b" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f59e0b' }}>
                  Curated Catalog
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#ffffff' }}>
                Featured Streetwear Drops
              </h2>
            </div>

            <CategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              categories={categories}
            />
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '420px',
                    borderRadius: 'var(--radius-lg)',
                    background: '#15151c',
                    opacity: 0.6,
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              ))}
              <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }`}</style>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {filteredProducts.slice(0, 9).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/shop" className="btn-pill-light" style={{ display: 'inline-flex' }}>
              <span>View Full 2026 Lookbook</span>
              <div className="icon-bubble">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Editorial Highlight Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #09090b 0%, #121218 50%, #09090b 100%)',
        padding: '4rem 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                aspectRatio: '1 / 1.1',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80"
                  alt="Heavyweight combed cotton t-shirt"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-10px',
                background: '#181822',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>FABRIC ARCHITECTURE</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>280 GSM Pure Combed</p>
              </div>
            </div>

            <div>
              <span className="badge badge-lime" style={{ marginBottom: '1rem' }}>
                CRAFTED FOR STREET CULTURE
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Heavyweight cotton with a structured drape.
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Every DarkWear garment is produced from custom combed ring-spun yarns, preshrunk with enzyme stonewash, and tailored with dropped shoulders to ensure the iconic relaxed boxy aesthetic.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ borderLeft: '2px solid #bef264', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>100%</h4>
                  <p style={{ fontSize: '0.85rem', color: '#8e909d' }}>Combed Organic Cotton</p>
                </div>
                <div style={{ borderLeft: '2px solid #bef264', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Zero</h4>
                  <p style={{ fontSize: '0.85rem', color: '#8e909d' }}>Collar Bacon or Deformation</p>
                </div>
              </div>

              <Link to="/about" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)' }}>
                Learn Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Carousel/Grid */}
      {bestSellers.length > 0 && (
        <section style={{ padding: '5rem 0' }}>
          <div className="container">
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
                UNDERGROUND ICONS
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                Best Sellers & Essentials
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {bestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Customer Testimonials */}
      <section style={{ padding: '4rem 0 6rem', background: '#0a0a0e' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-outline" style={{ marginBottom: '0.5rem' }}>
              VERIFIED STREET REPUTATION
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
              Worn by designers & tastemakers
            </h2>
            <p style={{ color: '#8e909d', fontSize: '0.95rem' }}>
              Over 2,400+ five-star reviews from enthusiasts who appreciate real fabric weight and thoughtful silhouettes.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                quote: "The GSM weight is no joke. I’ve washed the Obsidian Acid-Wash 15 times and the collar still looks brand new. The boxy drape is immaculate.",
                author: "Kaelen Voss",
                role: "Streetwear Stylist, NYC",
                stars: 5
              },
              {
                quote: "DarkWear achieved the impossible: heavy fabric that still breathes comfortably in the heat. Easily my most complemented t-shirt.",
                author: "Marcus Chen",
                role: "Creative Director",
                stars: 5
              },
              {
                quote: "No loud gaudy branding, just razor sharp proportions and high-density stitching. Exactly what the high-fashion streetwear market was missing.",
                author: "Sora Takahashi",
                role: "Tokyo Fashion Curator",
                stars: 5
              }
            ].map((t, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem', color: '#f59e0b' }}>
                    {[...Array(t.stars)].map((_, s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '1rem', color: '#d4d4d8', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    "{t.quote}"
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{t.author}</p>
                  <p style={{ fontSize: '0.78rem', color: '#71717a' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
