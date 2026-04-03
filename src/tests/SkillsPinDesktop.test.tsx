import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  SkillsPinBoundary,
  SkillsPinDesktop,
  SkillsPinProvider,
} from '../components/SkillsPinDesktop';

describe('SkillsPinDesktop', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('renders as static SkillsStickySection when SkillsPinProvider is absent', () => {
    const { container } = render(
      <SkillsPinDesktop>
        <span data-testid='skills-child'>Skills block</span>
      </SkillsPinDesktop>
    );

    expect(screen.getByTestId('skills-child')).toBeInTheDocument();
    expect(container.querySelector('[data-skills-pin-wrapper]')).toBeNull();
  });

  it('renders pin wrapper and boundary sentinel when provider wraps the tree', () => {
    render(
      <SkillsPinProvider>
        <div style={{ position: 'relative', minHeight: 200 }}>
          <SkillsPinDesktop>
            <span data-testid='skills-child'>Pinned skills</span>
          </SkillsPinDesktop>
          <SkillsPinBoundary />
        </div>
      </SkillsPinProvider>
    );

    expect(screen.getByTestId('skills-child')).toBeInTheDocument();
    expect(
      document.querySelector('[data-skills-pin-wrapper]')
    ).toBeInTheDocument();
    expect(screen.getByTestId('skills-pin-boundary')).toBeInTheDocument();
  });

  it('does not render boundary sentinel when SkillsPinProvider is absent', () => {
    render(
      <div>
        <SkillsPinBoundary />
      </div>
    );

    expect(screen.queryByTestId('skills-pin-boundary')).not.toBeInTheDocument();
  });
});
