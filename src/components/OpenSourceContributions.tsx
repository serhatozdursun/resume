import React from 'react';
import { openSourceContributions } from '../data/contributions';
import {
  ProjectCard,
  ProjectDescription,
  ProjectLink,
  ProjectName,
  ProjectsEyebrow,
  ProjectsGrid,
  ProjectsLead,
  ProjectsSection,
  ProjectsTitle,
  Tag,
  TagList,
} from './EngineeringProjects.styles';

const OpenSourceContributions: React.FC = () => {
  return (
    <ProjectsSection aria-label='Open source contributions'>
      <ProjectsEyebrow>Open Source Contributions</ProjectsEyebrow>
      <ProjectsTitle>Ecosystem Contributions</ProjectsTitle>
      <ProjectsLead>
        Visible contributions and exploration across well-known test automation
        ecosystems.
      </ProjectsLead>
      <ProjectsGrid>
        {openSourceContributions.map(contribution => (
          <ProjectCard key={contribution.title}>
            <ProjectName>{contribution.title}</ProjectName>
            <ProjectDescription>{contribution.description}</ProjectDescription>
            <TagList aria-label={`${contribution.title} technologies`}>
              {contribution.techTags.map(tag => (
                <Tag key={`${contribution.title}-${tag}`}>{tag}</Tag>
              ))}
            </TagList>
            <ProjectLink
              href={contribution.repository}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${contribution.title} repository`}
            >
              View Repository
            </ProjectLink>
            {contribution.contributionGraph && (
              <ProjectLink
                href={contribution.contributionGraph}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${contribution.title} contribution graph`}
              >
                Contribution Graph
              </ProjectLink>
            )}
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default OpenSourceContributions;
