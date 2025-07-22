
import { CheckCircle, XCircle } from "lucide-react";
import { Question } from "@/types/question";

interface QuestionFeedbackProps {
  question: Question;
  selectedOption?: string | null;
  isCorrect: boolean;
}

export function QuestionFeedback({ question, selectedOption, isCorrect }: QuestionFeedbackProps) {
  const correctOption = question.options.find(opt => opt.id === question.correct);
  const selectedOptionData = question.options.find(opt => opt.id === selectedOption);

  // Generate objective feedback text
  const getFeedbackText = () => {
    if (isCorrect) {
      return correctOption?.feedbackCorreta || 
        "Excelente! Esta é a conduta mais adequada pois segue as diretrizes clínicas atuais, oferece maior segurança e eficácia ao paciente, sendo considerada primeira linha para este caso clínico.";
    }

    // For incorrect answers, combine both feedbacks into flowing text
    const wrongFeedback = selectedOptionData?.feedbackErrada || 
      "A alternativa escolhida não é a mais adequada pois pode não seguir as diretrizes clínicas atuais, apresentar riscos desnecessários ou não ser a primeira linha de tratamento.";
    
    const correctFeedback = correctOption?.feedbackCorreta || 
      "A alternativa correta é preferível porque segue as diretrizes médicas estabelecidas, oferece maior segurança, é considerada primeira linha e tem melhor relação custo-benefício.";

    return `${wrongFeedback} ${correctFeedback}`;
  };

  return (
    <>
      {/* Compact answer confirmation */}
      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
        <div className="flex items-start gap-2">
          {isCorrect ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-800 dark:text-gray-200 text-base mb-1">
              <strong>Gabarito:</strong> Alternativa {question.correct}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {correctOption?.text}
            </p>
          </div>
        </div>
      </div>

      {/* Unified objective feedback */}
      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
        <div className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
          {getFeedbackText()}
        </div>
        
        {/* Learning reinforcement - only for incorrect answers */}
        {!isCorrect && (
          <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-800/20 rounded border border-blue-200 dark:border-blue-600">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>📚 Para revisar:</strong> Estude mais sobre <strong>{question.area}</strong> e pratique questões similares para fortalecer este conhecimento.
            </p>
          </div>
        )}
      </div>

      {/* Reference section - compact when available */}
      {question.referencia && (
        <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong>📚 Referência:</strong> {question.referencia}
          </p>
        </div>
      )}
    </>
  );
}
