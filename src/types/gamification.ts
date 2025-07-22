
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'general' | 'area' | 'streak' | 'accuracy' | 'level';
  area?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  area?: string;
  target: number;
  progress: number;
  reward: {
    xp: number;
    badge?: string;
  };
  completed: boolean;
  type: 'area' | 'general' | 'streak' | 'accuracy';
}

export interface MedicalCard {
  id: string;
  title: string;
  description: string;
  image: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

// Histórico de XP para análise temporal
export interface XPHistory {
  date: string;
  xpGained: number;
  source: 'question' | 'achievement' | 'streak' | 'mission';
  details?: string;
}

// Estatísticas detalhadas por período
export interface PeriodStats {
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  xpGained: number;
  timeSpent: number; // em minutos
  streakDays: number;
}

// Metas de estudo
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

// Breakdown detalhado de XP
export interface XPBreakdown {
  baseXP: number;
  streakBonus: number;
  comboBonus: number;
  difficultyBonus: number;
  achievementBonus: number;
  totalXP: number;
}

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

export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalQuestions: number;
  correctAnswers: number;
  streakDias: number;
  lastActivityDate?: Date;
  achievements: Achievement[];
  quests: Quest[];
  medicalCards: MedicalCard[];
  newlyUnlockedAchievements: string[];
  areaStats: Record<string, { correct: number; total: number }>;
  
  // Novos campos para sistema avançado
  weeklyXP?: number;
  monthlyXP?: number;
  xpHistory?: XPHistory[];
  periodStats?: PeriodStats[];
  studyGoals?: StudyGoal[];
  advancedStats?: AdvancedStats;
  currentCombo?: number;
  maxCombo?: number;
  totalStudyTime?: number; // em minutos
  lastXPBreakdown?: XPBreakdown;
}
