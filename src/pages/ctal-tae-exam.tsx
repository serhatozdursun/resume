import React from 'react';
import ExamPage from '../components/ExamPage';

const CtalTaeExam: React.FC = () => {
  const config = {
    examType: 'TAE' as const,
    dataFile: '/ctal_tae_sample_exam.json',
    title: 'ISTQB CTAL-TAE Sample Exam',
    subtitle: 'Practice with real exam questions and test your knowledge',
    description:
      'ISTQB CTAL-TAE Sample Exam. Prepare for Certified Tester Advanced Level Test Automation Engineering with realistic practice questions, tips, and real-life examples.',
    canonicalUrl: 'https://serhatozdursun.com/ctal-tae-exam',
    pagePath: '/ctal-tae-exam',
    keywords:
      'ISTQB, CTAL-TAE, Certified Tester Advanced Level, Test Automation Engineering, sample exam, practice questions, exam preparation, ISTQB Advanced Level',
    structuredDataName: 'ISTQB CTAL-TAE Sample Exam',
    structuredDataDescription:
      'Prepare for ISTQB Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE) with realistic sample questions, tips, and real-life examples.',
  };

  return <ExamPage config={config} />;
};

export default CtalTaeExam;
