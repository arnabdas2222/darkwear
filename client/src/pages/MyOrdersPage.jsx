import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyOrdersPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await api.get('/orders/my-orders');
        if (res.data?.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge badge-emerald">Delivered</span>;
      case 'Shipped':
        return <span className="badge badge-lime">In Transit / Shipped</span>;
      case 'Confirmed':
        return <span className="badge badge-outline" style={{ color: '#60a5fa', borderColor: '#60a5fa' }}>Confirmed</span>;
      case 'Processing':
      default:
        return <span className="badge badge-amber">Processing Drop</span>;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem', maxWidth: '960px' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          My Streetwear Orders
        </h1>
        <p style={{ color: '#8e909d', fontSize: '0.95rem' }}>
          Track past drops, review logistics statuses, and view digital delivery receipts.
        </p>
      </div>

      {loading ? (
        <div style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#ffffff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '5rem 1rem',
          background: '#121217',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '1px dashed rgba(255, 255, 255, 0.15)'
          }}>
            <Package size={28} color="#71717a" />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            No Orders Yet
          </h3>
          <p style={{ color: '#8e909d', maxWidth: '360px', margin: '0 auto 1.75rem' }}>
            You haven't ordered any DarkWear streetwear pieces yet. Explore our recent drops to get started.
          </p>
          <Link to="/shop" className="btn-pill-light">
            <span>Explore Catalog</span>
            <div className="icon-bubble">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((order) => (
            <div
              key={order._id || order.orderNumber}
              style={{
                background: '#121217',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              {/* Card Header */}
              <div style={{
                padding: '1.25rem 1.75rem',
                background: '#15151c',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#8e909d', display: 'block' }}>ORDER NUMBER</span>
                    <strong style={{ fontSize: '1rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                      {order.orderNumber}
                    </strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#8e909d', display: 'block' }}>DATE PLACED</span>
                    <span style={{ fontSize: '0.875rem', color: '#d4d4d8' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#8e909d', display: 'block' }}>TOTAL AMOUNT</span>
                    <strong style={{ fontSize: '0.95rem', color: '#bef264' }}>
                      ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                    </strong>
                  </div>
                </div>

                <div>
                  {getStatusBadge(order.orderStatus)}
                </div>
              </div>

              {/* Items List */}
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        borderBottom: idx !== order.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                        paddingBottom: idx !== order.items.length - 1 ? '1.25rem' : 0
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '64px',
                            height: '76px',
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            background: '#09090b'
                          }}
                        />
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                            {item.name}
                          </h4>
                          <p style={{ fontSize: '0.825rem', color: '#a1a1aa' }}>
                            Size: <strong style={{ color: '#ffffff' }}>{item.size}</strong> • Color: {item.color} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Info: Shipping address & Re-order */}
                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.825rem',
                  color: '#8e909d'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} color="#bef264" />
                    <span>
                      Delivering to: <strong style={{ color: '#ffffff' }}>{order.shippingAddress?.fullName}</strong> ({order.shippingAddress?.city}, {order.shippingAddress?.country})
                    </span>
                  </div>

                  <Link
                    to={`/order-success/${order._id || order.orderNumber}`}
                    state={{ order }}
                    style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    View Digital Receipt
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyOrdersPage;
