
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

  // Load user progress from Supabase
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    try {
      console.log('Carregando progresso do usuário:', user?.id);

      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (profile) {
        console.log('Perfil encontrado:', profile);

        // Parse achievements
        const allAchievements = [...ACHIEVEMENTS];
        if (profile.achievements) {
          const savedAchievements = profile.achievements as any[];
          savedAchievements.forEach(saved => {
            const existing = allAchievements.find(a => a.id === saved.id);
            if (existing) {
              existing.unlocked = saved.unlocked;
              existing.unlockedAt = saved.unlockedAt ? new Date(saved.unlockedAt) : undefined;
            }
          });
        }

        // Parse area stats
        const areaStats = profile.area_stats 
          ? profile.area_stats as Record<string, { correct: number; total: number }>
          : {};

        const progressData = {
          level: profile.level || 1,
          xp: profile.total_xp || 0,
          xpToNextLevel: (profile.level || 1) * 100,
          totalQuestions: profile.total_questions || 0,
          correctAnswers: profile.correct_answers || 0,
          streakDias: profile.streak_dias || 0,
          lastActivityDate: profile.last_activity_date ? new Date(profile.last_activity_date) : undefined,
          achievements: allAchievements,
          newlyUnlockedAchievements: [],
          quests: [],
          medicalCards: [],
          areaStats,
          weeklyXP: profile.weekly_xp || 0,
          monthlyXP: (profile as any).monthly_xp || 0,
          xpHistory: (profile as any).xp_history ? (profile as any).xp_history : [],
          periodStats: [], // TODO: implementar
          studyGoals: [],
          advancedStats: undefined,
          currentCombo: 0,
          maxCombo: 0,
          totalStudyTime: (profile.total_questions || 0) * 2, // 2 min por questão
          lastXPBreakdown: undefined
        };

        // Calcular estatísticas avançadas
        progressData.advancedStats = calculateAdvancedStats(progressData);
        progressData.studyGoals = generateStudyGoals(progressData);

        console.log('Definindo progresso:', progressData);
        setUserProgress(progressData);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      toast({
        title: "Erro ao carregar progresso",
        description: "Não foi possível carregar seus dados. Usando dados locais.",
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
