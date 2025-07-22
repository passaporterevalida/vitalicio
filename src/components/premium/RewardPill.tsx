
import { useState, useEffect } from 'react';
import { Coins, Sparkles, TrendingUp, Trophy, Zap, Flame } from 'lucide-react';

interface RewardPillProps {
  coins: number;
  combo: number;
  streak: number;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export function RewardPill({ coins, combo, streak, isVisible, onAnimationComplete }: RewardPillProps) {
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    if (isVisible && coins > 0) {
      setShowPill(true);
      
      // Auto hide after animation
      const timer = setTimeout(() => {
        setShowPill(false);
        onAnimationComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, coins, onAnimationComplete]);

  if (!showPill) return null;

  const getPillStyle = () => {
    if (combo >= 5) return 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-pulse';
    if (combo >= 3) return 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500';
    return 'bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500';
  };

  const getIcon = () => {
    if (combo >= 5) return <Flame className="w-5 h-5 animate-bounce" />;
    if (combo >= 3) return <Zap className="w-5 h-5 animate-pulse" />;
    return <Coins className="w-5 h-5" />;
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] animate-bounce">
      <div className={`${getPillStyle()} text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/30 backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          {getIcon()}
          <div className="text-center">
            <div className="text-2xl font-bold">+{coins} Moedas</div>
            <div className="text-sm opacity-90">
              {combo >= 5 && <span className="flex items-center gap-1"><Flame className="w-4 h-4" /> COMBO ÉPICO!</span>}
              {combo >= 3 && combo < 5 && <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> COMBO {combo}x!</span>}
              {streak >= 5 && <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> STREAK {streak}!</span>}
            </div>
          </div>
          <Sparkles className="w-5 h-5 animate-spin" />
        </div>
        
        {/* Discount hint */}
        <div className="mt-2 text-center text-xs bg-black/20 rounded-lg px-3 py-1">
          <TrendingUp className="w-3 h-3 inline mr-1" />
          Acumulando para desconto Premium!
        </div>
      </div>
    </div>
  );
}
