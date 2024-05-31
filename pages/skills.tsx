import styled from "styled-components";
import React from "react";

export const SkillsContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 0px;
    background-color: #f3fafd;
`;

export const Skill = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const SkillName = styled.span`
    font-weight: bold;
    margin-right: 10px;
    width: 100px;
`;

export const SkillLevel = styled.div`
    width: 200px;
    height: 20px;
    background-color: #f3fafd;
    border-radius: 10px;
    overflow: hidden;
`;

export const SkillLevelFill = styled.div<{ level: number }>`
  height: 100%;
  width: ${({ level }) => `${level}%`};
  background-color: #4caf50;
  border-radius: 10px;
`;

export const Skills = () => {
    const skills = [
        {name: 'Test Automation', level: 100},
        {name: 'Selenium', level: 100},
        {name: 'Appium', level: 95},
        {name: 'JMeter', level: 90},
        {name: 'K6', level: 85},
        {name: 'Postman', level: 98},
        {name: 'Java', level: 90},
        {name: 'TypeScript', level: 80},
        {name: 'JavaScript', level: 78},
        {name: 'node.js', level: 80},
        {name: '.Net', level: 75},
        {name: 'Grafana', level: 70},
        {name: 'Git', level: 90},
        {name: 'CI/CD', level: 80},
        {name: 'TestNG', level: 85},
        {name: 'Python', level: 70},
        {name: 'JUnit', level: 80},
        {name: 'Docker', level: 85},
        {name: 'Mobile Testing', level: 85},
        {name: 'SQL', level: 75},
        {name: 'Agile', level: 80},
        {name: 'API Testing', level: 85},
        {name: 'Performance Testing', level: 80},
        {name: 'Usability Testing', level: 80},
    ];


    return (
        <SkillsContainer>
            {skills.map((skill, index) => (
                <Skill key={index}>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel>
                        <SkillLevelFill level={skill.level}/>
                    </SkillLevel>
                </Skill>
            ))}
        </SkillsContainer>
    );
};