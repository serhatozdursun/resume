import styled from 'styled-components';

export const ExplorationSection = styled.section`
  margin-top: 6px;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 14px;
  background: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.colors.cardShadow};
  padding: 16px 18px;

  @media (max-width: 768px) {
    padding: 14px 14px;
  }
`;

export const ExplorationHeading = styled.h2`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.3;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.heading};
`;

export const ExplorationList = styled.ul`
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 8px;
`;

export const ExplorationListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.88rem;
  line-height: 1.45;
  color: #4b5563;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    margin-top: 0.45em;
    border-radius: 999px;
    background: ${props => props.theme.colors.accent};
    flex-shrink: 0;
    opacity: 0.7;
  }
`;
