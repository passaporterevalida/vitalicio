
import { useXPPillAnimation } from './useXPPillAnimation';
import { useGamification } from './useGamification';

export function useXPPillIntegration() {
  const {
    isAnimating,
    xpAmount,
    startPosition,
    endPosition,
    triggerXPAnimation,
    resetAnimation
  } = useXPPillAnimation();

  const { getStreakBonus } = useGamification();

  const handleCorrectAnswer = (sourceElement?: HTMLElement, baseXP: number = 10) => {
    // Only trigger on mobile devices
    if (sourceElement && window.innerWidth < 768) {
      const streakBonus = getStreakBonus();
      const totalXP = baseXP + streakBonus;
      triggerXPAnimation(totalXP, sourceElement);
    }
  };

  return {
    isAnimating,
    xpAmount,
    startPosition,
    endPosition,
    resetAnimation,
    handleCorrectAnswer
  };
}
