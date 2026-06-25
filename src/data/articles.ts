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
  {
    title:
      'The Self-Healing Pipeline: Balancing the Magic of AI Agents with Engineering Discipline',
    link: 'https://www.linkedin.com/pulse/self-healing-pipeline-balancing-magic-ai-agents-%C3%B6zdursun-jourf/',
    description:
      'Documents an agentic QA workflow that intercepts failing CI gates, heals broken tests via MCP-backed debugging, and enforces linting and human review guardrails to prevent architectural decay.',
    topicTags: [
      'AI Agents',
      'CI/CD Quality Gates',
      'Test Automation',
      'Engineering Guardrails',
    ],
  },
  {
    title:
      'The True Cost of "Autonomous" QA Agents (And What the Viral Diagrams Ignore)',
    link: 'https://www.linkedin.com/pulse/true-cost-autonomous-qa-agents-what-viral-diagrams-ignore-%C3%B6zdursun-tujyf/',
    description:
      'Contrasts ungated self-healing loops with scoped, MCP-validated repairs, and argues that locator discipline, PR guardrails, and static analysis must come before autonomous E2E agents.',
    topicTags: [
      'AI in QA',
      'E2E Automation',
      'Self-Healing Tests',
      'Cost Awareness',
    ],
  },
] as const;
