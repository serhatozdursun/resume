export interface KnowledgeArticle {
  title: string;
  link: string;
  description: string;
  topicTags: readonly string[];
}

export const knowledgeArticles: readonly KnowledgeArticle[] = [
  {
    title: 'What If AI Could Tell QA What Your Pull Request Might Break?',
    link: 'https://medium.com/dev-genius/what-if-ai-could-tell-qa-what-your-pull-request-might-break-b39842c94360',
    description:
      'Explores how AI can analyze pull requests and help QA predict impacted test areas earlier in the delivery process.',
    topicTags: [
      'AI in QA',
      'Pull Request Impact Analysis',
      'Test Coverage Awareness',
    ],
  },
  {
    title: 'Self-Healing Locators That Report Themselves',
    link: 'https://medium.com/dev-genius/self-healing-locators-that-report-themselves-a-smarter-way-to-avoid-ui-test-failures-8649b0723196',
    description:
      'Explores a smarter approach to UI test stability using self-healing locators combined with reporting mechanisms to reduce flaky test failures and improve reliability.',
    topicTags: [
      'UI Test Automation',
      'Self-Healing Locators',
      'Test Stability',
    ],
  },
] as const;
