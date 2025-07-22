
import { Trophy, Target, Zap, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'achievement';
  progress: number;
  target: number;
  reward: {
    xp: number;
    badge?: string;
  };
  completed: boolean;
  icon: React.ReactNode;
}

interface QuestCardProps {
  quest: Quest;
  onComplete?: (questId: string) => void;
}

export function QuestCard({ quest, onComplete }: QuestCardProps) {
  const progressPercentage = (quest.progress / quest.target) * 100;
  const isCompleted = quest.completed || quest.progress >= quest.target;

  const getTypeColor = (type: Quest['type']) => {
    switch (type) {
      case 'daily': return 'bg-blue-500';
      case 'weekly': return 'bg-purple-500';
      case 'achievement': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:scale-105 ${
      isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'hover:shadow-lg'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getTypeColor(quest.type)} text-white`}>
              {quest.icon}
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {quest.title}
                {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
              </CardTitle>
              <Badge variant={quest.type === 'daily' ? 'default' : quest.type === 'weekly' ? 'secondary' : 'outline'}>
                {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-600">
              <Zap className="w-4 h-4" />
              <span className="font-bold">+{quest.reward.xp} XP</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{quest.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span className={isCompleted ? 'text-green-600 font-bold' : ''}>
              {quest.progress}/{quest.target}
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className={`h-2 ${isCompleted ? 'bg-green-100' : ''}`}
          />
        </div>

        {quest.reward.badge && (
          <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-800">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Emblema: {quest.reward.badge}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
