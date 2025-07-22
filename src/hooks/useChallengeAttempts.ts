
import { useState, useCallback } from 'react';

export function useChallengeAttempts() {
  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('premium_challenge_won') === 'true';

  const incrementAttempts = useCallback(() => {
    const newAttemptsUsed = attemptsUsed + 1;
    setAttemptsUsed(newAttemptsUsed);
    localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
    return newAttemptsUsed;
  }, [attemptsUsed]);

  const resetAttempts = useCallback(() => {
    console.log('🔄 RESETANDO tentativas (modo debug)');
    localStorage.removeItem('premium_challenge_attempts');
    localStorage.removeItem('premium_challenge_won');
    setAttemptsUsed(0);
  }, []);

  return {
    attemptsUsed,
    maxAttempts,
    canStartChallenge,
    attemptsLeft,
    hasWonBefore,
    incrementAttempts,
    resetAttempts
  };
}
