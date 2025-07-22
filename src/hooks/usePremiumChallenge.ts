
import { useState, useCallback } from 'react';
import { useChallengeAttempts } from './useChallengeAttempts';
import { useChallengeQuestions } from './useChallengeQuestions';
import { useChallengeState } from './useChallengeState';
import { toast } from 'sonner';

export function usePremiumChallenge() {
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const {
    attemptsUsed,
    maxAttempts,
    canStartChallenge,
    attemptsLeft,
    hasWonBefore,
    incrementAttempts,
    resetAttempts
  } = useChallengeAttempts();

  const { selectTenQuestions, questionsReady } = useChallengeQuestions();
  
  const {
    challengeState,
    resetChallenge,
    startChallenge: startChallengeState,
    answerCurrentQuestion,
    nextQuestion: nextQuestionState
  } = useChallengeState();

  const winThreshold = 10;

  const startChallenge = useCallback(async (): Promise<boolean> => {
    console.log('=== 🚀 INICIANDO DESAFIO SUPREMO (BULLETPROOF) ===');
    
    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      toast.error("Você já utilizou todas as 3 tentativas disponíveis!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return false;
    }

    setIsStarting(true);
    setStartError(null);

    try {
      console.log('⏳ Aguardando questões...');
      
      // Aguardar questões estarem disponíveis (com timeout)
      let attempts = 0;
      const maxWaitAttempts = 10;
      
      while (!questionsReady && attempts < maxWaitAttempts) {
        console.log(`⏱️ Tentativa ${attempts + 1}/${maxWaitAttempts} - aguardando questões...`);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!questionsReady) {
        throw new Error('Timeout: Questões não carregaram a tempo');
      }

      // Selecionar questões
      const selectedQuestions = selectTenQuestions();
      
      // Configurar estado do desafio
      startChallengeState(selectedQuestions);

      return true;

    } catch (error) {
      console.error('❌ ERRO AO INICIAR DESAFIO:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      setStartError(errorMessage);
      
      toast.error(`Erro ao iniciar desafio: ${errorMessage}`, {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      
      return false;
      
    } finally {
      setIsStarting(false);
    }
  }, [selectTenQuestions, attemptsUsed, maxAttempts, questionsReady, startChallengeState]);

  const nextQuestion = useCallback(() => {
    nextQuestionState((hasWon: boolean) => {
      incrementAttempts();
    });
  }, [nextQuestionState, incrementAttempts]);

  const retryStart = useCallback(() => {
    console.log('🔄 Tentando novamente...');
    setStartError(null);
    return startChallenge();
  }, [startChallenge]);

  return {
    challengeState,
    canStartChallenge,
    attemptsUsed,
    attemptsLeft,
    maxAttempts,
    hasWonBefore,
    winThreshold,
    isStarting,
    startError,
    startChallenge,
    answerCurrentQuestion,
    nextQuestion,
    resetChallenge,
    resetAttempts,
    retryStart
  };
}
