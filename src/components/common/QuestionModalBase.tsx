import { ReactNode, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock, Trophy } from 'lucide-react';
import { useSmoothAnchor } from '@/hooks/useSmoothAnchor';
import { formatTime } from '@/utils/timeUtils';

interface QuestionModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  customTotalTimeLeft?: number;
  isCustom?: boolean;
  children: ReactNode;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  pendingConfirmation: boolean;
  isAdvancing: boolean;
  feedbackAnimation: 'none' | 'correct' | 'incorrect';
  onSelectOption: (optionId: string) => void;
  onConfirmAnswer: () => void;
  currentQuestion: any; // Tipo específico será definido pelos componentes filhos
}

/**
 * Componente base para modais de questões
 * Remove duplicação entre SimuladoModal e JornadaMissionModal
 */
export function QuestionModalBase({
  isOpen,
  onClose,
  title,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  customTotalTimeLeft,
  isCustom = false,
  children,
  onNext,
  onFinish,
  isLastQuestion,
  showFeedback,
  lastAnswerCorrect,
  pendingConfirmation,
  isAdvancing,
  feedbackAnimation,
  onSelectOption,
  onConfirmAnswer,
  currentQuestion
}: QuestionModalBaseProps) {
  const scrollToRef = useSmoothAnchor();
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const enunciadoRef = useRef<HTMLDivElement>(null);
  const confirmarRef = useRef<HTMLDivElement>(null);
  const proximaRef = useRef<HTMLDivElement>(null);

  // Ancorar ao abrir nova questão
  useEffect(() => {
    if (isOpen && enunciadoRef.current) {
      setTimeout(() => scrollToRef(enunciadoRef), 100);
    }
  }, [currentQuestionIndex, isOpen, scrollToRef]);

  // Ancorar ao selecionar opção
  useEffect(() => {
    if (pendingConfirmation && confirmarRef.current) {
      setTimeout(() => scrollToRef(confirmarRef), 100);
    }
  }, [pendingConfirmation, scrollToRef]);

  // Ancorar ao mostrar feedback
  useEffect(() => {
    if (showFeedback && proximaRef.current) {
      setTimeout(() => scrollToRef(proximaRef), 100);
    }
  }, [showFeedback, scrollToRef]);

  // Ocultar navbar enquanto o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-questao-aberta');
    } else {
      document.body.classList.remove('modal-questao-aberta');
    }
    return () => {
      document.body.classList.remove('modal-questao-aberta');
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            
            {/* Timer */}
            <div className="flex items-center gap-2 text-sm font-medium">
              {isCustom && customTotalTimeLeft !== undefined && (
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Clock className="w-4 h-4" />
                  <span>Tempo Total: {formatTime(customTotalTimeLeft)}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Questão {currentQuestionIndex + 1} de {totalQuestions}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Question Content */}
          <div ref={enunciadoRef} className="space-y-4">
            {children}
          </div>

          {/* Confirmation Button */}
          {pendingConfirmation && (
            <div ref={confirmarRef} className="flex justify-center">
              <Button
                onClick={onConfirmAnswer}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Confirmar Resposta
              </Button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="flex justify-center">
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                lastAnswerCorrect
                  ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300'
                  : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
              }`}>
                {lastAnswerCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                )}
                <span className="font-semibold">
                  {lastAnswerCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          {showFeedback && (
            <div ref={proximaRef} className="flex justify-center">
              <Button
                onClick={isLastQuestion ? onFinish : onNext}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isAdvancing}
              >
                {isLastQuestion ? (
                  <>
                    <Trophy className="w-5 h-5 mr-2" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Próxima Questão
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 