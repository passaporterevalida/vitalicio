
import { useState, useCallback } from 'react';

interface CoinSystem {
  totalCoins: number;
  sessionCoins: number;
  combo: number;
  streak: number;
  bonusMultiplier: number;
}

export function useVirtualCoins() {
  const [coinSystem, setCoinSystem] = useState<CoinSystem>({
    totalCoins: 0,
    sessionCoins: 0,
    combo: 0,
    streak: 0,
    bonusMultiplier: 1
  });

  const calculateCoins = useCallback((isCorrect: boolean, timeBonus: number = 0) => {
    if (!isCorrect) {
      setCoinSystem(prev => ({
        ...prev,
        combo: 0,
        bonusMultiplier: 1
      }));
      return 0;
    }

    let baseCoins = 10;
    let bonusCoins = 0;
    let newCombo = coinSystem.combo + 1;
    let newStreak = coinSystem.streak + 1;
    let multiplier = coinSystem.bonusMultiplier;

    // Combo bonuses
    if (newCombo >= 10) {
      bonusCoins += 50;
      multiplier = 3;
    } else if (newCombo >= 5) {
      bonusCoins += 25;
      multiplier = 2;
    } else if (newCombo >= 3) {
      bonusCoins += 10;
      multiplier = 1.5;
    }

    // Streak bonuses
    if (newStreak >= 10) {
      bonusCoins += 30;
    } else if (newStreak >= 5) {
      bonusCoins += 15;
    }

    // Time bonus
    bonusCoins += Math.floor(timeBonus / 10);

    const totalEarned = Math.floor((baseCoins + bonusCoins) * multiplier);

    setCoinSystem(prev => ({
      ...prev,
      totalCoins: prev.totalCoins + totalEarned,
      sessionCoins: prev.sessionCoins + totalEarned,
      combo: newCombo,
      streak: newStreak,
      bonusMultiplier: multiplier
    }));

    return totalEarned;
  }, [coinSystem.combo, coinSystem.streak, coinSystem.bonusMultiplier]);

  const resetSession = useCallback(() => {
    setCoinSystem(prev => ({
      ...prev,
      sessionCoins: 0,
      combo: 0,
      streak: 0,
      bonusMultiplier: 1
    }));
  }, []);

  const getDiscountAmount = useCallback(() => {
    const coins = coinSystem.totalCoins;
    if (coins >= 1000) return 20; // R$ 20 de desconto
    if (coins >= 500) return 15;  // R$ 15 de desconto
    if (coins >= 250) return 10;  // R$ 10 de desconto
    if (coins >= 100) return 5;   // R$ 5 de desconto
    return 0;
  }, [coinSystem.totalCoins]);

  return {
    coinSystem,
    calculateCoins,
    resetSession,
    getDiscountAmount
  };
}
