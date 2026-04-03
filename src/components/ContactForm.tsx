import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react';
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
  SendIconWrapper,
  SendLinkContainer,
  InputContainer,
  ContactFormDescription,
  SendText,
  FormLabel,
} from './ContactForm.styles';
import Image from 'next/image';
import { theme } from './theme'; // Import your theme
import { ThemeProvider } from 'styled-components';

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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, maxLength } = e.target;
    const currentLength = value.length;
    const maxAllowedLength = Number(maxLength);

    if (currentLength > maxAllowedLength) {
      setInputErrors(prev => ({ ...prev, [name]: true }));
    } else {
      setInputErrors(prev => ({ ...prev, [name]: false }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: value.slice(0, maxAllowedLength),
    }));
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

    try {
      setSending(true);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        console.error('API error response:', body);
        throw new Error(body?.error ?? 'Failed to send message');
      }

      setSnackbarMessage('Message sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setFormVisible(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      if (
        formRef.current &&
        typeof formRef.current.scrollIntoView === 'function'
      ) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSnackbarMessage('Failed to send message. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setSending(false);
    }
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
          <SendLinkContainer
            id='sendLinkContainer'
            onClick={handleSendLinkClick}
          >
            <SendIconWrapper id='sendIcon'>
              <Image
                src='/email.png'
                alt='Send Icon'
                width={25}
                height={25}
                style={{ objectFit: 'contain' }}
              />
            </SendIconWrapper>
            <SendText id='sendMessageText'>Send a message</SendText>
          </SendLinkContainer>
        )}

        {formVisible && (
          <ContactFormStyle ref={formRef} onSubmit={handleSubmit}>
            <CloseButton onClick={handleFormClose}>
              Close Contact Form
            </CloseButton>
            <ContactFormDescription id='contactFormDescription'>
              <>{HtmlParser(contactFormDescriptionHtml)}</>
            </ContactFormDescription>
            <InputContainer id='contactFormInputContainer'>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <NameInput
                id='name'
                ref={nameInputRef}
                type='text'
                name='name'
                maxLength={100}
                placeholder='Your Name'
                data-testid='testyourname'
                value={formData.name}
                onChange={handleChange}
                required
                $hasError={inputErrors.name || formData.name.length >= 100}
                aria-invalid={inputErrors.name || formData.name.length >= 100}
                aria-describedby={inputErrors.name ? 'name-error' : undefined}
              />
              {inputErrors.name && (
                <ErrorText id='name-error' role='alert'>
                  Name cannot exceed 100 characters.
                </ErrorText>
              )}
            </InputContainer>
            <InputContainer>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <EmailInput
                id='email'
                type='email'
                name='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={50}
                $hasError={inputErrors.email || formData.email.length >= 50}
                aria-invalid={inputErrors.email || formData.email.length >= 50}
                aria-describedby={inputErrors.email ? 'email-error' : undefined}
              />
              {inputErrors.email && (
                <ErrorText id='email-error' role='alert'>
                  Email cannot exceed 50 characters.
                </ErrorText>
              )}
            </InputContainer>
            <InputContainer>
              <FormLabel htmlFor='message'>Message</FormLabel>
              <Textarea
                id='message'
                name='message'
                placeholder='Your Message'
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={1500}
                $hasError={formData.message.length >= 1500}
                aria-invalid={formData.message.length >= 1500}
                aria-describedby={
                  inputErrors.message ? 'message-error' : undefined
                }
              />
              {inputErrors.message && (
                <ErrorText id='message-error' role='alert'>
                  Message cannot exceed 1500 characters.
                </ErrorText>
              )}
            </InputContainer>
            <SendButton
              data-testid='send'
              id='sendMessageButton'
              type='submit'
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send'}
            </SendButton>
          </ContactFormStyle>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            id='messageAlert'
            elevation={6}
            variant='filled'
            data-testid='messageAlert'
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};

export default ContactForm;
