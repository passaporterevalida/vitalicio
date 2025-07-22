
import { Star } from "lucide-react";
import PerformanceChart from "./PerformanceChart";
import { useGamification } from "@/hooks/useGamification";

export function StatsChart() {
  const { userProgress } = useGamification();
  
  // Filtrar áreas com dados suficientes (mínimo 3 questões)
  const getReliableAreaStats = () => {
    return Object.entries(userProgress.areaStats).filter(([_, stats]) => stats.total >= 3);
  };

  // Convert area stats to chart data - apenas áreas com dados confiáveis
  const getChartData = () => {
    const reliableAreas = getReliableAreaStats();
    
    if (reliableAreas.length === 0) {
      return [];
    }
    
    return reliableAreas.map(([area, stats]) => ({
      nome: area,
      valor: Math.round((stats.correct / stats.total) * 100),
      total: stats.total,
      corretas: stats.correct
    }));
  };

  const chartData = getChartData();
  const hasReliableData = chartData.length > 0;
  const allAreasStats = Object.entries(userProgress.areaStats);
  const hasAnyData = allAreasStats.length > 0;

  return (
    <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center flex items-center justify-center gap-3">
        <Star className="w-6 h-6 text-blue-600" />
        Desempenho por Área Médica
      </h2>
      
      <PerformanceChart dados={chartData} showDemo={!hasAnyData} />
      
      {hasReliableData && (
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            📊 Baseado em áreas com pelo menos 3 questões respondidas
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Mostrando {chartData.length} de {allAreasStats.length} áreas com dados confiáveis
          </p>
        </div>
      )}
      
      {hasAnyData && !hasReliableData && (
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            📈 Dados insuficientes para gráfico confiável
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Responda pelo menos 3 questões em cada área para ver estatísticas confiáveis
          </p>
          <p className="text-xs text-muted-foreground">
            Progresso atual: {allAreasStats.length} área(s) com dados
          </p>
        </div>
      )}
    </div>
  );
}
