
import { Achievement } from '@/types/gamification';

export const ACHIEVEMENTS: Achievement[] = [
  // Conquistas Gerais
  {
    id: 'first_question',
    title: 'Primeira Questão',
    description: 'Respondeu sua primeira questão',
    icon: '🎯',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'first_correct',
    title: 'Primeiro Acerto',
    description: 'Acertou sua primeira questão',
    icon: '✅',
    unlocked: false,
    category: 'general'
  },
  
  // Conquistas de Streak
  {
    id: 'streak_3',
    title: 'Consistência Bronze',
    description: 'Estudou por 3 dias consecutivos',
    icon: '🥉',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'streak_7',
    title: 'Semana Consistente',
    description: 'Estudou por 7 dias consecutivos',
    icon: '🔥',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'streak_30',
    title: 'Mestre da Consistência',
    description: 'Estudou por 30 dias consecutivos',
    icon: '👑',
    unlocked: false,
    category: 'streak'
  },
  
  // Conquistas por Área
  {
    id: 'clinica_master',
    title: '🧠 Mente Clínica',
    description: '90% de acerto em Clínica Médica',
    icon: '🧠',
    unlocked: false,
    category: 'area',
    area: 'Clínica Médica'
  },
  {
    id: 'pediatria_expert',
    title: '👶 Pediatra Expert',
    description: '85% de acerto em Pediatria',
    icon: '👶',
    unlocked: false,
    category: 'area',
    area: 'Pediatria'
  },
  {
    id: 'gineco_master',
    title: '🌸 Gineco Master',
    description: '85% de acerto em Ginecologia',
    icon: '🌸',
    unlocked: false,
    category: 'area',
    area: 'Ginecologia e Obstetrícia'
  },
  
  // Conquistas de Performance
  {
    id: 'sniper_gabarito',
    title: '🎯 Sniper do Gabarito',
    description: '100% de acerto em um simulado',
    icon: '🎯',
    unlocked: false,
    category: 'performance'
  },
  {
    id: 'desbravador',
    title: '🧭 Desbravador Revalida',
    description: 'Respondeu questões de todos os anos (2011-2025)',
    icon: '🧭',
    unlocked: false,
    category: 'performance'
  },
  {
    id: 'questions_100',
    title: 'Centenário',
    description: 'Respondeu 100 questões',
    icon: '💯',
    unlocked: false,
    category: 'performance'
  }
];
