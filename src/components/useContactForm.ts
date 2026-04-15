import { ChangeEvent, FormEvent, RefObject, useRef, useState } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactInputErrors {
  name: boolean;
  email: boolean;
  message: boolean;
}

type SnackbarSeverity = 'success' | 'error';

interface SubmitOptions {
  buildPayload: (formData: ContactFormData) => ContactFormData;
}

interface UseContactFormResult {
  formData: ContactFormData;
  inputErrors: ContactInputErrors;
  sending: boolean;
  openSnackbar: boolean;
  snackbarMessage: string;
  snackbarSeverity: SnackbarSeverity;
  formRef: RefObject<HTMLFormElement>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCloseSnackbar: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, options: SubmitOptions) => void;
}

const EMPTY_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

const EMPTY_INPUT_ERRORS: ContactInputErrors = {
  name: false,
  email: false,
  message: false,
};

export const useContactForm = (): UseContactFormResult => {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM_DATA);
  const [inputErrors, setInputErrors] =
    useState<ContactInputErrors>(EMPTY_INPUT_ERRORS);
  const [sending, setSending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>('success');

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

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    { buildPayload }: SubmitOptions
  ) => {
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
      const payload = buildPayload(formData);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      setFormData(EMPTY_FORM_DATA);

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

  return {
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
  };
};
