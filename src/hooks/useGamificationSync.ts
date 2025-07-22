
import { useEffect } from 'react';
import { useGamification } from './useGamification';
import { useRanking } from './useRanking';

export function useGamificationSync() {
  const { userProgress } = useGamification();
  const { updateUserProfile } = useRanking();

  useEffect(() => {
    const syncUserProgress = async () => {
      try {
        // Calculate weekly XP (simplified - you might want to track this differently)
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const weeklyXP = Math.floor(userProgress.xp * 0.1); // Simplified calculation

        await updateUserProfile({
          display_name: 'Aventureiro', // You can get this from user context
          level: userProgress.level,
          total_xp: userProgress.xp,
          weekly_xp: weeklyXP
        });
      } catch (error) {
        console.error('Error syncing user progress:', error);
      }
    };

    // Sync every time userProgress changes
    if (userProgress.xp > 0) {
      syncUserProgress();
    }
  }, [userProgress.level, userProgress.xp, updateUserProfile]);

  return null;
}
