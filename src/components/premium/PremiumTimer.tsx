
import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Zap } from 'lucide-react';

interface PremiumTimerProps {
  initialMinutes: number;
  isRunning: boolean;
  onTimeUp: () => void;
  onTimeWarning?: (timeLeft: number) => void;
}

export function PremiumTimer({ initialMinutes, isRunning, onTimeUp, onTimeWarning }: PremiumTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Reset timer quando initialMinutes muda
  useEffect(() => {
    console.log('🔄 Timer resetado para:', initialMinutes, 'minutos');
    setTimeLeft(initialMinutes * 60);
    setIsWarning(false);
    setIsCritical(false);
  }, [initialMinutes]);

  useEffect(() => {
    if (!isRunning) {
      console.log('⏸️ Timer pausado');
      return;
    }

    console.log('▶️ Timer iniciado - tempo restante:', timeLeft, 'segundos');

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          console.log('⏰ Tempo esgotado!');
          onTimeUp();
          return 0;
        }

        // Avisos de tempo
        if (newTime === 120 && !isWarning) { // 2 minutos
          console.log('⚠️ Aviso: 2 minutos restantes');
          setIsWarning(true);
          onTimeWarning?.(newTime);
        }
        
        if (newTime === 60 && !isCritical) { // 1 minuto
          console.log('🚨 Crítico: 1 minuto restante');
          setIsCritical(true);
          onTimeWarning?.(newTime);
        }

        return newTime;
      });
    }, 1000);

    return () => {
      console.log('🧹 Timer cleanup');
      clearInterval(interval);
    };
  }, [isRunning, onTimeUp, onTimeWarning, isWarning, isCritical]);

  const getTimerColor = () => {
    if (isCritical) return 'text-red-400 animate-pulse';
    if (isWarning) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getTimerBg = () => {
    if (isCritical) return 'bg-gradient-to-r from-red-500/90 to-red-600/90';
    if (isWarning) return 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90';
    return 'bg-gradient-to-r from-blue-500/90 to-purple-500/90';
  };

  const getIcon = () => {
    if (isCritical) return <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />;
    if (isWarning) return <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />;
    return <Zap className="w-6 h-6 text-blue-400" />;
  };

  const getStatusText = () => {
    if (isCritical) return 'TEMPO CRÍTICO!';
    if (isWarning) return 'Tempo acabando';
    return 'Tempo restante';
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-xl border-2 ${
      isCritical ? 'border-red-400/50' : isWarning ? 'border-yellow-400/50' : 'border-blue-400/50'
    } ${getTimerBg()}`}>
      <div className="relative">
        {getIcon()}
      </div>
      
      <div className="text-center">
        <div className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-xs text-white/80">
          {getStatusText()}
        </div>
      </div>
    </div>
  );
}
