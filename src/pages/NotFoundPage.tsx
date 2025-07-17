import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #343a40;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled.a`
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  color: white;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <html lang='en' />
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions'
        />
        <title>Mehmet Serhat Ozdursun - 404</title>
        <link rel='icon' href='/favicon_.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://serhatozdursun.com/' />
        <meta property='og:title' content='Mehmet Serhat Ozdursun - 404' />
        <meta
          property='og:description'
          content='Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions.'
        />
        <meta
          property='og:image'
          content='https://serhatozdursun.com/profile.png'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://serhatozdursun.com/' />
        <meta property='twitter:title' content='Mehmet Serhat Ozdursun - 404' />
        <meta
          property='twitter:description'
          content='Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions'
        />
        <meta
          property='twitter:image'
          content='https://serhatozdursun.com/profile.png'
        />

        <meta name='author' content='Mehmet Serhat Özdursun' />
        <meta name='language' content='English' />
        <meta name='robots' content='index, follow' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='canonical' href='https://serhatozdursun.com/' />
        <meta
          name='keywords'
          content='QA Automation Engineer, Software Testing, Mehmet Serhat Özdursun, Resume'
        />
      </Helmet>
      <Title>404</Title>
      <Subtitle>
        Oops! The page you&#39;re looking for doesn&#39;t exist.
      </Subtitle>
      <StyledLink href='/'>Go Back Home</StyledLink>
    </Container>
  );
};

export default NotFoundPage;
