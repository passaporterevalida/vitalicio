
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

import { toast } from 'sonner';

const plans = [
  {
    name: 'Gratuito',
    description: 'Para conhecer a plataforma',
    price: 'R$ 0',
    period: '/mês',
    priceId: null,
    checkoutUrl: null,
    features: [
      '10 questões por dia por usuário',
      '3 tentativas de missões por mês',
      '3 simulados por mês',
      'Acesso ao banco de questões oficiais',
      'Estatísticas básicas',
    ],
    limitations: [
      'Não participa do ranking nacional',
      'Sem análise de desempenho por IA',
      'Sem exportação de PDF',
      'Sem suporte prioritário',
      'Funcionalidades limitadas'
    ],
    icon: Zap,
    color: 'from-slate-600 to-slate-700',
    borderGradient: 'from-slate-200 via-slate-300 to-slate-200',
    popular: false,
    tier: 'starter'
  },
  {
    name: 'Básico',
    description: 'Para estudantes dedicados',
    price: 'R$ 29',
    period: ',90/mês',
    priceId: 'price_revalida_basic_monthly',
    checkoutUrl: 'https://buy.stripe.com/14AdR9g7R0ZOaAXaFq7ss01',
    features: [
      'Questões ilimitadas',
      '10 tentativas de missões por mês',
      '10 simulados por mês',
      'Participa do ranking nacional',
      'Estatísticas detalhadas',
      'Suporte por email',
    ],
    limitations: [
      'Sem análise de desempenho por IA',
      'Sem exportação de PDF',
      'Sem suporte prioritário',
      'Sem acesso antecipado a novidades'
    ],
    icon: Crown,
    color: 'from-blue-600 to-blue-700',
    borderGradient: 'from-blue-300 via-blue-400 to-blue-300',
    popular: false,
    tier: 'professional'
  },
  {
    name: 'Premium',
    description: 'Para máximo desempenho',
    price: 'R$ 79',
    period: ',90/mês',
    priceId: 'price_revalida_premium_monthly',
    checkoutUrl: 'https://buy.stripe.com/test_aFadR9g7R9wk10n8xi7ss00', // ALTERADO PARA LINK DE TESTE
    features: [
      'Questões ilimitadas',
      'Tentativas de missões ilimitadas',
      'Simulados ilimitados',
      'Participa do ranking nacional',
      'Análise de desempenho por IA',
      'Sugestões inteligentes de estudo',
      'Estatísticas detalhadas e avançadas',
      'Suporte prioritário',
      'Acesso antecipado a funcionalidades',
    ],
    limitations: [],
    icon: Sparkles,
    color: 'from-purple-600 to-indigo-600',
    borderGradient: 'from-purple-300 via-pink-300 to-purple-300',
    popular: true,
    tier: 'enterprise'
  }
];

interface PricingPlansGridProps {
  subscribed: boolean;
  subscription_tier: string | null;
  loading: boolean;
}

export function PricingPlansGrid({ subscribed, subscription_tier, loading }: PricingPlansGridProps) {
  const { createCheckoutSession } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (!plan.priceId) return; // Free plan

    try {
      setLoadingPlan(plan.name);
      
      // Use direct Stripe checkout URL if available
      if (plan.checkoutUrl) {
        window.open(plan.checkoutUrl, '_blank');
        return;
      }
      
      // Fallback to existing checkout system
      const checkoutUrl = await createCheckoutSession(plan.priceId);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const isCurrentPlan = (planName: string) => {
    if (planName === 'Gratuito' && !subscribed) return true;
    if (planName === 'Básico' && subscribed && subscription_tier === 'Basic') return true;
    if (planName === 'Premium' && subscribed && subscription_tier === 'Premium') return true;
    return false;
  };

  return (
    <div className="flex justify-center w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl w-full mb-16 px-4 justify-center">
      {plans.map((plan, index) => {
        const Icon = plan.icon;
        const isCurrent = isCurrentPlan(plan.name);

        return (
          <div
            key={plan.name}
            className={`relative group transition-all duration-500 hover:scale-[1.02] ${
              plan.popular ? 'md:-mt-4 lg:-mt-6' : ''
            }`}
          >
            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${plan.borderGradient} rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Badge Container - positioned outside of card to prevent overlap */}
            <div className="absolute -top-3 left-0 right-0 z-20 flex justify-center gap-2">
              {plan.popular && (
                <Badge className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-4 py-2 text-sm font-bold shadow-xl border-0 rounded-full">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Mais Popular
                </Badge>
              )}
              {isCurrent && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-2 text-sm font-bold shadow-xl border-0 rounded-full">
                  <Check className="w-3 h-3 mr-1 fill-current" />
                  Atual
                </Badge>
              )}
            </div>
            
            <Card className={`relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] lg:min-h-[650px] flex flex-col ${
              plan.popular ? 'shadow-purple-500/20 ring-2 ring-purple-200/50' : 'shadow-slate-500/10'
            } ${isCurrent ? 'ring-2 ring-emerald-200/50 shadow-emerald-500/20' : ''}`}>
              <CardHeader className="text-center pb-4 pt-8 px-6 lg:px-8 flex-shrink-0">
                {/* Icon with enhanced gradient */}
                <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                  <Icon className="w-7 h-7 lg:w-9 lg:h-9 text-white relative z-10" />
                </div>

                {/* Plan Name and Description */}
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base lg:text-lg font-medium">
                  {plan.description}
                </CardDescription>

                {/* Pricing */}
                <div className="mt-6 lg:mt-8 mb-2">
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-lg lg:text-xl font-medium ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="lg:px-8 pb-6 lg:pb-8 flex-1 flex flex-col px-[25px]">
                {/* Features List */}
                <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 flex-1 my-0 mx-[33px] py-[8px] px-[7px]">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg`}>
                        <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm lg:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button - always at bottom */}
                <div className="mt-auto">
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loading || loadingPlan === plan.name || isCurrent}
                    className={`w-full py-3 lg:py-4 text-base lg:text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] rounded-2xl border-0 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white'
                        : plan.name === 'Premium'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                        : plan.name === 'Básico'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white'
                    } ${isCurrent ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {loadingPlan === plan.name ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processando...
                      </div>
                    ) : isCurrent ? (
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                        Plano Atual
                      </div>
                    ) : plan.priceId ? (
                      <div className="flex items-center justify-center gap-2">
                        Assinar Agora
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Começar Grátis
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  {/* Current Plan Status */}
                  {isCurrent && (
                    <div className="text-center mt-3 lg:mt-4">
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs lg:text-sm font-bold flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        Plano ativo e funcionando
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 dark:via-white/2 dark:to-white/5 pointer-events-none rounded-3xl"></div>
            </Card>
          </div>
        );
      })}
      </div>
    </div>
  );
}
