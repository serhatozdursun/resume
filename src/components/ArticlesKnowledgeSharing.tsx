import React from 'react';
import { knowledgeArticles } from '../data/articles';
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

const ArticlesKnowledgeSharing: React.FC = () => {
  return (
    <ProjectsSection aria-label='Articles and knowledge sharing'>
      <ProjectsEyebrow>Articles &amp; Knowledge Sharing</ProjectsEyebrow>
      <ProjectsTitle>Thought Leadership in QA and AI</ProjectsTitle>
      <ProjectsLead>
        Practical writing focused on QA engineering, delivery risk, and
        AI-driven quality strategy.
      </ProjectsLead>
      <ProjectsGrid>
        {knowledgeArticles.map(article => (
          <ProjectCard key={article.title}>
            <ProjectName>{article.title}</ProjectName>
            <ProjectDescription>{article.description}</ProjectDescription>
            <TagList aria-label={`${article.title} topics`}>
              {article.topicTags.map(tag => (
                <Tag key={`${article.title}-${tag}`}>{tag}</Tag>
              ))}
            </TagList>
            <ProjectLink
              href={article.link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${article.title} article link`}
            >
              Read Article
            </ProjectLink>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default ArticlesKnowledgeSharing;
