import React, { useState, useEffect } from 'react';
import {
  Shield, Package, ShoppingBag, DollarSign, AlertTriangle, Plus,
  Edit2, Trash2, Check, X, Search, Filter, RefreshCw
} from 'lucide-react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, pendingCount: 0, shippedCount: 0, deliveredCount: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Product Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    tagline: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'oversized',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '',
    stock: 30,
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
    fabric: '100% Combed Heavyweight Cotton (280 GSM)',
    fit: 'Relaxed Boxy Drop-Shoulder'
  });

  const [feedback, setFeedback] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders')
      ]);

      if (prodRes.data?.success) {
        setProducts(prodRes.data.data);
      }
      if (ordRes.data?.success) {
        setOrders(ordRes.data.data);
        if (ordRes.data.stats) {
          setStats(ordRes.data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setFeedback({ type: 'error', message: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      tagline: 'Heavyweight 280 GSM Boxy Streetwear Tee',
      description: 'Crafted from combed heavyweight organic cotton with signature dropped shoulders and double-needle stitched neckband.',
      price: '48',
      originalPrice: '62',
      category: 'oversized',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      stock: 25,
      featured: true,
      isNewArrival: true,
      isBestSeller: false,
      fabric: '100% Combed Heavyweight Cotton (280 GSM)',
      fit: 'Relaxed Boxy Drop-Shoulder'
    });
    setIsModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      tagline: prod.tagline || '',
      description: prod.description,
      price: prod.price.toString(),
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
      category: prod.category || 'oversized',
      sizes: prod.sizes || ['S', 'M', 'L', 'XL'],
      image: (prod.images && prod.images[0]) || '',
      stock: prod.stock !== undefined ? prod.stock : 25,
      featured: Boolean(prod.featured),
      isNewArrival: Boolean(prod.isNewArrival),
      isBestSeller: Boolean(prod.isBestSeller),
      fabric: prod.details?.fabric || '100% Combed Cotton',
      fit: prod.details?.fit || 'Relaxed Boxy'
    });
    setIsModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: productForm.name,
        tagline: productForm.tagline,
        description: productForm.description,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
        category: productForm.category,
        sizes: productForm.sizes,
        images: [productForm.image],
        stock: Number(productForm.stock),
        featured: productForm.featured,
        isNewArrival: productForm.isNewArrival,
        isBestSeller: productForm.isBestSeller,
        details: {
          fabric: productForm.fabric,
          fit: productForm.fit,
          care: 'Machine wash cold inside-out, hang dry',
          weight: productForm.fabric.includes('GSM') ? productForm.fabric.split('(')[1]?.replace(')', '') : '280 GSM'
        }
      };

      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct._id}`, payload);
        if (res.data?.success) {
          showNotification('success', `Product "${productForm.name}" updated successfully.`);
          setProducts(prev => prev.map(p => p._id === editingProduct._id ? res.data.data : p));
        }
      } else {
        const res = await api.post('/products', payload);
        if (res.data?.success) {
          showNotification('success', `New drop "${productForm.name}" added to catalog.`);
          setProducts(prev => [res.data.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save product error:', err);
      showNotification('error', err.response?.data?.message || 'Failed to save product.');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      showNotification('success', `Product "${name}" deleted.`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Failed to delete product.');
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { status: newStatus });
      if (res.data?.success) {
        showNotification('success', `Order status updated to ${newStatus}.`);
        setOrders(prev => prev.map(o => (o._id === orderId || o.orderNumber === orderId) ? res.data.data : o));
      }
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Failed to update order status.');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = products.filter(p => p.stock !== undefined && p.stock <= 15).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      
      {/* Header with Title and Quick Refresh */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
            <Shield size={16} color="#bef264" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#bef264', letterSpacing: '0.08em' }}>
              DARKWEAR COMMAND CONSOLE
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff' }}>
            Store Administration
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={fetchAdminData}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <RefreshCw size={14} /> Refresh Data
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Plus size={16} /> Add T-Shirt Drop
          </button>
        </div>
      </div>

      {/* Global Notifications */}
      {feedback && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
          border: feedback.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
          color: feedback.type === 'success' ? '#34d399' : '#f43f5e',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {feedback.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 4 Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Revenue</span>
            <DollarSign size={18} color="#bef264" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>${totalRevenue.toFixed(2)}</p>
          <span style={{ fontSize: '0.75rem', color: '#8e909d' }}>Across {orders.length} lifetime orders</span>
        </div>

        <div style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Active Catalog</span>
            <Package size={18} color="#bef264" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>{products.length}</p>
          <span style={{ fontSize: '0.75rem', color: '#8e909d' }}>Distinct streetwear designs</span>
        </div>

        <div style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Customer Orders</span>
            <ShoppingBag size={18} color="#bef264" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>{orders.length}</p>
          <span style={{ fontSize: '0.75rem', color: '#8e909d' }}>{stats.pendingCount || 0} in active processing</span>
        </div>

        <div style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Low Stock Alert</span>
            <AlertTriangle size={18} color="#f59e0b" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: lowStockCount > 0 ? '#f59e0b' : '#ffffff' }}>{lowStockCount}</p>
          <span style={{ fontSize: '0.75rem', color: '#8e909d' }}>Pieces below 15 units</span>
        </div>
      </div>

      {/* Tabs Switcher: Products vs Orders */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '2rem',
        gap: '2rem'
      }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '0.75rem 0.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'products' ? '2px solid #ffffff' : '2px solid transparent',
            color: activeTab === 'products' ? '#ffffff' : '#8e909d',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          T-Shirt Catalog Management ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '0.75rem 0.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'orders' ? '2px solid #ffffff' : '2px solid transparent',
            color: activeTab === 'orders' ? '#ffffff' : '#8e909d',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Customer Orders & Status ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCTS INVENTORY */}
      {activeTab === 'products' && (
        <div style={{ background: '#121217', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          
          {/* Table Header Bar */}
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} color="#71717a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search products by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#09090c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.55rem 1rem 0.55rem 2.4rem',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={handleOpenAddModal}
              className="btn btn-pill-light btn-sm"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>

          {/* Products Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#15151c', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Product</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Price</th>
                  <th style={{ padding: '1rem' }}>Stock</th>
                  <th style={{ padding: '1rem' }}>Sizes</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={(p.images && p.images[0]) || ''}
                        alt={p.name}
                        style={{ width: '48px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: '#09090b' }}
                      />
                      <div>
                        <p style={{ fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>{p.name}</p>
                        <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{p.slug}</span>
                      </div>
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-outline" style={{ textTransform: 'capitalize' }}>
                        {p.category}
                      </span>
                    </td>

                    <td style={{ padding: '1rem', fontWeight: 700, color: '#ffffff' }}>
                      ${p.price}
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        color: p.stock <= 15 ? '#f59e0b' : '#34d399',
                        fontWeight: 700
                      }}>
                        {p.stock} in stock
                      </span>
                    </td>

                    <td style={{ padding: '1rem', color: '#a1a1aa' }}>
                      {p.sizes?.join(', ')}
                    </td>

                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#ffffff',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                          }}
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                          style={{
                            background: 'rgba(244,63,94,0.1)',
                            border: '1px solid rgba(244,63,94,0.25)',
                            color: '#f43f5e',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                          }}
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS LOGISTICS */}
      {activeTab === 'orders' && (
        <div style={{ background: '#121217', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              Customer Orders Pipeline
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#15151c', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Order #</th>
                  <th style={{ padding: '1rem' }}>Customer</th>
                  <th style={{ padding: '1rem' }}>Items</th>
                  <th style={{ padding: '1rem' }}>Total</th>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id || o.orderNumber} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#ffffff' }}>
                      {o.orderNumber}
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <p style={{ fontWeight: 600, color: '#ffffff', margin: 0 }}>
                        {o.shippingAddress?.fullName || o.user?.displayName || 'Customer'}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{o.user?.email}</span>
                    </td>

                    <td style={{ padding: '1rem', color: '#d4d4d8' }}>
                      {o.items?.map(it => `${it.quantity}x ${it.name} (${it.size})`).join(', ')}
                    </td>

                    <td style={{ padding: '1rem', fontWeight: 800, color: '#bef264' }}>
                      ${o.totalPrice ? o.totalPrice.toFixed(2) : '0.00'}
                    </td>

                    <td style={{ padding: '1rem', color: '#a1a1aa' }}>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>

                    <td style={{ padding: '1rem 1.5rem' }}>
                      {/* Status Dropdown */}
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o._id || o.orderNumber, e.target.value)}
                        style={{
                          background: '#09090c',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#15151d',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '620px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9)'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                {editingProduct ? 'Edit Streetwear Garment' : 'Add New Streetwear Drop'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#8e909d', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              
              <div className="input-group">
                <label className="input-label">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acid Neon Oversized Heavy Tee"
                  className="input-control"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Tagline / Short Specification</label>
                <input
                  type="text"
                  placeholder="e.g. Heavyweight 280 GSM Mineral Washed Boxy Tee"
                  className="input-control"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="input-control"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Original Price (for discount badge)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 65"
                    className="input-control"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Category</label>
                  <select
                    className="input-control"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option value="oversized">Oversized</option>
                    <option value="graphic">Graphic</option>
                    <option value="minimal">Minimal</option>
                    <option value="basic">Basic</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Available Stock Quantity</label>
                  <input
                    type="number"
                    required
                    className="input-control"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="input-control"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea
                  rows="3"
                  required
                  className="input-control"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Fabric Specification</label>
                  <input
                    type="text"
                    className="input-control"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Fit Description</label>
                  <input
                    type="text"
                    className="input-control"
                    value={productForm.fit}
                    onChange={(e) => setProductForm({ ...productForm, fit: e.target.value })}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0 1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ffffff', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    style={{ accentColor: '#ffffff' }}
                  />
                  <span>Featured Drop</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ffffff', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                    style={{ accentColor: '#ffffff' }}
                  />
                  <span>New Arrival</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ffffff', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    style={{ accentColor: '#ffffff' }}
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-pill-light"
                >
                  <span>{editingProduct ? 'Save Changes' : 'Create Drop'}</span>
                  <div className="icon-bubble">
                    <Check size={16} />
                  </div>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
