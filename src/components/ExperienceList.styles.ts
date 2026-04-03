import styled from 'styled-components';

export const ExperienceContainer = styled.div`
  margin-top: 20px;
  padding: 8px 0 0;
`;

export const ExperienceItem = styled.div`
  margin-bottom: 18px;
  padding: 18px 32px 14px;
  box-sizing: border-box;
  border-radius: 14px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.colors.cardShadow};
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;

  @media (max-width: 1024px) {
    padding: 18px 26px 14px;
  }

  @media (max-width: 768px) {
    padding: 18px 18px 14px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
`;

export const CompanyLogoWrapper = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 5px;
  margin-top: 10px;
  border: 1px solid #cacaca;
  border-radius: 5px;
  overflow: hidden;
  background: ${props => props.theme.colors.card};
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }

  &:hover {
    box-shadow: 0px 8px 16px ${props => props.theme.colors.shadow};
    transform: translateY(-1px);
  }
`;

export const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  margin-bottom: 12px;

  .experience-date-range {
    font-size: 0.95em;
    color: #6b7280;
  }

  a.companyWebsite {
    text-decoration: none;
    color: inherit;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
  display: block;
  width: 100%;
  position: relative;
  padding-right: 22px;

  &::after {
    content: '▾';
    position: absolute;
    right: 0;
    top: 2px;
    font-size: 0.9rem;
    color: #6b7280;
    transition: transform 200ms ease;
  }

  &[aria-expanded='true']::after {
    transform: rotate(180deg);
  }
`;

export const ExperienceTitle = styled.h3`
  font-family: ${props => props.theme.font.heading};
  text-align: left;
  font-size: 1.16rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1px;

  @media (max-width: 768px) {
    font-size: 0.6em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const ExperienceCompany = styled.h3`
  font-family: ${props => props.theme.font.main};
  text-align: left;
  font-size: 0.92rem;
  color: #4b5563;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 0.4em;
  }

  a:hover & {
    color: ${props => props.theme.colors.highlight};
  }
`;

export const ExperienceDateRange = styled.h3`
  font-family: ${props => props.theme.font.main};
  text-align: left;
  font-size: 0.9rem;
  color: #6b7280;
  margin-left: 10px;
  letter-spacing: 0.01em;

  @media (max-width: 768px) {
    font-size: 0.4em;
  }
`;

export const ExperienceContent = styled.div`
  font-family: ${props => props.theme.font.main};
  text-align: left;
  font-size: 0.97rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.7;
  p {
    margin: 0 0 10px;
  }

  p:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    font-size: 0.9em;
    line-height: 1;
  }
`;

export const SeeMoreLink = styled.button`
  color: ${props => props.theme.colors.link};
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.highlight};
  }
`;
