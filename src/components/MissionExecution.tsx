
import { useState, useEffect } from 'react';
import { Mission, CustomMission } from '@/types/missions';
import { useMissions } from '@/hooks/useMissions';
import { useGamification } from '@/hooks/useGamification';
import { useAudio } from '@/hooks/useAudio';
import { QuestionCard } from '@/components/QuestionCard';
import { type Question } from '@/types/question';
import { FloatingTimer } from '@/components/FloatingTimer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Trophy, Target } from 'lucide-react';

interface MissionExecutionProps {
  mission: Mission | CustomMission;
  onBack: () => void;
  onComplete: (mission: Mission | CustomMission) => void;
}

export function MissionExecution({ mission, onBack, onComplete }: MissionExecutionProps) {
  const { getQuestionsForMission, updateMissionProgress } = useMissions();
  const { answerQuestion } = useGamification();
  const { playSound } = useAudio();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const missionQuestions = getQuestionsForMission(mission);
    console.log('Questões da missão carregadas:', missionQuestions.length);
    setQuestions(missionQuestions);
    setStartTime(Date.now());
  }, [mission]);

  useEffect(() => {
    if (!isFinished) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, isFinished]);

  useEffect(() => {
    const currentQuestion = questions[currentIndex];
    if (currentQuestion) {
      const hasAnswer = !!answers[currentQuestion.id.toString()];
      setQuestionAnswered(hasAnswer);
    }
  }, [currentIndex, answers, questions]);

  const handleAnswer = (optionId: string) => {
    playSound('click');
    const currentQuestion = questions[currentIndex];
    if (currentQuestion) {
      console.log('Respondendo questão da missão:', currentQuestion.id, 'com opção:', optionId);
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id.toString()]: optionId
      }));
      setQuestionAnswered(true);
      
      // Register answer in gamification system with question ID
      const correct = optionId === currentQuestion.correct;
      answerQuestion(correct, currentQuestion.area, currentQuestion.id);
    }
  };

  const handleNext = () => {
    playSound('click');
    setQuestionAnswered(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishMission();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finishMission = () => {
    setIsFinished(true);
    
    const correctAnswers = questions.filter(q => 
      answers[q.id.toString()] === q.correct
    ).length;

    console.log('Finalizando missão com', correctAnswers, 'de', questions.length, 'corretas');

    const accuracy = (correctAnswers / questions.length) * 100;
    
    // Update mission progress
    const completed = updateMissionProgress(mission.id, questions.length, correctAnswers);
    
    // Award XP through gamification system
    if (completed) {
      // completeSimulado(correctAnswers, questions.length); // Removed as per edit hint
    }
    
    if (completed) {
      playSound('achievement');
      onComplete(mission);
    } else {
      playSound('click');
    }
  };

  const currentQuestion = questions[currentIndex];
  const correctAnswers = questions.filter(q => answers[q.id.toString()] === q.correct).length;
  const accuracy = questions.length > 0 ? (correctAnswers / questions.length) * 100 : 0;

  if (isFinished) {
    return (
      <div className="pt-8">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-blue-200/50 dark:border-blue-700/50">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              {mission.title} Concluída! 🎊
            </h2>
            
            <div className="text-3xl font-bold text-green-600 mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700 shadow-sm">
              🎯 Você conquistou {correctAnswers} de {questions.length} questões!
            </div>
            
            <div className="text-xl mb-4">
              Aproveitamento: {accuracy.toFixed(1)}%
            </div>
            
            {accuracy >= mission.targetAccuracy ? (
              <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-xl p-4 mb-6">
                <div className="text-green-800 dark:text-green-200 font-bold">
                  ✅ Quest Concluída com Sucesso!
                </div>
                <div className="text-green-700 dark:text-green-300 text-sm">
                  Meta de {mission.targetAccuracy}% atingida!
                </div>
              </div>
            ) : (
              <div className="bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-700 rounded-xl p-4 mb-6">
                <div className="text-orange-800 dark:text-orange-200 font-bold">
                  📈 Continue Praticando!
                </div>
                <div className="text-orange-700 dark:text-orange-300 text-sm">
                  Meta: {mission.targetAccuracy}% | Seu resultado: {accuracy.toFixed(1)}%
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6 mb-8">
            {questions.map(q => (
              <QuestionCard 
                key={q.id} 
                question={q} 
                showAnswer 
                userAnswer={answers[q.id.toString()]}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🔄 Voltar às Quests
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <div className="text-xl">Carregando quest...</div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 border-2 border-blue-300 hover:border-blue-500"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar às Quests
        </Button>
      </div>
      
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-blue-200/50 dark:border-blue-700/50">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg border-2 border-white">
            <Target className="w-5 h-5" />
            {mission.title} - Questão {currentIndex + 1} de {questions.length}
          </div>
        </div>
        
        <QuestionCard
          key={`${currentQuestion.id}-${currentIndex}`}
          question={currentQuestion}
          showAnswer={questionAnswered}
          onAnswer={handleAnswer}
          disabled={questionAnswered}
          userAnswer={answers[currentQuestion.id.toString()]}
        />
        
        {questionAnswered && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {currentIndex < questions.length - 1 ? 'Próxima' : 'Finalizar Quest'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <FloatingTimer
        running={!isFinished}
        onFinish={finishMission}
        initialMinutes={mission.timeLimit || 120}
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        onForceFinish={finishMission}
        timeElapsed={timeElapsed}
      />
    </div>
  );
}
