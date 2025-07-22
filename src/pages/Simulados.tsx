import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CustomSimuladoCard } from '@/components/CustomSimuladoCard';
import { SimuladoCard } from '@/components/SimuladoCard';
import { SimuladoModal } from '@/components/SimuladoModal';

import { getQuestionsByYearAndType } from '@/utils/questionSelector';
import { Question } from '@/types/question';
import { CustomMission } from '@/types/missions';
import { useAudio } from '@/hooks/useAudio';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

// Dados mockados de simulados fixos (níveis)
const SIMULADOS_FIXOS = [
  {
    nivel: 1,
    questoes: 20,
    xp: 200,
    timerPorQuestao: 3,
    tentativas: 3,
  },
  {
    nivel: 2,
    questoes: 30,
    xp: 350,
    timerPorQuestao: 2,
    tentativas: 2,
  },
  {
    nivel: 3,
    questoes: 40,
    xp: 500,
    timerPorQuestao: 2,
    tentativas: 1,
  },
];

// Defina um tipo unificado para simulados fixos e personalizados

type SimuladoAtivo = {
  nivel: number;
  questoes: number;
  xp: number;
  timerPorQuestao: number;
  tentativas: number;
  title?: string;
  isCustom?: boolean;
  filters?: any;
  nomeExibicao?: string;
};

