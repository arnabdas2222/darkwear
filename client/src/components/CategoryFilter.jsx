import React from 'react';

const CategoryFilter = ({ activeCategory, onSelectCategory, categories = [] }) => {
  const defaultCategories = [
    { id: 'all', name: 'All Drops' },
    { id: 'oversized', name: 'Oversized' },
    { id: 'graphic', name: 'Graphic' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'basic', name: 'Basic' }
  ];

  const list = categories.length > 0 ? categories : defaultCategories;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      overflowX: 'auto',
      paddingBottom: '0.5rem',
      scrollbarWidth: 'none'
    }}>
      {list.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
              background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
              color: isActive ? '#09090b' : '#a1a1aa',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap'
            }}
          >
            {cat.name} {cat.count !== undefined && <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({cat.count})</span>}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
