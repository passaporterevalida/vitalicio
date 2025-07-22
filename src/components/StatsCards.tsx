
import { TrendingUp, Target, Trophy, Activity, ArrowUpRight, ArrowDownRight, Zap, Clock, Flame, Flag } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";
import { getTotalQuestionsInSystem, getQuestionsCompletionStats } from "@/utils/questionCounter";
import { useRanking } from "@/hooks/useRanking";
import { useJornadaMissions } from "@/hooks/useJornadaMissions";

export function StatsCards() {
  const { userProgress, getAccuracy, getAdvancedStats } = useGamification();
  const { currentUserPosition } = useRanking();
  const advancedStats = getAdvancedStats();
  const { missions, getCompletedMissionsCount } = useJornadaMissions();
  const completedMissionsCount = getCompletedMissionsCount();

  // Estatísticas do sistema
  const systemStats = getQuestionsCompletionStats(userProgress.totalQuestions);

  // Desempenho por área
  const areaStats = userProgress.areaStats || {};
  const areaArray = Object.entries(areaStats).filter(([_, stats]) => stats.total >= 3);
  const bestArea = areaArray.length > 0 ? areaArray.reduce((a, b) => (a[1].correct / a[1].total > b[1].correct / b[1].total ? a : b)) : null;
  const worstArea = areaArray.length > 0 ? areaArray.reduce((a, b) => (a[1].correct / a[1].total < b[1].correct / b[1].total ? a : b)) : null;

  // Média de questões por dia (últimos 7 dias) - simulação
  const avgQuestionsPerDay = userProgress.totalQuestions >= 7 ? Math.round(userProgress.totalQuestions / 7) : userProgress.totalQuestions;

  // Ranking nacional
  const rankingPos = currentUserPosition?.allTime || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Progresso */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <Target className="w-7 h-7 text-blue-600" />
          </div>
          <span className="text-2xl font-extrabold text-blue-900 dark:text-white drop-shadow-lg transition-all animate-bounce-slow">{Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100)}%</span>
        </div>
        <div className="text-sm font-semibold text-blue-700 dark:text-blue-200 mb-0.5 text-center">Progresso até o próximo nível</div>
        <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden mb-1">
          <div 
            className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 rounded-full transition-all duration-700"
            style={{ width: `${(userProgress.xp / userProgress.xpToNextLevel) * 100}%` }}
          />
        </div>
        <div className="text-xs text-blue-500 dark:text-blue-200 text-center">+{userProgress.xpToNextLevel - userProgress.xp} XP para próximo nível</div>
      </div>

      {/* XP Semanal */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-green-50 via-green-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <Zap className="w-7 h-7 text-green-600" />
          </div>
          <span className="text-2xl font-extrabold text-green-700 dark:text-green-200 drop-shadow-lg transition-all animate-bounce-slow">{userProgress.weeklyXP || 0}</span>
        </div>
        <div className="text-sm font-semibold text-green-700 dark:text-green-200 mb-0.5 text-center">XP Semanal</div>
        <div className="text-xs text-green-500 dark:text-green-200 text-center">Esta semana</div>
        {userProgress.weeklyXP > 0 && (
          <span className="absolute top-2 right-2 bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow animate-pulse">⚡</span>
        )}
      </div>

      {/* Combo Atual */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-orange-50 via-orange-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <Flame className="w-7 h-7 text-orange-600" />
          </div>
          <span className="text-2xl font-extrabold text-orange-700 dark:text-orange-200 drop-shadow-lg transition-all animate-bounce-slow">{userProgress.currentCombo || 0}</span>
        </div>
        <div className="text-sm font-semibold text-orange-700 dark:text-orange-200 mb-0.5 text-center">Combo Atual</div>
        <div className="text-xs text-orange-500 dark:text-orange-200 text-center">Recorde: {userProgress.maxCombo || 0}</div>
        {(userProgress.currentCombo || 0) >= 3 && (
          <span className="absolute top-2 right-2 bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow animate-pulse">🔥</span>
        )}
      </div>

      {/* Tempo de Estudo */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 via-purple-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <Clock className="w-7 h-7 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-purple-700 dark:text-purple-200 drop-shadow-lg transition-all animate-bounce-slow">
            {Math.round((userProgress.totalStudyTime || 0) / 60)}h
          </span>
        </div>
        <div className="text-sm font-semibold text-purple-700 dark:text-purple-200 mb-0.5 text-center">Tempo de Estudo</div>
        <div className="text-xs text-purple-500 dark:text-purple-200 text-center">{(userProgress.totalStudyTime || 0)} min total</div>
        {(userProgress.totalStudyTime || 0) > 120 && (
          <span className="absolute top-2 right-2 bg-purple-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow animate-pulse">⏰</span>
        )}
      </div>

      {/* Acertos */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <TrendingUp className="w-7 h-7 text-green-600" />
          </div>
          <span className="text-2xl font-extrabold text-green-700 dark:text-green-200 drop-shadow-lg transition-all animate-bounce-slow">{userProgress.correctAnswers}</span>
        </div>
        <div className="text-sm font-semibold text-green-700 dark:text-green-200 mb-0.5 text-center">Questões Corretas</div>
        <div className="text-xs text-green-500 dark:text-green-200 text-center">de {userProgress.totalQuestions} respondidas</div>
      </div>

      {/* Missões Conquistadas */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <Flag className="w-7 h-7 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-purple-700 dark:text-purple-200 drop-shadow-lg transition-all animate-bounce-slow">{completedMissionsCount}</span>
        </div>
        <div className="text-sm font-semibold text-purple-700 dark:text-purple-200 mb-0.5 text-center">Missões Conquistadas</div>
        <div className="text-xs text-purple-500 dark:text-purple-200 text-center">de {missions.length} disponíveis</div>
        {completedMissionsCount > 0 && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">🏁</span>
        )}
      </div>

      {/* Dias Seguidos */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <Activity className="w-7 h-7 text-orange-600" />
          </div>
          <span className="text-2xl font-extrabold text-orange-700 dark:text-orange-200 drop-shadow-lg transition-all animate-bounce-slow">{userProgress.streakDias}</span>
        </div>
        <div className="text-sm font-semibold text-orange-700 dark:text-orange-200 mb-0.5 text-center">Dias Seguidos</div>
        <div className="text-xs text-orange-500 dark:text-orange-200 text-center">Sequência atual</div>
        {userProgress.streakDias >= 7 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">🔥 Recorde!</span>
        )}
      </div>

      {/* Score de Consistência */}
      <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="flex flex-col items-center mb-1">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full shadow-lg mb-1 animate-pulse-slow">
            <TrendingUp className="w-7 h-7 text-blue-600" />
          </div>
          <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-200 drop-shadow-lg transition-all animate-bounce-slow">{advancedStats.consistencyScore}%</span>
        </div>
        <div className="text-sm font-semibold text-blue-700 dark:text-blue-200 mb-0.5 text-center">Consistência</div>
        <div className="text-xs text-blue-500 dark:text-blue-200 text-center">Score de regularidade</div>
        {advancedStats.consistencyScore >= 80 && (
          <span className="absolute top-2 right-2 bg-blue-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">📈</span>
        )}
      </div>
    </div>
  );
}
