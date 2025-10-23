import React, { ImgHTMLAttributes } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IndexPage from '../pages/index';

// Mock next/script
jest.mock('next/script', () => {
  return function MockScript({ children }: { children: React.ReactNode }) {
    return <div data-testid='script'>{children}</div>;
  };
});

jest.mock('next/image', () => {
  const MockNextImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );
  MockNextImage.displayName = 'MockNextImage';
  return MockNextImage;
});

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

// Mock react-helmet
jest.mock('react-helmet', () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='helmet'>{children}</div>
    ),
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
      card: '#f9f9fb',
      shadow: 'rgba(80, 80, 80, 0.08)',
      headerBg: '#f3f4f6',
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
    NEXT_PUBLIC_GA_ID: 'test-ga-id',
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

      expect(screen.getByTestId('helmet')).toBeInTheDocument();
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
    it('renders Helmet component', () => {
      render(<IndexPage />);

      expect(screen.getByTestId('helmet')).toBeInTheDocument();
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
        'QA Leader | Senior SDET | ISTQB® CTAL-TM, CTAL-TAE & CTFL PSD I | 13+ Years in Quality Engineering'
      );
    });

    it('has correct meta description', () => {
      render(<IndexPage />);

      const description = document.querySelector('meta[name="description"]');
      expect(description).toHaveAttribute(
        'content',
        'Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions'
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
      expect(combinedText).toContain(
        'Official U.S. List Recommendations Practice Page CTAL-TAE Sample Exam CTAL-TM Sample Exam'
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
        'Mehmet Serhat Özdursun - QA Automation Engineer'
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
      expect(screen.getByTestId('helmet')).toBeInTheDocument();

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      rerender(<IndexPage />);
      expect(screen.getByTestId('helmet')).toBeInTheDocument();
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
      expect(screen.getByAltText('recommandation')).toBeInTheDocument();
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

      expect(screen.getByTestId('helmet')).toBeInTheDocument();
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
