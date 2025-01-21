import React from 'react';
import styled from 'styled-components';

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
      <Title>404</Title>
      <Subtitle>Oops! The page you're looking for doesn't exist.</Subtitle>
      <StyledLink href="/">Go Back Home</StyledLink>
    </Container>
  );
};

export default NotFoundPage;
