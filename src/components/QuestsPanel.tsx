
import { useState } from 'react';
import { QuestCard, Quest } from './QuestCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Trophy, Target } from 'lucide-react';

const SAMPLE_QUESTS: Quest[] = [
  {
    id: 'daily_1',
    title: 'Estudioso Diário',
    description: 'Responda 10 questões hoje',
    type: 'daily',
    progress: 3,
    target: 10,
    reward: { xp: 50 },
    completed: false,
    icon: <Target className="w-4 h-4" />
  },
  {
    id: 'weekly_1',
    title: 'Maratona Semanal',
    description: 'Complete 3 simulados esta semana',
    type: 'weekly',
    progress: 1,
    target: 3,
    reward: { xp: 200, badge: 'Maratonista' },
    completed: false,
    icon: <Calendar className="w-4 h-4" />
  },
  {
    id: 'achievement_1',
    title: 'Precisão Cirúrgica',
    description: 'Mantenha 90% de acertos em 50 questões',
    type: 'achievement',
    progress: 23,
    target: 50,
    reward: { xp: 500, badge: 'Cirurgião' },
    completed: false,
    icon: <Trophy className="w-4 h-4" />
  }
];

interface QuestsPanelProps {
  className?: string;
}

export function QuestsPanel({ className }: QuestsPanelProps) {
  const [quests, setQuests] = useState<Quest[]>(SAMPLE_QUESTS);

  const dailyQuests = quests.filter(q => q.type === 'daily');
  const weeklyQuests = quests.filter(q => q.type === 'weekly');
  const achievementQuests = quests.filter(q => q.type === 'achievement');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Missões Ativas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">
              Diárias ({dailyQuests.length})
            </TabsTrigger>
            <TabsTrigger value="weekly">
              Semanais ({weeklyQuests.length})
            </TabsTrigger>
            <TabsTrigger value="achievements">
              Conquistas ({achievementQuests.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            {dailyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-4">
            {weeklyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            {achievementQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
