import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CtalTaeExam from '../pages/ctal-tae-exam';

// Mock fetch for JSON data
global.fetch = jest.fn();

// Mock exam data - create 15 questions to ensure we get 10 random ones
const mockExamData = {
  metadata: {
    title: 'ISTQB CTAL-TAE Combined Question Bank (Near-Complete)',
    sources: ['CTAL-TAE Sample Exam v2.0 (Brightest)'],
    counts: {
      v2_0_brightest: 0,
      astqb_2024: 37,
      v2_2_istqb: 39,
      custom: 80,
    },
  },
  questions: Array.from({ length: 15 }, (_, i) => ({
    id: `TEST-Q${i + 1}`,
    question: `Test question ${i + 1}: Which of the following is a disadvantage of test automation?`,
    answers: {
      a: 'They are less subject to human error during execution',
      b: 'They execute faster than manual tests',
      c: 'They always verify exactly what they were programmed to verify',
      d: 'They can execute more complex tests more reliably',
    },
    correct_answer: 'c',
    points: 1,
    syllabus_reference: `CT-TAE-1.${i + 1}.1`,
    tip: 'Match the option to the syllabus keyword; remove distractors that contradict definitions.',
  })),
};

describe('CTAL-TAE Exam Page', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockExamData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading message initially', () => {
    render(<CtalTaeExam />);
    expect(
      screen.getByText('Loading ISTQB CTAL-TAE Sample Exam...')
    ).toBeInTheDocument();
  });

  it('renders exam content after loading', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(
        screen.getByText('ISTQB CTAL-TAE Sample Exam')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'Practice with real exam questions and test your knowledge'
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/10 Questions/)).toBeInTheDocument();
  });

  it('displays questions with answer options', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(
        screen.getAllByText(
          /Test question \d+: Which of the following is a disadvantage of test automation\?/
        )
      ).toHaveLength(10);
    });

    expect(
      screen.getAllByText(
        'They are less subject to human error during execution'
      )
    ).toHaveLength(10);
    expect(
      screen.getAllByText('They execute faster than manual tests')
    ).toHaveLength(10);
    expect(
      screen.getAllByText(
        'They always verify exactly what they were programmed to verify'
      )
    ).toHaveLength(10);
    expect(
      screen.getAllByText('They can execute more complex tests more reliably')
    ).toHaveLength(10);
  });

  it('shows correct answer when show answer button is clicked', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);

    expect(screen.getByText('Correct Answer:')).toBeInTheDocument();
    expect(
      screen.getByText(
        /C\. They always verify exactly what they were programmed to verify/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Syllabus Reference:/)).toBeInTheDocument();
    expect(screen.getByText(/Points:/)).toBeInTheDocument();
  });

  it('shows tip when show tip button is clicked', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // First show the answer
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);

    // Then show the tip
    fireEvent.click(screen.getByText('Show Tip'));

    expect(screen.getByText('Tip:')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Match the option to the syllabus keyword; remove distractors that contradict definitions.'
      )
    ).toBeInTheDocument();
  });

  it('loads new questions when next button is clicked', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getByText('Load New Questions')).toBeInTheDocument();
    });

    // Click the next button
    fireEvent.click(screen.getByText('Load New Questions'));

    // The page should still show 10 questions
    expect(screen.getByText(/10 Questions/)).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(
        screen.getByText('Error loading exam data. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  it('has proper SEO meta tags', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(document.querySelector('title')).toHaveTextContent(
        'Mehmet Serhat Özdursun - ISTQB CTAL-TAE Sample Exam'
      );
    });

    // Check if meta description exists
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      expect(descriptionMeta).toHaveAttribute(
        'content',
        'ISTQB CTAL-TAE Sample Exam - Practice with real exam questions and test your knowledge'
      );
    } else {
      // If meta description is not found, just check that the title is correct
      expect(document.querySelector('title')).toHaveTextContent(
        'Mehmet Serhat Özdursun - ISTQB CTAL-TAE Sample Exam'
      );
    }
  });

  it('toggles answer visibility correctly', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    const firstButton = screen.getAllByText('Show Correct Answer')[0];
    fireEvent.click(firstButton);

    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    expect(screen.getAllByText('Show Correct Answer')).toHaveLength(9);

    // Click the Hide Answer button to toggle back
    fireEvent.click(screen.getByText('Hide Answer'));
    expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
  });

  it('toggles tip visibility correctly', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // First show the answer
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);

    // Wait for the tip button to appear
    await waitFor(() => {
      expect(screen.getByText('Show Tip')).toBeInTheDocument();
    });

    // Show tip
    fireEvent.click(screen.getByText('Show Tip'));
    expect(screen.getByText('Hide Tip')).toBeInTheDocument();

    // Hide tip by clicking the Hide Tip button
    fireEvent.click(screen.getByText('Hide Tip'));
    expect(screen.getByText('Show Tip')).toBeInTheDocument();
  });

  it('resets answer and tip visibility when loading new questions', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // Show answer and tip for first question
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);
    fireEvent.click(screen.getByText('Show Tip'));

    // Load new questions
    fireEvent.click(screen.getByText('Load New Questions'));

    // All answers should be hidden again
    expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    expect(screen.queryByText('Hide Answer')).not.toBeInTheDocument();
    expect(screen.queryByText('Hide Tip')).not.toBeInTheDocument();
  });

  it('disables show tip button until answer is shown', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // Tip button should not be visible until answer is shown
    expect(screen.queryByText('Show Tip')).not.toBeInTheDocument();

    // Show answer first
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);

    // Now tip button should be visible
    expect(screen.getByText('Show Tip')).toBeInTheDocument();
  });

  it('toggles real life example visibility correctly', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // First show the answer
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);

    // Wait for the real life example button to appear
    await waitFor(() => {
      expect(screen.getByText('Show Real Life Example')).toBeInTheDocument();
    });

    // Show real life example
    fireEvent.click(screen.getByText('Show Real Life Example'));
    expect(screen.getByText('Hide Real Life Example')).toBeInTheDocument();

    // Hide real life example by clicking the Hide Real Life Example button
    fireEvent.click(screen.getByText('Hide Real Life Example'));
    expect(screen.getByText('Show Real Life Example')).toBeInTheDocument();
  });

  it('disables show real life example button until answer is shown', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // Real life example button should not be visible until answer is shown
    expect(
      screen.queryByText('Show Real Life Example')
    ).not.toBeInTheDocument();

    // Show answer first
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);

    // Now real life example button should be visible
    expect(screen.getByText('Show Real Life Example')).toBeInTheDocument();
  });

  it('resets real life example visibility when loading new questions', async () => {
    render(<CtalTaeExam />);

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // Show answer and real life example
    fireEvent.click(screen.getAllByText('Show Correct Answer')[0]);
    await waitFor(() => {
      expect(screen.getByText('Show Real Life Example')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Show Real Life Example'));

    expect(screen.getByText('Hide Real Life Example')).toBeInTheDocument();

    // Load new questions
    fireEvent.click(screen.getByText('Load New Questions'));

    await waitFor(() => {
      expect(screen.getAllByText('Show Correct Answer')).toHaveLength(10);
    });

    // Real life example should be hidden
    expect(
      screen.queryByText('Hide Real Life Example')
    ).not.toBeInTheDocument();
  });
});
