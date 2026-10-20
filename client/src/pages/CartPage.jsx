import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    shippingPrice,
    taxPrice,
    totalPrice,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    clearCart
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    const result = applyPromoCode(inputCode);
    setPromoFeedback(result);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          border: '1px dashed rgba(255, 255, 255, 0.15)'
        }}>
          <ShoppingBag size={32} color="#71717a" />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          Your Shopping Bag is Empty
        </h2>
        <p style={{ color: '#8e909d', maxWidth: '380px', margin: '0 auto 2rem' }}>
          Explore our heavy-GSM streetwear archive and pick your essentials.
        </p>
        <Link to="/shop" className="btn btn-pill-light">
          <span>Explore Streetwear Drops</span>
          <div className="icon-bubble">
            <ArrowRight size={16} />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Shopping Bag
          </h1>
          <p style={{ color: '#8e909d', fontSize: '0.95rem' }}>
            Review your selected streetwear pieces before checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          style={{ background: 'none', border: 'none', color: '#f43f5e', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
        >
          Clear All Items
        </button>
      </div>

      {/* Grid: Items on Left, Order Summary on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '3rem',
        alignItems: 'flex-start'
      }}>
        
        {/* Left Column: Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cartItems.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.25rem',
                background: '#121217',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-lg)',
                alignItems: 'center'
              }}
            >
              {/* Product Thumbnail */}
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '90px',
                    height: '110px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    background: '#09090b'
                  }}
                />
              </Link>

              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Link to={`/product/${item.productId}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                  </Link>

                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '4px' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.825rem', color: '#a1a1aa', marginBottom: '1rem' }}>
                  <span>Size: <strong style={{ color: '#ffffff' }}>{item.size}</strong></span>
                  <span>Color: {item.color}</span>
                  <span>Unit: ${item.price}</span>
                </div>

                {/* Quantity and Subtotal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#09090c',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', color: '#a1a1aa', padding: '6px 10px', cursor: 'pointer' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, padding: '0 6px', minWidth: '24px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', color: '#a1a1aa', padding: '6px 10px', cursor: 'pointer' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#a1a1aa', marginTop: '0.5rem' }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Right Column: Order Summary Card */}
        <div style={{
          background: '#121217',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
            Order Summary
          </h2>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Promo code (e.g. DARK15)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              style={{
                flex: 1,
                background: '#09090c',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 1rem',
                color: '#ffffff',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-outline btn-sm">
              Apply
            </button>
          </form>

          {promoFeedback && (
            <p style={{ fontSize: '0.8rem', color: promoFeedback.success ? '#34d399' : '#f43f5e' }}>
              {promoFeedback.message}
            </p>
          )}

          {promoCode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#34d399' }}>
              <Tag size={14} />
              <span>Promo <strong>{promoCode}</strong> applied (-{discountPercent}%)</span>
            </div>
          )}

          {/* Price Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', color: '#a1a1aa' }}>
              <span>Subtotal</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', color: '#bef264' }}>
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', color: '#a1a1aa' }}>
              <span>Standard Shipping</span>
              <span style={{ color: shippingPrice === 0 ? '#34d399' : '#ffffff', fontWeight: 600 }}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', color: '#a1a1aa' }}>
              <span>Estimated Tax (8%)</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>${taxPrice.toFixed(2)}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#ffffff',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-pill-light"
            style={{
              width: '100%',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem 0.85rem 1.75rem',
              marginTop: '0.75rem'
            }}
          >
            <span>Proceed to Checkout</span>
            <div className="icon-bubble">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>

      </div>

    </div>
  );
};

export default CartPage;
