import React, {useState, ChangeEvent, FormEvent, useRef, useEffect, useCallback} from 'react';
import emailjs from 'emailjs-com';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import HtmlParser from 'html-react-parser';
import {
    EmailInput,
    NameInput,
    ContactFormStyle,
    Textarea,
    SendButton,
    CloseButton,
    ErrorText,
    SendIcon,
    SendLinkContainer,
    InputContainer,
    ContactFormDescription,
    SendText,
} from './StyledComponents';
import {theme} from './theme'; // Import your theme
import {ThemeProvider} from 'styled-components';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [sending, setSending] = useState(false);
    const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>({
        name: false,
        email: false,
        message: false,
    });

    const formRef = useRef<HTMLFormElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (formVisible && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [formVisible]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, maxLength} = e.target;
        const currentLength = value.length;
        const maxAllowedLength = Number(maxLength);

        if (currentLength > maxAllowedLength) {
            setInputErrors({...inputErrors, [name]: true});
        } else {
            setInputErrors({...inputErrors, [name]: false});
        }

        setFormData({
            ...formData,
            [name]: value.slice(0, maxAllowedLength),
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSendLinkClick = useCallback(() => {
        setFormVisible(true);
    }, []);

    const handleFormClose = () => {
        setFormVisible(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Submitting form with data:', formData); // Debug form data

        try {
            setSending(true);

            await emailjs.send(
                'service_4b17pak',
                'template_1j6765f',
                {...formData, reply_to: formData.email, from_name: formData.name},
                'Ao0bC-yVyrn132JbF'
            );

            setOpenSnackbar(true);
            setFormVisible(false);

            if (formRef.current && typeof formRef.current.scrollIntoView === 'function') {
                formRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }

        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    const contactFormDescriptionHtml = `
        <div>
            <strong>Feel free to reach out</strong> if you're interested in collaborating with a seasoned QA engineer. With over a decade of experience in software testing across diverse industries, I bring a proven track record of driving excellence in software quality assurance.
            <br />
            I'm dedicated to delivering <strong>comprehensive testing solutions</strong> that align with project requirements. Let's work together to ensure the success of your software development initiatives!
        </div>
    `;

    return (
        <>
            <ThemeProvider theme={theme}>
                {!formVisible && (
                    <SendLinkContainer id="sendLinkContainer" onClick={handleSendLinkClick}>
                        <SendIcon id="sendIcon" src="email.png" alt="Send Icon"/>
                        <SendText id="sendMessageText">Send a message</SendText>
                    </SendLinkContainer>
                )}

                {formVisible && (
                    <ContactFormStyle ref={formRef} onSubmit={handleSubmit}>
                        <CloseButton onClick={handleFormClose}>Close Contact Form</CloseButton>
                        <ContactFormDescription id="contactFormDescription">
                            <>{HtmlParser(contactFormDescriptionHtml)}</>
                        </ContactFormDescription>
                        <InputContainer id="contactFormInputContainer">
                            <NameInput
                                id="name"
                                ref={nameInputRef}
                                type="text"
                                name="name"
                                maxLength={100}
                                placeholder="Your Name"
                                data-testid="testyourname"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                hasError={inputErrors.name || formData.name.length >= 100}
                            />
                            {inputErrors.name && <ErrorText>Name cannot exceed 100 characters.</ErrorText>}
                        </InputContainer>
                        <InputContainer>
                            <EmailInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                maxLength={50}
                                hasError={inputErrors.email || formData.email.length >= 50}
                            />
                            {inputErrors.email && <ErrorText>Email cannot exceed 50 characters.</ErrorText>}
                        </InputContainer>
                        <InputContainer>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                maxLength={1500}
                                hasError={formData.message.length >= 1500}
                            />
                            {inputErrors.message && <ErrorText>Message cannot exceed 1500 characters.</ErrorText>}
                        </InputContainer>
                        <SendButton data-testid="send" id="sendMessageButton" type="submit" disabled={sending}>
                            {sending ? 'Sending...' : 'Send'}
                        </SendButton>
                    </ContactFormStyle>
                )}

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert id="messageAlert"
                           elevation={6}
                           variant="filled"
                           data-testid="messageAlert"
                           onClose={handleCloseSnackbar}
                           severity="success">
                        Message sent successfully!
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </>
    );
};

export default ContactForm;
