// styledComponents.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import {
    Container,
    LeftColumn,
    RightColumn,
    Header,
    Name,
    Title,
    Summary,
    Image,
    IconWrapper,
    IconLink,
    IconImage,
    AccordionWrapper,
    AccordionItem,
    AccordionHeader,
    AccordionTitle,
    AccordionContent,
    BoldText,
    Info,
} from '../StyledComponents'; // Update the path to your styled components file
import '@testing-library/jest-dom'


describe('Styled Components', () => {
    it('Container renders correctly', () => {
        const { container } = render(<Container />);
        expect(container).toBeInTheDocument();
    });

    it('LeftColumn renders correctly', () => {
        const { container } = render(<LeftColumn />);
        expect(container).toBeInTheDocument();
    });

    it('RightColumn renders correctly', () => {
        const { container } = render(<RightColumn />);
        expect(container).toBeInTheDocument();
    });

    it('Header renders correctly', () => {
        const { container } = render(<Header />);
        expect(container).toBeInTheDocument();
    });

    it('Name renders correctly', () => {
        const { container } = render(<Name />);
        expect(container).toBeInTheDocument();
    });

    it('Title renders correctly', () => {
        const { container } = render(<Title />);
        expect(container).toBeInTheDocument();
    });

    it('Summary renders correctly', () => {
        const { container } = render(<Summary />);
        expect(container).toBeInTheDocument();
    });

    it('Image renders correctly', () => {
        const { container } = render(<Image />);
        expect(container).toBeInTheDocument();
    });

    it('IconWrapper renders correctly', () => {
        const { container } = render(<IconWrapper />);
        expect(container).toBeInTheDocument();
    });

    it('IconLink renders correctly', () => {
        const { container } = render(<IconLink />);
        expect(container).toBeInTheDocument();
    });

    it('IconImage renders correctly', () => {
        const { container } = render(<IconImage />);
        expect(container).toBeInTheDocument();
    });

    it('AccordionWrapper renders correctly', () => {
        const { container } = render(<AccordionWrapper />);
        expect(container).toBeInTheDocument();
    });

    it('AccordionItem renders correctly', () => {
        const { container } = render(<AccordionItem />);
        expect(container).toBeInTheDocument();
    });

    it('AccordionHeader renders correctly', () => {
        const { container } = render(<AccordionHeader />);
        expect(container).toBeInTheDocument();
    });

    it('AccordionTitle renders correctly', () => {
        const { container } = render(<AccordionTitle />);
        expect(container).toBeInTheDocument();
    });

    it('AccordionContent renders correctly', () => {
        const { container } = render(<AccordionContent />);
        expect(container).toBeInTheDocument();
    });

    it('BoldText renders correctly', () => {
        const { container } = render(<BoldText />);
        expect(container).toBeInTheDocument();
    });

    it('Info renders correctly', () => {
        const { container } = render(<Info />);
        expect(container).toBeInTheDocument();
    });
});
