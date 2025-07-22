import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { useGamification } from './useGamification';
import { useAuth } from './useAuth';
import { useSubscription } from './useSubscription';
import { type Question } from '@/types/question';
import { supabase } from '@/integrations/supabase/client';

interface JornadaMission {
  nivel: number;
  questoes: number;
  xp: number;
  timerPorQuestao: number;
  status: 'disponivel' | 'em_andamento' | 'concluido';
  tentativasRestantes: number | 'ilimitado';
}

interface JornadaMissionProgress {
  nivel: number;
  questoesRespondidas: number;
  acertos: number;
  tentativasUsadas: number;
  tempoGasto: number;
  concluido: boolean;
}

export function useJornadaMissions() {
  const { todasQuestoes } = useQuestions();
  const { user } = useAuth();
  const { addXP, answerQuestion: gamificationAnswerQuestion } = useGamification();
  const { isFreePlan, isBasicPlan, isPremiumPlan, isEnterprisePlan } = useSubscription();

  // Estado das missões
  const [missions, setMissions] = useState<JornadaMission[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      nivel: i + 1,
      questoes: (i + 1) * 10,
      xp: (i + 1) * 100,
      timerPorQuestao: 2,
      status: 'disponivel' as const,
      tentativasRestantes: 0, // Inicializa como 0, será atualizado por useEffect
    }));
  });

  // Estado do progresso
  const [progress, setProgress] = useState<Record<number, JornadaMissionProgress>>({});

  // Estado da missão atual
  const [currentMission, setCurrentMission] = useState<JornadaMission | null>(null);
  const [missionQuestions, setMissionQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isMissionActive, setIsMissionActive] = useState(false);

  // Função para obter tentativas restantes - SEMPRE ILIMITADO
  async function getTentativasRestantesSupabase(nivel: number): Promise<number | 'ilimitado'> {
    // Sempre retorna tentativas ilimitadas
    return 'ilimitado';
  }

  // Função para selecionar questões válidas para uma missão
  const selectQuestionsForMission = useCallback((nivel: number, quantidade: number): Question[] => {
    console.log(`🎯 Selecionando ${quantidade} questões para missão nível ${nivel}`);
    
    // Filtrar questões válidas e completas
    const questoesValidas = todasQuestoes.filter(questao => {
      // Excluir questões com imagem/tabela
      if (questao.enunciado.includes('<img') || questao.enunciado.includes('<table')) return false;
      // Excluir enunciados muito extensos ou muito curtos
      if (questao.enunciado.length < 30 || questao.enunciado.length > 500) return false;
      // Excluir placeholders
      if (/continue with question|option a|option b|option c|option d/i.test(questao.enunciado)) return false;
      // Opções devem ser array de objetos com id/text
      if (!Array.isArray(questao.options) || questao.options.length < 2) return false;
      if (questao.options.some(opt => !opt.text || opt.text.length < 2)) return false;
      // Gabarito deve existir entre as opções
      if (!questao.options.some(opt => opt.id === questao.correct)) return false;
      return true;
    });

    console.log(`✅ ${questoesValidas.length} questões válidas encontradas`);

    // Selecionar questões aleatoriamente
    const questoesSelecionadas: Question[] = [];
    const questoesDisponiveis = [...questoesValidas];

    for (let i = 0; i < Math.min(quantidade, questoesDisponiveis.length); i++) {
      const randomIndex = Math.floor(Math.random() * questoesDisponiveis.length);
      questoesSelecionadas.push(questoesDisponiveis[randomIndex]);
      questoesDisponiveis.splice(randomIndex, 1);
    }

    console.log(`🎯 ${questoesSelecionadas.length} questões selecionadas para missão nível ${nivel}`);
    return questoesSelecionadas;
  }, [todasQuestoes]);

  // Função para iniciar uma missão
  const startMission = useCallback(async (nivel: number): Promise<boolean> => {
    console.log(`🚀 Iniciando missão nível ${nivel}`);
    const mission = missions.find(m => m.nivel === nivel);
    if (!mission) {
      console.error(`❌ Missão nível ${nivel} não encontrada`);
      return false;
    }
    // Consultar tentativas restantes no Supabase - SEMPRE PERMITE
    const tentativasRestantes = await getTentativasRestantesSupabase(nivel);
    // Sempre permite iniciar (tentativas ilimitadas)
    console.log(`✅ Tentativas ilimitadas para missão nível ${nivel}`);
    // Registrar tentativa no Supabase
    if (user) {
      await supabase.rpc<any, any>('register_mission_attempt', {
        user_id_input: user.id,
        mission_id_input: `jornada_nivel_${nivel}`
      });
    }
    // Selecionar questões para a missão
    const questoes = selectQuestionsForMission(nivel, mission.questoes);
    if (questoes.length < mission.questoes) {
      console.error(`❌ Questões insuficientes para missão nível ${nivel}`);
      return false;
    }
    setCurrentMission(mission);
    setMissionQuestions(questoes);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsMissionActive(true);
    setMissions(prev => prev.map(m => m.nivel === nivel ? { ...m, status: 'em_andamento' as const } : m));
    return true;
  }, [missions, selectQuestionsForMission, user, isPremiumPlan, isBasicPlan, isEnterprisePlan]);

  // Função para responder uma questão
  const answerMissionQuestion = useCallback((optionId: string) => {
    if (!isMissionActive || !currentMission || !missionQuestions[currentQuestionIndex]) {
      return;
    }

    const currentQuestion = missionQuestions[currentQuestionIndex];
    const isCorrect = currentQuestion.correct === optionId;

    console.log(`📝 Respondendo questão ${currentQuestionIndex + 1}/${missionQuestions.length}: ${isCorrect ? 'Correto' : 'Incorreto'}`);

    // Registrar resposta
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id.toString()]: optionId
    }));

    // Registrar no sistema de gamificação
    gamificationAnswerQuestion(isCorrect, currentQuestion.area, currentQuestion.id);
    // Não avançar automaticamente!
  }, [isMissionActive, currentMission, missionQuestions, currentQuestionIndex, gamificationAnswerQuestion]);

  // Função para finalizar missão
  const finishMission = useCallback(() => {
    if (!currentMission) return;

    const correctAnswers = missionQuestions.filter(q => 
      answers[q.id.toString()] === q.correct
    ).length;

    const accuracy = (correctAnswers / missionQuestions.length) * 100;
    const missionCompleted = accuracy >= 70; // 70% de acerto para completar

    console.log(`🏁 Missão nível ${currentMission.nivel} finalizada: ${correctAnswers}/${missionQuestions.length} (${accuracy.toFixed(1)}%)`);

    // Adicionar XP
    if (missionCompleted) {
      addXP(currentMission.xp);
      console.log(`🎉 +${currentMission.xp} XP adicionado`);
    }

    // Atualizar progresso
    setProgress(prev => ({
      ...prev,
      [currentMission.nivel]: {
        nivel: currentMission.nivel,
        questoesRespondidas: missionQuestions.length,
        acertos: correctAnswers,
        tentativasUsadas: 1, // TODO: Implementar controle real de tentativas
        tempoGasto: 0, // TODO: Implementar timer
        concluido: missionCompleted,
      }
    }));

    // Atualizar tentativas usadas no localStorage
    // Remover toda lógica de localStorage para tentativas

    // Atualizar status da missão
    setMissions(prev => prev.map(m =>
      m.nivel === currentMission.nivel 
        ? { 
            ...m, 
            status: missionCompleted ? 'concluido' as const : 'disponivel' as const
          }
        : m
    ));

    // Resetar estado da missão
    setCurrentMission(null);
    setMissionQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsMissionActive(false);
  }, [currentMission, missionQuestions, answers, addXP, user, isPremiumPlan, isBasicPlan, isEnterprisePlan]);

  // Nova função para avançar questão
  const goToNextMissionQuestion = useCallback(() => {
    if (currentQuestionIndex < missionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishMission();
    }
  }, [currentQuestionIndex, missionQuestions.length, finishMission]);

  // Função para cancelar missão
  const cancelMission = useCallback(() => {
    console.log('❌ Missão cancelada');
    setCurrentMission(null);
    setMissionQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsMissionActive(false);
  }, []);

  // Atualizar tentativasRestantes no estado das missões ao carregar
  useEffect(() => {
    async function updateTentativasRestantes() {
      const atualizadas: JornadaMission[] = [];
      for (let i = 1; i <= 10; i++) {
        const tent = await getTentativasRestantesSupabase(i);
        atualizadas.push({
          nivel: i,
          questoes: i * 10,
          xp: i * 100,
          timerPorQuestao: 2,
          status: 'disponivel' as const,
          tentativasRestantes: tent,
        });
      }
      setMissions(atualizadas);
    }
    
    if (user) {
      updateTentativasRestantes();
    }
  }, [user, isPremiumPlan, isBasicPlan, isEnterprisePlan]);



  // Função para contar missões completas
  function getCompletedMissionsCount() {
    return Object.values(progress).filter(p => p.concluido).length;
  }

  return {
    // Estado
    missions,
    currentMission,
    missionQuestions,
    currentQuestionIndex,
    answers,
    isMissionActive,
    progress,

    // Ações
    startMission,
    answerMissionQuestion,
    goToNextMissionQuestion,
    finishMission,
    cancelMission,
    selectQuestionsForMission,

    // Utilitários
    getCompletedMissionsCount,
  };
}