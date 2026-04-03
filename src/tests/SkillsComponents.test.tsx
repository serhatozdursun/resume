// SkillsComponents.test.tsx
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SkillsComponents } from '../components/SkillsComponents';
import { theme } from '../components/theme';
import { skillExperienceTitle, skills } from '../data/skills';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

/** Restore default `matchMedia` from jest.setup after tests that spy on it. */
const resetMatchMediaDefault = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('SkillsComponents', () => {
  beforeEach(() => {
    resetMatchMediaDefault();
  });

  it('omits section heading when hideSectionTitle is true', () => {
    renderWithTheme(<SkillsComponents hideSectionTitle />);

    expect(screen.queryByText('Skills')).not.toBeInTheDocument();
    expect(screen.getByText(skills[0].name)).toBeInTheDocument();
  });

  it('shows section heading when hideSectionTitle is false (default)', () => {
    renderWithTheme(<SkillsComponents />);

    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('sets native title on skill rows on mobile (non-desktop) viewport', () => {
    renderWithTheme(<SkillsComponents />);

    const skillName = screen.getByText(skills[0].name);
    const row = skillName.parentElement;
    expect(row).toHaveAttribute(
      'title',
      skillExperienceTitle(skills[0].experience)
    );
  });

  it('does not set native title on skill rows on desktop viewport', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(min-width: 769px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithTheme(<SkillsComponents />);

    const skillName = screen.getByText(skills[0].name);
    const row = skillName.parentElement;
    expect(row).not.toHaveAttribute('title');
  });

  it('shows custom tooltip on hover when viewport is desktop width', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(min-width: 769px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithTheme(<SkillsComponents />);

    const firstSkillName = screen.getByText(skills[0].name);
    const skillRow = firstSkillName.parentElement;
    expect(skillRow).toBeTruthy();
    fireEvent.mouseEnter(skillRow!);

    const tip = screen.getByText(skillExperienceTitle(skills[0].experience));
    expect(tip).toBeInTheDocument();
    expect(skillRow).toHaveAttribute(
      'aria-describedby',
      tip.getAttribute('id')
    );

    fireEvent.mouseLeave(skillRow!);
    expect(
      screen.queryByText(skillExperienceTitle(skills[0].experience))
    ).not.toBeInTheDocument();
  });

  it('renders skills correctly', () => {
    renderWithTheme(<SkillsComponents />);

    const skillsTitle = screen.getByText('Skills');
    expect(skillsTitle).toBeInTheDocument();

    skills.forEach(skill => {
      const skillName = screen.getByText(skill.name);
      expect(skillName).toBeInTheDocument();

      const skillLevelFill = screen.getByTestId(`${skill.name}-level-fill`);
      expect(skillLevelFill).toHaveStyle(`width: ${skill.level}%`);

      const row = skillName.closest('[title]');
      expect(row).toHaveAttribute(
        'title',
        skillExperienceTitle(skill.experience)
      );
    });
  });

  it('is accessible according to jest-axe', async () => {
    const { container } = renderWithTheme(<SkillsComponents />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
