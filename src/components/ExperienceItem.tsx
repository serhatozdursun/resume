import React, { useState } from 'react';
import Image from 'next/image';
import HtmlParser from 'html-react-parser';
import type { ExperienceItem as ExperienceItemType } from '../data/experiences';
import {
  ExperienceHeader,
  ExperienceTitle,
  ExperienceCompany,
  ExperienceDateRange,
  ExperienceContent,
  SeeMoreLink,
  ExperienceItem,
  CompanyLogoWrapper,
  ToggleButton,
} from './ExperienceList.styles';

const ExperienceItemComponent: React.FC<ExperienceItemType> = ({
  title,
  description,
  company,
  dateRange,
  companyLogo,
  companyWebsite,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(prev => !prev);
  };

  const lastIndex: number = description.indexOf('</p>', 300);
  const descriptionToShow = showFullDescription
    ? description
    : description.slice(0, lastIndex);

  const companyLinkProps = {
    href: companyWebsite,
    target: '_blank' as const,
    rel: 'noopener noreferrer',
    className: 'companyWebsite',
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  };

  const textSectionStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  };

  const companyDateStyles = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '4px',
    marginTop: '1px',
  };

  return (
    <ExperienceItem>
      <ExperienceHeader className='experience-header'>
        <div style={containerStyles}>
          <a {...companyLinkProps}>
            <CompanyLogoWrapper className='companyLogo'>
              <Image
                src={companyLogo}
                alt={`${company} logo`}
                width={55}
                height={55}
                style={{ objectFit: 'contain' }}
              />
            </CompanyLogoWrapper>
          </a>

          <div style={textSectionStyles}>
            <ToggleButton
              type='button'
              onClick={toggleDescription}
              aria-expanded={showFullDescription}
              aria-label={`${title} — toggle description`}
              className='experience-toggle'
            >
              <ExperienceTitle className='experienceTitle'>
                {title}
              </ExperienceTitle>
            </ToggleButton>
            <div style={companyDateStyles}>
              <a {...companyLinkProps}>
                <ExperienceCompany>{company}</ExperienceCompany>
              </a>
              <span style={{ color: '#666' }}>—</span>
              <ExperienceDateRange className='experience-date-range'>
                {dateRange}
              </ExperienceDateRange>
            </div>
          </div>
        </div>
      </ExperienceHeader>
      <ExperienceContent className='experience-content'>
        {HtmlParser(descriptionToShow)}
        {description.length > 300 && (
          <SeeMoreLink
            type='button'
            onClick={toggleDescription}
            className='see-more-link'
            aria-expanded={showFullDescription}
          >
            {showFullDescription ? ' See less' : 'See more'}
          </SeeMoreLink>
        )}
      </ExperienceContent>
    </ExperienceItem>
  );
};

export default ExperienceItemComponent;
