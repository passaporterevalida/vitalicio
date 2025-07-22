
import { Mission, CustomMission } from '@/types/missions';
import { useMissions } from '@/hooks/useMissions';
import { MissionCard } from '@/components/MissionCard';
import { CustomMissionCard } from '@/components/CustomMissionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flag, Settings, Trophy, Sparkles } from 'lucide-react';

interface MissionsTabsSectionProps {
  onStartMission: (mission: Mission | CustomMission) => void;
  filters?: any;
}

export function MissionsTabsSection({ onStartMission, filters = {} }: MissionsTabsSectionProps) {
  const { getMissionProgress, getAvailableMissions, getCompletedMissions, getAvailableQuestionsCount } = useMissions();

  const availableMissions = getAvailableMissions();
  const completedMissions = getCompletedMissions();

  // Apply filters to missions
  const filterMissions = (missions: Mission[]) => {
    let filtered = [...missions];

    if (filters.searchTerm) {
      filtered = filtered.filter(mission => 
        mission.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        mission.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        mission.area.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter(mission => mission.difficulty === filters.difficulty);
    }

    if (filters.area && filters.area !== 'all') {
      filtered = filtered.filter(mission => mission.area === filters.area);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'xp':
          filtered.sort((a, b) => b.reward.xp - a.reward.xp);
          break;
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
          break;
        case 'progress':
          filtered.sort((a, b) => b.progress - a.progress);
          break;
        case 'trending':
          filtered.sort(() => Math.random() - 0.5);
          break;
      }
    }

    return filtered;
  };

  const filteredAvailableMissions = filterMissions(availableMissions);
  const filteredCompletedMissions = filterMissions(completedMissions);

  return (
    <div className="border-2 border-blue-200 rounded-xl sm:rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-2 sm:p-6 backdrop-blur-sm mx-1 sm:mx-0">
      <Tabs defaultValue="prontas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-3 sm:mb-8 h-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-blue-900/20 border-2 border-blue-200 p-1 rounded-xl shadow-inner">
          <TabsTrigger 
            value="prontas" 
            className="flex flex-col items-center gap-1 text-xs sm:text-base font-medium py-2 sm:py-3 px-1 sm:px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 group"
          >
            <Flag className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-data-[state=active]:animate-pulse flex-shrink-0" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs sm:text-sm lg:text-base font-bold leading-tight">Quests</span>
              <span className="text-xs sm:text-sm lg:text-base font-bold leading-tight">Prontas</span>
              <span className="text-xs opacity-75 bg-blue-100 group-data-[state=active]:bg-white/20 text-blue-800 group-data-[state=active]:text-white px-1 sm:px-2 py-0.5 rounded-full leading-none font-semibold">
                {filteredAvailableMissions.length}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="personalizada" 
            className="flex flex-col items-center gap-1 text-xs sm:text-base font-medium py-2 sm:py-3 px-1 sm:px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 group"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-data-[state=active]:animate-spin flex-shrink-0" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs sm:text-sm lg:text-base font-bold leading-tight">Simulado</span>
              <span className="text-xs sm:text-sm lg:text-base font-bold leading-tight">Personalizado</span>
              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-purple-500 group-data-[state=active]:text-white" />
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="concluidas" 
            className="flex flex-col items-center gap-1 text-xs sm:text-base font-medium py-2 sm:py-3 px-1 sm:px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 group"
          >
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-data-[state=active]:animate-bounce flex-shrink-0" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs sm:text-sm lg:text-base font-bold leading-tight">Concluídas</span>
              <span className="text-xs opacity-75 bg-green-100 group-data-[state=active]:bg-white/20 text-green-800 group-data-[state=active]:text-white px-1 sm:px-2 py-0.5 rounded-full leading-none font-semibold">
                {filteredCompletedMissions.length}
              </span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prontas" className="space-y-3 sm:space-y-6">
          {filteredAvailableMissions.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-6 lg:grid-cols-2">
              {filteredAvailableMissions.map((mission, index) => (
                <div 
                  key={mission.id} 
                  className="animate-fade-in hover-scale" 
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <MissionCard
                    mission={mission}
                    progress={getMissionProgress(mission.id)}
                    onStartMission={onStartMission}
                    availableQuestions={getAvailableQuestionsCount(mission)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="p-4 sm:p-6 rounded-full bg-yellow-100 w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Trophy className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {filters.searchTerm || filters.difficulty !== 'all' || filters.area !== 'all' 
                  ? 'Nenhuma quest encontrada!' 
                  : 'Todas as quests concluídas!'
                }
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base px-4">
                {filters.searchTerm || filters.difficulty !== 'all' || filters.area !== 'all'
                  ? 'Tente ajustar os filtros para encontrar quests disponíveis.'
                  : 'Parabéns! Você completou todas as quests disponíveis.'
                }
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="personalizada" className="space-y-3 sm:space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:gap-6 lg:grid-cols-2">
            <CustomMissionCard onStartMission={onStartMission} />
          </div>
        </TabsContent>
        
        <TabsContent value="concluidas" className="space-y-3 sm:space-y-6">
          {filteredCompletedMissions.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-6 lg:grid-cols-2">
              {filteredCompletedMissions.map((mission, index) => (
                <div 
                  key={mission.id} 
                  className="animate-fade-in" 
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <MissionCard
                    mission={mission}
                    progress={getMissionProgress(mission.id)}
                    onStartMission={onStartMission}
                    availableQuestions={getAvailableQuestionsCount(mission)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="p-4 sm:p-6 rounded-full bg-blue-100 w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center">
                <Flag className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Nenhuma quest concluída ainda</h3>
              <p className="text-muted-foreground text-sm sm:text-base px-4">
                Complete sua primeira quest para ver o progresso aqui!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
