import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import AdvisoryContactForm from '../components/AdvisoryContactForm';
import { theme } from '../components/theme';

global.fetch = jest.fn();

const renderForm = () =>
  render(
    <ThemeProvider theme={theme}>
      <AdvisoryContactForm />
    </ThemeProvider>
  );

describe('AdvisoryContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders panel title, subtitle, and helper guidance for companies', () => {
    renderForm();

    expect(
      screen.getByRole('heading', { name: 'Advisory inquiry' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Share context on your team and goals/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/To help me understand your needs, please include:/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Company or product type/i)).toBeInTheDocument();
    expect(document.getElementById('advisory-contact')).toBeInTheDocument();
  });

  it('shows validation snackbar when submitting with empty fields', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send inquiry' }));

    expect(
      await screen.findByText('Please fill in all required fields.')
    ).toBeInTheDocument();
  });

  it('prefixes advisory context in the message body sent to the API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    HTMLElement.prototype.scrollIntoView = jest.fn();

    renderForm();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Acme Inc' },
    });
    fireEvent.change(screen.getByLabelText('Work email'), {
      target: { value: 'lead@acme.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Need CI/CD test strategy.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send inquiry' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const [, init] = (global.fetch as jest.Mock).mock.calls[0] as [
      string,
      RequestInit,
    ];
    const body = JSON.parse(init.body as string) as {
      message: string;
    };
    expect(body.message).toBe(
      '[QA Advisory inquiry]\n\nNeed CI/CD test strategy.'
    );
  });

  it('shows failure snackbar when submission request fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network'));

    renderForm();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Pat' },
    });
    fireEvent.change(screen.getByLabelText('Work email'), {
      target: { value: 'pat@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send inquiry' }));

    expect(
      await screen.findByText('Failed to send message. Please try again.')
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
