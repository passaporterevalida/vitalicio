
import { UserProgress } from '@/types/gamification';
import { 
  calculateLevelUp, 
  calculateStreakXP, 
  generateQuestSuggestions,
  getXPForQuestion,
  getXPForMissionCompletion,
  calculateQuestionXP,
  calculateAdvancedStats,
  generateStudyGoals
} from '@/utils/gamificationHelpers';

export function useGamificationActions(
  userProgress: UserProgress,
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>,
  checkAchievements: (correct: boolean, area?: string) => void
) {
  const resetStats = () => {
    setUserProgress(prev => ({
      ...prev,
      totalQuestions: 0,
      correctAnswers: 0,
      areaStats: {},
    }));
  };

  const updateStreak = () => {
    const today = new Date();
    const todayStr = today.toDateString();
    
    setUserProgress(prev => {
      const lastActivity = prev.lastActivityDate;
      const lastActivityStr = lastActivity?.toDateString();
      
      if (lastActivityStr === todayStr) {
        return prev;
      }
      
      let newStreak = 1;
      if (lastActivity) {
        const diffTime = today.getTime() - lastActivity.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = prev.streakDias + 1;
        }
      }
      
      const streakXP = calculateStreakXP(newStreak);
      console.log(`Streak updated: ${newStreak} days, +${streakXP} XP`);
      
      return {
        ...prev,
        streakDias: newStreak,
        lastActivityDate: today,
        xp: prev.xp + streakXP
      };
    });
  };

  const updateAreaStats = (area: string, correct: boolean) => {
    setUserProgress(prev => {
      const areaStats = { ...prev.areaStats };
      if (!areaStats[area]) {
        areaStats[area] = { correct: 0, total: 0 };
      }
      
      areaStats[area].total += 1;
      if (correct) {
        areaStats[area].correct += 1;
      }
      
      return {
        ...prev,
        areaStats
      };
    });
  };

  const addXP = (points: number) => {
    setUserProgress(prev => {
      const { newXP, newLevel, newXPToNext } = calculateLevelUp(prev.xp, prev.level, points);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext
      };
    });
  };

  const addXPWithBreakdown = (xpBreakdown: any) => {
    setUserProgress(prev => {
      const { newXP, newLevel, newXPToNext } = calculateLevelUp(prev.xp, prev.level, xpBreakdown.totalXP);

      // Atualizar XP semanal
      const newWeeklyXP = (prev.weeklyXP || 0) + xpBreakdown.totalXP;

      // Adicionar ao histórico de XP
      const newXPHistory = [
        ...(prev.xpHistory || []),
        {
          date: new Date().toISOString().split('T')[0],
          xpGained: xpBreakdown.totalXP,
          source: 'question' as const,
          details: `Questão: ${xpBreakdown.baseXP} + Streak: ${xpBreakdown.streakBonus} + Combo: ${xpBreakdown.comboBonus}`
        }
      ].slice(-50); // Manter apenas os últimos 50 registros

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        weeklyXP: newWeeklyXP,
        xpHistory: newXPHistory,
        lastXPBreakdown: xpBreakdown
      };
    });
  };

  const answerQuestion = (correct: boolean, area?: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
    updateStreak();
    
    setUserProgress(prev => {
      const newTotal = prev.totalQuestions + 1;
      const newCorrect = correct ? prev.correctAnswers + 1 : prev.correctAnswers;
      
      // Atualizar combo
      const newCombo = correct ? (prev.currentCombo || 0) + 1 : 0;
      const newMaxCombo = Math.max(prev.maxCombo || 0, newCombo);
      
      // Calcular XP com breakdown
      const xpBreakdown = calculateQuestionXP(
        correct,
        prev.streakDias,
        newCombo,
        difficulty,
        prev.newlyUnlockedAchievements.length > 0
      );

      return {
        ...prev,
        totalQuestions: newTotal,
        correctAnswers: newCorrect,
        currentCombo: newCombo,
        maxCombo: newMaxCombo,
        lastXPBreakdown: xpBreakdown
      };
    });

    if (area) {
      updateAreaStats(area, correct);
    }

    checkAchievements(correct, area);
    
    // Adicionar XP com breakdown se correto
    if (correct) {
      const xpBreakdown = calculateQuestionXP(
        correct,
        userProgress.streakDias,
        userProgress.currentCombo || 0,
        difficulty,
        userProgress.newlyUnlockedAchievements.length > 0
      );
      addXPWithBreakdown(xpBreakdown);
    }
  };

  const getAccuracy = () => {
    if (userProgress.totalQuestions === 0) return 0;
    return Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100);
  };

  const getProgressPercentage = () => {
    return Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  };

  const getStreakBonus = () => {
    return calculateStreakXP(userProgress.streakDias);
  };

  const getAdvancedStats = () => {
    return calculateAdvancedStats(userProgress);
  };

  const getStudyGoals = () => {
    return generateStudyGoals(userProgress);
  };

  return {
    resetStats,
    answerQuestion,
    getAccuracy,
    getProgressPercentage,
    getStreakBonus,
    getAdvancedStats,
    getStudyGoals,
    generateQuestSuggestions: () => generateQuestSuggestions(userProgress.areaStats)
  };
}
