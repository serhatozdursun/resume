import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Practice from '../pages/Practice';
import { act } from 'react';


describe('Practice Component', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('renders the practice page header', () => {
        render(<Practice />);
        expect(screen.getByText('Test Automation Practice Page')).toBeInTheDocument();
    });

    it('shows an alert when the Alert button is clicked', () => {
        window.alert = jest.fn(); // Mock window.alert
        window.confirm = jest.fn(() => true); // Mock window.confirm and return true

        render(<Practice />);

        const input = screen.getByLabelText('Alert Input:');
        const button = screen.getByText('Show Alert');

        fireEvent.change(input, { target: { value: 'You accepted!' } });
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('You accepted!'));
    });

    it('updates checkbox state when clicked', () => {
        render(<Practice />);

        const checkbox1 = screen.getByLabelText('Checkbox 1');
        const checkbox2 = screen.getByLabelText('Checkbox 2');

        expect(checkbox1).not.toBeChecked();
        expect(checkbox2).not.toBeChecked();

        fireEvent.click(checkbox1);
        expect(checkbox1).toBeChecked();

        fireEvent.click(checkbox2);
        expect(checkbox2).toBeChecked();

        fireEvent.click(checkbox1);
        expect(checkbox1).not.toBeChecked();
    });

    it('shows a snackbar with the correct message and type', async () => {
        render(<Practice />);

        const snackBarMessageInput = screen.getByTestId("message")
        fireEvent.change(snackBarMessageInput, { target: { value: 'Operation successful!' } });
        const successButton = screen.getByText('Show Success Snackbar');
        fireEvent.click(successButton);

        await waitFor(() => {
            expect(screen.getByText('Operation successful!')).toBeInTheDocument();
        });

        const snackbar = screen.getByRole('alert');
        expect(snackbar).toHaveClass('MuiAlert-filledSuccess');
    });

    it('handles file upload correctly', async () => {
        window.alert = jest.fn();

        // Create a mock file
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });

        // Render the component
        render(<Practice />);

        // Select elements
        const fileInput = screen.getByTestId('fileUpload_input');
        const uploadButton = screen.getByTestId('fileUpload_button');

        // Simulate file selection
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Use act to wrap the file upload and the timer-based state updates
        await act(async () => {
            fireEvent.click(uploadButton);

            // Run all timers to fast-forward through setTimeouts
            jest.runAllTimers();
        });

        // Wait for the upload message to appear after the simulated delay
        await waitFor(() => {
            expect(screen.getByTestId('file_uploaded')).toBeInTheDocument();
            expect(screen.getByTestId('file_uploaded')).toHaveTextContent('File "test.txt" uploaded successfully!');
        });
    }, 5000);  // Extend the timeout for the

    afterEach(() => {
        jest.useRealTimers();  // Restores real timers after each test
    });

});
