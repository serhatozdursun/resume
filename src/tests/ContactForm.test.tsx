// ContactForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import ContactForm from '../components/ContactForm';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import {
  renderWithTheme,
  openContactForm,
  fillContactForm,
  clickSendMessage,
} from './test-utils';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetchSuccess = () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
};

const mockFetchError = () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
};

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
    mockFetchSuccess();

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
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message!',
        }),
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
  });

  it('handles form submission error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockFetchError();

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
    expect(screen.getByText('Close Contact Form')).toBeInTheDocument();
  });

  it('shows loading state during submission', async () => {
    let resolvePromise: (value: Response) => void;
    const promise = new Promise<Response>(resolve => {
      resolvePromise = resolve;
    });
    (global.fetch as jest.Mock).mockReturnValueOnce(promise);

    renderWithTheme(<ContactForm />);
    openContactForm();

    fillContactForm();
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    expect(sendButton).toBeDisabled();
    expect(sendButton).toHaveTextContent('Sending...');

    resolvePromise!({ ok: true } as Response);

    await waitFor(() => {
      expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    mockFetchSuccess();

    renderWithTheme(<ContactForm />);
    openContactForm();

    fillContactForm();
    clickSendMessage();

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();

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

    const longName = 'A'.repeat(110);
    fireEvent.change(nameInput, { target: { value: longName } });
    expect((nameInput as HTMLInputElement).value).toBe('A'.repeat(100));

    const longEmail = 'a'.repeat(60) + '@example.com';
    fireEvent.change(emailInput, { target: { value: longEmail } });
    expect((emailInput as HTMLInputElement).value).toBe('a'.repeat(50));

    const longMessage = 'A'.repeat(1600);
    fireEvent.change(messageInput, { target: { value: longMessage } });
    expect((messageInput as HTMLTextAreaElement).value).toBe('A'.repeat(1500));
  });

  it('calls scrollIntoView after successful submission when form ref exists', async () => {
    mockFetchSuccess();

    const mockScrollIntoView = jest.fn();
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

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

    await waitFor(() => {
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  it('handles scrollIntoView when form ref does not have scrollIntoView method', async () => {
    mockFetchSuccess();

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

    expect(screen.queryByText('Close Contact Form')).not.toBeInTheDocument();
  });

  it('handles snackbar close', async () => {
    mockFetchSuccess();

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

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Message sent successfully!')
      ).not.toBeInTheDocument();
    });
  });

  it('handles form submission with empty fields', async () => {
    renderWithTheme(<ContactForm />);
    openContactForm();

    const sendButton = screen.getByText('Send');

    expect(sendButton).toBeInTheDocument();
    expect(sendButton).not.toBeDisabled();
  });

  it('handles scroll into view after successful submission', async () => {
    mockFetchSuccess();

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
    mockFetchSuccess();

    renderWithTheme(<ContactForm />);
    openContactForm();
    const sendButton = screen.getByText('Send');
    fillContactForm();
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('passes axe checks in initial send-link state', async () => {
      const { container } = renderWithTheme(<ContactForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe checks with form open', async () => {
      const { container } = renderWithTheme(<ContactForm />);
      openContactForm();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
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

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');

    fireEvent.change(nameInput, {
      target: { value: 'A'.repeat(100), maxLength: 50 },
    });
    expect(nameInput).toHaveValue('A'.repeat(50));

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');

    fireEvent.change(messageInput, {
      target: { value: 'Test message content' },
    });
    expect(messageInput).toHaveValue('Test message content');
  });

  it('handles snackbar close functionality', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

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

    fireEvent.change(nameInput, {
      target: {
        value: 'A'.repeat(100),
        maxLength: 50,
        name: 'name',
      },
    });

    expect(nameInput).toHaveValue('A'.repeat(50));
  });

  it('handles multiple form submissions', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    renderWithTheme(<ContactForm />);
    openContactForm();

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

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Message sent successfully!')
      ).not.toBeInTheDocument();
    });

    openContactForm();

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

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
