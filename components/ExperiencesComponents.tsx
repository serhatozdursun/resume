import React, {useState} from 'react';
import HtmlParser from 'html-react-parser';
import {
    ExperienceHeader,
    ExperienceTitle,
    ExperienceCompany,
    ExperienceDateRange,
    ExperienceContent,
    SeeMoreLink,
    ExperienceContainer,
    ExperienceItem,
    CompanyLogo
} from './StyledComponents';

export interface Experience {
    title: string;
    company: string;
    companyLogo: string;
    companyWebsite: string;
    dateRange: string;
    description: string;
}

const experiences: Experience[] = [
    {
        title: 'Senior QA Automation Engineer',
        company: 'Index, London',
        companyLogo: '/indexdev_logo.jpeg',
        companyWebsite: 'https://www.index.dev/',
        dateRange: 'Mar 2024 - Present',
        description: '<p>Ever since I embarked on my journey as a <strong>Senior QA Automation Engineer</strong>, I\'ve found myself immersed in a world of innovation and collaboration. Contracted through <strong>index.dev</strong>, I\'ve had the privilege of working with <strong>Poq</strong>, a dynamic company renowned for its cutting-edge mobile commerce solutions.</p><p><strong>Responsibilities:</strong></p><p>My role revolves around ensuring the quality and reliability of mobile applications, predominantly leveraging Java and Appium. However, what truly sets Poq apart is our dedication to seamless integration and comprehensive testing. With Postman at our fingertips, I delve into backend automation testing, while also embracing manual testing methodologies to ensure thorough coverage and precision in our quality assurance efforts.</p><p><strong>Collaboration:</strong></p><p>But it\'s not a solo journey. Collaboration is the beating heart of our success. Daily, I find myself engaging with cross-functional teams, harmonizing our efforts to elevate our testing processes. Together, we navigate challenges and innovate solutions, fostering an environment where every voice is valued.</p>',
    },
    {
        title: 'Lead QA Automation Engineer',
        company: 'Payflow, Madrid',
        companyLogo: '/payflow_es_logo.jpeg',
        companyWebsite: 'https://www.payflow.es/en/payflow',
        dateRange: 'Jan 2023 - Feb 2024',
        description: '<p><strong>Contributed</strong> to the team in guaranteeing the quality of Payflow\'s three products: Payflow Mobile UI app, Dashboard Web UI app, and Public API.</p><p><strong>Actively</strong> participated in the agile development team\'s manual test load during sprints.</p><p><strong>Developed</strong> a Test Automation Project for the Payflow Mobile UI app, using <strong>Webdriver IO</strong> and The <strong>Cucumber</strong> with <strong>Nodejs/TypeScript.</strong> Automated tests were operated on BrowserStack and were compatible with both iOS and Android platforms.</p><p><strong>Actualized</strong> Test Automation Project for the web app, which will employ the Selenium-js npm package and The Cucumber.</p><p>Looking forward to future collaboration with the QA Team in planning and following through a Test Automation Project for the Public API.</p>',
    },
    {
        title: 'QA Automation Engineer',
        company: 'HUBUC, Barcelona',
        companyLogo: '/hubuc_logo.jpeg',
        companyWebsite: 'https://hubuc.com/',
        dateRange: 'Mar 2022 - Jan 2023',
        description: '<p><strong>Successfully</strong> resolved all issues in an outdated Golang-based test automation project as part of my role as a QA Automation Engineer</p><p><strong>Spearheaded</strong> the development of a new test automation project using Java, resulting in a regression suite that is now running periodically on Jenkins with a custom job</p> <p><strong>Followed through</strong> plans to integrate the smoke suite into the CI pipeline in the near future</p> <p><strong>Defined and implemented</strong> a sanity test suite for developers to run on their local environments, amending overall testing efficiency</p> <p>Took charge of streamlining all test processes while concurrently expanding test automation coverage and maintaining the existing test automation project</p> <p>Developed two additional projects (modules), including one that generates test data for the Front-End team\'s new environments</p>',
    },
    {
        title: 'Senior Test Solutions Consultant',
        company: 'Testinium, İstanbul',
        companyLogo: '/testinium_logo.jpeg',
        companyWebsite: 'https://testinium.com/',
        dateRange: 'Nov 2020 - Feb 2022',
        description: '<p><strong>Assumed</strong> the role of Senior QA Engineer at the International Bank of Azerbaijan as a Testinium employee</p><p><strong>Placed and</strong> addressed automation needs to expedite testing processes</p><p><strong>Developed</strong> a comprehensive test automation framework usingwoodHQ for a BDD project, enabling seamless mobile, GUI, and API testing</p><p><strong>Created</strong> a user-friendly interface within the framework, allowing non-coders to effortlessly generate new test cases</p> <p><strong>Mentored</strong> and trained junior and mid-level quality assurance team members to heighten their self-sufficiency and proficiency in acquitting automation tests.</p>',
    },
    {
        title: 'Software Quality Assurance Team Lead',
        company: 'Apsiyon, İstanbul',
        companyLogo: '/apsiyon_logo.jpeg',
        companyWebsite: 'https://www.apsiyon.com/en/products/apsiyon',
        dateRange: 'Jun 2018 - Nov 2020',
        description: '<p><strong>Led</strong> and managed a Test Team at Apsiyon for a duration of 3 years, overseeing the implementation of effective software testing processes.</p> <p><strong>Pioneered</strong> the establishment of the software testing department at Apsiyon, becoming the first employee dedicated to this area.</p> <p><strong>Successfully</strong> built and trained a proficient test team, enabling them to effectively maintain automation projects for <strong>API services</strong>, <strong>GUI</strong>, and <strong>Mobile platforms.</strong></p> <p><strong>Restructured</strong> existing software testing processes, enhancing efficiency and quality throughout the organization.</p> <p><strong>Spearheaded</strong> the development of software <strong>test automation projects</strong> from scratch, securing comprehensive coverage and improving overall testing capabilities.</p>',
    },
    {
        title: 'Senior Software Test Engineer',
        company: 'Paytrek, İstanbul',
        companyLogo: '/paytrek_logo.jpeg',
        companyWebsite: 'https://www.linkedin.com/company/paytrek/',
        dateRange: 'Sep 2017 - Apr 2018',
        description: `<p><strong>Revamped</strong> and optimized test processes, enhancing efficiency and effectiveness</p> <p><strong>Spearheaded</strong> the reconstruction of a test automation project, leveraging Selenium WebDriver for API and UI testing</p> <p><strong>Developed</strong> comprehensive test case scenarios for rigorous functional testing</p> <p><strong>Executed</strong> functional test scenarios and meticulously documented and reported test results</p> <p><strong>Utilized</strong> Jira for issue reporting, tracking, and coordinated retesting after bug fixing</p> <p><strong>Behaved</strong> regular regression testing using Jenkins to insure code stability prior to publishing</p>`,
    },
    {
        title: 'Software Test Engineer',
        company: 'Trendyol Group , İstanbul',
        companyLogo: '/trendyolgroup_logo.jpeg',
        companyWebsite: 'https://www.linkedin.com/company/trendyolgroup/',
        dateRange: 'Jan 2017 - Aug 2017',
        description: `<p><strong>Developed</strong> comprehensive test case scenarios for functional testing, <strong>guaranteeing</strong> effective collaboration with developers</p> <p><strong>Executed</strong> rigorous functional test scenarios and meticulously documented the results for accurate analysis and reporting</p> <p><strong>Proficiently</strong> reported and tracked issues established on meticulous test results using Jira, promoting efficient bug fixing and resolution</p> <p><strong>Dealt</strong> thorough retesting of identified issues after bug fixing, assuring the attainment of optimal software quality</p> <p><strong>Performed</strong> efficient maintenance testing after live deployment to ascertain the ongoing reliability and functionality of the software</p> <p><strong>Successfully</strong> automated test cases using Selenium Webdriver, enhancing testing efficiency and overall productivity.</p>`,
    },
    {
        title: 'Software Test Engineer',
        company: 'Bimsa, İstanbul',
        companyLogo: '/1631311527531.jpeg',
        companyWebsite: 'https://www.linkedin.com/company/bimsa/?originalSubdomain=tr',
        dateRange: 'Nov 2014 - Dec 2016',
        description: `<p><strong>Conducted</strong> static tests on test bases during the initial phase of teknosa.com projects</p> <p><strong>Prepared</strong> test case scenarios for functional testing and shared them with developers</p> <p><strong>Performed</strong> smoke testing after running test cases to guarantee system stability</p> <p><strong>Executed</strong> functional test scenarios and generated comprehensive reports on the results</p> <p>Reported issues based on test results using <strong>Jira</strong> and actively tracked and retested those issues after bug fixing</p> <p>Supported <strong>user acceptance testing (UAT)</strong> and supplied valuable data to product teams for UAT analysis</p> <p><strong>Conducted</strong> regression testing following UAT completion and live release to secure system integrity</p> <p><strong>Performed</strong> maintenance testing post live deployment to identify and rectify any potential issues</p> <p>Automated <strong>test cases</strong> using Selenium Webdriver for improved efficiency and accuracy.</p>`,
    },
    {
        title: 'Software Testing and Quality Specialist',
        company: 'Sigortam.Net, İstanbul',
        companyLogo: '/sigortam_net_logo.jpeg',
        companyWebsite: 'https://www.linkedin.com/company/sigortam-net/',
        dateRange: 'Mar 2013 - Nov 2014',
        description: '<p><strong>Conducted</strong> thorough analysis and <strong>executed</strong> rigorous testing procedures to ensure quality control and user acceptance of software products, while adhering to functional requirements.</p> <p><strong>Monitored</strong> and <strong>controlled</strong> the usability of the product based on business requirements and technical analysis.</p> <p><strong>Developed</strong> and <strong>implemented</strong> comprehensive test plans, letting in functional, integration, user acceptance, performance, and other testing approaches.</p> <p><strong>Documented</strong> detailed test result reports to provide clear insights on software performance and identify areas for improvement.</p> <p><strong>Oversaw</strong> test coverage to ensure maximum efficiency and effectiveness in detecting potential issues.</p> <p>Utilized automation tools such as <strong>Selenium IDE</strong> to create automated test scripts, streamlining the testing process and improving overall productivity.</p> <p>Provided exceptional support to users by promptly resolving incidents and effectively addressing their needs.</p>',
    },
    {
        title: 'Software Testing and Quality Specialist',
        company: 'SET YAZILIM, İstanbul',
        companyLogo: '/setyazilim_logo.jpeg',
        companyWebsite: 'https://www.linkedin.com/company/set-yazilim/',
        dateRange: 'Oct 2011 - Mar 2013',
        description: '<p><strong>Developed</strong> and <strong>documented</strong> comprehensive test scenarios, aligned with analysis documents, to ensure effective functional testing and accurately report results</p> <p><strong>Plied</strong> expert support and guidance to customers during <strong>User Acceptance Testing (UAT)</strong> phase, ensuring smooth execution and optimal product performance</p> <p><strong>Prepared</strong> and <strong>delivered</strong> impressive customer demos, presentations, and user manuals, showcasing the software\'s features and benefits</p> <p><strong>Conscientiously</strong> conducted and <strong>meticulously</strong> documented test runs, maintaining a meticulous record of findings and observations</p>',
    },
];



