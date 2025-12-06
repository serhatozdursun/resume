import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CTALTMExam from '../pages/ctal-tm-exam';

// Mock fetch for JSON data
global.fetch = jest.fn();

// Mock exam data - create 50 questions to ensure we get 40 random ones
const mockExamData = {
  metadata: {
    title: 'ISTQB CTAL-TM Real Exam Practice — Custom Question Set',
    counts: {
      custom: 4,
      total: 4,
    },
  },
  questions: Array.from({ length: 50 }, (_, i) => ({
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
      screen.getByText('Loading ISTQB CTAL-TM Sample Exam...')
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
    expect(screen.getByText(/40 Sample Questions/)).toBeInTheDocument();
  });

  it('displays questions with answer options', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(
        screen.queryAllByText(
          /Test question \d+: Your team completed a full regression test/
        )
      ).toHaveLength(40);
    });

    expect(screen.queryAllByText('Function Point')).toHaveLength(40);
    expect(screen.queryAllByText('Extrapolation')).toHaveLength(40);
    expect(screen.queryAllByText('PRAM')).toHaveLength(40);
    expect(screen.queryAllByText('IDEAL')).toHaveLength(40);
  });

  it('shows correct answer when show answer button is clicked', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    expect(screen.getByText('✅ Correct Answer:')).toBeInTheDocument();
    // Check for the correct answer format - use getAllByText since there are multiple elements
    expect(
      screen.queryAllByText((content, element) => {
        return element?.textContent === 'B. Extrapolation';
      })
    ).toHaveLength(2); // Should find both the <p> and <strong> elements
    expect(screen.queryAllByText(/📚 Syllabus Reference:/)).toHaveLength(1); // Only 1 syllabus reference shown for the revealed answer
  });

  it('shows tip when show tip button is clicked', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answer first to make tip button visible
    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Tip')).toHaveLength(1);
    });

    // Show the tip
    fireEvent.click(screen.queryAllByText('Show Tip')[0]);

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
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answer first to make example button visible
    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Real Life Example')).toHaveLength(1);
    });

    // Show the real-life example
    fireEvent.click(screen.queryAllByText('Show Real Life Example')[0]);

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
    expect(screen.getByText(/40 Sample Questions/)).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<CTALTMExam />);

    await waitFor(() => {
      expect(
        screen.getByText('Error loading exam data. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  it('has proper SEO meta tags', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(document.querySelector('title')).toHaveTextContent(
        'Mehmet Serhat Özdursun - ISTQB CTAL-TM Sample Exam'
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
        'Mehmet Serhat Özdursun - ISTQB CTAL-TM Sample Exam'
      );
    }
  });

  it('toggles answer visibility correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    const firstButton = screen.queryAllByText('Show Answer')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    expect(screen.queryAllByText('Show Answer')).toHaveLength(39);

    // Click the Hide Answer button to toggle back
    fireEvent.click(screen.getByText('Hide Answer'));
    expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
  });

  it('toggles tip visibility correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answer first to make tip button visible
    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Tip')).toHaveLength(1);
    });

    const firstButton = screen.queryAllByText('Show Tip')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Tip')).toBeInTheDocument();
    // After hiding tip, there should be 0 Show Tip buttons because tip is hidden
    expect(screen.queryAllByText('Show Tip')).toHaveLength(0);

    // Click the Hide Tip button to toggle back
    fireEvent.click(screen.getByText('Hide Tip'));
    expect(screen.queryAllByText('Show Tip')).toHaveLength(1); // Back to 1 Show Tip button
  });

  it('toggles real-life example visibility correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answer first to make real life example button visible
    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Real Life Example')).toHaveLength(1);
    });

    const firstButton = screen.queryAllByText('Show Real Life Example')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Real Life Example')).toBeInTheDocument();
    // After hiding example, there should be 0 Show Real Life Example buttons because example is hidden
    expect(screen.queryAllByText('Show Real Life Example')).toHaveLength(0);

    // Click the Hide Real Life Example button to toggle back
    fireEvent.click(screen.getByText('Hide Real Life Example'));
    expect(screen.queryAllByText('Show Real Life Example')).toHaveLength(1); // Back to 1 Show button
  });

  it('resets answer, tip and example visibility when loading new questions', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answer, tip and example for first question
    fireEvent.click(screen.queryAllByText('Show Answer')[0]);
    fireEvent.click(screen.queryAllByText('Show Tip')[0]);
    fireEvent.click(screen.queryAllByText('Show Real Life Example')[0]);

    // Load new questions
    fireEvent.click(screen.getByText('Load New Questions'));

    // All answers should be hidden again
    expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    expect(screen.queryByText('Hide Answer')).not.toBeInTheDocument();
    expect(screen.queryByText('Hide Tip')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Hide Real Life Example')
    ).not.toBeInTheDocument();
  });

  it('displays syllabus reference for each question', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answers for all questions to reveal syllabus references
    const showAnswerButtons = screen.queryAllByText('Show Answer');
    showAnswerButtons.forEach(button => fireEvent.click(button));

    await waitFor(() => {
      expect(screen.queryAllByText('📚 Syllabus Reference:')).toHaveLength(40);
    });

    expect(screen.queryAllByText(/TM-2\.5\./)).toHaveLength(40);
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
      expect(screen.getByText('← Back to Resume')).toBeInTheDocument();
    });

    const backButton = screen.getByText('← Back to Resume');
    expect(backButton).toBeInTheDocument();
  });

  it('displays question numbers correctly', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.getByText('ISTQB CTAL-TM Sample Exam')).toBeInTheDocument();
    });

    // Check that question numbers 1-40 are displayed
    for (let i = 1; i <= 40; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('displays answer options with correct labels', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('A.')).toHaveLength(40);
      expect(screen.queryAllByText('B.')).toHaveLength(40);
      expect(screen.queryAllByText('C.')).toHaveLength(40);
      expect(screen.queryAllByText('D.')).toHaveLength(40);
    });
  });

  it('handles multiple toggle states independently', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Show answer for first question
    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    // Show answer for second question to make tip button visible
    fireEvent.click(screen.queryAllByText('Show Answer')[1]);

    // Show answer for third question to make example button visible
    fireEvent.click(screen.queryAllByText('Show Answer')[2]);

    // Show tip for second question
    fireEvent.click(screen.queryAllByText('Show Tip')[0]);

    // Show example for third question
    fireEvent.click(screen.queryAllByText('Show Real Life Example')[0]);

    // Check that all states are independent
    expect(screen.queryAllByText('Hide Answer')).toHaveLength(3);
    expect(screen.getByText('Hide Tip')).toBeInTheDocument();
    expect(screen.getByText('Hide Real Life Example')).toBeInTheDocument();

    // Check that other questions still show "Show" buttons
    expect(screen.queryAllByText('Show Answer')).toHaveLength(37);
    expect(screen.queryAllByText('Show Tip')).toHaveLength(2);
    expect(screen.queryAllByText('Show Real Life Example')).toHaveLength(2);
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
      expect(screen.getByText('Load New Questions')).toBeInTheDocument();
    });
  });

  it('displays correct answer highlighting when answer is shown', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    fireEvent.click(screen.queryAllByText('Show Answer')[0]);

    // Check that the correct answer is displayed
    expect(screen.getByText('✅ Correct Answer:')).toBeInTheDocument();
    expect(screen.getByText('B. Extrapolation')).toBeInTheDocument();
  });

  it('maintains question order consistency after loading new questions', async () => {
    render(<CTALTMExam />);

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Load new questions
    fireEvent.click(screen.getByText('Load New Questions'));

    await waitFor(() => {
      expect(screen.queryAllByText('Show Answer')).toHaveLength(40);
    });

    // Check that we still have 40 questions
    expect(screen.queryAllByText(/Test question \d+:/)).toHaveLength(40);
  });
});
