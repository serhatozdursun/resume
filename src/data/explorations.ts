export interface CurrentExplorationItem {
  id: string;
  label: string;
}

export const currentExplorations: readonly CurrentExplorationItem[] = [
  {
    id: 'ai-pr-impact',
    label:
      'Applying AI-assisted automation workflows for PR impact analysis and intelligent test selection.',
  },
  {
    id: 'ai-visual-regression',
    label:
      'Designing AI-assisted visual regression pipelines to detect meaningful UI risk with lower review overhead.',
  },
  {
    id: 'maestro-mobile-automation',
    label:
      'Building Maestro-based mobile automation flows and validating them on real devices for production-like confidence.',
  },
  {
    id: 'ai-orchestration-layer',
    label:
      'Designing an AI orchestration layer that converts natural-language test intent into executable, maintainable test flows.',
  },
  {
    id: 'webdriverio-open-source',
    label:
      'Leveraging open-source contribution work in WebdriverIO to strengthen reusable automation patterns and execution reliability.',
  },
] as const;
