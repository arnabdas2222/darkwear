import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import api from '../services/api';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const [sortOption, setSortOption] = useState('newest');
  const [selectedSize, setSelectedSize] = useState('all');

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        let sortQuery = '';
        if (sortOption === 'price-low') sortQuery = '&sort=price-low';
        else if (sortOption === 'price-high') sortQuery = '&sort=price-high';
        else if (sortOption === 'rating') sortQuery = '&sort=rating';

        const [prodRes, catRes] = await Promise.all([
          api.get(`/products?category=${categoryParam}&search=${encodeURIComponent(searchParam)}${sortQuery}`),
          api.get('/products/meta/categories')
        ]);

        if (prodRes.data?.success) {
          setProducts(prodRes.data.data);
        }
        if (catRes.data?.success) {
          setCategories(catRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [categoryParam, searchParam, sortOption]);

  const handleCategorySelect = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('search', e.target.value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSelectedSize('all');
    setSortOption('newest');
  };

  // Client-side size filter if active
  const filteredProducts = selectedSize === 'all'
    ? products
    : products.filter(p => p.sizes && p.sizes.includes(selectedSize));

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      
      {/* Header Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          Streetwear Catalog
        </h1>
        <p style={{ color: '#8e909d', fontSize: '1rem', maxWidth: '600px' }}>
          Explore our complete archive of heavyweight streetwear t-shirts engineered with boxy silhouettes and durable combed cotton.
        </p>
      </div>

      {/* Control Bar: Search, Category Pills, Sort, and Size */}
      <div style={{
        background: '#121217',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        
        {/* Top Controls: Search & Sort */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          {/* Search Input */}
          <div style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '480px'
          }}>
            <Search size={18} color="#71717a" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by name, fabric, or keyword..."
              value={searchParam}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                background: '#09090c',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-full)',
                padding: '0.65rem 1rem 0.65rem 2.6rem',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {searchParam && (
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('search');
                  setSearchParams(newParams);
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#71717a',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                background: '#09090c',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="newest">Latest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Tabs & Size Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {/* Categories */}
          <CategoryFilter
            activeCategory={categoryParam}
            onSelectCategory={handleCategorySelect}
            categories={categories}
          />

          {/* Size Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#71717a', marginRight: '4px' }}>Size:</span>
            {['all', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedSize === sz ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: selectedSize === sz ? '#ffffff' : 'transparent',
                  color: selectedSize === sz ? '#09090b' : '#a1a1aa'
                }}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Count & Active Filters Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        color: '#8e909d'
      }}>
        <div>
          Showing <strong style={{ color: '#ffffff' }}>{filteredProducts.length}</strong> streetwear t-shirts
          {searchParam && <span> for "<strong>{searchParam}</strong>"</span>}
        </div>

        {(categoryParam !== 'all' || searchParam || selectedSize !== 'all') && (
          <button
            onClick={clearAllFilters}
            style={{
              background: 'none',
              border: 'none',
              color: '#f43f5e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.825rem',
              fontWeight: 600
            }}
          >
            <RefreshCw size={12} /> Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid or Empty State */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[...Array(8)].map((_, i) => (
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
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '5rem 1rem',
          background: '#121217',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
            No T-shirts matched your filters
          </h3>
          <p style={{ color: '#8e909d', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
            Try broadening your search criteria or resetting your filters to explore all available garments.
          </p>
          <button
            onClick={clearAllFilters}
            className="btn btn-primary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ShopPage;
