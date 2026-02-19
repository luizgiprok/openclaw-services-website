import React from 'react';

const CustomerAreaSimple: React.FC = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      padding: '4rem', 
      margin: '2rem 0', 
      borderRadius: '16px',
      textAlign: 'center',
      color: 'white'
    }}>
      <h2>🚀 Área do Cliente</h2>
      <p>Esta é a sua área personalizada!</p>
      <button style={{
        background: 'white',
        color: '#667eea',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '1rem'
      }}>
        Acessar Dashboard
      </button>
    </div>
  );
};

export default CustomerAreaSimple;