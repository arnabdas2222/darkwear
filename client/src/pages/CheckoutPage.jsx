import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CheckoutPage = () => {
  const { cartItems, subtotal, discountAmount, shippingPrice, taxPrice, totalPrice, clearCart } = useCart();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || userProfile?.displayName || 'Alex Rivers',
    email: currentUser?.email || userProfile?.email || 'shopper@darkwear.com',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'Brooklyn',
    state: 'NY',
    postalCode: '11201',
    country: 'United States',
    phone: '+1 (555) 234-5678'
  });

  const [paymentMethod, setPaymentMethod] = useState('demo-card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          Your bag is empty
        </h2>
        <p style={{ color: '#8e909d', marginBottom: '1.5rem' }}>
          You cannot checkout without any items in your bag.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone
        },
        paymentMethod: paymentMethod === 'demo-card'
          ? 'Demo Credit Card (Instant Simulated Approval)'
          : 'Cash on Delivery (Simulated Test Order)',
        itemsPrice: subtotal - discountAmount,
        shippingPrice,
        taxPrice,
        totalPrice
      };

      // Call backend REST API
      const res = await api.post('/orders', orderPayload);

      if (res.data?.success) {
        const orderId = res.data.data._id || res.data.data.orderNumber;
        clearCart();
        navigate(`/order-success/${orderId}`, { state: { order: res.data.data } });
      }
    } catch (err) {
      console.error('Order placement error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      
      {/* Top Banner */}
      <div style={{ marginBottom: '2.5rem' }}>
        <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Bag
        </Link>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff' }}>
          Finalize Streetwear Order
        </h1>
      </div>

      {/* Demo Notice Banner (Required by instructions: clearly mark demo payment flow) */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <AlertCircle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.875rem', color: '#fcd34d', margin: 0 }}>
          <strong>DEMO / SANDBOX ENVIRONMENT:</strong> This checkout process simulates payment completion and saves genuine order records in the backend database. No actual credit card charge will be incurred.
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          color: '#f43f5e',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {/* 2-Column Checkout Layout */}
      <form onSubmit={handlePlaceOrder} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '3.5rem',
        alignItems: 'flex-start'
      }}>
        
        {/* Left: Shipping & Payment Method */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Shipping Address */}
          <div style={{
            background: '#121217',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} color="#bef264" />
              1. Shipping Address
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="input-control"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Email Address for Confirmation</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="input-control"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="input-control"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Postal / ZIP Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  className="input-control"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Country</label>
                <input
                  type="text"
                  name="country"
                  required
                  className="input-control"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Contact Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="input-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{
            background: '#121217',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="#bef264" />
              2. Payment Method
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Option 1: Demo Credit Card */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'demo-card' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: paymentMethod === 'demo-card' ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="demo-card"
                  checked={paymentMethod === 'demo-card'}
                  onChange={() => setPaymentMethod('demo-card')}
                  style={{ accentColor: '#ffffff' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Demo Credit / Debit Card (Instant Test Approval)
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#8e909d', margin: 0 }}>
                    Pre-authorized simulated card gateway for testing order workflow.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="badge badge-outline" style={{ fontSize: '0.65rem' }}>TEST CARD</span>
                </div>
              </label>

              {/* Option 2: Cash on Delivery / Pay on Drop */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'cod' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: paymentMethod === 'cod' ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  style={{ accentColor: '#ffffff' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Cash on Delivery / Drop Handoff
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#8e909d', margin: 0 }}>
                    Pay upon receipt of physical streetwear delivery.
                  </p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right: Order Summary Preview & Submit */}
        <div style={{
          background: '#121217',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          position: 'sticky',
          top: '90px'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
            Items in Drop ({cartItems.length})
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxHeight: '260px',
            overflowY: 'auto',
            marginBottom: '1.5rem',
            paddingRight: '0.5rem'
          }}>
            {cartItems.map((item) => (
              <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '56px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#8e909d' }}>
                    Qty: {item.quantity} • Size: {item.size}
                  </span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', color: '#a1a1aa' }}>
              <span>Subtotal</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', color: '#bef264' }}>
                <span>VIP Promo Discount</span>
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
              <span>Estimated Sales Tax</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>${taxPrice.toFixed(2)}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#ffffff',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span>Total Price</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-pill-light"
            style={{
              width: '100%',
              padding: '0.95rem 1.75rem',
              marginTop: '1.5rem',
              fontSize: '1.05rem',
              justifyContent: 'center'
            }}
          >
            {loading ? (
              <span>Confirming & Placing Order...</span>
            ) : (
              <span>Complete Order (${totalPrice.toFixed(2)})</span>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#71717a', marginTop: '1rem' }}>
            <Lock size={13} />
            <span>256-bit encrypted simulated transaction</span>
          </div>

        </div>

      </form>

    </div>
  );
};

export default CheckoutPage;
