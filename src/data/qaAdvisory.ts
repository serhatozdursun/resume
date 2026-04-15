/**
 * QA Advisory landing page copy — companies & teams.
 */

export const qaAdvisoryMeta = {
  title: 'Quality Engineering Advisory (Occasional) | Serhat Ozdursun',
  description:
    'Occasional advisory support on automation strategy, CI/CD quality engineering, and QA mentorship for software teams across web, mobile, API, performance, and AI-assisted workflows.',
} as const;

export const qaAdvisoryHero = {
  eyebrow: 'Occasional advisory support for teams',
  title: 'Quality Engineering Advisory (Occasional)',
  subtitle:
    'Occasionally supporting teams with QA mentorship, automation strategy, and practical quality engineering improvements.',
  supporting:
    'Practical guidance on test strategy, reliable automation, and CI/CD quality gates, grounded in real delivery experience rather than generic frameworks.',
  primaryCtaLabel: 'Get in touch',
  primaryCtaHref: '#advisory-contact',
  secondaryCtaLabel: 'Individual mentorship',
  secondaryCtaHref: '/mentorship',
} as const;

export const qaAdvisoryWhoFor: readonly string[] = [
  'SaaS and product teams scaling delivery and needing stronger quality guardrails',
  'Teams with low release confidence or frequent production regressions',
  'Engineering organizations struggling with flaky or unmaintainable automation',
  'Companies without a clear QA or test automation roadmap',
  'Leaders who need structured training and enablement for QA and SDET roles',
];

export const qaAdvisoryServiceAreas: readonly {
  title: string;
  desc: string;
}[] = [
  {
    title: 'Test Automation Strategy',
    desc: 'Framework direction, tooling fit, layering (unit vs API vs UI), and maintainability so automation scales with the product.',
  },
  {
    title: 'QA Process & Quality Strategy',
    desc: 'Test planning, risk-based coverage, ownership, and quality metrics that match how your team actually ships.',
  },
  {
    title: 'CI/CD Quality Engineering',
    desc: 'Pipeline test stages, quality gates, feedback speed, and reducing manual release validation bottlenecks.',
  },
  {
    title: 'Team Training & Enablement',
    desc: 'Hands-on programs for software testing fundamentals, automation, and day-to-day workflows your team can reuse.',
  },
  {
    title: 'Mobile / Web / API Testing',
    desc: 'Coverage across client apps, services, and contracts — including integration and end-to-end scenarios that matter for releases.',
  },
  {
    title: 'AI in QA Workflows',
    desc: 'Practical use of AI-assisted analysis, impact awareness, and documentation — grounded in real delivery constraints.',
  },
];

export const qaAdvisoryChallenges: readonly string[] = [
  'Flaky or unreliable automation eroding trust in the suite',
  'Manual-heavy release validation that slows every deploy',
  'Weak or missing integration of tests into CI/CD',
  'Unclear QA ownership between developers, testers, and release managers',
  'Scaling quality practices across multiple teams or products',
  'Test teams that need upskilling on automation, tools, or modern practices',
];

export const qaAdvisoryOutcomes: readonly string[] = [
  'Stronger release confidence through clearer strategy and stable automation',
  'Better automation architecture aligned to your stack and delivery model',
  'Improved QA maturity and more predictable quality conversations',
  'Clearer process ownership and expectations across engineering',
  'Teams trained with practical workflows they can apply immediately',
];

export const qaAdvisoryCredibility: readonly string[] = [
  '13+ years in QA and test automation across international product teams',
  'Hands-on experience across web, mobile, API, and performance testing',
  'CI/CD integration — GitHub Actions, Azure DevOps, Jenkins, and related pipelines',
  'Consulting and delivery with distributed and international engineering organizations',
  'AI-assisted QA workflows integrated into real pipelines and review processes',
  'Framework architecture, process improvement, and measurable quality outcomes',
];
