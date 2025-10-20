import React from 'react';
import ExamPage from '../components/ExamPage';

const CTALTMExam: React.FC = () => {
  const config = {
    examType: 'TM' as const,
    dataFile: '/ctal_tm_sample.exam.json',
    title: 'ISTQB CTAL-TM Sample Exam',
    subtitle: 'Certified Tester Advanced Level - Test Management',
    description:
      'ISTQB CTAL-TM Sample Exam. Prepare for Certified Tester Advanced Level Test Management with realistic practice questions, tips, and real-life examples.',
    canonicalUrl: 'https://serhatozdursun.com/ctal-tm-exam',
    pagePath: '/ctal-tm-exam',
    keywords:
      'ISTQB, CTAL-TM, Certified Tester Advanced Level, Test Management, sample exam, practice questions, exam preparation, ISTQB Advanced Level',
    structuredDataName: 'ISTQB CTAL-TM Sample Exam',
    structuredDataDescription:
      'Prepare for ISTQB Certified Tester Advanced Level Test Management (CTAL-TM) with realistic sample questions, tips, and real-life examples.',
  };

  return <ExamPage config={config} />;
};

export default CTALTMExam;
