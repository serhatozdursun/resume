import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 2.5em;
    text-align: center;
`;

const UITests = () => (
    <Container>
        <Title>UI Test Automation Examples</Title>
        <nav>
            <Link href="/">Back to Resume</Link>
        </nav>
        {/* Add your UI test automation examples here */}
    </Container>
);

export default UITests;
