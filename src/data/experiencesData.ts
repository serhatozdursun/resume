export interface ExperienceRow {
  readonly title: string;
  readonly company: string;
  readonly companyLogo: string;
  readonly companyWebsite: string;
  readonly dateRange: string;
  readonly bullets: readonly string[];
}

const experienceEntries = {
  pulsepoint: {
    title: 'QA Manager, AI & Testing Innovation',
    company: 'PulsePoint, New York City Metropolitan Area',
    companyLogo: '/pulsepoint_logo.png',
    companyWebsite: 'https://www.pulsepoint.com/',
    dateRange: 'Jul 2026 - Present',
    bullets: [
      'Lead and mentor a **globally distributed QA engineering team**, coordinating priorities, ownership, delivery, and technical development across regions and time zones.',
      'Partner with US-based leadership and **Engineering, Product, DevOps, and Architecture** teams to align quality initiatives with business and technology objectives.',
      'Remain hands-on with **automation architecture**, prototyping, reference implementations, and complex technical challenges to remove engineering blockers.',
      'Define QA engineering standards and scalable automation architecture, validating technical direction through working implementations.',
      'Lead **AI adoption in Quality Engineering**, architecting agentic workflows for requirements analysis, test design, automation generation, failure analysis, defect management, and lifecycle follow-up.',
      'Design reusable **agent and skill architectures** for orchestrated QA workflows, incorporating LLM APIs, security, CI/CD integration, maintainability, and governance.',
      'Drive automation across **API, UI, and E2E** layers, alongside performance and load-testing strategies for high-volume systems.',
      'Contribute to QA roadmaps, estimation, prioritization, resource coordination, architecture and code reviews, mentoring, and continuous engineering improvement.',
    ],
  },
  poq: {
    title: 'Lead QA Automation Engineer – Full-time Contract',
    company: 'Poq (via Index.dev), London',
    companyLogo: '/poq.svg',
    companyWebsite: 'https://poqcommerce.com',
    dateRange: 'Aug 2023 - Jul 2026',
    bullets: [
      'Led improvements to a **Java + Appium** mobile automation framework on BrowserStack, reducing production defects by **20%**.',
      'Owned and optimized regression suites for **40+ enterprise retail brands**, aligning coverage with client-specific implementations.',
      'Modernized **Postman API** automation and integrated it into **Azure CI/CD pipelines**, reducing execution time by **30%**.',
      'Led performance testing for high-traffic retail events using **JMeter + Python** on Azure VMs, identifying bottlenecks before release.',
      'Introduced AI-assisted analysis tooling for test results and explored AI-assisted mobile automation approaches, including **Maestro**, to accelerate scalable test development.',
    ],
  },
  affirm: {
    title: 'Senior QA Automation Engineer – Full-time Contract',
    company: 'Affirm, United States',
    companyLogo: '/affirm_logo.jpeg',
    companyWebsite: 'https://www.affirm.com/',
    dateRange: 'Jun 2022 - Aug 2023',
    bullets: [
      'Led end-to-end automation for the Virtual Card lifecycle (creation, authorization, capture, refund, reversal), improving release confidence across payment-critical flows.',
      'Improved backend test reliability by extending simulation tools, mock services, and unit test coverage.',
      'Enhanced internal testing frameworks and shared tooling used across multiple engineering teams.',
      'Partnered with engineering and product teams to integrate QA into **CI/CD** and day-to-day delivery workflows.',
    ],
  },
  payflow: {
    title: 'Lead QA Automation Engineer – Full-time Contract',
    company: 'Payflow (via Hubuc), Barcelona, Spain',
    companyLogo: '/payflow_es_logo.png',
    companyWebsite: 'https://www.payflow.es/',
    dateRange: 'Mar 2021 - Jun 2022',
    bullets: [
      'Restructured QA into a scalable team model, improving coverage and accountability across squads.',
      'Designed and implemented a mobile automation framework with **WebdriverIO + TypeScript + BrowserStack**, reaching **80%** regression coverage in CI/CD.',
      'Implemented web UI automation with **Selenium + TypeScript** and API automation with **Axios + Jest** for core systems.',
      'Led automation across mobile, web, and API layers to improve reliability and release confidence.',
    ],
  },
  abb: {
    title: 'Senior Test Solutions Consultant',
    company: 'ABB (via Testinium), Istanbul, Turkey',
    companyLogo: '/abb.svg',
    companyWebsite: 'https://abb-bank.az/',
    dateRange: 'Nov 2019 - Mar 2021',
    bullets: [
      'Served as an embedded lead QA engineer within the **International Bank of Azerbaijan (ABB)** teams, driving automation strategy and test architecture decisions.',
      'Designed and implemented a cross-platform automation framework using **Java, Gauge, Rest-Assured, and Appium**.',
      'Led API testing for critical banking services, improving backend reliability and reducing integration defects.',
      'Mentored QA engineers and established scalable QA practices within the client organization.',
      'Integrated automation into CI/CD workflows to accelerate release validation.',
    ],
  },
  apsiyon: {
    title: 'Software Quality Assurance Team Lead',
    company: 'Apsiyon, Istanbul',
    companyLogo: '/apsiyon_logo.png',
    companyWebsite: 'https://www.apsiyon.com/en/products/apsiyon',
    dateRange: 'Jun 2017 - Nov 2019',
    bullets: [
      'Joined as the first QA hire and built the QA function from scratch, scaling the team to 5 engineers.',
      'Designed and implemented a full automation framework with **.NET, SpecFlow, and Appium**, increasing coverage by **60%**.',
      'Integrated automation into **CI/CD** pipelines, reducing release validation time by **40%**.',
      'Established QA processes and quality standards across the organization.',
    ],
  },
  trendyol: {
    title: 'Software Test Engineer',
    company: 'Trendyol Group, Istanbul',
    companyLogo: '/trendyolgroup_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/trendyolgroup/',
    dateRange: 'Jan 2016 - Jun 2017',
    bullets: [
      'Automated key test flows using **Selenium WebDriver**, reducing manual regression effort.',
      'Collaborated with developers in Agile sprints to improve defect resolution speed and release stability.',
      'Executed regression and maintenance testing to protect production quality after deployments.',
      'Managed defect tracking and triage through **Jira**.',
    ],
  },
  bimsa: {
    title: 'Software Test Engineer',
    company: 'Bimsa, Istanbul',
    companyLogo: '/bimsa.png',
    companyWebsite:
      'https://www.linkedin.com/company/bimsa/?originalSubdomain=tr',
    dateRange: 'Nov 2013 - Jan 2016',
    bullets: [
      'Led functional, smoke, and **UAT** testing for **teknosa.com** initiatives to ensure stable releases.',
      'Automated critical UI and functional flows with **Selenium WebDriver** to improve coverage and consistency.',
      'Developed and maintained test scenarios for UI and API validation.',
      'Partnered with developers to troubleshoot defects and improve release quality.',
    ],
  },
  sigortamNet: {
    title: 'Software Testing and Quality Specialist',
    company: 'Sigortam.Net, Istanbul',
    companyLogo: '/sigortam_net_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/sigortam-net/',
    dateRange: 'Mar 2012 - Nov 2013',
    bullets: [
      'Designed and executed functional, integration, and **UAT** test plans.',
      'Implemented automation scripts for repeatable flows to improve testing efficiency.',
      'Produced detailed test reporting to support quality analysis and release decisions.',
      'Collaborated with business stakeholders to align user acceptance and delivery outcomes.',
    ],
  },
  setYazilim: {
    title: 'Software Testing and Quality Specialist',
    company: 'SET YAZILIM, Istanbul',
    companyLogo: '/setyazilim_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/set-yazilim/',
    dateRange: 'Oct 2010 - Mar 2012',
    bullets: [
      'Designed and executed functional test scenarios aligned with business requirements.',
      'Supported customers through **User Acceptance Testing (UAT)** cycles.',
      'Delivered training, demos, and documentation for effective onboarding.',
      'Documented test outcomes and fed improvements back into product quality practices.',
    ],
  },
} satisfies Record<string, ExperienceRow>;

export const experienceRows: readonly ExperienceRow[] =
  Object.values(experienceEntries);
