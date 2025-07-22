
export const getOptionColor = (
  optionId: string,
  showAnswer: boolean,
  selectedOption: string | null,
  userAnswer: string | undefined,
  correctAnswer: string
) => {
  if (!showAnswer) {
    return selectedOption === optionId 
      ? "bg-blue-100 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400" 
      : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700";
  }

  const isCorrect = optionId === correctAnswer;
  const isUserAnswer = optionId === (userAnswer || selectedOption);

  if (isCorrect) {
    return "bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-500 dark:from-emerald-900/30 dark:to-green-900/30 dark:border-emerald-400 shadow-lg ring-2 ring-emerald-300 ring-offset-2";
  }
  
  if (isUserAnswer && !isCorrect) {
    return "bg-gradient-to-r from-red-100 to-pink-100 border-red-500 dark:from-red-900/30 dark:to-pink-900/30 dark:border-red-400 shadow-lg ring-2 ring-red-300 ring-offset-2";
  }

  return "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600";
};
