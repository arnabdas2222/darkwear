import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        background: '#15151c',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.05)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: 600,
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <CheckCircle2 size={18} color="#bef264" />
      <span>{toastMessage}</span>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Toast;
