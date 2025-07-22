
import { useEffect, useState } from 'react';
import { Achievement } from '@/types/gamification';
import { Trophy, Star, Zap, X } from 'lucide-react';
import { BadgeDisplay } from './BadgeDisplay';

interface BadgeUnlockedNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function BadgeUnlockedNotification({ achievement, onClose }: BadgeUnlockedNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      setIsAnimating(true);
      
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
          setIsAnimating(false);
        }, 300);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md mx-4 overflow-hidden transform transition-all duration-500 border-2 border-yellow-300 ${
        isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
      }`}>
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 text-white text-center relative overflow-hidden">
          {/* Sparkle animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse" />
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Trophy className="w-8 h-8 text-yellow-200" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              🎉 Conquista Desbloqueada!
            </h2>
            
            <p className="text-yellow-100 text-sm">
              Parabéns! Você ganhou uma nova badge
            </p>
          </div>
        </div>

        {/* Badge display */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <BadgeDisplay achievement={achievement} size="lg" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {achievement.title}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {achievement.description}
          </p>
          
          {/* Celebration elements */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-600">
              Badge "{achievement.title}" conquistada!
            </span>
          </div>
        </div>
      </div>
      
      {/* Confetti-like decorative elements */}
      {isAnimating && (
        <>
          <Star className="absolute top-1/4 left-1/4 w-6 h-6 text-yellow-400 animate-ping" />
          <Star className="absolute top-1/3 right-1/4 w-4 h-4 text-blue-400 animate-ping animation-delay-200" />
          <Star className="absolute bottom-1/3 left-1/3 w-5 h-5 text-purple-400 animate-ping animation-delay-400" />
          <Star className="absolute bottom-1/4 right-1/3 w-4 h-4 text-green-400 animate-ping animation-delay-600" />
        </>
      )}
    </div>
  );
}
