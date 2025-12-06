import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Helmet } from 'react-helmet';
import { theme } from './theme';
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
    background-color: ${props => props.theme.colors.primary};
  }
`;

const AnswerLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: ${props => props.theme.colors.accent};
`;

const AnswerText = styled.span`
  color: ${props => props.theme.colors.text};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.secondary};
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};

  &:hover {
    background-color: #d1d5db;
  }
`;

const NextButton = styled(ActionButton)`
  background-color: #059669;
  margin-left: auto;

  &:hover {
    background-color: #047857;
  }
`;

const AnswerReveal = styled.div`
  background-color: #f0f9ff;
  border: 2px solid #0ea5e9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const AnswerRevealTitle = styled.h4`
  color: #0c4a6e;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const AnswerRevealText = styled.p`
  color: #0c4a6e;
  margin-bottom: 10px;
  font-weight: 500;
`;

const TipReveal = styled.div`
  background-color: #fef3c7;
  border: 2px solid #f59e0b;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const TipRevealTitle = styled.h4`
  color: #92400e;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const TipRevealText = styled.p`
  color: #92400e;
  margin-bottom: 10px;
  font-weight: 500;
`;

const RealLifeExampleReveal = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid #17a2b8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RealLifeExampleRevealTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #17a2b8;
`;

const RealLifeExampleRevealText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

// Question interface
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

// Exam data interface
interface ExamData {
  metadata: {
    title: string;
    sources?: string[];
    counts: {
      [key: string]: number;
    };
  };
  questions: Question[];
}

// Exam configuration interface
interface ExamConfig {
  examType: 'TAE' | 'TM';
  dataFile: string;
  title: string;
  subtitle: string;
  description: string;
  canonicalUrl: string;
  pagePath: string;
  keywords: string;
  structuredDataName: string;
  structuredDataDescription: string;
}

