import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  LeftColumnLinkContainer,
  BadgeWrapper,
  CommonLink,
  SidebarList,
  SidebarSectionLabel,
  SidebarGroupCard,
  SidebarHint,
} from './Layout.styles';
import { SkillsPinDesktop } from './SkillsPinDesktop';
import { sidebarLinks } from '../data/profile';
import type { TrackEventFn } from '../types/events';
import MotionReveal from './MotionReveal';

const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => (
    <div
      style={{ minHeight: '48px' }}
      aria-busy='true'
      aria-label='Loading contact form'
    />
  ),
});

const CertificatesComponents = dynamic(
  () => import('./CertificatesComponents'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ minHeight: '380px' }}
        aria-busy='true'
        aria-label='Loading certificates'
      />
    ),
  }
);
const SkillsComponents = dynamic(
  () => import('./SkillsComponents').then(mod => mod.SkillsComponents),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ minHeight: '520px' }}
        aria-busy='true'
        aria-label='Loading skills'
      />
    ),
  }
);

interface SidebarLinksProps {
  onTrackEvent?: TrackEventFn;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ onTrackEvent }) => {
  const trackEvent: TrackEventFn = (event, eventCategory, eventLabel) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: 1,
      });
    }
    onTrackEvent?.(event, eventCategory, eventLabel);
  };

  const resumeAndAtsqaLinks = sidebarLinks.slice(0, 4);
  const practiceAndExamLinks = sidebarLinks.slice(4);

  return (
    <>
      <MotionReveal>
        <SidebarGroupCard aria-label='Profile and utility links'>
          <SidebarSectionLabel>Profile &amp; Utility</SidebarSectionLabel>
          <SidebarList>
            {resumeAndAtsqaLinks.map(link => (
              <LeftColumnLinkContainer
                key={link.id}
                className='leftColumnLinkContainer'
              >
                <BadgeWrapper
                  className={
                    link.id === 'downloadResumeLink' || link.id === 'goAtsqa'
                      ? 'badgeImage'
                      : undefined
                  }
                >
                  <Image
                    src={link.icon}
                    alt={link.iconAlt}
                    width={28}
                    height={28}
                  />
                </BadgeWrapper>
                <CommonLink
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  title={link.title}
                  onClick={() =>
                    link.trackEvent &&
                    trackEvent(
                      link.trackEvent.event,
                      link.trackEvent.category,
                      link.trackEvent.label
                    )
                  }
                >
                  {link.label}
                </CommonLink>
              </LeftColumnLinkContainer>
            ))}
          </SidebarList>
          <ContactForm />
        </SidebarGroupCard>
      </MotionReveal>

      <MotionReveal delayMs={60}>
        <SidebarGroupCard aria-label='QA help links'>
          <SidebarSectionLabel id='qaHelpLabel'>QA Help</SidebarSectionLabel>
          <SidebarHint>
            Curated hands-on resources for QA engineers, including automation
            practice and ISTQB sample exam pages.
          </SidebarHint>
          <SidebarList>
            {practiceAndExamLinks.map(link => (
              <LeftColumnLinkContainer
                key={link.id}
                className='leftColumnLinkContainer'
              >
                <BadgeWrapper>
                  <Image
                    src={link.icon}
                    alt={link.iconAlt}
                    width={link.id.includes('Exam') ? 29 : 28}
                    height={link.id.includes('Exam') ? 29 : 28}
                  />
                </BadgeWrapper>
                <CommonLink id={link.id} href={link.href}>
                  {link.label}
                </CommonLink>
              </LeftColumnLinkContainer>
            ))}
          </SidebarList>
        </SidebarGroupCard>
      </MotionReveal>

      <MotionReveal delayMs={110}>
        <SidebarGroupCard aria-label='Certificates and achievements'>
          <SidebarSectionLabel>
            Certificates &amp; Achievements
          </SidebarSectionLabel>
          <CertificatesComponents hideSectionTitle />
        </SidebarGroupCard>
      </MotionReveal>
      <SkillsPinDesktop>
        <MotionReveal delayMs={150}>
          <SidebarGroupCard aria-label='Skills and proficiency'>
            <SidebarSectionLabel>Skills</SidebarSectionLabel>
            <SkillsComponents hideSectionTitle />
          </SidebarGroupCard>
        </MotionReveal>
      </SkillsPinDesktop>
    </>
  );
};

export default SidebarLinks;
