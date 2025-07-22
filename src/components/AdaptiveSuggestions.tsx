import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Target, Lightbulb } from 'lucide-react';
export function AdaptiveSuggestions() {
  const {
    userProgress,
    generateQuestSuggestions
  } = useGamification();
  const suggestions = generateQuestSuggestions();
  const getWeakestAreas = () => {
    return Object.entries(userProgress.areaStats).filter(([_, stats]) => stats.total >= 3).map(([area, stats]) => ({
      area,
      accuracy: Math.round(stats.correct / stats.total * 100),
      total: stats.total
    })).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
  };
  const weakestAreas = getWeakestAreas();
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Sugestões para Hoje
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Áreas para Melhorar */}
        {weakestAreas.length > 0 && <div>
            <h3 className="flex items-center gap-2 font-semibold mb-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Áreas para Fortalecer
            </h3>
            <div className="space-y-3">
              {weakestAreas.map(({
            area,
            accuracy,
            total
          }) => <div key={area} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{area}</span>
                    <Badge variant="outline" className="text-xs">
                      {accuracy}% ({total} questões)
                    </Badge>
                  </div>
                  <Progress value={accuracy} className="h-2 mb-2" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lightbulb className="w-3 h-3" />
                    Pratique mais 10 questões para melhorar
                  </div>
                </div>)}
            </div>
          </div>}

        {/* Missões Sugeridas */}
        {suggestions.length > 0}

        {/* Streak Incentivo */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔥</span>
            <span className="font-medium text-orange-800 dark:text-orange-200">
              {userProgress.streakDias > 0 ? `Mantenha seu streak de ${userProgress.streakDias} dias!` : 'Comece seu streak hoje!'}
            </span>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            {userProgress.streakDias > 0 ? `Continue estudando para ganhar +${Math.min(userProgress.streakDias * 2 + 10, 100)} XP amanhã` : 'Responda pelo menos 1 questão para iniciar seu streak'}
          </p>
        </div>
      </CardContent>
    </Card>;
}