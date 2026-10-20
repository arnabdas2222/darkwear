import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('L');
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors?.[0]?.name, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card group">
      {/* Product Image and Badges */}
      <Link to={`/product/${product._id || product.slug}`} className="product-image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {discount && (
            <span className="badge badge-rose" style={{ background: '#f43f5e', color: '#ffffff', fontWeight: 700 }}>
              -{discount}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="badge badge-lime">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="badge badge-amber">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          zIndex: 2
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: 'rgba(9, 9, 11, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#d4d4d8',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {product.category}
          </span>
        </div>
      </Link>

      {/* Card Details */}
      <div className="product-card-body">
        
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <Star size={13} fill="#f59e0b" color="#f59e0b" />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f5f5f7' }}>
            {product.rating || 4.8}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#71717a' }}>
            ({product.numReviews || 24})
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product._id || product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#f5f5f7',
            marginBottom: '4px',
            lineHeight: 1.3,
            transition: 'color 0.2s ease'
          }}>
            {product.name}
          </h3>
        </Link>

        {/* Tagline / Subtitle */}
        <p style={{
          fontSize: '0.8rem',
          color: '#8e909d',
          marginBottom: '1rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {product.tagline || 'Heavyweight 280 GSM Boxy Cut'}
        </p>

        {/* Size Selection Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.25rem' }}>
          {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              style={{
                width: '28px',
                height: '26px',
                borderRadius: 'var(--radius-sm)',
                border: selectedSize === size ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.08)',
                background: selectedSize === size ? '#ffffff' : 'rgba(255,255,255,0.03)',
                color: selectedSize === size ? '#09090b' : '#a1a1aa',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart Action */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: '#71717a', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`btn btn-sm ${isAdded ? 'btn-pill-light' : 'btn-dark'}`}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isAdded ? (
              <>
                <Check size={14} color="#10b981" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Add ({selectedSize})</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
