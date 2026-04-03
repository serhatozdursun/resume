import React from 'react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { validateEnv } from '../utils/env';
import ErrorBoundary from '../components/ErrorBoundary';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

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
      <main className={`${inter.variable} ${montserrat.variable}`}>
        <Component {...pageProps} />
      </main>
    </ErrorBoundary>
  );
}
