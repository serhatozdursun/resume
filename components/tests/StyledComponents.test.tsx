import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import {
    Container,
    LeftColumn,
    RightColumn,
    Header,
    Name,
    SkillLevelFill
} from '../StyledComponents'

describe('StyledComponents', () => {
    it('renders Container correctly', () => {
        const { container } = render(<Container />);
        expect(container.firstChild).toHaveStyleRule('display', 'flex');
        expect(container.firstChild).toHaveStyleRule('max-width', '100%');
        expect(container.firstChild).toHaveStyleRule('background-color', '#f3fafd');
    });

    it('renders LeftColumn correctly', () => {
        const { container } = render(<LeftColumn />);
        expect(container.firstChild).toHaveStyleRule('flex', '1');
        expect(container.firstChild).toHaveStyleRule('padding-top', '20px');
        expect(container.firstChild).toHaveStyleRule('background-color', '#f3fafd');
    });

    it('renders RightColumn correctly', () => {
        const { container } = render(<RightColumn />);
        expect(container.firstChild).toHaveStyleRule('flex', '2.8');
        expect(container.firstChild).toHaveStyleRule('padding-right', '200px');
        expect(container.firstChild).toHaveStyleRule('padding-left', '30px');

    });

    it('renders Header correctly', () => {
        const { container } = render(<Header />);
        expect(container.firstChild).toHaveStyleRule('text-align', 'center');
        expect(container.firstChild).toHaveStyleRule('margin-bottom', '20px');
    });

    it('renders Name correctly', () => {
        const { container } = render(<Name />);
        expect(container.firstChild).toHaveStyleRule('font-size', '2.5em');
        expect(container.firstChild).toHaveStyleRule('margin-bottom', '0.2em');
    });

    // Add similar tests for other components as needed

    it('SkillLevelFill renders with correct width', () => {
        const { container } = render(<SkillLevelFill $level={50} />);
        const skillLevelFillElement = container.firstChild as HTMLElement;
        expect(skillLevelFillElement).toHaveStyleRule('width: 50%;');
    });
});
