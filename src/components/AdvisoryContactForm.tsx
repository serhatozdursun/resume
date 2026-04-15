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

const ADVISORY_MESSAGE_PREFIX = '[QA Advisory inquiry]\n\n' as const;

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

const AdvisoryContactForm: React.FC = () => {
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
      const messageBody = `${ADVISORY_MESSAGE_PREFIX}${formData.message.trim()}`;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: messageBody,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
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
    <FormPanel id='advisory-contact'>
      <FormPanelTitle>Advisory inquiry</FormPanelTitle>
      <FormPanelSubtitle>
        Share context on your team and goals — I typically reply within a few
        business days.
      </FormPanelSubtitle>

      <FormHelperBlock>
        <strong>To help me understand your needs, please include:</strong>
        <ul>
          <li>Company or product type</li>
          <li>Team size</li>
          <li>Current QA / testing challenges</li>
          <li>Current tooling stack</li>
          <li>What kind of support you need</li>
        </ul>
      </FormHelperBlock>

      <MentorshipFormEl ref={formRef} onSubmit={handleSubmit} noValidate>
        <InputContainer>
          <FormLabel htmlFor='a-name'>Name</FormLabel>
          <NameInput
            id='a-name'
            type='text'
            name='name'
            placeholder='Your name'
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            $hasError={inputErrors.name || formData.name.length >= 100}
            aria-invalid={inputErrors.name || formData.name.length >= 100}
            aria-describedby={inputErrors.name ? 'a-name-error' : undefined}
          />
          {inputErrors.name && (
            <ErrorText id='a-name-error' role='alert'>
              Name cannot exceed 100 characters.
            </ErrorText>
          )}
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor='a-email'>Work email</FormLabel>
          <EmailInput
            id='a-email'
            type='email'
            name='email'
            placeholder='you@company.com'
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={50}
            $hasError={inputErrors.email || formData.email.length >= 50}
            aria-invalid={inputErrors.email || formData.email.length >= 50}
            aria-describedby={inputErrors.email ? 'a-email-error' : undefined}
          />
          {inputErrors.email && (
            <ErrorText id='a-email-error' role='alert'>
              Email cannot exceed 50 characters.
            </ErrorText>
          )}
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor='a-message'>Message</FormLabel>
          <Textarea
            id='a-message'
            name='message'
            placeholder='e.g. B2B SaaS, ~15 engineers, flaky E2E suite, Playwright + GitHub Actions — looking for automation strategy and team workshop.'
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={1500}
            $hasError={formData.message.length >= 1500}
            aria-invalid={formData.message.length >= 1500}
            aria-describedby={
              inputErrors.message ? 'a-message-error' : undefined
            }
            style={{ minHeight: '180px' }}
          />
          {inputErrors.message && (
            <ErrorText id='a-message-error' role='alert'>
              Message cannot exceed 1500 characters.
            </ErrorText>
          )}
        </InputContainer>

        <SendButton
          type='submit'
          disabled={sending}
          style={{ marginTop: '8px' }}
        >
          {sending ? 'Sending…' : 'Send inquiry'}
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

export default AdvisoryContactForm;
