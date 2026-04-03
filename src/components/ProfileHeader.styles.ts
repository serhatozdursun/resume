import styled from 'styled-components';

export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  background: ${props => props.theme.colors.headerBg};
  z-index: 1000;
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.heading};
  backdrop-filter: blur(8px);
  border-radius: 14px;
  box-shadow: ${props => props.theme.colors.cardShadow};
`;

export const Name = styled.h1`
  font-size: 1.68rem;
  margin-bottom: 0.2em;
  font-family: ${props => props.theme.font.heading};
  color: ${props => props.theme.colors.text};
  letter-spacing: 0.01em;
`;

export const IdentityTag = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.primary};
  color: #4b5563;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  font-size: 0.94rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.heading};
  opacity: 0.92;
  line-height: 1.45;
  margin: 0 auto 10px;
  max-width: 70ch;
`;

export const IconWrapper = styled.div`
  margin-top: 10px;
  display: inline-flex;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.colors.cardShadow};
`;

export const IconLink = styled.a`
  width: 40px;
  height: 40px;
  display: inline-block;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export const IconImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px ${props => props.theme.colors.shadow};
    transform: translateY(-2px);
  }
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const Info = styled.p`
  font-size: 0.93rem;
  line-height: 1.35;
  text-align: center;
  margin: 8px 0;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

export const HeaderMeta = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 8px;
  justify-items: center;
`;
