
import { Target } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";

export function DetailedAreaStats() {
  const { userProgress } = useGamification();
  
  const allAreasStats = Object.entries(userProgress.areaStats);
  const hasAnyData = allAreasStats.length > 0;
  
  const getAreaReliabilityColor = (total: number) => {
    if (total >= 10) return 'text-green-600 bg-green-50 border-green-200';
    if (total >= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (total >= 3) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getReliabilityLabel = (total: number) => {
    if (total >= 10) return 'Dados Confiáveis';
    if (total >= 5) return 'Dados Moderados';
    if (total >= 3) return 'Dados Básicos';
    return 'Poucos Dados';
  };

  if (!hasAnyData) {
    return null;
  }

  return (
    <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
        <Target className="w-6 h-6 text-green-600" />
        Análise Detalhada por Especialidade
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAreasStats.map(([area, stats]) => {
          const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          const reliabilityColor = getAreaReliabilityColor(stats.total);
          const reliabilityLabel = getReliabilityLabel(stats.total);
          
          return (
            <div key={area} className={`p-4 rounded-xl border-2 ${reliabilityColor} dark:bg-gray-700 dark:border-gray-600`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{area}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-gray-600">
                  {reliabilityLabel}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{accuracy}%</div>
              <div className="text-xs opacity-80 mb-2">
                {stats.correct}/{stats.total} acertos
              </div>
              <div className="mt-2 bg-white/50 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-current rounded-full h-2 transition-all"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
              {stats.total < 3 && (
                <p className="text-xs mt-2 opacity-70">
                  +{3 - stats.total} questões para dados confiáveis
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
