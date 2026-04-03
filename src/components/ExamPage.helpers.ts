export interface Question {
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

export interface ExamData {
  metadata: {
    title: string;
    sources?: string[];
    counts: {
      [key: string]: number;
    };
  };
  questions: Question[];
}

export interface ExamConfig {
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

export const getSecureRandom = (max: number): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
};

export const getRandomQuestions = (
  questions: Question[],
  count: number
): Question[] => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandom(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};
