import { useState, useEffect, useRef } from 'react';
import { Question } from '@/types/question';
import { useAudio } from '@/hooks/useAudio';
import { useGamification } from '@/hooks/useGamification';
import { FloatingTimer } from '@/components/FloatingTimer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { ConfettiAnimation } from './ConfettiAnimation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface JornadaMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: {
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

export function JornadaMissionModal({
  isOpen,
  onClose,
  mission,
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onFinish,
  nomeExibicao,
}: JornadaMissionModalProps) {
  const { playSound } = useAudio();
  const { userProgress } = useGamification();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Detectar missão personalizada antes de qualquer hook
  const isCustom = (mission as any).isCustom;
  const customFilters = isCustom ? (mission as any).filters : undefined;
  const customAreas = customFilters?.medicalAreas?.includes('Todas') ? 'Todas' : customFilters?.medicalAreas?.join(', ');

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(mission.timerPorQuestao * 60); // em segundos
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
  const [missionResults, setMissionResults] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    timeSpent: number;
    streak: number;
    xpEarned: number;
  } | null>(null);
  const [acertosAcumulados, setAcertosAcumulados] = useState<number | null>(null);

  // Cronômetro global para missão personalizada
  const [customTotalTimeLeft, setCustomTotalTimeLeft] = useState(0);
  const [customTimerRunning, setCustomTimerRunning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;
  const progress = (currentQuestionIndex / questions.length) * 100;
  const correctAnswers = questions.filter(q => answers[q.id.toString()] === q.correct).length;

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

  // Timer por questão
  useEffect(() => {
    if (!isOpen || !isTimerRunning) return;

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
  }, [isOpen, isTimerRunning, playSound]);

  // Avançar automaticamente ao acabar o tempo
  useEffect(() => {
    if (timeLeft === 0 && isOpen) {
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
  }, [timeLeft, isOpen, showFeedback, isLastQuestion, onFinish]);

  useEffect(() => {
    setTimeLeft(mission.timerPorQuestao * 60);
    setIsTimerRunning(true);
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    // Resetar tempo total quando iniciar nova missão
    if (currentQuestionIndex === 0) {
      setTotalTimeSpent(0);
    }
  }, [currentQuestionIndex, mission.timerPorQuestao]);

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
      document.body.classList.add('modal-missao-aberta');
    } else {
      document.body.classList.remove('modal-missao-aberta');
    }
    return () => {
      document.body.classList.remove('modal-missao-aberta');
    };
  }, [isOpen]);

  useEffect(() => {
    if (isCustom) {
      // Tempo total em segundos
      const total = (customFilters?.questionCount || 0) * (customFilters?.timePerQuestion || 0) * 60;
      setCustomTotalTimeLeft(total);
      setCustomTimerRunning(true);
    }
  }, [isCustom, customFilters?.questionCount, customFilters?.timePerQuestion, isOpen]);

  useEffect(() => {
    if (isCustom && customTimerRunning && customTotalTimeLeft > 0) {
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
    }
  }, [isCustom, customTimerRunning, customTotalTimeLeft, onFinish]);

  const handleSelectOption = (optionId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
    setPendingConfirmation(true);
  };

  const handleConfirmAnswer = () => {
    if (!pendingConfirmation || !selectedAnswer) return;
    setPendingConfirmation(false);
    setShowFeedback(true);
    setIsTimerRunning(false);

    const isCorrect = currentQuestion.correct === selectedAnswer;
    setLastAnswerCorrect(isCorrect);

    playSound(isCorrect ? 'correct' : 'incorrect');
    onAnswer(selectedAnswer);

    // Streak logic
    setStreak(prev => isCorrect ? prev + 1 : 0);

    // Pill Animation para resposta correta
    if (isCorrect) {
      setShowPill(true);
      setFeedbackAnimation('correct');
      if (pillTimeout.current) clearTimeout(pillTimeout.current);
      pillTimeout.current = setTimeout(() => setShowPill(false), 1000);
    } else {
      setFeedbackAnimation('incorrect');
    }
  };

  const handleNextQuestion = () => {
    // Acumular tempo gasto na questão atual
    const timeSpentOnCurrentQuestion = (mission.timerPorQuestao * 60) - timeLeft;
    setTotalTimeSpent(prev => prev + timeSpentOnCurrentQuestion);

    setShowFeedback(false);
    setSelectedAnswer('');
    setPendingConfirmation(false);
    setLastAnswerCorrect(null);
    setIsTimerRunning(true);
    setTimeLeft(mission.timerPorQuestao * 60);
    setShowPill(false);
    setIsAdvancing(false);
    setFeedbackAnimation('none');
    onNext();
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFinishMission = async () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => answers[q.id.toString()] === q.correct).length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    // Adicionar tempo da última questão ao total acumulado
    const timeSpentOnLastQuestion = (mission.timerPorQuestao * 60) - timeLeft;
    const timeSpent = totalTimeSpent + timeSpentOnLastQuestion;
    const xpEarned = accuracy >= 70 ? mission.xp : Math.floor(accuracy / 10) * 10;

    // Atualizar acertos acumulados no Supabase
    if (user) {
      const nivel = mission.nivel;
      const field = `jornada_acertos_nivel${nivel}`;
      // Buscar valor atual
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select(field)
        .eq('user_id', user.id)
        .maybeSingle();
      let acumulado = 0;
      if (profile && profile[field] !== undefined && profile[field] !== null) {
        acumulado = profile[field];
      }
      let novoTotal = correctAnswers;
      if (user) {
        const nivel = mission.nivel;
        const field = `jornada_acertos_nivel${nivel}`;
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select(field)
          .eq('user_id', user.id)
          .maybeSingle();
        let acumulado = 0;
        if (profile && profile[field] !== undefined && profile[field] !== null) {
          acumulado = profile[field];
        }
        novoTotal = acumulado + correctAnswers;
        await supabase
          .from('user_profiles')
          .update({ [field]: novoTotal })
          .eq('user_id', user.id);
        setAcertosAcumulados(novoTotal);
      } else {
        setAcertosAcumulados(null);
      }
    }

    setMissionResults({
      totalQuestions,
      correctAnswers,
      accuracy,
      timeSpent,
      streak,
      xpEarned
    });
    setShowPerformanceCard(true);
  };

  // Função para formatar tempo mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !currentQuestion) return null;

  // Card de desempenho
  if (showPerformanceCard && missionResults) {
    const nomeMissaoFinalizada = (nomeExibicao || mission.nomeExibicao || `Missão Nível ${mission.nivel}`).toLowerCase().includes('surpresa') ? 'Missão Surpresa finalizada' : `${nomeExibicao || mission.nomeExibicao || `Missão Nível ${mission.nivel}`} Finalizada`;
    const isMissaoSurpresa = (nomeExibicao || mission.nomeExibicao || '').toLowerCase().includes('surpresa');
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header simplificado */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
            <h2 className="text-xl font-bold mb-2">
              {nomeMissaoFinalizada}
            </h2>
            <div className="text-3xl font-bold">
              {missionResults.correctAnswers}/{missionResults.totalQuestions}
            </div>
            <div className="text-sm opacity-90">
              {missionResults.accuracy.toFixed(1)}% de acerto
            </div>
            {acertosAcumulados !== null && (
              <div className="mt-2 text-green-100 text-sm font-semibold">
                Acertos acumulados: <span className="text-white font-bold">{acertosAcumulados}</span>
              </div>
            )}
          </div>

          {/* Conteúdo enxuto */}
          <div className="p-6 space-y-4">
            {/* Status da missão */}
            <div className={`text-center p-3 rounded-lg ${
              missionResults.accuracy >= 70 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-orange-50 text-orange-800 border border-orange-200'
            }`}>
              <div className="font-semibold">
                {missionResults.accuracy >= 70 ? '✅ Missão Concluída!' : '📈 Continue Praticando!'}
              </div>
            </div>

            {/* Estatísticas essenciais */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tempo */}
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Tempo</div>
                <div className="font-bold text-gray-800">
                  {Math.floor(missionResults.timeSpent / 60)}:{(missionResults.timeSpent % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* XP */}
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600 mb-1">XP Ganho</div>
                <div className="font-bold text-green-800">
                  +{missionResults.xpEarned}
                </div>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Aproveitamento</span>
                <span className="font-semibold">{missionResults.accuracy.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    missionResults.accuracy >= 70 ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min(missionResults.accuracy, 100)}%` }}
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  onFinish();
                  navigate(0);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {isMissaoSurpresa ? 'Voltar' : 'Voltar às Missões'}
              </Button>
              
              {!isMissaoSurpresa && missionResults.accuracy < 70 && (
                <Button
                  onClick={() => {
                    onFinish();
                    setShowPerformanceCard(false);
                    setMissionResults(null);
                    navigate(0);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Tentar Novamente
                </Button>
              )}
              {isMissaoSurpresa && missionResults.accuracy < 70 && (
                <Button
                  onClick={() => {
                    onFinish();
                    onClose();
                    navigate('/missions');
                    navigate(0);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Ir para missões
                </Button>
              )}
            </div>
          </div>

          {/* Confetti apenas para missão concluída */}
          {missionResults.accuracy >= 70 && (
            <ConfettiAnimation trigger={true} />
          )}
        </div>
      </div>
    );
  }

  // Garantir que enunciado é string
  const enunciadoString = typeof currentQuestion.enunciado === 'string' ? currentQuestion.enunciado : JSON.stringify(currentQuestion.enunciado);
  // Garantir que options são objetos com id/text
  const optionsArray = Array.isArray(currentQuestion.options) ? currentQuestion.options : [];

  const nomeMissao = isCustom
    ? (mission.title || 'Missão Personalizada')
    : (nomeExibicao || mission.nomeExibicao || `Missão Nível ${mission.nivel}`);
  const nomeMissaoFinalizada = (nomeMissao.toLowerCase().includes('surpresa')) ? 'Missão Surpresa finalizada' : `${nomeMissao} Finalizada`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl w-full h-full sm:max-w-4xl sm:h-auto max-h-full overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
              <h2 className={`font-bold flex items-center gap-2 ${isCustom ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
                {nomeMissao}
                {/* Cronômetro global para missão personalizada */}
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
              {/* Subtítulo customizado para missão personalizada */}
              {isCustom && (
                <div className="text-sm font-semibold text-blue-100/90 mt-1">
                  {customFilters?.questionCount} questões • {customFilters?.timePerQuestion} min/questão • Áreas: {customAreas}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <XCircle className="w-5 h-5" />
            </Button>
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
            {/* Pill Animation para resposta correta */}
            {showPill && (
              <div className="ml-2 animate-bounce-in flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white font-bold shadow-lg border-2 border-green-700">
                <CheckCircle className="w-4 h-4" /> +1 XP
              </div>
            )}
          </div>
        </div>
        {/* Conteúdo rolável da missão */}
        <div ref={cardRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6" style={{ minHeight: 0 }}>
          <div ref={enunciadoRef} className={`bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
            feedbackAnimation === 'correct' ? 'animate-gamified-correct' : ''
          } ${feedbackAnimation === 'incorrect' ? 'animate-gamified-incorrect' : ''}`}>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Questão {currentQuestionIndex + 1}</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300 text-xs font-bold ml-2">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Revalida {currentQuestion.year}
              </span>
            </div>
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: enunciadoString }}
            />
          </div>
          <div className="space-y-3">
            {optionsArray.map((option, index) => {
              const optionId = typeof option === 'string' ? option : option.id;
              const optionText = typeof option === 'string' ? option : option.text || '';
              const isSelected = selectedAnswer === optionId;
              const isCorrect = currentQuestion.correct === optionId;
              const showResult = showFeedback && (isSelected || isCorrect);
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(optionId)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : isSelected
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-500'
                          : isSelected
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300 bg-gray-300'
                        : isSelected
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                    }`}>
                      {showResult ? (
                        isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-white" />
                        ) : null
                      ) : (
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <span className="flex-1">{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>
          {/* Botão de confirmação de resposta */}
          {pendingConfirmation && !showFeedback && (
            <div ref={confirmarRef} className="flex justify-center mt-4">
              <Button color="primary" size="lg" onClick={handleConfirmAnswer}>
                Confirmar resposta
              </Button>
            </div>
          )}

          {/* Feedback visual e botão próxima questão */}
          {showFeedback && (
            <div ref={proximaRef} className="mt-6 flex flex-col items-center gap-4">
              <div className={`p-4 rounded-xl border-2 ${lastAnswerCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <div className="flex items-center gap-2">
                  {lastAnswerCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-semibold">
                    {lastAnswerCorrect ? 'Correto!' : 'Incorreto!'}
                  </span>
                </div>
                {!lastAnswerCorrect && (
                  <p className="mt-2 text-sm">
                    Resposta correta: {typeof currentQuestion.correct === 'string'
                      ? (optionsArray.find(o => (typeof o === 'object' && o.id === currentQuestion.correct))?.text || currentQuestion.correct)
                      : ''}
                  </p>
                )}
              </div>
              {!isLastQuestion ? (
                <Button color="primary" size="lg" onClick={handleNextQuestion}>
                  Próxima Questão
                </Button>
              ) : (
                <Button color="success" size="lg" onClick={handleFinishMission}>
                  Finalizar Missão
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
      </div>
    </div>
  );
} 