import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoadCSV from './LoadCSV';

const mockOpen = vi.fn();
const mockInvoke = vi.fn();

vi.mock('@tauri-apps/plugin-dialog', () => ({
  open: (...args: unknown[]) => mockOpen(...args),
}));

vi.mock('@tauri-apps/api/core', () => ({
  invoke: (...args: unknown[]) => mockInvoke(...args),
}));

beforeEach(() => {
  mockOpen.mockReset();
  mockInvoke.mockReset();
});

describe('LoadCSV', () => {
  it('renders an Import CSV button', () => {
    render(<LoadCSV fileLoaded={vi.fn()} />);
    expect(screen.getByText('Import CSV')).toBeInTheDocument();
  });

  it('opens the file dialog when the button is clicked', async () => {
    mockOpen.mockResolvedValue(null);
    render(<LoadCSV fileLoaded={vi.fn()} />);

    await userEvent.click(screen.getByText('Import CSV'));
    expect(mockOpen).toHaveBeenCalledOnce();
  });

  it('does not call fileLoaded when the dialog is cancelled', async () => {
    mockOpen.mockResolvedValue(null);
    const fileLoaded = vi.fn();
    render(<LoadCSV fileLoaded={fileLoaded} />);

    await userEvent.click(screen.getByText('Import CSV'));
    expect(fileLoaded).not.toHaveBeenCalled();
  });

  it('invokes read_file and calls fileLoaded on successful selection', async () => {
    mockOpen.mockResolvedValue('/path/to/file.csv');
    mockInvoke.mockResolvedValue('csv,content,here');
    const fileLoaded = vi.fn();
    render(<LoadCSV fileLoaded={fileLoaded} />);

    await userEvent.click(screen.getByText('Import CSV'));
    expect(mockInvoke).toHaveBeenCalledWith('read_file', { path: '/path/to/file.csv' });
    expect(fileLoaded).toHaveBeenCalledWith('csv,content,here');
  });
});
