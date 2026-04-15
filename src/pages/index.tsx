import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Container,
  CtaCard,
  CtaGrid,
  CtaText,
  CtaTitle,
  LeftColumn,
  MainContentStack,
  RightColumn,
  ProfileImageWrapper,
  SectionEyebrow,
  SectionFrame,
  SectionHeading,
  SectionLead,
  MobileSidebarHeader,
  MobileSidebarIdentity,
  MobileSidebarName,
  MobileSidebarTitle,
  MobileSidebarToggle,
  LeftColumnExpandable,
  MobileProfileThumb,
} from '../components/Layout.styles';
import { theme } from '../components/theme';
import { ThemeProvider } from 'styled-components';
import SEOHead from '../components/SEOHead';
import ProfileHeader from '../components/ProfileHeader';
import ProfileSummary from '../components/ProfileSummary';
import SidebarLinks from '../components/SidebarLinks';
import MotionReveal from '../components/MotionReveal';
import EngineeringProjects from '../components/EngineeringProjects';
import OpenSourceContributions from '../components/OpenSourceContributions';
import ArticlesKnowledgeSharing from '../components/ArticlesKnowledgeSharing';
import CurrentExplorations from '../components/CurrentExplorations';
import {
  SkillsPinBoundary,
  SkillsPinProvider,
} from '../components/SkillsPinDesktop';
import { profile } from '../data/profile';

const ExperienceList = dynamic(
  () => import('../components/ExperiencesComponents'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ minHeight: '600px' }}
        aria-busy='true'
        aria-label='Loading experience list'
      />
    ),
  }
);

const IndexPage: React.FC = () => {
  const [isMobileSidebarExpanded, setIsMobileSidebarExpanded] = useState(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SkillsPinProvider>
          <Container>
            <SkillsPinBoundary />
            <SEOHead />

            <LeftColumn $mobileExpanded={isMobileSidebarExpanded}>
              <MobileSidebarHeader>
                <MobileProfileThumb>
                  <Image
                    src='/profile.png'
                    alt=''
                    width={52}
                    height={68}
                    priority
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </MobileProfileThumb>
                <MobileSidebarIdentity>
                  <MobileSidebarName>{profile.name}</MobileSidebarName>
                  <MobileSidebarTitle>
                    {profile.titleExperience}
                  </MobileSidebarTitle>
                </MobileSidebarIdentity>
                <MobileSidebarToggle
                  type='button'
                  aria-expanded={isMobileSidebarExpanded}
                  aria-controls='mobile-left-column-content'
                  aria-label={
                    isMobileSidebarExpanded
                      ? 'Collapse profile sidebar'
                      : 'Expand profile sidebar'
                  }
                  onClick={() =>
                    setIsMobileSidebarExpanded(previous => !previous)
                  }
                >
                  {isMobileSidebarExpanded ? '−' : '+'}
                </MobileSidebarToggle>
              </MobileSidebarHeader>

              <LeftColumnExpandable
                id='mobile-left-column-content'
                $mobileExpanded={isMobileSidebarExpanded}
              >
                <MotionReveal>
                  <ProfileImageWrapper id='profile_image'>
                    <Image
                      src='/profile.png'
                      alt='Profile Picture'
                      width={150}
                      height={200}
                      priority
                      style={{
                        display: 'block',
                        width: '150px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '15px',
                      }}
                    />
                  </ProfileImageWrapper>
                </MotionReveal>
                <MotionReveal delayMs={80}>
                  <SidebarLinks />
                </MotionReveal>
              </LeftColumnExpandable>
            </LeftColumn>
            <RightColumn>
              <MainContentStack>
                <MotionReveal>
                  <ProfileHeader />
                </MotionReveal>
                <MotionReveal delayMs={70}>
                  <ProfileSummary />
                </MotionReveal>
                <MotionReveal delayMs={95}>
                  <SectionFrame aria-label='Professional value and QA resources'>
                    <SectionEyebrow>Value & Navigation</SectionEyebrow>
                    <SectionHeading>
                      Professional Portfolio + QA Resource Hub
                    </SectionHeading>
                    <SectionLead>
                      Explore professional credentials, connect directly, and
                      use practical QA learning resources from one curated
                      homepage.
                    </SectionLead>
                    <CtaGrid>
                      <CtaCard
                        href='https://drive.google.com/file/d/1wQuZyIB8PJnpUnjRJPlQJs8u_hEITzc6/view?usp=sharing'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <CtaTitle>Download Resume</CtaTitle>
                        <CtaText>
                          View full career history and achievements.
                        </CtaText>
                      </CtaCard>
                      <CtaCard href='/mentorship'>
                        <CtaTitle>Mentorship &amp; Knowledge Sharing</CtaTitle>
                        <CtaText>
                          Career direction, automation roadmap, and interview
                          preparation for QA engineers.
                        </CtaText>
                      </CtaCard>
                      <CtaCard href='/practice'>
                        <CtaTitle>Automation Practice</CtaTitle>
                        <CtaText>
                          Interactive UI automation playground for QA workflows.
                        </CtaText>
                      </CtaCard>
                      <CtaCard href='/qa-advisory'>
                        <CtaTitle>
                          Quality Engineering Advisory (Occasional)
                        </CtaTitle>
                        <CtaText>
                          Occasional support for teams on automation strategy,
                          CI/CD quality engineering, and QA mentorship.
                        </CtaText>
                      </CtaCard>
                    </CtaGrid>
                  </SectionFrame>
                </MotionReveal>
                <MotionReveal delayMs={108}>
                  <EngineeringProjects />
                </MotionReveal>
                <MotionReveal delayMs={115}>
                  <OpenSourceContributions />
                </MotionReveal>
                <MotionReveal delayMs={118}>
                  <ArticlesKnowledgeSharing />
                </MotionReveal>
                <MotionReveal delayMs={119}>
                  <CurrentExplorations />
                </MotionReveal>
                <MotionReveal delayMs={120}>
                  <div id='experience_container'>
                    <SectionEyebrow>Professional Experience</SectionEyebrow>
                    <ExperienceList />
                  </div>
                </MotionReveal>
              </MainContentStack>
            </RightColumn>
          </Container>
        </SkillsPinProvider>
      </ThemeProvider>
    </div>
  );
};

export default IndexPage;
