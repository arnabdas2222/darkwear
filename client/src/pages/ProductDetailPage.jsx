import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Truck, RefreshCw, Plus, Minus, Check, ArrowRight, Heart, Share2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const res = await api.get(`/products/${id}`);
        if (res.data?.success) {
          const prod = res.data.data;
          setProduct(prod);
          setRelated(res.data.related || []);
          if (prod.sizes && prod.sizes.length > 0) {
            setSelectedSize(prod.sizes.includes('L') ? 'L' : prod.sizes[0]);
          }
          if (prod.colors && prod.colors.length > 0) {
            setSelectedColor(prod.colors[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#ffffff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          Garment Not Found
        </h2>
        <p style={{ color: '#8e909d', marginBottom: '1.5rem' }}>
          The t-shirt you are looking for may have been archived or is sold out.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
          Back to Streetwear Archive
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor?.name, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#71717a', marginBottom: '2.5rem' }}>
        <Link to="/" style={{ color: '#a1a1aa' }}>Home</Link>
        <span>/</span>
        <Link to="/shop" style={{ color: '#a1a1aa' }}>Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} style={{ color: '#a1a1aa', textTransform: 'capitalize' }}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: '#ffffff' }}>{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '4rem',
        marginBottom: '5rem'
      }}>
        
        {/* Left: Product Images Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main Large Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1.15',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: '#13131a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'var(--shadow-elevated)'
          }}>
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Badges */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
              {discount && (
                <span className="badge" style={{ background: '#f43f5e', color: '#ffffff' }}>
                  -{discount}% OFF
                </span>
              )}
              {product.isNewArrival && (
                <span className="badge badge-lime">NEW DROP</span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '76px',
                    height: '84px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: '#13131a',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box & Technical Specs */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Category & Rating */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-outline" style={{ textTransform: 'uppercase' }}>
              {product.category} T-Shirt
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>
                {product.rating || 4.9}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#71717a' }}>
                ({product.numReviews || 34} customer reviews)
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '0.5rem'
          }}>
            {product.name}
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: '0.95rem', color: '#a1a1aa', marginBottom: '1.5rem' }}>
            {product.tagline}
          </p>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.25rem', color: '#71717a', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </span>
            )}
            <span style={{ fontSize: '0.8rem', color: '#bef264', fontWeight: 600 }}>
              Taxes included • Free shipping eligible
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '0.975rem',
            lineHeight: 1.7,
            color: '#d4d4d8',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.5rem' }}>
                Color: <strong style={{ color: '#ffffff' }}>{selectedColor?.name}</strong>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: selectedColor?.name === c.name ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.2)',
                      outline: selectedColor?.name === c.name ? '2px solid #bef264' : 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a1a1aa' }}>
                Select Size: <strong style={{ color: '#ffffff' }}>{selectedSize}</strong>
              </label>
              <span style={{ fontSize: '0.8rem', color: '#bef264', textDecoration: 'underline', cursor: 'pointer' }}>
                Size & Fit Guide
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedSize === sz ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: selectedSize === sz ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedSize === sz ? '#09090b' : '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart Action */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#15151c',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-full)',
              padding: '0 0.5rem'
            }}>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'none', border: 'none', color: '#ffffff', padding: '0.75rem', cursor: 'pointer' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontSize: '1rem', fontWeight: 800, minWidth: '24px', textAlign: 'center', color: '#ffffff' }}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'none', border: 'none', color: '#ffffff', padding: '0.75rem', cursor: 'pointer' }}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`btn ${isAdded ? 'btn-pill-light' : 'btn-primary'}`}
              style={{
                flex: 1,
                borderRadius: 'var(--radius-full)',
                padding: '0.85rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700
              }}
            >
              {isAdded ? (
                <>
                  <Check size={18} color="#10b981" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          {/* Stock Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '2.5rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: product.stock > 10 ? '#10b981' : '#f59e0b'
            }} />
            <span>
              {product.stock > 10 ? `In Stock (${product.stock} units available)` : `Low Stock: Only ${product.stock} pieces remaining`}
            </span>
          </div>

          {/* Specification Details Accordion / Tabs */}
          <div style={{
            background: '#121218',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Architectural Specifications
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#71717a', display: 'block' }}>Fabric</span>
                <strong style={{ color: '#f5f5f7' }}>{product.details?.fabric || '100% Combed Heavyweight Cotton'}</strong>
              </div>
              <div>
                <span style={{ color: '#71717a', display: 'block' }}>Weight</span>
                <strong style={{ color: '#f5f5f7' }}>{product.details?.weight || '280 GSM Heavyweight'}</strong>
              </div>
              <div>
                <span style={{ color: '#71717a', display: 'block' }}>Fit & Cut</span>
                <strong style={{ color: '#f5f5f7' }}>{product.details?.fit || 'Relaxed Boxy Dropped Shoulders'}</strong>
              </div>
              <div>
                <span style={{ color: '#71717a', display: 'block' }}>Care</span>
                <strong style={{ color: '#f5f5f7' }}>{product.details?.care || 'Machine wash cold inside-out'}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section style={{ paddingTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="badge badge-outline" style={{ marginBottom: '0.5rem' }}>
              COORDINATING PIECES
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
              Complete the Streetwear Silhouette
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetailPage;
