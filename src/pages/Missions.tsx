import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { JornadaMissionCard } from '@/components/JornadaMissionCard';
import { JornadaMissionModal } from '@/components/JornadaMissionModal';
import { useJornadaMissions } from '@/hooks/useJornadaMissions';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useMissions } from '@/hooks/useMissions';

export default function Missions() {
  const {
    missions,
    currentMission,
    missionQuestions,
    currentQuestionIndex,
    answers,
    isMissionActive,
    startMission,
    answerMissionQuestion,
    goToNextMissionQuestion,
    finishMission,
    cancelMission,
  } = useJornadaMissions();

  const { user } = useAuth();
  const [acertosAcumulados, setAcertosAcumulados] = useState<{ [nivel: number]: number }>({});
  const [showMissionModal, setShowMissionModal] = useState(false);

  useEffect(() => {
    async function fetchAcertos() {
      if (!user) return;
      const fields = Array.from({ length: 10 }, (_, i) => `jornada_acertos_nivel${i + 1}`);
      const { data, error } = await supabase
        .from('user_profiles')
        .select(fields.join(','))
        .eq('user_id', user.id)
        .maybeSingle();
      if (data) {
        const acertos: { [nivel: number]: number } = {};
        for (let i = 1; i <= 10; i++) {
          acertos[i] = data[`jornada_acertos_nivel${i}`] || 0;
        }
        setAcertosAcumulados(acertos);
      }
    }
    fetchAcertos();
  }, [user]);

  const handleStartMission = (nivel: number) => {
    const success = startMission(nivel);
    if (success) {
      setShowMissionModal(true);
    } else {
      alert('Não foi possível iniciar a missão. Verifique suas tentativas restantes.');
    }
  };

  const handleCloseMissionModal = () => {
    setShowMissionModal(false);
    cancelMission();
  };

  const handleAnswerQuestion = (optionId: string) => {
    answerMissionQuestion(optionId);
  };

  const handleNextQuestion = () => {
    // Auto-avanço já é tratado no modal
  };

  const handleFinishMission = () => {
    setShowMissionModal(false);
    // finishMission() é chamado automaticamente no modal
  };

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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] pt-24 sm:pt-28 px-4 text-center">
        <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-4 select-none">
          Jornada Médica
        </h1>
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 flex items-center gap-2 text-sm sm:text-base font-semibold text-center mt-2 mb-8 max-w-2xl mx-auto shadow">
          <span className="text-xl">⭐</span>
          Supere-se! Complete todas as missões e desbloqueie recompensas exclusivas na sua jornada.
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-0 py-8">
        {/* Missões da Jornada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission, idx) => {
          const acertos = acertosAcumulados[mission.nivel] || 0;
          // Missão está concluída se atingiu a meta de acertos acumulados
          const metaAtingida = acertos >= mission.questoes;
          // Missão 1 sempre desbloqueada
          const isFirst = mission.nivel === 1;
          // Missão está desbloqueada se a anterior foi concluída (meta atingida)
          const prevMission = missions.find(m => m.nivel === mission.nivel - 1);
          const unlocked = isFirst || (prevMission && (acertosAcumulados[prevMission.nivel] || 0) >= prevMission.questoes);
          // Status visual
          const status = metaAtingida ? 'concluido' : (mission.status === 'em_andamento' ? 'em_andamento' : 'disponivel');
          return (
            <JornadaMissionCard
              key={mission.nivel}
              nivel={mission.nivel}
              totalNiveis={10}
              questoes={mission.questoes}
              xp={mission.xp}
              tentativasRestantes={mission.tentativasRestantes}
              timerPorQuestao={mission.timerPorQuestao}
              status={status}
              onStart={() => handleStartMission(mission.nivel)}
              locked={!unlocked}
              acertosAcumulados={acertos}
            />
          );
        })}
        </div>
      </div>

      {/* Modal de execução da missão */}
      {showMissionModal && isMissionActive && currentMission && (
        <JornadaMissionModal
          isOpen={showMissionModal}
          onClose={handleCloseMissionModal}
          mission={currentMission}
          questions={missionQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onAnswer={handleAnswerQuestion}
          onNext={goToNextMissionQuestion}
          onFinish={handleFinishMission}
        />
      )}
    </div>
  );
}