const ExamPage: React.FC<{ config: ExamConfig }> = ({ config }) => {
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
        const response = await fetch(config.dataFile);
        const data: ExamData = await response.json();
        setExamData(data);
        setCurrentQuestions(getRandomQuestions(data.questions, 40));
        setLoading(false);
      } catch (error) {
        console.error('Error loading exam data:', error);
        setLoading(false);
      }
    };

    loadExamData();
  }, [config.dataFile]);

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
      setCurrentQuestions(getRandomQuestions(examData.questions, 40));
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

  // Function to toggle real life example visibility
  const toggleRealLifeExample = (questionId: string) => {
    setShowRealLifeExamples(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <ExamContainer>
          <LoadingMessage>Loading {config.title}...</LoadingMessage>
        </ExamContainer>
      </ThemeProvider>
    );
  }

  if (!examData) {
    return (
      <ThemeProvider theme={theme}>
        <ExamContainer>
          <LoadingMessage>
            Error loading exam data. Please try again later.
          </LoadingMessage>
        </ExamContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}`}
          strategy='afterInteractive'
        />
        <Script
          id={`gtag-init-${config.examType.toLowerCase()}`}
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${env.GA_TRACKING_ID}', { page_path: '${config.pagePath}' });
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
          <meta name='description' content={config.description} />
          <meta name='keywords' content={config.keywords} />
          <title>Mehmet Serhat Özdursun - {config.title}</title>
          <link rel='icon' href='/favicon_.ico' />
          <link rel='canonical' href={config.canonicalUrl} />

          <meta property='og:type' content='website' />
          <meta property='og:url' content={config.canonicalUrl} />
          <meta
            property='og:title'
            content={`Mehmet Serhat Özdursun - ${config.title}`}
          />
          <meta property='og:description' content={config.description} />
          <meta
            property='og:image'
            content='https://serhatozdursun.com/profile.png'
          />

          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content={config.canonicalUrl} />
          <meta
            property='twitter:title'
            content={`Mehmet Serhat Özdursun - ${config.title}`}
          />
          <meta property='twitter:description' content={config.description} />
          <meta
            property='twitter:image'
            content='https://serhatozdursun.com/profile.png'
          />

          <meta name='author' content='Mehmet Serhat Özdursun' />
          <meta name='language' content='English' />
          <meta name='robots' content='index, follow' />
          <meta name='theme-color' content='#ffffff' />
          <script type='application/ld+json'>
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: config.title,
              url: config.canonicalUrl,
              description: config.structuredDataDescription,
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
                    name: config.title,
                    item: config.canonicalUrl,
                  },
                ],
              },
            })}
          </script>
        </Helmet>

        <ExamContainer>
          <ExamHeader>
            <HomeLink href='/'>← Back to Resume</HomeLink>
            <ExamTitle>{config.title}</ExamTitle>
            <ExamSubtitle>{config.subtitle}</ExamSubtitle>
            <QuestionCounter>
              {currentQuestions.length}{' '}
              {config.examType === 'TM' ? 'Sample ' : ''}Questions
            </QuestionCounter>
          </ExamHeader>

          {currentQuestions.map((question, index) => (
            <QuestionContainer key={question.id}>
              <QuestionNumber>{index + 1}</QuestionNumber>
              <QuestionText>{parse(question.question)}</QuestionText>

              {Object.entries(question.answers).map(([key, value]) => (
                <AnswerOption key={key}>
                  <AnswerLabel>{key.toUpperCase()}.</AnswerLabel>
                  <AnswerText>{value}</AnswerText>
                </AnswerOption>
              ))}

              <ActionButtons>
                <ActionButton onClick={() => toggleAnswer(question.id)}>
                  {showAnswers[question.id]
                    ? 'Hide Answer'
                    : config.examType === 'TM'
                      ? 'Show Answer'
                      : 'Show Correct Answer'}
                </ActionButton>

                {showAnswers[question.id] && (
                  <SecondaryButton onClick={() => toggleTip(question.id)}>
                    {showTips[question.id] ? 'Hide Tip' : 'Show Tip'}
                  </SecondaryButton>
                )}

                {showAnswers[question.id] && (
                  <SecondaryButton
                    onClick={() => toggleRealLifeExample(question.id)}
                  >
                    {showRealLifeExamples[question.id]
                      ? 'Hide Real Life Example'
                      : 'Show Real Life Example'}
                  </SecondaryButton>
                )}
              </ActionButtons>

              {showAnswers[question.id] && (
                <AnswerReveal>
                  <AnswerRevealTitle>
                    {config.examType === 'TM'
                      ? '✅ Correct Answer:'
                      : 'Correct Answer:'}
                  </AnswerRevealTitle>
                  <AnswerRevealText>
                    <strong>
                      {String(question.correct_answer).toUpperCase()}.{' '}
                      {
                        question.answers[
                          question.correct_answer as keyof typeof question.answers
                        ]
                      }
                    </strong>
                  </AnswerRevealText>
                  <AnswerRevealText>
                    <strong>
                      {config.examType === 'TM'
                        ? '📚 Syllabus Reference:'
                        : 'Syllabus Reference:'}
                    </strong>{' '}
                    {question.syllabus_reference}
                  </AnswerRevealText>
                  {config.examType === 'TAE' && (
                    <AnswerRevealText>
                      <strong>Points:</strong> {question.points}
                    </AnswerRevealText>
                  )}
                </AnswerReveal>
              )}

              {showTips[question.id] && (
                <TipReveal>
                  <TipRevealTitle>
                    {config.examType === 'TM' ? '💡 Tip:' : 'Tip:'}
                  </TipRevealTitle>
                  <TipRevealText>{question.tip}</TipRevealText>
                </TipReveal>
              )}

              {showRealLifeExamples[question.id] && (
                <RealLifeExampleReveal>
                  <RealLifeExampleRevealTitle>
                    {config.examType === 'TM'
                      ? '🏢 Real-life Example:'
                      : 'Real Life Example:'}
                  </RealLifeExampleRevealTitle>
                  <RealLifeExampleRevealText>
                    {question.real_life_example}
                  </RealLifeExampleRevealText>
                </RealLifeExampleReveal>
              )}
            </QuestionContainer>
          ))}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <NextButton onClick={loadNewQuestions}>
              Load New Questions
            </NextButton>
          </div>
        </ExamContainer>
      </div>
    </ThemeProvider>
  );
};

export default ExamPage;
