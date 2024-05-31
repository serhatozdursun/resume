import React, {useState} from 'react';
import Head from 'next/head';

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
    AccordionWrapper,
    AccordionItem,
    AccordionHeader,
    AccordionTitle,
    AccordionContent,
    BoldText,
    Info
} from './styles'; // Adjust the path as necessary
import Certificates from './Certificates';
import {Skills} from './skills'
import {experiences} from "./expriences";

const IndexPage: React.FC = () => {
    const [activeAccordion, SetActiveAccordion] = useState<number | null>(0); // Default to the first accordion

    const toggleAccordion = (index: number) => {
        if (activeAccordion === index) {
            SetActiveAccordion(null); // Close the accordion if it's already open
        } else {
            SetActiveAccordion(index); // Open the clicked accordion
        }
    };

    return (
        <Container>
            <Head>
                <title>Mehmet Serhat Özdursun - QA Automation Engineer</title>
                <link rel="icon" href="/favicon_.ico"/>
            </Head>
            <LeftColumn>
                <Skills/>
                <Certificates/>
            </LeftColumn>

            <RightColumn>
                <Header>
                    <Image src="/image.png" alt="Profile Picture"/>
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
                        <Info><BoldText>Email</BoldText>: serhat.ozdursun@gmail.com</Info>
                        <Info><BoldText>Phone</BoldText>: +905368361407</Info>
                        <Info><BoldText>Languages</BoldText>: Turkish (Native), English (C1), Spanish (B)</Info>
                    </div>
                </Header>

                <Summary>
                    Experienced in software testing across diverse industries for over a decade. Committed to driving
                    excellence in software quality assurance and delivering comprehensive testing solutions aligned with
                    project requirements. Proficient in collaborating with dynamic teams and staying current with
                    industry
                    trends and technologies to contribute to the success of software development initiatives.
                </Summary>

                <AccordionWrapper>
                    {experiences.map((experience, index) => (
                        <AccordionItem key={index}>
                            <AccordionHeader onClick={() => toggleAccordion(index)}>
                                <AccordionTitle>{experience.title}</AccordionTitle>
                                {activeAccordion === index ? <span>&#x2212;</span> : <span>+</span>}
                            </AccordionHeader>
                            {activeAccordion === index && (
                                <AccordionContent>
                                    <ul>
                                        {experience.points.map((point, pointIndex) => {
                                            const words = point.split(' ');
                                            const isFirstWordBold = words[0].startsWith('**');

                                            return (
                                                <li key={pointIndex}>
                                                    <span>
                                                        {isFirstWordBold ? (
                                                            <BoldText>{words[0].replace('**', '')}</BoldText>
                                                        ) : (
                                                            words[0]
                                                        )}
                                                        {words.slice(1).join(' ')}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </AccordionContent>
                            )}
                        </AccordionItem>
                    ))}
                </AccordionWrapper>

            </RightColumn>
        </Container>
    );
};

export default IndexPage;
