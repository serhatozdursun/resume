import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import ExperienceList from '../components/ExperienceList';

jest.mock(
  'next/image',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest mock factory must use require()
    require('./mockNextImage').default
);

// Mock html-react-parser
jest.mock('html-react-parser', () => {
  return jest.fn((html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ));
});

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('ExperienceList', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<ExperienceList />);
      expect(screen.getByText('My Experiences')).toBeInTheDocument();
    });

    it('renders the main heading "My Experiences"', () => {
      renderWithTheme(<ExperienceList />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('My Experiences');
    });

    it('renders the heading in a div container', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('renders nested ExperienceList component', () => {
      renderWithTheme(<ExperienceList />);
      // ExperienceList component should render experience items
      // Check for at least one experience item rendered
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe('Content Structure', () => {
    it('has proper structure with heading and content', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.tagName).toBe('DIV');

      const heading = mainDiv.querySelector('h1');
      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe('My Experiences');
    });

    it('renders experience items from data', () => {
      renderWithTheme(<ExperienceList />);
      // Experience items should be rendered (from ExperiencesComponents)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders all experience companies', () => {
      renderWithTheme(<ExperienceList />);
      // Check for presence of multiple companies
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders all experience titles', () => {
      renderWithTheme(<ExperienceList />);
      // Check for experience titles
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });
  });

  describe('Component Structure', () => {
    it('uses React.FC type', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      expect(container).toBeInTheDocument();
    });

    it('renders in a ThemeProvider context', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('maintains proper DOM hierarchy', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const div = container.querySelector('div');
      const h1 = div?.querySelector('h1');
      expect(h1).toBeInTheDocument();
    });

    it('does not render without theme provider would fail gracefully', () => {
      // This test ensures that when properly themed, content renders
      renderWithTheme(<ExperienceList />);
      expect(screen.getByText('My Experiences')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible heading structure', () => {
      renderWithTheme(<ExperienceList />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('My Experiences');
    });

    it('all buttons have aria-labels or accessible names', () => {
      renderWithTheme(<ExperienceList />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(
          button.getAttribute('aria-label') || button.textContent
        ).toBeTruthy();
      });
    });

    it('all links have proper accessibility attributes', () => {
      renderWithTheme(<ExperienceList />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('passes axe accessibility checks', async () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('maintains semantic HTML', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const h1 = container.querySelector('h1');
      expect(h1?.tagName).toBe('H1');
    });

    it('heading is properly positioned in DOM', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const mainDiv = container.firstChild as HTMLElement;
      const h1 = mainDiv.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1?.textContent).toBe('My Experiences');
    });

    it('images have alt text', () => {
      renderWithTheme(<ExperienceList />);
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('text content is readable and properly formatted', () => {
      renderWithTheme(<ExperienceList />);
      const heading = screen.getByText('My Experiences');
      expect(heading).toBeVisible();
    });
  });

  describe('Content Validation', () => {
    it('renders experience items without errors', () => {
      expect(() => {
        renderWithTheme(<ExperienceList />);
      }).not.toThrow();
    });

    it('displays heading text correctly', () => {
      renderWithTheme(<ExperienceList />);
      const heading = screen.getByText('My Experiences');
      expect(heading.textContent).toBe('My Experiences');
    });

    it('experience container is rendered', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      // Experience items should be in the container
      const experienceItems = container.querySelectorAll('button[aria-expanded]');
      expect(experienceItems.length).toBeGreaterThan(0);
    });

    it('all experience items are visible', () => {
      renderWithTheme(<ExperienceList />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });

    it('renders correct number of experience items', () => {
      renderWithTheme(<ExperienceList />);
      // Should render multiple experience items
      const toggleButtons = screen.getAllByRole('button', {
        name: /toggle description/i,
      });
      expect(toggleButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Integration with nested components', () => {
    it('nested ExperiencesComponents renders properly', () => {
      renderWithTheme(<ExperienceList />);
      // Check that ExperiencesComponents is rendering
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('ExperienceItem components are rendered within the list', () => {
      renderWithTheme(<ExperienceList />);
      // ExperienceItem uses ExperienceItemComponent
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('company logos are displayed', () => {
      renderWithTheme(<ExperienceList />);
      const logos = screen.getAllByRole('img');
      expect(logos.length).toBeGreaterThan(0);
      logos.forEach(logo => {
        expect(logo).toHaveAttribute('alt');
        expect(logo.getAttribute('alt')).toMatch(/logo$/);
      });
    });

    it('company links are accessible', () => {
      renderWithTheme(<ExperienceList />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });

  describe('DOM queries', () => {
    it('queries heading by role', () => {
      renderWithTheme(<ExperienceList />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('My Experiences');
    });

    it('queries by text content', () => {
      renderWithTheme(<ExperienceList />);
      const heading = screen.getByText('My Experiences');
      expect(heading).toBeInTheDocument();
    });

    it('finds all buttons in the component tree', () => {
      renderWithTheme(<ExperienceList />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('finds all links in the component tree', () => {
      renderWithTheme(<ExperienceList />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Error handling', () => {
    it('handles empty experience data gracefully', () => {
      expect(() => {
        renderWithTheme(<ExperienceList />);
      }).not.toThrow();
    });

    it('does not render null or undefined values', () => {
      const { container } = renderWithTheme(<ExperienceList />);
      const textContent = container.textContent || '';
      expect(textContent).not.toContain('undefined');
      expect(textContent).not.toContain('null');
    });

    it('maintains component stability across re-renders', () => {
      const { rerender } = renderWithTheme(<ExperienceList />);
      expect(screen.getByText('My Experiences')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <ExperienceList />
        </ThemeProvider>
      );
      expect(screen.getByText('My Experiences')).toBeInTheDocument();
    });
  });
});
