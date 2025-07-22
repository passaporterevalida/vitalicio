
import { useState, useEffect } from 'react';
import { Coins, Flame, Zap } from 'lucide-react';

interface CoinAnimationPillProps {
  coins: number;
  combo: number;
  streak: number;
  isVisible: boolean;
  position: { x: number; y: number };
  onAnimationComplete: () => void;
}

export function CoinAnimationPill({ 
  coins, 
  combo, 
  streak, 
  isVisible, 
  position, 
  onAnimationComplete 
}: CoinAnimationPillProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'showing' | 'floating' | 'fading'>('idle');

  useEffect(() => {
    if (isVisible && animationPhase === 'idle') {
      setAnimationPhase('showing');
      
      setTimeout(() => setAnimationPhase('floating'), 200);
      setTimeout(() => setAnimationPhase('fading'), 1500);
      setTimeout(() => {
        setAnimationPhase('idle');
        onAnimationComplete();
      }, 2000);
    }
  }, [isVisible, animationPhase, onAnimationComplete]);

  if (!isVisible || animationPhase === 'idle') return null;

  const getComboColor = () => {
    if (combo >= 10) return 'from-purple-500 to-pink-500';
    if (combo >= 5) return 'from-orange-500 to-red-500';
    if (combo >= 3) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getComboIcon = () => {
    if (combo >= 10) return <Zap className="w-4 h-4" />;
    if (combo >= 5) return <Flame className="w-4 h-4" />;
    return <Coins className="w-4 h-4" />;
  };

  return (
    <div
      className={`fixed z-[70] pointer-events-none transition-all duration-500 ${
        animationPhase === 'showing' ? 'opacity-100 scale-100' :
        animationPhase === 'floating' ? 'opacity-100 scale-110 -translate-y-8' :
        'opacity-0 scale-75 -translate-y-16'
      }`}
      style={{
        left: position.x - 50,
        top: position.y - 30,
      }}
    >
      <div className={`flex items-center gap-2 bg-gradient-to-r ${getComboColor()} text-white px-4 py-2 rounded-full shadow-lg border-2 border-white/30`}>
        {getComboIcon()}
        <span className="font-bold text-sm">+{coins}</span>
        {combo >= 3 && (
          <div className="flex items-center gap-1 text-xs">
            <span>•</span>
            <span>{combo}x COMBO!</span>
          </div>
        )}
      </div>
      
      {/* Combo particles */}
      {combo >= 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(combo >= 10 ? 8 : combo >= 5 ? 6 : 4)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r ${getComboColor()} rounded-full animate-ping`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
