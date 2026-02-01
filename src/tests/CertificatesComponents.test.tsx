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
      name: /Certificates & Achievements/i,
    });
    expect(certificateTitles.length).toBe(1);

    const certificates = screen.getAllByRole('listitem');
    expect(certificates.length).toBe(9);
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

  it('displays all certificate names correctly', () => {
    render(<CertificatesComponents />);

    expect(screen.getByText('AT*SQA Advisory Board 2026')).toBeInTheDocument();
    expect(screen.getByText('ISTQB® CTAL-TM')).toBeInTheDocument();
    expect(screen.getByText('ISTQB® CTAL-TAE')).toBeInTheDocument();
    expect(screen.getByText('ISTQB® CTFL')).toBeInTheDocument();
    expect(screen.getByText('PSD I')).toBeInTheDocument();
    expect(screen.getByText('Problem Solving (Int.)')).toBeInTheDocument();
    expect(screen.getByText('Java (Basic) Certificate')).toBeInTheDocument();
    expect(screen.getByText('Python (Basic) Certificate')).toBeInTheDocument();
    expect(screen.getByText('C# (Basic) Certificate')).toBeInTheDocument();
  });

  it('has correct links for all certificates', () => {
    render(<CertificatesComponents />);

    const certificateLinks = screen.getAllByRole('link');

    expect(certificateLinks[0]).toHaveAttribute(
      'href',
      'https://atsqa.org/atsqa-advisory-board-members-2026'
    );
    expect(certificateLinks[1]).toHaveAttribute(
      'href',
      'https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229'
    );
    expect(certificateLinks[2]).toHaveAttribute(
      'href',
      'https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229'
    );
    expect(certificateLinks[3]).toHaveAttribute(
      'href',
      'https://scr.istqb.org/?name=%C3%96ZDURSUN&number=&orderBy=relevancy&orderDirection=&dateStart=&dateEnd=&expiryStart=&expiryEnd=&certificationBody=&examProvider=&certificationLevel=&country=&resultsPerPage=10'
    );
    expect(certificateLinks[4]).toHaveAttribute(
      'href',
      'https://www.credly.com/badges/c81059a4-a85f-4b9b-83b8-aa4d7cf36c31/public_url'
    );
    expect(certificateLinks[5]).toHaveAttribute(
      'href',
      'https://www.hackerrank.com/certificates/c331e49c22d0'
    );
    expect(certificateLinks[6]).toHaveAttribute(
      'href',
      'https://www.hackerrank.com/certificates/995550878771'
    );
    expect(certificateLinks[7]).toHaveAttribute(
      'href',
      'https://www.hackerrank.com/certificates/2256773c8ba5'
    );
    expect(certificateLinks[8]).toHaveAttribute(
      'href',
      'https://www.hackerrank.com/certificates/957d5fbf06b4'
    );
  });

  it('displays correct badge images', () => {
    render(<CertificatesComponents />);

    const badgeImages = screen.getAllByRole('img');

    // Check that images have the expected src patterns (Next.js Image component adds query params)
    expect(badgeImages[0]).toHaveAttribute(
      'src',
      expect.stringContaining('AT_SQA_Advisory_Board_Ozdursun.png')
    );
    expect(badgeImages[1]).toHaveAttribute(
      'src',
      expect.stringContaining('CTAL-TM-badge.png')
    );
    expect(badgeImages[2]).toHaveAttribute(
      'src',
      expect.stringContaining('CTAL-TAE-badge.png')
    );
    expect(badgeImages[3]).toHaveAttribute(
      'src',
      expect.stringContaining('Foundation-Level-Exam-2022.png')
    );
    expect(badgeImages[4]).toHaveAttribute(
      'src',
      expect.stringContaining('psd1.png')
    );
    expect(badgeImages[5]).toHaveAttribute(
      'src',
      expect.stringContaining('hackerrank.png')
    );
    expect(badgeImages[6]).toHaveAttribute(
      'src',
      expect.stringContaining('hackerrank.png')
    );
    expect(badgeImages[7]).toHaveAttribute(
      'src',
      expect.stringContaining('hackerrank.png')
    );
    expect(badgeImages[8]).toHaveAttribute(
      'src',
      expect.stringContaining('hackerrank.png')
    );
  });

  it('handles multiple clicks on different certificates', () => {
    render(<CertificatesComponents />);

    const certificateLinks = screen.getAllByRole('link');

    // Click first certificate
    fireEvent.click(certificateLinks[0]);
    expect(certificateLinks[0]).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Click second certificate
    fireEvent.click(certificateLinks[1]);
    expect(certificateLinks[1]).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Click third certificate
    fireEvent.click(certificateLinks[2]);
    expect(certificateLinks[2]).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // All clicked certificates should remain blue
    expect(certificateLinks[0]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(certificateLinks[1]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(certificateLinks[2]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('maintains state correctly when clicking same certificate multiple times', () => {
    render(<CertificatesComponents />);

    const certificateLinks = screen.getAllByRole('link');
    const firstLink = certificateLinks[0];

    // Click first time
    fireEvent.click(firstLink);
    expect(firstLink).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Click second time - should remain blue
    fireEvent.click(firstLink);
    expect(firstLink).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Click third time - should still remain blue
    fireEvent.click(firstLink);
    expect(firstLink).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('has proper alt text for all badge images', () => {
    render(<CertificatesComponents />);

    const badgeImages = screen.getAllByRole('img');

    // Check that images have appropriate alt text
    expect(badgeImages[0]).toHaveAttribute(
      'alt',
      'AT*SQA Advisory Board 2026 Badge'
    );
    expect(badgeImages[1]).toHaveAttribute('alt', 'ISTQB® CTAL-TM Badge');
    expect(badgeImages[2]).toHaveAttribute('alt', 'ISTQB® CTAL-TAE Badge');
    expect(badgeImages[3]).toHaveAttribute('alt', 'ISTQB® CTFL Badge');
    expect(badgeImages[4]).toHaveAttribute('alt', 'PSD I Badge');
    expect(badgeImages[5]).toHaveAttribute(
      'alt',
      'Problem Solving (Int.) Badge'
    );
    expect(badgeImages[6]).toHaveAttribute(
      'alt',
      'Java (Basic) Certificate Badge'
    );
    expect(badgeImages[7]).toHaveAttribute(
      'alt',
      'Python (Basic) Certificate Badge'
    );
    expect(badgeImages[8]).toHaveAttribute(
      'alt',
      'C# (Basic) Certificate Badge'
    );
  });
});
