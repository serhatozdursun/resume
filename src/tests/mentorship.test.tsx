import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import MentorshipPage from '../pages/mentorship';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

global.fetch = jest.fn();

describe('MentorshipPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero, navigation, topics, FAQ, and contact form', () => {
    render(<MentorshipPage />);

    expect(
      screen.getByRole('heading', {
        name: 'QA Mentorship & Career Guidance',
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /← Home/i })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByText('Career Planning')).toBeInTheDocument();
    expect(
      screen.getByText(
        'How do I get my first job in QA with no prior experience?'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Send a Message' })
    ).toBeInTheDocument();
  });

  it('has no serious axe violations', async () => {
    const { container } = render(<MentorshipPage />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('shows validation snackbar when submitting empty form', async () => {
    render(<MentorshipPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(
        screen.getByText('Please fill in all required fields.')
      ).toBeInTheDocument();
    });
  });

  it('submits mentorship form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<MentorshipPage />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Looking for automation guidance.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });
  });

  it('shows error snackbar when API returns not ok', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });

    render(<MentorshipPage />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(
        screen.getByText('Failed to send message. Please try again.')
      ).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending message:',
      expect.objectContaining({ message: 'Server error' })
    );
    consoleErrorSpy.mockRestore();
  });

  it('shows generic error when fetch throws', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network'));

    render(<MentorshipPage />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(
        screen.getByText('Failed to send message. Please try again.')
      ).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
