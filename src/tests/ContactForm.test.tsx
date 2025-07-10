import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../components/ContactForm';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

jest.mock('emailjs-com', () => ({
  send: jest.fn().mockResolvedValue({ text: 'Email sent' }),
}));

describe('ContactForm', () => {
  test('displays error message when email exceeds max length', () => {
    render(<ContactForm />);
    const send_message = screen.getByText('Send a message');
    fireEvent.click(send_message);

    fireEvent.change(screen.getByPlaceholderText('Your Email'), {
      target: { value: 'test@test.com'.repeat(10) },
    });

    expect(
      screen.getByText('Email cannot exceed 50 characters.')
    ).toBeInTheDocument();
  });

  test('displays error message when message exceeds max length', () => {
    render(<ContactForm />);
    const send_message = screen.getByText('Send a message');
    fireEvent.click(send_message);

    // Simulate typing a long message
    fireEvent.change(screen.getByPlaceholderText('Your Message'), {
      target: {
        value:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'.repeat(
            50
          ),
      },
    });

    // Check if the error message is shown
    expect(
      screen.getByText('Message cannot exceed 1500 characters.')
    ).toBeInTheDocument();
  });

  test('displays the contact form when "Send a message" is clicked', () => {
    render(<ContactForm />);
    expect(screen.queryByPlaceholderText('Your Name')).not.toBeInTheDocument();

    const sendLink = screen.getByText('Send a message');
    fireEvent.click(sendLink);

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
  });

  test('shows success message on form submission', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByText('Send a message'));

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), {
      target: { value: 'Hello, this is a test message.' },
    });

    fireEvent.click(screen.getByText('Send'));

    const snackbar = await screen.findByText('Message sent successfully!');
    expect(snackbar).toBeInTheDocument();
  });

  test('trims input values to maxLength', () => {
    render(<ContactForm />);
    const send_message = screen.getByText('Send a message');
    fireEvent.click(send_message);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'a'.repeat(110) },
    });
    expect(screen.getByPlaceholderText('Your Name')).toHaveValue(
      'a'.repeat(100)
    );
  });

  test('Successful submission', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByText('Send a message'));

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), {
      target: { value: 'Test message' },
    });

    fireEvent.click(screen.getByText('Send'));

    await screen.findByText('Message sent successfully!');
  });

  test('handles errors during form submission', async () => {
    render(<ContactForm />);
    const send_message = screen.getByText('Send a message');
    fireEvent.click(send_message);

    const emailInput = screen.getByPlaceholderText('Your Email');

    userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    fireEvent.click(screen.getByText('Send'));
    fireEvent.blur(emailInput);

    expect(emailInput).toBeInvalid();
  });

  test('is accessible according to jest-axe', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore original console methods
  });
});
