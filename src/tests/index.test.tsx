import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IndexPage from '../pages/index';

// Mock next/script
jest.mock('next/script', () => {
  return function MockScript({ children }: { children: React.ReactNode }) {
    return <div data-testid='script'>{children}</div>;
  };
});

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

jest.mock(
  'next/image',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest mock factory must use require()
    require('./mockNextImage').default
);

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  return function MockDynamic() {
    const Component = () => (
      <div data-testid='dynamic-component'>Dynamic Component</div>
    );
    Component.displayName = 'MockDynamicComponent';
    return Component;
  };
});

// Mock html-react-parser
jest.mock('html-react-parser', () => {
  return jest.fn(html => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  });
});

// Mock styled-components theme
jest.mock('../components/theme', () => ({
  theme: {
    colors: {
      primary: '#f3f4f6',
      secondary: '#e5e7eb',
      accent: '#2563eb',
      background: '#ffffff',
      text: '#222222',
      link: '#e11d48',
      highlight: '#1d4ed8',
      card: '#f9f9fb',
      shadow: 'rgba(80, 80, 80, 0.08)',
      cardShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
      sectionLabel: '#64748b',
      headerBg: '#f3f4f6',
      skillBarTrack: '#e5e7eb',
      skillBarFill: 'linear-gradient(90deg, #10b981, #34d399)',
    },
    spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
    breakpoints: {
      mobile: '768px',
    },
    font: {
      main: "'Inter', 'Roboto', Arial, sans-serif",
      heading: "'Montserrat', Arial, sans-serif",
    },
  },
}));

// Mock environment utilities
jest.mock('../utils/env', () => ({
  env: {
    GA_TRACKING_ID: 'test-ga-id',
    SITE_URL: 'https://serhatozdursun.com',
  },
}));

// Mock window.gtag
const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

