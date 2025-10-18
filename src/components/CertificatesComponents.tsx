import React, { useState } from 'react';
import {
  CertificatesContainer,
  CertificateTitle,
  CertificateList,
  CertificateItem,
  CertificateLink,
  CertificateName,
  BadgeWrapper,
} from '../types/StyledComponents';
import Image from 'next/image';

const CertificatesComponents = () => {
  const [clickedCertificates, setClickedCertificates] = useState<string[]>([]);

  const handleClick = (certificateName: string) => {
    setClickedCertificates(prevCertificates => {
      if (!prevCertificates.includes(certificateName)) {
        return [...prevCertificates, certificateName];
      }
      return prevCertificates;
    });
  };

  const certificates = [
    {
      name: 'ISTQB® CTAL-TM',
      badge: '/CTAL-TM-badge.png',
      link: 'https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229',
    },
    {
      name: 'ISTQB® CTAL-TAE',
      badge: '/CTAL-TAE-badge.png',
      link: 'https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229',
    },
    {
      name: 'ISTQB® CTFL',
      badge: '/Foundation-Level-Exam-2022.png',
      link: 'https://scr.istqb.org/?name=%C3%96ZDURSUN&number=&orderBy=relevancy&orderDirection=&dateStart=&dateEnd=&expiryStart=&expiryEnd=&certificationBody=&examProvider=&certificationLevel=&country=&resultsPerPage=10',
    },
    {
      name: 'PSD I',
      badge: '/psd1.png',
      link: 'https://www.credly.com/badges/c81059a4-a85f-4b9b-83b8-aa4d7cf36c31/public_url',
    },
    {
      name: 'Problem Solving (Int.)',
      badge: '/hackerrank.png',
      link: 'https://www.hackerrank.com/certificates/c331e49c22d0',
    },
    {
      name: 'Java (Basic) Certificate',
      badge: '/hackerrank.png',
      link: 'https://www.hackerrank.com/certificates/995550878771',
    },
    {
      name: 'Python (Basic) Certificate',
      badge: '/hackerrank.png',
      link: 'https://www.hackerrank.com/certificates/2256773c8ba5',
    },
    {
      name: 'C# (Basic) Certificate',
      badge: '/hackerrank.png',
      link: 'https://www.hackerrank.com/certificates/957d5fbf06b4',
    },
  ];

  return (
    <CertificatesContainer id='certificatesContainer'>
      <CertificateTitle id='certificatesContainertitle'>
        Certificates
      </CertificateTitle>
      <CertificateList>
        {certificates.map((certificate, index) => (
          <CertificateItem className='certificate' key={index}>
            <CertificateLink
              className='certificateLink'
              href={certificate.link}
              target='_blank'
              onClick={() => handleClick(certificate.name)}
              clicked={clickedCertificates.includes(certificate.name)}
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
