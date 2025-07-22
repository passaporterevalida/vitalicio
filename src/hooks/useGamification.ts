
import { useGamificationCore } from './useGamificationCore';

// Re-export types for backward compatibility
export type { Achievement, Quest, MedicalCard, UserProgress } from '@/types/gamification';

export function useGamification() {
  const {
    user,
    userProgress,
    loading,
    supabaseGamification,
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
  } = useGamificationCore();
  
  const answerQuestion = (correct: boolean, area?: string, questionId?: number, difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
    console.log('useGamification.answerQuestion called:', { correct, area, questionId, difficulty, user: !!user });
    
    if (user) {
      // Use Supabase for logged-in users
      supabaseGamification.answerQuestion(correct, area, difficulty);
    } else {
      // Use local state for non-logged-in users
      baseAnswerQuestion(correct, area, difficulty);
    }
  };

  // Remover completeSimulado do escopo, pois não é necessário para o reset de jornada
  // const completeSimulado = (score: number, total: number) => {
  //   console.log('useGamification.completeSimulado called:', { score, total, user: !!user });
    
  //   if (user) {
  //     supabaseGamification.completeSimulado(score, total);
  //   } else {
  //     baseCompleteSimulado(score, total);
  //   }
    
  //   if (score === total) {
  //     unlockAchievement('sniper_gabarito');
  //   }
  // };

  const addXP = (points: number) => {
    console.log('useGamification.addXP called:', { points, user: !!user });
    
    if (user) {
      supabaseGamification.addXP(points);
    } else {
      setUserProgress(prev => {
        const { newXP, newLevel, newXPToNext } = require('@/utils/gamificationHelpers').calculateLevelUp(prev.xp, prev.level, points);

        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          xpToNextLevel: newXPToNext
        };
      });
    }
  };

  const resetStats = () => {
    if (user) {
      supabaseGamification.resetStats();
    } else {
      localResetStats();
    }
  };

  const resetJornada = async () => {
    if (user) {
      await supabaseGamification.resetJornada();
    } else {
      // Para usuários não logados, zere o progresso local
      setUserProgress({
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        totalQuestions: 0,
        correctAnswers: 0,
        streakDias: 0,
        achievements: [],
        newlyUnlockedAchievements: [],
        quests: [],
        medicalCards: [],
        areaStats: {},
        weeklyXP: 0,
        monthlyXP: 0,
        xpHistory: [],
        periodStats: [],
        studyGoals: [],
        advancedStats: undefined,
        currentCombo: 0,
        maxCombo: 0,
        totalStudyTime: 0,
        lastXPBreakdown: undefined,
        lastActivityDate: undefined
      });
    }
  };

  const getAccuracy = () => {
    if (user) {
      return supabaseGamification.getAccuracy();
    } else {
      return localGetAccuracy();
    }
  };

  const getProgressPercentage = () => {
    if (user) {
      return supabaseGamification.getProgressPercentage();
    } else {
      return localGetProgressPercentage();
    }
  };

  const getAdvancedStats = () => {
    if (user) {
      return supabaseGamification.getAdvancedStats();
    } else {
      return localGetAdvancedStats();
    }
  };

  const getStudyGoals = () => {
    if (user) {
      return supabaseGamification.getStudyGoals();
    } else {
      return localGetStudyGoals();
    }
  };

  // Get the newly unlocked badge for badge notification
  const getNewlyUnlockedBadge = () => {
    return getNewlyUnlockedAchievement();
  };

  const clearNewlyUnlockedBadge = () => {
    clearNewlyUnlockedAchievement();
  };

  // Debug information
  console.log('useGamification state:', {
    userLoggedIn: !!user,
    userProgress: {
      level: userProgress.level,
      xp: userProgress.xp,
      xpToNextLevel: userProgress.xpToNextLevel,
      totalQuestions: userProgress.totalQuestions,
      correctAnswers: userProgress.correctAnswers,
      weeklyXP: userProgress.weeklyXP,
      currentCombo: userProgress.currentCombo,
      maxCombo: userProgress.maxCombo
    },
    loading
  });

  return {
    userProgress,
    loading,
    answerQuestion,
    addXP,
    resetStats,
    resetJornada,
    getAccuracy,
    getProgressPercentage,
    getStreakBonus,
    getAdvancedStats,
    getStudyGoals,
    getNewlyUnlockedBadge,
    clearNewlyUnlockedBadge,
    generateQuestSuggestions
  };
}
