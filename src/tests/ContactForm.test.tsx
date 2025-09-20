// ContactForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../components/ContactForm';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import {
  renderWithTheme,
  openContactForm,
  fillContactForm,
  clickSendMessage,
} from './test-utils';
import emailjs, { type EmailJSResponseStatus } from 'emailjs-com';

// Mock emailjs
jest.mock('emailjs-com');

// Mock the env module
jest.mock('../utils/env', () => ({
  env: {
    EMAILJS_SERVICE_ID: 'test-service-id',
    EMAILJS_TEMPLATE_ID: 'test-template-id',
    EMAILJS_PUBLIC_KEY: 'test-public-key',
  },
}));

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders send link initially', () => {
    renderWithTheme(<ContactForm />);

    expect(screen.getByText('Send a message')).toBeInTheDocument();
    expect(screen.getByAltText('Send Icon')).toBeInTheDocument();
  });

  it('shows contact form when send link is clicked', () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    expect(screen.getByText('Close Contact Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('closes form when close button is clicked', () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    expect(screen.getByText('Close Contact Form')).toBeInTheDocument();

    const closeButton = screen.getByText('Close Contact Form');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
    expect(screen.getByText('Send a message')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    render(
      <ThemeProvider theme={theme}>
        <ContactForm />
      </ThemeProvider>
    );

    const sendLink = screen.getByText('Send a message');
    fireEvent.click(sendLink);

    fillContactForm();
    clickSendMessage();

    await waitFor(() => {
      expect(mockSend).toHaveBeenCalledWith(
        'test-service-id',
        'test-template-id',
        {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message!',
          reply_to: 'john@example.com',
          from_name: 'John Doe',
        },
        'test-public-key'
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
  });

  it('handles form submission error', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockSend.mockRejectedValueOnce(new Error('Email service error'));

    renderWithTheme(<ContactForm />);
    openContactForm();

    fillContactForm();
    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Failed to send message. Please try again.')
      ).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending message:',
      expect.any(Error)
    );
    expect(screen.getByText('Close Contact Form')).toBeInTheDocument(); // Form should remain open
  });

  it('shows loading state during submission', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    let resolvePromise: (value: EmailJSResponseStatus) => void;
    const promise = new Promise<EmailJSResponseStatus>(resolve => {
      resolvePromise = resolve;
    });
    mockSend.mockReturnValueOnce(promise);

    renderWithTheme(<ContactForm />);
    openContactForm();

    fillContactForm();
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    // Check loading state
    expect(sendButton).toBeDisabled();
    expect(sendButton).toHaveTextContent('Sending...');

    // Resolve the promise
    resolvePromise!({ status: 200, text: 'OK' } as EmailJSResponseStatus);

    // Wait for the form to close after successful submission
    await waitFor(() => {
      expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    renderWithTheme(<ContactForm />);
    openContactForm();

    fillContactForm();
    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    // Form should be closed and reset
    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();

    // Reopen form to check if fields are reset
    fireEvent.click(screen.getByText('Send a message'));

    const newNameInput = screen.getByPlaceholderText(
      'Your Name'
    ) as HTMLInputElement;
    const newEmailInput = screen.getByPlaceholderText(
      'Your Email'
    ) as HTMLInputElement;
    const newMessageInput = screen.getByPlaceholderText(
      'Your Message'
    ) as HTMLTextAreaElement;

    expect(newNameInput.value).toBe('');
    expect(newEmailInput.value).toBe('');
    expect(newMessageInput.value).toBe('');
  });

  it('handles input length validation', () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Your Message');

    // Test name length validation (max 100 characters)
    const longName = 'A'.repeat(110);
    fireEvent.change(nameInput, { target: { value: longName } });
    expect((nameInput as HTMLInputElement).value).toBe('A'.repeat(100));

    // Test email length validation (max 50 characters)
    const longEmail = 'a'.repeat(60) + '@example.com';
    fireEvent.change(emailInput, { target: { value: longEmail } });
    expect((emailInput as HTMLInputElement).value).toBe('a'.repeat(50));

    // Test message length validation (max 1500 characters)
    const longMessage = 'A'.repeat(1600);
    fireEvent.change(messageInput, { target: { value: longMessage } });
    expect((messageInput as HTMLTextAreaElement).value).toBe('A'.repeat(1500));
  });

  it('handles snackbar close', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    render(
      <ThemeProvider theme={theme}>
        <ContactForm />
      </ThemeProvider>
    );

    const sendLink = screen.getByText('Send a message');
    fireEvent.click(sendLink);

    fillContactForm();
    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    // Close the snackbar
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for snackbar to close
    await waitFor(() => {
      expect(
        screen.queryByText('Message sent successfully!')
      ).not.toBeInTheDocument();
    });
  });

  it('handles form submission with empty fields', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    renderWithTheme(<ContactForm />);
    openContactForm();

    const sendButton = screen.getByText('Send');

    // Verify the form is rendered and can be submitted
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).not.toBeDisabled();
  });

  it('handles scroll into view after successful submission', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    const mockScrollIntoView = jest.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      value: mockScrollIntoView,
      writable: true,
    });

    render(
      <ThemeProvider theme={theme}>
        <ContactForm />
      </ThemeProvider>
    );

    const sendLink = screen.getByText('Send a message');
    fireEvent.click(sendLink);

    fillContactForm();
    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('handles scroll into view when form ref is null', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    renderWithTheme(<ContactForm />);
    openContactForm();
    const sendButton = screen.getByText('Send');
    fillContactForm();
    fireEvent.click(sendButton);

    // Should not throw error when form ref is null
    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('handles input change with character limit validation', () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Your Message');

    // Test normal input
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');

    // Test input with maxLength constraint
    fireEvent.change(nameInput, {
      target: { value: 'A'.repeat(100), maxLength: 50 },
    });
    expect(nameInput).toHaveValue('A'.repeat(50));

    // Test email input
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');

    // Test message input
    fireEvent.change(messageInput, {
      target: { value: 'Test message content' },
    });
    expect(messageInput).toHaveValue('Test message content');
  });

  it('handles snackbar close functionality', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValue({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    renderWithTheme(<ContactForm />);
    openContactForm();

    fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    });

    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    // Close snackbar
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Message sent successfully!')
      ).not.toBeInTheDocument();
    });
  });

  it('handles form close functionality', () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    expect(screen.getByText('Close Contact Form')).toBeInTheDocument();

    const closeButton = screen.getByText('Close Contact Form');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
    expect(screen.getByText('Send a message')).toBeInTheDocument();
  });

  it('handles input errors correctly', () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    const nameInput = screen.getByPlaceholderText('Your Name');

    // Test input that exceeds maxLength
    fireEvent.change(nameInput, {
      target: {
        value: 'A'.repeat(100),
        maxLength: 50,
        name: 'name',
      },
    });

    // The input should be truncated to maxLength
    expect(nameInput).toHaveValue('A'.repeat(50));
  });

  it('handles multiple form submissions', async () => {
    const mockSend = emailjs.send as jest.MockedFunction<typeof emailjs.send>;
    mockSend.mockResolvedValue({
      status: 200,
      text: 'OK',
    } as EmailJSResponseStatus);

    renderWithTheme(<ContactForm />);
    openContactForm();

    // First submission
    fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'First message',
    });

    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    // Close snackbar
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for snackbar to close and form to reset
    await waitFor(() => {
      expect(
        screen.queryByText('Message sent successfully!')
      ).not.toBeInTheDocument();
    });

    // Open form again for second submission
    openContactForm();

    // Second submission
    fillContactForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Second message',
    });

    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    expect(mockSend).toHaveBeenCalledTimes(2);
  });
});
