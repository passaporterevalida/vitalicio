
import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { MobileProgressDrawer } from "@/components/MobileProgressDrawer";
import { XPPillAnimation } from "@/components/XPPillAnimation";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { useAudio } from "@/hooks/useAudio";
import { useXPPillAnimation } from "@/hooks/useXPPillAnimation";
import { getDefaultTipoProva } from "@/utils/questionSelector";
import { useToast } from '@/hooks/use-toast';
import { GamifiedHeaderAlert } from '@/components/GamifiedHeaderAlert';
import { LoadingState, SkeletonGrid } from "@/components/LoadingStates";
import { TouchButton } from "@/components/MobileEnhancements";

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState(2025);
  const [tipoProva, setTipoProva] = useState<string | null>(getDefaultTipoProva(2025));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");
  const [showConfetti, setShowConfetti] = useState(false);
  const [drawerXPReceived, setDrawerXPReceived] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Simulação de carregamento e erro (substitua pelo fetch real se necessário)
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchQuestions()
  //     .then(() => setIsLoading(false))
  //     .catch(() => {
  //       setLoadError('Erro ao carregar questões. Tente novamente.');
  //       setIsLoading(false);
  //     });
  // }, []);

  const drawerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useAudio();
  const {
    isAnimating,
    xpAmount,
    startPosition,
    endPosition,
    triggerXPAnimation,
    resetAnimation
  } = useXPPillAnimation();

  const {
    filteredQuestions,
    totalQuestions,
    questionsPerPage,
  } = useQuestionsFilters({
    ano: anoSelecionado,
    tipo: tipoProva,
    searchTerm,
    area: selectedArea,
    difficulty: selectedDifficulty,
    page: currentPage,
  });

  const handleAnoChange = (ano: number) => {
    setAnoSelecionado(ano);
    setCurrentPage(1);
    const defaultTipo = getDefaultTipoProva(ano);
    setTipoProva(defaultTipo);
  };

  const handleTipoChange = (tipo: string) => {
    setTipoProva(tipo);
    setCurrentPage(1);
  };

  const handleQuestionAnswer = (questionId: number, optionId: string, correct: boolean, sourceElement?: HTMLElement) => {
    playSound(correct ? 'correct' : 'incorrect');
    
    if (correct) {
      setShowConfetti(true);
      
      // Trigger XP animation on mobile
      if (sourceElement && window.innerWidth < 768) {
        const xpPoints = 10; // Base XP amount
        triggerXPAnimation(xpPoints, sourceElement);
        setDrawerXPReceived(true);
        
        // Reset drawer state after animation
        setTimeout(() => {
          setDrawerXPReceived(false);
        }, 4000);
      }
    }
  };

  const handleAnimationComplete = () => {
    resetAnimation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[30vh] pt-24 sm:pt-28 px-4 text-center">
        <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-4 select-none">
          Banco de Questões
        </h1>
        <GamifiedHeaderAlert icon={<span className="text-xl" role="img" aria-label="livro">📚</span>}>
          + de 1500 questões oficiais do Revalida, filtros avançados e estatísticas para turbinar seus estudos!
        </GamifiedHeaderAlert>
      </div>
      
      {/* Mobile Progress Drawer */}
      <MobileProgressDrawer 
        onXPReceived={drawerXPReceived ? () => {} : undefined}
      />

      {/* XP Pill Animation */}
      <XPPillAnimation
        isVisible={isAnimating}
        xpAmount={xpAmount}
        startPosition={startPosition}
        endPosition={endPosition}
        onAnimationComplete={handleAnimationComplete}
      />

      <div className="relative z-10 container mx-auto px-4 pt-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <GamifiedQuestionsHeader
            anoSelecionado={anoSelecionado}
            setAnoSelecionado={handleAnoChange}
            totalQuestoes={totalQuestions}
            tipoProva={tipoProva || undefined}
            setTipoProva={handleTipoChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />

          {isLoading && (
            <LoadingState type="questions" message="Carregando questões do Revalida..." />
          )}
          {loadError && (
            <div className="text-center py-8">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar</h3>
                <p className="text-red-600">{loadError}</p>
                <TouchButton 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Tentar Novamente
                </TouchButton>
              </div>
            </div>
          )}

          {!isLoading && !loadError && filteredQuestions.map((question) => (
            <QuestionCard 
              key={question.id} 
              question={question}
              onAnswerWithEffects={(optionId: string, correct: boolean) => {
                handleQuestionAnswer(question.id, optionId, correct);
              }}
            />
          ))}

          {/* Paginação visível igual ao Ranking */}
          <div className="flex justify-center items-center gap-4 mt-6 mb-2">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm hover:bg-blue-50`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <span className="text-xl">&#60;</span> Anterior
            </button>
            <span className="text-base font-semibold text-gray-700 select-none">
              Página {currentPage} de {Math.ceil(totalQuestions / questionsPerPage)}
            </span>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm hover:bg-blue-50`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= Math.ceil(totalQuestions / questionsPerPage)}
            >
              Próxima <span className="text-xl">&#62;</span>
            </button>
          </div>
        </div>
      </div>

      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
}
