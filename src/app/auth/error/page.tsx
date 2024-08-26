import React from 'react';

const ErrorCard: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div style={{ border: '1px solid red', padding: '20px', borderRadius: '5px', backgroundColor: '#f8d7da' }}>
      <h2 style={{ color: '#721c24' }}>错误</h2>
      <p style={{ color: '#721c24' }}>{message}</p>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ErrorCard message="发生了一些错误，请稍后再试。" />
    </div>
  );
};

export default ErrorPage;