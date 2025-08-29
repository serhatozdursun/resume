import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';

export const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

// Snackbar helpers (Practice page)
export const setSnackbarMessageAndClick = (
  type: 'success' | 'error',
  message: string
) => {
  const input = screen.getByTestId('message');
  fireEvent.change(input, { target: { value: message } });
  const buttonText =
    type === 'success' ? 'Show Success Snackbar' : 'Show Error Snackbar';
  fireEvent.click(screen.getByText(buttonText));
  return waitFor(() => expect(screen.getByText(message)).toBeInTheDocument());
};

// File upload helpers (Practice page)
export const selectFile = (file: File) => {
  const fileInput = screen.getByTestId('fileUpload_input');
  fireEvent.change(fileInput, { target: { files: [file] } });
  return fileInput as HTMLInputElement;
};

export const clickUpload = () => {
  const uploadButton = screen.getByTestId('fileUpload_button');
  fireEvent.click(uploadButton);
};

// Login helpers (Practice page)
export const performLogin = (email: string, password: string) => {
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByText('Login');
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(loginButton);
};

// Contact form helpers
export const openContactForm = () => {
  fireEvent.click(screen.getByText('Send a message'));
};

export const fillContactForm = ({
  name = 'John Doe',
  email = 'john@example.com',
  message = 'Hello, this is a test message!',
}: { name?: string; email?: string; message?: string } = {}) => {
  fireEvent.change(screen.getByPlaceholderText('Your Name'), {
    target: { value: name },
  });
  fireEvent.change(screen.getByPlaceholderText('Your Email'), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText('Your Message'), {
    target: { value: message },
  });
};

export const clickSendMessage = () => {
  fireEvent.click(screen.getByText('Send'));
};

export { screen, fireEvent, waitFor };
