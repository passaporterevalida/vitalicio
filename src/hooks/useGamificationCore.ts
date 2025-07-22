import { useAuth } from '@/hooks/useAuth';
import { useGamificationSupabase } from './useGamificationSupabase';
import { useGamificationState } from './useGamificationState';
import { useGamificationActions } from './useGamificationActions';
import { useGamificationAchievements } from './useGamificationAchievements';

/**
 * Hook core para gamificação - gerencia estado e ações básicas
 * Separa responsabilidades do useGamification principal
 */
export function useGamificationCore() {
  const { user } = useAuth();
  
  // Use Supabase integration if user is logged in, otherwise use local state
  const supabaseGamification = useGamificationSupabase();
  const { userProgress: localProgress, setUserProgress } = useGamificationState();
  
  const {
    unlockAchievement,
    checkAchievements,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  } = useGamificationAchievements(
    user ? supabaseGamification.userProgress : localProgress, 
    setUserProgress
  );

  const {
    resetStats: localResetStats,
    answerQuestion: baseAnswerQuestion,
    getAccuracy: localGetAccuracy,
    getProgressPercentage: localGetProgressPercentage,
    getStreakBonus,
    getAdvancedStats: localGetAdvancedStats,
    getStudyGoals: localGetStudyGoals,
    generateQuestSuggestions
  } = useGamificationActions(
    user ? supabaseGamification.userProgress : localProgress, 
    setUserProgress, 
    checkAchievements
  );

  // Use Supabase methods if user is logged in
  const userProgress = user ? supabaseGamification.userProgress : localProgress;
  const loading = user ? supabaseGamification.loading : false;

  return {
    user,
    userProgress,
    loading,
    supabaseGamification,
    localProgress,
    setUserProgress,
    unlockAchievement,
    checkAchievements,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement,
    localResetStats,
    baseAnswerQuestion,
    localGetAccuracy,
    localGetProgressPercentage,
    getStreakBonus,
    localGetAdvancedStats,
    localGetStudyGoals,
    generateQuestSuggestions
  };
} 