import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  LeftColumnLinkContainer,
  BadgeWrapper,
  CertificateTitle,
  CommonLink,
} from '../types/StyledComponents';
import { sidebarLinks } from '../data/profile';

const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const CertificatesComponents = dynamic(
  () => import('./CertificatesComponents'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const SkillsComponents = dynamic(
  () => import('./SkillsComponents').then(mod => mod.SkillsComponents),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export type TrackEventFn = (
  event: string,
  eventCategory: string,
  eventLabel: string
) => void;

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

  const resumeAndAtsqaLinks = sidebarLinks.slice(0, 3);
  const practiceAndExamLinks = sidebarLinks.slice(3);

  return (
    <>
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
            <Image src={link.icon} alt={link.iconAlt} width={28} height={28} />
          </BadgeWrapper>
          <CommonLink
            id={link.id}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={
              link.href.startsWith('http') ? 'noopener noreferrer' : undefined
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

      <ContactForm />

      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <CertificateTitle id='qaHelpLabel'>QA Help</CertificateTitle>
      </div>

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

      <CertificatesComponents />
      <SkillsComponents />
    </>
  );
};

export default SidebarLinks;
