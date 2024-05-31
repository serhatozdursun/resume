// SkillsComponents.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkillsComponents } from '../SkillsComponents'; // Update the path
import '@testing-library/jest-dom'


describe('SkillsComponents', () => {
    it('renders skills correctly', () => {
        render(<SkillsComponents />);

        const skillsTitle = screen.getByText('Skills');
        expect(skillsTitle).toBeInTheDocument();

        const skills = [
            { name: 'Test Automation', level: 100 },
            { name: 'Selenium', level: 100 },
            { name: 'Appium', level: 95 },
            { name: 'JMeter', level: 90 },
            { name: 'K6', level: 85 },
            { name: 'Postman', level: 98 },
            { name: 'Java', level: 90 },
            { name: 'TypeScript', level: 80 },
            { name: 'JavaScript', level: 78 },
            { name: 'node.js', level: 80 },
            { name: '.Net', level: 75 },
            { name: 'Grafana', level: 70 },
            { name: 'Git', level: 90 },
            { name: 'CI/CD', level: 80 },
            { name: 'TestNG', level: 85 },
            { name: 'Python', level: 70 },
            { name: 'JUnit', level: 80 },
            { name: 'Docker', level: 85 },
            { name: 'Mobile Testing', level: 85 },
            { name: 'SQL', level: 75 },
            { name: 'Agile', level: 80 },
            { name: 'API Testing', level: 85 },
            { name: 'Performance Testing', level: 80 },
            { name: 'Usability Testing', level: 80 },
        ];

        skills.forEach((skill) => {
            const skillName = screen.getByText(skill.name);
            expect(skillName).toBeInTheDocument();

            const skillLevelFill = screen.getByTestId(`${skill.name}-level-fill`);
            expect(skillLevelFill).toHaveStyle(`width: ${skill.level}%`);
        });
    });
});
