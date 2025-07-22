
export interface Mission {
  id: string;
  title: string;
  description: string;
  objective: string;
  area: string;
  targetQuestions: number;
  targetAccuracy: number; // Porcentagem (ex: 70 para 70%)
  progress: number;
  completed: boolean;
  reward: {
    xp: number;
    badge?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // em minutos
}

export interface MissionProgress {
  missionId: string;
  questionsAnswered: number;
  correctAnswers: number;
  completed: boolean;
  completedAt?: Date;
}

// Tipos para missão personalizada
export interface CustomMissionFilters {
  questionCount: number;
  totalTime: number; // em minutos
  timePerQuestion: number; // em minutos
  medicalAreas: string[]; // 5 grandes áreas do Revalida
  specialties: string[]; // especialidades específicas
}

export interface CustomMission extends Mission {
  filters: CustomMissionFilters;
  isCustom: true;
}

// Áreas médicas principais do Revalida
export const MEDICAL_AREAS = [
  'Clínica Médica',
  'Pediatria', 
  'Ginecologia e Obstetrícia',
  'Cirurgia',
  'Medicina Preventiva e Social'
] as const;

// Especialidades disponíveis
export const MEDICAL_SPECIALTIES = [
  'Cardiologia',
  'Endocrinologia',
  'Gastroenterologia',
  'Nefrologia',
  'Pneumologia',
  'Reumatologia',
  'Infectologia',
  'Neurologia',
  'Dermatologia',
  'Oftalmologia',
  'Otorrinolaringologia',
  'Urologia',
  'Ortopedia',
  'Neurocirurgia',
  'Cirurgia Cardiovascular',
  'Cirurgia Geral',
  'Cirurgia Pediátrica',
  'Cirurgia Plástica',
  'Oncologia',
  'Hematologia',
  'Psiquiatria',
  'Radiologia',
  'Anestesiologia',
  'Emergência',
  'UTI',
  'Saúde Coletiva',
  'Bioética',
  'Epidemiologia',
  'Saúde Pública'
] as const;
