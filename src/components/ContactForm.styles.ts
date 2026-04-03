import styled from 'styled-components';
import { sidebarItemCardStyles } from './Layout.styles';

export const ContactFormStyle = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: ${props => (props.$hasError ? '1px solid red' : '1px solid #ccc')};
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.22);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const NameInput = styled(Input)`
  margin-bottom: 1rem;
  border: ${props => (props.$hasError ? '1px solid red' : '1px solid black')};
  border-color: ${props => (props.$hasError ? 'red' : 'black')};
`;

export const EmailInput = styled(Input)`
  margin-bottom: 1rem;
  border: ${props => `1px solid ${props.$hasError ? 'red' : 'black'}`};
`;

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  $hasError?: boolean;
}

export const Textarea = styled.textarea<TextareaProps>`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${props => (props.$hasError ? 'red' : '#ddd')};
  border-radius: 4px;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.22);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;
  width: 90%;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const SendButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background: ${props => props.theme.colors.accent};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
  width: 96%;
  font-family: ${props => props.theme.font.heading};
  box-shadow: ${props => props.theme.colors.cardShadow};
  &:hover {
    background: ${props => props.theme.colors.highlight};
    color: #fff;
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const SendLinkContainer = styled.button`
  ${sidebarItemCardStyles}
  width: calc(100% - 20px);
  margin-top: 20px;
  margin-right: 0;
  margin-bottom: 0;
  justify-content: flex-start;
  cursor: pointer;
  text-decoration: none;
  font: inherit;
`;

export const SendIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

export const SendText = styled.span`
  color: ${props => props.theme.colors.link};
  cursor: pointer;
  text-decoration: underline;
  display: block;
  text-align: left;
  margin-right: auto;
  margin-left: 10px;
  font-weight: 500;
  @media (min-width: 768px) {
    display: inline;
  }

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.highlight};
  }
`;

export const CloseButton = styled.button`
  color: #868483;
  cursor: pointer;
  text-decoration: underline;
  background: transparent;
  border: none;
  font-size: 14px;
  display: block;

  @media (min-width: 768px) {
    display: inline;
  }

  &:hover {
    text-decoration: none;
    color: red;
  }
`;

export const FormLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const ContactFormDescription = styled.div`
  font-size: 1em;
  line-height: 1;
  font-style: italic;
  text-align: justify;

  @media (max-width: 768px) {
    line-height: 1;
    font-size: 1em;
  }
`;
