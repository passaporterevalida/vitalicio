
import { useCallback } from 'react';

type SoundType = 'click' | 'correct' | 'incorrect' | 'levelup' | 'achievement';

// Hook customizado para controlar reprodução de áudio em componentes React.
// Siga o padrão de nomenclatura: camelCase iniciado por 'use' para hooks.
export function useAudio() {
  const playSound = useCallback((type: SoundType) => {
    // Create audio context and play sounds programmatically
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createBeep = (frequency: number, duration: number, volume: number = 0.1) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    try {
      switch (type) {
        case 'click':
          createBeep(800, 0.1);
          break;
        case 'correct':
          createBeep(880, 0.2);
          setTimeout(() => createBeep(1100, 0.2), 100);
          break;
        case 'incorrect':
          createBeep(400, 0.3);
          break;
        case 'levelup':
          createBeep(523, 0.2);
          setTimeout(() => createBeep(659, 0.2), 150);
          setTimeout(() => createBeep(784, 0.3), 300);
          break;
        case 'achievement':
          createBeep(659, 0.15);
          setTimeout(() => createBeep(784, 0.15), 100);
          setTimeout(() => createBeep(988, 0.2), 200);
          break;
      }
    } catch (error) {
      // Silently handle audio errors
      console.log('Audio not available');
    }
  }, []);

  return { playSound };
}
