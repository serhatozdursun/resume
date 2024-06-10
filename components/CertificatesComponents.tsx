import React, { useState } from 'react';
import styled from 'styled-components';

const CertificatesContainer = styled.div`
    margin-top: 30px;
`;

const CertificateTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 1.2em;
`;

const CertificateList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CertificateItem = styled.li`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const CertificateLink = styled.a.attrs<{ clicked: boolean }>(props => ({
    // Ensure clicked is not passed to the DOM
    clicked: undefined,
}))<{ clicked: boolean }>`
    text-decoration: none;
    display: flex;
    align-items: center;
    color: ${props => (props.clicked ? 'black' : 'inherit')};
    transition: color 0.2s ease-in-out;

    &:hover {
        color: black;
    }
`;

const CertificateName = styled.span`
    margin-left: 10px;
`;

const Badge = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

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
    ];

    return (
        <CertificatesContainer>
            <CertificateTitle>Certificates</CertificateTitle>
            <CertificateList>
                {certificates.map((certificate, index) => (
                    <CertificateItem key={index}>
                        <CertificateLink
                            href={certificate.link}
                            target="_blank"
                            onClick={() => handleClick(certificate.name)}
                            clicked={clickedCertificates.includes(certificate.name)}
                        >
                            <Badge src={certificate.badge} alt={`${certificate.name} Badge`} />
                            <CertificateName>{certificate.name}</CertificateName>
                        </CertificateLink>
                    </CertificateItem>
                ))}
            </CertificateList>
        </CertificatesContainer>
    );
};

export default CertificatesComponents;
