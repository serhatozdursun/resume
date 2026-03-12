/**
 * Profile and page content configuration.
 * Centralizes content for the resume index page.
 */

export const profile = {
  name: 'Mehmet Serhat Ozdursun',
  title: `QA Leader | Senior SDET | 2026 AT*SQA Advisory Board – Emerging
                Leaders`,
  titleSubtitle: 'ISTQB® CTAL-TM, CTAL-TAE, CTFL | Scrum.org PSD I',
  titleExperience: '13+ Years in Quality Engineering',
  email: 'serhat.ozdursun@gmail.com',
  phone: '+905368361407',
  languages: 'Turkish (Native), English (C1), Spanish (B)',
} as const;

export const summary = `
  <p style="text-align: justify;">
    Senior <strong>QA Automation Leader</strong> with <strong>13+ years</strong> of experience driving quality engineering across SaaS, fintech, and enterprise platforms. Certified in 
    <strong>ISTQB® Certified Tester Advanced Level – Test Management (CTAL-TM v3.0)</strong>, 
    <strong>Test Automation Engineer (CTAL-TAE)</strong>, <strong>Foundation Level (CTFL)</strong>, 
    and <strong>Professional Scrum Developer (PSD I)</strong>. 
    Expert in architecting scalable, AI-assisted test automation frameworks across mobile, <strong>web</strong>, and <strong>API</strong> layers using 
    <strong>Java</strong>, <strong>Python</strong>, and .NET (C#) with <strong>Appium</strong>, <strong>Selenium</strong>, and <strong>SpecFlow</strong>. 
    Skilled in <strong>CI/CD integration</strong> (Azure DevOps, Jenkins, GitHub Actions), 
    performance testing (JMeter, k6), and implementing <strong>shift-left</strong>, 
    risk-based, and data-driven quality strategies
  </p>

  <p style="text-align: justify;">
    I specialize in aligning QA with business objectives to deliver scalable, reliable, and high-impact software at speed. 
    Passionate about <strong>mentoring teams</strong>, improving test efficiency, and fostering a 
    quality-first culture, I focus on creating automation solutions that reduce defect rates, 
    accelerate delivery, and strengthen customer confidence.
  </p>

  <p style="text-align: justify;">
    Since 2022, I have been working as an <strong>independent QA Automation Consultant</strong>, partnering with 
    leading international clients including <strong>Affirm</strong>, <strong>Poq</strong>, <strong>Payflow</strong>, and <strong>Hubuc</strong>. 
    My work integrates <strong>AI-driven testing</strong>, performance optimization, and 
    service virtualization to enhance release confidence, increase quality maturity, and drive measurable ROI.
  </p>
`;

export const meta = {
  title:
    'QA Leader | Senior SDET | ISTQB® CTAL-TM, CTAL-TAE & CTFL PSD I | 13+ Years in Quality Engineering',
  description:
    'Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions',
  ogTitle: 'Mehmet Serhat Özdursun - QA Automation Engineer',
  ogDescription:
    'Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions.',
  keywords:
    'QA Automation Engineer, Software Testing, Mehmet Serhat Özdursun, Resume',
  author: 'Mehmet Serhat Özdursun',
} as const;

export interface SidebarLink {
  id: string;
  href: string;
  label: string;
  icon: string;
  iconAlt: string;
  title?: string;
  trackEvent?: { event: string; category: string; label: string };
}

export const sidebarLinks: SidebarLink[] = [
  {
    id: 'downloadResumeLink',
    href: 'https://drive.google.com/file/d/1wQuZyIB8PJnpUnjRJPlQJs8u_hEITzc6/view?usp=sharing',
    label: 'Download Resume',
    icon: '/resume-computer-icons.png',
    iconAlt: 'resume',
    trackEvent: {
      event: 'download_resume',
      category: 'resume',
      label: 'Download Resume',
    },
  },
  {
    id: 'goAtsqa',
    href: 'https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229',
    label: 'Official U.S. List',
    icon: '/certified-tester-minimal-logo.png',
    iconAlt: 'atsqa-logo',
    title: 'Official U.S. List of Certified & Credentialed Software Testers™',
    trackEvent: {
      event: 'goAtsqa',
      category: 'List',
      label: 'Official U.S. List',
    },
  },
  {
    id: 'recommendation',
    href: 'https://www.linkedin.com/in/serhat-ozdursun/details/recommendations/',
    label: 'Recommendations',
    icon: '/recommandation.png',
    iconAlt: 'recommendation',
    trackEvent: {
      event: 'recommendations',
      category: 'linkedin',
      label: 'Linkedin Recommendations',
    },
  },
  {
    id: 'practicePage',
    href: '/practice',
    label: 'Practice Page',
    icon: '/Manual_Testing.png',
    iconAlt: 'Practice Page',
  },
  {
    id: 'CtalTaeExam',
    href: '/ctal-tae-exam',
    label: 'CTAL-TAE Sample Exam',
    icon: '/CTAL-TAE-EXAMpng.png',
    iconAlt: 'CTAL-TAE Exam',
  },
  {
    id: 'CtalTmExam',
    href: '/ctal-tm-exam',
    label: 'CTAL-TM Sample Exam',
    icon: '/catl_tm_exam.png',
    iconAlt: 'CTAL-TM Exam',
  },
];

export interface SocialLink {
  href: string;
  icon: string;
  alt: string;
  trackEvent?: { event: string; category: string; label: string };
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/serhat-ozdursun/',
    icon: '/linkedin-icon.png',
    alt: 'LinkedIn',
    trackEvent: {
      event: 'navigate_linkedin',
      category: 'linkedin',
      label: 'Linkedin',
    },
  },
  {
    href: 'https://www.upwork.com/freelancers/~012512aef2eaee40a9',
    icon: '/upwork.png',
    alt: 'upwork',
  },
  {
    href: 'https://github.com/serhatozdursun',
    icon: '/github-icon.png',
    alt: 'GitHub',
    trackEvent: {
      event: 'navigate_github',
      category: 'github',
      label: 'Github',
    },
  },
  {
    href: 'https://atsqa.org/certified-testers/profile/dff138edc5684bd8aef8a2ca49779229',
    icon: '/certified-tester-logo.svg',
    alt: 'atsqa.org',
    trackEvent: {
      event: 'navigate_atsqa',
      category: 'atsqa',
      label: 'AT*SQA Profile',
    },
  },
  {
    href: 'https://medium.com/@serhat-ozdursun',
    icon: '/medium_icon.png',
    alt: 'medium',
  },
  {
    href: 'https://www.hackerrank.com/profile/serhat_ozdursun',
    icon: '/hackerrank.png',
    alt: 'HackerRank',
  },
  {
    href: 'https://dev.to/serhat_ozdursun_03644ef56',
    icon: '/dev.webp',
    alt: 'dev',
  },
];

export const getStructuredData = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mehmet Serhat Özdursun',
  jobTitle: 'QA Automation Engineer',
  url: `${siteUrl}/`,
  sameAs: [
    'https://www.linkedin.com/in/serhat-ozdursun/',
    'https://github.com/serhatozdursun',
    'https://medium.com/@serhat-ozdursun',
  ],
  image: `${siteUrl}/profile.png`,
  description:
    'Experienced QA Automation Engineer with 10+ years in software testing, delivering comprehensive and efficient testing solutions',
  email: 'serhat.ozdursun@gmail.com',
  telephone: '+905368361407',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rize',
    addressRegion: 'Findikli',
    addressCountry: 'Turkey',
  },
});
