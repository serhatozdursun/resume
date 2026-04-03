import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link href='/' style={{ color: '#2563eb', textDecoration: 'underline' }}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
