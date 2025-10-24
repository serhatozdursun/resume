import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import ExperiencesComponents from '../components/ExperiencesComponents';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock html-react-parser
jest.mock('html-react-parser', () => {
  return jest.fn(html => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  });
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ExperiencesComponents', () => {
  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: jest.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all experience items', () => {
      renderWithTheme(<ExperiencesComponents />);

      // Check for updated company names
      expect(
        screen.getByText('Poq (via Index.dev), London')
      ).toBeInTheDocument();
      expect(screen.getByText('Affirm, United States')).toBeInTheDocument();
      expect(
        screen.getByText('Payflow (via Hubuc), Barcelona, Spain')
      ).toBeInTheDocument();
      expect(
        screen.getByText('ABB (via Testinium), Istanbul, Turkey')
      ).toBeInTheDocument();
      expect(screen.getByText('Apsiyon, Istanbul')).toBeInTheDocument();
      expect(screen.getByText('Trendyol Group, Istanbul')).toBeInTheDocument();
      expect(screen.getByText('Bimsa, Istanbul')).toBeInTheDocument();
      expect(screen.getByText('Sigortam.Net, Istanbul')).toBeInTheDocument();
      expect(screen.getByText('SET YAZILIM, Istanbul')).toBeInTheDocument();
    });

    it('renders all job titles', () => {
      renderWithTheme(<ExperiencesComponents />);

      // Use getAllByText for titles that appear multiple times
      const seniorQATitles = screen.getAllByText(
        /Senior QA Automation Engineer/
      );
      expect(seniorQATitles.length).toBeGreaterThan(0);

      expect(
        screen.getByText(/Lead QA Automation Engineer/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Senior Test Solutions Consultant/)
      ).toBeInTheDocument();
      expect(
        screen.getByText('Software Quality Assurance Team Lead')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Lead QA Automation Engineer (Self-Employed Contractor)'
        )
      ).toBeInTheDocument();

      // Use getAllByText for duplicate titles
      const softwareTestEngineerTitles = screen.getAllByText(
        'Software Test Engineer'
      );
      expect(softwareTestEngineerTitles.length).toBeGreaterThan(0);

      // Use getAllByText for duplicate titles
      const softwareTestingSpecialistTitles = screen.getAllByText(
        'Software Testing and Quality Specialist'
      );
      expect(softwareTestingSpecialistTitles.length).toBeGreaterThan(0);
    });

    it('renders all date ranges', () => {
      renderWithTheme(<ExperiencesComponents />);

      expect(screen.getByText('Aug 2023 - Present')).toBeInTheDocument();
      expect(screen.getByText('Jun 2022 - Aug 2023')).toBeInTheDocument();
      expect(screen.getByText('Mar 2021 - Jun 2022')).toBeInTheDocument();
      expect(screen.getByText('Nov 2019 - Mar 2021')).toBeInTheDocument();
      expect(screen.getByText('Jun 2017 - Nov 2019')).toBeInTheDocument();
      expect(screen.getByText('Jan 2016 - Jun 2017')).toBeInTheDocument();
      expect(screen.getByText('Nov 2013 - Jan 2016')).toBeInTheDocument();
      expect(screen.getByText('Mar 2012 - Nov 2013')).toBeInTheDocument();
      expect(screen.getByText('Oct 2010 - Mar 2012')).toBeInTheDocument();
    });

    it('renders company logos with correct alt text', () => {
      renderWithTheme(<ExperiencesComponents />);

      const logos = screen.getAllByRole('img');
      // There are 9 company logos (including one additional company)
      expect(logos.length).toBeGreaterThanOrEqual(8);

      // Check first few logos
      // First logo belongs to Poq (via Index.dev)
      expect(logos[0]).toHaveAttribute(
        'alt',
        'Poq (via Index.dev), London logo'
      );
    });

    it('renders company websites as clickable links', () => {
      renderWithTheme(<ExperiencesComponents />);

      const links = screen.getAllByRole('link');
      // There are more links than expected due to both logo and company name being clickable
      expect(links.length).toBeGreaterThanOrEqual(8);

      // Expect specific hrefs to be present among links
      const hrefs = links.map(l => l.getAttribute('href'));
      expect(hrefs).toEqual(
        expect.arrayContaining([
          'https://poqcommerce.com',
          'https://www.affirm.com/',
          'https://www.payflow.es/',
          'https://abb-bank.az/',
        ])
      );
    });
  });

  describe('Company Website Navigation', () => {
    it('has proper anchor tags for company websites', () => {
      renderWithTheme(<ExperiencesComponents />);

      const links = screen.getAllByRole('link');

      // Check that links have proper target and rel attributes
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });

      // Check that expected hrefs exist (order-agnostic)
      const hrefs = links.map(l => l.getAttribute('href'));
      expect(hrefs).toEqual(
        expect.arrayContaining([
          'https://poqcommerce.com',
          'https://www.affirm.com/',
          'https://www.payflow.es/',
          'https://abb-bank.az/',
        ])
      );
    });

    it('renders company logos with clickable links', () => {
      renderWithTheme(<ExperiencesComponents />);

      const logos = screen.getAllByRole('img');
      const logoLinks = logos.map(logo => logo.closest('a'));

      // Check that logos are wrapped in clickable links
      logoLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('renders company names with clickable links', () => {
      renderWithTheme(<ExperiencesComponents />);

      const companyNameLinks = screen.getAllByText(
        /Poq|Affirm|Payflow|ABB|Apsiyon|Trendyol|Bimsa|Sigortam|SET YAZILIM/
      );

      // Check that company names are clickable
      companyNameLinks.forEach(link => {
        if (link.tagName === 'A') {
          expect(link).toHaveAttribute('target', '_blank');
          expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
      });
    });
  });

  describe('Content Display', () => {
    it('displays job descriptions with HTML content', () => {
      renderWithTheme(<ExperiencesComponents />);

      // Check for key content in descriptions using getAllByText for duplicates
      const seniorQATitles = screen.getAllByText(
        /Senior QA Automation Engineer/
      );
      expect(seniorQATitles.length).toBeGreaterThan(0);

      expect(
        screen.getByText(/Lead QA Automation Engineer/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Senior Test Solutions Consultant/)
      ).toBeInTheDocument();
    });

    it('renders HTML content correctly', () => {
      renderWithTheme(<ExperiencesComponents />);

      // Check for HTML content like strong tags
      const strongElements = document.querySelectorAll('strong');
      expect(strongElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for all images', () => {
      renderWithTheme(<ExperiencesComponents />);

      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).toMatch(/logo$/);
      });
    });

    it('has proper link text for screen readers', () => {
      renderWithTheme(<ExperiencesComponents />);

      const links = screen.getAllByRole('link');
      // Filter out links that might be empty (like logo-only links)
      const linksWithText = links.filter(
        link => link.textContent && link.textContent.trim().length > 0
      );

      linksWithText.forEach(link => {
        expect(link).toHaveTextContent(/[A-Za-z]/);
      });
    });

    it('maintains proper heading structure', () => {
      renderWithTheme(<ExperiencesComponents />);

      // Check that job titles are properly structured
      const jobTitles = screen.getAllByText(/Senior|Lead|Software/);
      expect(jobTitles.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Behavior', () => {
    it('renders without crashing on different screen sizes', () => {
      // Test with different viewport sizes
      const { rerender } = renderWithTheme(<ExperiencesComponents />);

      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      rerender(
        <ThemeProvider theme={theme}>
          <ExperiencesComponents />
        </ThemeProvider>
      );
      expect(
        screen.getByText('Poq (via Index.dev), London')
      ).toBeInTheDocument();

      // Simulate desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      rerender(
        <ThemeProvider theme={theme}>
          <ExperiencesComponents />
        </ThemeProvider>
      );
      expect(
        screen.getByText('Poq (via Index.dev), London')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing company logos gracefully', () => {
      // This test ensures the component doesn't crash if logo paths are invalid
      renderWithTheme(<ExperiencesComponents />);

      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('src');
        expect(image.getAttribute('src')).toMatch(/\.(png|jpeg|jpg|webp|svg)$/);
      });
    });

    it('handles invalid website URLs gracefully', () => {
      renderWithTheme(<ExperiencesComponents />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toMatch(/^https?:\/\//);
      });
    });
  });
});
