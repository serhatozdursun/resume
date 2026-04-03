import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import { Container } from '../components/Layout.styles';
import MotionReveal from '../components/MotionReveal';
import MentorshipContactForm from '../components/MentorshipContactForm';
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
  ContentCard,
  CardEyebrow,
  CardTitle,
  BulletList,
  BulletItem,
  TopicGrid,
  TopicCard,
  TopicTitle,
  TopicDesc,
  StepList,
  StepItem,
  StepNote,
  FaqList,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
} from '../components/Mentorship.styles';

const TOPICS = [
  {
    title: 'Career Planning',
    desc: 'A clear, honest path from where you are today to where you want to be — without wasting time on the wrong things.',
  },
  {
    title: 'Test Automation Roadmap',
    desc: 'Tool selection, framework fundamentals, and a learning sequence built around your real tech stack and goals.',
  },
  {
    title: 'CV & LinkedIn Review',
    desc: 'Position your QA experience so recruiters and hiring managers immediately understand your value.',
  },
  {
    title: 'Interview Preparation',
    desc: 'Practice real technical and behavioral QA interview questions, including live coding and scenario-based exercises.',
  },
  {
    title: 'AI in QA',
    desc: 'Practical introduction to AI-assisted test design, test maintenance, and QA workflows using real examples.',
  },
  {
    title: 'International Applications',
    desc: 'Understand how remote interview processes work at international companies and how to navigate them successfully.',
  },
] as const;

const PAGE_TITLE =
  'QA Mentorship & Test Automation Career Guidance | Serhat Ozdursun';
const PAGE_DESC =
  'Personalized QA mentorship for engineers who want to enter software testing, move into test automation, improve CV/LinkedIn, and prepare for technical interviews.';
const SITE_URL = 'https://serhatozdursun.com';

const FAQS = [
  {
    q: 'How do I get my first job in QA with no prior experience?',
    a: 'Start by understanding the fundamentals of software testing — what a bug is, how test cases are written, and how the QA process fits into a development cycle. Build a small portfolio by testing publicly available web apps and documenting your findings. A structured learning plan and a targeted CV matters more than certifications at the entry level.',
  },
  {
    q: 'How long does it take to move into test automation?',
    a: 'With consistent effort, most manual testers can start writing basic automation scripts within 2–3 months. Becoming genuinely proficient in a framework — one that you could maintain in a real team — typically takes 6–12 months. The most important factor is choosing a language and tool that matches the stack you are targeting, not the one that looks most impressive on paper.',
  },
  {
    q: 'What should I expect in a technical QA interview?',
    a: 'Technical QA interviews typically combine test case design, automation code exercises (writing or reviewing a script), tool-specific questions (Selenium, Appium, Postman, etc.), and scenario-based questions about CI/CD integration and test strategy. Senior-level interviews also assess risk thinking, test coverage decisions, and how you have influenced quality processes at team level.',
  },
  {
    q: 'How can a CV and LinkedIn review actually help me as a QA engineer?',
    a: 'Most QA CVs under-represent impact. Instead of listing tools and responsibilities, a strong QA CV quantifies outcomes — defect detection rates, time saved, coverage improvements, or CI/CD changes you drove. A focused review realigns your wording so that both recruiter keyword scans and technical hiring managers immediately see your value.',
  },
  {
    q: 'Do I need a programming background to get into test automation?',
    a: 'No, but you need to be comfortable learning the basics of one language. Python is the gentlest entry point for most testers. What matters more than prior programming experience is the willingness to read code, write simple functions, and debug failing tests. Automation is a skill you build incrementally, not something you either have or do not have.',
  },
] as const;

