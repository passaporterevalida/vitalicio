
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface UserRankingData {
  id: string;
  user_id: string;
  display_name: string;
  level: number;
  total_xp: number;
  weekly_xp: number;
  position: number;
  area_stats?: Record<string, { correct: number; total: number }>;
  avatar_url?: string;
}

export interface RankingFilters {
  area?: string;
  period?: 'allTime' | 'weekly' | 'monthly';
  level?: 'all' | 'beginner' | 'intermediate' | 'advanced';
}

const ITEMS_PER_PAGE = 10;

// Mock Data - Lista fictícia de usuários para exibir no ranking sem banco de dados
const MOCK_USERS: UserRankingData[] = Array.from({ length: 50 }, (_, i) => ({
  id: `mock-${i + 1}`,
  user_id: `user-${i + 1}`,
  display_name: [
    'Ana Silva', 'Carlos Oliveira', 'Juliana Santos', 'Pedro Costa', 'Mariana Souza',
    'Lucas Pereira', 'Fernanda Lima', 'Rafael Rodrigues', 'Beatriz Almeida', 'Gabriel Ferreira',
    'Sofia Carvalho', 'Thiago Gomes', 'Larissa Martins', 'Bruno Rocha', 'Camila Ribeiro',
    'Ricardo Alves', 'Patrícia Monteiro', 'Eduardo Mendes', 'Vanessa Barros', 'Felipe Cardoso',
    'Roberto Nogueira', 'Cláudia Teixeira', 'Gustavo Henrique', 'Aline Dias', 'Marcelo Vieira',
    'Paula Ramos', 'André Moreira', 'Renata Castro', 'Rodrigo Santana', 'Luana Campos',
    'Fábio Barbosa', 'Letícia Moura', 'Diego Correia', 'Tatiana Lopes', 'Vitor Pinto',
    'Helena Freitas', 'Igor Azevedo', 'Cecília Cunha', 'Leandro Silveira', 'Bárbara Aragão',
    'Sérgio Fontes', 'Carolina Neves', 'Daniel Soares', 'Amanda Moraes', 'Renan Farias',
    'Isabela Rezende', 'Caio Duarte', 'Débora Cavalcanti', 'Alexandre Peixoto', 'Priscila Guimarães'
  ][i % 50],
  level: Math.max(1, 50 - i),
  total_xp: Math.max(100, 20000 - (i * 400)),
  weekly_xp: Math.max(0, 2000 - (i * 40)),
  position: i + 1,
  avatar_url: undefined
}));

// Query keys para React Query
export const rankingKeys = {
  all: ['ranking'] as const,
  lists: () => [...rankingKeys.all, 'list'] as const,
  list: (filters: RankingFilters, page: number) => [...rankingKeys.lists(), filters, page] as const,
  userPosition: () => [...rankingKeys.all, 'userPosition'] as const,
};

// Função para buscar ranking paginado (MOCK)
const fetchPaginatedRanking = async (type: 'allTime' | 'weekly', page: number, filters?: RankingFilters) => {
  const orderBy = type === 'allTime' ? 'total_xp' : 'weekly_xp';
  const offset = (page - 1) * ITEMS_PER_PAGE;
  
  // Ordenar usuários fictícios
  let sortedUsers = [...MOCK_USERS].sort((a, b) => b[orderBy] - a[orderBy]);

  // Aplicar filtros (implementação mock)
  if (filters?.level && filters.level !== 'all') {
    const levelRanges = {
      beginner: { min: 1, max: 5 },
      intermediate: { min: 6, max: 15 },
      advanced: { min: 16, max: 999 }
    };
    const range = levelRanges[filters.level as keyof typeof levelRanges];
    sortedUsers = sortedUsers.filter(u => u.level >= range.min && u.level <= range.max);
  }

  const totalCount = sortedUsers.length;
  const paginatedData = sortedUsers.slice(offset, offset + ITEMS_PER_PAGE).map((user, index) => ({
    ...user,
    position: offset + index + 1
  }));

  // Simular delay de rede para parecer real
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    data: paginatedData,
    totalCount: totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE)
  };
};

// Função para buscar posição do usuário de forma eficiente (MOCK)
const fetchUserPosition = async () => {
  // Simular delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Retornar posição fictícia para o usuário atual
  return {
    allTime: 12, // Posição fixa de exemplo
    weekly: 8    // Posição fixa de exemplo
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Query para ranking semanal
  const {
    data: weeklyRankingData,
    isLoading: weeklyLoading,
    error: weeklyError
  } = useQuery({
    queryKey: rankingKeys.list({ ...filters, period: 'weekly' }, weeklyCurrentPage),
    queryFn: () => fetchPaginatedRanking('weekly', weeklyCurrentPage, filters),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // Query para posição do usuário
  const {
    data: currentUserPosition,
    isLoading: userPositionLoading,
    error: userPositionError
  } = useQuery({
    queryKey: rankingKeys.userPosition(),
    queryFn: fetchUserPosition,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // Mutation para atualizar perfil do usuário (MOCK - Não faz nada)
  const updateUserProfileMutation = useMutation({
    mutationFn: async (userData: { display_name: string; level: number; total_xp: number; weekly_xp: number }) => {
       // Mock sucesso
       return userData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rankingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: rankingKeys.userPosition() });
    },
  });

  // Função para refazer queries
  const refreshRankings = () => {
    queryClient.invalidateQueries({ queryKey: rankingKeys.lists() });
    queryClient.invalidateQueries({ queryKey: rankingKeys.userPosition() });
  };

  return {
    allTimeRankingData,
    allTimeLoading,
    allTimeError,
    weeklyRankingData,
    weeklyLoading,
    weeklyError,
    currentUserPosition,
    userPositionLoading,
    userPositionError,
    updateUserProfileMutation,
    allTimeCurrentPage,
    setAllTimeCurrentPage,
    weeklyCurrentPage,
    setWeeklyCurrentPage,
    filters,
    setFilters,
    refreshRankings
  };
}
