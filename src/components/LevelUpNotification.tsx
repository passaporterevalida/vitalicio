
import { useState, useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { ConfettiAnimation } from './ConfettiAnimation';

interface LevelUpNotificationProps {
  show: boolean;
  newLevel: number;
  onClose: () => void;
}

export function LevelUpNotification({ show, newLevel, onClose }: LevelUpNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setShowConfetti(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose();
          setShowConfetti(false);
        }, 500);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <ConfettiAnimation trigger={showConfetti} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center transform transition-all duration-500 ${
          visible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
        }`}>
          <div className="mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Trophy className="w-10 h-10 text-yellow-200" />
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Star className="w-8 h-8 text-yellow-300" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 animate-pulse">
              LEVEL UP! 🎉
            </h2>
            
            <div className="text-6xl font-black mb-4 text-yellow-200 animate-bounce">
              {newLevel}
            </div>
            
            <p className="text-lg opacity-90">
              Parabéns! Você alcançou o nível {newLevel}!
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-white/20 rounded-lg p-3">
            <Zap className="w-5 h-5 text-yellow-200" />
            <span className="font-semibold">Bônus de XP desbloqueado!</span>
          </div>
        </div>
      </div>
    </>
  );
}
