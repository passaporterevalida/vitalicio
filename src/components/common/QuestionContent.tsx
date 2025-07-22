import { Question } from '@/types/question';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target } from 'lucide-react';

interface QuestionContentProps {
  question: Question;
  selectedAnswer: string;
  onSelectOption: (optionId: string) => void;
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  feedbackAnimation: 'none' | 'correct' | 'incorrect';
}

/**
 * Componente para exibir conteúdo de questões
 * Remove duplicação entre SimuladoModal e JornadaMissionModal
 */
export function QuestionContent({
  question,
  selectedAnswer,
  onSelectOption,
  showFeedback,
  lastAnswerCorrect,
  feedbackAnimation
}: QuestionContentProps) {
  const getOptionClass = (optionId: string) => {
    let baseClass = "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ";
    
    if (selectedAnswer === optionId) {
      baseClass += "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ";
    } else {
      baseClass += "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 ";
    }

    if (showFeedback) {
      const isCorrect = optionId === question.correct;
      if (isCorrect) {
        baseClass += "border-green-500 bg-green-50 dark:bg-green-900/20 ";
      } else if (selectedAnswer === optionId) {
        baseClass += "border-red-500 bg-red-50 dark:bg-red-900/20 ";
      }
    }

    return baseClass;
  };

  const getOptionIcon = (optionId: string) => {
    if (!showFeedback) return null;
    
    const isCorrect = optionId === question.correct;
    const isSelected = selectedAnswer === optionId;
    
    if (isCorrect) {
      return (
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          ✓
        </div>
      );
    } else if (isSelected) {
      return (
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          ✗
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Questão #{question.id}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          <Target className="w-3 h-3 mr-1" />
          {question.area}
        </Badge>
      </div>

      {/* Question Statement */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardContent className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div 
              className="text-lg leading-relaxed text-gray-900 dark:text-gray-100"
              dangerouslySetInnerHTML={{ __html: question.enunciado }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={option.id}
            className={getOptionClass(option.id)}
            onClick={() => !showFeedback && onSelectOption(option.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getOptionIcon(option.id) || (
                  <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    {String.fromCharCode(65 + index)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className="text-base leading-relaxed text-gray-900 dark:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: option.text }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Animation */}
      {feedbackAnimation !== 'none' && (
        <div className={`fixed inset-0 pointer-events-none z-50 flex items-center justify-center ${
          feedbackAnimation === 'correct' 
            ? 'bg-green-500/20' 
            : 'bg-red-500/20'
        }`}>
          <div className={`text-6xl font-bold ${
            feedbackAnimation === 'correct' 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {feedbackAnimation === 'correct' ? '✓' : '✗'}
          </div>
        </div>
      )}
    </div>
  );
} 