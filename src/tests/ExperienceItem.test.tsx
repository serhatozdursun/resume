import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import ExperienceItemComponent from '../components/ExperienceItem';

jest.mock(
  'next/image',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest mock factory must use require()
    require('./mockNextImage').default
);

jest.mock('html-react-parser', () => {
  return jest.fn((html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ));
});

const shortDescription = '<p>Short description text.</p>';
// Description long enough to trigger "See more" (over 300 chars)
const longDescription =
  '<p>' + 'A'.repeat(301) + '</p><p>Second paragraph content.</p>';

const baseProps = {
  title: 'Senior QA Engineer',
  company: 'Acme Corp',
  companyLogo: '/acme-logo.png',
  companyWebsite: 'https://acme.com',
  dateRange: 'Jan 2020 - Present',
  bullets: ['Bullet A', 'Bullet B'],
  description: longDescription,
};

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('ExperienceItemComponent', () => {
  describe('Rendering', () => {
    it('renders title, company, and date range', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      expect(screen.getByText('Senior QA Engineer')).toBeInTheDocument();
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('Jan 2020 - Present')).toBeInTheDocument();
    });

    it('renders company logo with correct alt text', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      expect(screen.getByAltText('Acme Corp logo')).toBeInTheDocument();
    });

    it('renders company links with correct href', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const links = screen.getAllByRole('link');
      const hrefs = links.map(l => l.getAttribute('href'));
      expect(hrefs).toContain('https://acme.com');
    });

    it('company links are not nested inside the toggle button', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const toggleButton = screen.getByRole('button', {
        name: /Senior QA Engineer.*toggle description/i,
      });
      const linksInsideButton = toggleButton.querySelectorAll('a');
      expect(linksInsideButton.length).toBe(0);
    });
  });

  describe('Toggle behavior', () => {
    it('shows "See more" button when description is long', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      expect(
        screen.getByRole('button', { name: /see more/i })
      ).toBeInTheDocument();
    });

    it('does not show "See more" when description is short', () => {
      renderWithTheme(
        <ExperienceItemComponent
          {...baseProps}
          description={shortDescription}
        />
      );
      expect(
        screen.queryByRole('button', { name: /see more/i })
      ).not.toBeInTheDocument();
    });

    it('shows "See less" after clicking "See more"', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      fireEvent.click(screen.getByRole('button', { name: /see more/i }));
      expect(
        screen.getByRole('button', { name: /see less/i })
      ).toBeInTheDocument();
    });

    it('collapses back to "See more" after clicking "See less"', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      fireEvent.click(screen.getByRole('button', { name: /see more/i }));
      fireEvent.click(screen.getByRole('button', { name: /see less/i }));
      expect(
        screen.getByRole('button', { name: /see more/i })
      ).toBeInTheDocument();
    });

    it('clicking the title toggle button expands description', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      fireEvent.click(
        screen.getByRole('button', {
          name: /Senior QA Engineer.*toggle description/i,
        })
      );
      expect(
        screen.getByRole('button', { name: /see less/i })
      ).toBeInTheDocument();
    });

    it('truncates long plain-text description when no </p> is found after index 300', () => {
      const plainLong = 'x'.repeat(400);
      const { container } = renderWithTheme(
        <ExperienceItemComponent {...baseProps} description={plainLong} />
      );
      const parsed = container.querySelector('.experience-content > div');
      expect(parsed?.textContent).toHaveLength(300);
      expect(
        screen.getByRole('button', { name: /see more/i })
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /see more/i }));
      expect(
        screen.getByRole('button', { name: /see less/i })
      ).toBeInTheDocument();
      expect(
        container.querySelector('.experience-content > div')?.textContent
      ).toHaveLength(400);
    });
  });

  describe('aria-expanded state', () => {
    it('toggle button aria-expanded is false initially', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const toggleButton = screen.getByRole('button', {
        name: /Senior QA Engineer.*toggle description/i,
      });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggle button aria-expanded becomes true after expand', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const toggleButton = screen.getByRole('button', {
        name: /Senior QA Engineer.*toggle description/i,
      });
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggle button aria-expanded returns to false after collapsing again', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const toggleButton = screen.getByRole('button', {
        name: /Senior QA Engineer.*toggle description/i,
      });
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('"See more" button aria-expanded is false initially', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      expect(screen.getByRole('button', { name: /see more/i })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('"See more" button aria-expanded becomes true after expand', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      fireEvent.click(screen.getByRole('button', { name: /see more/i }));
      expect(screen.getByRole('button', { name: /see less/i })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });

  describe('Keyboard accessibility', () => {
    it('toggle button is a native button element', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const toggleButton = screen.getByRole('button', {
        name: /Senior QA Engineer.*toggle description/i,
      });
      expect(toggleButton.tagName).toBe('BUTTON');
    });

    it('toggle button responds to click (Enter/Space handled natively by browser)', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const toggleButton = screen.getByRole('button', {
        name: /Senior QA Engineer.*toggle description/i,
      });
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('company links are independently keyboard-reachable', () => {
      renderWithTheme(<ExperienceItemComponent {...baseProps} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link.tagName).toBe('A');
      });
    });
  });

  describe('Accessibility', () => {
    it('passes axe checks', async () => {
      const { container } = renderWithTheme(
        <ExperienceItemComponent {...baseProps} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe checks with description expanded', async () => {
      const { container } = renderWithTheme(
        <ExperienceItemComponent {...baseProps} />
      );
      fireEvent.click(
        screen.getByRole('button', {
          name: /Senior QA Engineer.*toggle description/i,
        })
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
