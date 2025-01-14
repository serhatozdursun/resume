import React from 'react';

import { SkillsContainer, Skill, SkillName, SkillLevel, SkillLevelFill, SkillsTitle } from './StyledComponents';

export const SkillsComponents = () => {
  const skills = [
    { name: 'Test Automation', level: 100 },
    { name: 'Selenium', level: 100 },
    { name: 'Appium', level: 95 },
    { name: 'JMeter', level: 90 },
    { name: 'K6', level: 85 },
    { name: 'Postman', level: 98 },
    { name: 'WebDriverIO', level: 90 },
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

  return (
    <SkillsContainer>
      <SkillsTitle>Skills</SkillsTitle>
      {skills.map((skill, index) => (
        <Skill key={index}>
          <SkillName id={`${skill.name.toLowerCase().replace(' ', '_')}`}>{skill.name}</SkillName>
          <SkillLevel>
            <SkillLevelFill id={`skill_level-${index}`} data-testid={`${skill.name}-level-fill`} $level={skill.level} />
          </SkillLevel>
        </Skill>
      ))}
    </SkillsContainer>
  );
};
