import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

import {
    Container,
    LeftColumn,
    RightColumn,
    Header,
    Name,
    Title,
    Summary,
    Image,
    IconWrapper,
    IconLink,
    IconImage,
    ExperienceContainer,
    Info,
    BoldText
} from '../components/StyledComponents'; // Adjust the path as necessary
import CertificatesComponents from '../components/CertificatesComponents';
import { SkillsComponents } from '../components/SkillsComponents';
import ExperienceList from '../components/ExperiencesComponents';

const IndexPage: React.FC = () => {
    return (
        <Container>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."/>
                <title>Mehmet Serhat Özdursun - QA Automation Engineer</title>
                <link rel="icon" href="/favicon_.ico"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://serhatozdursun.com/"/>
                <meta property="og:title" content="Mehmet Serhat Özdursun - QA Automation Engineer"/>
                <meta property="og:description" content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."/>
                <meta property="og:image" content="https://serhatozdursun.com/profile.png"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://serhatozdursun.com/"/>
                <meta property="twitter:title" content="Mehmet Serhat Özdursun - QA Automation Engineer"/>
                <meta property="twitter:description" content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."/>
                <meta property="twitter:image" content="https://serhatozdursun.com/profile.png"/>

                <meta name="author" content="Mehmet Serhat Özdursun"/>
                <meta name="language" content="English"/>
                <meta name="robots" content="index, follow"/>
                <meta name="theme-color" content="#ffffff"/>
                <link rel="canonical" href="https://serhatozdursun.com/"/>
                <meta name="keywords" content="QA Automation Engineer, Software Testing, Mehmet Serhat Özdursun, Resume"/>
            </Head>

            {/* Use next/script for Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=G-0CSGDMK7CG`}
                strategy="afterInteractive"
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'G-0CSGDMK7CG');
                    `,
                }}
            />
            {/* End Google Analytics */}

            {/* Structured Data */}
            <Script
                type="application/ld+json"
                strategy="afterInteractive"
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
                      "description": "Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements.",
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
                <Image src="/profile.png" alt="Profile Picture"/>
                <CertificatesComponents/>
                <SkillsComponents/>
            </LeftColumn>
            <RightColumn>
                <Header>
                    <Name id="name">Mehmet Serhat Özdursun</Name>
                    <Title id="title">QA Automation Engineer</Title>
                    <IconWrapper>
                        <IconLink href="https://www.linkedin.com/in/serhat-ozdursun/" target="_blank" rel="noopener noreferrer">
                            <IconImage src="/linkedin-icon.png" alt="LinkedIn"/>
                        </IconLink>
                        <IconLink href="https://www.upwork.com/freelancers/~012512aef2eaee40a9" target="_blank" rel="noopener noreferrer">
                            <IconImage src="/upwork.png" alt="upwork"/>
                        </IconLink>
                        <IconLink href="https://github.com/serhatozdursun" target="_blank" rel="noopener noreferrer">
                            <IconImage src="/github-icon.png" alt="GitHub"/>
                        </IconLink>
                        <IconLink href="https://medium.com/@serhat-ozdursun" target="_blank" rel="noopener noreferrer">
                            <IconImage src="/medium_icon.png" alt="medium"/>
                        </IconLink>
                    </IconWrapper>

                    <div>
                        <Info>
                            <BoldText>Email</BoldText>: <a href="mailto:serhat.ozdursun@gmail.com">serhat.ozdursun@gmail.com</a>
                        </Info>
                        <Info>
                            <BoldText>Phone</BoldText>: <a href="tel:+905368361407">+905368361407</a>
                        </Info>
                        <Info>
                            <BoldText>Languages</BoldText>: Turkish (Native), English (C1), Spanish (B)
                        </Info>
                    </div>
                </Header>

                <Summary id="summary">
                    Experienced in software testing across diverse industries for over a decade. Committed to driving
                    excellence in software quality assurance and delivering comprehensive testing solutions aligned with
                    project requirements. Proficient in collaborating with dynamic teams and staying current with
                    industry trends and technologies to contribute to the success of software development initiatives.
                </Summary>

                <ExperienceContainer id="experience_container">
                    <ExperienceList />
                </ExperienceContainer>
            </RightColumn>
        </Container>
    );
};

export default IndexPage;
