
import { useState } from 'react';
import { MissaoConfig } from '@/hooks/useMissao';

export function useMissaoState() {
  const [configuracao, setConfiguracao] = useState<MissaoConfig | null>(null);
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [questaoRespondida, setQuestaoRespondida] = useState(false);

  const resetState = () => {
    setConfiguracao(null);
    setIniciado(false);
    setFinalizado(false);
    setStartTime(null);
    setTimeElapsed(0);
    setQuestaoRespondida(false);
    setShowLevelUp(false);
    setShowConfetti(false);
  };

  const startMissao = (config: MissaoConfig) => {
    setConfiguracao(config);
    setIniciado(true);
    setFinalizado(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setQuestaoRespondida(false);
  };

  return {
    // State
    configuracao,
    iniciado,
    finalizado,
    showLevelUp,
    newLevel,
    showConfetti,
    timeElapsed,
    startTime,
    questaoRespondida,
    
    // Setters
    setConfiguracao,
    setIniciado,
    setFinalizado,
    setShowLevelUp,
    setNewLevel,
    setShowConfetti,
    setTimeElapsed,
    setStartTime,
    setQuestaoRespondida,
    
    // Actions
    resetState,
    startMissao,
  };
}
