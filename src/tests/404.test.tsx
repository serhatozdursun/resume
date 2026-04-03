import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound404 from '../pages/404';

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

describe('pages/404', () => {
  it('renders 404 message and home link', () => {
    render(<NotFound404 />);

    expect(
      screen.getByRole('heading', { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The page you’re looking for doesn’t exist\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go back home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
