import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Feedback from './Feedback';
import Student from '../data/Student';
import Review from '../data/Review';
import Submission from '../data/Submission';

beforeEach(() => Student.clear());

function mockSubmission(reviewerName: string) {
  return { student: Student.fromName(reviewerName) } as Submission;
}

function buildStudent(name: string, reviews: { reviewer: string; comm: number; supp: number; report: number; valued: string; improvement: string }[]) {
  const student = Student.fromName(name);
  for (const r of reviews) {
    Review.fromSlice(
      [name, String(r.comm), String(r.supp), String(r.report), r.valued, r.improvement],
      mockSubmission(r.reviewer),
    );
  }
  return student;
}

// Two reviewers: avg comm=3.5, supp=5.5, report=8.0, total=17.0
function buildAliceWithTwoReviews() {
  return buildStudent('Alice', [
    { reviewer: 'Bob', comm: 3, supp: 5, report: 8, valued: 'Led the team', improvement: 'Speak up more' },
    { reviewer: 'Charlie', comm: 4, supp: 6, report: 8, valued: 'Clear writing', improvement: 'Meet deadlines' },
  ]);
}

describe('Feedback', () => {
  it('renders the student name as a heading', () => {
    render(<Feedback student={buildAliceWithTwoReviews()} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Alice');
  });

  it('displays scores with correct precision', () => {
    render(<Feedback student={buildAliceWithTwoReviews()} />);
    // All scores are in one <p>, so check the full paragraph's text content.
    // toPrecision(2) for individual, toPrecision(3) for total.
    const scoreText = screen.getByText(/communication was:/).textContent!;
    expect(scoreText).toContain('3.5 / 4');
    expect(scoreText).toContain('5.5 / 6');
    expect(scoreText).toContain('8.0 / 10');
    expect(scoreText).toContain('17.0 / 20');
  });

  it('renders valued contributions', () => {
    render(<Feedback student={buildAliceWithTwoReviews()} />);
    expect(screen.getByText('Led the team')).toBeInTheDocument();
    expect(screen.getByText('Clear writing')).toBeInTheDocument();
  });

  it('renders areas of improvement', () => {
    render(<Feedback student={buildAliceWithTwoReviews()} />);
    expect(screen.getByText('Speak up more')).toBeInTheDocument();
    expect(screen.getByText('Meet deadlines')).toBeInTheDocument();
  });

  it('displays reviewer names', () => {
    render(<Feedback student={buildAliceWithTwoReviews()} />);
    expect(screen.getByText(/Reviewers:/)).toHaveTextContent('Reviewers: Bob, Charlie');
  });
});
