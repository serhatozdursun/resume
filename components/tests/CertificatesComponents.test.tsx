// CertificatesComponents.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CertificatesComponents from '../CertificatesComponents';
import '@testing-library/jest-dom'


describe('CertificatesComponents', () => {
    it('renders certificate items correctly', () => {
        render(<CertificatesComponents />);

        const certificateTitles = screen.getAllByRole('heading', { name: /Certificates/i });
        expect(certificateTitles.length).toBe(1);

        const certificates = screen.getAllByRole('listitem');
        expect(certificates.length).toBe(6);
    });

    it('handles click events correctly', () => {
        render(<CertificatesComponents />);

        const certificateLinks = screen.getAllByRole('link');

        // Click the first certificate link
        fireEvent.click(certificateLinks[0]);

        // Check if the clicked badge color changes to black
        expect(certificateLinks[0]).toHaveStyle({ color: 'black' });

        // Clicking again should not change color
        fireEvent.click(certificateLinks[0]);
        expect(certificateLinks[0]).toHaveStyle({ color: 'black' });

        // Click the second certificate link
        fireEvent.click(certificateLinks[1]);
        expect(certificateLinks[1]).toHaveStyle({ color: 'black' });
    });
});
