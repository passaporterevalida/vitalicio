
import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen } from "lucide-react";

interface QuestionHeaderProps {
  question: Question;
  isCorrect?: boolean;
}

export function QuestionHeader({ question, isCorrect }: QuestionHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'fácil':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'difícil':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAreaColor = (area: string) => {
    const colors = {
      'Clínica Médica': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cirurgia': 'bg-red-100 text-red-800 border-red-200',
      'Pediatria': 'bg-pink-100 text-pink-800 border-pink-200',
      'Ginecologia e Obstetrícia': 'bg-purple-100 text-purple-800 border-purple-200',
      'Cardiologia': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[area as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="relative mb-4 sm:mb-6 rounded-2xl overflow-hidden shadow-md border-2 border-blue-100 dark:border-blue-700 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <span className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </span>
        <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow">
              Questão {question.id}
            </h3>
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold">
          <Calendar className="w-4 h-4" />
          {question.year}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold">
          <BookOpen className="w-4 h-4" />
          {question.area}
        </span>
      </div>
    </div>
  );
}
