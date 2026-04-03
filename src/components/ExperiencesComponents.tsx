import React from 'react';
import { ExperienceContainer } from './ExperienceList.styles';
import { experiences } from '../data/experiences';
import ExperienceItemComponent from './ExperienceItem';
import MotionReveal from './MotionReveal';

const ExperienceList: React.FC = () => {
  // Helper function to generate unique IDs
  const generateExperienceId = (company: string, title: string): string => {
    const cleanCompany = company.replace(/[\s,._]+/g, '_').toLowerCase();
    const cleanTitle = title.replace(/[\s,._]+/g, '_').toLowerCase();
    return `${cleanCompany}_${cleanTitle}`;
  };

  return (
    <ExperienceContainer>
      {experiences.map((experience, index) => (
        <MotionReveal key={index} delayMs={Math.min(index * 45, 220)}>
          <ExperienceItemComponent
            title={experience.title}
            description={experience.description}
            company={experience.company}
            dateRange={experience.dateRange}
            companyLogo={experience.companyLogo}
            companyWebsite={experience.companyWebsite}
            key={generateExperienceId(experience.company, experience.title)}
          />
        </MotionReveal>
      ))}
    </ExperienceContainer>
  );
};

export default ExperienceList;
