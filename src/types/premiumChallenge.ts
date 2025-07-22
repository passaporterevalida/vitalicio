
import { type Question } from '@/types/question';

export interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  questions: Question[];
  hasCompleted: boolean;
  hasWon: boolean;
  streak: number;
  combo: number;
  timeBonus: number;
  coinsEarned: number;
  perfectAnswers: number;
}

export interface ChallengeConfig {
  maxAttempts: number;
  questionsCount: number;
  winThreshold: number;
}
