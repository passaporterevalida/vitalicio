
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame, Star, Zap, Award } from 'lucide-react';

export function GamifiedMissionsDashboard() {
  const {
    userProgress
  } = useGamification();
  
  const stats = [{
    label: 'Nível Atual',
    value: userProgress.level,
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50 border-yellow-200'
  }, {
    label: 'XP Total',
    value: userProgress.xp,
    icon: Zap,
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  }, {
    label: 'Sequência',
    value: `${userProgress.streakDias} dias`,
    icon: Flame,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 border-orange-200'
  }, {
    label: 'Conquistas',
    value: userProgress.achievements?.filter(a => a.unlocked).length || 0,
    icon: Trophy,
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  }];
  
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} border-2 hover:scale-105 transition-transform duration-200`}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${stat.color} rounded-lg flex-shrink-0`}>
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
