import styled from 'styled-components';
import Link from "next/link";

interface SkillLevelFillProps {
    $level: number; // Define the custom prop $level
}

const Container = styled.div`
    display: flex;
    max-width: 100%;
    margin: 0;
    background-color: #f3fafd;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LeftColumn = styled.div`
    flex: 1;
    padding-top: 20px;
    overflow-y: auto; /* Enable vertical scrolling */
    height: calc(100vh - 100px); /* Adjust the height as necessary */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #f3fafd;
    position: sticky;
    top: 80px; /* Adjust as necessary */

    @media (max-width: 768px) {
        overflow-y: auto; 
        height: auto; 
        padding: 10px;
        position: static; 
    }
`;

const RightColumn = styled.div`
    flex: 2.8;
    padding-left: 30px;
    padding-right: 100px;

    @media (max-width: 768px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 20px;
    position: sticky; /* Set the header to be sticky */
    top: 0; /* Stick it to the top of the viewport */
    background-color: white;
    z-index: 1000; /* Ensure it's above other content */
    padding: 20px; /* Adjust padding as necessary */
    border-bottom: 1px solid #ccc; /* Optional: Add a border at the bottom */

    @media (min-width: 769px) {
        position: sticky; /* Set the header to be sticky on larger screens */
        top: 0; /* Stick it to the top of the viewport */
        z-index: 1000; /* Ensure it's above other content */
        margin-bottom: 20px; /* Maintain the original margin for larger screens */
    }

    @media (max-width: 768px) {
        margin-bottom: 10px;
        position: static; /* Disable sticky positioning on smaller screens */
    }
`;

const Name = styled.h1`
    font-size: 2.5em;
    margin-bottom: 0.2em;

    @media (max-width: 768px) {
        font-size: 2em;
    }
`;

const Title = styled.h2`
    font-size: 1.5em;
    color: #333;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;

const SummaryContainer = styled.span`
    font-size: 1.1em;
    line-height: 1.2;
    font-style: italic;
    text-align: justify;
    padding-top: 80px;

    @media (max-width: 768px) {
        line-height: 1;
        font-size: 1em;
        padding-top: 20px;
    }
`;

const Image = styled.img`
    width: 150px;
    height: 200px;
    border-radius: 15px;
    margin-bottom: 10px;
    border: 2px solid #7B7B7B;
    object-fit: cover;
    margin-left: 80px;
    margin-top: 30px;

    @media (max-width: 768px) {
        width: 100px;
        height: 150px;
        margin-left: 0;
        margin-top: 10px;
    }
`;

const IconWrapper = styled.div`
    margin-top: 10px;
`;

const IconLink = styled.a`
    margin-right: 10px;
    width: 40px;
    height: 40px;
    display: inline-block;

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const IconImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const Info = styled.p`
    font-size: 0.98em;
    line-height: 1;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;

const SkillsContainer = styled.div`
    margin-right: 0;
    background-color: #f3fafd;
`;

const Skill = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const SkillName = styled.span`
    font-weight: bold;
    margin-right: 10px;
    width: 100px;

    @media (max-width: 768px) {
        width: 80px;
    }
`;

const SkillLevel = styled.div`
    width: 200px;
    height: 20px;
    background-color: #f3fafd;
    border-radius: 10px;
    overflow: hidden;

    @media (max-width: 768px) {
        width: 180px;
    }
`;

const SkillLevelFill = styled.div<SkillLevelFillProps>`
    height: 100%;
    width: ${({ $level }) => `${$level}%`}; /* Use $level prop here */
    background-color: #4caf50;
    border-radius: 10px;

    @media (max-width: 768px) {
        height: 80%;
        border-radius: 5px;
    }
    
`;

const SkillsTitle = styled.h3`
    margin-bottom: 15px;
    font-size: 0.9em;
    @media (max-width: 768px) {
        margin-bottom: 10px;
        line-height:  0.5;
        font-size: 0.6em;
    }
`;

const ExperienceContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
`;

const ExperienceItem = styled.div`
    margin-bottom: 30px;
`;

const CompanyLogo = styled.img`
    width: 48px;
    height: 48px;
    margin-right: 5px;
    margin-top: 10px;
    border: 1px solid #CACACA;
    border-radius: 5px;

    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ExperienceTitle = styled.h3`
    font-family: "Times New Roman", Times, serif;
    text-align: left;
    font-size: 1em;
    color: #333;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 0.6em; /* Adjust the font size for smaller screens */
    }
`;

const ExperienceCompany = styled.h3`
    font-family: "Times New Roman", Times, serif;
    text-align: left;
    font-size: 0.9em;
    color: #7B7B7B;

    @media (max-width: 768px) {
        font-size: 0.4em; /* Adjust the font size for smaller screens */
    }
`;

const ExperienceDateRange = styled.h3`
    font-family: "Times New Roman", Times, serif;
    text-align: left;
    font-size: 0.9em;
    color: #7B7B7B;
    margin-left: 10px;
    
    @media (max-width: 768px) {
        font-size: 0.4em; /* Adjust the font size for smaller screens */
    }
`;

const ExperienceContent = styled.div`
    font-family: "Times New Roman", Times, serif;
    text-align: left;
    font-size: 1.2em;
    color: #333;
    line-height: 1.6;
    @media (max-width: 768px) {
        font-size: 0.9em; /* Adjust the font size for smaller screens */
        line-height: 1;
    }
`;

const SeeMoreLink = styled.span`
    color: #868483;
    cursor: pointer;
    &:hover {
        text-decoration: none;
        color: blue;
    }
`;

const CertificatesContainer = styled.div`
    margin-top: 95px;

    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;

const CertificateTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 0.9em;
    @media (max-width: 768px) {
        font-size: 0.6em; /* Adjust the font size for smaller screens */
    }
`;

const CertificateList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CertificateItem = styled.li`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const PracticeLinkContainer = styled.li`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const PracticeLink = styled(Link)`
    color: #FC3D16;
    cursor: pointer;
    text-decoration: underline;
    display: block; /* Ensures full width on mobile */
    text-align: left;
    margin-right: auto; /* This will align it to the right */
    margin-left: 10px;
    @media (min-width: 768px) {
        display: inline; /* Inline display on larger screens */
    }

    &:hover {
        text-decoration: none;
        color: blue;
    }
`;

const CertificateLink = styled.a.attrs<{ clicked: boolean }>(() => ({
    clicked: undefined,
}))<{ clicked: boolean }>`
    text-decoration: none;
    display: flex;
    align-items: center;
    color: ${props => (props.clicked ? 'black' : 'inherit')};
    transition: color 0.2s ease-in-out;

    &:hover {
        color: black;
    }
`;

const CertificateName = styled.span`
    margin-left: 10px;
`;

const Badge = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;

    @media (max-width: 768px) {
        width: 15px;
        height: 15px;
    }
`;

const ContactFormStyle = styled.form`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #f3fafd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

const Input = styled.input<InputProps>`
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: ${props => (props.hasError ? '1px solid red' : '1px solid #ccc')};
    border-radius: 4px;
    &:focus {
        outline: none;
        border-color: #0070f3;
        box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
`;

const NameInput = styled(Input)`
    margin-bottom: 1rem; /* Example additional style */
`;

const EmailInput = styled(Input)`
    margin-bottom: 1rem; /* Example additional style */
`;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
}


