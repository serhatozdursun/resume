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
    SummaryContainer,
    Image,
    IconWrapper,
    IconLink,
    IconImage,
    ExperienceContainer,
    Info,
    BoldText, CommonLink, LeftColumnLinkContainer, Badge
} from '../components/StyledComponents'; // Adjust the path as necessary
import CertificatesComponents from '../components/CertificatesComponents';
import { SkillsComponents } from '../components/SkillsComponents';
import ExperienceList from '../components/ExperiencesComponents';
import ContactForm from "../components/ContactForm";
import HtmlParser from "html-react-parser";

const IndexPage: React.FC = () => {
    const summary = `
       <p>With over a decade of experience in <strong>software testing across various industries</strong>, I have honed my skills in ensuring the highest standards of <strong>software quality assurance</strong>. My expertise lies in <strong>delivering comprehensive and innovative testing solutions</strong> that are precisely aligned with project requirements, thereby ensuring robust and reliable software products.</p>
       <p>I excel in <strong>collaborating with dynamic and cross-functional teams</strong>, fostering a culture of continuous improvement and excellence. My proactive approach to <strong>staying current with industry trends and emerging technologies</strong> enables me to implement cutting-edge testing methodologies, driving the success of <strong>software development initiatives</strong>.</p>
       <p>Passionate about quality and detail-oriented, I am committed to making a tangible difference in every project I undertake, contributing to the overall success and efficiency of the organization</p>
    `;

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
                <Image id="profile_image" src="/profile.png" alt="Profile Picture"/>
                <LeftColumnLinkContainer className="leftColumnLinkContainer">
                    <Badge className="badgeImage" src="/resume-computer-icons.png" alt="LinkedIn"/>
                    <CommonLink id="downloadResumeLink" href="https://drive.google.com/file/d/12tXqmOQ2upo19wUYsBtBt3EXroThfM9m/view"
                                target="_blank" rel="noopener noreferrer">Download Resume</CommonLink>
                </LeftColumnLinkContainer>
                <LeftColumnLinkContainer className="leftColumnLinkContainer">
                    <Badge src="/Manual_Testing.png" alt="LinkedIn"/>
                    <CommonLink id="practicePAge" href="/practice">Test Automation Practice Page </CommonLink>
                </LeftColumnLinkContainer>
                <ContactForm/>
                <CertificatesComponents/>
                <SkillsComponents/>
            </LeftColumn>
            <RightColumn>
                <Header>
                    <Name id="name">Mehmet Serhat Ozdursun</Name>
                    <Title id="title">QA Automation Engineer</Title>
                    <IconWrapper id="iconWrapper">
                        <IconLink href="https://www.linkedin.com/in/serhat-ozdursun/" target="_blank" rel="noopener noreferrer" className="iconLink">
                            <IconImage className="iconImage" src="/linkedin-icon.png" alt="LinkedIn"/>
                        </IconLink>
                        <IconLink  href="https://www.upwork.com/freelancers/~012512aef2eaee40a9" target="_blank" rel="noopener noreferrer" className="iconLink">
                            <IconImage src="/upwork.png" alt="upwork"/>
                        </IconLink>
                        <IconLink href="https://github.com/serhatozdursun" target="_blank" rel="noopener noreferrer" className="iconLink">
                            <IconImage className="iconImage" src="/github-icon.png" alt="GitHub"/>
                        </IconLink>
                        <IconLink href="https://medium.com/@serhat-ozdursun" target="_blank" rel="noopener noreferrer" className="iconLink">
                            <IconImage className="iconImage" src="/medium_icon.png" alt="medium"/>
                        </IconLink>
                        <IconLink href="https://www.hackerrank.com/profile/serhat_ozdursun" target="_blank" rel="noopener noreferrer" className="iconLink">
                            <IconImage className="iconImage" src="/hackerrank.png" alt="medium"/>
                        </IconLink>
                    </IconWrapper>

                    <div>
                        <Info>
                            <BoldText id="emailLabel">Email</BoldText>: <CommonLink id="email" href="mailto:serhat.ozdursun@gmail.com">serhat.ozdursun@gmail.com</CommonLink>
                        </Info>
                        <Info>
                            <BoldText id="phoneLabel">Phone</BoldText>: <CommonLink id="phone" href="tel:+905368361407">+905368361407</CommonLink>
                        </Info>
                        <Info>
                            <BoldText id="languages">Languages</BoldText>: Turkish (Native), English (C1), Spanish (B)
                        </Info>
                    </div>
                </Header>

                <SummaryContainer id="summary"> {HtmlParser(summary)}</SummaryContainer>

                <ExperienceContainer id="experience_container">
                    <ExperienceList />
                </ExperienceContainer>
            </RightColumn>
        </Container>
    );
};

export default IndexPage;
