import { useState, useCallback } from 'react';
import { useAudio } from './useAudio';
import { useGamification } from './useGamification';

interface UseQuestionAnswerProps {
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
}

interface AnswerState {
  selectedAnswer: string;
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  pendingConfirmation: boolean;
  isAdvancing: boolean;
  feedbackAnimation: 'none' | 'correct' | 'incorrect';
}

/**
 * Hook customizado para gerenciar respostas de questões
 * Remove duplicação entre SimuladoModal e JornadaMissionModal
 */
export function useQuestionAnswer({
  onAnswer,
  onNext,
  onFinish,
  isLastQuestion
}: UseQuestionAnswerProps) {
  const { playSound } = useAudio();
  const { addXP } = useGamification();
  
  const [answerState, setAnswerState] = useState<AnswerState>({
    selectedAnswer: '',
    showFeedback: false,
    lastAnswerCorrect: null,
    pendingConfirmation: false,
    isAdvancing: false,
    feedbackAnimation: 'none'
  });

  const handleSelectOption = useCallback((optionId: string) => {
    setAnswerState(prev => ({
      ...prev,
      selectedAnswer: optionId,
      pendingConfirmation: true
    }));
  }, []);

  const handleConfirmAnswer = useCallback(() => {
    if (!answerState.selectedAnswer) return;

    const isCorrect = answerState.selectedAnswer === 'correct'; // Assumindo que a questão tem uma propriedade 'correct'
    
    setAnswerState(prev => ({
      ...prev,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      pendingConfirmation: false,
      feedbackAnimation: isCorrect ? 'correct' : 'incorrect'
    }));

    // Tocar som baseado na resposta
    playSound(isCorrect ? 'correct' : 'incorrect');

    // Chamar callback de resposta
    onAnswer(answerState.selectedAnswer);

    // Adicionar XP se correto
    if (isCorrect) {
      addXP(10); // XP base por resposta correta
    }

    // Auto-avançar após delay
    setTimeout(() => {
      if (!isLastQuestion) {
        handleNextQuestion();
      } else {
        onFinish();
      }
    }, 1200);
  }, [answerState.selectedAnswer, playSound, onAnswer, addXP, isLastQuestion, onFinish]);

  const handleNextQuestion = useCallback(() => {
    setAnswerState(prev => ({
      ...prev,
      isAdvancing: true
    }));

    // Resetar estado para próxima questão
    setTimeout(() => {
      setAnswerState({
        selectedAnswer: '',
        showFeedback: false,
        lastAnswerCorrect: null,
        pendingConfirmation: false,
        isAdvancing: false,
        feedbackAnimation: 'none'
      });
      onNext();
    }, 300);
  }, [onNext]);

  const resetAnswerState = useCallback(() => {
    setAnswerState({
      selectedAnswer: '',
      showFeedback: false,
      lastAnswerCorrect: null,
      pendingConfirmation: false,
      isAdvancing: false,
      feedbackAnimation: 'none'
    });
  }, []);

  return {
    ...answerState,
    handleSelectOption,
    handleConfirmAnswer,
    handleNextQuestion,
    resetAnswerState
  };
} 