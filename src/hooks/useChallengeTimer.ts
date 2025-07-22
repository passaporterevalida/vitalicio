
import { useState, useEffect, useCallback, useRef } from 'react';
import { useChallengeAudio } from './useChallengeAudio';

interface TimerCallbacks {
  onTimeWarning?: (timeLeft: number) => void;
  onTimeUp?: () => void;
  onTick?: (timeLeft: number) => void;
}

export function useChallengeTimer(initialSeconds: number = 600, callbacks?: TimerCallbacks) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { playSound } = useChallengeAudio();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const start = useCallback(() => {
    console.log('🕐 Timer do desafio iniciado');
    setIsRunning(true);
    setIsFinished(false);
  }, []);

  const stop = useCallback(() => {
    console.log('⏹️ Timer do desafio parado');
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    console.log('🔄 Timer do desafio resetado');
    setTimeLeft(initialSeconds);
    setIsRunning(false);
    setIsFinished(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialSeconds]);

  const getUrgencyLevel = useCallback(() => {
    const percentage = (timeLeft / initialSeconds) * 100;
    if (percentage <= 10) return 'critical'; // Últimos 10%
    if (percentage <= 25) return 'warning';  // Últimos 25%
    if (percentage <= 50) return 'caution';  // Últimos 50%
    return 'normal';
  }, [timeLeft, initialSeconds]);

  // Effect para controlar o timer
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Callback de tick
          callbacks?.onTick?.(newTime);
          
          // Alertas sonoros em momentos específicos
          if (newTime === 300) { // 5 minutos
            playSound('warning');
            callbacks?.onTimeWarning?.(newTime);
          } else if (newTime === 120) { // 2 minutos
            playSound('warning', 1.2);
            callbacks?.onTimeWarning?.(newTime);
          } else if (newTime === 60) { // 1 minuto
            playSound('warning', 1.5);
            callbacks?.onTimeWarning?.(newTime);
          } else if (newTime === 30) { // 30 segundos
            playSound('warning', 1.8);
            callbacks?.onTimeWarning?.(newTime);
          } else if (newTime === 10) { // 10 segundos
            playSound('countdown', 2);
            callbacks?.onTimeWarning?.(newTime);
          } else if (newTime <= 5 && newTime > 0) { // Últimos 5 segundos
            playSound('countdown', 2.5);
          }
          
          if (newTime <= 0) {
            console.log('⏰ Timer do desafio finalizado');
            setIsRunning(false);
            setIsFinished(true);
            callbacks?.onTimeUp?.();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeLeft, callbacks, playSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    minutes,
    seconds,
    isRunning,
    isFinished,
    start,
    stop,
    reset,
    urgencyLevel: getUrgencyLevel(),
    percentage: (timeLeft / initialSeconds) * 100
  };
}
