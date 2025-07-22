import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MissionExecution } from '@/components/MissionExecution';
import { MissionsTabsSection } from '@/components/MissionsTabsSection';
import { GamifiedMissionsDashboard } from '@/components/GamifiedMissionsDashboard';
import { Mission, CustomMission } from '@/types/missions';
import { useMissions } from '@/hooks/useMissions';

export default function CustomMissions() {
  const { getAvailableQuestionsCount } = useMissions();
  const [currentMission, setCurrentMission] = useState<Mission | CustomMission | null>(null);
  const [showMissionExecution, setShowMissionExecution] = useState(false);

  const handleStartMission = (mission: Mission | CustomMission) => {
    setCurrentMission(mission);
    setShowMissionExecution(true);
  };

  const handleBackToMissions = () => {
    setShowMissionExecution(false);
    setCurrentMission(null);
  };

  const handleMissionComplete = (mission: Mission | CustomMission) => {
    setShowMissionExecution(false);
    setCurrentMission(null);
    // Aqui você pode adicionar lógica adicional quando uma missão é completada
    console.log('Missão completada:', mission.title);
  };

  if (showMissionExecution && currentMission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <MissionExecution
          mission={currentMission}
          onBack={handleBackToMissions}
          onComplete={handleMissionComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-4 select-none">
            🎯 Missões Personalizadas
          </h1>
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 flex items-center gap-2 text-sm sm:text-base font-semibold text-center mt-2 mb-8 max-w-2xl mx-auto shadow">
            <span className="text-xl">⭐</span>
            Crie suas próprias missões com filtros específicos e desafie-se!
          </div>
        </div>

        {/* Dashboard de Estatísticas */}
        <GamifiedMissionsDashboard />

        {/* Seção de Missões */}
        <MissionsTabsSection onStartMission={handleStartMission} />
      </div>
    </div>
  );
} 