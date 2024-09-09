import React, { useState } from 'react';
import {
    CertificatesContainer,
    CertificateTitle,
    CertificateList,
    CertificateItem,
    CertificateLink,
    CertificateName,
    Badge
} from './StyledComponents';


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
            name: 'Professional Scrum Developer™ I (PSD I)',
            badge: '/psd1.png',
            link: 'https://www.credly.com/badges/c81059a4-a85f-4b9b-83b8-aa4d7cf36c31/public_url',
        },
        {
            name: 'ISTQB® Certified Tester Foundation Level (CTFL)',
            badge: '/Brightest_CTFL.png',
            link: 'http://scr.istqb.org/?name=&number=0515+CTFL+1465&orderBy=relevancy&orderDirection=&dateStart=&dateEnd=&expiryStart=&expiryEnd=&certificationBody=&examProvider=&certificationLevel=&country=&resultsPerPage=10',
        },
        {
            name: 'HackerRank Problem Solving (Intermediate)',
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
        }
    ];

    return (
        <CertificatesContainer id = "certificatesContainer">
            <CertificateTitle  id = "certificatesContainertitle">Certificates</CertificateTitle>
            <CertificateList>
                {certificates.map((certificate, index) => (
                    <CertificateItem className = "certificate" key={index}>
                        <CertificateLink
                            className = "certificateLink"
                            href={certificate.link}
                            target="_blank"
                            onClick={() => handleClick(certificate.name)}
                            clicked={clickedCertificates.includes(certificate.name)}
                        >
                            <Badge className = "certificateBadge" src={certificate.badge} alt={`${certificate.name} Badge`} />
                            <CertificateName className = "certificateName">{certificate.name}</CertificateName>
                        </CertificateLink>
                    </CertificateItem>
                ))}
            </CertificateList>
        </CertificatesContainer>
    );
};

export default CertificatesComponents;
