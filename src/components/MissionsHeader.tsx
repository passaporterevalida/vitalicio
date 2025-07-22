import { Flag, Target, Star, Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
export function MissionsHeader() {
  const {
    userProgress
  } = useGamification();
  return <div className="text-center mb-6 sm:mb-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-3 h-3 sm:w-5 sm:h-5 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-[17px]">
        {/* Main Title */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-xl py-[14px] px-[14px]">
              <Flag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
          </div>
          
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Complete missões gamificadas, ganhe XP e desbloqueie conquistas enquanto 
            domina os conhecimentos do Revalida. Sua jornada médica continua aqui! 🎯
          </p>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl max-w-xl sm:max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-green-800">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base text-center">
              Continue sua jornada! Faltam {userProgress.xpToNextLevel - userProgress.xp} XP para o próximo nível.
            </span>
          </div>
        </div>
      </div>
    </div>;
}