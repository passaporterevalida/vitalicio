
import { useState, useEffect } from 'react';
import { UserProgress } from '@/types/gamification';
import { initializeUserProgress } from '@/utils/gamificationHelpers';

export function useGamificationState() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('revalida-progress');
    return initializeUserProgress(saved);
  });

  useEffect(() => {
    localStorage.setItem('revalida-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  return { userProgress, setUserProgress };
}
