/**
 * Profile and page content configuration.
 * Centralizes content for the resume index page.
 */

export const profile = {
  name: 'Mehmet Serhat Ozdursun',
  title: `Lead QA Automation Engineer | AI-Driven Quality Engineering | Mobile, API & CI/CD`,
  titleSubtitle: 'ISTQB® CTAL-TM, CTAL-TAE, CTFL | Scrum.org PSD I',
  titleExperience: '13+ Years in Quality Engineering',
  email: 'serhat.ozdursun@gmail.com',
  phone: '+905368361407',
  languages: 'Turkish (Native), English (C1), Spanish (B)',
} as const;

export const summary = `
  <p style="text-align: justify;">
    <strong>Lead QA Automation Engineer</strong> with <strong>13+ years</strong> of experience delivering end-to-end quality engineering across mobile, web, and API platforms.
  </p>

  <p style="text-align: justify;">
    I specialize in building scalable automation frameworks, embedding quality across CI/CD pipelines, and defining automation strategy while staying hands-on.
  </p>

  <p style="text-align: justify;">
    Throughout my career, I have led QA initiatives across <strong>fintech</strong>, <strong>SaaS</strong>, and enterprise systems, increasing release confidence, reducing production defects, and improving delivery speed.
  </p>

  <p style="text-align: justify;">
    Recently, I have focused on <strong>AI-assisted testing</strong>, applying practical approaches to improve automation speed, reduce maintenance overhead, and support more scalable quality engineering practices.
  </p>

  <p style="text-align: justify;">
    I currently work in <strong>full-time contract roles as a Lead QA Automation Engineer</strong>, partnering with distributed teams to lead quality initiatives across large-scale mobile commerce platforms.
  </p>
`;

export const meta = {
  title:
    'Lead QA Automation Engineer | AI-Driven Quality Engineering | ISTQB® CTAL-TM, CTAL-TAE & CTFL | 13+ Years',
  description:
    'Lead QA Automation Engineer with 13+ years of experience across mobile, web, and API platforms — building scalable test frameworks, integrating CI/CD quality gates, and driving AI-assisted testing.',
  ogTitle: 'Mehmet Serhat Özdursun - Lead QA Automation Engineer',
  ogDescription:
    'Lead QA Automation Engineer with 13+ years of experience across mobile, web, and API platforms — building scalable test frameworks and driving AI-assisted quality engineering.',
  keywords:
    'Lead QA Automation Engineer, QA Automation, Test Automation, AI-Driven Testing, Mehmet Serhat Özdursun',
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
  jobTitle: 'Lead QA Automation Engineer',
  url: `${siteUrl}/`,
  sameAs: [
    'https://www.linkedin.com/in/serhat-ozdursun/',
    'https://github.com/serhatozdursun',
    'https://medium.com/@serhat-ozdursun',
  ],
  image: `${siteUrl}/profile.png`,
  description:
    'Lead QA Automation Engineer with 13+ years of experience across mobile, web, and API platforms — building scalable test frameworks and driving AI-assisted quality engineering.',
  email: 'serhat.ozdursun@gmail.com',
  telephone: '+905368361407',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rize',
    addressRegion: 'Findikli',
    addressCountry: 'Turkey',
  },
});
