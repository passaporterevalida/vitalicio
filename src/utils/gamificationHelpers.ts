
// Funções utilitárias relacionadas à lógica de gamificação (ex: cálculo de pontos, níveis, badges).
// Siga o padrão de nomenclatura: camelCase para funções utilitárias.
import { Achievement, UserProgress, Quest } from '@/types/gamification';
import { ACHIEVEMENTS } from '@/data/achievements';

export const initializeUserProgress = (saved?: string): UserProgress => {
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const achievements = parsed.achievements || [...ACHIEVEMENTS];
      achievements.forEach((achievement: Achievement) => {
        if (achievement.unlockedAt && typeof achievement.unlockedAt === 'string') {
          achievement.unlockedAt = new Date(achievement.unlockedAt);
        }
      });
      
      return {
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        totalQuestions: 0,
        correctAnswers: 0,
        streakDias: 0,
        newlyUnlockedAchievements: [],
        quests: [],
        medicalCards: [],
        areaStats: {},
        ...parsed,
        achievements,
        lastActivityDate: parsed.lastActivityDate ? new Date(parsed.lastActivityDate) : undefined
      };
    } catch (error) {
      console.error('Error parsing saved progress:', error);
    }
  }
  
  return {
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
    areaStats: {}
  };
};

export const calculateLevelUp = (currentXP: number, currentLevel: number, points: number) => {
  let newXP = currentXP + points;
  let newLevel = currentLevel;
  let newXPToNext = newLevel * 100;

  while (newXP >= newXPToNext) {
    newXP -= newXPToNext;
    newLevel++;
    newXPToNext = newLevel * 100;
  }

  return { newXP, newLevel, newXPToNext };
};

export const calculateStreakXP = (streakDays: number): number => {
  if (streakDays >= 30) return 100;
  if (streakDays >= 7) return 50;
  if (streakDays >= 3) return 20;
  return 10;
};

// Sistema de XP mais sofisticado
export interface XPBreakdown {
  baseXP: number;
  streakBonus: number;
  comboBonus: number;
  difficultyBonus: number;
  achievementBonus: number;
  totalXP: number;
}

export const calculateQuestionXP = (
  correct: boolean, 
  streakDays: number, 
  combo: number = 0,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  hasAchievement: boolean = false
): XPBreakdown => {
  if (!correct) {
    return {
      baseXP: 0,
      streakBonus: 0,
      comboBonus: 0,
      difficultyBonus: 0,
      achievementBonus: 0,
      totalXP: 0
    };
  }

  // XP base por dificuldade
  const baseXPByDifficulty = {
    easy: 5,
    medium: 10,
    hard: 15
  };

  const baseXP = baseXPByDifficulty[difficulty];

  // Bônus por streak
  const streakBonus = calculateStreakXP(streakDays);

  // Bônus por combo (sequência de acertos)
  const comboBonus = Math.min(combo * 2, 20); // Máximo 20 XP por combo

  // Bônus por dificuldade
  const difficultyBonus = difficulty === 'hard' ? 10 : 0;

  // Bônus por conquista recente
  const achievementBonus = hasAchievement ? 25 : 0;

  const totalXP = baseXP + streakBonus + comboBonus + difficultyBonus + achievementBonus;

  return {
    baseXP,
    streakBonus,
    comboBonus,
    difficultyBonus,
    achievementBonus,
    totalXP
  };
};

// Centraliza a lógica de XP por questão (mantém compatibilidade)
export function getXPForQuestion(correct: boolean): number {
  return correct ? 10 : 0;
}

// Remover simuladosCompletos e lógica de XP por simulado.

// Sistema de XP semanal
export const calculateWeeklyXP = (totalXP: number, weeklyXP: number): number => {
  // Calcula XP ganho nesta semana (simplificado - idealmente seria baseado em data)
  const thisWeekXP = Math.floor(totalXP * 0.1); // 10% do total como aproximação
  return Math.max(thisWeekXP, weeklyXP);
};

// Estatísticas avançadas
export interface AdvancedStats {
  averageAccuracy: number;
  bestArea: { name: string; accuracy: number; total: number } | null;
  worstArea: { name: string; accuracy: number; total: number } | null;
  totalStudyTime: number; // em minutos
  questionsPerDay: number;
  improvementRate: number; // % de melhoria nos últimos 7 dias
  consistencyScore: number; // 0-100 baseado na regularidade
}

export const calculateAdvancedStats = (userProgress: UserProgress): AdvancedStats => {
  const areaStats = userProgress.areaStats || {};
  const areas = Object.entries(areaStats).filter(([_, stats]) => stats.total >= 3);
  
  // Média de acertos geral
  const averageAccuracy = userProgress.totalQuestions > 0 
    ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100)
    : 0;

  // Melhor e pior área
  const bestArea = areas.length > 0 
    ? areas.reduce((a, b) => (a[1].correct / a[1].total > b[1].correct / b[1].total ? a : b))
    : null;
  
  const worstArea = areas.length > 0 
    ? areas.reduce((a, b) => (a[1].correct / a[1].total < b[1].correct / b[1].total ? a : b))
    : null;

  // Questões por dia (aproximação)
  const questionsPerDay = userProgress.totalQuestions >= 7 
    ? Math.round(userProgress.totalQuestions / 7)
    : userProgress.totalQuestions;

  // Score de consistência baseado no streak
  const consistencyScore = Math.min(userProgress.streakDias * 3.33, 100);

  // Taxa de melhoria (simplificado)
  const improvementRate = userProgress.streakDias >= 7 ? 15 : 5;

  return {
    averageAccuracy,
    bestArea: bestArea ? {
      name: bestArea[0],
      accuracy: Math.round((bestArea[1].correct / bestArea[1].total) * 100),
      total: bestArea[1].total
    } : null,
    worstArea: worstArea ? {
      name: worstArea[0],
      accuracy: Math.round((worstArea[1].correct / worstArea[1].total) * 100),
      total: worstArea[1].total
    } : null,
    totalStudyTime: userProgress.totalQuestions * 2, // 2 min por questão
    questionsPerDay,
    improvementRate,
    consistencyScore
  };
};

