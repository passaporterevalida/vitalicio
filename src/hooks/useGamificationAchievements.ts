
import { UserProgress } from '@/types/gamification';
import { checkAreaAchievements } from '@/utils/gamificationHelpers';

export function useGamificationAchievements(
  userProgress: UserProgress,
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>
) {
  const unlockAchievement = (achievementId: string) => {
    setUserProgress(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) {
        return prev;
      }

      const updatedAchievements = prev.achievements.map(a => 
        a.id === achievementId 
          ? { ...a, unlocked: true, unlockedAt: new Date() }
          : a
      );

      console.log('Achievement unlocked:', achievementId);

      return {
        ...prev,
        achievements: updatedAchievements,
        newlyUnlockedAchievements: [...prev.newlyUnlockedAchievements, achievementId]
      };
    });
  };

  const checkAchievements = (correct: boolean, area?: string) => {
    // Check for achievements with proper unlocked status verification
    setTimeout(() => {
      setUserProgress(prev => {
        // Check first question achievement - only if not already unlocked
        const firstQuestionAchievement = prev.achievements.find(a => a.id === 'first_question');
        if (prev.totalQuestions === 1 && (!firstQuestionAchievement || !firstQuestionAchievement.unlocked)) {
          unlockAchievement('first_question');
        }
        
        // Check first correct achievement - only if not already unlocked
        const firstCorrectAchievement = prev.achievements.find(a => a.id === 'first_correct');
        if (correct && prev.correctAnswers === 1 && (!firstCorrectAchievement || !firstCorrectAchievement.unlocked)) {
          unlockAchievement('first_correct');
        }
        
        // Check 100 questions achievement - only if not already unlocked
        const questions100Achievement = prev.achievements.find(a => a.id === 'questions_100');
        if (prev.totalQuestions >= 100 && (!questions100Achievement || !questions100Achievement.unlocked)) {
          unlockAchievement('questions_100');
        }
        
        // Check streak achievements - only if not already unlocked
        const streak3Achievement = prev.achievements.find(a => a.id === 'streak_3');
        if (prev.streakDias === 3 && (!streak3Achievement || !streak3Achievement.unlocked)) {
          unlockAchievement('streak_3');
        }
        
        const streak7Achievement = prev.achievements.find(a => a.id === 'streak_7');
        if (prev.streakDias === 7 && (!streak7Achievement || !streak7Achievement.unlocked)) {
          unlockAchievement('streak_7');
        }
        
        const streak30Achievement = prev.achievements.find(a => a.id === 'streak_30');
        if (prev.streakDias === 30 && (!streak30Achievement || !streak30Achievement.unlocked)) {
          unlockAchievement('streak_30');
        }
        
        const { achievements, newlyUnlocked } = checkAreaAchievements(
          prev.achievements, 
          prev.areaStats, 
          prev.newlyUnlockedAchievements
        );
        
        return { ...prev, achievements, newlyUnlockedAchievements: newlyUnlocked };
      });
    }, 100);
  };

  const getNewlyUnlockedAchievement = () => {
    if (userProgress.newlyUnlockedAchievements.length === 0) return null;
    
    const achievementId = userProgress.newlyUnlockedAchievements[0];
    const achievement = userProgress.achievements.find(a => a.id === achievementId);
    
    return achievement || null;
  };

  const clearNewlyUnlockedAchievement = () => {
    setUserProgress(prev => ({
      ...prev,
      newlyUnlockedAchievements: prev.newlyUnlockedAchievements.slice(1)
    }));
  };

  return {
    unlockAchievement,
    checkAchievements,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  };
}
