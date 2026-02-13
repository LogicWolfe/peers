import { describe, it, expect, beforeEach } from 'vitest';
import CSVParser from './CSVParser';
import Student from './Student';

beforeEach(() => Student.clear());

// A realistic CSV where three students (Alice, Bob, Charlie) review each other.
// Each student's submission row contains reviews of their teammates.
// Alice reviews Bob and Charlie, Bob reviews Alice and Charlie, Charlie reviews Alice and Bob.
const CSV = [
  'Timestamp,Name,Number,Extra,Subject1,Comm1,Supp1,Report1,Valued1,Areas1,Gap1,Subject2,Comm2,Supp2,Report2,Valued2,Areas2',
  // Alice (student 100) reviews Bob and Charlie
  '2024-01-15,Alice,100,,Bob,3,4,8,Led discussions,Be more concise,,Charlie,4,5,9,Great research,Needs better citations',
  // Bob (student 200) reviews Alice and Charlie
  '2024-01-16,Bob,200,,Alice,3,5,7,Clear writing,Missed a meeting,,Charlie,3,6,10,Excellent analysis,Could present more',
  // Charlie (student 300) reviews Alice and Bob
  '2024-01-17,Charlie,300,,Alice,4,6,9,Good presentation,Improve formatting,,Bob,4,5,7,Reliable teammate,Speak up in meetings',
].join('\n');

describe('CSV to aggregated student data', () => {
  it('parses a multi-row CSV and produces the correct students', () => {
    new CSVParser(CSV);
    const students = Student.all();
    const names = students.map(s => s.name);
    expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('aggregates scores across multiple reviewers', () => {
    new CSVParser(CSV);

    // Alice is reviewed by Bob (comm:3, supp:5, report:7) and Charlie (comm:4, supp:6, report:9)
    const alice = Student.fromName('Alice');
    expect(alice.communicationScore()).toBe(3.5);
    expect(alice.supportivenessScore()).toBe(5.5);
    expect(alice.reportContributionsScore()).toBe(8);
    expect(alice.totalScore()).toBe(17);

    // Bob is reviewed by Alice (comm:3, supp:4, report:8) and Charlie (comm:4, supp:5, report:7)
    const bob = Student.fromName('Bob');
    expect(bob.communicationScore()).toBe(3.5);
    expect(bob.supportivenessScore()).toBe(4.5);
    expect(bob.reportContributionsScore()).toBe(7.5);
    expect(bob.totalScore()).toBe(15.5);

    // Charlie is reviewed by Alice (comm:4, supp:5, report:9) and Bob (comm:3, supp:6, report:10)
    const charlie = Student.fromName('Charlie');
    expect(charlie.communicationScore()).toBe(3.5);
    expect(charlie.supportivenessScore()).toBe(5.5);
    expect(charlie.reportContributionsScore()).toBe(9.5);
    expect(charlie.totalScore()).toBe(18.5);
  });

  it('tracks which students reviewed each other', () => {
    new CSVParser(CSV);
    expect(Student.fromName('Alice').reviewedBy()).toBe('Bob, Charlie');
    expect(Student.fromName('Bob').reviewedBy()).toBe('Alice, Charlie');
    expect(Student.fromName('Charlie').reviewedBy()).toBe('Alice, Bob');
  });

  it('collects valued contributions from all reviewers', () => {
    new CSVParser(CSV);
    const aliceContributions = Student.fromName('Alice').valuedContributions();
    expect(aliceContributions).toHaveLength(2);
    expect(aliceContributions).toContain('Clear writing');
    expect(aliceContributions).toContain('Good presentation');
  });

  it('collects areas of improvement from all reviewers', () => {
    new CSVParser(CSV);
    const bobImprovements = Student.fromName('Bob').areasOfImprovement();
    expect(bobImprovements).toHaveLength(2);
    expect(bobImprovements).toContain('Be more concise');
    expect(bobImprovements).toContain('Speak up in meetings');
  });

  it('clearing students and re-parsing produces fresh data', () => {
    new CSVParser(CSV);
    expect(Student.all()).toHaveLength(3);

    Student.clear();
    expect(Student.all()).toHaveLength(0);

    new CSVParser(CSV);
    expect(Student.all()).toHaveLength(3);
    expect(Student.fromName('Alice').reviews).toHaveLength(2);
  });
});
