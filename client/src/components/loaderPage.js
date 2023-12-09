import React from 'react';

const LoaderPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default LoaderPage;
