import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Ranking from '../Ranking';

jest.mock('@/hooks/useRanking', () => ({
  useRanking: () => ({
    allTimeRanking: [],
    weeklyRanking: [],
    currentUserPosition: { allTime: 0, weekly: 0 },
    loading: false,
    allTimeCurrentPage: 1,
    weeklyCurrentPage: 1,
    setAllTimeCurrentPage: jest.fn(),
    setWeeklyCurrentPage: jest.fn(),
    allTimeTotalPages: 1,
    weeklyTotalPages: 1,
    allTimeTotalCount: 0,
    weeklyTotalCount: 0,
    filters: {},
    updateFilters: jest.fn(),
    refreshRankings: jest.fn(),
    updateUserProfile: jest.fn(),
    isUpdatingProfile: false,
    updateProfileError: null,
  })
}));

describe('Ranking page', () => {
  it('renderiza sem erros', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Ranking />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Ranking Geral/i)).toBeInTheDocument();
    expect(screen.getByText(/Ranking Semanal/i)).toBeInTheDocument();
  });
}); 