
import { Navbar } from "@/components/Navbar";
import { StatsPageHeader } from "@/components/StatsPageHeader";
import { StatsCards } from "@/components/StatsCards";
import { StatsChart } from "@/components/StatsChart";
import { StatsControls } from "@/components/StatsControls";
import { DetailedAreaStats } from "@/components/DetailedAreaStats";
import { AchievementsSection } from "@/components/AchievementsSection";
import { AdvancedXPStats } from "@/components/AdvancedXPStats";
import { ProgressCharts } from "@/components/ProgressCharts";
import { StudyGoalsSection } from "@/components/StudyGoalsSection";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { GamifiedHeaderAlert } from '@/components/GamifiedHeaderAlert';
import { useState } from "react";

export default function Stats() {
  const { userProgress, resetJornada } = useGamification();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const allAreasStats = Object.entries(userProgress.areaStats);
  const hasAnyData = allAreasStats.length > 0;

  const handleReset = async () => {
    await resetJornada();
    setShowSuccess(true);
    toast({
      title: "Jornada Reiniciada",
      description: "Todo o seu progresso foi zerado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-8 select-none text-center">
            Estatísticas de Desempenho
          </h1>
          <GamifiedHeaderAlert icon={<span className='text-xl'>📊</span>} className="mb-8">
            Acompanhe seu progresso e identifique áreas para evoluir!
          </GamifiedHeaderAlert>
          
          {/* Estatísticas Básicas */}
          <StatsCards />
          
          {/* Análise Avançada de XP */}
          <AdvancedXPStats />
          
          {/* Gráficos de Progresso */}
          <ProgressCharts />
          
          {/* Metas de Estudo */}
          <StudyGoalsSection />
          
          {/* Gráfico de Desempenho por Área */}
          <StatsChart />
          
          {/* Estatísticas Detalhadas por Área */}
          <DetailedAreaStats />
          
          {/* Controles */}
          <StatsControls onReset={handleReset} hasAnyData={hasAnyData} />
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Jornada Reiniciada!</h2>
                <p className="text-gray-700 mb-6">Seu progresso em XP, missões, estatísticas e conquistas foi zerado com sucesso. Boa sorte na nova jornada!</p>
                <button
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow"
                  onClick={() => setShowSuccess(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
