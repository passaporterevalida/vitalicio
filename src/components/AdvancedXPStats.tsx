import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Clock, 
  Award, 
  Flame, 
  Star,
  BarChart3,
  Calendar,
  Trophy,
  Activity,
  Brain
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { calculateAdvancedStats, generateStudyGoals, XPBreakdown } from '@/utils/gamificationHelpers';

export function AdvancedXPStats() {
  const { userProgress } = useGamification();
  const [activeTab, setActiveTab] = useState('overview');
  
  const advancedStats = calculateAdvancedStats(userProgress);
  const studyGoals = generateStudyGoals(userProgress);
  
  // Simular histórico de XP (em produção viria do banco)
  const xpHistory = [
    { date: '2024-01-15', xpGained: 45, source: 'question' as const, details: '10 questões corretas' },
    { date: '2024-01-14', xpGained: 120, source: 'simulado' as const, details: 'Simulado completo' },
    { date: '2024-01-13', xpGained: 25, source: 'achievement' as const, details: 'Conquista desbloqueada' },
    { date: '2024-01-12', xpGained: 30, source: 'streak' as const, details: 'Bônus de sequência' },
  ];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'question': return <Target className="w-4 h-4" />;
      case 'simulado': return <Brain className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'streak': return <Flame className="w-4 h-4" />;
      case 'mission': return <Award className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'question': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'simulado': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'achievement': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'streak': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'mission': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Análise Avançada de XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="goals">Metas</TabsTrigger>
            </TabsList>

            {/* Visão Geral */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* XP Total */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-700 dark:text-blue-200">XP Total</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-white">{userProgress.xp}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Nível {userProgress.level}</div>
                </div>

                {/* XP Semanal */}
                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700 dark:text-green-200">XP Semanal</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-white">{userProgress.weeklyXP || 0}</div>
                  <div className="text-sm text-green-600 dark:text-green-300">Esta semana</div>
                </div>

                {/* Tempo de Estudo */}
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-700 dark:text-purple-200">Tempo de Estudo</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-white">
                    {Math.round(advancedStats.totalStudyTime / 60)}h
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-300">
                    {advancedStats.totalStudyTime} min total
                  </div>
                </div>

                {/* Score de Consistência */}
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-700 dark:text-orange-200">Consistência</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900 dark:text-white">{advancedStats.consistencyScore}%</div>
                  <div className="text-sm text-orange-600 dark:text-orange-300">{userProgress.streakDias} dias seguidos</div>
                </div>
              </div>

              {/* Estatísticas Detalhadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Melhor Área */}
                {advancedStats.bestArea && (
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-700 dark:text-green-200">Melhor Área</span>
                      </div>
                      <div className="text-xl font-bold text-green-900 dark:text-white mb-1">
                        {advancedStats.bestArea.name}
                      </div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                        {advancedStats.bestArea.accuracy}%
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        {advancedStats.bestArea.total} questões respondidas
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Área para Melhorar */}
                {advancedStats.worstArea && (
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-700 dark:text-red-200">Foco Necessário</span>
                      </div>
                      <div className="text-xl font-bold text-red-900 dark:text-white mb-1">
                        {advancedStats.worstArea.name}
                      </div>
                      <div className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">
                        {advancedStats.worstArea.accuracy}%
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-400">
                        {advancedStats.worstArea.total} questões respondidas
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Breakdown de XP */}
            <TabsContent value="breakdown" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Como você ganha XP</h3>
                <p className="text-sm text-muted-foreground">
                  Cada ação tem diferentes valores de XP baseados em dificuldade e bônus
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Questões
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Fácil</span>
                        <span className="font-semibold">5 XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Médio</span>
                        <span className="font-semibold">10 XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difícil</span>
                        <span className="font-semibold">15 XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-600" />
                      Bônus
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Streak (3+ dias)</span>
                        <span className="font-semibold">+20 XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Streak (7+ dias)</span>
                        <span className="font-semibold">+50 XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Combo (3+ acertos)</span>
                        <span className="font-semibold">+6 XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conquista</span>
                        <span className="font-semibold">+25 XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Histórico de XP */}
            <TabsContent value="history" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Histórico de Ganhos de XP</h3>
                <p className="text-sm text-muted-foreground">
                  Acompanhe como você ganhou XP ao longo do tempo
                </p>
              </div>

              <div className="space-y-3">
                {xpHistory.map((entry, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getSourceColor(entry.source)}`}>
                            {getSourceIcon(entry.source)}
                          </div>
                          <div>
                            <div className="font-semibold">+{entry.xpGained} XP</div>
                            <div className="text-sm text-muted-foreground">{entry.details}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Metas de Estudo */}
            <TabsContent value="goals" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Suas Metas de Estudo</h3>
                <p className="text-sm text-muted-foreground">
                  Metas personalizadas baseadas no seu progresso
                </p>
              </div>

              <div className="space-y-4">
                {studyGoals.map((goal) => (
                  <Card key={goal.id} className={`${goal.completed ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Star className={`w-5 h-5 ${goal.completed ? 'text-green-600' : 'text-yellow-600'}`} />
                          <h4 className="font-semibold">{goal.title}</h4>
                          {goal.completed && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Concluída
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{goal.current}/{goal.target}</div>
                          <div className="text-sm text-muted-foreground">+{goal.reward.xp} XP</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(goal.current / goal.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 