import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import ExamPage from '../components/ExamPage';
import { theme } from '../components/theme';

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

jest.mock('next/script', () => {
  return function MockScript() {
    return null;
  };
});

jest.mock('../utils/env', () => ({
  env: { GA_TRACKING_ID: 'G-TEST-ID' },
}));

global.fetch = jest.fn();

const examConfig = {
  examType: 'TAE' as const,
  dataFile: '/ctal_tae_sample_exam.json',
  title: 'ISTQB CTAL-TAE Sample Exam',
  subtitle: 'Practice with real exam questions',
  description:
    'ISTQB CTAL-TAE Sample Exam. Prepare for test automation certification.',
  canonicalUrl: 'https://serhatozdursun.com/ctal-tae-exam',
  pagePath: '/ctal-tae-exam',
  keywords: 'ISTQB, CTAL-TAE, sample exam',
  structuredDataName: 'ISTQB CTAL-TAE Sample Exam',
  structuredDataDescription:
    'Prepare for ISTQB CTAL-TAE with realistic sample questions.',
};

const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
  id: `Q${i + 1}`,
  question: `Q${i + 1}?`,
  answers: { a: 'A', b: 'B', c: 'C', d: 'D' },
  correct_answer: 'a',
  points: 1,
  syllabus_reference: 'S-1',
  tip: 'Tip',
  real_life_example: '',
}));

const mockExamData = {
  metadata: { title: 'Bank', counts: { total: 50 } },
  questions: mockQuestions,
};

describe('ExamPage', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockExamData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders exam content after data loads', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ExamPage config={examConfig} />
      </ThemeProvider>
    );

    expect(
      await screen.findByText('ISTQB CTAL-TAE Sample Exam')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Practice with real exam questions')
    ).toBeInTheDocument();
  });

  it('exposes description, canonical URL, and JSON-LD structured data in Head', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ExamPage config={examConfig} />
      </ThemeProvider>
    );

    await screen.findByText('ISTQB CTAL-TAE Sample Exam');

    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).toHaveAttribute('content', examConfig.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toHaveAttribute('href', examConfig.canonicalUrl);

    expect(document.querySelector('title')).toHaveTextContent(
      `Mehmet Serhat Özdursun - ${examConfig.title}`
    );

    const ld = document.querySelector('script[type="application/ld+json"]');
    expect(ld).toBeTruthy();
    const structured = JSON.parse(ld?.textContent ?? '{}') as {
      name: string;
      description: string;
      url: string;
      '@type': string;
    };
    expect(structured['@type']).toBe('WebPage');
    expect(structured.name).toBe(examConfig.title);
    expect(structured.description).toBe(examConfig.structuredDataDescription);
    expect(structured.url).toBe(examConfig.canonicalUrl);
  });

  it('includes Open Graph and Twitter meta tags for the exam page', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ExamPage config={examConfig} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toHaveAttribute(
        'content',
        `Mehmet Serhat Özdursun - ${examConfig.title}`
      );
    });

    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      examConfig.canonicalUrl
    );
    expect(
      document.querySelector('meta[property="twitter:card"]')
    ).toHaveAttribute('content', 'summary_large_image');
  });
});
