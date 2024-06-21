import React, {useState} from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';

const Container = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: #f3fafd;
`;

const Header = styled.header`
    position: sticky;
    top: 0;
    background-color: #f3fafd;
    padding: 20px;
    z-index: 1000;
    width: 100%;
`;

const PageHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
`;

const Column = styled.div`
    flex: 1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
    display: block;
`;

const Description = styled.p`
    text-align: left;
    color: grey;
`;

const CheckboxLabel = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
`;

const CheckboxInput = styled.input`
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Input = styled.input`
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 20px 15px 20px; /* Added margin for spacing between buttons */
`;

const Button = styled.button`
    padding: 10px 20px 15px 20px;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;

    &:hover {
        background-color: #005bb5;
    }

    margin: 10px 20px 15px 20px; /* Added margin for spacing between buttons */
`;

const Example = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const Iframe = styled.iframe`
    width: 500px;
`

const Practice: React.FC = () => {
    const [newWindow, setNewWindow] = useState<Window | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
        checkbox1: false,
        checkbox2: false,
    });
    const [alertInput, setAlertInput] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState('');
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
        const {id, checked} = event.target;
        setCheckboxes((prev) => ({...prev, [id]: checked}));
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
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            // Simulating file upload delay
            setTimeout(() => {
                setUploadMessage(`File "${selectedFile.name}" uploaded successfully!`);
                setSelectedFile(null); // Clear selected file
                setTimeout(() => {
                    setUploadMessage(''); // Clear success message after 3 seconds
                }, 3000);
            }, 1000);
        } else {
            alert('Please select a file to upload.');
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

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
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
        <div>
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
                                    onChange={(e) => setAlertInput(e.target.value)}
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
                                    <CheckboxInput type="radio" id="option1" name="radioGroup" value="1"/>
                                </div>
                                <div>
                                    <CheckboxLabel htmlFor="option2">Option 2</CheckboxLabel>
                                    <CheckboxInput type="radio" id="option2" name="radioGroup" value="2"/>
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
                            <Label >Login Example</Label>
                            <Description>
                                You can use 'Qwerty1234!' as valid password
                            </Description>
                            <Label htmlFor="loginEmail">Email:</Label>
                            <Input
                                type="email"
                                id="loginEmail"
                                name="loginEmail"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
                            />
                            <Button type="button" onClick={handleFileUpload}>
                                Upload File
                            </Button>
                            {uploadMessage && (
                                <div style={{marginTop: 10, color: 'green'}}>{uploadMessage}</div>
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
                                value={snackbarMessage}
                                onChange={(e) => setSnackbarMessage(e.target.value)}
                            />
                        </FormGroup>
                        <Button
                            type="button"
                            onClick={() => handleSnackbar('success', snackbarMessage)}
                        >
                            Show Success Snackbar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleSnackbar('error', snackbarMessage)}
                        >
                            Show Error Snackbar
                        </Button>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                        >
                            <MuiAlert
                                elevation={6}
                                variant="filled"
                                onClose={handleSnackbarClose}
                                severity={snackbarType}
                            >
                                {snackbarMessage}
                            </MuiAlert>
                        </Snackbar>
                    </Example>
                </Column>
            </Container>
        </div>
    );
};

export default Practice;
