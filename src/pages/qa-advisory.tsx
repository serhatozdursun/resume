import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import { Container } from '../components/Layout.styles';
import MotionReveal from '../components/MotionReveal';
import AdvisoryContactForm from '../components/AdvisoryContactForm';
import {
  MentorshipShell,
  PageGrid,
  ContentColumn,
  FormColumn,
  PageNav,
  BackLink,
  NavSep,
  NavCurrent,
  HeroSection,
  HeroEyebrow,
  HeroTitle,
  HeroLead,
  HeroCta,
  HeroCtaRow,
  HeroCtaSecondary,
  ContentCard,
  CardEyebrow,
  CardTitle,
  BulletList,
  BulletItem,
  TopicGrid,
  TopicCard,
  TopicTitle,
  TopicDesc,
} from '../components/Mentorship.styles';
import {
  qaAdvisoryMeta,
  qaAdvisoryHero,
  qaAdvisoryWhoFor,
  qaAdvisoryServiceAreas,
  qaAdvisoryChallenges,
  qaAdvisoryOutcomes,
  qaAdvisoryCredibility,
} from '../data/qaAdvisory';
import { env } from '../utils/env';

const QaAdvisoryPage: React.FC = () => {
  const siteUrl = env.SITE_URL.replace(/\/$/, '');
  const pageUrl = `${siteUrl}/qa-advisory`;
  const { title: pageTitle, description: pageDesc } = qaAdvisoryMeta;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{pageTitle}</title>
        <meta name='description' content={pageDesc} />
        <link rel='canonical' href={pageUrl} />
        <meta name='robots' content='index, follow' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDesc} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={pageUrl} />
        <meta property='og:image' content={`${siteUrl}/profile.png`} />
        <meta property='og:site_name' content='Serhat Ozdursun' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDesc} />
        <meta name='twitter:image' content={`${siteUrl}/profile.png`} />
      </Head>

      <Container>
        <MentorshipShell>
          <PageNav aria-label='Breadcrumb'>
            <BackLink href='/'>← Home</BackLink>
            <NavSep aria-hidden='true'>/</NavSep>
            <NavCurrent aria-current='page'>
              Quality engineering advisory
            </NavCurrent>
          </PageNav>

          <PageGrid>
            <ContentColumn>
              <MotionReveal>
                <HeroSection aria-labelledby='qa-advisory-hero-title'>
                  <HeroEyebrow>{qaAdvisoryHero.eyebrow}</HeroEyebrow>
                  <HeroTitle id='qa-advisory-hero-title'>
                    {qaAdvisoryHero.title}
                  </HeroTitle>
                  <HeroLead>{qaAdvisoryHero.subtitle}</HeroLead>
                  <HeroLead>{qaAdvisoryHero.supporting}</HeroLead>
                  <HeroCtaRow style={{ marginTop: '8px' }}>
                    <HeroCta href={qaAdvisoryHero.primaryCtaHref}>
                      {qaAdvisoryHero.primaryCtaLabel}
                    </HeroCta>
                    <HeroCtaSecondary href={qaAdvisoryHero.secondaryCtaHref}>
                      {qaAdvisoryHero.secondaryCtaLabel}
                    </HeroCtaSecondary>
                  </HeroCtaRow>
                </HeroSection>
              </MotionReveal>

              <MotionReveal delayMs={50}>
                <ContentCard aria-labelledby='who-for-heading'>
                  <CardEyebrow>Audience</CardEyebrow>
                  <CardTitle id='who-for-heading'>Who this is for</CardTitle>
                  <BulletList>
                    {qaAdvisoryWhoFor.map(line => (
                      <BulletItem key={line}>{line}</BulletItem>
                    ))}
                  </BulletList>
                </ContentCard>
              </MotionReveal>

              <MotionReveal delayMs={70}>
                <ContentCard aria-labelledby='services-heading'>
                  <CardEyebrow>Engagement areas</CardEyebrow>
                  <CardTitle id='services-heading'>What I help with</CardTitle>
                  <TopicGrid>
                    {qaAdvisoryServiceAreas.map(area => (
                      <TopicCard key={area.title}>
                        <TopicTitle>{area.title}</TopicTitle>
                        <TopicDesc>{area.desc}</TopicDesc>
                      </TopicCard>
                    ))}
                  </TopicGrid>
                </ContentCard>
              </MotionReveal>

              <MotionReveal delayMs={90}>
                <ContentCard aria-labelledby='challenges-heading'>
                  <CardEyebrow>Common situations</CardEyebrow>
                  <CardTitle id='challenges-heading'>
                    Typical challenges
                  </CardTitle>
                  <BulletList>
                    {qaAdvisoryChallenges.map(line => (
                      <BulletItem key={line}>{line}</BulletItem>
                    ))}
                  </BulletList>
                </ContentCard>
              </MotionReveal>

              <MotionReveal delayMs={110}>
                <ContentCard aria-labelledby='outcomes-heading'>
                  <CardEyebrow>Results</CardEyebrow>
                  <CardTitle id='outcomes-heading'>
                    Outcomes you can expect
                  </CardTitle>
                  <BulletList>
                    {qaAdvisoryOutcomes.map(line => (
                      <BulletItem key={line}>{line}</BulletItem>
                    ))}
                  </BulletList>
                </ContentCard>
              </MotionReveal>

              <MotionReveal delayMs={130}>
                <ContentCard aria-labelledby='why-heading'>
                  <CardEyebrow>Experience</CardEyebrow>
                  <CardTitle id='why-heading'>Why work with me</CardTitle>
                  <BulletList>
                    {qaAdvisoryCredibility.map(line => (
                      <BulletItem key={line}>{line}</BulletItem>
                    ))}
                  </BulletList>
                </ContentCard>
              </MotionReveal>
            </ContentColumn>

            <FormColumn>
              <MotionReveal delayMs={40}>
                <AdvisoryContactForm />
              </MotionReveal>
            </FormColumn>
          </PageGrid>
        </MentorshipShell>
      </Container>
    </ThemeProvider>
  );
};

export default QaAdvisoryPage;
