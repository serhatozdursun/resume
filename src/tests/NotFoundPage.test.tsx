import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../pages/NotFoundPage';

// Mock react-helmet
jest.mock('react-helmet', () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='helmet'>{children}</div>
    ),
  };
});

describe('NotFoundPage Component', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  describe('Component Rendering', () => {
    it('renders the 404 title', () => {
      render(<NotFoundPage />);

      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders the error message', () => {
      render(<NotFoundPage />);

      expect(
        screen.getByText("Oops! The page you're looking for doesn't exist.")
      ).toBeInTheDocument();
    });

    it('renders the go back home link', () => {
      render(<NotFoundPage />);

      const homeLink = screen.getByText('Go Back Home');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders all main elements', () => {
      render(<NotFoundPage />);

      expect(screen.getByText('404')).toBeInTheDocument();
      expect(
        screen.getByText("Oops! The page you're looking for doesn't exist.")
      ).toBeInTheDocument();
      expect(screen.getByText('Go Back Home')).toBeInTheDocument();
    });
  });

  describe('Styled Components', () => {
    it('renders with proper container styling', () => {
      render(<NotFoundPage />);

      const container = screen.getByText('404').closest('div');
      expect(container).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        color: '#343a40',
      });
    });

    it('renders title with proper styling', () => {
      render(<NotFoundPage />);

      const title = screen.getByText('404');
      expect(title.tagName).toBe('H1');
      expect(title).toHaveStyle({
        fontSize: '6rem',
        marginBottom: '1rem',
      });
    });

    it('renders subtitle with proper styling', () => {
      render(<NotFoundPage />);

      const subtitle = screen.getByText(
        "Oops! The page you're looking for doesn't exist."
      );
      expect(subtitle.tagName).toBe('P');
      expect(subtitle).toHaveStyle({
        fontSize: '1.5rem',
        marginBottom: '2rem',
      });
    });

    it('renders link with proper styling', () => {
      render(<NotFoundPage />);

      const link = screen.getByText('Go Back Home');
      expect(link.tagName).toBe('A');
      expect(link).toHaveStyle({
        padding: '0.75rem 1.5rem',
        fontSize: '1.2rem',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(0, 123, 255)',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
      });
    });
  });

  describe('SEO and Meta Tags', () => {
    it('renders Helmet component', () => {
      render(<NotFoundPage />);

      expect(screen.getByTestId('helmet')).toBeInTheDocument();
    });

    it('includes proper meta tags', () => {
      render(<NotFoundPage />);

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
      render(<NotFoundPage />);

      const title = document.querySelector('title');
      expect(title).toHaveTextContent('Mehmet Serhat Ozdursun - 404');
    });

    it('has correct meta description', () => {
      render(<NotFoundPage />);

      const description = document.querySelector('meta[name="description"]');
      expect(description).toHaveAttribute(
        'content',
        'Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions'
      );
    });

    it('includes Open Graph meta tags', () => {
      render(<NotFoundPage />);

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
      render(<NotFoundPage />);

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
      render(<NotFoundPage />);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toHaveAttribute(
        'content',
        'Mehmet Serhat Ozdursun - 404'
      );
    });

    it('has correct Open Graph URL', () => {
      render(<NotFoundPage />);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      expect(ogUrl).toHaveAttribute('content', 'https://serhatozdursun.com/');
    });

    it('has correct Open Graph image', () => {
      render(<NotFoundPage />);

      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage).toHaveAttribute(
        'content',
        'https://serhatozdursun.com/profile.png'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<NotFoundPage />);

      const title = screen.getByText('404');
      expect(title.tagName).toBe('H1');
    });

    it('has proper link structure', () => {
      render(<NotFoundPage />);

      const link = screen.getByText('Go Back Home');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/');
    });

    it('has proper semantic structure', () => {
      render(<NotFoundPage />);

      const title = screen.getByText('404');
      const subtitle = screen.getByText(
        "Oops! The page you're looking for doesn't exist."
      );
      const link = screen.getByText('Go Back Home');

      expect(title.tagName).toBe('H1');
      expect(subtitle.tagName).toBe('P');
      expect(link.tagName).toBe('A');
    });
  });

  describe('Navigation', () => {
    it('has correct home link', () => {
      render(<NotFoundPage />);

      const link = screen.getByText('Go Back Home');
      expect(link).toHaveAttribute('href', '/');
    });

    it('link is clickable', () => {
      render(<NotFoundPage />);

      const link = screen.getByText('Go Back Home');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
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

      const { rerender } = render(<NotFoundPage />);
      expect(screen.getByText('404')).toBeInTheDocument();

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      rerender(<NotFoundPage />);
      expect(screen.getByText('404')).toBeInTheDocument();
    });
  });

  describe('Content Validation', () => {
    it('has correct error message text', () => {
      render(<NotFoundPage />);

      expect(
        screen.getByText("Oops! The page you're looking for doesn't exist.")
      ).toBeInTheDocument();
    });

    it('has correct navigation text', () => {
      render(<NotFoundPage />);

      expect(screen.getByText('Go Back Home')).toBeInTheDocument();
    });

    it('has correct error code', () => {
      render(<NotFoundPage />);

      expect(screen.getByText('404')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(<NotFoundPage />);
      }).not.toThrow();
    });

    it('renders all required elements', () => {
      render(<NotFoundPage />);

      expect(screen.getByText('404')).toBeInTheDocument();
      expect(
        screen.getByText("Oops! The page you're looking for doesn't exist.")
      ).toBeInTheDocument();
      expect(screen.getByText('Go Back Home')).toBeInTheDocument();
    });

    it('has proper container structure', () => {
      render(<NotFoundPage />);

      const container = screen.getByText('404').closest('div');
      expect(container).toBeInTheDocument();
    });
  });
});
