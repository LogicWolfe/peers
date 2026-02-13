import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Students from './Students';
import Student from '../data/Student';

beforeEach(() => Student.clear());

function buildStudents(...names: string[]): Student[] {
  return names.map(name => Student.fromName(name));
}

describe('Students', () => {
  it('renders a button for each student', () => {
    const students = buildStudents('Alice', 'Bob', 'Charlie');
    render(<Students students={students} selectStudentFn={vi.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('first student is selected (green) by default', () => {
    const students = buildStudents('Alice', 'Bob');
    render(<Students students={students} selectStudentFn={vi.fn()} />);
    const aliceButton = screen.getByText('Alice').closest('button')!;
    const bobButton = screen.getByText('Bob').closest('button')!;
    expect(aliceButton.className).toContain('green');
    expect(bobButton.className).toContain('grey');
  });

  it('clicking a student calls selectStudentFn with that name', async () => {
    const selectFn = vi.fn();
    const students = buildStudents('Alice', 'Bob');
    render(<Students students={students} selectStudentFn={selectFn} />);

    await userEvent.click(screen.getByText('Bob'));
    expect(selectFn).toHaveBeenCalledWith('Bob');
  });

  it('clicking a student changes its button to green', async () => {
    const students = buildStudents('Alice', 'Bob');
    render(<Students students={students} selectStudentFn={vi.fn()} />);

    await userEvent.click(screen.getByText('Bob'));

    const aliceButton = screen.getByText('Alice').closest('button')!;
    const bobButton = screen.getByText('Bob').closest('button')!;
    expect(bobButton.className).toContain('green');
    expect(aliceButton.className).toContain('grey');
  });
});
