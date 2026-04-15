export interface EngineeringProject {
  title: string;
  description: string;
  repository: string;
  techTags: readonly string[];
}

export const engineeringProjects: readonly EngineeringProject[] = [
  {
    title: 'AI Visual Compare',
    description:
      'AI-assisted UI comparison tool that detects visual differences between screenshots using OpenCV and LLM reasoning.',
    repository: 'https://github.com/serhatozdursun/AI.VisualCompare',
    techTags: ['Python', 'OpenCV', 'Gemini', 'AI'],
  },
  {
    title: 'QA Engineering CI/CD Playground',
    description:
      'The repository behind my personal website, used to demonstrate QA engineering best practices in CI/CD including GitHub Actions, unit and component tests, SonarQube, Danger-driven AI PR review, and AI-based QA-affected area analysis.',
    repository: 'https://github.com/serhatozdursun/resume',
    techTags: [
      'Next.js',
      'TypeScript',
      'GitHub Actions',
      'SonarQube',
      'DangerJS',
      'AI',
    ],
  },
] as const;
