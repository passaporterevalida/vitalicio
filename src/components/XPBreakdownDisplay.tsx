import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  Flame, 
  Star, 
  Award,
  TrendingUp,
  X
} from 'lucide-react';
import { XPBreakdown } from '@/types/gamification';

interface XPBreakdownDisplayProps {
  breakdown: XPBreakdown | undefined;
  onClose?: () => void;
}

export function XPBreakdownDisplay({ breakdown, onClose }: XPBreakdownDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (breakdown && breakdown.totalXP > 0) {
      setIsVisible(true);
      setIsAnimating(true);
      
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [breakdown, onClose]);

  if (!isVisible || !breakdown) {
    return null;
  }

  const getBreakdownItem = (label: string, value: number, icon: React.ReactNode, color: string) => {
    if (value <= 0) return null;
    
    return (
      <div className="flex items-center justify-between p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-full ${color}`}>
            {icon}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-bold">+{value}</span>
      </div>
    );
  };

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-500 ${
      isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="w-80 shadow-2xl border-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">XP Ganho!</h3>
                <p className="text-sm text-muted-foreground">Breakdown detalhado</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={() => {
                  setIsAnimating(false);
                  setTimeout(() => {
                    setIsVisible(false);
                    onClose();
                  }, 500);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Total XP */}
          <div className="text-center mb-4 p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">
              +{breakdown.totalXP} XP
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-300">
              Total ganho
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2">
            {getBreakdownItem(
              'Questão',
              breakdown.baseXP,
              <Target className="w-3 h-3 text-blue-600" />,
              'bg-blue-100 text-blue-600'
            )}
            
            {getBreakdownItem(
              'Streak',
              breakdown.streakBonus,
              <Flame className="w-3 h-3 text-orange-600" />,
              'bg-orange-100 text-orange-600'
            )}
            
            {getBreakdownItem(
              'Combo',
              breakdown.comboBonus,
              <TrendingUp className="w-3 h-3 text-green-600" />,
              'bg-green-100 text-green-600'
            )}
            
            {getBreakdownItem(
              'Dificuldade',
              breakdown.difficultyBonus,
              <Star className="w-3 h-3 text-yellow-600" />,
              'bg-yellow-100 text-yellow-600'
            )}
            
            {getBreakdownItem(
              'Conquista',
              breakdown.achievementBonus,
              <Award className="w-3 h-3 text-purple-600" />,
              'bg-purple-100 text-purple-600'
            )}
          </div>

          {/* Animation indicator */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              XP adicionado ao seu perfil
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 