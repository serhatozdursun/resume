import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Helmet } from 'react-helmet';
import { theme } from '../components/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { env } from '../utils/env';

// Styled components for the exam page
const ExamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: ${props => props.theme.font.main};
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

const ExamHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
`;

const HomeLink = styled.a`
  display: inline-block;
  margin-bottom: 12px;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const ExamTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-family: ${props => props.theme.font.heading};
`;

const ExamSubtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const QuestionCounter = styled.div`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  font-weight: bold;
`;

const QuestionContainer = styled.div`
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
`;

const QuestionNumber = styled.div`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const QuestionText = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const AnswerOption = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.accent};
    background-color: ${props => props.theme.colors.highlight};
  }

  &.selected {
    border-color: ${props => props.theme.colors.accent};
    background-color: ${props => props.theme.colors.highlight};
  }

  &.correct {
    border-color: #4caf50;
    background-color: #e8f5e8;
  }

  &.incorrect {
    border-color: #f44336;
    background-color: #ffebee;
  }
`;

const AnswerLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: ${props => props.theme.colors.accent};
`;

const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${props => props.theme.colors.highlight};
    color: ${props => props.theme.colors.text};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.secondary};
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background-color: ${props => props.theme.colors.secondary};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: white;
  }
`;

const TertiaryButton = styled(ActionButton)`
  background-color: #6c757d;
  font-size: 0.9rem;
  padding: 8px 16px;

  &:hover {
    background-color: #5a6268;
    color: white;
  }
`;

const ExplanationContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  border-left: 4px solid ${props => props.theme.colors.accent};
`;

const ExplanationTitle = styled.h4`
  color: ${props => props.theme.colors.accent};
  margin-bottom: 10px;
`;

const ExplanationText = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
  line-height: 1.6;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.colors.text};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: #f44336;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

// Interface for exam data
interface ExamData {
  metadata: {
    title: string;
    counts: {
      custom: number;
      total: number;
    };
  };
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_answer: string;
  points: number;
  syllabus_reference: string;
  tip: string;
  real_life_example: string;
}

