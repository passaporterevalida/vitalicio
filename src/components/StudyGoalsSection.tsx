import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Trophy, 
  Star, 
  TrendingUp, 
  Award,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function StudyGoalsSection() {
  const { getStudyGoals } = useGamification();
  const studyGoals = getStudyGoals();

  if (studyGoals.length === 0) {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Parabéns!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Você completou todas as metas básicas. Continue estudando para desbloquear novas conquistas!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'questions': return <Target className="w-5 h-5" />;
      case 'accuracy': return <TrendingUp className="w-5 h-5" />;
      case 'streak': return <Star className="w-5 h-5" />;
      case 'xp': return <Award className="w-5 h-5" />;
      case 'area': return <Trophy className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getGoalColor = (type: string) => {
    switch (type) {
      case 'questions': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'accuracy': return 'text-green-600 bg-green-100 border-green-200';
      case 'streak': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'xp': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'area': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Target className="w-6 h-6 text-blue-600" />
            Suas Metas de Estudo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGoals.map((goal) => {
              const percentage = Math.round((goal.current / goal.target) * 100);
              const isCompleted = goal.completed;
              
              return (
                <Card 
                  key={goal.id} 
                  className={`border-2 transition-all duration-300 hover:scale-105 ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${getGoalColor(goal.type)}`}>
                          {getGoalIcon(goal.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {goal.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Concluída
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Progresso</span>
                          <span className="font-semibold">{goal.current}/{goal.target}</span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className="h-2"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {percentage}% completo
                        </div>
                      </div>

                      {/* Reward */}
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium">Recompensa</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-700 dark:text-yellow-300">
                            +{goal.reward.xp} XP
                          </div>
                          {goal.reward.badge && (
                            <div className="text-xs text-yellow-600 dark:text-yellow-400">
                              {goal.reward.badge}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Area specific info */}
                      {goal.area && (
                        <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-700 rounded p-2">
                          Área: <span className="font-medium">{goal.area}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Motivation */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Continue assim!
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cada meta completada te aproxima mais da aprovação no Revalida.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 