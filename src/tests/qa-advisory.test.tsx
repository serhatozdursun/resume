import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QaAdvisoryPage from '../pages/qa-advisory';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import { qaAdvisoryMeta } from '../data/qaAdvisory';

jest.mock(
  'next/image',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest mock factory must use require()
    require('./mockNextImage').default
);

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('QaAdvisoryPage', () => {
  it('renders hero, service sections, and visible advisory form', () => {
    render(
      <ThemeProvider theme={theme}>
        <QaAdvisoryPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole('heading', {
        name: 'Quality Engineering Advisory (Occasional)',
        level: 1,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Who this is for' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What I help with' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Typical challenges' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Outcomes you can expect' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Why work with me' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Advisory inquiry' })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Get in touch/i })).toHaveAttribute(
      'href',
      '#advisory-contact'
    );
    expect(
      screen.getByRole('link', { name: /Individual mentorship/i })
    ).toHaveAttribute('href', '/mentorship');

    expect(screen.getByRole('link', { name: /← Home/ })).toHaveAttribute(
      'href',
      '/'
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://serhatozdursun.com/qa-advisory'
    );
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      qaAdvisoryMeta.description
    );
  });
});