// Metas e objetivos
export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  type: 'questions' | 'accuracy' | 'streak' | 'xp' | 'area';
  area?: string;
  reward: { xp: number; badge?: string };
  completed: boolean;
  deadline?: Date;
}

export const generateStudyGoals = (userProgress: UserProgress): StudyGoal[] => {
  const goals: StudyGoal[] = [];
  const stats = calculateAdvancedStats(userProgress);

  // Meta de questões diárias
  if (userProgress.totalQuestions < 50) {
    goals.push({
      id: 'daily_questions_50',
      title: 'Estudante Dedicado',
      description: 'Responda 50 questões no total',
      target: 50,
      current: userProgress.totalQuestions,
      type: 'questions',
      reward: { xp: 100, badge: 'Estudante Dedicado' },
      completed: userProgress.totalQuestions >= 50
    });
  }

  // Meta de precisão
  if (stats.averageAccuracy < 80) {
    goals.push({
      id: 'accuracy_80',
      title: 'Precisão Alta',
      description: 'Alcance 80% de acertos',
      target: 80,
      current: stats.averageAccuracy,
      type: 'accuracy',
      reward: { xp: 150, badge: 'Precisão Alta' },
      completed: stats.averageAccuracy >= 80
    });
  }

  // Meta de streak
  if (userProgress.streakDias < 7) {
    goals.push({
      id: 'streak_7',
      title: 'Consistência Semanal',
      description: 'Mantenha 7 dias seguidos de estudo',
      target: 7,
      current: userProgress.streakDias,
      type: 'streak',
      reward: { xp: 200, badge: 'Consistente' },
      completed: userProgress.streakDias >= 7
    });
  }

  // Metas por área
  Object.entries(userProgress.areaStats).forEach(([area, stats]) => {
    if (stats.total >= 5 && (stats.correct / stats.total) < 0.7) {
      goals.push({
        id: `area_${area}_70`,
        title: `Melhorar em ${area}`,
        description: `Alcance 70% de acertos em ${area}`,
        target: 70,
        current: Math.round((stats.correct / stats.total) * 100),
        type: 'area',
        area,
        reward: { xp: 75, badge: `Especialista ${area}` },
        completed: (stats.correct / stats.total) >= 0.7
      });
    }
  });

  return goals.slice(0, 5); // Máximo 5 metas
};

export const generateQuestSuggestions = (areaStats: Record<string, { correct: number; total: number }>): Quest[] => {
  const suggestions: Quest[] = [];
  
  Object.entries(areaStats).forEach(([area, stats]) => {
    if (stats.total >= 5) {
      const accuracy = (stats.correct / stats.total) * 100;
      if (accuracy < 70) {
        suggestions.push({
          id: `improve_${area}`,
          title: `Missão de Recuperação: ${area}`,
          description: `Melhore seu desempenho em ${area} - responda 10 questões com 75% de acerto`,
          area,
          target: 10,
          progress: 0,
          reward: { xp: 100, badge: `Especialista ${area}` },
          completed: false,
          type: 'area'
        });
      }
    }
  });
  
  return suggestions.slice(0, 3);
};

export const checkAreaAchievements = (
  achievements: Achievement[], 
  areaStats: Record<string, { correct: number; total: number }>,
  newlyUnlocked: string[]
): { achievements: Achievement[]; newlyUnlocked: string[] } => {
  const newAchievements = [...achievements];
  const updatedNewlyUnlocked = [...newlyUnlocked];
  let hasChanges = false;
  
  Object.entries(areaStats).forEach(([area, stats]) => {
    if (stats.total >= 10) {
      const accuracy = (stats.correct / stats.total) * 100;
      
      const areaAchievements = ACHIEVEMENTS.filter(a => a.area === area);
      areaAchievements.forEach(achievement => {
        const existing = newAchievements.find(a => a.id === achievement.id);
        if (existing && !existing.unlocked) {
          let shouldUnlock = false;
          
          if (achievement.id === 'clinica_master' && accuracy >= 90) shouldUnlock = true;
          if (achievement.id === 'pediatria_expert' && accuracy >= 85) shouldUnlock = true;
          if (achievement.id === 'gineco_master' && accuracy >= 85) shouldUnlock = true;
          
          if (shouldUnlock) {
            existing.unlocked = true;
            existing.unlockedAt = new Date();
            hasChanges = true;
            
            if (!updatedNewlyUnlocked.includes(achievement.id)) {
              updatedNewlyUnlocked.push(achievement.id);
            }
          }
        }
      });
    }
  });
  
  return { achievements: newAchievements, newlyUnlocked: updatedNewlyUnlocked };
};