const CTALTMExam: React.FC = () => {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showTips, setShowTips] = useState<{ [key: string]: boolean }>({});
  const [showRealLifeExamples, setShowRealLifeExamples] = useState<{
    [key: string]: boolean;
  }>({});

  // Load exam data
  useEffect(() => {
    const loadExamData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ctal_tm_sample.exam.json');
        const data: ExamData = await response.json();
        setExamData(data);
        setCurrentQuestions(getRandomQuestions(data.questions, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error loading exam data:', error);
        setLoading(false);
      }
    };

    loadExamData();
  }, []);

  // Secure random number generator using Web Crypto API
  const getSecureRandom = (max: number): number => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  };

  // Function to get random questions using Fisher-Yates shuffle
  const getRandomQuestions = (
    questions: Question[],
    count: number
  ): Question[] => {
    const shuffled = [...questions];

    // Fisher-Yates shuffle algorithm with cryptographically secure random numbers
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = getSecureRandom(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  };

  // Function to load new set of questions
  const loadNewQuestions = () => {
    if (examData) {
      setCurrentQuestions(getRandomQuestions(examData.questions, 10));
      setShowAnswers({});
      setShowTips({});
      setShowRealLifeExamples({});
    }
  };

  // Function to toggle answer visibility
  const toggleAnswer = (questionId: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Function to toggle tip visibility
  const toggleTip = (questionId: string) => {
    setShowTips(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Function to toggle real-life example visibility
  const toggleRealLifeExample = (questionId: string) => {
    setShowRealLifeExamples(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Function to get answer class for styling
  const getAnswerClass = (
    questionId: string,
    answerKey: string,
    correctAnswer: string
  ) => {
    if (showAnswers[questionId]) {
      return answerKey === correctAnswer ? 'correct' : '';
    }
    return '';
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <ExamContainer>
          <LoadingContainer>
            <h2>Loading CTAL-TM Sample Exam...</h2>
            <p>Please wait while we prepare your exam questions.</p>
          </LoadingContainer>
        </ExamContainer>
      </ThemeProvider>
    );
  }

  if (!examData || currentQuestions.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <ExamContainer>
          <ErrorContainer>
            <h2>No Exam Data Available</h2>
            <p>Unable to load exam questions. Please try again later.</p>
            <ActionButton onClick={() => window.location.reload()}>
              Try Again
            </ActionButton>
          </ErrorContainer>
        </ExamContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ExamContainer>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}`}
          strategy='afterInteractive'
        />
        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${env.GA_TRACKING_ID}', { page_path: '/ctal-tm-exam' });
            `,
          }}
        />
        {/* End Google Analytics */}
        <Helmet>
          <html lang='en' />
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta
            name='description'
            content='ISTQB CTAL-TM Sample Exam. Prepare for Certified Tester Advanced Level Test Management with realistic practice questions, tips, and real-life examples.'
          />
          <meta
            name='keywords'
            content='ISTQB, CTAL-TM, Certified Tester Advanced Level, Test Management, sample exam, practice questions, exam preparation, ISTQB Advanced Level'
          />
          <title>Mehmet Serhat Özdursun - CTAL-TM Sample Exam</title>
          <link rel='icon' href='/favicon_.ico' />
          <link
            rel='canonical'
            href='https://serhatozdursun.com/ctal-tm-exam'
          />

          <meta property='og:type' content='website' />
          <meta
            property='og:url'
            content='https://serhatozdursun.com/ctal-tm-exam'
          />
          <meta
            property='og:title'
            content='Mehmet Serhat Özdursun - CTAL-TM Sample Exam'
          />
          <meta
            property='og:description'
            content='ISTQB CTAL-TM Sample Exam. Prepare for Certified Tester Advanced Level Test Management with realistic practice questions, tips, and real-life examples.'
          />
          <meta
            property='og:image'
            content='https://serhatozdursun.com/profile.png'
          />

          <meta property='twitter:card' content='summary_large_image' />
          <meta
            property='twitter:url'
            content='https://serhatozdursun.com/ctal-tm-exam'
          />
          <meta
            property='twitter:title'
            content='Mehmet Serhat Özdursun - CTAL-TM Sample Exam'
          />
          <meta
            property='twitter:description'
            content='ISTQB CTAL-TM Sample Exam. Prepare for Certified Tester Advanced Level Test Management with realistic practice questions, tips, and real-life examples.'
          />
          <meta
            property='twitter:image'
            content='https://serhatozdursun.com/profile.png'
          />
        </Helmet>

        <ExamHeader>
          <HomeLink href='/'>← Back to Resume</HomeLink>
          <ExamTitle>ISTQB CTAL-TM Sample Exam</ExamTitle>
          <ExamSubtitle>
            Certified Tester Advanced Level - Test Management
          </ExamSubtitle>
          <QuestionCounter>
            {currentQuestions.length} Sample Questions
          </QuestionCounter>
        </ExamHeader>

        {currentQuestions.map((question, index) => (
          <QuestionContainer key={question.id}>
            <QuestionNumber>{index + 1}</QuestionNumber>
            <QuestionText>{parse(question.question)}</QuestionText>

            {Object.entries(question.answers).map(([key, value]) => (
              <AnswerOption
                key={key}
                className={getAnswerClass(
                  question.id,
                  key,
                  question.correct_answer
                )}
              >
                <AnswerLabel>{key.toUpperCase()}.</AnswerLabel>
                {value}
              </AnswerOption>
            ))}

            <ButtonContainer>
              <TertiaryButton onClick={() => toggleAnswer(question.id)}>
                {showAnswers[question.id] ? 'Hide Answer' : 'Show Answer'}
              </TertiaryButton>
              <TertiaryButton onClick={() => toggleTip(question.id)}>
                {showTips[question.id] ? 'Hide Tip' : 'Show Tip'}
              </TertiaryButton>
              <TertiaryButton
                onClick={() => toggleRealLifeExample(question.id)}
              >
                {showRealLifeExamples[question.id]
                  ? 'Hide Example'
                  : 'Show Example'}
              </TertiaryButton>
            </ButtonContainer>

            {showAnswers[question.id] && (
              <ExplanationContainer>
                <ExplanationTitle>✅ Correct Answer:</ExplanationTitle>
                <ExplanationText>
                  <strong>{question.correct_answer.toUpperCase()}</strong> -{' '}
                  {
                    question.answers[
                      question.correct_answer as keyof typeof question.answers
                    ]
                  }
                </ExplanationText>
              </ExplanationContainer>
            )}

            {showTips[question.id] && (
              <ExplanationContainer>
                <ExplanationTitle>💡 Tip:</ExplanationTitle>
                <ExplanationText>{question.tip}</ExplanationText>
              </ExplanationContainer>
            )}

            {showRealLifeExamples[question.id] && (
              <ExplanationContainer>
                <ExplanationTitle>🏢 Real-life Example:</ExplanationTitle>
                <ExplanationText>{question.real_life_example}</ExplanationText>
              </ExplanationContainer>
            )}

            <ExplanationContainer>
              <ExplanationTitle>📚 Syllabus Reference:</ExplanationTitle>
              <ExplanationText>{question.syllabus_reference}</ExplanationText>
            </ExplanationContainer>
          </QuestionContainer>
        ))}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <ActionButton onClick={loadNewQuestions}>
            Load New Questions
          </ActionButton>
          <SecondaryButton onClick={() => (window.location.href = '/')}>
            Back to Resume
          </SecondaryButton>
        </div>

        <Script
          id='ldjson-schema'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'ISTQB CTAL-TM Sample Exam',
              url: 'https://serhatozdursun.com/ctal-tm-exam',
              description:
                'Prepare for ISTQB Certified Tester Advanced Level Test Management (CTAL-TM) with realistic sample questions, tips, and real-life examples.',
              inLanguage: 'en',
              isPartOf: {
                '@type': 'WebSite',
                name: 'Mehmet Serhat Özdursun',
                url: 'https://serhatozdursun.com',
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://serhatozdursun.com/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'ISTQB CTAL-TM Sample Exam',
                    item: 'https://serhatozdursun.com/ctal-tm-exam',
                  },
                ],
              },
            }),
          }}
        />
      </ExamContainer>
    </ThemeProvider>
  );
};

export default CTALTMExam;