const ExperienceList: React.FC = () => {
    return (
        <ExperienceContainer>
            {experiences.map((experience, index) => (
                <ExperienceItem key={index}>
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

const Experience: React.FC<Experience> = ({ title, description, company, dateRange, companyLogo, companyWebsite }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };
    const lastIndex:number = description.indexOf('</p>', 200);
    const descriptionToShow = showFullDescription ? description : description.slice(0, lastIndex);

    return (
        <div>
            <ExperienceHeader onClick={toggleDescription}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a href={companyWebsite} target="_blank" rel="noopener noreferrer">
                        <CompanyLogo src={companyLogo} alt={`${company} logo`} />
                    </a>
                    <div>
                        <ExperienceTitle>{title}</ExperienceTitle>
                        <ExperienceCompany>{company}</ExperienceCompany>
                    </div>
                </div>
                <ExperienceDateRange>{dateRange}</ExperienceDateRange>
            </ExperienceHeader>
            <ExperienceContent>
                {HtmlParser(descriptionToShow)}
                {description.length > 300 && (
                    <SeeMoreLink onClick={toggleDescription}>
                        {showFullDescription ? ' See less' : 'See more'}
                    </SeeMoreLink>
                )}
            </ExperienceContent>
        </div>
    );
};

export default ExperienceList;
