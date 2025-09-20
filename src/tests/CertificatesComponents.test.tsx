// CertificatesComponents.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CertificatesComponents from '../components/CertificatesComponents';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('CertificatesComponents', () => {
  it('renders certificate items correctly', () => {
    render(<CertificatesComponents />);

    const certificateTitles = screen.getAllByRole('heading', {
      name: /Certificates/i,
    });
    expect(certificateTitles.length).toBe(1);

    const certificates = screen.getAllByRole('listitem');
    expect(certificates.length).toBe(7);
  });

  it('handles click events correctly', () => {
    render(<CertificatesComponents />);

    const certificateLinks = screen.getAllByRole('link');

    // Click the first certificate link
    fireEvent.click(certificateLinks[0]);

    // Check if the clicked badge color changes to blue
    expect(certificateLinks[0]).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Clicking again should not change color
    fireEvent.click(certificateLinks[0]);
    expect(certificateLinks[0]).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Click the second certificate link
    fireEvent.click(certificateLinks[1]);
    expect(certificateLinks[1]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('is accessible according to jest-axe', async () => {
    const { container } = render(<CertificatesComponents />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
