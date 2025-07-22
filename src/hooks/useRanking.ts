
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UserRankingData {
  id: string;
  user_id: string;
  display_name: string;
  level: number;
  total_xp: number;
  weekly_xp: number;
  position: number;
  area_stats?: Record<string, { correct: number; total: number }>;
}

export interface RankingFilters {
  area?: string;
  period?: 'allTime' | 'weekly' | 'monthly';
  level?: 'all' | 'beginner' | 'intermediate' | 'advanced';
}

const ITEMS_PER_PAGE = 10;

// Query keys para React Query
export const rankingKeys = {
  all: ['ranking'] as const,
  lists: () => [...rankingKeys.all, 'list'] as const,
  list: (filters: RankingFilters, page: number) => [...rankingKeys.lists(), filters, page] as const,
  userPosition: () => [...rankingKeys.all, 'userPosition'] as const,
};

// Função para buscar ranking paginado
const fetchPaginatedRanking = async (type: 'allTime' | 'weekly', page: number, filters?: RankingFilters) => {
  const orderBy = type === 'allTime' ? 'total_xp' : 'weekly_xp';
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Buscar apenas os campos necessários para o ranking
  let query = supabase
    .from('user_profiles')
    .select('id, user_id, display_name, avatar_url, level, total_xp, weekly_xp');

  // Aplicar filtros se fornecidos
  if (filters?.area) {
    // Filtro por área médica (implementação básica) - TODO: implementar filtro correto
    // query = query.filter('area_stats', 'cs', `{"${filters.area}": {"correct": {"gt": 0}}}`);
  }

  if (filters?.level && filters.level !== 'all') {
    const levelRanges = {
      beginner: { min: 1, max: 5 },
      intermediate: { min: 6, max: 15 },
      advanced: { min: 16, max: 999 }
    };
    const range = levelRanges[filters.level as keyof typeof levelRanges];
    query = query.gte('level', range.min).lte('level', range.max);
  }

  // Get total count (query separada para evitar erro de argumentos)
  const { count } = await supabase
    .from('user_profiles')
    .select('id', { count: 'exact', head: true });

  // Get paginated data
  const { data, error } = await query
    .order(orderBy, { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  if (error) {
    throw new Error(`Error fetching ${type} ranking: ${error.message}`);
  }

  // Add position to data (based on global ranking position)
  const rankingWithPosition = data?.map((user, index) => ({
    ...user,
    position: offset + index + 1
  })) || [];

  // Log nomes para depuração
  if (rankingWithPosition.length > 0) {
    console.log(`[useRanking] Ranking (${type}) nomes:`, rankingWithPosition.map(u => u.display_name));
  }

  return {
    data: rankingWithPosition,
    totalCount: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE)
  };
};

// Função para buscar posição do usuário de forma eficiente
const fetchUserPosition = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { allTime: 0, weekly: 0 };

  // Buscar o XP do usuário
  const { data: userData, error: userError } = await supabase
    .from('user_profiles')
    .select('total_xp, weekly_xp')
    .eq('user_id', user.id)
    .maybeSingle();

  if (userError || !userData) return { allTime: 0, weekly: 0 };

  // Buscar posição no ranking geral (quantos têm mais XP)
  const { count: allTimeCount } = await supabase
    .from('user_profiles')
    .select('id', { count: 'exact', head: true })
    .gt('total_xp', userData.total_xp);

  // Buscar posição no ranking semanal (quantos têm mais weekly_xp)
  const { count: weeklyCount } = await supabase
    .from('user_profiles')
    .select('id', { count: 'exact', head: true })
    .gt('weekly_xp', userData.weekly_xp);

  return {
    allTime: (allTimeCount || 0) + 1,
    weekly: (weeklyCount || 0) + 1
  };
};

