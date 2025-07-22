import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';

interface SubscriptionStatusCardProps {
  onManageSubscription: () => void;
}

export function SubscriptionStatusCard({ onManageSubscription }: SubscriptionStatusCardProps) {
  const { subscribed, subscription_tier, subscription_end, loading } = useSubscription();

  if (loading) {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Crown className="w-5 h-5 text-blue-600" />
            Status da Assinatura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!subscribed) {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Crown className="w-5 h-5 text-blue-600" />
            Status da Assinatura
          </CardTitle>
          <CardDescription>
            Atualmente você está no plano gratuito
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                <Crown className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Plano Gratuito</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Acesso limitado</p>
              </div>
            </div>
            <Badge variant="secondary">Ativo</Badge>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Limites atuais:</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Questões por dia:</span>
                <span className="font-medium">10</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Simulados por mês:</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button 
              onClick={onManageSubscription} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Fazer Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTierInfo = () => {
    switch (subscription_tier) {
      case 'Basic':
        return {
          name: 'Basic',
          price: 'R$ 29,90',
          color: 'from-blue-500 to-blue-600',
          features: ['Questões ilimitadas', '5 simulados/mês', 'Análises básicas']
        };
      case 'Premium':
        return {
          name: 'Premium',
          price: 'R$ 79,90',
          color: 'from-purple-500 to-purple-600',
          features: ['Tudo do Basic', 'Simulados ilimitados', 'IA avançada', 'Relatórios PDF']
        };
      case 'Pro':
        return {
          name: 'Pro',
          price: 'R$ 99,90',
          color: 'from-green-500 to-green-600',
          features: ['Tudo do Premium', 'Dashboard admin', 'API integração', 'Suporte dedicado']
        };
      default:
        return {
          name: 'Premium',
          price: 'R$ 79,90',
          color: 'from-purple-500 to-purple-600',
          features: ['Acesso completo', 'Recursos avançados']
        };
    }
  };

  const tierInfo = getTierInfo();
  const daysUntilRenewal = subscription_end 
    ? Math.ceil((new Date(subscription_end).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Crown className="w-5 h-5 text-blue-600" />
          Status da Assinatura
        </CardTitle>
        <CardDescription>
          Seu plano premium está ativo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Plan */}
        <div className={`p-4 rounded-lg bg-gradient-to-r ${tierInfo.color} text-white`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-lg">{tierInfo.name}</p>
                <p className="text-sm opacity-90">{tierInfo.price}/mês</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              Ativo
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Benefícios incluídos:</h4>
            <ul className="space-y-1">
              {tierInfo.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-3 h-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Renewal Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Próxima renovação:</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {subscription_end ? new Date(subscription_end).toLocaleDateString('pt-BR') : 'N/A'}
            </span>
          </div>

          {daysUntilRenewal > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Dias até renovação:</span>
                <span className="font-medium">{daysUntilRenewal} dias</span>
              </div>
              <Progress 
                value={Math.max(0, 100 - (daysUntilRenewal / 30) * 100)} 
                className="h-2"
              />
            </div>
          )}
        </div>

        {/* Management Actions */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
          <Button 
            onClick={onManageSubscription} 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Gerenciar Assinatura
          </Button>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Cancelar, pausar ou alterar seu plano
          </div>
        </div>

        {/* Support Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200">Acesso Premium Ativo</p>
              <p className="text-blue-600 dark:text-blue-300">
                Aproveite todos os recursos exclusivos do seu plano {tierInfo.name}!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 