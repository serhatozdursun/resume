export interface EngineeringProject {
  title: string;
  description: string;
  repository: string;
  supportLink?: {
    label: string;
    href: string;
  };
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
    title: 'AI-Assisted Mobile Test Automation with Maestro',
    description:
      'Deterministic-first mobile test orchestration for scenario exploration, AI-assisted step generation, and on-device validation using Maestro.',
    repository: 'https://github.com/serhatozdursun/maestro-ai-agent',
    supportLink: {
      label: 'View on PyPI',
      href: 'https://pypi.org/project/maestro-ai-agent/0.1.0/',
    },
    techTags: ['Python', 'Maestro', 'Mobile Testing', 'AI', 'Test Automation'],
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
  {
    title: 'BDD Testing Frameworks',
    description:
      'A unified BDD-style automation framework for API, web, and mobile testing. Although it is an older project, it reflects my early approach to building scalable and reusable test automation architectures across multiple layers.',
    repository: 'https://github.com/vmso/io.bdd_testing_frameworks',
    techTags: ['Java', 'BDD', 'API Testing', 'Web Testing', 'Mobile Testing'],
  },
] as const;
