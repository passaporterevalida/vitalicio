import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Calendar,
  Award,
  Zap,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function DetailedStats() {
  const { userProgress, getAccuracy, getProgressPercentage } = useGamification();

  const getStreakStatus = (days: number) => {
    if (days >= 7) return { color: 'text-green-600', bg: 'bg-green-100', icon: <Star className="w-4 h-4" /> };
    if (days >= 3) return { color: 'text-blue-600', bg: 'bg-blue-100', icon: <TrendingUp className="w-4 h-4" /> };
    return { color: 'text-gray-600', bg: 'bg-gray-100', icon: <Activity className="w-4 h-4" /> };
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLevelProgress = () => {
    const currentLevelXP = (userProgress.level - 1) * 100;
    const currentLevelProgress = userProgress.xp - currentLevelXP;
    const xpForCurrentLevel = 100;
    return Math.min((currentLevelProgress / xpForCurrentLevel) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Removido os cards de Estatísticas de Questões e Estatísticas de Atividade */}
      {/*
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        ...
      </div>
      */}

      {/* Progress Visualization */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Progresso Detalhado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Level Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progresso do Nível {userProgress.level}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getLevelProgress().toFixed(1)}%
                </span>
              </div>
              <Progress value={getLevelProgress()} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{userProgress.xp} XP</span>
                <span>{userProgress.xpToNextLevel} XP (próximo nível)</span>
              </div>
            </div>

            {/* Accuracy Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Taxa de Acerto
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getAccuracy()}%
                </span>
              </div>
              <Progress value={getAccuracy()} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{userProgress.correctAnswers} corretas</span>
                <span>{userProgress.totalQuestions} total</span>
              </div>
            </div>

            {/* Achievement Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Conquistas Desbloqueadas
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round((userProgress.achievements.filter(a => a.unlocked).length / userProgress.achievements.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={(userProgress.achievements.filter(a => a.unlocked).length / userProgress.achievements.length) * 100} 
                className="h-3" 
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{userProgress.achievements.filter(a => a.unlocked).length} desbloqueadas</span>
                <span>{userProgress.achievements.length} total</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 