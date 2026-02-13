import { describe, it, expect, beforeEach } from 'vitest';
import Student from './Student';
import Review from './Review';
import Submission from './Submission';

beforeEach(() => Student.clear());

function mockSubmission(reviewerName: string) {
  return { student: Student.fromName(reviewerName) } as Submission;
}

function addReview(subjectName: string, reviewerName: string, scores: { comm: number; supp: number; report: number }, feedback?: { valued?: string; improvement?: string }) {
  const slice = [
    subjectName,
    String(scores.comm),
    String(scores.supp),
    String(scores.report),
    feedback?.valued ?? '',
    feedback?.improvement ?? '',
  ];
  return Review.fromSlice(slice, mockSubmission(reviewerName))!;
}

describe('singleton registry', () => {
  it('returns the same instance for the same name', () => {
    const a = Student.fromName('Alice');
    const b = Student.fromName('Alice');
    expect(a).toBe(b);
  });

  it('creates distinct instances for different names', () => {
    const alice = Student.fromName('Alice');
    const bob = Student.fromName('Bob');
    expect(alice).not.toBe(bob);
  });

  it('sets studentId on first call', () => {
    const alice = Student.fromName('Alice', 42);
    expect(alice.studentId).toBe(42);
  });

  it('fills in studentId if originally undefined', () => {
    Student.fromName('Alice');
    Student.fromName('Alice', 42);
    expect(Student.fromName('Alice').studentId).toBe(42);
  });

  it('does not overwrite an existing studentId', () => {
    Student.fromName('Alice', 42);
    Student.fromName('Alice', 99);
    expect(Student.fromName('Alice').studentId).toBe(42);
  });

  it('clear resets the registry', () => {
    Student.fromName('Alice');
    Student.clear();
    expect(Student.all()).toHaveLength(0);
  });
});

describe('all', () => {
  it('returns empty array when no students exist', () => {
    expect(Student.all()).toEqual([]);
  });

  it('returns students sorted alphabetically by name', () => {
    Student.fromName('Charlie');
    Student.fromName('Alice');
    Student.fromName('Bob');
    const names = Student.all().map(s => s.name);
    expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
  });
});

describe('score aggregation', () => {
  it('averages communication scores across reviews', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 8 });
    addReview('Alice', 'Charlie', { comm: 4, supp: 6, report: 10 });
    expect(Student.fromName('Alice').communicationScore()).toBe(3.5);
  });

  it('averages supportiveness scores across reviews', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 4, report: 8 });
    addReview('Alice', 'Charlie', { comm: 3, supp: 6, report: 8 });
    expect(Student.fromName('Alice').supportivenessScore()).toBe(5);
  });

  it('averages report contributions scores across reviews', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 7 });
    addReview('Alice', 'Charlie', { comm: 3, supp: 5, report: 9 });
    expect(Student.fromName('Alice').reportContributionsScore()).toBe(8);
  });

  it('totalScore sums the three averaged scores', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 8 });
    addReview('Alice', 'Charlie', { comm: 4, supp: 6, report: 10 });
    const alice = Student.fromName('Alice');
    // comm avg: 3.5, supp avg: 5.5, report avg: 9 → total: 18
    expect(alice.totalScore()).toBe(18);
  });

  it('returns NaN when student has no reviews', () => {
    const alice = Student.fromName('Alice');
    expect(alice.communicationScore()).toBeNaN();
    expect(alice.supportivenessScore()).toBeNaN();
    expect(alice.reportContributionsScore()).toBeNaN();
    expect(alice.totalScore()).toBeNaN();
  });
});

describe('feedback', () => {
  it('valuedContributions returns all non-falsy contributions', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 8 }, { valued: 'Good research' });
    addReview('Alice', 'Charlie', { comm: 4, supp: 6, report: 10 }, { valued: 'Clear writing' });
    const result = Student.fromName('Alice').valuedContributions();
    expect(result).toHaveLength(2);
    expect(result).toContain('Good research');
    expect(result).toContain('Clear writing');
  });

  it('valuedContributions filters out empty strings', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 8 }, { valued: 'Good work' });
    addReview('Alice', 'Charlie', { comm: 4, supp: 6, report: 10 }, { valued: '' });
    const result = Student.fromName('Alice').valuedContributions();
    expect(result).toEqual(['Good work']);
  });

  it('areasOfImprovement returns all non-falsy feedback', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 8 }, { improvement: 'Speak up more' });
    addReview('Alice', 'Charlie', { comm: 4, supp: 6, report: 10 }, { improvement: 'Meet deadlines' });
    const result = Student.fromName('Alice').areasOfImprovement();
    expect(result).toHaveLength(2);
    expect(result).toContain('Speak up more');
    expect(result).toContain('Meet deadlines');
  });

  it('reviewedBy joins reviewer names with commas', () => {
    addReview('Alice', 'Bob', { comm: 3, supp: 5, report: 8 });
    addReview('Alice', 'Charlie', { comm: 4, supp: 6, report: 10 });
    expect(Student.fromName('Alice').reviewedBy()).toBe('Bob, Charlie');
  });

  it('reviewedBy returns empty string when no reviews', () => {
    expect(Student.fromName('Alice').reviewedBy()).toBe('');
  });
});
