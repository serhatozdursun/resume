import React from 'react';
import dynamic from 'next/dynamic';
import {
  Container,
  LeftColumn,
  RightColumn,
  ProfileImage,
  ExperienceContainer,
} from '../types/StyledComponents';
import { theme } from '../components/theme';
import { ThemeProvider } from 'styled-components';
import SEOHead from '../components/SEOHead';
import ProfileHeader from '../components/ProfileHeader';
import ProfileSummary from '../components/ProfileSummary';
import SidebarLinks from '../components/SidebarLinks';

const ExperienceList = dynamic(
  () => import('../components/ExperiencesComponents'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const IndexPage: React.FC = () => (
  <div>
    <ThemeProvider theme={theme}>
      <Container>
        <SEOHead />

        <LeftColumn>
          <ProfileImage
            id='profile_image'
            src='/profile.png'
            alt='Profile Picture'
          />
          <SidebarLinks />
        </LeftColumn>
        <RightColumn>
          <ProfileHeader />
          <ProfileSummary />
          <ExperienceContainer id='experience_container'>
            <ExperienceList />
          </ExperienceContainer>
        </RightColumn>
      </Container>
    </ThemeProvider>
  </div>
);

export default IndexPage;
