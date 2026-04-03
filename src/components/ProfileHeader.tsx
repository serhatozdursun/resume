import React from 'react';
import Image from 'next/image';
import {
  Header,
  Name,
  IdentityTag,
  Title,
  IconWrapper,
  IconLink,
  IconImageWrapper,
  Info,
  BoldText,
  HeaderMeta,
} from './ProfileHeader.styles';
import { CommonLink } from './Layout.styles';
import { profile, socialLinks } from '../data/profile';
import type { TrackEventFn } from '../types/events';

interface ProfileHeaderProps {
  onTrackEvent?: TrackEventFn;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onTrackEvent }) => {
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

  return (
    <Header>
      <IdentityTag>Professional QA Portfolio</IdentityTag>
      <Name id='name'>{profile.name}</Name>
      <Title id='title'>
        {profile.title}
        <br />
        {profile.titleSubtitle}
        <br />
        {profile.titleExperience}
        <br />
      </Title>
      <IconWrapper id='iconWrapper'>
        {socialLinks.map(link => (
          <IconLink
            key={link.href}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='iconLink'
            onClick={() =>
              link.trackEvent &&
              trackEvent(
                link.trackEvent.event,
                link.trackEvent.category,
                link.trackEvent.label
              )
            }
          >
            <IconImageWrapper className='iconImage'>
              <Image
                src={link.icon}
                alt={link.alt}
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
              />
            </IconImageWrapper>
          </IconLink>
        ))}
      </IconWrapper>
      <HeaderMeta>
        <Info>
          <BoldText id='emailLabel'>Email</BoldText>:{' '}
          <CommonLink id='email' href={`mailto:${profile.email}`}>
            {profile.email}
          </CommonLink>
        </Info>
        <Info>
          <BoldText id='phoneLabel'>Phone</BoldText>:{' '}
          <CommonLink id='phone' href={`tel:${profile.phone}`}>
            {profile.phone}
          </CommonLink>
        </Info>
        <Info>
          <BoldText id='languages'>Languages</BoldText>: {profile.languages}
        </Info>
      </HeaderMeta>
    </Header>
  );
};

export default ProfileHeader;
