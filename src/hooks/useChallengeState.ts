
import { useState, useCallback } from 'react';
import { useGamification } from './useGamification';
import { type ChallengeState } from '@/types/premiumChallenge';
import { toast } from 'sonner';

const initialState: ChallengeState = {
  isActive: false,
  currentQuestionIndex: 0,
  score: 0,
  answers: {},
  questions: [],
  hasCompleted: false,
  hasWon: false,
  streak: 0,
  combo: 0,
  timeBonus: 0,
  coinsEarned: 0,
  perfectAnswers: 0
};

export function useChallengeState() {
  const { addXP, answerQuestion: recordAnswer } = useGamification();
  const [challengeState, setChallengeState] = useState<ChallengeState>(initialState);

  const resetChallenge = useCallback(() => {
    console.log('🔄 Resetando desafio...');
    setChallengeState(initialState);
  }, []);

  const startChallenge = useCallback((questions: any[]) => {
    console.log('✅ DESAFIO CONFIGURADO COM SUCESSO!');
    setChallengeState({
      ...initialState,
      isActive: true,
      questions: questions
    });
  }, []);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    console.log('=== 📝 RESPONDENDO QUESTÃO ===');
    
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) {
        console.error('❌ Questão atual não encontrada');
        return prev;
      }

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;
      const newPerfectAnswers = isCorrect ? prev.perfectAnswers + 1 : prev.perfectAnswers;

      console.log('📊 Resposta:', { 
        questao: currentQuestion.id,
        resposta: optionId,
        correta: currentQuestion.correct,
        isCorrect, 
        newScore 
      });

      // Sistema de moedas
      let coinsEarned = 0;
      if (isCorrect) {
        coinsEarned = 10;
        if (newCombo >= 3) coinsEarned += 5;
        if (newStreak >= 5) coinsEarned += 10;
      }

      // Registrar no sistema de gamificação
      recordAnswer(isCorrect, currentQuestion.area || 'Geral', currentQuestion.id);

      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: optionId },
        score: newScore,
        streak: newStreak,
        combo: newCombo,
        perfectAnswers: newPerfectAnswers,
        coinsEarned: prev.coinsEarned + coinsEarned
      };
    });
  }, [recordAnswer]);

  const nextQuestion = useCallback((onComplete: (hasWon: boolean) => void) => {
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      
      if (isLastQuestion) {
        const hasWon = prev.score >= 10; // winThreshold
        
        console.log('🏁 DESAFIO FINALIZADO!', { 
          score: prev.score, 
          total: prev.questions.length,
          hasWon 
        });
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          const bonusXP = 1000 + (prev.perfectAnswers * 100) + prev.coinsEarned;
          addXP(bonusXP);
          
          toast.success("🏆 PARABÉNS! DESAFIO CONQUISTADO! Desconto Premium desbloqueado!", {
            duration: 6000,
            className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
          });
        } else {
          const consolationXP = prev.score * 50 + prev.coinsEarned;
          addXP(consolationXP);
          
          toast.info(`💪 Quase lá! Você acertou ${prev.score}/${prev.questions.length}. Tente novamente!`, {
            duration: 4000,
            className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
          });
        }

        onComplete(hasWon);

        return {
          ...prev,
          isActive: false,
          hasCompleted: true,
          hasWon
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [addXP]);

  return {
    challengeState,
    resetChallenge,
    startChallenge,
    answerCurrentQuestion,
    nextQuestion
  };
}
