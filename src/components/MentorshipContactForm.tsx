import React from 'react';
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
import { useContactForm } from './useContactForm';

const MentorshipContactForm: React.FC = () => {
  const {
    formData,
    inputErrors,
    sending,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    formRef,
    handleChange,
    handleCloseSnackbar,
    handleSubmit,
  } = useContactForm();

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

      <MentorshipFormEl
        ref={formRef}
        onSubmit={event =>
          handleSubmit(event, {
            buildPayload: currentData => ({
              name: currentData.name,
              email: currentData.email,
              message: currentData.message,
            }),
          })
        }
        noValidate
      >
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
