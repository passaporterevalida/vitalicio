
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Target, Sparkles } from 'lucide-react';
import { type Question } from '@/types/question';

interface PremiumQuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
  userAnswer?: string;
  showAnswer?: boolean;
  streak?: number;
  combo?: number;
}

export function PremiumQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  userAnswer,
  showAnswer = false,
  streak = 0,
  combo = 0
}: PremiumQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleOptionClick = (optionId: string) => {
    if (showAnswer) return;
    setSelectedAnswer(optionId);
    onAnswer(optionId);
  };

  const getOptionStyle = (optionId: string) => {
    const baseStyle = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:scale-102 transform";
    
    if (showAnswer) {
      if (optionId === question.correct) {
        return `${baseStyle} bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400 text-green-100`;
      }
      if (optionId === userAnswer && optionId !== question.correct) {
        return `${baseStyle} bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-400 text-red-100`;
      }
      return `${baseStyle} bg-gray-800/40 border-gray-600 text-gray-300`;
    }

    if (selectedAnswer === optionId) {
      return `${baseStyle} bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 text-purple-100 shadow-lg`;
    }

    return `${baseStyle} bg-gray-800/60 border-gray-600 text-gray-200 hover:bg-gray-700/60 hover:border-gray-500`;
  };

  const getOptionIcon = (optionId: string) => {
    if (!showAnswer) return null;
    
    if (optionId === question.correct) {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
    if (optionId === userAnswer && optionId !== question.correct) {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/95 via-gray-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border-2 border-purple-400/30 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-red-600/90 backdrop-blur-xl p-6 rounded-t-3xl border-b-4 border-yellow-400/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 text-lg font-bold">
              Questão {questionNumber}/{totalQuestions}
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1">
              {question.area}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            {combo >= 3 && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 animate-pulse">
                🔥 COMBO {combo}x
              </Badge>
            )}
            {streak >= 5 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 animate-pulse">
                ⚡ STREAK {streak}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-300 font-medium">Revalida {question.year} • Questão Oficial</span>
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
            {question.enunciado}
          </h3>
          
          {question.image && (
            <div className="mb-6 flex justify-center">
              <img 
                src={question.image} 
                alt="Imagem da questão" 
                className="max-w-full h-auto rounded-xl border-2 border-gray-600 shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const optionId = String.fromCharCode(65 + index); // A, B, C, D
            
            return (
              <Button
                key={optionId}
                onClick={() => handleOptionClick(optionId)}
                className={getOptionStyle(optionId)}
                disabled={showAnswer}
                variant="ghost"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {optionId}
                    </div>
                    <span className="text-left">{option.text}</span>
                  </div>
                  {getOptionIcon(optionId)}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Question Info */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Revalida {question.year}</span>
          </div>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>Questão #{question.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
