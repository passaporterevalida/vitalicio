
export type Option = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
};

export type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  image?: string | null;
  options: Option[];
  correct: string;
  referencia?: string;
};

export interface QuestionCardProps {
  question: Question;
  showAnswer?: boolean;
  onAnswer?: (optionId: string) => void;
  onAnswerWithEffects?: (optionId: string, correct: boolean, sourceElement?: HTMLElement) => void;
  disabled?: boolean;
  userAnswer?: string;
  hideHeader?: boolean;
  isReviewMode?: boolean;
}
