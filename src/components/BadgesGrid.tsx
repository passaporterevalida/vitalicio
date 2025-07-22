
import { Achievement } from '@/types/gamification';
import { BadgeDisplay } from './BadgeDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Crown, Award, Target } from 'lucide-react';

interface BadgesGridProps {
  achievements: Achievement[];
}

export function BadgesGrid({ achievements }: BadgesGridProps) {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  const categorizeAchievements = (achievs: Achievement[]) => {
    return {
      area: achievs.filter(a => a.category === 'area'),
      streak: achievs.filter(a => a.category === 'streak'),
      performance: achievs.filter(a => a.category === 'performance'),
      general: achievs.filter(a => a.category === 'general' || !a.category)
    };
  };

  const unlockedByCategory = categorizeAchievements(unlockedAchievements);
  const lockedByCategory = categorizeAchievements(lockedAchievements);

  const CategorySection = ({ title, achievements, icon }: { 
    title: string; 
    achievements: Achievement[]; 
    icon: React.ReactNode;
  }) => {
    if (achievements.length === 0) return null;
    
    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <span className="text-sm text-muted-foreground">({achievements.length})</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {achievements.map(achievement => (
            <BadgeDisplay 
              key={achievement.id} 
              achievement={achievement} 
              size="md"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="border border-blue-100 dark:border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Sistema de Conquistas
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            {unlockedAchievements.length} Conquistadas
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            {lockedAchievements.length} Bloqueadas
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unlocked" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="unlocked" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Conquistadas ({unlockedAchievements.length})
            </TabsTrigger>
            <TabsTrigger value="locked" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              A Conquistar ({lockedAchievements.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="unlocked" className="space-y-6">
            {unlockedAchievements.length > 0 ? (
              <>
                <CategorySection 
                  title="Especialização por Área" 
                  achievements={unlockedByCategory.area}
                  icon={<Star className="w-5 h-5 text-purple-500" />}
                />
                <CategorySection 
                  title="Consistência & Streaks" 
                  achievements={unlockedByCategory.streak}
                  icon={<Crown className="w-5 h-5 text-yellow-500" />}
                />
                <CategorySection 
                  title="Performance & Simulados" 
                  achievements={unlockedByCategory.performance}
                  icon={<Trophy className="w-5 h-5 text-blue-500" />}
                />
                <CategorySection 
                  title="Conquistas Gerais" 
                  achievements={unlockedByCategory.general}
                  icon={<Award className="w-5 h-5 text-green-500" />}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                  Nenhuma conquista ainda
                </h3>
                <p className="text-muted-foreground">
                  Continue estudando para desbloquear suas primeiras badges!
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="locked" className="space-y-6">
            <CategorySection 
              title="Especialização por Área" 
              achievements={lockedByCategory.area}
              icon={<Star className="w-5 h-5 text-purple-500" />}
            />
            <CategorySection 
              title="Consistência & Streaks" 
              achievements={lockedByCategory.streak}
              icon={<Crown className="w-5 h-5 text-yellow-500" />}
            />
            <CategorySection 
              title="Performance & Simulados" 
              achievements={lockedByCategory.performance}
              icon={<Trophy className="w-5 h-5 text-blue-500" />}
            />
            <CategorySection 
              title="Conquistas Gerais" 
              achievements={lockedByCategory.general}
              icon={<Award className="w-5 h-5 text-green-500" />}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
