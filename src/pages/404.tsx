import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <a href='/' style={{ color: '#2563eb', textDecoration: 'underline' }}>
        Go back home
      </a>
    </div>
  );
};

export default NotFoundPage;
