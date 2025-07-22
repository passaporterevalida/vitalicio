import React from 'react';
import { render, screen } from '@testing-library/react';
import BadgeDisplay from '../BadgeDisplay';

describe('BadgeDisplay', () => {
  it('renderiza corretamente', () => {
    render(<BadgeDisplay badges={[]} />);
    expect(screen.getByTestId('badge-display')).toBeInTheDocument();
  });
}); 