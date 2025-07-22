import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from './useSubscription';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface CancellationState {
  isProcessing: boolean;
  showConfirmation: boolean;
  showReasonModal: boolean;
  cancellationReason?: string;
  feedback?: string;
}

export function useSubscriptionCancellation() {
  const { toast } = useToast();
  const { user, session } = useAuth();
  const { subscribed, subscription_tier, subscription_end, checkSubscription } = useSubscription();
  
  const [state, setState] = useState<CancellationState>({
    isProcessing: false,
    showConfirmation: false,
    showReasonModal: false
  });

  const openCustomerPortal = useCallback(async () => {
    if (!user || !session) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    try {
      setState(prev => ({ ...prev, isProcessing: true }));

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Portal aberto! 🔗",
          description: "Complete o cancelamento no portal do Stripe. Seu acesso continuará até o final do período pago.",
          duration: 8000,
        });
      } else {
        throw new Error('URL do portal não recebida');
      }

    } catch (error) {
      console.error('Error opening customer portal:', error);
      let errorMessage = 'Erro ao abrir portal de cancelamento';
      
      if (error instanceof Error) {
        if (error.message.includes('No Stripe customer ID found')) {
          errorMessage = 'Dados de assinatura não encontrados. Entre em contato com o suporte.';
        } else if (error.message.includes('Database error')) {
          errorMessage = 'Erro no banco de dados. Tente novamente.';
        } else if (error.message.includes('Invalid Stripe customer ID')) {
          errorMessage = 'ID do cliente inválido. Entre em contato com o suporte.';
        } else if (error.message.includes('Stripe configuration error')) {
          errorMessage = 'Erro de configuração do sistema de pagamento. Entre em contato com o suporte.';
        } else if (error.message.includes('Stripe error:')) {
          errorMessage = 'Erro no sistema de pagamento. Tente novamente ou entre em contato com o suporte.';
        } else if (error.message.includes('Authentication error')) {
          errorMessage = 'Erro de autenticação. Faça login novamente.';
        } else {
          errorMessage = `Erro técnico: ${error.message}`;
        }
      }
      
      toast({
        title: "Erro ao abrir portal",
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
      });
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [user, session, toast]);

  const initiateCancellation = useCallback(() => {
    setState(prev => ({ ...prev, showConfirmation: true }));
  }, []);

  const confirmCancellation = useCallback(async (reason?: string, feedback?: string) => {
    if (!subscribed) return;

    try {
      setState(prev => ({ 
        ...prev, 
        isProcessing: true, 
        cancellationReason: reason,
        feedback: feedback 
      }));

      // Abrir portal do Stripe para cancelamento
      await openCustomerPortal();

      // Enviar feedback para analytics/suporte
      if (reason || feedback) {
        console.log('Cancellation feedback:', { 
          reason, 
          feedback, 
          tier: subscription_tier,
          method: 'portal'
        });
        // Aqui você pode enviar para um serviço de analytics ou suporte
      }

      // Resetar estado
      setState({
        isProcessing: false,
        showConfirmation: false,
        showReasonModal: false
      });

    } catch (error) {
      console.error('Error during cancellation:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [subscribed, subscription_tier, openCustomerPortal]);

  const cancelCancellation = useCallback(() => {
    setState({
      isProcessing: false,
      showConfirmation: false,
      showReasonModal: false
    });
  }, []);

  const showReasonModal = useCallback(() => {
    setState(prev => ({ ...prev, showReasonModal: true }));
  }, []);

  const hideReasonModal = useCallback(() => {
    setState(prev => ({ ...prev, showReasonModal: false }));
  }, []);

  const getCancellationInfo = useCallback(() => {
    if (!subscribed || !subscription_end) {
      return {
        canCancel: false,
        daysUntilRenewal: 0,
        renewalDate: null,
        tier: subscription_tier,
        isCancelled: false,
      };
    }

    const renewalDate = new Date(subscription_end);
    const daysUntilRenewal = Math.ceil((renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return {
      canCancel: true,
      daysUntilRenewal: Math.max(0, daysUntilRenewal),
      renewalDate,
      tier: subscription_tier,
      isCancelled: false,
    };
  }, [subscribed, subscription_end, subscription_tier]);

  const getCancellationReasons = useCallback(() => [
    { value: 'too_expensive', label: 'Muito caro', icon: '💰' },
    { value: 'not_using', label: 'Não estou usando', icon: '📱' },
    { value: 'switching', label: 'Mudando para outro serviço', icon: '🔄' },
    { value: 'temporary', label: 'Pausa temporária', icon: '⏸️' },
    { value: 'technical_issues', label: 'Problemas técnicos', icon: '🔧' },
    { value: 'missing_features', label: 'Faltam funcionalidades', icon: '❌' },
    { value: 'other', label: 'Outro motivo', icon: '💭' },
  ], []);

  return {
    // State
    isProcessing: state.isProcessing,
    showConfirmation: state.showConfirmation,
    showReasonModal: state.showReasonModal,
    cancellationReason: state.cancellationReason,
    feedback: state.feedback,

    // Actions
    initiateCancellation,
    confirmCancellation,
    cancelCancellation,
    showReasonModal,
    hideReasonModal,

    // Info
    cancellationInfo: getCancellationInfo(),
    cancellationReasons: getCancellationReasons(),

    // Utilities
    subscribed,
    subscription_tier,
  };
} 