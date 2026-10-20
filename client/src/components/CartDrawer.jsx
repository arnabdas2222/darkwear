import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    totalItemsCount,
    subtotal,
    shippingPrice,
    totalPrice,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 75;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)'
    }}>
      {/* Backdrop click to close */}
      <div
        style={{ position: 'absolute', inset: 0 }}
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: '#111116',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)'
        }}
        className="animate-fade-in"
      >
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#ffffff" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
              Your Bag
            </h2>
            <span className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              color: '#a1a1aa',
              padding: '0.4rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: '0.85rem 1.5rem',
          background: '#16161e',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
            {freeShippingRemaining > 0 ? (
              <span style={{ color: '#d4d4d8' }}>
                Add <strong style={{ color: '#ffffff' }}>${freeShippingRemaining.toFixed(2)}</strong> for Free Standard Shipping
              </span>
            ) : (
              <span style={{ color: '#34d399', fontWeight: 700 }}>
                ✓ You qualified for Free Shipping!
              </span>
            )}
            <span style={{ color: '#71717a' }}>${freeShippingThreshold} Target</span>
          </div>

          <div style={{ width: '100%', height: '5px', background: '#272733', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${freeShippingProgress}%`,
              height: '100%',
              background: freeShippingRemaining === 0 ? '#10b981' : '#ffffff',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'center',
              gap: '1rem',
              padding: '3rem 1rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed rgba(255, 255, 255, 0.15)'
              }}>
                <ShoppingBag size={28} color="#71717a" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f5f5f7' }}>
                Your shopping bag is empty
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#8e909d', maxWidth: '240px' }}>
                Explore our latest heavyweight streetwear drops and find your fit.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.85rem',
                  background: '#16161d',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '74px',
                    height: '88px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover',
                    background: '#09090b'
                  }}
                />

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#71717a',
                          cursor: 'pointer',
                          padding: '2px'
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
                        Size: <strong style={{ color: '#ffffff' }}>{item.size}</strong>
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
                        Color: {item.color}
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Unit Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#0e0e13',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: '#a1a1aa', padding: '4px 8px', cursor: 'pointer' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 4px', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: '#a1a1aa', padding: '4px 8px', cursor: 'pointer' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculation & Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            background: '#14141a',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#a1a1aa' }}>
              <span>Subtotal</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#a1a1aa' }}>
              <span>Shipping</span>
              <span style={{ color: shippingPrice === 0 ? '#34d399' : '#ffffff', fontWeight: 600 }}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: '#ffffff',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <span>Estimated Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-pill-light"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                padding: '0.75rem 0.85rem 0.75rem 1.5rem',
                marginTop: '0.5rem'
              }}
            >
              <span>Proceed to Checkout</span>
              <div className="icon-bubble">
                <ArrowRight size={16} />
              </div>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: '#71717a', marginTop: '4px' }}>
              <ShieldCheck size={14} color="#34d399" />
              <span>Safe & Secure Simulated Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