const MentorshipPage: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>{PAGE_TITLE}</title>
      <meta name='description' content={PAGE_DESC} />
      <link rel='canonical' href={`${SITE_URL}/mentorship`} />
      <meta name='robots' content='index, follow' />

      {/* OpenGraph — LinkedIn and general sharing */}
      <meta property='og:title' content={PAGE_TITLE} />
      <meta property='og:description' content={PAGE_DESC} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${SITE_URL}/mentorship`} />
      <meta property='og:image' content={`${SITE_URL}/profile.png`} />
      <meta property='og:site_name' content='Serhat Ozdursun' />

      {/* Twitter / X card */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={PAGE_TITLE} />
      <meta name='twitter:description' content={PAGE_DESC} />
      <meta name='twitter:image' content={`${SITE_URL}/profile.png`} />
    </Head>

    <Container>
      <MentorshipShell>
        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <PageNav aria-label='Breadcrumb'>
          <BackLink href='/'>← Home</BackLink>
          <NavSep aria-hidden='true'>/</NavSep>
          <NavCurrent aria-current='page'>QA Mentorship</NavCurrent>
        </PageNav>

        <PageGrid>
          {/* ── Left column: content ──────────────────────────────────── */}
          <ContentColumn>
            {/* Hero */}
            <MotionReveal>
              <HeroSection aria-labelledby='page-title'>
                <HeroEyebrow>Limited 1-on-1 Availability</HeroEyebrow>
                <HeroTitle id='page-title'>
                  QA Mentorship &amp; Career Guidance
                </HeroTitle>
                <HeroLead>
                  Personalized support for people who want to get into QA, move
                  into test automation, sharpen their CV and interview skills,
                  and grow toward international opportunities — at their own
                  pace.
                </HeroLead>
                <HeroCta href='#contact'>Get in touch</HeroCta>
              </HeroSection>
            </MotionReveal>

            {/* Who this is for */}
            <MotionReveal delayMs={60}>
              <ContentCard aria-labelledby='who-heading'>
                <CardEyebrow>Is this right for you?</CardEyebrow>
                <CardTitle id='who-heading'>
                  Who This Mentorship Is For
                </CardTitle>
                <BulletList>
                  <BulletItem>
                    People trying to get their first job in QA
                  </BulletItem>
                  <BulletItem>
                    Manual testers who want to move into test automation
                  </BulletItem>
                  <BulletItem>
                    QA engineers who need a structured, honest learning roadmap
                  </BulletItem>
                  <BulletItem>
                    Anyone preparing for technical interviews at international
                    companies
                  </BulletItem>
                  <BulletItem>
                    People targeting remote or international QA roles
                  </BulletItem>
                  <BulletItem>
                    Anyone unsure where to start with AI-assisted QA workflows
                  </BulletItem>
                </BulletList>
              </ContentCard>
            </MotionReveal>

            {/* What I can help with */}
            <MotionReveal delayMs={90}>
              <ContentCard aria-labelledby='what-heading'>
                <CardEyebrow>Areas of support</CardEyebrow>
                <CardTitle id='what-heading'>
                  What I Can Help You With
                </CardTitle>
                <TopicGrid>
                  {TOPICS.map(topic => (
                    <TopicCard key={topic.title}>
                      <TopicTitle>{topic.title}</TopicTitle>
                      <TopicDesc>{topic.desc}</TopicDesc>
                    </TopicCard>
                  ))}
                </TopicGrid>
              </ContentCard>
            </MotionReveal>

            {/* How it works */}
            <MotionReveal delayMs={110}>
              <ContentCard aria-labelledby='how-heading'>
                <CardEyebrow>The process</CardEyebrow>
                <CardTitle id='how-heading'>How the Mentorship Works</CardTitle>
                <StepList>
                  <StepItem>
                    Send me a message with your background, the area you want to
                    focus on, and your main goal.
                  </StepItem>
                  <StepItem>
                    I review your situation and suggest a realistic starting
                    point — no generic advice.
                  </StepItem>
                  <StepItem>
                    We define a flexible plan based on your current level and
                    where you want to go.
                  </StepItem>
                  <StepItem>
                    Regular touchpoints at a pace and format that fits your
                    schedule and learning style.
                  </StepItem>
                </StepList>
                <StepNote>
                  This is limited-capacity support — I keep the number of people
                  I work with small so each person gets proper attention. Your
                  first message should include your QA experience level, your
                  target area, and your main goal so I can assess fit quickly.
                </StepNote>
              </ContentCard>
            </MotionReveal>

            {/* Why me */}
            <MotionReveal delayMs={130}>
              <ContentCard aria-labelledby='why-heading'>
                <CardEyebrow>Background</CardEyebrow>
                <CardTitle id='why-heading'>About Your Mentor</CardTitle>
                <BulletList>
                  <BulletItem>
                    13+ years in QA and Test Automation across web, mobile, and
                    API layers
                  </BulletItem>
                  <BulletItem>
                    Framework setup and CI/CD integration — Jenkins, GitHub
                    Actions, Azure DevOps
                  </BulletItem>
                  <BulletItem>
                    AI-assisted QA workflows integrated into real production
                    pipelines
                  </BulletItem>
                  <BulletItem>
                    ISTQB® certified — CTAL-TM v3.0, CTAL-TAE, CTFL &amp;
                    Scrum.org PSD I
                  </BulletItem>
                  <BulletItem>
                    AT*SQA Advisory Board 2026 – Emerging Leaders
                  </BulletItem>
                  <BulletItem>
                    International interview experience on both sides of the
                    table — hiring and being hired at companies in the US, UK,
                    and Europe
                  </BulletItem>
                </BulletList>
              </ContentCard>
            </MotionReveal>

            {/* FAQ */}
            <MotionReveal delayMs={150}>
              <ContentCard aria-labelledby='faq-heading'>
                <CardEyebrow>Common questions</CardEyebrow>
                <CardTitle id='faq-heading'>
                  Frequently Asked Questions
                </CardTitle>
                <FaqList>
                  {FAQS.map(({ q, a }) => (
                    <FaqItem key={q}>
                      <FaqQuestion>{q}</FaqQuestion>
                      <FaqAnswer>{a}</FaqAnswer>
                    </FaqItem>
                  ))}
                </FaqList>
              </ContentCard>
            </MotionReveal>
          </ContentColumn>

          {/* ── Right column: always-visible form ────────────────────── */}
          <FormColumn>
            <MotionReveal delayMs={40}>
              <MentorshipContactForm />
            </MotionReveal>
          </FormColumn>
        </PageGrid>
      </MentorshipShell>
    </Container>
  </ThemeProvider>
);

export default MentorshipPage;
