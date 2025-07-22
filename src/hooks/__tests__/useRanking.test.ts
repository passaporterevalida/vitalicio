import { renderHook, waitFor } from '@tanstack/react-query/testing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRanking } from '../useRanking';

// Mock do supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      range: jest.fn().mockResolvedValue({ data: [], error: null }),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      filter: jest.fn().mockReturnThis(),
    })),
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user1' } } })
    }
  }
}));

describe('useRanking', () => {
  it('deve retornar dados e loading corretamente', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useRanking(), { wrapper });
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(Array.isArray(result.current.allTimeRanking)).toBe(true);
    expect(Array.isArray(result.current.weeklyRanking)).toBe(true);
    expect(typeof result.current.currentUserPosition).toBe('object');
  });
}); 