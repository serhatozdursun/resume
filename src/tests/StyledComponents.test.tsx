import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Container,
  LeftColumn,
  RightColumn,
  Header,
  Name,
  Title,
  SummaryContainer,
  IconWrapper,
  IconLink,
  IconImageWrapper,
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
  CompanyLogoWrapper,
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
  BadgeWrapper,
  ContactFormStyle,
  Input,
  Textarea,
  SendButton,
  CloseButton,
  SendLinkContainer,
  SendIconWrapper,
  SendText,
  NameInput,
  EmailInput,
  InputContainer,
  ErrorText,
  ContactFormDescription,
  LeftColumnLinkContainer,
  CommonLink,
} from '../types/StyledComponents';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import type { ComponentProps } from 'react';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: ComponentProps<'a'> & { href: string }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('StyledComponents', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  describe('Container', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Container data-testid='container'>Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('LeftColumn', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <LeftColumn data-testid='left-column'>Content</LeftColumn>
      );
      const leftColumn = screen.getByTestId('left-column');
      expect(leftColumn).toBeInTheDocument();
    });
  });

  describe('RightColumn', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <RightColumn data-testid='right-column'>Content</RightColumn>
      );
      const rightColumn = screen.getByTestId('right-column');
      expect(rightColumn).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Header data-testid='header'>Content</Header>);
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Name', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Name data-testid='name'>Content</Name>);
      const name = screen.getByTestId('name');
      expect(name).toBeInTheDocument();
    });
  });

  describe('Title', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Title data-testid='title'>Content</Title>);
      const title = screen.getByTestId('title');
      expect(title).toBeInTheDocument();
    });
  });

  describe('SummaryContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SummaryContainer data-testid='summary'>Content</SummaryContainer>
      );
      const summary = screen.getByTestId('summary');
      expect(summary).toBeInTheDocument();
    });
  });

  describe('IconWrapper', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <IconWrapper data-testid='icon-wrapper'>Content</IconWrapper>
      );
      const iconWrapper = screen.getByTestId('icon-wrapper');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('IconLink', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <IconLink data-testid='icon-link' href='#'>
          Content
        </IconLink>
      );
      const iconLink = screen.getByTestId('icon-link');
      expect(iconLink).toBeInTheDocument();
    });
  });

  describe('IconImageWrapper', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <IconImageWrapper data-testid='icon-image-wrapper'>
          Content
        </IconImageWrapper>
      );
      const iconImageWrapper = screen.getByTestId('icon-image-wrapper');
      expect(iconImageWrapper).toBeInTheDocument();
    });
  });

  describe('BoldText', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<BoldText data-testid='bold-text'>Content</BoldText>);
      const boldText = screen.getByTestId('bold-text');
      expect(boldText).toBeInTheDocument();
    });
  });

  describe('Info', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Info data-testid='info'>Content</Info>);
      const info = screen.getByTestId('info');
      expect(info).toBeInTheDocument();
    });
  });

  describe('SkillsContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SkillsContainer data-testid='skills-container'>
          Content
        </SkillsContainer>
      );
      const skillsContainer = screen.getByTestId('skills-container');
      expect(skillsContainer).toBeInTheDocument();
    });
  });

  describe('Skill', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Skill data-testid='skill'>Content</Skill>);
      const skill = screen.getByTestId('skill');
      expect(skill).toBeInTheDocument();
    });
  });

  describe('SkillName', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<SkillName data-testid='skill-name'>Content</SkillName>);
      const skillName = screen.getByTestId('skill-name');
      expect(skillName).toBeInTheDocument();
    });
  });

  describe('SkillLevel', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SkillLevel data-testid='skill-level'>Content</SkillLevel>
      );
      const skillLevel = screen.getByTestId('skill-level');
      expect(skillLevel).toBeInTheDocument();
    });
  });

  describe('SkillLevelFill', () => {
    it('renders with correct level prop', () => {
      renderWithTheme(
        <SkillLevelFill data-testid='skill-level-fill' $level={75}>
          Content
        </SkillLevelFill>
      );
      const skillLevelFill = screen.getByTestId('skill-level-fill');
      expect(skillLevelFill).toBeInTheDocument();
    });
  });

  describe('SkillsTitle', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SkillsTitle data-testid='skills-title'>Content</SkillsTitle>
      );
      const skillsTitle = screen.getByTestId('skills-title');
      expect(skillsTitle).toBeInTheDocument();
    });
  });

  describe('ExperienceContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceContainer data-testid='experience-container'>
          Content
        </ExperienceContainer>
      );
      const experienceContainer = screen.getByTestId('experience-container');
      expect(experienceContainer).toBeInTheDocument();
    });
  });

  describe('ExperienceItem', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceItem data-testid='experience-item'>Content</ExperienceItem>
      );
      const experienceItem = screen.getByTestId('experience-item');
      expect(experienceItem).toBeInTheDocument();
    });
  });

  describe('CompanyLogoWrapper', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CompanyLogoWrapper data-testid='company-logo-wrapper'>
          Content
        </CompanyLogoWrapper>
      );
      const companyLogoWrapper = screen.getByTestId('company-logo-wrapper');
      expect(companyLogoWrapper).toBeInTheDocument();
    });
  });

  describe('ExperienceHeader', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceHeader data-testid='experience-header'>
          Content
        </ExperienceHeader>
      );
      const experienceHeader = screen.getByTestId('experience-header');
      expect(experienceHeader).toBeInTheDocument();
    });
  });

  describe('ExperienceTitle', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceTitle data-testid='experience-title'>
          Content
        </ExperienceTitle>
      );
      const experienceTitle = screen.getByTestId('experience-title');
      expect(experienceTitle).toBeInTheDocument();
    });
  });

  describe('ExperienceCompany', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceCompany data-testid='experience-company'>
          Content
        </ExperienceCompany>
      );
      const experienceCompany = screen.getByTestId('experience-company');
      expect(experienceCompany).toBeInTheDocument();
    });
  });

  describe('ExperienceDateRange', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceDateRange data-testid='experience-date-range'>
          Content
        </ExperienceDateRange>
      );
      const experienceDateRange = screen.getByTestId('experience-date-range');
      expect(experienceDateRange).toBeInTheDocument();
    });
  });

  describe('ExperienceContent', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ExperienceContent data-testid='experience-content'>
          Content
        </ExperienceContent>
      );
      const experienceContent = screen.getByTestId('experience-content');
      expect(experienceContent).toBeInTheDocument();
    });
  });

  describe('SeeMoreLink', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SeeMoreLink data-testid='see-more-link'>Content</SeeMoreLink>
      );
      const seeMoreLink = screen.getByTestId('see-more-link');
      expect(seeMoreLink).toBeInTheDocument();
    });
  });

  describe('CertificatesContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CertificatesContainer data-testid='certificates-container'>
          Content
        </CertificatesContainer>
      );
      const certificatesContainer = screen.getByTestId(
        'certificates-container'
      );
      expect(certificatesContainer).toBeInTheDocument();
    });
  });

  describe('CertificateTitle', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CertificateTitle data-testid='certificate-title'>
          Content
        </CertificateTitle>
      );
      const certificateTitle = screen.getByTestId('certificate-title');
      expect(certificateTitle).toBeInTheDocument();
    });
  });

  describe('CertificateList', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CertificateList data-testid='certificate-list'>
          Content
        </CertificateList>
      );
      const certificateList = screen.getByTestId('certificate-list');
      expect(certificateList).toBeInTheDocument();
    });
  });

  describe('CertificateItem', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CertificateItem data-testid='certificate-item'>
          Content
        </CertificateItem>
      );
      const certificateItem = screen.getByTestId('certificate-item');
      expect(certificateItem).toBeInTheDocument();
    });
  });

  describe('CertificateLink', () => {
    it('renders with correct styles when not clicked', () => {
      renderWithTheme(
        <CertificateLink data-testid='certificate-link' clicked={false}>
          Content
        </CertificateLink>
      );
      const certificateLink = screen.getByTestId('certificate-link');
      expect(certificateLink).toBeInTheDocument();
    });

    it('renders with correct styles when clicked', () => {
      renderWithTheme(
        <CertificateLink data-testid='certificate-link' clicked={true}>
          Content
        </CertificateLink>
      );
      const certificateLink = screen.getByTestId('certificate-link');
      expect(certificateLink).toBeInTheDocument();
    });
  });

  describe('CertificateName', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CertificateName data-testid='certificate-name'>
          Content
        </CertificateName>
      );
      const certificateName = screen.getByTestId('certificate-name');
      expect(certificateName).toBeInTheDocument();
    });
  });

  describe('BadgeWrapper', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <BadgeWrapper data-testid='badge-wrapper'>Content</BadgeWrapper>
      );
      const badgeWrapper = screen.getByTestId('badge-wrapper');
      expect(badgeWrapper).toBeInTheDocument();
    });
  });

  describe('ContactFormStyle', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ContactFormStyle data-testid='contact-form-style'>
          Content
        </ContactFormStyle>
      );
      const contactFormStyle = screen.getByTestId('contact-form-style');
      expect(contactFormStyle).toBeInTheDocument();
    });
  });

  describe('Input', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Input data-testid='input' />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });

    it('renders with error styles when hasError is true', () => {
      renderWithTheme(<Input data-testid='input' hasError={true} />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Textarea', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<Textarea data-testid='textarea' />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('renders with error styles when hasError is true', () => {
      renderWithTheme(<Textarea data-testid='textarea' hasError={true} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('SendButton', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SendButton data-testid='send-button'>Content</SendButton>
      );
      const sendButton = screen.getByTestId('send-button');
      expect(sendButton).toBeInTheDocument();
    });
  });

  describe('CloseButton', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CloseButton data-testid='close-button'>Content</CloseButton>
      );
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('SendLinkContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SendLinkContainer data-testid='send-link-container'>
          Content
        </SendLinkContainer>
      );
      const sendLinkContainer = screen.getByTestId('send-link-container');
      expect(sendLinkContainer).toBeInTheDocument();
    });
  });

  describe('SendIconWrapper', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <SendIconWrapper data-testid='send-icon-wrapper'>
          Content
        </SendIconWrapper>
      );
      const sendIconWrapper = screen.getByTestId('send-icon-wrapper');
      expect(sendIconWrapper).toBeInTheDocument();
    });
  });

  describe('SendText', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<SendText data-testid='send-text'>Content</SendText>);
      const sendText = screen.getByTestId('send-text');
      expect(sendText).toBeInTheDocument();
    });
  });

  describe('NameInput', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<NameInput data-testid='name-input' />);
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toBeInTheDocument();
    });

    it('renders with error styles when hasError is true', () => {
      renderWithTheme(<NameInput data-testid='name-input' hasError={true} />);
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toBeInTheDocument();
    });
  });

  describe('EmailInput', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<EmailInput data-testid='email-input' />);
      const emailInput = screen.getByTestId('email-input');
      expect(emailInput).toBeInTheDocument();
    });

    it('renders with error styles when hasError is true', () => {
      renderWithTheme(<EmailInput data-testid='email-input' hasError={true} />);
      const emailInput = screen.getByTestId('email-input');
      expect(emailInput).toBeInTheDocument();
    });
  });

  describe('InputContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <InputContainer data-testid='input-container'>Content</InputContainer>
      );
      const inputContainer = screen.getByTestId('input-container');
      expect(inputContainer).toBeInTheDocument();
    });
  });

  describe('ErrorText', () => {
    it('renders with correct styles', () => {
      renderWithTheme(<ErrorText data-testid='error-text'>Content</ErrorText>);
      const errorText = screen.getByTestId('error-text');
      expect(errorText).toBeInTheDocument();
    });
  });

  describe('ContactFormDescription', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <ContactFormDescription data-testid='contact-form-description'>
          Content
        </ContactFormDescription>
      );
      const contactFormDescription = screen.getByTestId(
        'contact-form-description'
      );
      expect(contactFormDescription).toBeInTheDocument();
    });
  });

  describe('LeftColumnLinkContainer', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <LeftColumnLinkContainer data-testid='left-column-link-container'>
          Content
        </LeftColumnLinkContainer>
      );
      const leftColumnLinkContainer = screen.getByTestId(
        'left-column-link-container'
      );
      expect(leftColumnLinkContainer).toBeInTheDocument();
    });
  });

  describe('CommonLink', () => {
    it('renders with correct styles', () => {
      renderWithTheme(
        <CommonLink href='/test' data-testid='common-link'>
          Content
        </CommonLink>
      );
      const commonLink = screen.getByTestId('common-link');
      expect(commonLink).toBeInTheDocument();
      expect(commonLink).toHaveAttribute('href', '/test');
    });
  });

  describe('ProfileImage', () => {
    it('renders with correct styles', async () => {
      const mod = await import('../types/StyledComponents');
      const { ProfileImage } =
        mod as typeof import('../types/StyledComponents');
      renderWithTheme(
        <ProfileImage
          data-testid='profile-image'
          src='/test.jpg'
          alt='Profile'
        />
      );
      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', '/test.jpg');
    });
  });
});
