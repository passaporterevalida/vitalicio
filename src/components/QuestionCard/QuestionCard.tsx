
import React, { useState } from 'react';
import { QuestionCardProps } from '@/types/question';
import { QuestionHeader } from './QuestionHeader';
import { QuestionContent } from './QuestionContent';
import { QuestionOption } from './QuestionOption';
import { QuestionFeedback } from './QuestionFeedback';
import { useGamification } from '@/hooks/useGamification';
import { useLimitChecker } from '@/hooks/useLimitChecker';
import { LimitReachedModal } from '@/components/LimitReachedModal';

interface ExtendedQuestionCardProps extends QuestionCardProps {
  onAnswerWithEffects?: (optionId: string, correct: boolean, sourceElement?: HTMLElement) => void;
}

export function QuestionCard({ 
  question, 
  showAnswer = false, 
  onAnswer, 
  disabled = false,
  userAnswer,
  hideHeader = false,
  onAnswerWithEffects
}: ExtendedQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);
  const [hasAnswered, setHasAnswered] = useState(showAnswer || !!userAnswer);
  const { answerQuestion } = useGamification();
  const { 
    checkQuestionLimit, 
    incrementQuestionUsage, 
    showLimitModal, 
    limitType, 
    closeLimitModal 
  } = useLimitChecker();

  const handleOptionSelect = async (optionId: string, sourceElement?: HTMLElement) => {
    if (disabled || hasAnswered) return;
    
    // Check if user can answer more questions
    const canAnswer = await checkQuestionLimit();
    if (!canAnswer) return;
    
    console.log('Selecionando opção:', optionId, 'para questão:', question.id);
    
    setSelectedOption(optionId);
    setHasAnswered(true);
    
    const correct = optionId === question.correct;
    console.log('Resposta correta?', correct);
    
    // Increment usage counter
    await incrementQuestionUsage();
    
    // Register the answer in gamification system with question ID
    answerQuestion(correct, question.area, question.id);
    
    // Call effects callback if provided (for Questions page)
    if (onAnswerWithEffects) {
      onAnswerWithEffects(optionId, correct, sourceElement);
    }
    
    // Call external handler if provided
    if (onAnswer) {
      onAnswer(optionId);
    }
  };

  const isCorrect = selectedOption === question.correct;
  const showFeedback = hasAnswered || showAnswer;

  return (
    <>
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200/50 dark:border-blue-700/50 transition-all duration-300 hover:shadow-2xl sm:hover:shadow-3xl mb-6 sm:mb-8">
        {!hideHeader && (
          <QuestionHeader 
            question={question} 
            isCorrect={showFeedback ? isCorrect : undefined}
          />
        )}
        
        <QuestionContent question={question} />
        
        <div className="space-y-3 sm:space-y-4">
          {question.options.map((option) => (
            <QuestionOption
              key={option.id}
              option={option}
              isSelected={selectedOption === option.id}
              showAnswer={showFeedback}
              onSelect={handleOptionSelect}
              disabled={disabled || hasAnswered}
              correctAnswer={question.correct}
              userAnswer={userAnswer}
              selectedOption={selectedOption}
            />
          ))}
        </div>
        
        {showFeedback && (
          <QuestionFeedback 
            question={question}
            selectedOption={selectedOption}
            isCorrect={isCorrect}
          />
        )}
      </div>
      
      <LimitReachedModal 
        open={showLimitModal}
        onClose={closeLimitModal}
        limitType={limitType}
      />
    </>
  );
}
