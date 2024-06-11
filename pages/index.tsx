// pages/index.tsx (or index.js if using JavaScript)

import Head from 'next/head';
import Script from 'next/script'; // Import Script from next/script
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
import {SkillsComponents} from '../components/SkillsComponents';
import ExperienceList from '../components/ExperiencesComponents';

const IndexPage: React.FC = () => {
    return (
        <Container>
            <Head>
                <meta name="description"
                      content="Experienced QA Automation Engineer with over a decade of experience in software testing. Committed to delivering comprehensive testing solutions aligned with project requirements."/>
                <title>Mehmet Serhat Özdursun - QA Automation Engineer</title>
                <link rel="icon" href="/favicon.ico"/>
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
                        <IconLink href="https://www.linkedin.com/in/serhat-ozdursun/" target="_blank"
                                  rel="noopener noreferrer">
                            <IconImage src="/linkedin-icon.png" alt="LinkedIn"/>
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
                            <BoldText>Email</BoldText>:
                            <a href="mailto:serhat.ozdursun@gmail.com">serhat.ozdursun@gmail.com</a>
                        </Info>
                        <Info>
                            <BoldText>Phone</BoldText>: +905368361407
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
