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
      name: 'PSD I',
      badge: '/psd1.png',
      link: 'https://www.credly.com/badges/c81059a4-a85f-4b9b-83b8-aa4d7cf36c31/public_url',
    },
    {
      name: 'ISTQB® CTFL',
      badge: '/Brightest_CTFL.png',
      link: 'http://scr.istqb.org/?name=&number=0515+CTFL+1465&orderBy=relevancy&orderDirection=&dateStart=&dateEnd=&expiryStart=&expiryEnd=&certificationBody=&examProvider=&certificationLevel=&country=&resultsPerPage=10',
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
                  width={20}
                  height={20}
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
