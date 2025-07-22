
import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useXPPillAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState<Position>({ x: 0, y: 0 });

  const triggerXPAnimation = useCallback((
    amount: number,
    sourceElement: HTMLElement,
    targetElement?: HTMLElement
  ) => {
    // Get source position
    const sourceRect = sourceElement.getBoundingClientRect();
    const sourcePos = {
      x: sourceRect.left + sourceRect.width / 2,
      y: sourceRect.top + sourceRect.height / 2
    };

    // Get target position (drawer center or screen center)
    let targetPos: Position;
    if (targetElement) {
      const targetRect = targetElement.getBoundingClientRect();
      targetPos = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
      };
    } else {
      // Default to top center (where drawer would be)
      targetPos = {
        x: window.innerWidth / 2,
        y: 80 // Aproximadamente onde a gaveta fica
      };
    }

    setXpAmount(amount);
    setStartPosition(sourcePos);
    setEndPosition(targetPos);
    setIsAnimating(true);
  }, []);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setXpAmount(0);
  }, []);

  return {
    isAnimating,
    xpAmount,
    startPosition,
    endPosition,
    triggerXPAnimation,
    resetAnimation
  };
}
