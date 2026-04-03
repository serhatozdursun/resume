export interface SkillItem {
  name: string;
  level: number;
  /** Years of experience; shown via native `title` tooltip on hover only. */
  experience: number;
}

/** Tooltip text for skill rows (native `title` attribute). */
export function skillExperienceTitle(years: number): string {
  return `${years}+ years experience`;
}

export const skills: SkillItem[] = [
  { name: 'Test Automation', level: 100, experience: 14 },
  { name: 'Selenium', level: 100, experience: 11 },
  { name: 'Appium', level: 95, experience: 11 },
  { name: 'JMeter', level: 85, experience: 10 },
  { name: 'K6', level: 75, experience: 3 },
  { name: 'Postman', level: 95, experience: 12 },
  { name: 'WebDriverIO', level: 90, experience: 11 },
  { name: 'Java', level: 90, experience: 11 },
  { name: 'TypeScript', level: 80, experience: 4 },
  { name: 'JavaScript', level: 80, experience: 8 },
  { name: 'node.js', level: 78, experience: 5 },
  { name: '.Net', level: 70, experience: 3 },
  { name: 'Grafana', level: 70, experience: 4 },
  { name: 'Git', level: 90, experience: 10 },
  { name: 'CI/CD', level: 85, experience: 10 },
  { name: 'TestNG', level: 80, experience: 4 },
  { name: 'Python', level: 70, experience: 3 },
  { name: 'JUnit', level: 85, experience: 11 },
  { name: 'Docker', level: 75, experience: 2 },
  { name: 'Mobile Testing', level: 90, experience: 12 },
  { name: 'SQL', level: 75, experience: 14 },
  { name: 'Agile', level: 85, experience: 8 },
  { name: 'API Testing', level: 90, experience: 11 },
  { name: 'Performance Testing', level: 85, experience: 8 },
  { name: 'Usability Testing', level: 80, experience: 14 },
];
