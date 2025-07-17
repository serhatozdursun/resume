import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import {
  Container,
  LeftColumn,
  RightColumn,
  Name,
  SkillLevelFill,
  ProfileImage,
} from '../components/StyledComponents';
import { theme } from '../components/theme';
import { ThemeProvider } from 'styled-components';

describe('StyledComponents', () => {
  it('renders Container correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Container />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).toHaveStyleRule('max-width', '100%');
  });

  it('renders LeftColumn correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <LeftColumn />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('flex', '1');
    expect(container.firstChild).toHaveStyleRule('padding-top', '40px');
  });

  it('renders RightColumn correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <RightColumn />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('flex', '2.8');
    expect(container.firstChild).toHaveStyleRule('padding-right', '100px');
    expect(container.firstChild).toHaveStyleRule('padding-left', '30px');
  });

  it('renders Name correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Name />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('font-size', '1.5em');
    expect(container.firstChild).toHaveStyleRule('margin-bottom', '0.2em');
  });

  // Add similar tests for other components as needed

  it('SkillLevelFill renders with correct width', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SkillLevelFill $level={50} />
      </ThemeProvider>
    );
    const skillLevelFillElement = container.firstChild as HTMLElement;
    expect(skillLevelFillElement).toHaveStyleRule('width: 50%;');
  });

  it('renders ProfileImage correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ProfileImage src='/profile.png' alt='Profile' />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('width', '150px');
    expect(container.firstChild).toHaveStyleRule('height', '200px');
    expect(container.firstChild).toHaveStyleRule('border-radius', '15px');
  });
});
