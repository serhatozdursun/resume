import Script from 'next/script';
import React from 'react';
import {
  Container,
  LeftColumn,
  RightColumn,
  Header,
  Name,
  Title,
  SummaryContainer,
  ProfileImage,
  IconWrapper,
  IconLink,
  IconImageWrapper,
  ExperienceContainer,
  Info,
  BoldText,
  CommonLink,
  LeftColumnLinkContainer,
  BadgeWrapper,
} from '../types/StyledComponents';
import dynamic from 'next/dynamic';
import HtmlParser from 'html-react-parser';
import { theme } from '../components/theme';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import { env } from '../utils/env';

const ExperienceList = dynamic(
  () => import('../components/ExperiencesComponents'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const CertificatesComponents = dynamic(
  () => import('../components/CertificatesComponents'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const SkillsComponents = dynamic(
  () =>
    import('../components/SkillsComponents').then(mod => mod.SkillsComponents),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const ContactForm = dynamic(() => import('../components/ContactForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const IndexPage: React.FC = () => {
  const summary = `
       <p>With over a decade of experience in <strong>software testing across various industries</strong>, I have honed my skills in ensuring the highest standards of <strong>software quality assurance</strong>. My expertise lies in <strong>delivering comprehensive and innovative testing solutions</strong> that are precisely aligned with project requirements, thereby ensuring robust and reliable software products.</p>
       <p>I excel in <strong>collaborating with dynamic and cross-functional teams</strong>, fostering a culture of continuous improvement and excellence. My proactive approach to <strong>staying current with industry trends and emerging technologies</strong> enables me to implement cutting-edge testing methodologies, driving the success of <strong>software development initiatives</strong>.</p>
       <p>Passionate about quality and detail-oriented, I am committed to making a tangible difference in every project I undertake, contributing to the overall success and efficiency of the organization.</p>
    `;

  const trackEvent = (
    event: string,
    eventCategory: string,
    eventLabel: string
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: 1,
      });
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          <Helmet>
            <html lang='en' />
            <meta charSet='UTF-8' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0'
            />
            <meta
              name='description'
              content='Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions'
            />
            <title>
              Mehmet Serhat Özdursun - QA Automation Leader | ISTQB CTAL-TAE
              Certified | Driving Test Automation Excellence for 13+ Years
            </title>
            <link rel='icon' href='/favicon_.ico' />

            <meta property='og:type' content='website' />
            <meta property='og:url' content='https://serhatozdursun.com/' />
            <meta
              property='og:title'
              content='Mehmet Serhat Özdursun - QA Automation Engineer'
            />
            <meta
              property='og:description'
              content='Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions.'
            />
            <meta
              property='og:image'
              content='https://serhatozdursun.com/profile.png'
            />

            <meta property='twitter:card' content='summary_large_image' />
            <meta
              property='twitter:url'
              content='https://serhatozdursun.com/'
            />
            <meta
              property='twitter:title'
              content='Mehmet Serhat Özdursun - QA Automation Engineer'
            />
            <meta
              property='twitter:description'
              content='Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions'
            />
            <meta
              property='twitter:image'
              content='https://serhatozdursun.com/profile.png'
            />

            <meta name='author' content='Mehmet Serhat Özdursun' />
            <meta name='language' content='English' />
            <meta name='robots' content='index, follow' />
            <meta name='theme-color' content='#ffffff' />
            <link rel='canonical' href='https://serhatozdursun.com/' />
            <meta
              name='keywords'
              content='QA Automation Engineer, Software Testing, Mehmet Serhat Özdursun, Resume'
            />
          </Helmet>

          {/* Use next/script for Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}`}
            strategy='afterInteractive'
          />
          <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', '${env.GA_TRACKING_ID}');
                    `,
            }}
          />
          {/* End Google Analytics */}

          {/* Structured Data */}
          <Script
            id='ldjson-schema'
            type='application/ld+json'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                    {
                      "@context": "https://schema.org",
                      "@type": "Person",
                      "name": "Mehmet Serhat Özdursun",
                      "jobTitle": "QA Automation Engineer",
                      "url": "https://serhatozdursun.com/",
                      "sameAs": [
                        "https://www.linkedin.com/in/serhat-ozdursun/",
                        "https://github.com/serhatozdursun",
                        "https://medium.com/@serhat-ozdursun"
                      ],
                      "image": "https://serhatozdursun.com/profile.png",
                      "description": "Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions",
                      "email": "serhat.ozdursun@gmail.com",
                      "telephone": "+905368361407",
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Rize",
                        "addressRegion": "Findikli",
                        "addressCountry": "Turkey"
                      }
                    }
                    `,
            }}
          />
          {/* End Structured Data */}

          <LeftColumn>
            <ProfileImage
              id='profile_image'
              src='/profile.png'
              alt='Profile Picture'
            />
            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper className='badgeImage'>
                <img
                  src='/resume-computer-icons.png'
                  alt='LinkedIn'
                  width={20}
                  height={20}
                />
              </BadgeWrapper>
              <CommonLink
                id='downloadResumeLink'
                href='https://drive.google.com/file/d/1wQuZyIB8PJnpUnjRJPlQJs8u_hEITzc6/view?usp=sharing'
                target='_blank'
                rel='noopener noreferrer'
                onClick={() =>
                  trackEvent('download_resume', 'resume', 'Download Resume')
                }
              >
                Download Resume
              </CommonLink>
            </LeftColumnLinkContainer>
            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <img
                  src='/recommandation.png'
                  alt='recommandation'
                  width={20}
                  height={20}
                />
              </BadgeWrapper>
              <CommonLink
                id='recomandarion'
                href='https://www.linkedin.com/in/serhat-ozdursun/details/recommendations/'
                target='_blank'
                onClick={() =>
                  trackEvent(
                    'recommendations',
                    'linkedin',
                    'Linkedin Recommendations'
                  )
                }
              >
                Recommendations
              </CommonLink>
            </LeftColumnLinkContainer>
            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <img
                  src='/Manual_Testing.png'
                  alt='LinkedIn'
                  width={20}
                  height={20}
                />
              </BadgeWrapper>
              <CommonLink id='practicePAge' href='/practice'>
                Practice Page
              </CommonLink>
            </LeftColumnLinkContainer>
            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <img
                  src='/CTAL-TAE-EXAMpng.png'
                  alt='CTAL-TAE Exam'
                  width={20}
                  height={20}
                />
              </BadgeWrapper>
              <CommonLink id='ctalExamPage' href='/ctal-exam'>
                CTAL-TAE Sample Exam
              </CommonLink>
            </LeftColumnLinkContainer>
            <ContactForm />
            <CertificatesComponents />
            <SkillsComponents />
          </LeftColumn>
          <RightColumn>
            <Header>
              <Name id='name'>Mehmet Serhat Ozdursun</Name>
              <Title id='title'>
                QA Leader | Senior SDET | ISTQB® CTAL-TAE - CTFL | Scrum.org
                PSD I <br />
                Driving Test Automation Excellence with Selenium, Appium,
                WebDriverIO <br />
                TypeScript, Java & Python | 13+ Years in QA
              </Title>
              <IconWrapper id='iconWrapper'>
                <IconLink
                  href='https://www.linkedin.com/in/serhat-ozdursun/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                  onClick={() =>
                    trackEvent('navigate_linkedin', 'linkedin', 'Linkedin')
                  }
                >
                  <IconImageWrapper className='iconImage'>
                    <img
                      src='/linkedin-icon.png'
                      alt='LinkedIn'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
                <IconLink
                  href='https://www.upwork.com/freelancers/~012512aef2eaee40a9'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                >
                  <IconImageWrapper>
                    <img
                      src='/upwork.png'
                      alt='upwork'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
                <IconLink
                  href='https://github.com/serhatozdursun'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                  onClick={() =>
                    trackEvent('navigate_github', 'github', 'Github')
                  }
                >
                  <IconImageWrapper className='iconImage'>
                    <img
                      src='/github-icon.png'
                      alt='GitHub'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
                <IconLink
                  href='https://medium.com/@serhat-ozdursun'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                >
                  <IconImageWrapper className='iconImage'>
                    <img
                      src='/medium_icon.png'
                      alt='medium'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
                <IconLink
                  href='https://www.hackerrank.com/profile/serhat_ozdursun'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                >
                  <IconImageWrapper className='iconImage'>
                    <img
                      src='/hackerrank.png'
                      alt='medium'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
                <IconLink
                  href='https://dev.to/serhat_ozdursun_03644ef56'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                >
                  <IconImageWrapper className='iconImage'>
                    <img
                      src='/dev.webp'
                      alt='dev'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
              </IconWrapper>
              <div>
                <Info>
                  <BoldText id='emailLabel'>Email</BoldText>:{' '}
                  <CommonLink
                    id='email'
                    href='mailto:serhat.ozdursun@gmail.com'
                  >
                    serhat.ozdursun@gmail.com
                  </CommonLink>
                </Info>
                <Info>
                  <BoldText id='phoneLabel'>Phone</BoldText>:{' '}
                  <CommonLink id='phone' href='tel:+905368361407'>
                    +905368361407
                  </CommonLink>
                </Info>
                <Info>
                  <BoldText id='languages'>Languages</BoldText>: Turkish
                  (Native), English (C1), Spanish (B)
                </Info>
              </div>
            </Header>

            <SummaryContainer id='summary'>
              {' '}
              {HtmlParser(summary)}
            </SummaryContainer>

            <ExperienceContainer id='experience_container'>
              <ExperienceList />
            </ExperienceContainer>
          </RightColumn>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default IndexPage;
