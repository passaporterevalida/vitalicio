import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award,
  Crown,
  CheckCircle,
  Lock
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function AchievementsShowcase() {
  const { userProgress } = useGamification();

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'first_question':
        return <Target className="w-5 h-5" />;
      case 'perfect_score':
        return <Star className="w-5 h-5" />;
      case 'streak_7':
        return <Zap className="w-5 h-5" />;
      case 'level_10':
        return <Crown className="w-5 h-5" />;
      case 'questions_100':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'first_question':
        return 'from-green-400 to-emerald-500';
      case 'perfect_score':
        return 'from-yellow-400 to-orange-500';
      case 'streak_7':
        return 'from-purple-400 to-pink-500';
      case 'level_10':
        return 'from-blue-400 to-indigo-500';
      case 'questions_100':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-gray-400 to-slate-500';
    }
  };

  const unlockedAchievements = userProgress.achievements.filter(a => a.unlocked);
  const lockedAchievements = userProgress.achievements.filter(a => !a.unlocked);
  const progressPercentage = (unlockedAchievements.length / userProgress.achievements.length) * 100;

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Conquistas
          <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
            {unlockedAchievements.length}/{userProgress.achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progresso Geral
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{unlockedAchievements.length} desbloqueadas</span>
            <span>{userProgress.achievements.length} total</span>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Conquistas Desbloqueadas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unlockedAchievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg bg-gradient-to-r ${getAchievementColor(achievement.type)} text-white shadow-md hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      {getAchievementIcon(achievement.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm">{achievement.title}</h5>
                      <p className="text-xs opacity-90">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Desbloqueada
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-500" />
              Conquistas Bloqueadas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lockedAchievements.slice(0, 4).map((achievement, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-300 dark:bg-gray-600 rounded-full">
                      {getAchievementIcon(achievement.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                        {achievement.title}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 border-0">
                      Bloqueada
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            {lockedAchievements.length > 4 && (
              <p className="text-xs text-gray-500 text-center mt-3">
                +{lockedAchievements.length - 4} conquistas restantes para desbloquear
              </p>
            )}
          </div>
        )}

        {/* Motivation Message */}
        {unlockedAchievements.length === 0 && (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nenhuma conquista ainda
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Continue estudando para desbloquear suas primeiras conquistas!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 