// SkillsComponents.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SkillsComponents } from '../components/SkillsComponents';
import { theme } from '../components/theme';
import { skillExperienceTitle, skills } from '../data/skills';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('SkillsComponents', () => {
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
