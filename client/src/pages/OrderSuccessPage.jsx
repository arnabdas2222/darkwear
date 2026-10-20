import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Truck, Calendar, MapPin } from 'lucide-react';
import api from '../services/api';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order && id) {
      const fetchOrder = async () => {
        try {
          const res = await api.get(`/orders/${id}`);
          if (res.data?.success) {
            setOrder(res.data.data);
          }
        } catch (err) {
          console.error('Failed to load order:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, order]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '36px',
          height: '36px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#ffffff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  const orderNum = order?.orderNumber || id || 'DW-99412';
  const deliveryDate = new Date(Date.now() + 86400000 * 4).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem', maxWidth: '780px' }}>
      
      {/* Success Hero Header */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        background: '#121217',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-elevated)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <CheckCircle size={38} color="#34d399" />
        </div>

        <span className="badge badge-lime" style={{ marginBottom: '0.75rem' }}>
          CONFIRMED STREETWEAR DROP
        </span>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          Thank you for your order!
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
          Your order has been recorded in our logistics queue. We've dispatched a digital receipt to your account.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#09090c',
          padding: '0.6rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#8e909d' }}>Order Number:</span>
          <strong style={{ fontSize: '1rem', color: '#ffffff', letterSpacing: '0.05em' }}>{orderNum}</strong>
        </div>
      </div>

      {/* Logistics & Delivery Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ background: '#121217', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#bef264', marginBottom: '0.5rem' }}>
            <Calendar size={18} />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Arrival</h4>
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{deliveryDate}</p>
          <span style={{ fontSize: '0.75rem', color: '#8e909d' }}>Standard Underground Courier</span>
        </div>

        <div style={{ background: '#121217', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#bef264', marginBottom: '0.5rem' }}>
            <MapPin size={18} />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Destination</h4>
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {order?.shippingAddress?.fullName || 'Alex Rivers'}
          </p>
          <span style={{ fontSize: '0.75rem', color: '#8e909d' }}>
            {order?.shippingAddress?.city || 'Brooklyn'}, {order?.shippingAddress?.country || 'United States'}
          </span>
        </div>

        <div style={{ background: '#121217', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#bef264', marginBottom: '0.5rem' }}>
            <Package size={18} />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Current Status</h4>
          </div>
          <span className="badge badge-amber" style={{ fontSize: '0.85rem' }}>
            {order?.orderStatus || 'Processing'}
          </span>
          <p style={{ fontSize: '0.75rem', color: '#8e909d', marginTop: '6px' }}>Being packed in protective matte mailer</p>
        </div>
      </div>

      {/* Itemized Order Review */}
      {order?.items && order.items.length > 0 && (
        <div style={{
          background: '#121217',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
            Ordered Garments
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '50px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#8e909d' }}>Size: {item.size} • Qty: {item.quantity}</span>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', paddingTop: '0.5rem' }}>
            <span>Total Paid</span>
            <span>${order.totalPrice ? order.totalPrice.toFixed(2) : '133.92'}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/my-orders" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.85rem 1.75rem' }}>
          View in My Orders
        </Link>
        <Link to="/shop" className="btn-pill-light">
          <span>Continue Shopping</span>
          <div className="icon-bubble">
            <ArrowRight size={16} />
          </div>
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccessPage;
