import Script from 'next/script';
import React from 'react';
import Image from 'next/image';
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
  CertificateTitle,
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
                  <p style="text-align: justify;">
                    Senior <strong>QA Automation Leader</strong> with <strong>13+ years</strong> of experience driving quality engineering across SaaS, fintech, and enterprise platforms. Certified in 
                    <strong>ISTQB® Certified Tester Advanced Level – Test Management (CTAL-TM v3.0)</strong>, 
                    <strong>Test Automation Engineer (CTAL-TAE)</strong>, <strong>Foundation Level (CTFL)</strong>, 
                    and <strong>Professional Scrum Developer (PSD I)</strong>. 
                    Expert in architecting scalable, AI-assisted test automation frameworks across mobile, <strong>web</strong>, and <strong>API</strong> layers using 
                    <strong>Java</strong>, <strong>Python</strong>, and .NET (C#) with <strong>Appium</strong>, <strong>Selenium</strong>, and <strong>SpecFlow</strong>. 
                    Skilled in <strong>CI/CD integration</strong> (Azure DevOps, Jenkins, GitHub Actions), 
                    performance testing (JMeter, k6), and implementing <strong>shift-left</strong>, 
                    risk-based, and data-driven quality strategies
                  </p>
                
                  <p style="text-align: justify;">
                    I specialize in aligning QA with business objectives to deliver scalable, reliable, and high-impact software at speed. 
                    Passionate about <strong>mentoring teams</strong>, improving test efficiency, and fostering a 
                    quality-first culture, I focus on creating automation solutions that reduce defect rates, 
                    accelerate delivery, and strengthen customer confidence.
                  </p>
                
                  <p style="text-align: justify;">
                    Since 2022, I have been working as an <strong>independent QA Automation Consultant</strong>, partnering with 
                    leading international clients including <strong>Affirm</strong>, <strong>Poq</strong>, <strong>Payflow</strong>, and <strong>Hubuc</strong>. 
                    My work integrates <strong>AI-driven testing</strong>, performance optimization, and 
                    service virtualization to enhance release confidence, increase quality maturity, and drive measurable ROI.
                  </p>
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
              QA Leader | Senior SDET | ISTQB® CTAL-TM, CTAL-TAE & CTFL PSD I |
              13+ Years in Quality Engineering
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
                <Image
                  src='/resume-computer-icons.png'
                  alt='LinkedIn'
                  width={28}
                  height={28}
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
              <BadgeWrapper className='badgeImage'>
                <Image
                  src='/certified-tester-minimal-logo.png'
                  alt='LinkedIn'
                  width={28}
                  height={28}
                />
              </BadgeWrapper>
              <CommonLink
                id='goAtsqa'
                href='https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229'
                target='_blank'
                rel='noopener noreferrer'
                title='Official U.S. List of Certified & Credentialed Software Testers™'
                onClick={() =>
                  trackEvent('goAtsqa', 'List', 'Official U.S. List')
                }
              >
                Official U.S. List
              </CommonLink>
            </LeftColumnLinkContainer>
            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <Image
                  src='/recommandation.png'
                  alt='recommandation'
                  width={28}
                  height={28}
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
            <ContactForm />
            <div style={{ marginLeft: '20px', marginTop: '20px' }}>
              <CertificateTitle id='qaHelpLabel'>QA Help</CertificateTitle>
            </div>
            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <Image
                  src='/Manual_Testing.png'
                  alt='Practice Page'
                  width={28}
                  height={28}
                />
              </BadgeWrapper>
              <CommonLink id='practicePAge' href='/practice'>
                Practice Page
              </CommonLink>
            </LeftColumnLinkContainer>

            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <Image
                  src='/CTAL-TAE-EXAMpng.png'
                  alt='CTAL-TAE Exam'
                  width={29}
                  height={29}
                />
              </BadgeWrapper>
              <CommonLink id='CtalTaeExam' href='/ctal-tae-exam'>
                CTAL-TAE Sample Exam
              </CommonLink>
            </LeftColumnLinkContainer>

            <LeftColumnLinkContainer className='leftColumnLinkContainer'>
              <BadgeWrapper>
                <Image
                  src='/catl_tm_exam.png'
                  alt='CTAL-TM Exam'
                  width={29}
                  height={29}
                />
              </BadgeWrapper>
              <CommonLink id='CtalTmExam' href='/ctal-tm-exam'>
                CTAL-TM Sample Exam
              </CommonLink>
            </LeftColumnLinkContainer>

            <CertificatesComponents />
            <SkillsComponents />
          </LeftColumn>
          <RightColumn>
            <Header>
              <Name id='name'>Mehmet Serhat Ozdursun</Name>
              <Title id='title'>
                QA Leader | Senior SDET | ISTQB® CTAL-TM, CTAL-TAE & CTFL | PSD
                I
                <br />
                13+ Years in Quality Engineering <br />
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
                    <Image
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
                    <Image
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
                    <Image
                      src='/github-icon.png'
                      alt='GitHub'
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </IconImageWrapper>
                </IconLink>
                <IconLink
                  href='https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='iconLink'
                  onClick={() =>
                    trackEvent('navigate_github', 'github', 'Github')
                  }
                >
                  <IconImageWrapper className='iconImage'>
                    <Image
                      src='/certified-tester-logo.svg'
                      alt='atsqa.org'
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
                    <Image
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
                    <Image
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
                    <Image
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
