import { describe, it, expect, beforeEach } from 'vitest';
import Submission from './Submission';
import Student from './Student';

beforeEach(() => Student.clear());

describe('REVIEW_RANGES', () => {
  it('contains 7 entries', () => {
    expect(Submission.REVIEW_RANGES).toHaveLength(7);
  });

  it('each range spans exactly 6 indices', () => {
    for (const [start, end] of Submission.REVIEW_RANGES) {
      expect(end - start).toBe(Submission.REVIEW_LENGTH);
    }
  });

  it('first review starts at index 4', () => {
    expect(Submission.REVIEW_RANGES[0][0]).toBe(4);
  });

  it('has the expected ranges for all 7 review slots', () => {
    expect(Submission.REVIEW_RANGES).toEqual([
      [4, 10],
      [11, 17],
      [18, 24],
      [25, 31],
      [32, 38],
      [39, 45],
      [46, 52],
    ]);
  });
});

describe('constructor', () => {
  it('parses the timestamp from row[0]', () => {
    const row = buildRow({ timestamp: '2024-01-15T10:30:00Z' });
    const submission = new Submission(row);
    expect(submission.createdAt).toEqual(new Date('2024-01-15T10:30:00Z'));
  });

  it('creates a student from the name and number columns', () => {
    const row = buildRow({ name: 'Alice', number: '12345' });
    const submission = new Submission(row);
    expect(submission.student.name).toBe('Alice');
    expect(submission.student.studentId).toBe(12345);
  });

  it('creates reviews for populated review slots', () => {
    const row = buildRow({
      reviews: [
        { subject: 'Bob', comm: '3', supp: '5', report: '8', valued: 'Good', improvement: 'More' },
        { subject: 'Charlie', comm: '4', supp: '6', report: '9', valued: 'Nice', improvement: 'Less' },
      ],
    });
    const submission = new Submission(row);
    expect(submission.reviews).toHaveLength(2);
    expect(submission.reviews[0].subject.name).toBe('Bob');
    expect(submission.reviews[1].subject.name).toBe('Charlie');
  });

  it('skips review slots with empty subject name', () => {
    const row = buildRow({
      reviews: [
        { subject: 'Bob', comm: '3', supp: '5', report: '8', valued: '', improvement: '' },
        { subject: '', comm: '', supp: '', report: '', valued: '', improvement: '' },
      ],
    });
    const submission = new Submission(row);
    expect(submission.reviews).toHaveLength(1);
  });

  it('handles rows shorter than expected without crashing', () => {
    const row = ['2024-01-15', 'Alice', '100', ''];
    const submission = new Submission(row);
    expect(submission.student.name).toBe('Alice');
    expect(submission.reviews).toHaveLength(0);
  });
});

interface ReviewData {
  subject: string;
  comm: string;
  supp: string;
  report: string;
  valued: string;
  improvement: string;
}

function buildRow(opts: {
  timestamp?: string;
  name?: string;
  number?: string;
  reviews?: ReviewData[];
}): string[] {
  const row: string[] = [];
  row[Submission.TIMESTAMP_INDEX] = opts.timestamp ?? '2024-01-15T10:00:00Z';
  row[Submission.STUDENT_NAME_INDEX] = opts.name ?? 'Alice';
  row[Submission.STUDENT_NUMBER_INDEX] = opts.number ?? '100';
  row[3] = '';

  const reviews = opts.reviews ?? [];
  for (let i = 0; i < reviews.length; i++) {
    const [start] = Submission.REVIEW_RANGES[i];
    const r = reviews[i];
    row[start] = r.subject;
    row[start + 1] = r.comm;
    row[start + 2] = r.supp;
    row[start + 3] = r.report;
    row[start + 4] = r.valued;
    row[start + 5] = r.improvement;
  }

  return row;
}
