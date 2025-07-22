
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Option } from "@/types/question";
import { getOptionColor } from "@/utils/questionHelpers";

interface QuestionOptionProps {
  option: Option;
  isSelected: boolean;
  showAnswer: boolean;
  disabled: boolean;
  correctAnswer: string;
  userAnswer?: string;
  selectedOption: string | null;
  onSelect: (optionId: string, sourceElement?: HTMLElement) => void;
}

export function QuestionOption({ 
  option, 
  isSelected, 
  showAnswer, 
  disabled, 
  correctAnswer, 
  userAnswer, 
  selectedOption, 
  onSelect 
}: QuestionOptionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onSelect(option.id, buttonRef.current || undefined);
  };

  const getOptionIcon = (optionId: string) => {
    if (!showAnswer) return null;

    const isCorrect = optionId === correctAnswer;
    const isUserAnswer = optionId === (userAnswer || selectedOption);

    if (isCorrect) {
      return <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
    }
    
    if (isUserAnswer && !isCorrect) {
      return <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
    }

    return null;
  };

  const isCorrect = showAnswer && option.id === correctAnswer;
  const isUserAnswer = showAnswer && option.id === (userAnswer || selectedOption);

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      onClick={handleClick}
      disabled={disabled || showAnswer}
      className={`question-option w-full min-h-[60px] h-auto text-left justify-start border-2 transition-all duration-300 relative overflow-hidden group p-3 sm:p-4 lg:p-6 rounded-xl ${getOptionColor(
        option.id, 
        showAnswer, 
        selectedOption, 
        userAnswer, 
        correctAnswer
      )} ${
        !disabled && !showAnswer ? "hover:scale-[1.02] cursor-pointer hover:shadow-lg" : "cursor-default"
      } ${
        isCorrect ? "ring-2 ring-emerald-400 ring-offset-2" : ""
      } ${
        isUserAnswer && !isCorrect ? "ring-2 ring-red-400 ring-offset-2" : ""
      }`}
    >
      {/* Subtle animation background */}
      {!showAnswer && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {isCorrect && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 animate-pulse"></div>
      )}
      
      <div className="flex items-start gap-3 sm:gap-4 w-full relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className={`question-option-letter w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
            isCorrect 
              ? "bg-emerald-500 text-white shadow-lg border-2 border-emerald-600" 
              : isUserAnswer && !isCorrect
                ? "bg-red-500 text-white shadow-lg border-2 border-red-600"
                : isSelected
                  ? "bg-blue-500 text-white shadow-lg border-2 border-blue-600"
                  : "bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
          }`}>
            {option.id}
          </div>
          {getOptionIcon(option.id)}
        </div>
        <div className="question-option-text flex-1 min-w-0 text-left">
          <div 
            className="text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: option.text }}
          />
        </div>
      </div>
    </Button>
  );
}