export function useRanking() {
  const queryClient = useQueryClient();
  
  // Estados locais para paginação
  const [allTimeCurrentPage, setAllTimeCurrentPage] = useState(1);
  const [weeklyCurrentPage, setWeeklyCurrentPage] = useState(1);
  const [filters, setFilters] = useState<RankingFilters>({});

  // Query para ranking geral
  const {
    data: allTimeRankingData,
    isLoading: allTimeLoading,
    error: allTimeError
  } = useQuery({
    queryKey: rankingKeys.list({ ...filters, period: 'allTime' }, allTimeCurrentPage),
    queryFn: () => fetchPaginatedRanking('allTime', allTimeCurrentPage, filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  // Query para ranking semanal
  const {
    data: weeklyRankingData,
    isLoading: weeklyLoading,
    error: weeklyError
  } = useQuery({
    queryKey: rankingKeys.list({ ...filters, period: 'weekly' }, weeklyCurrentPage),
    queryFn: () => fetchPaginatedRanking('weekly', weeklyCurrentPage, filters),
    staleTime: 2 * 60 * 1000, // 2 minutos (mais frequente)
    gcTime: 5 * 60 * 1000, // 5 minutos
  });

  // Query para posição do usuário
  const {
    data: currentUserPosition,
    isLoading: userPositionLoading,
    error: userPositionError
  } = useQuery({
    queryKey: rankingKeys.userPosition(),
    queryFn: fetchUserPosition,
    staleTime: 1 * 60 * 1000, // 1 minuto
    gcTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para atualizar perfil do usuário
  const updateUserProfileMutation = useMutation({
    mutationFn: async (userData: { display_name: string; level: number; total_xp: number; weekly_xp: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          display_name: userData.display_name,
          level: userData.level,
          total_xp: userData.total_xp,
          weekly_xp: userData.weekly_xp,
          updated_at: new Date().toISOString()
        });

      if (error) throw new Error(`Error updating user profile: ${error.message}`);
      return userData;
    },
    onSuccess: () => {
      // Invalidate e refetch queries relacionadas
      queryClient.invalidateQueries({ queryKey: rankingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: rankingKeys.userPosition() });
    },
  });

  // Função para refazer queries
  const refreshRankings = () => {
    queryClient.invalidateQueries({ queryKey: rankingKeys.lists() });
    queryClient.invalidateQueries({ queryKey: rankingKeys.userPosition() });
  };

  // Função para atualizar filtros
  const updateFilters = (newFilters: Partial<RankingFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset páginas quando filtros mudam
    setAllTimeCurrentPage(1);
    setWeeklyCurrentPage(1);
  };

  // --- Realtime: Atualização automática do ranking ---
  useEffect(() => {
    // Cria canal realtime para user_profiles
    const channel = supabase.channel('public:user_profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_profiles' }, (payload) => {
        // Invalida queries do ranking ao detectar mudanças
        queryClient.invalidateQueries({ queryKey: rankingKeys.lists() });
        queryClient.invalidateQueries({ queryKey: rankingKeys.userPosition() });
      })
      .subscribe();

    // Listener para evento customizado de refresh
    const handleRankingRefresh = () => {
      console.log('[useRanking] Evento ranking-refresh recebido, refazendo ranking...');
      refreshRankings();
    };
    window.addEventListener('ranking-refresh', handleRankingRefresh);
    return () => {
      window.removeEventListener('ranking-refresh', handleRankingRefresh);
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    // Dados do ranking
    allTimeRanking: allTimeRankingData?.data || [],
    weeklyRanking: weeklyRankingData?.data || [],
    currentUserPosition: currentUserPosition || { allTime: 0, weekly: 0 },
    
    // Estados de loading
    loading: allTimeLoading || weeklyLoading || userPositionLoading,
    allTimeLoading,
    weeklyLoading,
    userPositionLoading,
    
    // Erros
    allTimeError,
    weeklyError,
    userPositionError,
    
    // Paginação
    allTimeCurrentPage,
    weeklyCurrentPage,
    setAllTimeCurrentPage,
    setWeeklyCurrentPage,
    allTimeTotalPages: allTimeRankingData?.totalPages || 0,
    weeklyTotalPages: weeklyRankingData?.totalPages || 0,
    allTimeTotalCount: allTimeRankingData?.totalCount || 0,
    weeklyTotalCount: weeklyRankingData?.totalCount || 0,
    
    // Filtros
    filters,
    updateFilters,
    
    // Ações
    refreshRankings,
    updateUserProfile: updateUserProfileMutation.mutate,
    isUpdatingProfile: updateUserProfileMutation.isPending,
    updateProfileError: updateUserProfileMutation.error,
  };
}
