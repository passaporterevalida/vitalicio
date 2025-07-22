
import { useEffect, useState, useRef } from "react";
import { Clock, Flag, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  running: boolean;
  onFinish: () => void;
  initialMinutes?: number;
  currentQuestion: number;
  totalQuestions: number;
  onForceFinish: () => void;
  timeElapsed: number; // Tempo já gasto em segundos
}

export function FloatingTimer({ 
  running, 
  onFinish, 
  initialMinutes = 300, 
  currentQuestion, 
  totalQuestions,
  onForceFinish,
  timeElapsed 
}: Props) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      // Só mostrar se estiver rodando E com scroll
      setIsVisible(scrolled && running);
    };

    window.addEventListener('scroll', handleScroll);
    // Verificar imediatamente se deve mostrar
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [running]);

  useEffect(() => {
    // Limpar interval anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Só executar timer se estiver rodando
    if (!running) return;
    
    if (seconds <= 0) {
      onFinish();
      return;
    }
    
    // Usar setInterval com verificação de tempo real para maior precisão
    lastUpdateRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastUpdateRef.current;
      
      // Se passou pelo menos 1 segundo (com tolerância de 50ms)
      if (elapsed >= 950) {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds <= 0) {
            onFinish();
            return 0;
          }
          return newSeconds;
        });
        lastUpdateRef.current = now;
      }
    }, 100); // Verificar a cada 100ms para maior precisão
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, seconds, onFinish]);

  // Resetar timer quando iniciar novo simulado
  useEffect(() => {
    if (running) {
      setSeconds(initialMinutes * 60);
      lastUpdateRef.current = Date.now();
    }
  }, [running, initialMinutes]);

  const hours = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    const percentage = seconds / (initialMinutes * 60);
    if (percentage > 0.5) return "text-green-600";
    if (percentage > 0.25) return "text-yellow-600";
    return "text-red-600";
  };

  // Progresso baseado em questões respondidas (crescente)
  const progress = (currentQuestion / totalQuestions) * 100;

  // Não renderizar se não estiver visível ou não rodando
  if (!isVisible || !running) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300 translate-y-0 opacity-100">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-200 dark:border-gray-600 min-w-[200px]">
        {/* Header with minimize button */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
            <div className={`text-lg font-mono font-bold ${getTimeColor()}`}>
              {formatTime()}
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            {isMinimized ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Expandable content */}
        {!isMinimized && (
          <div className="p-3">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">{currentQuestion}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Force Finish Button */}
            <button
              onClick={onForceFinish}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-all duration-200"
            >
              <Flag className="w-3 h-3" />
              Finalizar Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
