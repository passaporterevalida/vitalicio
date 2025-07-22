
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface XPPillAnimationProps {
  isVisible: boolean;
  xpAmount: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onAnimationComplete: () => void;
}

export function XPPillAnimation({ 
  isVisible, 
  xpAmount, 
  startPosition, 
  endPosition, 
  onAnimationComplete 
}: XPPillAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'flying' | 'arrived'>('idle');

  useEffect(() => {
    if (isVisible && animationPhase === 'idle') {
      setAnimationPhase('flying');
      
      // Animation duration: 1.5s
      setTimeout(() => {
        setAnimationPhase('arrived');
        onAnimationComplete();
      }, 1500);
    }
  }, [isVisible, animationPhase, onAnimationComplete]);

  useEffect(() => {
    if (!isVisible) {
      setAnimationPhase('idle');
    }
  }, [isVisible]);

  if (!isVisible || animationPhase === 'idle') return null;

  const deltaX = endPosition.x - startPosition.x;
  const deltaY = endPosition.y - startPosition.y;

  return (
    <div
      className={`fixed z-[60] pointer-events-none transition-all duration-1500 ease-out ${
        animationPhase === 'flying' ? 'animate-xp-flight' : 'opacity-0'
      }`}
      style={{
        left: startPosition.x,
        top: startPosition.y,
        '--delta-x': `${deltaX}px`,
        '--delta-y': `${deltaY}px`,
      } as React.CSSProperties & { '--delta-x': string; '--delta-y': string }}
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
        <Zap className="w-4 h-4" />
        <span className="font-bold text-sm">+{xpAmount} XP</span>
      </div>
    </div>
  );
}
