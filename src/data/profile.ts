/**
 * Profile and page content configuration.
 * Centralizes content for the resume index page.
 */

export const profile = {
  name: 'Mehmet Serhat Ozdursun',
  title: `QA Manager & Lead QA Automation Engineer | AI-Driven Quality Engineering | Mobile, Web & API | CI/CD`,
  titleSubtitle:
    'AT*SQA Advisory Board 2026 | ISTQB® CTAL-TM, CTAL-TAE, CTFL | Scrum.org PSD I',
  titleExperience: '13+ Years in Quality Engineering',
  email: 'serhat.ozdursun@gmail.com',
  phone: '+905368361407',
  languages: 'Turkish (Native), English (C1), Spanish (B)',
} as const;

export const summary = `
  <p style="text-align: justify;">
    <strong>QA Manager & Lead QA Automation Engineer</strong> with <strong>13+ years</strong> of experience delivering end-to-end quality engineering across mobile, web, and API platforms.
  </p>

  <p style="text-align: justify;">
    I combine people management and QA strategy with hands-on technical leadership in automation architecture, performance testing, and CI/CD quality engineering.
  </p>

  <p style="text-align: justify;">
    Throughout my career, I have led QA initiatives across <strong>fintech</strong>, <strong>SaaS</strong>, and enterprise systems, increasing release confidence, reducing production defects, and improving delivery speed.
  </p>

  <p style="text-align: justify;">
    I lead <strong>AI adoption in Quality Engineering</strong>, designing reusable agent and skill architectures for workflows spanning requirements analysis, test design, automation generation, failure analysis, and defect management, with a focus on security, maintainability, and governance.
  </p>

  <p style="text-align: justify;">
    Since <strong>July 2026</strong>, I have worked as <strong>QA Manager, AI & Testing Innovation at PulsePoint</strong>, leading a globally distributed QA engineering team and partnering with Engineering, Product, DevOps, and Architecture teams to align quality initiatives with business and technology objectives.
  </p>
`;

export const meta = {
  title:
    'QA Manager & Lead QA Automation Engineer | AI-Driven Quality Engineering | AT*SQA Advisory Board 2026 | 13+ Years',
  description:
    'QA Manager, AI & Testing Innovation at PulsePoint with 13+ years in quality engineering, leading distributed QA teams, automation architecture, and agentic AI workflows.',
  ogTitle: 'Mehmet Serhat Özdursun - QA Manager & Lead QA Automation Engineer',
  ogDescription:
    'QA Manager and hands-on automation leader at PulsePoint, driving AI-powered quality engineering, scalable test architecture, and globally distributed QA teams.',
  keywords:
    'QA Manager, Lead QA Automation Engineer, QA Automation, Test Automation, AI-Driven Quality Engineering, PulsePoint, Mehmet Serhat Özdursun',
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
    id: 'mentorshipPage',
    href: '/mentorship',
    label: 'Mentorship & Knowledge Sharing',
    icon: '/mentor.png',
    iconAlt: 'Mentorship & Knowledge Sharing',
    trackEvent: {
      event: 'mentorship_page',
      category: 'mentorship',
      label: 'Mentorship & Knowledge Sharing',
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
  jobTitle: 'QA Manager, AI & Testing Innovation',
  worksFor: {
    '@type': 'Organization',
    name: 'PulsePoint',
    url: 'https://www.pulsepoint.com/',
  },
  url: `${siteUrl}/`,
  sameAs: [
    'https://www.linkedin.com/in/serhat-ozdursun/',
    'https://github.com/serhatozdursun',
    'https://medium.com/@serhat-ozdursun',
  ],
  image: `${siteUrl}/profile.png`,
  description: meta.ogDescription,
  email: 'serhat.ozdursun@gmail.com',
  telephone: '+905368361407',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Muğla',
    addressCountry: 'Turkey',
  },
});
