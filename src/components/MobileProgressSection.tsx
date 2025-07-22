
import { useGamification } from '@/hooks/useGamification';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';

export function MobileProgressSection() {
  const {
    userProgress,
    getAccuracy
  } = useGamification();
  
  const progressPercentage = userProgress.xpToNextLevel > 0 ? (userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel * 100 : 0;
  const accuracy = getAccuracy();
  
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-sm">Nível {userProgress.level}</span>
        </div>
        <div className="text-xs text-blue-100">
          {userProgress.xp} XP
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-blue-100">
          <span>Progresso</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-blue-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-3 text-xs">
        <div className="flex items-center gap-1">
          <Target className="w-3 h-3" />
          <span>Precisão: {accuracy}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>Próximo: {userProgress.xpToNextLevel - userProgress.xp} XP</span>
        </div>
      </div>
    </div>
  );
}
