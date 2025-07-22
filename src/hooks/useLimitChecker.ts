
import { useSubscription } from './useSubscription';
import { useToast } from './use-toast';
import { useState } from 'react';
import { useMissions } from './useMissions';

export function useLimitChecker() {
  const { canUseFeature, updateUsage, getFeatureLimit } = useSubscription();
  const { toast } = useToast();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState<'questions' | 'simulados' | 'missions'>('questions');
  const { getMissionLimit, getMissionAttemptsThisMonth, registerMissionAttempt } = useMissions();

  const checkQuestionLimit = async (): Promise<boolean> => {
    console.log('=== ACESSO ILIMITADO - QUESTÕES ===');
    console.log('✅ Acesso ilimitado garantido para questões');
    
    // App vitalício - sempre permite acesso
    return true;
  };

  const checkSimuladoLimit = async (): Promise<boolean> => {
    console.log('=== ACESSO ILIMITADO - SIMULADOS ===');
    console.log('✅ Acesso ilimitado garantido para simulados');
    
    // App vitalício - sempre permite acesso
    return true;
  };

  const checkMissionLimit = async (missionId: string): Promise<boolean> => {
    console.log('=== ACESSO ILIMITADO - MISSÕES ===');
    console.log('✅ Acesso ilimitado garantido para missões');
    
    // App vitalício - sempre permite acesso
    return true;
  };

  const incrementQuestionUsage = async () => {
    console.log('=== INCREMENTANDO CONTADOR DE QUESTÕES ===');
    try {
      await updateUsage('questions', 1);
      console.log('✅ Contador de questões incrementado');
    } catch (error) {
      console.error('❌ Erro ao incrementar contador de questões:', error);
    }
  };

  const incrementSimuladoUsage = async () => {
    console.log('=== INCREMENTANDO CONTADOR DE SIMULADOS ===');
    try {
      await updateUsage('simulados', 1);
      console.log('✅ Contador de simulados incrementado');
    } catch (error) {
      console.error('❌ Erro ao incrementar contador de simulados:', error);
    }
  };

  const incrementMissionUsage = async (missionId: string) => {
    try {
      await registerMissionAttempt(missionId);
      console.log('✅ Tentativa de missão registrada');
    } catch (error) {
      console.error('❌ Erro ao registrar tentativa de missão:', error);
    }
  };

  const closeLimitModal = () => {
    setShowLimitModal(false);
  };

  return {
    checkQuestionLimit,
    checkSimuladoLimit,
    checkMissionLimit,
    incrementQuestionUsage,
    incrementSimuladoUsage,
    incrementMissionUsage,
    showLimitModal,
    limitType,
    closeLimitModal
  };
}
