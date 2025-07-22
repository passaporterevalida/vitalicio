import { useState, useEffect, useCallback } from 'react';
import { useAudio } from './useAudio';
import { minutesToSeconds } from '@/utils/timeUtils';

interface UseQuestionTimerProps {
  initialMinutes: number;
  isOpen: boolean;
  isCustom?: boolean;
  customTotalTime?: number;
  onTimeUp: () => void;
  onFinish?: () => void;
}

interface TimerState {
  timeLeft: number;
  isTimerRunning: boolean;
  customTotalTimeLeft: number;
  customTimerRunning: boolean;
}

/**
 * Hook customizado para gerenciar timers de questões
 * Remove duplicação entre SimuladoModal e JornadaMissionModal
 */
export function useQuestionTimer({
  initialMinutes,
  isOpen,
  isCustom = false,
  customTotalTime,
  onTimeUp,
  onFinish
}: UseQuestionTimerProps) {
  const { playSound } = useAudio();
  
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: minutesToSeconds(initialMinutes),
    isTimerRunning: true,
    customTotalTimeLeft: customTotalTime ? minutesToSeconds(customTotalTime) : 0,
    customTimerRunning: isCustom
  });

  // Timer global para simulado/missão personalizada
  useEffect(() => {
    if (!isOpen || !isCustom || !timerState.customTimerRunning) return;
    
    const interval = setInterval(() => {
      setTimerState(prev => {
        if (prev.customTotalTimeLeft <= 1) {
          onFinish?.();
          return { ...prev, customTimerRunning: false, customTotalTimeLeft: 0 };
        }
        return { ...prev, customTotalTimeLeft: prev.customTotalTimeLeft - 1 };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isOpen, isCustom, timerState.customTimerRunning, onFinish]);

  // Timer por questão
  useEffect(() => {
    if (!isOpen || isCustom || !timerState.isTimerRunning) return;
    
    const interval = setInterval(() => {
      setTimerState(prev => {
        if (prev.timeLeft <= 1) {
          playSound('incorrect');
          return { ...prev, isTimerRunning: false, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isOpen, isCustom, timerState.isTimerRunning, playSound]);

  // Avançar automaticamente ao acabar o tempo
  useEffect(() => {
    if (!isCustom && timerState.timeLeft === 0 && isOpen) {
      onTimeUp();
    }
  }, [isCustom, timerState.timeLeft, isOpen, onTimeUp]);

  const resetTimer = useCallback((minutes: number) => {
    setTimerState(prev => ({
      ...prev,
      timeLeft: minutesToSeconds(minutes),
      isTimerRunning: true
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isTimerRunning: false }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isTimerRunning: true }));
  }, []);

  const resetCustomTimer = useCallback((minutes: number) => {
    setTimerState(prev => ({
      ...prev,
      customTotalTimeLeft: minutesToSeconds(minutes),
      customTimerRunning: true
    }));
  }, []);

  return {
    timeLeft: timerState.timeLeft,
    isTimerRunning: timerState.isTimerRunning,
    customTotalTimeLeft: timerState.customTotalTimeLeft,
    customTimerRunning: timerState.customTimerRunning,
    resetTimer,
    pauseTimer,
    resumeTimer,
    resetCustomTimer
  };
} 