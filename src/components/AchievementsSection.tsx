
import { Trophy, Star } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";

export function AchievementsSection() {
  const { userProgress } = useGamification();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl">
      {/* Título removido conforme solicitado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProgress.achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
              achievement.unlocked 
                ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-300 shadow-lg' 
                : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60 grayscale'
            }`}
          >
            {achievement.unlocked && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-3">
              <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce' : ''}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${
                  achievement.unlocked 
                    ? 'text-blue-800 dark:text-blue-200' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${
                  achievement.unlocked 
                    ? 'text-blue-600 dark:text-blue-300' 
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
              </div>
            </div>
            
            {achievement.unlocked && achievement.unlockedAt && (
              <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full inline-block">
                Conquistado em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
              </div>
            )}
            
            {!achievement.unlocked && (
              <div className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full inline-block">
                🔒 Continue estudando para desbloquear
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
