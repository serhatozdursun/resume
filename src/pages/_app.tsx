import React from 'react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { validateEnv } from '../utils/env';
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Validate environment variables in development
    if (process.env.NODE_ENV === 'development') {
      try {
        validateEnv();
      } catch (error) {
        console.error('Environment validation failed:', error);
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
