import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../components/ContactForm';

jest.mock('emailjs-com', () => ({
    send: jest.fn().mockResolvedValue({ text: 'Email sent' }),
}));

describe('ContactForm', () => {

    test('displays error message when email exceeds max length', () => {
        render(<ContactForm />);
        const send_message =  screen.getByText('Send a message');
        fireEvent.click(send_message);

        fireEvent.change(screen.getByPlaceholderText('Your Email'), {
            target: { value: 'test@test.com'.repeat(10) }
        });

        expect(screen.getByText('Email cannot exceed 50 characters.')).toBeInTheDocument();
    });

    test('displays error message when message exceeds max length', () => {
        render(<ContactForm />);
        const send_message =  screen.getByText('Send a message');
        fireEvent.click(send_message);

        // Simulate typing a long message
        fireEvent.change(screen.getByPlaceholderText('Your Message'), {
            target: { value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'.repeat(50) }
        });

        // Check if the error message is shown
        expect(screen.getByText('Message cannot exceed 1500 characters.')).toBeInTheDocument();
    });

});
