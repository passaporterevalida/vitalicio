import { useState, useEffect, useRef } from 'react';
import { Question } from '@/types/question';
import { useAudio } from '@/hooks/useAudio';
import { useGamification } from '@/hooks/useGamification';
import { FloatingTimer } from '@/components/FloatingTimer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, ArrowLeft, ArrowRight, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { ConfettiAnimation } from './ConfettiAnimation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { XPPillAnimation } from './XPPillAnimation';
import { useXPPillAnimation } from '@/hooks/useXPPillAnimation';
import { SimuladoAIAnalysis } from './SimuladoAIAnalysis';

interface SimuladoModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulado: {
    nivel: number;
    questoes: number;
    xp: number;
    timerPorQuestao: number;
    title?: string;
    badge?: string;
    nomeExibicao?: string;
    isCustom?: boolean;
    filters?: {
      questionCount: number;
      timePerQuestion: number;
      medicalAreas: string[];
      totalTime?: number; // Adicionado para o timer global
    };
  };
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  onFinish: () => void;
  nomeExibicao?: string;
}

// Hook utilitário para ancoragem suave
function useSmoothAnchor() {
  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return scrollToRef;
}

export function SimuladoModal({
  isOpen,
  onClose,
  simulado,
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onFinish,
  nomeExibicao,
}: SimuladoModalProps) {
  const { playSound } = useAudio();
  const { userProgress, addXP } = useGamification();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Detectar simulado personalizado antes de qualquer hook
  const isCustom = (simulado as any).isCustom;
  const customFilters = isCustom ? (simulado as any).filters : undefined;
  const customAreas = customFilters?.medicalAreas?.includes('Todas') ? 'Todas' : customFilters?.medicalAreas?.join(', ');

  // Definição segura do nome do simulado para uso em todas as etapas
  const nomeSimulado = isCustom
    ? (simulado.title || 'Simulado Personalizado')
    : (nomeExibicao || simulado.nomeExibicao || `Simulado Nível ${simulado.nivel}`);
  const nomeSimuladoFinalizado = (nomeSimulado.toLowerCase().includes('surpresa'))
    ? 'Simulado Surpresa finalizado'
    : `${nomeSimulado} Concluído!`;

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(simulado.timerPorQuestao * 60); // em segundos
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [streak, setStreak] = useState(0);
  const [showPill, setShowPill] = useState(false);
  const pillTimeout = useRef<NodeJS.Timeout | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [feedbackAnimation, setFeedbackAnimation] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [showPerformanceCard, setShowPerformanceCard] = useState(false);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [simuladoResults, setSimuladoResults] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    timeSpent: number;
    streak: number;
    xpEarned: number;
  } | null>(null);
  const [acertosAcumulados, setAcertosAcumulados] = useState<number | null>(null);

  // XP acumulado no simulado personalizado
  const [xpAcumulado, setXpAcumulado] = useState(0);

  // Cronômetro global para simulado personalizado
  const [customTotalTimeLeft, setCustomTotalTimeLeft] = useState(() => {
    if (isCustom && customFilters?.totalTime) {
      return customFilters.totalTime * 60; // minutos para segundos
    }
    return 0;
  });
  const [customTimerRunning, setCustomTimerRunning] = useState(isCustom);

  // IDs das questões corretas do usuário
  const [correctQuestions, setCorrectQuestions] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;
  const progress = (currentQuestionIndex / questions.length) * 100;
  const correctAnswers = questions.filter(q => answers[String(q.id)] === String(q.correct)).length;

  const scrollToRef = useSmoothAnchor();
  const enunciadoRef = useRef<HTMLDivElement>(null);
  const confirmarRef = useRef<HTMLDivElement>(null);
  const proximaRef = useRef<HTMLDivElement>(null);

  // LOGS PARA DEBUG
  useEffect(() => {
    console.log('currentQuestion', currentQuestion);
    if (currentQuestion) {
      console.log('enunciado', currentQuestion.enunciado);
      console.log('options', currentQuestion.options);
    }
  }, [currentQuestion]);

  // Timer global para simulado personalizado
  useEffect(() => {
    if (!isOpen || !isCustom || !customTimerRunning) return;
    const interval = setInterval(() => {
      setCustomTotalTimeLeft(prev => {
        if (prev <= 1) {
          setCustomTimerRunning(false);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCustom, customTimerRunning, onFinish]);

  // Timer por questão
  useEffect(() => {
    if (!isOpen || isCustom || !isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          playSound('incorrect');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCustom, isTimerRunning, playSound]);

  // Avançar automaticamente ao acabar o tempo
  useEffect(() => {
    if (!isCustom && timeLeft === 0 && isOpen) {
      if (!showFeedback) {
        setShowFeedback(true);
        setLastAnswerCorrect(false);
        setTimeout(() => {
          if (!isLastQuestion) {
            handleNextQuestion();
          } else {
            onFinish();
          }
        }, 1200); // Pequeno delay para feedback visual
      }
    }
  }, [isCustom, timeLeft, isOpen, showFeedback, isLastQuestion, onFinish]);

  useEffect(() => {
    if (isCustom) {
      if (currentQuestionIndex === 0 && customFilters?.totalTime) {
        setCustomTotalTimeLeft(customFilters.totalTime * 60);
        setCustomTimerRunning(true);
      }
    } else {
    setTimeLeft(simulado.timerPorQuestao * 60);
    setIsTimerRunning(true);
    }
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    if (currentQuestionIndex === 0) {
      setTotalTimeSpent(0);
    }
  }, [currentQuestionIndex, simulado.timerPorQuestao, isCustom, customFilters]);

  // Ancorar ao abrir nova questão
  useEffect(() => {
    if (isOpen && enunciadoRef.current) {
      setTimeout(() => scrollToRef(enunciadoRef), 100);
    }
  }, [currentQuestionIndex, isOpen]);

  // Ancorar ao selecionar opção
  useEffect(() => {
    if (pendingConfirmation && confirmarRef.current) {
      setTimeout(() => scrollToRef(confirmarRef), 100);
    }
  }, [pendingConfirmation]);

  // Ancorar ao mostrar feedback (após confirmar resposta)
  useEffect(() => {
    if (showFeedback && proximaRef.current) {
      setTimeout(() => scrollToRef(proximaRef), 100);
    }
  }, [showFeedback]);

  // Ocultar navbar enquanto o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-simulado-aberta');
    } else {
      document.body.classList.remove('modal-simulado-aberta');
    }
    return () => {
      document.body.classList.remove('modal-simulado-aberta');
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && user) {
      fetchAcertosAcumulados();
    }
  }, [isOpen, user]);

  const fetchAcertosAcumulados = async () => {
    if (!user) return;
    const fields = Array.from({ length: 10 }, (_, i) => `jornada_acertos_nivel${i + 1}`);
    const { data, error } = await supabase
      .from('user_profiles')
      .select(fields.join(','))
      .eq('user_id', user.id)
      .maybeSingle();
    if (data) {
      setAcertosAcumulados(data[`jornada_acertos_nivel${simulado.nivel}`] || 0);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
    setPendingConfirmation(true);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || showFeedback) return;
    
    setPendingConfirmation(false);
    setShowFeedback(true);
    
    const isCorrect = String(currentQuestion.correct) === selectedAnswer;
    setLastAnswerCorrect(isCorrect);
    
    // Animar feedback
    setFeedbackAnimation(isCorrect ? 'correct' : 'incorrect');
    
    // Tocar som
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    // Atualizar streak
    if (isCorrect) {
      setStreak(prev => prev + 1);
      setShowPill(true);
      if (pillTimeout.current) clearTimeout(pillTimeout.current);
      pillTimeout.current = setTimeout(() => setShowPill(false), 2000);
      // XP acumulado apenas para simulado personalizado
      if (isCustom) {
        setXpAcumulado(prev => prev + 10);
        setCorrectQuestions(prev => prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id]);
      }
    } else {
      setStreak(0);
    }
    
    // Registrar resposta
    onAnswer(selectedAnswer);
    
    // Para simulados fixos, auto-avançar após delay
    if (!isCustom) {
    setTimeout(() => {
      if (!isLastQuestion) {
        handleNextQuestion();
      } else {
        handleFinishSimulado();
      }
    }, 1500);
    }
    // Para simulados personalizados, aguardar clique do usuário no botão 'Próxima Questão'
  };

  const handleNextQuestion = () => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    
    // Resetar estado
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    setPendingConfirmation(false);
    setFeedbackAnimation('none');
    
    // Avançar questão
    onNext();
    
    // Resetar flag após um delay
    setTimeout(() => setIsAdvancing(false), 100);
  };

  // Novo estado de etapa do modal
  const [step, setStep] = useState<'execucao' | 'resumo' | 'ia'>('execucao');

  // Ao finalizar simulado, muda para etapa de resumo
  const handleFinishSimulado = async () => {
    const totalQuestions = questions.length;
    const correctCount = questions.filter(q => answers[String(q.id)] === String(q.correct)).length;
    const accuracy = (correctCount / totalQuestions) * 100;
    const xpEarned = isCustom ? xpAcumulado : Math.floor(accuracy / 10) * simulado.xp;

    setSimuladoResults({
      totalQuestions,
      correctAnswers: correctCount,
      accuracy,
      timeSpent: totalTimeSpent,
      streak,
      xpEarned
    });
    setShowPerformanceCard(true);
    setStep('resumo');
    console.log('[SimuladoModal] handleFinishSimulado: setShowPerformanceCard(true)', { isCustom, totalQuestions, correctCount, accuracy, xpEarned });

    // Salvar progresso no banco
    if (user && !isCustom) {
      const currentAcertos = acertosAcumulados || 0;
      const newAcertos = Math.max(currentAcertos, correctCount);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ [`jornada_acertos_nivel${simulado.nivel}`]: newAcertos })
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    }
    // Adicionar XP ao usuário no contexto/backend se for simulado personalizado
    if (user && isCustom && xpAcumulado > 0) {
      addXP(xpAcumulado);
    }
    // Não chamar onFinish() aqui para simulados personalizados, pois ele pode fechar o modal antes do resumo aparecer
    if (!isCustom) {
      // Não fecha o modal, só muda para resumo
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };

  // Remover o return condicional do modal de resumo padrão para simulados personalizados
  if (!isOpen) return null;

  // Renderização condicional por etapa
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
      {/* Etapa de resumo de desempenho: card centralizado, sem container lateral */}
      {step === 'resumo' && simuladoResults ? (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden mx-auto animate-fade-in flex flex-col">
          {/* Header simplificado */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
            <h2 className="text-xl font-bold mb-2">
              {nomeSimuladoFinalizado}
            </h2>
            <div className="text-3xl font-bold">
              {simuladoResults.correctAnswers}/{simuladoResults.totalQuestions}
            </div>
            <div className="text-sm opacity-90">
              {simuladoResults.accuracy.toFixed(1)}% de acerto
            </div>
            {acertosAcumulados !== null && (
              <div className="mt-2 text-green-100 text-sm font-semibold">
                Acertos acumulados: <span className="text-white font-bold">{acertosAcumulados}</span>
              </div>
            )}
            {/* Botão de fechar */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 text-white hover:bg-white/10"
            >
              <XCircle className="w-6 h-6" />
            </Button>
          </div>
          {/* Conteúdo enxuto */}
          <div className="p-6 space-y-4">
            {/* Status do simulado */}
            <div className={`text-center p-3 rounded-lg ${
              simuladoResults.accuracy >= 70 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-orange-50 text-orange-800 border border-orange-200'
            }`}>
              <div className="font-semibold">
                {simuladoResults.accuracy >= 70 ? '✅ Simulado Concluído!' : '📈 Continue Praticando!'}
              </div>
            </div>
            {/* Estatísticas essenciais */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tempo */}
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Tempo</div>
                <div className="font-bold text-gray-800">
                  {Math.floor(simuladoResults.timeSpent / 60)}:{(simuladoResults.timeSpent % 60).toString().padStart(2, '0')}
                </div>
              </div>
              {/* XP */}
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600 mb-1">XP Ganho</div>
                <div className="font-bold text-green-800">
                  +{simuladoResults.xpEarned}
                </div>
              </div>
            </div>
            {/* Barra de progresso */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Aproveitamento</span>
                <span className="font-semibold">{simuladoResults.accuracy.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    simuladoResults.accuracy >= 70 ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min(simuladoResults.accuracy, 100)}%` }}
                />
              </div>
            </div>
            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  onFinish();
                  onClose();
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                {isCustom ? 'Voltar' : 'Voltar aos Simulados'}
              </Button>
              {!isCustom && simuladoResults.accuracy < 70 && (
                <Button
                  onClick={() => {
                    onFinish();
                    setShowPerformanceCard(false);
                    setSimuladoResults(null);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Tentar Novamente
                </Button>
              )}
              {isCustom && (
                <Button
                  onClick={() => {
                    setStep('ia');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Análise por IA
                </Button>
              )}
            </div>
          </div>
          {/* Confetti apenas para simulado concluído */}
          {simuladoResults.accuracy >= 70 && (
            <ConfettiAnimation trigger={true} />
          )}
        </div>
      ) : step === 'execucao' || step === 'ia' ? (
        <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl w-full h-full sm:max-w-4xl sm:h-auto max-h-full overflow-hidden relative flex flex-col">
          {/* Botão de fechar sempre visível */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-700 hover:bg-gray-200/60"
          >
            <XCircle className="w-6 h-6" />
          </Button>
          {/* Etapa de execução do simulado */}
          {step === 'execucao' && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <h2 className={`font-bold flex items-center gap-2 ${isCustom ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
                      {nomeSimulado}
                      {/* Cronômetro global para simulado personalizado */}
                      {isCustom ? (
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-base font-bold ml-2 shadow-md transition-all duration-200
                          ${customTotalTimeLeft <= 30 ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
                        `}>
                          <Clock className="w-5 h-5" />
                          {formatTime(customTotalTimeLeft)}
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-base font-bold ml-2 shadow-md transition-all duration-200
                          ${timeLeft <= 30 ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
                        `}>
                          <Clock className="w-5 h-5" />
                          {formatTime(timeLeft)}
                        </span>
                      )}
                    </h2>
                    {/* Subtítulo customizado para simulado personalizado */}
                    {isCustom && (
                      <div className="text-sm font-semibold text-blue-100/90 mt-1">
                        {customFilters?.questionCount} questões • {customFilters?.timePerQuestion} min/questão • Áreas: {customAreas}
                      </div>
                    )}
                  </div>
                  {/* Pill Animation para resposta correta */}
                  {showPill && (
                    <div className={`ml-2 animate-bounce-in flex items-center gap-1 px-3 py-1 rounded-full ${isCustom ? 'bg-green-500 border-green-700' : 'bg-blue-500 border-blue-700'} text-white font-bold shadow-lg border-2`}>
                      <CheckCircle className="w-4 h-4" />{isCustom ? ' +10 XP' : ' +1 XP'}
                    </div>
                  )}
                </div>
                {/* Progresso e acertos com borda gamificada */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Questão {currentQuestionIndex + 1} de {questions.length}</span>
                      <span>{correctAnswers} acertos</span>
                    </div>
                    <div className="rounded-full border-2 border-yellow-400 shadow-inner overflow-hidden mt-1">
                      <Progress value={progress} className="h-2 bg-gradient-to-r from-yellow-200 to-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Conteúdo rolável do simulado */}
              <div ref={cardRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6" style={{ minHeight: 0 }}>
                <div ref={enunciadoRef} className={`bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
                  feedbackAnimation === 'correct' ? 'animate-gamified-correct' : ''
                } ${feedbackAnimation === 'incorrect' ? 'animate-gamified-incorrect' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">Questão {currentQuestionIndex + 1}</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300 text-xs font-bold ml-2">
                      <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Simulado
                    </span>
                  </div>
                  <div 
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.enunciado }}
                  />
                </div>

                {/* Opções */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    // Determinar estilos de feedback
                    let borderClass = 'border-gray-200';
                    let bgClass = '';
                    if (showFeedback) {
                      if (option.id === String(currentQuestion.correct)) {
                        borderClass = 'border-green-500';
                        bgClass = 'bg-green-50';
                      } else if (selectedAnswer === option.id && selectedAnswer !== String(currentQuestion.correct)) {
                        borderClass = 'border-red-500';
                        bgClass = 'bg-red-50';
                      }
                    } else if (selectedAnswer === option.id) {
                      borderClass = 'border-blue-500';
                      bgClass = 'bg-blue-50';
                    }
                    // Letra da alternativa
                    const altLetter = String.fromCharCode(65 + idx);
    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(option.id)}
                        disabled={showFeedback}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${borderClass} ${bgClass} ${showFeedback ? 'pointer-events-none' : 'cursor-pointer'} ${!showFeedback && selectedAnswer !== option.id ? 'hover:border-blue-300' : ''}`}
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-400 text-gray-700 text-base mr-2 select-none">
                          {altLetter}
                        </span>
                        <span className="text-gray-800">
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Botão Confirmar */}
                {selectedAnswer && !showFeedback && (
                  <div ref={confirmarRef} className="pt-4">
                    <Button
                      onClick={handleConfirmAnswer}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl"
                    >
                      Confirmar Resposta
                    </Button>
                  </div>
                )}

                {/* Feedback */}
                {showFeedback && (
                  <div ref={proximaRef} className="pt-4">
                    <div className={`p-4 rounded-xl border-2 ${
                      Boolean(lastAnswerCorrect) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-red-500 bg-red-50'
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        {Boolean(lastAnswerCorrect) ? (
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <span className={`font-bold ${
                          Boolean(lastAnswerCorrect) ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {Boolean(lastAnswerCorrect) ? 'Correto!' : 'Incorreto!'}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {/* Sempre mostra o texto da alternativa correta do gabarito oficial */}
                        Resposta correta: {currentQuestion.options.find(opt => opt.id === String(currentQuestion.correct))?.text}
                      </p>
                    </div>
                    {/* Botão Próxima Questão para simulados personalizados ou para fixos após delay */}
                    {!Boolean(isLastQuestion) && (
                      <Button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl mt-4"
                      >
                        Próxima Questão
                      </Button>
                    )}
                    {/* Para a última questão, finalizar simulado ao clicar */}
                    {Boolean(isLastQuestion) && isCustom && (
                      <Button
                        onClick={handleFinishSimulado}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl mt-4"
                      >
                        Finalizar Simulado
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Confetti para resposta correta */}
              {feedbackAnimation === 'correct' && showFeedback && (
                <ConfettiAnimation trigger={true} />
              )}
              {/* Shake para resposta errada */}
              {feedbackAnimation === 'incorrect' && showFeedback && (
                <div className="pointer-events-none absolute inset-0 z-50 animate-shake"></div>
              )}
            </>
          )}
          {/* Etapa de análise por IA */}
          {step === 'ia' && simuladoResults && (
            <SimuladoAIAnalysis
              questions={questions}
              answers={answers}
              timeSpent={simuladoResults.timeSpent}
              accuracy={simuladoResults.accuracy}
              correctAnswers={simuladoResults.correctAnswers}
              totalQuestions={simuladoResults.totalQuestions}
              onClose={onClose}
            />
          )}
        </div>
      ) : null}
    </div>
  );
} 