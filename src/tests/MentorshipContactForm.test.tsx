import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import MentorshipContactForm from '../components/MentorshipContactForm';
import { theme } from '../components/theme';

global.fetch = jest.fn();

const renderForm = () =>
  render(
    <ThemeProvider theme={theme}>
      <MentorshipContactForm />
    </ThemeProvider>
  );

describe('MentorshipContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders panel title, subtitle, and helper guidance block', () => {
    renderForm();

    expect(
      screen.getByRole('heading', { name: 'Send a Message' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I'll get back to you within a few days\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/To help me guide you faster, include:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your QA experience \(none \/ some \/ years\)/)
    ).toBeInTheDocument();
  });

  it('shows validation snackbar when submitting with empty fields', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Please fill in all required fields.')
    ).toBeInTheDocument();
  });

  it('submits successfully and scrolls form into view when supported', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    const scrollIntoView = jest.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    renderForm();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Pat' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'pat@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Mentorship question' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('shows name field error when value exceeds max length', () => {
    renderForm();
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'n'.repeat(101), name: 'name', maxLength: 100 },
    });
    expect(
      screen.getByText('Name cannot exceed 100 characters.')
    ).toBeInTheDocument();
  });

  it('shows email field error when value exceeds max length', () => {
    renderForm();
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'e'.repeat(51), name: 'email', maxLength: 50 },
    });
    expect(
      screen.getByText('Email cannot exceed 50 characters.')
    ).toBeInTheDocument();
  });

  it('shows message field error when value exceeds max length', () => {
    renderForm();
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'm'.repeat(1501), name: 'message', maxLength: 1500 },
    });
    expect(
      screen.getByText('Message cannot exceed 1500 characters.')
    ).toBeInTheDocument();
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
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'pat@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Failed to send message. Please try again.')
    ).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('closes snackbar when alert close is triggered', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    renderForm();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Pat' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'pat@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await screen.findByText('Message sent successfully!');

    const closeButtons = screen.getAllByRole('button', { name: /close/i });
    fireEvent.click(closeButtons[0]);

    await waitFor(() => {
      expect(
        screen.queryByText('Message sent successfully!')
      ).not.toBeInTheDocument();
    });
  });
});
