
import { useGamification } from '@/hooks/useGamification';
import { useRanking } from '@/hooks/useRanking';
import { useJornadaMissions } from '@/hooks/useJornadaMissions';
import { Trophy, Target, Zap, TrendingUp, Star, Award } from 'lucide-react';
import { ProgressHeader } from './ProgressHeader';
import { StatCard } from './StatCard';
import { ProgressMotivation } from './ProgressMotivation';

export function ProgressBalance() {
  const { userProgress, getAccuracy } = useGamification();
  const { currentUserPosition } = useRanking();
  const { getCompletedMissionsCount } = useJornadaMissions();

  const progressPercentage = userProgress.xpToNextLevel > 0 
    ? ((userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel) * 100
    : 0;

  const accuracy = getAccuracy();
  const completedMissions = getCompletedMissionsCount();

  return (
    <div className="space-y-6">
      {/* Header com nível, barra de progresso, XP e ranking */}
      <ProgressHeader
        nivel={userProgress.level}
        xpAtual={userProgress.xp}
        xpProximo={userProgress.xpToNextLevel}
        ranking={currentUserPosition?.allTime || 0}
        xpTotal={userProgress.xp}
      />

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<Target className="w-6 h-6 text-blue-500" />}
          label="Questões"
          value={userProgress.totalQuestions}
          sublabel={`${userProgress.correctAnswers} corretas`}
          bgClass="bg-gradient-to-br from-blue-50 to-blue-100/80"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-green-500" />}
          label="Precisão"
          value={`${accuracy.toFixed(0)}%`}
          sublabel="performance"
          bgClass="bg-gradient-to-br from-green-50 to-emerald-100/80"
        />
        <StatCard
          icon={<Zap className="w-6 h-6 text-purple-500" />}
          label="Sequência"
          value={userProgress.streakDias}
          sublabel="dias consecutivos"
          bgClass="bg-gradient-to-br from-purple-50 to-purple-100/80"
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-orange-500" />}
          label="Missões"
          value={completedMissions}
          sublabel="completas"
          bgClass="bg-gradient-to-br from-orange-50 to-orange-100/80"
        />
      </div>

      {/* Motivação/Status */}
      <ProgressMotivation message="Continue evoluindo!" />

      {/* Status do sistema e próximo XP */}
      <div className="flex justify-between items-center text-xs text-gray-700 mt-2 px-1">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Sistema Ativo
        </span>
        <span className="font-medium">Próximo: {userProgress.xpToNextLevel - userProgress.xp} XP</span>
      </div>
    </div>
  );
}
