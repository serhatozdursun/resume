import React, { useState } from 'react';
import {
  ExperienceHeader,
  ExperienceTitle,
  ExperienceCompany,
  ExperienceDateRange,
  ExperienceContent,
  SeeMoreLink,
  ExperienceContainer,
  ExperienceItem,
  CompanyLogoWrapper,
} from '../types/StyledComponents';
import Image from 'next/image';
import HtmlParser from 'html-react-parser';

interface Experience {
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  dateRange: string;
  description: string;
}

const experiences: Experience[] = [
  {
    title:
      'Senior QA Automation Engineer (via Index, Self-Employed Contractor)',
    company: 'Poq (via Index.dev), London',
    companyLogo: '/poq.svg',
    companyWebsite: 'https://poqcommerce.com',
    dateRange: 'Aug 2023 - Present',
    description:
      '<p>At Poq, improved mobile app quality by upgrading the <strong>Java</strong> + Appium automation framework (executed via BrowserStack), strengthening regression coverage and reducing production issues..</p><p>Led a full audit and update of <strong>TestRail</strong> regression suites for <strong>40+ enterprise retail brands</strong> (e.g., Hot Topic, e.l.f. Beauty, Cotton Traders, SNIPES), ensuring coverage reflected unique client customizations.</p><p>Revamped and integrated <strong>Postman API</strong> test collections into <strong>Azure Pipelines (CI/CD)</strong>, reducing execution time by <strong>30%</strong> and boosting reliability.</p><p>Drove performance testing for large-scale retail events (e.g., Black Friday, major client launches) using <strong>JMeter + Python</strong> on <strong>Azure VMs</strong>, proactively identifying and resolving bottlenecks.</p><p>Built an <strong>AI-powered Python tool</strong> to analyze JMeter results and generate QA insights; later extended it with <strong>OpenAI APIs</strong> for automated summaries and recommendations.</p><p>Retained as a key QA engineer despite three rounds of contract reductions, recognized for performance, adaptability, and value-added contributions.</p>',
  },
  {
    title:
      'Senior Test Automation Engineer (via Bluecloud, Self-Employed Contractor)',
    company: 'Affirm, United States',
    companyLogo: '/affirm_logo.jpeg',
    companyWebsite: 'https://www.affirm.com/',
    dateRange: 'Sep 2024 - Sep 2025',
    description:
      '<p>Introduced end-to-end automation coverage for the <strong>virtual card lifecycle</strong> (Card Creation, Authorization, Capture, Refund, Reversal), increasing confidence in release readiness.</p><p>Contributed to backend quality by fixing bugs and extending test helper services (sandbox stubs, simulations, mock services) used across engineering teams.</p><p>Added and maintained <strong>unit tests</strong> for backend services supporting the Virtual Card module, ensuring higher reliability and reducing integration defects.</p><p>Enhanced internal <strong>transaction simulation tools</strong>, resolving critical defects and extending unit test coverage to complex edge cases for Affirm’s support workflows.</p><p>Improved Affirm’s shared <strong>Python-based test framework</strong>, making it more maintainable, reusable, and accessible for QA engineers across squads.</p><p>Partnered with developers and product managers to align QA with delivery goals, leveraging <strong>Jira</strong>, <strong>Notion</strong>, <strong>Git</strong>, <strong>Postman</strong>, and internal CI processes.</p>',
  },
  {
    title: 'Lead QA Automation Engineer (Self-Employed Contractor)',
    company: 'Payflow (YC S21), Barcelona, Spain',
    companyLogo: '/payflow_es_logo.png',
    companyWebsite: 'https://www.payflow.es/',
    dateRange: 'Jan 2023 - Feb 2024',
    description:
      '<p>Restructured the QA function from the ground up, transitioning from ad-hoc testing to a scalable team structure across two squads.</p><p>Designed and implemented a mobile automation framework with <strong>WebdriverIO + TypeScript + BrowserStack</strong>, achieving <strong>80% regression coverage</strong> and full <strong>CI/CD</strong> integration with GitHub Actions.</p><p>Delivered web UI coverage with <strong>Selenium + TypeScript</strong> and API automation with <strong>Axios + Jest</strong>, ensuring consistent validation of admin dashboards and public APIs.</p><p>Introduced team-wide QA processes to balance coverage across limited resources (2 QAs), fostering accountability and quality-first delivery.</p><p>Promoted to QA Lead, mentoring engineers and embedding QA practices that increased development speed, reduced escaped defects, and improved release confidence.</p>',
  },
  {
    title: 'QA Automation Engineer (Self-Employed Contractor)',
    company: 'HUBUC, Barcelona, Spain',
    companyLogo: '/hubuc_logo.jpeg',
    companyWebsite: 'https://www.hubuc.com/',
    dateRange: 'Feb 2022 - Jan 2023',
    description:
      '<p>Modernized a legacy <strong>Golang</strong>-based test suite, enhancing its reliability and stability.</p><p>Designed a new <strong>Java</strong>-based regression framework integrated with <strong>Jenkins</strong>, cutting test cycle time by <strong>35%</strong>.</p><p>Integrated smoke tests into the CI pipeline, facilitating early issue detection and faster feedback.</p><p>Achieved a <strong>90%</strong> increase in automation coverage while maintaining performance across existing projects.</p>',
  },
  {
    title: 'Senior Test Solutions Consultant (Testinium, assigned to ABB)',
    company: 'ABB (via Testinium), Istanbul, Turkey',
    companyLogo: '/abb.svg',
    companyWebsite: 'https://abb-bank.az/',
    dateRange: 'Nov 2020 - Feb 2022',
    description:
      '<p>Assumed the role of Senior QA Engineer at the International Bank of Azerbaijan as a Testinium employee.</p><p>Placed and addressed automation needs to expedite testing processes.</p><p>Developed a comprehensive test automation framework using <strong>woodHQ</strong> for a BDD project, enabling seamless mobile, GUI, and API testing.</p><p>Created a user-friendly interface within the framework, allowing non-coders to effortlessly generate new test cases.</p><p>Mentored and trained junior and mid-level QA team members to heighten their self-sufficiency and proficiency in executing automation tests.</p>',
  },
  {
    title: 'Software Quality Assurance Team Lead',
    company: 'Apsiyon, Istanbul',
    companyLogo: '/apsiyon_logo.png',
    companyWebsite: 'https://www.apsiyon.com/en/products/apsiyon',
    dateRange: 'Jun 2018 - Nov 2020',
    description:
      '<p>Led and managed a Test Team for 3 years, overseeing implementation of effective testing processes.</p><p>Pioneered the establishment of the software testing department at Apsiyon.</p><p>Built and trained a proficient test team, maintaining automation projects for <strong>API</strong>, <strong>GUI</strong>, and <strong>Mobile</strong>.</p><p>Restructured existing testing processes, enhancing efficiency and quality.</p><p>Spearheaded development of test automation projects from scratch, improving coverage and capability.</p>',
  },
  {
    title: 'Senior Software Test Engineer',
    company: 'Paytrek, Istanbul',
    companyLogo: '/paytrek_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/paytrek/',
    dateRange: 'Sep 2017 - Apr 2018',
    description:
      '<p>Revamped and optimized test processes, enhancing efficiency and effectiveness.</p><p>Rebuilt a test automation project using <strong>Selenium WebDriver</strong> for API and UI testing.</p><p>Developed comprehensive test case scenarios and documented results.</p><p>Utilized <strong>Jira</strong> for issue reporting, tracking, and coordinated retesting.</p><p>Performed regular regression testing using <strong>Jenkins</strong> to ensure stability prior to publishing.</p>',
  },
  {
    title: 'Software Test Engineer',
    company: 'Trendyol Group, Istanbul',
    companyLogo: '/trendyolgroup_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/trendyolgroup/',
    dateRange: 'Jan 2017 - Aug 2017',
    description:
      '<p>Developed test case scenarios for functional testing and collaborated effectively with developers.</p><p>Executed rigorous functional tests and documented results for analysis.</p><p>Reported and tracked issues using <strong>Jira</strong>; supported efficient resolution.</p><p>Performed retesting after bug fixes and maintenance testing after live deployment.</p><p>Automated test cases using <strong>Selenium WebDriver</strong>, improving efficiency.</p>',
  },
  {
    title: 'Software Test Engineer',
    company: 'Bimsa, Istanbul',
    companyLogo: '/bimsa.png',
    companyWebsite:
      'https://www.linkedin.com/company/bimsa/?originalSubdomain=tr',
    dateRange: 'Nov 2014 - Dec 2016',
    description:
      '<p>Conducted static tests during initial phases of <strong>teknosa.com</strong> projects.</p><p>Prepared test case scenarios for functional testing and shared with developers.</p><p>Performed smoke and functional testing; generated comprehensive reports.</p><p>Reported issues using <strong>Jira</strong> and tracked/retested after fixes.</p><p>Supported <strong>UAT</strong>, provided data for analysis, and conducted regression and maintenance testing post-release.</p><p>Automated test cases using <strong>Selenium WebDriver</strong>.</p>',
  },
  {
    title: 'Software Testing and Quality Specialist',
    company: 'Sigortam.Net, Istanbul',
    companyLogo: '/sigortam_net_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/sigortam-net/',
    dateRange: 'Mar 2013 - Nov 2014',
    description:
      '<p>Executed testing for quality control and UAT while adhering to functional requirements.</p><p>Monitored product usability based on business requirements and technical analysis.</p><p>Developed and implemented test plans for functional, integration, UAT, and performance testing.</p><p>Documented detailed test result reports to identify improvements.</p><p>Ensured test coverage efficiency and used <strong>Selenium IDE</strong> to automate test scripts.</p><p>Provided timely user support by resolving incidents and needs.</p>',
  },
  {
    title: 'Software Testing and Quality Specialist',
    company: 'SET YAZILIM, Istanbul',
    companyLogo: '/setyazilim_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/set-yazilim/',
    dateRange: 'Oct 2011 - Mar 2013',
    description:
      '<p>Developed and documented test scenarios aligned with analysis documents for effective functional testing.</p><p>Supported customers during <strong>UAT</strong> for smooth execution and optimal performance.</p><p>Prepared and delivered customer demos, presentations, and user manuals.</p><p>Conscientiously conducted and documented test runs, maintaining detailed records.</p>',
  },
];

