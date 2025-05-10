import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Scoreboard from '../components/Scoreboard';

describe('Scoreboard', () => {
  it('renders a table', () => {
    render(<Scoreboard />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(
      screen.getByRole('row', { name: /current score/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /max score/i })).toBeInTheDocument();
  });

  it('renders with score', () => {
    render(<Scoreboard score={10} />);

    expect(
      screen.getByRole('row', { name: /current score 10/i })
    ).toBeInTheDocument();
  });

  it('renders with maxScore', () => {
    render(<Scoreboard maxScore={12} />);

    expect(
      screen.getByRole('row', { name: /max score 12/i })
    ).toBeInTheDocument();
  });

  it('renders with both score and maxScore', () => {
    render(<Scoreboard score={10} maxScore={12} />);

    expect(
      screen.getByRole('row', { name: /current score 10/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('row', { name: /max score 12/i })
    ).toBeInTheDocument();
  });

  it('renders with maxPossible', () => {
    render(<Scoreboard maxScore={12} maxPossible={17} />);
    expect(
      screen.getByRole('row', { name: /max score 12 \(17\)/i })
    ).toBeInTheDocument();
  });
});
