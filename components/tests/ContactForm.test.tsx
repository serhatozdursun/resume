import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../ContactForm';
import emailjs from 'emailjs-com';

jest.mock('emailjs-com', () => ({
    send: jest.fn().mockResolvedValue({ text: 'Email sent' }),
}));

describe('ContactForm', () => {
    beforeEach(() => {
        render(<ContactForm />);
    });
/*
    test('renders form inputs and submit button', () => {
        expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    test('allows the user to submit the form', async () => {
        fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello there!' } });

        fireEvent.click(screen.getByText('Send'));

        expect(emailjs.send).toHaveBeenCalledTimes(1);
        expect(emailjs.send).toHaveBeenCalledWith(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                message: 'Hello there!',
            },
            'YOUR_USER_ID'
        );

        // Wait for the success message to appear
        await waitFor(() => screen.getByText('Message sent successfully!'));

        // Check that the form is cleared
        expect(screen.getByPlaceholderText('Your Name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your Email')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your Message')).toHaveValue('');
    });

    test('displays error message when name exceeds max length', () => {
        fireEvent.click(screen.getByText('Send Message'));

        fireEvent.change(screen.getByPlaceholderText('Your Name'), {
            target: { value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
        });

        expect(screen.getByText('Name cannot exceed 100 characters.')).toBeInTheDocument();
    });*/

    test('displays error message when email exceeds max length', () => {
        fireEvent.click(screen.getByText('Send Message'));

        fireEvent.change(screen.getByPlaceholderText('Your Email'), {
            target: { value: 'test@test.com'.repeat(10) } // Make email longer than 50 characters
        });

        expect(screen.getByText('Email cannot exceed 50 characters.')).toBeInTheDocument();
    });

    test('displays error message when message exceeds max length', () => {
        fireEvent.click(screen.getByText('Send Message'));

        fireEvent.change(screen.getByPlaceholderText('Your Message'), {
            target: { value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'.repeat(50) }
        });

        expect(screen.getByText('Message cannot exceed 1500 characters.')).toBeInTheDocument();
    });
});