const ExperienceList: React.FC = () => {
  return (
    <ExperienceContainer>
      {experiences.map((experience, index) => (
        <ExperienceItem
          className='experience'
          key={index}
          id={`${experience.company.replace(/[\s,._]+/g, '_').toLowerCase()}_${experience.title.replace(/[\s,._]+/g, '_').toLowerCase()}`}
        >
          <Experience
            title={experience.title}
            description={experience.description}
            company={experience.company}
            dateRange={experience.dateRange}
            companyLogo={experience.companyLogo}
            companyWebsite={experience.companyWebsite}
          />
        </ExperienceItem>
      ))}
    </ExperienceContainer>
  );
};

const Experience: React.FC<Experience> = ({
  title,
  description,
  company,
  dateRange,
  companyLogo,
  companyWebsite,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const lastIndex: number = description.indexOf('</p>', 200);
  const descriptionToShow = showFullDescription
    ? description
    : description.slice(0, lastIndex);

  return (
    <ExperienceItem>
      <ExperienceHeader
        onClick={toggleDescription}
        className='experience-header'
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href={companyWebsite}
            target='_blank'
            rel='noopener noreferrer'
            className='companyWebsite'
          >
            <CompanyLogoWrapper className='companyLogo'>
              <Image
                src={companyLogo}
                alt={`${company} logo`}
                width={48}
                height={48}
                style={{ objectFit: 'contain' }}
              />
            </CompanyLogoWrapper>
          </a>
          <div>
            <ExperienceTitle
              className='experienceTitle'
              id={title.replace(/[\s,._]+/g, '_').toLowerCase()}
            >
              {title}
            </ExperienceTitle>
            <a
              href={companyWebsite}
              target='_blank'
              rel='noopener noreferrer'
              className='companyWebsite'
            >
              <ExperienceCompany
                id={company.replace(/[\s,._]+/g, '_').toLowerCase()}
              >
                {company}
              </ExperienceCompany>
            </a>
          </div>
        </div>
        <ExperienceDateRange className='experience-date-range'>
          {dateRange}
        </ExperienceDateRange>
      </ExperienceHeader>
      <ExperienceContent className='experience-content'>
        {HtmlParser(descriptionToShow)}
        {description.length > 300 && (
          <SeeMoreLink onClick={toggleDescription} className='see-more-link'>
            {showFullDescription ? ' See less' : 'See more'}
          </SeeMoreLink>
        )}
      </ExperienceContent>
    </ExperienceItem>
  );
};

export default ExperienceList;
