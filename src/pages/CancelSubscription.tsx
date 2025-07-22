import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CancellationModal } from '@/components/CancellationModal';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { useNavbarVisibility } from '@/hooks/useNavbarVisibility';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  XCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  CreditCard,
  Shield,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CancelSubscription() {
  const { user } = useAuth();
  const { subscribed, subscription_tier, subscription_end, loading } = useSubscription();
  const [showModal, setShowModal] = useState(false);

  // Controlar visibilidade da navbar quando modal estiver aberto
  useNavbarVisibility(showModal);

  // Se não tem assinatura, redirecionar
  useEffect(() => {
    if (!loading && !subscribed) {
      window.location.href = '/';
    }
  }, [subscribed, loading]);

  const getTierInfo = (tier?: string) => {
    switch (tier) {
      case 'Basic':
        return { name: 'Basic', price: 'R$ 19,90', color: 'from-blue-500 to-blue-600' };
      case 'Premium':
        return { name: 'Premium', price: 'R$ 39,90', color: 'from-purple-500 to-purple-600' };
      case 'Pro':
        return { name: 'Pro', price: 'R$ 59,90', color: 'from-green-500 to-green-600' };
      case 'Enterprise':
        return { name: 'Enterprise', price: 'Sob consulta', color: 'from-orange-500 to-orange-600' };
      default:
        return { name: 'Premium', price: 'R$ 39,90', color: 'from-purple-500 to-purple-600' };
    }
  };

  const tierInfo = getTierInfo(subscription_tier);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!subscribed) {
    return null; // Será redirecionado pelo useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-red-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-red-300 rounded-full opacity-20 animate-ping"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] pt-24 sm:pt-28 px-4 text-center">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Perfil
          </Link>
        </div>
        
        <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent drop-shadow-lg mb-4 select-none">
          Cancelar Assinatura
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Temos pena de vê-lo partir. Ajude-nos a melhorar antes de ir embora!
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Subscription Info */}
          <Card className="border-2 border-red-100 bg-gradient-to-br from-red-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${tierInfo.color} text-white`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-semibold">Sua Assinatura</span>
                  <Badge className="ml-2 bg-gradient-to-r from-green-500 to-green-600 text-white">
                    Ativa
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <span className="font-medium text-gray-900">Plano:</span>
                  <span className="font-semibold text-gray-900">{tierInfo.name}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <span className="font-medium text-gray-900">Valor:</span>
                  <span className="font-semibold text-lg text-gray-900">{tierInfo.price}/mês</span>
                </div>
                
                {subscription_end && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <span className="font-medium text-gray-900">Próxima renovação:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(subscription_end).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Info */}
          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-blue-900">
                <Shield className="w-6 h-6" />
                O que acontece ao cancelar
              </CardTitle>
              <CardDescription>
                Informações importantes sobre o processo de cancelamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">Acesso mantido até o final do período</p>
                    <p className="text-sm text-green-600">Seus benefícios premium continuam ativos</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">Sem cobranças adicionais</p>
                    <p className="text-sm text-green-600">Não haverá mais renovações automáticas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">Reativação fácil</p>
                    <p className="text-sm text-green-600">Pode reativar a qualquer momento</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-800">Acesso limitado após o período</p>
                    <p className="text-sm text-orange-600">Voltará ao plano gratuito automaticamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Section */}
        <div className="mt-8 text-center">
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <strong>Atenção:</strong> Esta ação cancelará permanentemente sua assinatura. 
              Você pode reativar a qualquer momento, mas perderá acesso aos recursos premium após o período pago.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              onClick={() => setShowModal(true)}
              variant="destructive"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Iniciar Cancelamento
            </Button>
            
            <div className="text-sm text-gray-600">
              <p>Precisa de ajuda? Entre em contato conosco em{' '}
                <a href="mailto:suporte@revalidaquest.com" className="underline font-medium text-blue-600">
                  suporte@revalidaquest.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      <CancellationModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
} 