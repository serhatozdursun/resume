import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SidebarLinks from '../components/SidebarLinks';
import { renderWithTheme } from './test-utils';

jest.mock(
  'next/image',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest mock factory must use require()
    require('./mockNextImage').default
);

jest.mock('next/dynamic', () => {
  return function MockDynamic() {
    const Component = () => (
      <div data-testid='dynamic-sidebar-component'>Dynamic Component</div>
    );
    Component.displayName = 'MockDynamicComponent';
    return Component;
  };
});

const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

describe('SidebarLinks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.gtag = mockGtag;
  });

  it('renders Download Resume link', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
    expect(screen.getByText('Download Resume')).toHaveAttribute(
      'href',
      'https://drive.google.com/file/d/1wQuZyIB8PJnpUnjRJPlQJs8u_hEITzc6/view?usp=sharing'
    );
  });

  it('renders Official U.S. List link', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('Official U.S. List')).toBeInTheDocument();
  });

  it('renders Recommendations link', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('Recommendations')).toBeInTheDocument();
  });

  it('renders Practice Page link', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('Practice Page')).toBeInTheDocument();
    expect(screen.getByText('Practice Page')).toHaveAttribute(
      'href',
      '/practice'
    );
  });

  it('renders CTAL-TAE Sample Exam link', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('CTAL-TAE Sample Exam')).toBeInTheDocument();
    expect(screen.getByText('CTAL-TAE Sample Exam')).toHaveAttribute(
      'href',
      '/ctal-tae-exam'
    );
  });

  it('renders CTAL-TM Sample Exam link', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('CTAL-TM Sample Exam')).toBeInTheDocument();
    expect(screen.getByText('CTAL-TM Sample Exam')).toHaveAttribute(
      'href',
      '/ctal-tm-exam'
    );
  });

  it('renders QA Help section', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByText('QA Help')).toBeInTheDocument();
    expect(screen.getByText('QA Help')).toHaveAttribute('id', 'qaHelpLabel');
  });

  it('renders dynamic components', () => {
    renderWithTheme(<SidebarLinks />);
    const dynamicComponents = screen.getAllByTestId(
      'dynamic-sidebar-component'
    );
    expect(dynamicComponents.length).toBeGreaterThanOrEqual(1);
  });

  it('external links have target _blank and rel noopener noreferrer', () => {
    renderWithTheme(<SidebarLinks />);
    const downloadLink = screen.getByText('Download Resume');
    expect(downloadLink).toHaveAttribute('target', '_blank');
    expect(downloadLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('internal links do not have target attribute', () => {
    renderWithTheme(<SidebarLinks />);
    const practiceLink = screen.getByText('Practice Page');
    expect(practiceLink).not.toHaveAttribute('target');
  });

  it('calls gtag when clicking Download Resume link', () => {
    renderWithTheme(<SidebarLinks />);
    fireEvent.click(screen.getByText('Download Resume'));
    expect(mockGtag).toHaveBeenCalledWith('event', 'download_resume', {
      event_category: 'resume',
      event_label: 'Download Resume',
      value: 1,
    });
  });

  it('calls onTrackEvent callback when provided', () => {
    const onTrackEvent = jest.fn();
    renderWithTheme(<SidebarLinks onTrackEvent={onTrackEvent} />);
    fireEvent.click(screen.getByText('Download Resume'));
    expect(onTrackEvent).toHaveBeenCalledWith(
      'download_resume',
      'resume',
      'Download Resume'
    );
  });

  it('handles missing gtag gracefully', () => {
    delete (window as unknown as { gtag: unknown }).gtag;
    expect(() => renderWithTheme(<SidebarLinks />)).not.toThrow();
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
    window.gtag = mockGtag;
  });

  it('renders Official U.S. List with title attribute', () => {
    renderWithTheme(<SidebarLinks />);
    const atsqaLink = screen.getByText('Official U.S. List');
    expect(atsqaLink).toHaveAttribute(
      'title',
      'Official U.S. List of Certified & Credentialed Software Testers™'
    );
  });

  it('renders all link icons with correct alt text', () => {
    renderWithTheme(<SidebarLinks />);
    expect(screen.getByAltText('resume')).toBeInTheDocument();
    expect(screen.getByAltText('atsqa-logo')).toBeInTheDocument();
    expect(screen.getByAltText('recommendation')).toBeInTheDocument();
    expect(screen.getByAltText('Practice Page')).toBeInTheDocument();
    expect(screen.getByAltText('CTAL-TAE Exam')).toBeInTheDocument();
    expect(screen.getByAltText('CTAL-TM Exam')).toBeInTheDocument();
  });
});
