
import { Mission } from '@/types/missions';

export const MISSIONS: Mission[] = [
  {
    id: 'gineco_basica',
    title: '🌸 Missão Gineco Básica',
    description: 'Domine os fundamentos da ginecologia',
    objective: 'Responder 10 questões de Ginecologia e Obstetrícia',
    area: 'Ginecologia e Obstetrícia',
    targetQuestions: 10,
    targetAccuracy: 70,
    progress: 0,
    completed: false,
    reward: {
      xp: 150,
      badge: 'Especialista Gineco'
    },
    difficulty: 'easy'
  },
  {
    id: 'pediatria_avancada',
    title: '👶 Missão Pediatria Avançada',
    description: 'Teste seus conhecimentos avançados em pediatria',
    objective: 'Responder 15 questões de Pediatria',
    area: 'Pediatria',
    targetQuestions: 15,
    targetAccuracy: 80,
    progress: 0,
    completed: false,
    reward: {
      xp: 250,
      badge: 'Mestre Pediatra'
    },
    difficulty: 'hard',
    timeLimit: 30
  },
  {
    id: 'clinica_medica_expert',
    title: '🏥 Missão Clínica Expert',
    description: 'Desafio completo de clínica médica',
    objective: 'Responder 20 questões de Clínica Médica',
    area: 'Clínica Médica',
    targetQuestions: 20,
    targetAccuracy: 75,
    progress: 0,
    completed: false,
    reward: {
      xp: 300,
      badge: 'Clínico Expert'
    },
    difficulty: 'medium',
    timeLimit: 45
  },
  {
    id: 'cirurgia_rapida',
    title: '⚔️ Missão Cirurgia Rápida',
    description: 'Responda rapidamente questões de cirurgia',
    objective: 'Responder 8 questões de Cirurgia',
    area: 'Cirurgia',
    targetQuestions: 8,
    targetAccuracy: 65,
    progress: 0,
    completed: false,
    reward: {
      xp: 120,
      badge: 'Cirurgião Ágil'
    },
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 'medicina_preventiva',
    title: '🛡️ Missão Prevenção Total',
    description: 'Foque na medicina preventiva e saúde pública',
    objective: 'Responder 12 questões de Medicina Preventiva',
    area: 'Medicina Preventiva',
    targetQuestions: 12,
    targetAccuracy: 70,
    progress: 0,
    completed: false,
    reward: {
      xp: 180,
      badge: 'Guardião da Saúde'
    },
    difficulty: 'medium'
  },
  {
    id: 'desafio_misto',
    title: '🌟 Desafio do Mestre',
    description: 'O desafio final - questões de todas as áreas',
    objective: 'Responder 25 questões mistas de todas as áreas',
    area: 'Mista',
    targetQuestions: 25,
    targetAccuracy: 85,
    progress: 0,
    completed: false,
    reward: {
      xp: 500,
      badge: 'Mestre do Revalida'
    },
    difficulty: 'hard',
    timeLimit: 60
  }
];
