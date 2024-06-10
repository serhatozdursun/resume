import Head from 'next/head';
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
                <title>Mehmet Serhat Özdursun - QA Automation Engineer</title>
                <link rel="icon" href="/favicon_.ico"/>
            </Head>
            <LeftColumn>
                <Image src="/profile.png" alt="Profile Picture"/>
                <CertificatesComponents/>
                <SkillsComponents/>
            </LeftColumn>
            <RightColumn>
                <Header>
                    <Name>Mehmet Serhat Özdursun</Name>
                    <Title>QA Automation Engineer</Title>
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

                <Summary>
                    Experienced in software testing across diverse industries for over a decade. Committed to driving
                    excellence in software quality assurance and delivering comprehensive testing solutions aligned with
                    project requirements. Proficient in collaborating with dynamic teams and staying current with
                    industry
                    trends and technologies to contribute to the success of software development initiatives.
                </Summary>

                <ExperienceContainer>
                        <ExperienceList />
                </ExperienceContainer>

            </RightColumn>
        </Container>
    );
};

export default IndexPage;
