
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
  loading: boolean;
  error?: string | null;
}

interface UsageLimits {
  daily_questions_used: number;
  monthly_simulados_used: number;
  last_reset_date: string;
}

export function useSubscription() {
  const { user, session } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    loading: true,
    error: null
  });
  const [usageLimits, setUsageLimits] = useState<UsageLimits | null>(null);

  const checkSubscription = useCallback(async () => {
    // Mock subscription check - Always Premium/Vitalício
    setSubscriptionData({
      subscribed: true,
      subscription_tier: 'premium',
      subscription_end: null, // Vitalício
      loading: false,
      error: null
    });
  }, [user, session]);

  const createCheckoutSession = async (priceId: string) => {
    if (!session) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;
    return data.url;
  };

  const openCustomerPortal = async () => {
    if (!session) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('customer-portal', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;
    window.open(data.url, '_blank');
  };

  const fetchUsageLimits = useCallback(async () => {
    // Mock usage limits
    setUsageLimits({
      daily_questions_used: 0,
      monthly_simulados_used: 0,
      last_reset_date: new Date().toISOString()
    });
  }, [user]);

  const updateUsage = async (type: 'questions' | 'simulados', increment: number = 1) => {
    if (!user) {
      console.log('❌ Não pode atualizar: usuário não logado');
      return;
    }

    try {
      console.log('=== ATUALIZANDO CONTADORES ===');
      console.log('Tipo:', type, 'Incremento:', increment);
      
      // Buscar registro atual
      const { data: currentRecord, error: fetchError } = await supabase
        .from('usage_limits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('Erro ao buscar registro atual:', fetchError);
        return;
      }

      console.log('Registro atual encontrado:', currentRecord);

      // Se não existe, criar
      if (!currentRecord) {
        console.log('Criando primeiro registro de uso');
        const newData = {
          user_id: user.id,
          daily_questions_used: type === 'questions' ? increment : 0,
          monthly_simulados_used: type === 'simulados' ? increment : 0,
          last_reset_date: new Date().toISOString().split('T')[0]
        };

        console.log('Dados para inserção:', newData);
        const { data: created, error: createError } = await supabase
          .from('usage_limits')
          .insert(newData)
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar registro:', createError);
          console.error('Detalhes do erro:', {
            code: createError.code,
            message: createError.message,
            details: createError.details,
            hint: createError.hint
          });
          return;
        }

        console.log('✅ Primeiro registro criado:', created);
        setUsageLimits({
          ...created,
          monthly_simulados_used: (created as any)['monthly_simulados_used'] ?? 0
        } as UsageLimits);
        return;
      }

      // Atualizar registro existente
      const newQuestions = type === 'questions' 
        ? (currentRecord.daily_questions_used || 0) + increment 
        : (currentRecord.daily_questions_used || 0);
      
      const newSimulados = type === 'simulados' 
        ? ((currentRecord as any).monthly_simulados_used || 0) + increment 
        : ((currentRecord as any).monthly_simulados_used || 0);

      console.log('Valores antes da atualização:');
      console.log('- Questions:', currentRecord.daily_questions_used, '→', newQuestions);
      console.log('- Simulados:', (currentRecord as any).monthly_simulados_used, '→', newSimulados);

      const { data: updated, error: updateError } = await supabase
        .from('usage_limits')
        .update({
          daily_questions_used: newQuestions,
          monthly_simulados_used: newSimulados,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentRecord.id)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Erro ao atualizar registro:', updateError);
        return;
      }

      console.log('✅ Registro atualizado com sucesso:', updated);
      setUsageLimits({
        ...updated,
        monthly_simulados_used: (updated as any)['monthly_simulados_used'] ?? 0
      } as UsageLimits);
      
    } catch (error) {
      console.error('❌ Erro geral em updateUsage:', error);
    }
  };

  const canUseFeature = (feature: 'questions' | 'simulados'): boolean => {
    console.log('=== ACESSO ILIMITADO ATIVADO ===');
    console.log('Feature:', feature);
    console.log('✅ Acesso ilimitado garantido para todos os usuários');
    
    // App vitalício - sempre retorna true para acesso ilimitado
    return true;
  };

  const getFeatureLimit = (feature: 'questions' | 'simulados' | 'missions'): { used: number; limit: number; unlimited: boolean } => {
    // App vitalício - todos os usuários têm acesso ilimitado
    const used = usageLimits ? (
      feature === 'questions' ? (usageLimits.daily_questions_used || 0) :
      feature === 'simulados' ? (usageLimits.monthly_simulados_used || 0) :
      0
    ) : 0;

    return {
      used,
      limit: 9999, // Limite alto para simular ilimitado
      unlimited: true // Sempre ilimitado
    };
  };

  useEffect(() => {
    checkSubscription();
    fetchUsageLimits();
  }, [checkSubscription, fetchUsageLimits]);

  // Resetar contadores locais de missões e simulados personalizados ao renovar plano
  useEffect(() => {
    if (!usageLimits) return;
    const lastReset = localStorage.getItem('last-usage-reset');
    if (lastReset !== usageLimits.last_reset_date) {
      // Resetar tentativas de simulados personalizados
      localStorage.setItem('simulado-personalizado-attempts', '0');
      // Resetar tentativas de todas as missões
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('mission-attempts-')) {
          localStorage.setItem(key, '0');
        }
      });
      localStorage.setItem('last-usage-reset', usageLimits.last_reset_date);
    }
  }, [usageLimits]);

  // Valores calculados
  const isFreePlan = !subscriptionData.subscribed;
  const isBasicPlan = subscriptionData.subscribed && subscriptionData.subscription_tier === 'Basic';
  const isPremiumPlan = subscriptionData.subscribed && (subscriptionData.subscription_tier === 'Premium' || subscriptionData.subscription_tier === 'Pro' || subscriptionData.subscription_tier === 'Enterprise');
  const isProPlan = subscriptionData.subscribed && subscriptionData.subscription_tier === 'Pro';
  const isEnterprisePlan = subscriptionData.subscribed && subscriptionData.subscription_tier === 'Enterprise';

  return {
    ...subscriptionData,
    usageLimits,
    checkSubscription,
    createCheckoutSession,
    openCustomerPortal,
    updateUsage,
    canUseFeature,
    getFeatureLimit,
    isFreePlan,
    isBasicPlan,
    isPremiumPlan,
    isProPlan,
    isEnterprisePlan,
  };
}
