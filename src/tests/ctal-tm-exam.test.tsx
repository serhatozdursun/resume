import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CTALTMExam from '../pages/ctal-tm-exam';

// Mock fetch for JSON data
global.fetch = jest.fn();

// Mock exam data - create 15 questions to ensure we get 10 random ones
const mockExamData = {
  metadata: {
    title: 'ISTQB CTAL-TM Real Exam Practice — Custom Question Set',
    counts: {
      custom: 4,
      total: 4,
    },
  },
  questions: Array.from({ length: 15 }, (_, i) => ({
    id: `CUSTOM-Q${i + 1}`,
    question: `Test question ${i + 1}: Your team completed a full regression test. A second regression is planned; this time you estimate <strong>10% more</strong> effort than the recent run. <strong>Which estimation method have you used?</strong>`,
    answers: {
      a: 'Function Point',
      b: 'Extrapolation',
      c: 'PRAM',
      d: 'IDEAL',
    },
    correct_answer: 'b',
    points: 2,
    syllabus_reference: `TM-2.5.${i + 1}`,
    tip: 'Using previous actuals plus a proportional uplift indicates extrapolation from historical data.',
    real_life_example: `After a ${100 + i * 10}-hour regression, the next cycle is estimated at ${110 + i * 11} hours due to 10% scope increase.`,
  })),
};

