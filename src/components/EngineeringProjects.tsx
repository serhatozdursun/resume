import React from 'react';
import { engineeringProjects } from '../data/projects';
import {
  ProjectCard,
  ProjectDescription,
  ProjectLink,
  ProjectLinksRow,
  ProjectName,
  ProjectsEyebrow,
  ProjectsGrid,
  ProjectsLead,
  ProjectsSection,
  ProjectsTitle,
  Tag,
  TagList,
} from './EngineeringProjects.styles';

const EngineeringProjects: React.FC = () => {
  return (
    <ProjectsSection aria-label='Engineering projects showcase'>
      <ProjectsEyebrow>Engineering Projects</ProjectsEyebrow>
      <ProjectsTitle>Real Engineering Work</ProjectsTitle>
      <ProjectsLead>
        Hands-on projects that demonstrate practical architecture, QA
        discipline, and engineering execution.
      </ProjectsLead>
      <ProjectsGrid>
        {engineeringProjects.map(project => (
          <ProjectCard key={project.title}>
            <ProjectName>{project.title}</ProjectName>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TagList aria-label={`${project.title} technologies`}>
              {project.techTags.map(tag => (
                <Tag key={`${project.title}-${tag}`}>{tag}</Tag>
              ))}
            </TagList>
            <ProjectLinksRow>
              <ProjectLink
                href={project.repository}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${project.title} repository`}
              >
                View Repository
              </ProjectLink>
              {project.supportLink ? (
                <ProjectLink
                  href={project.supportLink.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${project.title} ${project.supportLink.label}`}
                >
                  {project.supportLink.label}
                </ProjectLink>
              ) : null}
            </ProjectLinksRow>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default EngineeringProjects;
