import styled, { css } from 'styled-components';
import Link from 'next/link';

export const Container = styled.div`
  position: relative;
  display: flex;
  max-width: 100%;
  margin: 0;
  font-family: ${props => props.theme.font.main};
  background:
    radial-gradient(circle at 10% 10%, #ffffff 0%, transparent 45%),
    radial-gradient(circle at 90% 5%, #f1f5f9 0%, transparent 40%),
    ${props => props.theme.colors.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const LeftColumn = styled.div<{ $mobileExpanded?: boolean }>`
  width: 300px;
  max-width: 300px;
  padding-top: 40px;
  padding-right: 20px;
  /* Both axes must stay visible: overflow-x:hidden forces overflow-y to compute to auto
     (CSS Overflow 3), which makes this a scroll container and breaks viewport sticky. */
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  align-self: stretch;
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 18px;
  box-shadow: ${props => props.theme.colors.cardShadow};
  padding-bottom: 24px;
  gap: 24px;

  @media (max-width: 768px) {
    overflow: visible;
    height: auto;
    padding: 10px 10px 8px;
    width: 100%;
    max-width: 100%;
    gap: 10px;
  }
`;

/** Flow shell for Skills; desktop pinning is handled by `SkillsPinDesktop`. */
export const SkillsStickySection = styled.div`
  position: static;
  align-self: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    position: static;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  min-width: 0;
  padding-left: 28px;
  padding-right: 36px;
  padding-top: 12px;

  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0;
  }
`;

export const MainContentStack = styled.div`
  width: 100%;
  max-width: none;
  margin: 0;
  display: grid;
  gap: 16px;
`;

export const SummaryContainer = styled.span`
  display: block;
  box-sizing: border-box;
  font-size: 1.05rem;
  line-height: 1.72;
  text-align: left;
  width: 100%;
  max-width: none;
  padding: 30px 32px;
  color: ${({ theme }) => theme.colors.text};
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  box-shadow: ${props => props.theme.colors.cardShadow};

  &::before {
    content: 'Executive Summary';
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.sectionLabel};
    margin-bottom: 12px;
  }

  p {
    margin: 0 0 12px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 1024px) {
    padding: 26px 26px;
    line-height: 1.68;
  }

  @media (max-width: 768px) {
    padding: 22px 18px;
    font-size: 0.96rem;
    line-height: 1.62;
  }
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 2px solid #7b7b7b;
  object-fit: cover;
  margin-left: 20px;
  background-color: ${props => props.theme.colors.secondary};
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  @media (max-width: 768px) {
    width: 100px;
    height: 120px;
    margin-left: 0;
    margin-top: 10px;
  }

  &:hover {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.18);
    transform: scale(1.04);
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 200px;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.colors.secondary};
  margin-left: 20px;
  background-color: ${props => props.theme.colors.secondary};
  position: relative;
  z-index: 1;
  display: block;
  flex-shrink: 0;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  @media (max-width: 768px) {
    display: none;
    width: 82px;
    height: 106px;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

export const MobileSidebarHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 12px;
    background: ${props => props.theme.colors.primary};
  }
`;

export const MobileProfileThumb = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 52px;
    height: 68px;
    border-radius: 10px;
    overflow: hidden;
    background: ${props => props.theme.colors.card};
    border: 1px solid ${props => props.theme.colors.secondary};
    flex-shrink: 0;
  }
`;

export const MobileSidebarIdentity = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    min-width: 0;
    flex: 1;
  }
`;

export const MobileSidebarName = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MobileSidebarTitle = styled.div`
  margin-top: 2px;
  font-size: 0.76rem;
  line-height: 1.2;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MobileSidebarToggle = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 10px;
    background: ${props => props.theme.colors.card};
    color: ${props => props.theme.colors.text};
    width: 34px;
    height: 34px;
    cursor: pointer;
    font-size: 1.05rem;
    line-height: 1;
  }
`;

export const LeftColumnExpandable = styled.div<{ $mobileExpanded: boolean }>`
  @media (max-width: 768px) {
    overflow: hidden;
    transition:
      max-height 260ms ease,
      opacity 220ms ease;
    max-height: ${({ $mobileExpanded }) => ($mobileExpanded ? '3800px' : '0')};
    opacity: ${({ $mobileExpanded }) => ($mobileExpanded ? 1 : 0)};
    pointer-events: ${({ $mobileExpanded }) =>
      $mobileExpanded ? 'auto' : 'none'};
  }
`;

export const sidebarItemCardStyles = css`
  margin-top: 10px;
  display: flex;
  margin-left: 20px;
  align-items: center;
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 10px 12px;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
    border-color: #cbd5e1;
  }
`;

export const LeftColumnLinkContainer = styled.li`
  ${sidebarItemCardStyles}
`;

export const CommonLink = styled(Link)`
  color: ${props => props.theme.colors.link};
  cursor: pointer;
  text-decoration: underline;
  display: block;
  text-align: left;
  margin-right: auto;
  margin-left: 10px;
  font-weight: 500;
  line-height: 1.35;
  transition: color 220ms ease;
  @media (min-width: 768px) {
    display: inline;
  }

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.highlight};
  }
`;

export const BadgeWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
`;

export const SidebarSectionLabel = styled.div`
  margin: 0 0 14px 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.sectionLabel};
`;

export const SidebarHint = styled.p`
  margin: 0 20px 8px;
  font-size: 0.82rem;
  line-height: 1.4;
  color: #6b7280;
`;

export const SidebarGroupCard = styled.section`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 14px;
  background: ${props => props.theme.colors.card};
  padding: 12px 12px 10px;
  margin: 0 10px 32px;
  box-shadow: ${props => props.theme.colors.cardShadow};

  @media (max-width: 768px) {
    margin: 0 0 12px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionFrame = styled.section`
  margin-top: 18px;
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  box-shadow: ${props => props.theme.colors.cardShadow};
  padding: 30px 32px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 26px 26px;
  }

  @media (max-width: 768px) {
    padding: 22px 18px;
  }
`;

export const SectionEyebrow = styled.p`
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.sectionLabel};
`;

export const SectionHeading = styled.h2`
  margin: 0 0 8px;
  font-size: 1.08rem;
  line-height: 1.35;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.heading};
`;

export const SectionLead = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #4b5563;
`;

export const CtaGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  align-items: stretch;
  height: 100%;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const CtaCard = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 12px;
  height: 80px;
  margin-top: 1px;
  background: ${props => props.theme.colors.card};
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    border-color: #cbd5e1;
  }
`;

export const CtaTitle = styled.span`
  display: block;
  font-weight: 700;
  margin-top: 20px;
  margin-left: 20px;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 3px;
  font-size: 0.92rem;
`;

export const CtaText = styled.span`
  display: block;
  margin-left: 20px;
  font-size: 0.84rem;
  line-height: 1.35;
  color: #4b5563;
`;
