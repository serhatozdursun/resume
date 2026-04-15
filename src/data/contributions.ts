export interface OpenSourceContribution {
  title: string;
  description: string;
  repository: string;
  contributionGraph?: string;
  techTags: readonly string[];
}

export const openSourceContributions: readonly OpenSourceContribution[] = [
  {
    title: 'WebdriverIO',
    description:
      'Contribution and exploration related to IPC communication refactoring in the WebdriverIO test runner ecosystem.',
    repository: 'https://github.com/webdriverio/webdriverio',
    techTags: ['TypeScript', 'WebdriverIO', 'Test Runner Architecture'],
  },
  {
    title: 'Gauge',
    description:
      'Contributor to the Gauge test automation framework ecosystem.',
    repository: 'https://github.com/getgauge/gauge',
    contributionGraph: 'https://github.com/getgauge/gauge/graphs/contributors',
    techTags: ['Java', 'Test Automation', 'Open Source'],
  },
] as const;