export default function Simulados() {
  // Estado de progresso e tentativas por simulado (mock)
  const [acertos, setAcertos] = useState<{ [nivel: number]: number }>({});
  const [status, setStatus] = useState<{ [nivel: number]: 'disponivel' | 'em_andamento' | 'concluido' }>({});
  const [tentativasRestantes, setTentativasRestantes] = useState<{ [nivel: number]: number }>({
    1: 3,
    2: 2,
    3: 1,
  });

  // Modal de execução
  const [modalOpen, setModalOpen] = useState(false);
  const [simuladoAtivo, setSimuladoAtivo] = useState<SimuladoAtivo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Estado para simulado personalizado
  const [customSimulado, setCustomSimulado] = useState<CustomMission | null>(null);

  // Mock de usuário admin para exemplo
  const user = { role: 'admin' }; // Substitua pelo hook/contexto real de auth se necessário

  // Lógica de bloqueio: só desbloqueia o próximo se o anterior estiver concluído
  const totalNiveis = SIMULADOS_FIXOS.length;

  const { playSound } = useAudio();
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { getFeatureLimit, updateUsage } = useSubscription();
  const { toast } = useToast();

  const handleStartSimulado = (nivel: number) => {
    const simulado = SIMULADOS_FIXOS.find(s => s.nivel === nivel);
    if (!simulado) return;
    // Mock: pega questões do ano 2022 e embaralha
    const todasQuestoes = getQuestionsByYearAndType(2022, null);
    const questoesSelecionadas = todasQuestoes.slice(0, simulado.questoes);
    setSimuladoAtivo(simulado);
    setQuestions(questoesSelecionadas);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setModalOpen(true);
    setStatus((prev) => ({ ...prev, [nivel]: 'em_andamento' }));
    setTentativasRestantes((prev) => ({
      ...prev,
      [nivel]: prev[nivel] > 0 ? prev[nivel] - 1 : 0,
    }));
  };

  // Novo: iniciar simulado personalizado com controle de limite
  const handleStartCustomSimulado = async (simulado: CustomMission) => {
    const simuladoLimit = getFeatureLimit('simulados');
    if (!simuladoLimit.unlimited && simuladoLimit.used >= simuladoLimit.limit) {
      toast({
        title: 'Limite de simulados atingido',
        description: `Você já finalizou ${simuladoLimit.used}/${simuladoLimit.limit} simulados personalizados este mês. Faça upgrade para acesso ilimitado!`,
        variant: 'destructive',
      });
      return;
    }
    setShowCountdown(true);
    setCountdown(5);
    let tick = 5;
    const interval = setInterval(() => {
      tick--;
      setCountdown(tick);
      playSound('click');
      if (tick === 0) {
        clearInterval(interval);
        setShowCountdown(false);
        // Mock: pega questões do ano 2022 e embaralha
        const todasQuestoes = getQuestionsByYearAndType(2022, null);
        // Embaralhar as questões (Fisher-Yates)
        const shuffled = [...todasQuestoes];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // Seleciona a quantidade de questões do filtro
        const questoesSelecionadas = shuffled.slice(0, simulado.targetQuestions);
        setSimuladoAtivo({
          nivel: 0,
          questoes: simulado.targetQuestions,
          xp: simulado.reward.xp,
          timerPorQuestao: simulado.filters?.timePerQuestion || 3,
          tentativas: 1,
          title: simulado.title,
          isCustom: true,
          filters: simulado.filters,
          nomeExibicao: simulado.title,
        });
        setQuestions(questoesSelecionadas);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setModalOpen(true);
        setCustomSimulado(simulado);
      }
    }, 1000);
    playSound('click');
    // O restante do fluxo é iniciado após a contagem
    return;
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSimuladoAtivo(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (optionId: string) => {
    if (!questions[currentQuestionIndex]) return;
    setAnswers((prev) => ({ ...prev, [questions[currentQuestionIndex].id]: optionId }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Ao finalizar um simulado personalizado, incrementar contador
  const handleFinish = async () => {
    if (simuladoAtivo) {
      setStatus((prev) => ({ ...prev, [simuladoAtivo.nivel]: 'concluido' }));
      setAcertos((prev) => ({
        ...prev,
        [simuladoAtivo.nivel]: Object.entries(answers).filter(([qid, aid]) => {
          const q = questions.find(q => q.id === Number(qid));
          return q && q.correct === aid;
        }).length,
      }));
      // Se for simulado personalizado, incrementar contador
      if (simuladoAtivo.isCustom) {
        await updateUsage('simulados', 1);
      }
    }
    handleCloseModal();
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
      {/* Navbar só aparece se o modal não estiver aberto */}
      {!modalOpen && <Navbar />}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] pt-24 sm:pt-28 px-4 text-center">
        <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-4 select-none">
          Simulados Revalida
        </h1>
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 flex items-center gap-2 text-sm sm:text-base font-semibold text-center mt-2 mb-8 max-w-2xl mx-auto shadow">
          <span className="text-xl">📚</span>
          Teste seus conhecimentos com simulados oficiais do Revalida e prepare-se para o exame!
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-0 py-8">
        {/* Card de Simulado Personalizado - Topo */}
        <div className="mb-8">
          <CustomSimuladoCard onStartSimulado={handleStartCustomSimulado} tentativasRestantes={tentativasRestantes[0] ?? 3} />
          

          {/* Modal de contagem regressiva */}
          {showCountdown && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center gap-6 border-4 border-blue-300 animate-fade-in">
                <span className="text-2xl font-bold text-blue-700 mb-2">O simulado começa em...</span>
                <span className="text-7xl font-extrabold text-blue-900 animate-pulse">{countdown}</span>
              </div>
            </div>
          )}
          {/* Botão de reset de tentativas - visível apenas para admin */}
        </div>
        {/* Grid de simulados fixos gamificados */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIMULADOS_FIXOS.map((simulado, idx) => {
            const nivel = simulado.nivel;
            const isFirst = nivel === 1;
            const prevConcluido = status[nivel - 1] === 'concluido' || isFirst;
            const locked = !isFirst && !prevConcluido;
            const simStatus = status[nivel] || 'disponivel';
            return (
              <SimuladoCard
                key={nivel}
                nivel={nivel}
                totalNiveis={totalNiveis}
                questoes={simulado.questoes}
                xp={simulado.xp}
                tentativasRestantes={tentativasRestantes[nivel] ?? simulado.tentativas}
                timerPorQuestao={simulado.timerPorQuestao}
                status={simStatus}
                onStart={() => handleStartSimulado(nivel)}
                locked={locked}
                acertosAcumulados={acertos[nivel] ?? 0}
              />
            );
          })}
        </div> */}
      </div>
      {/* Modal de execução do simulado */}
      {simuladoAtivo && (
        <SimuladoModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSimuladoAtivo(null);
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setAnswers({});
            setCustomSimulado(null);
          }}
          simulado={simuladoAtivo}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onFinish={handleFinish}
          nomeExibicao={simuladoAtivo.isCustom && simuladoAtivo.filters ?
            `${simuladoAtivo.questoes} questões • ${simuladoAtivo.timerPorQuestao} min/questão • Áreas: ${simuladoAtivo.filters.medicalAreas?.includes('Todas') ? 'Todas' : simuladoAtivo.filters.medicalAreas?.join(', ')}`
            : undefined}
        />
      )}
    </div>
  );
} 