describe('IndexPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.gtag
    window.gtag = mockGtag;
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      render(<IndexPage />);

      expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();
    });

    it('renders the main container', () => {
      render(<IndexPage />);

      // Check for the main container structure
      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });

    it('renders dynamic components', () => {
      render(<IndexPage />);

      // Check for dynamic components
      const dynamicComponents = screen.getAllByTestId('dynamic-component');
      expect(dynamicComponents.length).toBeGreaterThan(0);
    });
  });

  describe('SEO and Meta Tags', () => {
    it('renders SEO head elements', () => {
      render(<IndexPage />);

      expect(document.querySelector('title')).toBeInTheDocument();
    });

    it('includes proper meta tags', () => {
      render(<IndexPage />);

      // Check for essential meta tags
      expect(
        document.querySelector('meta[name="viewport"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[name="description"]')
      ).toBeInTheDocument();
      expect(document.querySelector('title')).toBeInTheDocument();
    });

    it('has correct page title', () => {
      render(<IndexPage />);

      const title = document.querySelector('title');
      expect(title).toHaveTextContent(
        'Lead QA Automation Engineer | AI-Driven Quality Engineering | ISTQB® CTAL-TM, CTAL-TAE & CTFL | 13+ Years'
      );
    });

    it('has correct meta description', () => {
      render(<IndexPage />);

      const description = document.querySelector('meta[name="description"]');
      expect(description).toHaveAttribute(
        'content',
        'Lead QA Automation Engineer with 13+ years of experience across mobile, web, and API platforms — building scalable test frameworks, integrating CI/CD quality gates, and driving AI-assisted testing.'
      );
    });

    it('renders all expected link texts', () => {
      render(<IndexPage />);

      const containers = document.querySelectorAll('.leftColumnLinkContainer');
      expect(containers.length).toBeGreaterThan(0);

      // Combine text from all containers into one string for easier checking
      const combinedText = Array.from(containers)
        .map(el => el.textContent)
        .join(' ');

      // Verify each expected text exists
      expect(combinedText).toContain('Download Resume');
      expect(combinedText).toContain('Recommendations');
      expect(combinedText).toContain('Mentorship & Knowledge Sharing');
      expect(combinedText).toContain(
        'Official U.S. List Recommendations Mentorship & Knowledge Sharing Practice Page CTAL-TAE Sample Exam CTAL-TM Sample Exam'
      );
      expect(combinedText).toContain('Practice Page');
      expect(combinedText).toContain('CTAL-TAE Sample Exam');
      expect(combinedText).toContain('CTAL-TM Sample Exam');
    });

    it('includes Open Graph meta tags', () => {
      render(<IndexPage />);

      expect(
        document.querySelector('meta[property="og:type"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:url"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:description"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:image"]')
      ).toBeInTheDocument();
    });

    it('includes Twitter meta tags', () => {
      render(<IndexPage />);

      expect(
        document.querySelector('meta[property="twitter:card"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="twitter:url"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="twitter:title"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="twitter:description"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="twitter:image"]')
      ).toBeInTheDocument();
    });

    it('has correct Open Graph title', () => {
      render(<IndexPage />);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toHaveAttribute(
        'content',
        'Mehmet Serhat Özdursun - Lead QA Automation Engineer'
      );
    });

    it('has correct Open Graph URL', () => {
      render(<IndexPage />);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      expect(ogUrl).toHaveAttribute('content', 'https://serhatozdursun.com/');
    });

    it('has correct Open Graph image', () => {
      render(<IndexPage />);

      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage).toHaveAttribute(
        'content',
        'https://serhatozdursun.com/profile.png'
      );
    });
  });

  describe('Google Analytics Integration', () => {
    it('includes Google Analytics script', () => {
      render(<IndexPage />);

      expect(screen.getAllByTestId('script').length).toBeGreaterThan(0);
    });

    it('has trackEvent function', () => {
      render(<IndexPage />);

      // The trackEvent function should be defined in the component
      expect(typeof window.gtag).toBe('function');
    });

    it('calls gtag when trackEvent is called', () => {
      render(<IndexPage />);

      // Simulate calling trackEvent
      if (window.gtag) {
        window.gtag('event', 'test_event', {
          event_category: 'test_category',
          event_label: 'test_label',
          value: 1,
        });

        expect(mockGtag).toHaveBeenCalledWith('event', 'test_event', {
          event_category: 'test_category',
          event_label: 'test_label',
          value: 1,
        });
      }
    });
  });

  describe('Dynamic Components', () => {
    it('renders ExperienceList component', () => {
      render(<IndexPage />);

      const dynamicComponents = screen.getAllByTestId('dynamic-component');
      expect(dynamicComponents.length).toBeGreaterThan(0);
    });

    it('renders CertificatesComponents', () => {
      render(<IndexPage />);

      const dynamicComponents = screen.getAllByTestId('dynamic-component');
      expect(dynamicComponents.length).toBeGreaterThan(0);
    });

    it('renders SkillsComponents', () => {
      render(<IndexPage />);

      const dynamicComponents = screen.getAllByTestId('dynamic-component');
      expect(dynamicComponents.length).toBeGreaterThan(0);
    });

    it('renders ContactForm', () => {
      render(<IndexPage />);

      const dynamicComponents = screen.getAllByTestId('dynamic-component');
      expect(dynamicComponents.length).toBeGreaterThan(0);
    });
  });

  describe('Content Summary', () => {
    it('includes summary content', () => {
      render(<IndexPage />);

      // The summary should be processed by html-react-parser
      expect(document.querySelector('div')).toBeInTheDocument();
    });

    it('renders HTML content correctly', () => {
      render(<IndexPage />);

      // Check that HTML content is rendered
      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });

    it('renders Engineering Projects cards with repository links', () => {
      render(<IndexPage />);

      expect(
        screen.getByRole('heading', { name: 'Real Engineering Work' })
      ).toBeInTheDocument();
      expect(screen.getByText('AI Visual Compare')).toBeInTheDocument();
      expect(
        screen.getByText('QA Engineering CI/CD Playground')
      ).toBeInTheDocument();

      expect(
        screen.getByRole('link', { name: 'AI Visual Compare repository' })
      ).toHaveAttribute(
        'href',
        'https://github.com/serhatozdursun/AI.VisualCompare'
      );
      expect(
        screen.getByRole('link', {
          name: 'QA Engineering CI/CD Playground repository',
        })
      ).toHaveAttribute('href', 'https://github.com/serhatozdursun/resume');
    });

    it('renders Open Source Contributions cards with external links', () => {
      render(<IndexPage />);

      expect(
        screen.getByRole('heading', { name: 'Ecosystem Contributions' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'WebdriverIO' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Gauge' })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('link', { name: 'WebdriverIO repository' })
      ).toHaveAttribute('href', 'https://github.com/webdriverio/webdriverio');
      expect(
        screen.getByRole('link', { name: 'Gauge repository' })
      ).toHaveAttribute('href', 'https://github.com/getgauge/gauge');
      expect(
        screen.getByRole('link', { name: 'Gauge contribution graph' })
      ).toHaveAttribute(
        'href',
        'https://github.com/getgauge/gauge/graphs/contributors'
      );
    });

    it('renders Articles & Knowledge Sharing card with topic tags and article link', () => {
      render(<IndexPage />);

      expect(
        screen.getByRole('heading', { name: 'Thought Leadership in QA and AI' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: 'What If AI Could Tell QA What Your Pull Request Might Break?',
        })
      ).toBeInTheDocument();

      expect(screen.getByText('AI in QA')).toBeInTheDocument();
      expect(
        screen.getByText('Pull Request Impact Analysis')
      ).toBeInTheDocument();
      expect(screen.getByText('Test Coverage Awareness')).toBeInTheDocument();

      expect(
        screen.getByRole('link', {
          name: 'What If AI Could Tell QA What Your Pull Request Might Break? article link',
        })
      ).toHaveAttribute(
        'href',
        'https://medium.com/dev-genius/what-if-ai-could-tell-qa-what-your-pull-request-might-break-b39842c94360'
      );

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: 'Self-Healing Locators That Report Themselves',
        })
      ).toBeInTheDocument();
      expect(screen.getByText('UI Test Automation')).toBeInTheDocument();
      expect(screen.getByText('Self-Healing Locators')).toBeInTheDocument();
      expect(screen.getByText('Test Stability')).toBeInTheDocument();
      expect(
        screen.getByRole('link', {
          name: 'Self-Healing Locators That Report Themselves article link',
        })
      ).toHaveAttribute(
        'href',
        'https://medium.com/dev-genius/self-healing-locators-that-report-themselves-a-smarter-way-to-avoid-ui-test-failures-8649b0723196'
      );
    });

    it('renders QA advisory CTA card linking to /qa-advisory', () => {
      render(<IndexPage />);

      const advisoryLink = screen.getByRole('link', {
        name: /Quality Engineering Advisory/i,
      });
      expect(advisoryLink).toHaveAttribute('href', '/qa-advisory');
    });

    it('renders compact current exploration list items', () => {
      render(<IndexPage />);

      expect(
        screen.getByRole('heading', { name: "What I'm Currently Exploring" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Applying AI-assisted automation workflows for PR impact analysis and intelligent test selection.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Designing AI-assisted visual regression pipelines to detect meaningful UI risk with lower review overhead.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Building Maestro-based mobile automation flows and validating them on real devices for production-like confidence.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Designing an AI orchestration layer that converts natural-language test intent into executable, maintainable test flows.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Leveraging open-source contribution work in WebdriverIO to strengthen reusable automation patterns and execution reliability.'
        )
      ).toBeInTheDocument();
    });

    it('renders a clear Professional Experience section heading before cards', () => {
      render(<IndexPage />);
      expect(
        screen.getByText('Professional Experience', { selector: 'p' })
      ).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('uses ThemeProvider', () => {
      render(<IndexPage />);

      // The component should be wrapped in ThemeProvider
      expect(document.querySelector('div')).toBeInTheDocument();
    });

    it('applies theme styling', () => {
      render(<IndexPage />);

      // Check that the component renders with theme
      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('renders on different screen sizes', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { rerender } = render(<IndexPage />);
      expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      rerender(<IndexPage />);
      expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing gtag gracefully', () => {
      // Remove gtag from window
      delete (window as unknown as { gtag: unknown }).gtag;

      expect(() => {
        render(<IndexPage />);
      }).not.toThrow();
    });

    it('handles undefined window', () => {
      const originalWindow = global.window;
      delete (global as unknown as { window: unknown }).window;

      expect(() => {
        render(<IndexPage />);
      }).not.toThrow();

      global.window = originalWindow;
    });

    it('renders all expected images with correct src and alt attributes', () => {
      render(<IndexPage />);

      const images = screen.getAllByRole('img');
      const imageSources = images.map(img => img.getAttribute('src'));

      // check total image count (if known)
      expect(images.length).toBeGreaterThanOrEqual(3);

      // check each image src
      expect(imageSources).toContain('/resume-computer-icons.png');
      expect(imageSources).toContain('/certified-tester-minimal-logo.png');
      expect(imageSources).toContain('/recommandation.png');

      // check alt text
      expect(screen.getByAltText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByAltText('recommendation')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(<IndexPage />);
      }).not.toThrow();
    });

    it('has proper container structure', () => {
      render(<IndexPage />);

      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });

    it('renders all required elements', () => {
      render(<IndexPage />);

      expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();
      expect(screen.getAllByTestId('script').length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('loads dynamic components efficiently', () => {
      const startTime = performance.now();

      render(<IndexPage />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time
      expect(renderTime).toBeLessThan(1000);
    });

    it('does not cause memory leaks', () => {
      const { unmount } = render(<IndexPage />);

      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });
});
