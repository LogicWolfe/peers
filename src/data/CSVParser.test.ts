import { describe, it, expect, beforeEach } from 'vitest';
import CSVParser from './CSVParser';
import Student from './Student';

beforeEach(() => Student.clear());

const HEADER = 'Timestamp,Name,Number,Extra,Subject1,Comm1,Supp1,Report1,Valued1,Areas1';

describe('CSVParser', () => {
  it('skips the header row', () => {
    const csv = [
      HEADER,
      '2024-01-15,Alice,100,,Bob,3,5,8,Good work,Try harder',
    ].join('\n');
    const parser = new CSVParser(csv);
    expect(parser.submissions).toHaveLength(1);
    expect(parser.submissions[0].student.name).toBe('Alice');
  });

  it('creates one Submission per data row', () => {
    const csv = [
      HEADER,
      '2024-01-15,Alice,100,,Bob,3,5,8,Good,More',
      '2024-01-15,Bob,200,,Alice,4,6,9,Nice,Less',
    ].join('\n');
    const parser = new CSVParser(csv);
    expect(parser.submissions).toHaveLength(2);
  });

  it('handles CSV with only a header row', () => {
    const parser = new CSVParser(HEADER);
    expect(parser.submissions).toHaveLength(0);
  });

  it('handles empty string input', () => {
    const parser = new CSVParser('');
    expect(parser.submissions).toHaveLength(0);
  });
});

describe('getSubmissions', () => {
  it('returns the submissions array', async () => {
    const csv = [
      HEADER,
      '2024-01-15,Alice,100,,Bob,3,5,8,Good,More',
    ].join('\n');
    const parser = new CSVParser(csv);
    const submissions = await parser.getSubmissions();
    expect(submissions).toBe(parser.submissions);
  });
});
