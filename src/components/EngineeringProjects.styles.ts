import styled from 'styled-components';

export const ProjectsSection = styled.section`
  margin-top: 8px;
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  box-shadow: ${props => props.theme.colors.cardShadow};
  padding: 30px 32px;

  @media (max-width: 1024px) {
    padding: 26px 26px;
  }

  @media (max-width: 768px) {
    padding: 22px 18px;
  }
`;

export const ProjectsEyebrow = styled.p`
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.sectionLabel};
`;

export const ProjectsTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 1.08rem;
  line-height: 1.35;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.heading};
`;

export const ProjectsLead = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #4b5563;
`;

export const ProjectsGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.article`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 12px;
  background: ${props => props.theme.colors.card};
  padding: 14px 14px 12px;
`;

export const ProjectName = styled.h3`
  margin: 0 0 6px;
  font-size: 0.98rem;
  line-height: 1.3;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.heading};
`;

export const ProjectDescription = styled.p`
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.45;
  color: #4b5563;
`;

export const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tag = styled.li`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 0.75rem;
  line-height: 1.2;
  color: #475569;
  background: ${props => props.theme.colors.primary};
`;

export const ProjectLink = styled.a`
  display: inline-block;
  margin-top: 12px;
  font-size: 0.86rem;
  font-weight: 600;
  color: ${props => props.theme.colors.link};
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.highlight};
    text-decoration: none;
  }
`;

export const ProjectLinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;

  ${ProjectLink} {
    margin-top: 0;
  }
`;
