import styled from 'styled-components';

/* ─── Page shell ─────────────────────────────────────────────────────────── */

export const MentorshipShell = styled.main`
  flex: 1;
  min-width: 0;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 36px 28px 96px;
  font-family: ${props => props.theme.font.main};

  @media (max-width: 900px) {
    padding: 24px 18px 72px;
  }
`;

/* ─── Two-column grid ────────────────────────────────────────────────────── */

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 36px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`;

export const FormColumn = styled.div`
  position: sticky;
  top: 24px;

  @media (max-width: 960px) {
    position: static;
  }
`;

/* ─── Breadcrumb nav ─────────────────────────────────────────────────────── */

export const PageNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 0.875rem;
`;

export const BackLink = styled.a`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 180ms ease;

  &:hover {
    color: ${props => props.theme.colors.highlight};
    text-decoration: underline;
  }
`;

export const NavSep = styled.span`
  color: #d1d5db;
  user-select: none;
`;

export const NavCurrent = styled.span`
  color: #9ca3af;
`;

/* ─── Hero ───────────────────────────────────────────────────────────────── */

export const HeroSection = styled.section`
  padding: 4px 0 8px;
`;

export const HeroEyebrow = styled.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.sectionLabel};
`;

export const HeroTitle = styled.h1`
  margin: 0 0 16px;
  font-family: ${props => props.theme.font.heading};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.22;
  color: ${props => props.theme.colors.text};

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const HeroLead = styled.p`
  margin: 0 0 28px;
  font-size: 1.02rem;
  line-height: 1.72;
  color: #4b5563;
  max-width: 600px;
`;

export const HeroCta = styled.a`
  display: inline-block;
  background: ${props => props.theme.colors.accent};
  color: #fff;
  padding: 11px 26px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.94rem;
  transition:
    background 200ms ease,
    transform 200ms ease,
    box-shadow 200ms ease;

  &:hover {
    background: ${props => props.theme.colors.highlight};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.22);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 3px;
  }
`;

/* ─── Content card (margin-free variant of SectionFrame) ────────────────── */

export const ContentCard = styled.section`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  box-shadow: ${props => props.theme.colors.cardShadow};
  padding: 28px 30px;

  @media (max-width: 768px) {
    padding: 22px 18px;
  }
`;

export const CardEyebrow = styled.p`
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.sectionLabel};
`;

export const CardTitle = styled.h2`
  margin: 0 0 18px;
  font-family: ${props => props.theme.font.heading};
  font-size: 1.08rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

/* ─── Bullet list ────────────────────────────────────────────────────────── */

export const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${props => props.theme.colors.text};

  &::before {
    content: '→';
    color: ${props => props.theme.colors.accent};
    flex-shrink: 0;
    font-weight: 700;
    margin-top: 1px;
  }
`;

/* ─── Topic grid (What I can help with) ─────────────────────────────────── */

export const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const TopicCard = styled.div`
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 16px 16px 14px;
  transition:
    border-color 200ms ease,
    box-shadow 200ms ease;

  &:hover {
    border-color: #93c5fd;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
  }
`;

export const TopicTitle = styled.h3`
  margin: 0 0 5px;
  font-family: ${props => props.theme.font.heading};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
`;

export const TopicDesc = styled.p`
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.5;
  color: #4b5563;
`;

/* ─── Step list (How it works) ───────────────────────────────────────────── */

export const StepList = styled.ol`
  list-style: none;
  counter-reset: mentorship-step;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StepItem = styled.li`
  counter-increment: mentorship-step;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${props => props.theme.colors.text};

  &::before {
    content: counter(mentorship-step);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent};
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const StepNote = styled.p`
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.6;
  color: #6b7280;
  padding: 12px 14px;
  background: ${props => props.theme.colors.primary};
  border-left: 3px solid ${props => props.theme.colors.secondary};
  border-radius: 0 6px 6px 0;
`;

/* ─── Form panel ─────────────────────────────────────────────────────────── */

export const FormPanel = styled.div`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  box-shadow: ${props => props.theme.colors.cardShadow};
  padding: 28px 26px 32px;
`;

export const FormPanelTitle = styled.h2`
  margin: 0 0 4px;
  font-family: ${props => props.theme.font.heading};
  font-size: 1.08rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

export const FormPanelSubtitle = styled.p`
  margin: 0 0 18px;
  font-size: 0.86rem;
  color: #6b7280;
  line-height: 1.5;
`;

export const FormHelperBlock = styled.div`
  margin-bottom: 20px;
  padding: 12px 14px;
  background: ${props => props.theme.colors.primary};
  border-left: 3px solid ${props => props.theme.colors.accent};
  border-radius: 0 6px 6px 0;
  font-size: 0.86rem;
  color: #4b5563;
  line-height: 1.6;

  strong {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${props => props.theme.colors.text};
    margin-bottom: 7px;
  }

  ul {
    margin: 0;
    padding-left: 16px;
  }

  li {
    margin-bottom: 2px;
  }
`;

export const MentorshipFormEl = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
`;

export const FaqItem = styled.details`
  border-bottom: 1px solid ${props => props.theme.colors.secondary};

  &:last-child {
    border-bottom: none;
  }

  &[open] > summary::after {
    content: '−';
  }
`;

export const FaqQuestion = styled.summary`
  padding: 14px 16px;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: color 150ms ease;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '+';
    font-size: 1.1rem;
    font-weight: 400;
    color: ${props => props.theme.colors.accent};
    flex-shrink: 0;
  }

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: -2px;
  }
`;

export const FaqAnswer = styled.p`
  margin: 0;
  padding: 0 16px 16px;
  font-size: 0.88rem;
  line-height: 1.65;
  color: #4b5563;
`;
