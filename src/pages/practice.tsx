import React, { useState, useRef } from 'react';
import Head from 'next/head';
import {
  Button,
  CheckboxInput,
  CheckboxLabel,
  Column,
  Container,
  Description,
  Example,
  Form,
  FormGroup,
  Header,
  Iframe,
  Input,
  Label,
  PageHeader,
} from '../components/PracticePageStyl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { theme } from '../components/theme';
import { ThemeProvider } from 'styled-components';

const Practice: React.FC = () => {
  const [, setNewWindow] = useState<Window | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    checkbox1: false,
    checkbox2: false,
  });
  const [alertInput, setAlertInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a reference for the file input
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const openNewTab = () => {
    const newTab = window.open('https://serhatozdursun.com', '_blank');
    setNewWindow(newTab);
  };

  const openNewWindow = () => {
    const newWin = window.open('https://serhatozdursun.com', '_blank', 'width=800,height=600');
    setNewWindow(newWin);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckboxes(prev => ({ ...prev, [id]: checked }));
  };

  const handleAlert = () => {
    const message = `You typed: ${alertInput}`;
    if (window.confirm(message)) {
      alert('You accepted!');
    } else {
      alert('You declined!');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Simulate the file upload process with a delay
    uploadFile()
      .then(() => {
        setUploadMessage(`File "${selectedFile.name}" uploaded successfully!`);
        clearUploadMessageAfterDelay();
        resetFileInput(); // Reset file input after upload
      })
      .catch(error => {
        alert('File upload failed.');
        console.error(error);
      });

    setSelectedFile(null); // Clear the selected file state
  };

  // Function to simulate file upload with delay
  const uploadFile = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const uploadSuccessful = true; // Simulating success

        if (uploadSuccessful) {
          resolve();
        } else {
          reject(new Error('Upload failed.'));
        }
      }, 1000); // Simulating file upload delay
    });
  };

  // Function to clear the upload message after 3 seconds
  const clearUploadMessageAfterDelay = () => {
    setTimeout(() => {
      setUploadMessage('');
    }, 3000);
  };

  // Function to reset the file input after successful upload
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input's value
    }
  };

  const handleLogin = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Mock login logic (This is just a simulation, don't use this in production)
    if (password === 'Qwerty1234!') {
      alert('Successful login!');
    } else {
      alert('Invalid password, login failed.');
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent<HTMLElement> | Event, // Matches the expected type
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbar = (type: 'success' | 'error', message: string) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."
          />
          <title>Mehmet Serhat Özdursun - QA Automation Engineer</title>
          <link rel="icon" href="/favicon_.ico" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://serhatozdursun.com/" />
          <meta property="og:title" content="Mehmet Serhat Özdursun - QA Automation Engineer" />
          <meta
            property="og:description"
            content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."
          />
          <meta property="og:image" content="https://serhatozdursun.com/profile.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://serhatozdursun.com/" />
          <meta property="twitter:title" content="Mehmet Serhat Özdursun - QA Automation Engineer" />
          <meta
            property="twitter:description"
            content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."
          />
          <meta property="twitter:image" content="https://serhatozdursun.com/profile.png" />

          <meta name="author" content="Mehmet Serhat Özdursun" />
          <meta name="language" content="English" />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="canonical" href="https://serhatozdursun.com/" />
          <meta name="keywords" content="QA Automation Engineer, Software Testing, Mehmet Serhat Özdursun, Resume" />
        </Head>
        <Header>
          <PageHeader>Test Automation Practice Page</PageHeader>
        </Header>
        <Container>
          <Column>
            <Form>
              <Example>
                <FormGroup>
                  <Label htmlFor="alertInput">Alert Input:</Label>
                  <Input
                    type="text"
                    id="alertInput"
                    name="alertInput"
                    value={alertInput}
                    onChange={e => setAlertInput(e.target.value)}
                  />
                </FormGroup>
                <Button type="button" onClick={handleAlert}>
                  Show Alert
                </Button>
              </Example>
              <Example>
                <FormGroup>
                  <Label>Radio Buttons:</Label>
                  <div>
                    <CheckboxLabel htmlFor="option1">Option 1</CheckboxLabel>
                    <CheckboxInput type="radio" id="option1" name="radioGroup" value="1" />
                  </div>
                  <div>
                    <CheckboxLabel htmlFor="option2">Option 2</CheckboxLabel>
                    <CheckboxInput type="radio" id="option2" name="radioGroup" value="2" />
                  </div>
                </FormGroup>
              </Example>
              <Example>
                <FormGroup>
                  <Label>Checkbox:</Label>
                  <div>
                    <CheckboxLabel htmlFor="checkbox1">Checkbox 1</CheckboxLabel>
                    <CheckboxInput
                      type="checkbox"
                      id="checkbox1"
                      name="checkboxGroup"
                      checked={checkboxes.checkbox1}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div>
                    <CheckboxLabel htmlFor="checkbox2">Checkbox 2</CheckboxLabel>
                    <CheckboxInput
                      type="checkbox"
                      id="checkbox2"
                      name="checkboxGroup"
                      checked={checkboxes.checkbox2}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </FormGroup>
              </Example>
              <Example>
                <FormGroup>
                  <Label htmlFor="select">Select:</Label>
                  <select id="select" name="select">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </FormGroup>
              </Example>
              <Example>
                <FormGroup>
                  <Label htmlFor="listBox">List Box:</Label>
                  <select id="listBox" name="listBox" size={4} multiple>
                    <option value="item1">Item 1</option>
                    <option value="item2">Item 2</option>
                    <option value="item3">Item 3</option>
                    <option value="item4">Item 4</option>
                  </select>
                </FormGroup>
              </Example>
              <Example>
                <FormGroup>
                  <Label htmlFor="iframe">Iframe:</Label>
                  <Iframe id="iframe" src="https://serhatozdursun.com" title="Example Iframe"></Iframe>
                </FormGroup>
              </Example>
            </Form>
          </Column>
          <Column>
            <Example>
              <Label>New Window:</Label>
              <Button type="button" onClick={openNewTab}>
                Open New Browser Tab
              </Button>
              <Button type="button" onClick={openNewWindow}>
                Open New Browser Window
              </Button>
            </Example>
            <Example>
              <FormGroup>
                <Label>Login Example</Label>
                <Description>You can use `&apos;Qwerty1234!&apos; as valid password</Description>
                <Label htmlFor="loginEmail">Email:</Label>
                <Input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="loginPassword">Password:</Label>
                <Input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Button type="button" onClick={handleLogin}>
                  Login
                </Button>
              </FormGroup>
            </Example>
            <Example>
              <FormGroup>
                <Label htmlFor="fileUpload">File Upload:</Label>
                <Input
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  onChange={handleFileChange}
                  data-testid="fileUpload_input"
                  ref={fileInputRef} // Set the ref on the input element
                />
                <Button data-testid="fileUpload_button" type="button" onClick={handleFileUpload}>
                  Upload File
                </Button>
                {uploadMessage && (
                  <div data-testid="file_uploaded" style={{ marginTop: 10, color: 'green' }}>
                    {uploadMessage}
                  </div>
                )}
              </FormGroup>
            </Example>
            <Example>
              <FormGroup>
                <Label htmlFor="message">Snackbar Message:</Label>
                <Input
                  type="text"
                  id="message"
                  name="message"
                  data-testid="message"
                  value={snackbarMessage}
                  onChange={e => setSnackbarMessage(e.target.value)}
                />
              </FormGroup>
              <Button type="button" onClick={() => handleSnackbar('success', snackbarMessage)}>
                Show Success Snackbar
              </Button>
              <Button type="button" onClick={() => handleSnackbar('error', snackbarMessage)}>
                Show Error Snackbar
              </Button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose} // Updated function
              >
                <Alert
                  elevation={6}
                  variant="filled"
                  onClose={handleSnackbarClose} // Same function reused
                  severity={snackbarType}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Example>
          </Column>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Practice;