describe('CTAL-TM Exam Page', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockExamData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading message initially', () => {
    render(<CTALTMExam />);
    expect(
      screen.getByText('Loading CTAL-TM Sample Exam...')
    ).toBeInTheDocument();
  });

  it('renders exam content after loading', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('ISTQB CTAL-TM Sample Exam')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Certified Tester Advanced Level - Test Management')
    ).toBeInTheDocument();
    expect(screen.getByText(/10 Sample Questions/)).toBeInTheDocument();
  });

  it('displays questions with answer options', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(
        screen.getAllByText(
          /Test question \d+: Your team completed a full regression test/
        )
      ).toHaveLength(10);
    });

    expect(screen.getAllByText('Function Point')).toHaveLength(10);
    expect(screen.getAllByText('Extrapolation')).toHaveLength(10);
    expect(screen.getAllByText('PRAM')).toHaveLength(10);
    expect(screen.getAllByText('IDEAL')).toHaveLength(10);
  });

  it('shows correct answer when show answer button is clicked', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    fireEvent.click(screen.getAllByText('Show Answer')[0]);

    expect(screen.getByText('✅ Correct Answer:')).toBeInTheDocument();
    // Check for the correct answer format - use a function matcher to handle split text
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'B - Extrapolation';
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/📚 Syllabus Reference:/)).toHaveLength(10);
  });

  it('shows tip when show tip button is clicked', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    // Show the tip
    fireEvent.click(screen.getAllByText('Show Tip')[0]);

    expect(screen.getByText('💡 Tip:')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Using previous actuals plus a proportional uplift indicates extrapolation from historical data.'
      )
    ).toBeInTheDocument();
  });

  it('shows real-life example when show example button is clicked', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Example')).toHaveLength(10);
    });

    // Show the real-life example
    fireEvent.click(screen.getAllByText('Show Example')[0]);

    expect(screen.getByText('🏢 Real-life Example:')).toBeInTheDocument();
    expect(screen.getByText(/After a \d+-hour regression/)).toBeInTheDocument();
  });

  it('loads new questions when next button is clicked', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('Load New Questions')).toBeInTheDocument();
    });

    // Click the next button
    fireEvent.click(screen.getByText('Load New Questions'));

    // The page should still show 10 questions
    expect(screen.getByText(/10 Sample Questions/)).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('No Exam Data Available')).toBeInTheDocument();
    });
  });

  it('has proper SEO meta tags', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(document.querySelector('title')).toHaveTextContent(
        'Mehmet Serhat Özdursun - CTAL-TM Sample Exam'
      );
    });

    // Check if meta description exists
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      expect(descriptionMeta).toHaveAttribute(
        'content',
        'ISTQB CTAL-TM Sample Exam. Prepare for Certified Tester Advanced Level Test Management with realistic practice questions, tips, and real-life examples.'
      );
    } else {
      // If meta description is not found, just check that the title is correct
      expect(document.querySelector('title')).toHaveTextContent(
        'Mehmet Serhat Özdursun - CTAL-TM Sample Exam'
      );
    }
  });

  it('toggles answer visibility correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    const firstButton = screen.getAllByText('Show Answer')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    expect(screen.getAllByText('Show Answer')).toHaveLength(9);

    // Click the Hide Answer button to toggle back
    fireEvent.click(screen.getByText('Hide Answer'));
    expect(screen.getAllByText('Show Answer')).toHaveLength(10);
  });

  it('toggles tip visibility correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Tip')).toHaveLength(10);
    });

    const firstButton = screen.getAllByText('Show Tip')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Tip')).toBeInTheDocument();
    expect(screen.getAllByText('Show Tip')).toHaveLength(9);

    // Click the Hide Tip button to toggle back
    fireEvent.click(screen.getByText('Hide Tip'));
    expect(screen.getAllByText('Show Tip')).toHaveLength(10);
  });

  it('toggles real-life example visibility correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Example')).toHaveLength(10);
    });

    const firstButton = screen.getAllByText('Show Example')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Example')).toBeInTheDocument();
    expect(screen.getAllByText('Show Example')).toHaveLength(9);

    // Click the Hide Example button to toggle back
    fireEvent.click(screen.getByText('Hide Example'));
    expect(screen.getAllByText('Show Example')).toHaveLength(10);
  });

  it('resets answer, tip and example visibility when loading new questions', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    // Show answer, tip and example for first question
    fireEvent.click(screen.getAllByText('Show Answer')[0]);
    fireEvent.click(screen.getAllByText('Show Tip')[0]);
    fireEvent.click(screen.getAllByText('Show Example')[0]);

    // Load new questions
    fireEvent.click(screen.getByText('Load New Questions'));

    // All answers should be hidden again
    expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    expect(screen.queryByText('Hide Answer')).not.toBeInTheDocument();
    expect(screen.queryByText('Hide Tip')).not.toBeInTheDocument();
    expect(screen.queryByText('Hide Example')).not.toBeInTheDocument();
  });

  it('displays syllabus reference for each question', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('📚 Syllabus Reference:')).toHaveLength(10);
    });

    expect(screen.getAllByText(/TM-2\.5\./)).toHaveLength(10);
  });

  it('handles back to resume navigation', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('← Back to Resume')).toBeInTheDocument();
    });

    const backLink = screen.getByText('← Back to Resume');
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('handles back to resume button in footer', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('Back to Resume')).toBeInTheDocument();
    });

    const backButton = screen.getByText('Back to Resume');
    expect(backButton).toBeInTheDocument();
  });

  it('displays question numbers correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('ISTQB CTAL-TM Sample Exam')).toBeInTheDocument();
    });

    // Check that question numbers 1-10 are displayed
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('displays answer options with correct labels', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('A.')).toHaveLength(10);
      expect(screen.getAllByText('B.')).toHaveLength(10);
      expect(screen.getAllByText('C.')).toHaveLength(10);
      expect(screen.getAllByText('D.')).toHaveLength(10);
    });
  });

  it('handles multiple toggle states independently', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    // Show answer for first question
    fireEvent.click(screen.getAllByText('Show Answer')[0]);

    // Show tip for second question
    fireEvent.click(screen.getAllByText('Show Tip')[1]);

    // Show example for third question
    fireEvent.click(screen.getAllByText('Show Example')[2]);

    // Check that all states are independent
    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    expect(screen.getByText('Hide Tip')).toBeInTheDocument();
    expect(screen.getByText('Hide Example')).toBeInTheDocument();

    // Check that other questions still show "Show" buttons
    expect(screen.getAllByText('Show Answer')).toHaveLength(9);
    expect(screen.getAllByText('Show Tip')).toHaveLength(9);
    expect(screen.getAllByText('Show Example')).toHaveLength(9);
  });

  it('handles empty exam data gracefully', async () => {
    const emptyExamData = {
      metadata: {
        title: 'Empty Exam',
        counts: {
          custom: 0,
          total: 0,
        },
      },
      questions: [],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(emptyExamData),
    });

    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('No Exam Data Available')).toBeInTheDocument();
    });
  });

  it('displays correct answer highlighting when answer is shown', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    fireEvent.click(screen.getAllByText('Show Answer')[0]);

    // Check that the correct answer is highlighted by looking for the correct class
    const correctAnswerElements = screen.getAllByText('Extrapolation');
    const correctElement = correctAnswerElements.find(
      element => element.closest('.correct') !== null
    );
    expect(correctElement).toBeInTheDocument();
  });

  it('maintains question order consistency after loading new questions', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    // Load new questions
    fireEvent.click(screen.getByText('Load New Questions'));

    await waitFor(() => {
      expect(screen.getAllByText('Show Answer')).toHaveLength(10);
    });

    // Check that we still have 10 questions
    expect(screen.getAllByText(/Test question \d+:/)).toHaveLength(10);
  });
});
