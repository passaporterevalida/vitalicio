
import { useState, useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { Achievement } from '@/hooks/useGamification';
import { ConfettiAnimation } from './ConfettiAnimation';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      setShowConfetti(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose();
          setShowConfetti(false);
        }, 500);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <>
      <ConfettiAnimation trigger={showConfetti} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl max-w-sm mx-4 text-center transform transition-all duration-500 border-2 border-white/20 ${
          visible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
        }`}>
          <div className="mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Trophy className="w-10 h-10 text-yellow-200" />
            </div>
            
            <div className="text-5xl mb-3">
              {achievement.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-2">
              Conquista Desbloqueada! 🎉
            </h3>
            
            <h4 className="text-xl font-semibold mb-3 text-yellow-100">
              {achievement.title}
            </h4>
            
            <p className="text-sm opacity-90 leading-relaxed">
              {achievement.description}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-yellow-200" />
            <span className="font-semibold">Nova conquista desbloqueada!</span>
          </div>
        </div>
      </div>
    </>
  );
}
