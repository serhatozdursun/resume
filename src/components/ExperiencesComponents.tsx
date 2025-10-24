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
      '<p>At Poq, improved mobile app quality by upgrading the <strong>Java</strong> + Appium automation framework (executed via BrowserStack), strengthening regression coverage and reducing production issues.</p><p>Led a full audit and update of <strong>TestRail</strong> regression suites for <strong>40+ enterprise retail brands</strong> (e.g., Hot Topic, e.l.f. Beauty, Cotton Traders, SNIPES), ensuring coverage reflected unique client customizations.</p><p>Revamped and integrated <strong>Postman API</strong> test collections into <strong>Azure Pipelines (CI/CD)</strong>, reducing execution time by <strong>30%</strong> and boosting reliability.</p><p>Drove performance testing for large-scale retail events (e.g., Black Friday, major client launches) using <strong>JMeter + Python</strong> on <strong>Azure VMs</strong>, proactively identifying and resolving bottlenecks.</p><p>Built an <strong>AI-powered Python tool</strong> to analyze JMeter results and generate QA insights; later extended it with <strong>OpenAI APIs</strong> for automated summaries and recommendations.</p><p>Retained as a key QA engineer despite three rounds of contract reductions, recognized for performance, adaptability, and value-added contributions.</p>',
  },
  {
    title:
      'Senior Test Automation Engineer (via Bluecloud, Self-Employed Contractor)',
    company: 'Affirm, United States',
    companyLogo: '/affirm_logo.jpeg',
    companyWebsite: 'https://www.affirm.com/',
    dateRange: 'Jun 2022 - Aug 2023',
    description:
      '<p>Introduced end-to-end automation coverage for the <strong>virtual card lifecycle</strong> (Card Creation, Authorization, Capture, Refund, Reversal), increasing confidence in release readiness.</p><p>Contributed to backend quality by fixing bugs and extending test helper services (sandbox stubs, simulations, mock services) used across engineering teams.</p><p>Added and maintained <strong>unit tests</strong> for backend services supporting the Virtual Card module, ensuring higher reliability and reducing integration defects.</p><p>Enhanced internal <strong>transaction simulation tools</strong>, resolving critical defects and extending unit test coverage to complex edge cases for Affirm’s support workflows.</p><p>Improved Affirm’s shared <strong>Python-based test framework</strong>, making it more maintainable, reusable, and accessible for QA engineers across squads.</p><p>Partnered with developers and product managers to align QA with delivery goals, leveraging <strong>Jira</strong>, <strong>Notion</strong>, <strong>Git</strong>, <strong>Postman</strong>, and internal CI processes.</p>',
  },
  {
    title: 'Lead QA Automation Engineer (Self-Employed Contractor)',
    company: 'Payflow (via Hubuc), Barcelona, Spain',
    companyLogo: '/payflow_es_logo.png',
    companyWebsite: 'https://www.payflow.es/',
    dateRange: 'Mar 2021 - Jun 2022',
    description:
      '<p>Initially joined as a QA Automation Engineer for Hubuc under a self-employed contract; after company restructuring, continued under the same contract with Payflow.</p><p>Restructured QA from ad-hoc to a scalable team structure across two squads.</p><p>Designed and implemented a mobile automation framework using <strong>WebdriverIO + TypeScript + BrowserStack</strong>, achieving <strong>80% regression coverage</strong> and full <strong>CI/CD</strong> integration with GitHub Actions.</p><p>Delivered web UI coverage with <strong>Selenium + TypeScript</strong> and API automation with <strong>Axios + Jest</strong>.</p><p>Mentored engineers and embedded QA practices that increased development speed, reduced escaped defects, and improved release confidence.</p>',
  },
  {
    title: 'Senior Test Solutions Consultant (Testinium, assigned to ABB)',
    company: 'ABB (via Testinium), Istanbul, Turkey',
    companyLogo: '/abb.svg',
    companyWebsite: 'https://abb-bank.az/',
    dateRange: 'Nov 2019 - Mar 2021',
    description:
      '<p>Served as Senior QA Engineer at the <strong>International Bank of Azerbaijan</strong> under Testinium.</p><p>Developed a comprehensive <strong>Java + Gauge + Appium + Rest-Assured</strong> automation framework enabling unified web, mobile, and API testing.</p><p>Delivered extensive API coverage for critical REST endpoints, reducing integration defects.</p><p>Mentored junior engineers, promoting a self-sufficient and quality-driven team culture.</p><p>Integrated automation with CI/CD pipelines to accelerate release validation.</p>',
  },
  {
    title: 'Software Quality Assurance Team Lead',
    company: 'Apsiyon, Istanbul',
    companyLogo: '/apsiyon_logo.png',
    companyWebsite: 'https://www.apsiyon.com/en/products/apsiyon',
    dateRange: 'Jun 2017 - Nov 2019',
    description:
      '<p>Joined as the first QA hire and promoted to QA Lead within 6 months.</p><p>Built and mentored a team of 5 engineers, establishing QA from scratch.</p><p>Developed a comprehensive test automation framework using <strong>.NET (C#) + SpecFlow + Appium + RestSharp</strong>, increasing coverage by <strong>60%</strong>.</p><p>Integrated <strong>Azure DevOps</strong> pipelines and <strong>SonarQube</strong>, reducing validation time by 40%.</p><p>Fostered a culture of continuous improvement and shift-left testing.</p>',
  },
  {
    title: 'Software Test Engineer',
    company: 'Trendyol Group, Istanbul',
    companyLogo: '/trendyolgroup_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/trendyolgroup/',
    dateRange: 'Jan 2016 - Jun 2017',
    description:
      '<p>Developed test case scenarios and collaborated with developers to ensure comprehensive coverage.</p><p>Automated key functional test flows using <strong>Selenium WebDriver</strong>, reducing manual regression time.</p><p>Performed regression and maintenance testing post-deployment.</p><p>Tracked and resolved defects efficiently using <strong>Jira</strong>.</p>',
  },
  {
    title: 'Software Test Engineer',
    company: 'Bimsa, Istanbul',
    companyLogo: '/bimsa.png',
    companyWebsite:
      'https://www.linkedin.com/company/bimsa/?originalSubdomain=tr',
    dateRange: 'Nov 2013 - Jan 2016',
    description:
      '<p>Led functional, smoke, and <strong>UAT</strong> testing for <strong>teknosa.com</strong> projects, ensuring release stability.</p><p>Automated key test flows using <strong>Selenium WebDriver</strong> to improve accuracy and efficiency.</p><p>Developed and maintained test cases for API and UI validation.</p><p>Collaborated with developers to troubleshoot issues and refine release quality.</p>',
  },
  {
    title: 'Software Testing and Quality Specialist',
    company: 'Sigortam.Net, Istanbul',
    companyLogo: '/sigortam_net_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/sigortam-net/',
    dateRange: 'Mar 2012 - Nov 2013',
    description:
      '<p>Planned and executed comprehensive testing across functional, integration, and user acceptance layers.</p><p>Automated repeatable test flows using <strong>Selenium IDE</strong>, increasing test efficiency.</p><p>Created and managed detailed test reports to support data-driven quality analysis.</p><p>Collaborated with business stakeholders to ensure user acceptance and delivery alignment.</p>',
  },
  {
    title: 'Software Testing and Quality Specialist',
    company: 'SET YAZILIM, Istanbul',
    companyLogo: '/setyazilim_logo.png',
    companyWebsite: 'https://www.linkedin.com/company/set-yazilim/',
    dateRange: 'Oct 2010 - Mar 2012',
    description:
      '<p>Designed and executed functional test scenarios aligned with business requirements.</p><p>Provided expert support to customers during <strong>User Acceptance Testing (UAT)</strong>.</p><p>Delivered training, demos, and documentation to ensure smooth onboarding.</p><p>Executed and documented test results, supporting continuous product improvement.</p>',
  },
];

