import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Compass size={36} color="#bef264" />
      </div>

      <span className="badge badge-outline" style={{ marginBottom: '0.75rem' }}>
        ERROR 404
      </span>

      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
        Lost in the Underground
      </h1>

      <p style={{ color: '#8e909d', fontSize: '1.05rem', maxWidth: '440px', marginBottom: '2rem' }}>
        The streetwear coordinates you entered do not exist or the limited piece has moved to our archive.
      </p>

      <Link to="/" className="btn btn-pill-light">
        <ArrowLeft size={16} />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
