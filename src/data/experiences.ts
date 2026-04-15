export interface ExperienceItem {
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  dateRange: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: 'Lead QA Automation Engineer – Full-time Contract',
    company: 'Poq (via Index.dev), London',
    companyLogo: '/poq.svg',
    companyWebsite: 'https://poqcommerce.com',
    dateRange: 'Aug 2023 - Present',
    description:
      '<p>• Led improvements to a <strong>Java + Appium</strong> mobile automation framework on BrowserStack, reducing production defects by <strong>20%</strong>.</p><p>• Owned and optimized regression suites for <strong>40+ enterprise retail brands</strong>, aligning coverage with client-specific implementations.</p><p>• Modernized <strong>Postman API</strong> automation and integrated it into <strong>Azure CI/CD pipelines</strong>, reducing execution time by <strong>30%</strong>.</p><p>• Led performance testing for high-traffic retail events using <strong>JMeter + Python</strong> on Azure VMs, identifying bottlenecks before release.</p><p>• Introduced AI-assisted analysis tooling for test results and explored AI-assisted mobile automation approaches, including <strong>Maestro</strong>, to accelerate scalable test development.</p>',
  },
  {
    title: 'Senior QA Automation Engineer – Full-time Contract',
    company: 'Affirm, United States',
    companyLogo: '/affirm_logo.jpeg',
    companyWebsite: 'https://www.affirm.com/',
    dateRange: 'Jun 2022 - Aug 2023',
    description:
      '<p>• Led end-to-end automation for the Virtual Card lifecycle (creation, authorization, capture, refund, reversal), improving release confidence across payment-critical flows.</p><p>• Improved backend test reliability by extending simulation tools, mock services, and unit test coverage.</p><p>• Enhanced internal testing frameworks and shared tooling used across multiple engineering teams.</p><p>• Partnered with engineering and product teams to integrate QA into <strong>CI/CD</strong> and day-to-day delivery workflows.</p>',
  },
  {
    title: 'Lead QA Automation Engineer – Full-time Contract',
    company: 'Payflow (via Hubuc), Barcelona, Spain',
    companyLogo: '/payflow_es_logo.png',
    companyWebsite: 'https://www.payflow.es/',
    dateRange: 'Mar 2021 - Jun 2022',
    description:
      '<p>• Restructured QA into a scalable team model, improving coverage and accountability across squads.</p><p>• Designed and implemented a mobile automation framework with <strong>WebdriverIO + TypeScript + BrowserStack</strong>, reaching <strong>80%</strong> regression coverage in CI/CD.</p><p>• Implemented web UI automation with <strong>Selenium + TypeScript</strong> and API automation with <strong>Axios + Jest</strong> for core systems.</p><p>• Led automation across mobile, web, and API layers to improve reliability and release confidence.</p>',
  },
  {
    title: 'Senior Test Solutions Consultant',
    company: 'ABB (via Testinium), Istanbul, Turkey',
    companyLogo: '/abb.svg',
    companyWebsite: 'https://abb-bank.az/',
    dateRange: 'Nov 2019 - Mar 2021',
    description:
      '<p>• Served as an embedded lead QA engineer within the <strong>International Bank of Azerbaijan (ABB)</strong> teams, driving automation strategy and test architecture decisions.</p><p>• Designed and implemented a cross-platform automation framework using <strong>Java, Gauge, Rest-Assured, and Appium</strong>.</p><p>• Led API testing for critical banking services, improving backend reliability and reducing integration defects.</p><p>• Mentored QA engineers and established scalable QA practices within the client organization.</p><p>• Integrated automation into CI/CD workflows to accelerate release validation.</p>',
  },
  {
    title: 'Software Quality Assurance Team Lead',
    company: 'Apsiyon, Istanbul',
    companyLogo: '/apsiyon_logo.png',
    companyWebsite: 'https://www.apsiyon.com/en/products/apsiyon',
    dateRange: 'Jun 2017 - Nov 2019',
    description:
      '<p>• Joined as the first QA hire and built the QA function from scratch, scaling the team to 5 engineers.</p><p>• Designed and implemented a full automation framework with <strong>.NET, SpecFlow, and Appium</strong>, increasing coverage by <strong>60%</strong>.</p><p>• Integrated automation into <strong>CI/CD</strong> pipelines, reducing release validation time by <strong>40%</strong>.</p><p>• Established QA processes and quality standards across the organization.</p>',
  },
  {
    title: 'Software Test Engineer',
    company: 'Trendyol Group, Istanbul',
    companyLogo: '/trendyolgroup_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/trendyolgroup/',
    dateRange: 'Jan 2016 - Jun 2017',
    description:
      '<p>• Automated key test flows using <strong>Selenium WebDriver</strong>, reducing manual regression effort.</p><p>• Collaborated with developers in Agile sprints to improve defect resolution speed and release stability.</p><p>• Executed regression and maintenance testing to protect production quality after deployments.</p><p>• Managed defect tracking and triage through <strong>Jira</strong>.</p>',
  },
  {
    title: 'Software Test Engineer',
    company: 'Bimsa, Istanbul',
    companyLogo: '/bimsa.png',
    companyWebsite:
      'https://www.linkedin.com/company/bimsa/?originalSubdomain=tr',
    dateRange: 'Nov 2013 - Jan 2016',
    description:
      '<p>• Led functional, smoke, and <strong>UAT</strong> testing for <strong>teknosa.com</strong> initiatives to ensure stable releases.</p><p>• Automated critical UI and functional flows with <strong>Selenium WebDriver</strong> to improve coverage and consistency.</p><p>• Developed and maintained test scenarios for UI and API validation.</p><p>• Partnered with developers to troubleshoot defects and improve release quality.</p>',
  },
  {
    title: 'Software Testing and Quality Specialist',
    company: 'Sigortam.Net, Istanbul',
    companyLogo: '/sigortam_net_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/sigortam-net/',
    dateRange: 'Mar 2012 - Nov 2013',
    description:
      '<p>• Designed and executed functional, integration, and <strong>UAT</strong> test plans.</p><p>• Implemented automation scripts for repeatable flows to improve testing efficiency.</p><p>• Produced detailed test reporting to support quality analysis and release decisions.</p><p>• Collaborated with business stakeholders to align user acceptance and delivery outcomes.</p>',
  },
  {
    title: 'Software Testing and Quality Specialist',
    company: 'SET YAZILIM, Istanbul',
    companyLogo: '/setyazilim_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/set-yazilim/',
    dateRange: 'Oct 2010 - Mar 2012',
    description:
      '<p>• Designed and executed functional test scenarios aligned with business requirements.</p><p>• Supported customers through <strong>User Acceptance Testing (UAT)</strong> cycles.</p><p>• Delivered training, demos, and documentation for effective onboarding.</p><p>• Documented test outcomes and fed improvements back into product quality practices.</p>',
  },
];
