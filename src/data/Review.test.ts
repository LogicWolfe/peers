import { describe, it, expect, beforeEach } from 'vitest';
import Review from './Review';
import Student from './Student';
import Submission from './Submission';

beforeEach(() => Student.clear());

function mockSubmission(reviewerName: string) {
  return { student: Student.fromName(reviewerName) } as Submission;
}

describe('Review.fromSlice', () => {
  it('returns a Review when subject name is present', () => {
    const slice = ['Alice', '3', '5', '8', 'Great work', 'Be more concise'];
    const review = Review.fromSlice(slice, mockSubmission('Bob'));
    expect(review).toBeInstanceOf(Review);
    expect(review!.subject.name).toBe('Alice');
    expect(review!.reviewer.name).toBe('Bob');
  });

  it('returns undefined when subject name is empty string', () => {
    const slice = ['', '3', '5', '8', '', ''];
    expect(Review.fromSlice(slice, mockSubmission('Bob'))).toBeUndefined();
  });

  it('returns undefined when slice is empty', () => {
    expect(Review.fromSlice([], mockSubmission('Bob'))).toBeUndefined();
  });

  it('adds the created review to the subject student', () => {
    const slice = ['Alice', '3', '5', '8', 'Nice', 'More effort'];
    Review.fromSlice(slice, mockSubmission('Bob'));
    const alice = Student.fromName('Alice');
    expect(alice.reviews).toHaveLength(1);
  });
});

describe('score accessors', () => {
  it('parses numeric scores from response strings', () => {
    const slice = ['Alice', '3.5', '4.2', '7.8', '', ''];
    const review = Review.fromSlice(slice, mockSubmission('Bob'))!;
    expect(review.communicationScore()).toBe(3.5);
    expect(review.supportivenessScore()).toBe(4.2);
    expect(review.reportContributionsScore()).toBe(7.8);
  });

  it('returns NaN for non-numeric response strings', () => {
    const slice = ['Alice', 'bad', 'data', 'here', '', ''];
    const review = Review.fromSlice(slice, mockSubmission('Bob'))!;
    expect(review.communicationScore()).toBeNaN();
    expect(review.supportivenessScore()).toBeNaN();
    expect(review.reportContributionsScore()).toBeNaN();
  });

  it('returns NaN for empty response strings', () => {
    const slice = ['Alice', '', '', '', '', ''];
    const review = Review.fromSlice(slice, mockSubmission('Bob'))!;
    expect(review.communicationScore()).toBeNaN();
  });
});

describe('feedback accessors', () => {
  it('returns valued contributions from responses[4]', () => {
    const slice = ['Alice', '3', '5', '8', 'Led the presentation', 'Could improve writing'];
    const review = Review.fromSlice(slice, mockSubmission('Bob'))!;
    expect(review.valuedContributions()).toBe('Led the presentation');
  });

  it('returns areas of improvement from responses[5]', () => {
    const slice = ['Alice', '3', '5', '8', 'Led the presentation', 'Could improve writing'];
    const review = Review.fromSlice(slice, mockSubmission('Bob'))!;
    expect(review.areasOfImprovement()).toBe('Could improve writing');
  });
});
