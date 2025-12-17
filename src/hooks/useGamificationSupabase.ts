
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { UserProgress } from '@/types/gamification';
import { ACHIEVEMENTS } from '@/data/achievements';
import { useToast } from '@/hooks/use-toast';
import { getXPForQuestion, calculateQuestionXP, calculateAdvancedStats, generateStudyGoals } from '@/utils/gamificationHelpers';

export function useGamificationSupabase() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalQuestions: 0,
    correctAnswers: 0,
    streakDias: 0,
    achievements: [...ACHIEVEMENTS],
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
    lastXPBreakdown: undefined
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user progress from Supabase (Mocked for offline/no-db mode)
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    try {
      console.log('Carregando progresso do usuário (MOCK):', user?.id);
      
      // Simulating network delay slightly for realism or just immediate
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock profile data
      const mockProfile = {
        level: 1,
        total_xp: 0,
        total_questions: 0,
        correct_answers: 0,
        streak_dias: 0,
        weekly_xp: 0,
        monthly_xp: 0
      };
      const allAchievements = [...ACHIEVEMENTS];
      const areaStats = {};

      const progressData = {
        level: mockProfile.level,
        xp: mockProfile.total_xp,
        xpToNextLevel: mockProfile.level * 100,
        totalQuestions: mockProfile.total_questions,
        correctAnswers: mockProfile.correct_answers,
        streakDias: mockProfile.streak_dias,
        lastActivityDate: new Date(),
        achievements: allAchievements,
        newlyUnlockedAchievements: [],
        quests: [],
        medicalCards: [],
        areaStats,
        weeklyXP: mockProfile.weekly_xp,
        monthlyXP: mockProfile.monthly_xp,
        xpHistory: [],
        periodStats: [],
        studyGoals: [],
        advancedStats: undefined,
        currentCombo: 0,
        maxCombo: 0,
        totalStudyTime: 0,
        lastXPBreakdown: undefined
      };

      setUserProgress(progressData);
    } catch (error) {
      console.error('Error loading user progress (mock):', error);
      toast({
        title: "Erro ao carregar progresso",
        description: "Usando perfil local temporário.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveUserProgress = async (progress: UserProgress) => {
    if (!user || saving) {
      console.log('Não salvando: usuário não logado ou já salvando');
      return;
    }

    setSaving(true);
    try {
      console.log('Salvando progresso do usuário:', progress);

      // Convert achievements to JSON-compatible format
      const achievementsJson = progress.achievements.map(ach => ({
        id: ach.id,
        title: ach.title,
        description: ach.description,
        icon: ach.icon,
        unlocked: ach.unlocked,
        unlockedAt: ach.unlockedAt?.toISOString(),
        category: ach.category,
        area: ach.area
      }));

      const dataToSave = {
        user_id: user.id,
        level: progress.level,
        total_xp: progress.xp,
        weekly_xp: progress.weeklyXP || 0,
        total_questions: progress.totalQuestions,
        correct_answers: progress.correctAnswers,
        streak_dias: progress.streakDias,
        last_activity_date: progress.lastActivityDate?.toISOString() || new Date().toISOString(),
        achievements: achievementsJson as any,
        area_stats: progress.areaStats as any,
        updated_at: new Date().toISOString()
      };

      console.log('Dados a serem salvos:', dataToSave);

      // Use upsert to handle both insert and update cases
      const { error } = await supabase
        .from('user_profiles')
        .upsert(dataToSave, {
          onConflict: 'user_id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error('Erro ao salvar progresso:', error);
        toast({
          title: "Erro ao salvar progresso",
          description: "Não foi possível salvar seu progresso. Tente novamente.",
          variant: "destructive",
        });
      } else {
        console.log('Progresso salvo com sucesso');
      }
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      toast({
        title: "Erro ao salvar progresso",
        description: "Ocorreu um erro inesperado ao salvar.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addXP = (points: number) => {
    console.log('Adicionando XP:', points);
    
    setUserProgress(prev => {
      let newXP = prev.xp + points;
      let newLevel = prev.level;
      let newXPToNext = newLevel * 100;

      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100;
      }

      const updated = {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        weeklyXP: (prev.weeklyXP || 0) + points
      };

      console.log('Progresso atualizado com XP:', updated);
      
      // Save with debounce to avoid too many calls
      setTimeout(() => saveUserProgress(updated), 1000);
      return updated;
    });
  };

  const addXPWithBreakdown = (xpBreakdown: any) => {
    console.log('Adicionando XP com breakdown:', xpBreakdown);
    
    setUserProgress(prev => {
      let newXP = prev.xp + xpBreakdown.totalXP;
      let newLevel = prev.level;
      let newXPToNext = newLevel * 100;

      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100;
      }

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

      const updated = {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        weeklyXP: newWeeklyXP,
        xpHistory: newXPHistory,
        lastXPBreakdown: xpBreakdown
      };

      console.log('Progresso atualizado com XP breakdown:', updated);
      
      // Save with debounce
      setTimeout(() => saveUserProgress(updated), 1000);
      return updated;
    });
  };

  const answerQuestion = (correct: boolean, area?: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
    console.log('Respondendo questão:', { correct, area, difficulty });
    
    setUserProgress(prev => {
      const today = new Date();
      const todayStr = today.toDateString();
      const lastActivity = prev.lastActivityDate;
      const lastActivityStr = lastActivity?.toDateString();
      
      let newStreak = 1;
      if (lastActivity && lastActivityStr !== todayStr) {
        const diffTime = today.getTime() - lastActivity.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = prev.streakDias + 1;
        }
      } else if (lastActivityStr === todayStr) {
        newStreak = prev.streakDias;
      }

      // Update area stats
      const areaStats = { ...prev.areaStats };
      if (area) {
        if (!areaStats[area]) {
          areaStats[area] = { correct: 0, total: 0 };
        }
        areaStats[area].total += 1;
        if (correct) {
          areaStats[area].correct += 1;
        }
      }

      // Atualizar combo
      const newCombo = correct ? (prev.currentCombo || 0) + 1 : 0;
      const newMaxCombo = Math.max(prev.maxCombo || 0, newCombo);

      const updated = {
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
        streakDias: newStreak,
        lastActivityDate: today,
        areaStats,
        currentCombo: newCombo,
        maxCombo: newMaxCombo,
        totalStudyTime: (prev.totalStudyTime || 0) + 2 // 2 min por questão
      };

      console.log('Progresso atualizado após resposta:', updated);
      
      // Save with debounce
      setTimeout(() => saveUserProgress(updated), 1000);
      return updated;
    });

    // Add XP with breakdown if correct
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

  const resetStats = () => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        totalQuestions: 0,
        correctAnswers: 0,
        areaStats: {},
        currentCombo: 0,
        maxCombo: 0,
        totalStudyTime: 0
      };
      
      saveUserProgress(updated);
      return updated;
    });
  };

  const resetJornada = async () => {
    if (!user) return;
    const resetAchievements = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false, unlockedAt: undefined }));
    const resetProgress: UserProgress = {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalQuestions: 0,
      correctAnswers: 0,
      streakDias: 0,
      achievements: resetAchievements,
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
    };
    setUserProgress(resetProgress);
    await saveUserProgress(resetProgress);
  };

  const getAccuracy = () => {
    if (userProgress.totalQuestions === 0) return 0;
    return Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100);
  };

  const getProgressPercentage = () => {
    return Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  };

  const getAdvancedStats = () => {
    return calculateAdvancedStats(userProgress);
  };

  const getStudyGoals = () => {
    return generateStudyGoals(userProgress);
  };

  return {
    userProgress,
    loading,
    saving,
    addXP,
    addXPWithBreakdown,
    answerQuestion,
    resetStats,
    resetJornada,
    getAccuracy,
    getProgressPercentage,
    getAdvancedStats,
    getStudyGoals,
  };
}
