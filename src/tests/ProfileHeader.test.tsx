import React, { ImgHTMLAttributes } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileHeader from '../components/ProfileHeader';
import { profile } from '../data/profile';
import { renderWithTheme } from './test-utils';

jest.mock('next/image', () => {
  const MockNextImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element -- mock for tests
    <img {...props} />
  );
  MockNextImage.displayName = 'MockNextImage';
  return MockNextImage;
});

const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

describe('ProfileHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.gtag = mockGtag;
  });

  it('renders profile name', () => {
    renderWithTheme(<ProfileHeader />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });

  it('renders profile email with mailto link', () => {
    renderWithTheme(<ProfileHeader />);
    const emailLink = screen.getByRole('link', { name: profile.email });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${profile.email}`);
  });

  it('renders profile phone with tel link', () => {
    renderWithTheme(<ProfileHeader />);
    const phoneLink = screen.getByRole('link', { name: profile.phone });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', `tel:${profile.phone}`);
  });

  it('renders languages', () => {
    renderWithTheme(<ProfileHeader />);
    expect(screen.getByText(/Languages/)).toBeInTheDocument();
    expect(
      screen.getByText(/Turkish \(Native\), English \(C1\), Spanish \(B\)/)
    ).toBeInTheDocument();
  });

  it('renders title content', () => {
    renderWithTheme(<ProfileHeader />);
    expect(screen.getByText(/QA Leader/)).toBeInTheDocument();
    expect(screen.getByText(/ISTQB® CTAL-TM/)).toBeInTheDocument();
    expect(screen.getByText(/13\+ Years/)).toBeInTheDocument();
  });

  it('renders social links with correct hrefs', () => {
    renderWithTheme(<ProfileHeader />);
    expect(
      screen.getByRole('link', { name: 'LinkedIn' }).closest('a')
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/serhat-ozdursun/');
    expect(
      screen.getByRole('link', { name: 'GitHub' }).closest('a')
    ).toHaveAttribute('href', 'https://github.com/serhatozdursun');
  });

  it('calls gtag when clicking social link with trackEvent', () => {
    renderWithTheme(<ProfileHeader />);
    const linkedInLink = screen
      .getByRole('link', { name: 'LinkedIn' })
      .closest('a');
    if (linkedInLink) {
      fireEvent.click(linkedInLink);
      expect(mockGtag).toHaveBeenCalledWith('event', 'navigate_linkedin', {
        event_category: 'linkedin',
        event_label: 'Linkedin',
        value: 1,
      });
    }
  });

  it('calls onTrackEvent callback when provided', () => {
    const onTrackEvent = jest.fn();
    renderWithTheme(<ProfileHeader onTrackEvent={onTrackEvent} />);
    const linkedInLink = screen
      .getByRole('link', { name: 'LinkedIn' })
      .closest('a');
    if (linkedInLink) {
      fireEvent.click(linkedInLink);
      expect(onTrackEvent).toHaveBeenCalledWith(
        'navigate_linkedin',
        'linkedin',
        'Linkedin'
      );
    }
  });

  it('handles missing gtag gracefully', () => {
    delete (window as unknown as { gtag: unknown }).gtag;
    expect(() => renderWithTheme(<ProfileHeader />)).not.toThrow();
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    window.gtag = mockGtag;
  });

  it('renders all social link images', () => {
    renderWithTheme(<ProfileHeader />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(7);
    expect(screen.getByAltText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByAltText('GitHub')).toBeInTheDocument();
  });
});
