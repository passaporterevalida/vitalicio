
import { Question } from "@/types/question";

interface QuestionContentProps {
  question: Question;
}

export function QuestionContent({ question }: QuestionContentProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
        {question.enunciado}
      </p>
      
      {question.image && (
        <div className="mt-6 sm:mt-8">
          <img 
            src={question.image} 
            alt="Imagem da questão" 
            className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
