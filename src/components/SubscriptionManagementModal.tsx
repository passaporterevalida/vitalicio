import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { CancellationModal } from './CancellationModal';
import { useNavbarVisibility } from '@/hooks/useNavbarVisibility';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Calendar, 
  AlertTriangle, 
  Info, 
  XCircle,
  CheckCircle
} from 'lucide-react';

interface SubscriptionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionManagementModal({ isOpen, onClose }: SubscriptionManagementModalProps) {
  const { subscribed, subscription_tier, subscription_end } = useSubscription();
  const [showCancellationModal, setShowCancellationModal] = useState(false);

  // Controlar visibilidade da navbar quando modal de cancelamento estiver aberto
  useNavbarVisibility(showCancellationModal);



  const handleCancelSubscription = () => {
    setShowCancellationModal(true);
  };

  const getTierInfo = () => {
    switch (subscription_tier) {
      case 'Basic':
        return {
          name: 'Basic',
          price: 'R$ 29,90',
          icon: Crown,
          color: 'from-blue-500 to-blue-600',
          features: ['Questões ilimitadas', '5 simulados/mês', 'Análises básicas']
        };
      case 'Premium':
        return {
          name: 'Premium',
          price: 'R$ 79,90',
          icon: Crown,
          color: 'from-purple-500 to-purple-600',
          features: ['Tudo do Basic', 'Simulados ilimitados', 'IA avançada', 'Relatórios PDF']
        };
      case 'Pro':
        return {
          name: 'Pro',
          price: 'R$ 99,90',
          icon: Crown,
          color: 'from-green-500 to-green-600',
          features: ['Tudo do Premium', 'Dashboard admin', 'API integração', 'Suporte dedicado']
        };
      default:
        return {
          name: 'Premium',
          price: 'R$ 79,90',
          icon: Crown,
          color: 'from-purple-500 to-purple-600',
          features: ['Acesso completo', 'Recursos avançados']
        };
    }
  };

  const tierInfo = getTierInfo();
  const IconComponent = tierInfo.icon;

  if (!subscribed) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-6 h-6 text-yellow-500" />
            Gerenciar Assinatura
          </DialogTitle>
          <DialogDescription>
            Gerencie sua assinatura, pagamentos e configurações de cobrança
          </DialogDescription>
        </DialogHeader>

          <div className="space-y-6">
            {/* Current Plan Info */}
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tierInfo.color} text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Plano Atual</span>
                    <Badge className="ml-2 bg-gradient-to-r from-green-500 to-green-600 text-white">
                      Ativo
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Plano:</span>
                      <span className="font-semibold">{tierInfo.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Valor:</span>
                      <span className="font-semibold text-lg">{tierInfo.price}/mês</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Próxima cobrança:</span>
                      <span className="font-semibold">
                        {subscription_end ? new Date(subscription_end).toLocaleDateString('pt-BR') : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-600">Benefícios incluídos:</h4>
                    <ul className="space-y-1">
                      {tierInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* Cancel Option */}
            <Card className="border border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-700">
                  <XCircle className="w-5 h-5" />
                  Cancelar Assinatura
                </CardTitle>
                <CardDescription className="text-red-600">
                  Cancelar permanentemente sua assinatura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-200 bg-red-100">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    <strong>Atenção:</strong> Após o cancelamento, você perderá acesso aos recursos premium no final do período pago.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-2">O que acontece ao cancelar:</h4>
                  <ul className="space-y-1 text-sm text-red-600">
                    <li>• Seu acesso premium continuará até {subscription_end ? new Date(subscription_end).toLocaleDateString('pt-BR') : 'o final do período pago'}</li>
                    <li>• Não haverá mais cobranças automáticas</li>
                    <li>• Você voltará ao plano gratuito automaticamente</li>
                    <li>• Pode reativar a qualquer momento</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleCancelSubscription}
                  variant="destructive"
                  className="w-full"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar Assinatura
                </Button>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Precisa de ajuda?</strong> Entre em contato conosco em{' '}
                <a href="mailto:suporte@revalidaquest.com" className="underline font-medium">
                  suporte@revalidaquest.com
                </a>
                {' '}ou use o chat em tempo real.
              </AlertDescription>
            </Alert>
          </div>

        {/* Cancellation Modal */}
        <CancellationModal 
          isOpen={showCancellationModal} 
          onClose={() => setShowCancellationModal(false)} 
        />
      </DialogContent>
    </Dialog>
  );
} 