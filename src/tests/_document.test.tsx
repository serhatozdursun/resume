import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

jest.mock('next/document', () => {
  const React = jest.requireActual<typeof import('react')>('react').default;
  return {
    Html: (props: React.ComponentPropsWithoutRef<'html'>) => (
      <html {...props}>{props.children}</html>
    ),
    Head: ({ children }: { children?: React.ReactNode }) => (
      // Mock for next/document Head; must render a document <head> node.
      // eslint-disable-next-line @next/next/no-head-element -- test double for next/document
      <head>{children}</head>
    ),
    Main: () => <main data-testid='main' />,
    NextScript: () => <script data-testid='next-script' />,
  };
});

import Document from '../pages/_document';

describe('_document', () => {
  it('renders html shell with lang, icons, main, and next script', () => {
    const html = renderToStaticMarkup(<Document />);

    expect(html).toContain('lang="en"');
    expect(html).toContain('href="/site.webmanifest"');
    expect(html).toContain('data-testid="main"');
    expect(html).toContain('data-testid="next-script"');
  });
});
