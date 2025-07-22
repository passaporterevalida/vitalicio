import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar,
  Target,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { calculateAdvancedStats } from '@/utils/gamificationHelpers';

export function ProgressCharts() {
  const { userProgress } = useGamification();
  const advancedStats = calculateAdvancedStats(userProgress);

  // Remover comentários e dados de exemplo que mencionam simulado.
  const weeklyProgress = [
    { day: 'Seg', questions: 15, xp: 120, accuracy: 80 },
    { day: 'Ter', questions: 12, xp: 95, accuracy: 75 },
    { day: 'Qua', questions: 18, xp: 145, accuracy: 85 },
    { day: 'Qui', questions: 10, xp: 80, accuracy: 70 },
    { day: 'Sex', questions: 20, xp: 160, accuracy: 90 },
    { day: 'Sáb', questions: 8, xp: 65, accuracy: 75 },
    { day: 'Dom', questions: 14, xp: 110, accuracy: 80 },
  ];

  const monthlyProgress = [
    { week: 'Sem 1', questions: 85, xp: 680, accuracy: 78 },
    { week: 'Sem 2', questions: 92, xp: 740, accuracy: 82 },
    { week: 'Sem 3', questions: 78, xp: 620, accuracy: 75 },
    { week: 'Sem 4', questions: 105, xp: 840, accuracy: 85 },
  ];

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Calcular tendências
  const currentWeekQuestions = weeklyProgress.reduce((sum, day) => sum + day.questions, 0);
  const currentWeekXP = weeklyProgress.reduce((sum, day) => sum + day.xp, 0);
  const currentWeekAccuracy = Math.round(
    weeklyProgress.reduce((sum, day) => sum + day.accuracy, 0) / weeklyProgress.length
  );

  return (
    <div className="space-y-6">
      {/* Resumo de Tendências */}
      {/* Removido: Card de Análise de Tendências */}

      {/* Gráfico Semanal */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Calendar className="w-6 h-6 text-blue-600" />
            Progresso Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Gráfico de Questões por Dia */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Questões por Dia
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2 mb-1">
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-200">
                        {day.questions}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{day.accuracy}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de XP por Dia */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-600" />
                XP Ganho por Dia
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                    <div className="bg-green-100 dark:bg-green-900 rounded-lg p-2">
                      <div className="text-sm font-bold text-green-700 dark:text-green-200">
                        {day.xp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico Mensal */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Progresso Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Gráfico de Questões por Semana */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Questões por Semana
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {monthlyProgress.map((week, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">{week.week}</div>
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 mb-2">
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-200">
                        {week.questions}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {week.accuracy}% precisão
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de XP por Semana */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-600" />
                XP Ganho por Semana
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {monthlyProgress.map((week, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">{week.week}</div>
                    <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-700 dark:text-green-200">
                        {week.xp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights e Recomendações */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Insights e Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Melhor Dia */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700 dark:text-green-200">Seu Melhor Dia</span>
              </div>
              <p className="text-green-700 dark:text-green-200">
                Sexta-feira foi seu dia mais produtivo com {Math.max(...weeklyProgress.map(d => d.questions))} questões e {Math.max(...weeklyProgress.map(d => d.xp))} XP ganhos.
              </p>
            </div>

            {/* Área de Melhoria */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-700 dark:text-yellow-200">Foco na Consistência</span>
              </div>
              <p className="text-yellow-700 dark:text-yellow-200">
                Sua precisão varia entre 70% e 90%. Tente manter uma rotina mais consistente para melhorar seus resultados.
              </p>
            </div>

            {/* Meta Semanal */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700 dark:text-blue-200">Meta para Próxima Semana</span>
              </div>
              <p className="text-blue-700 dark:text-blue-200">
                Tente responder pelo menos {Math.round(currentWeekQuestions * 1.1)} questões para superar seu recorde semanal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 