const ExperienceList: React.FC = () => {
  // Helper function to generate unique IDs
  const generateExperienceId = (company: string, title: string): string => {
    const cleanCompany = company.replace(/[\s,._]+/g, '_').toLowerCase();
    const cleanTitle = title.replace(/[\s,._]+/g, '_').toLowerCase();
    return `${cleanCompany}_${cleanTitle}`;
  };

  return (
    <ExperienceContainer>
      {experiences.map((experience, index) => (
        <ExperienceItem
          className='experience'
          key={index}
          id={generateExperienceId(experience.company, experience.title)}
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

  const lastIndex: number = description.indexOf('</p>', 300);
  const descriptionToShow = showFullDescription
    ? description
    : description.slice(0, lastIndex);

  // Common link props to avoid duplication
  const companyLinkProps = {
    href: companyWebsite,
    target: '_blank' as const,
    rel: 'noopener noreferrer',
    className: 'companyWebsite',
  };

  // Common styles to avoid duplication
  const containerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  };

  const textSectionStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  };

  const companyDateStyles = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '4px',
    marginTop: '1px',
  };

  return (
    <ExperienceItem>
      <ExperienceHeader
        onClick={toggleDescription}
        className='experience-header'
      >
        <div style={containerStyles}>
          {/* Company Logo */}
          <a {...companyLinkProps}>
            <CompanyLogoWrapper className='companyLogo'>
              <Image
                src={companyLogo}
                alt={`${company} logo`}
                width={55}
                height={55}
                style={{ objectFit: 'contain' }}
              />
            </CompanyLogoWrapper>
          </a>

          {/* Text Section */}
          <div style={textSectionStyles}>
            {/* Title line */}
            <ExperienceTitle className='experienceTitle'>
              {title}
            </ExperienceTitle>

            {/* Company + Date line */}
            <div style={companyDateStyles}>
              <a {...companyLinkProps}>
                <ExperienceCompany>{company}</ExperienceCompany>
              </a>
              <span style={{ color: '#666' }}>—</span>
              <ExperienceDateRange className='experience-date-range'>
                {dateRange}
              </ExperienceDateRange>
            </div>
          </div>
        </div>
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
