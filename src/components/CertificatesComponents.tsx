import React, { useState } from 'react';
import {
  CertificatesContainer,
  CertificateTitle,
  CertificateList,
  CertificateItem,
  CertificateLink,
  CertificateName,
} from './Certificates.styles';
import { BadgeWrapper } from './Layout.styles';
import Image from 'next/image';
import { certificates } from '../data/certificates';

interface CertificatesComponentsProps {
  hideSectionTitle?: boolean;
}

const CertificatesComponents: React.FC<CertificatesComponentsProps> = ({
  hideSectionTitle = false,
}) => {
  const [clickedCertificates, setClickedCertificates] = useState<string[]>([]);

  const handleClick = (certificateName: string) => {
    setClickedCertificates(prevCertificates => {
      if (!prevCertificates.includes(certificateName)) {
        return [...prevCertificates, certificateName];
      }
      return prevCertificates;
    });
  };

  return (
    <CertificatesContainer id='certificatesContainer'>
      {!hideSectionTitle && (
        <CertificateTitle id='certificatesContainertitle'>
          Certificates & Achievements
        </CertificateTitle>
      )}
      <CertificateList>
        {certificates.map((certificate, index) => (
          <CertificateItem className='certificate' key={index}>
            <CertificateLink
              className='certificateLink'
              href={certificate.link}
              target='_blank'
              onClick={() => handleClick(certificate.name)}
              $clicked={clickedCertificates.includes(certificate.name)}
            >
              <BadgeWrapper className='certificateBadge'>
                <Image
                  src={certificate.badge}
                  alt={`${certificate.name} Badge`}
                  width={28}
                  height={28}
                  style={{ objectFit: 'contain' }}
                />
              </BadgeWrapper>
              <CertificateName className='certificateName'>
                {certificate.name}
              </CertificateName>
            </CertificateLink>
          </CertificateItem>
        ))}
      </CertificateList>
    </CertificatesContainer>
  );
};

export default CertificatesComponents;
