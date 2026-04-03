import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  NameInput,
  EmailInput,
  Textarea,
  SendButton,
  ErrorText,
  InputContainer,
  FormLabel,
} from './ContactForm.styles';
import {
  FormPanel,
  FormPanelTitle,
  FormPanelSubtitle,
  FormHelperBlock,
  MentorshipFormEl,
} from './Mentorship.styles';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface InputErrors {
  name: boolean;
  email: boolean;
  message: boolean;
}

const MentorshipContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    name: false,
    email: false,
    message: false,
  });
  const [sending, setSending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, maxLength } = e.target;
    const max = Number(maxLength);
    setInputErrors(prev => ({ ...prev, [name]: value.length > max }));
    setFormData(prev => ({ ...prev, [name]: value.slice(0, max) }));
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setSending(true);
    try {
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
        throw new Error(body?.error ?? 'Failed to send message');
      }

      setSnackbarMessage('Message sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setFormData({ name: '', email: '', message: '' });

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

  return (
    <FormPanel id='contact'>
      <FormPanelTitle>Send a Message</FormPanelTitle>
      <FormPanelSubtitle>
        I&apos;ll get back to you within a few days.
      </FormPanelSubtitle>

      <FormHelperBlock>
        <strong>To help me guide you faster, include:</strong>
        <ul>
          <li>Your QA experience (none / some / years)</li>
          <li>The area you want to focus on</li>
          <li>Your main goal</li>
        </ul>
      </FormHelperBlock>

      <MentorshipFormEl ref={formRef} onSubmit={handleSubmit} noValidate>
        <InputContainer>
          <FormLabel htmlFor='m-name'>Name</FormLabel>
          <NameInput
            id='m-name'
            type='text'
            name='name'
            placeholder='Your Name'
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            $hasError={inputErrors.name || formData.name.length >= 100}
            aria-invalid={inputErrors.name || formData.name.length >= 100}
            aria-describedby={inputErrors.name ? 'm-name-error' : undefined}
          />
          {inputErrors.name && (
            <ErrorText id='m-name-error' role='alert'>
              Name cannot exceed 100 characters.
            </ErrorText>
          )}
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor='m-email'>Email</FormLabel>
          <EmailInput
            id='m-email'
            type='email'
            name='email'
            placeholder='Your Email'
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={50}
            $hasError={inputErrors.email || formData.email.length >= 50}
            aria-invalid={inputErrors.email || formData.email.length >= 50}
            aria-describedby={inputErrors.email ? 'm-email-error' : undefined}
          />
          {inputErrors.email && (
            <ErrorText id='m-email-error' role='alert'>
              Email cannot exceed 50 characters.
            </ErrorText>
          )}
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor='m-message'>Message</FormLabel>
          <Textarea
            id='m-message'
            name='message'
            placeholder='e.g. 2 years of manual testing, want to move into Selenium automation, aiming for a junior automation role at an international company.'
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={1500}
            $hasError={formData.message.length >= 1500}
            aria-invalid={formData.message.length >= 1500}
            aria-describedby={
              inputErrors.message ? 'm-message-error' : undefined
            }
            style={{ minHeight: '164px' }}
          />
          {inputErrors.message && (
            <ErrorText id='m-message-error' role='alert'>
              Message cannot exceed 1500 characters.
            </ErrorText>
          )}
        </InputContainer>

        <SendButton
          type='submit'
          disabled={sending}
          style={{ marginTop: '8px' }}
        >
          {sending ? 'Sending…' : 'Send Message'}
        </SendButton>
      </MentorshipFormEl>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FormPanel>
  );
};

export default MentorshipContactForm;