const Textarea = styled.textarea<TextareaProps>`
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid ${props => (props.hasError ? 'red' : '#ddd')};
    border-radius: 4px;
    resize: vertical;
    min-height: 120px;
    width: 100%;
    &:focus {
        outline: none;
        border-color: #0070f3;
        box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
`;

interface TextareaProps {
    hasError?: boolean;
}

const InputContainer = styled.div`
    margin-bottom: 1rem; /* Adjust as needed */
    width: 90%; /* Ensure inputs take full width */
`;

const ErrorText = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

const SendButton = styled.button`
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: #F8775C;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 96%;
    &:hover {
        background-color: #FD2B00;
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
`;

const SendLinkContainer = styled.a`
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const SendIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;

    @media (max-width: 768px) {
        width: 15px;
        height: 15px;
    }
`;

const SendText = styled.span`
    color: #FC3D16;
    cursor: pointer;
    text-decoration: underline;
    display: block; /* Ensures full width on mobile */
    text-align: left;
    margin-right: auto; /* This will align it to the right */
    margin-left: 10px;
    @media (min-width: 768px) {
        display: inline; /* Inline display on larger screens */
    }

    &:hover {
        text-decoration: none;
        color: blue;
    }
`;

const CloseButton = styled.button`
    color: #868483;
    cursor: pointer;
    text-decoration: underline;
    background: transparent;
    border: none;
    font-size: 14px;
    display: block; /* Ensures full width on mobile */

    @media (min-width: 768px) {
        display: inline; /* Inline display on larger screens */
    }

    &:hover {
        text-decoration: none;
        color: red;
    }
`;

const ContactFormDescription = styled.p`
    font-size: 1em;
    line-height: 1;
    font-style: italic;
    text-align: justify;
    
    @media (max-width: 768px) {
        line-height: 1;
        font-size: 1em;
    }
`
export {
    Container,
    LeftColumn,
    RightColumn,
    Header,
    Name,
    Title,
    SummaryContainer,
    Image,
    IconWrapper,
    IconLink,
    IconImage,
    BoldText,
    Info,
    SkillsContainer,
    Skill,
    SkillName,
    SkillLevel,
    SkillLevelFill,
    SkillsTitle,
    ExperienceContainer,
    ExperienceItem,
    CompanyLogo,
    ExperienceHeader,
    ExperienceTitle,
    ExperienceCompany,
    ExperienceDateRange,
    ExperienceContent,
    SeeMoreLink,
    CertificatesContainer,
    CertificateTitle,
    CertificateList,
    CertificateItem,
    CertificateLink,
    CertificateName,
    Badge,
    ContactFormStyle,
    Input,
    Textarea,
    SendButton,
    CloseButton,
    SendLinkContainer,
    SendIcon,
    SendText,
    NameInput,
    EmailInput,
    InputContainer,
    ErrorText,
    ContactFormDescription,
    PracticeLinkContainer,
    PracticeLink
};
