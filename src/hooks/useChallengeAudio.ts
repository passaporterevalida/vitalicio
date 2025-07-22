
import { useCallback } from 'react';

type ChallengeSoundType = 'click' | 'correct' | 'incorrect' | 'combo' | 'warning' | 'victory' | 'countdown';

export function useChallengeAudio() {
  const playSound = useCallback((type: ChallengeSoundType, intensity: number = 1) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const createTone = (frequency: number, duration: number, volume: number = 0.1) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * intensity, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (type) {
        case 'click':
          createTone(800, 0.1, 0.05);
          break;
        case 'correct':
          createTone(880, 0.2, 0.1);
          setTimeout(() => createTone(1100, 0.2, 0.1), 100);
          break;
        case 'incorrect':
          createTone(300, 0.4, 0.15);
          break;
        case 'combo':
          createTone(659, 0.15, 0.12);
          setTimeout(() => createTone(784, 0.15, 0.12), 100);
          setTimeout(() => createTone(988, 0.2, 0.12), 200);
          setTimeout(() => createTone(1175, 0.25, 0.12), 350);
          break;
        case 'warning':
          createTone(440, 0.2, 0.2);
          setTimeout(() => createTone(440, 0.2, 0.2), 300);
          break;
        case 'victory':
          createTone(523, 0.3, 0.15);
          setTimeout(() => createTone(659, 0.3, 0.15), 200);
          setTimeout(() => createTone(784, 0.3, 0.15), 400);
          setTimeout(() => createTone(1047, 0.5, 0.15), 600);
          break;
        case 'countdown':
          createTone(880, 0.1, 0.2);
          break;
      }
    } catch (error) {
      console.log('Audio não disponível');
    }
  }, []);

  return { playSound };
}
