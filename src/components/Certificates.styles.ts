import styled from 'styled-components';

export const CertificatesContainer = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 14px;
  padding: 14px 12px;
  box-shadow: ${props => props.theme.colors.cardShadow};
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

export const CertificateTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 0.9em;
  color: ${props => props.theme.colors.text};
  letter-spacing: 0.01em;
  @media (max-width: 768px) {
    font-size: 0.6em;
  }
`;

export const CertificateList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const CertificateItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 6px 8px;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;
  &:hover {
    box-shadow: 0px 8px 16px ${props => props.theme.colors.shadow};
    transform: translateY(-1px);
  }
`;

export const CertificateLink = styled.a<{ $clicked: boolean }>`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${props => (props.$clicked ? props.theme.colors.link : 'inherit')};
  transition: color 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.highlight};
  }
`;

export const CertificateName = styled.span`
  margin-left: 10px;
`;
