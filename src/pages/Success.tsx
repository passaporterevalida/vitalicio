
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function Success() {
  const navigate = useNavigate();
  const { checkSubscription } = useSubscription();

  useEffect(() => {
    // Verificar status da assinatura após alguns segundos para dar tempo do webhook processar
    const timer = setTimeout(() => {
      checkSubscription();
    }, 3000);

    return () => clearTimeout(timer);
  }, [checkSubscription]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Pagamento Confirmado!
                </CardTitle>
                <p className="text-lg text-gray-600">
                  Bem-vindo ao Revalida Quest Premium
                </p>
              </CardHeader>

              <CardContent className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                  <Crown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Sua conta foi atualizada!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Agora você tem acesso completo a todas as funcionalidades premium do Revalida Quest.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Questões Ilimitadas
                    </div>
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Simulados Ilimitados
                    </div>
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Análises Avançadas
                    </div>
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Relatórios PDF
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    Começar a Estudar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/profile')}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Ver Meu Perfil
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Dica:</strong> Suas funcionalidades premium já estão ativas. 
                    Comece explorando os simulados ilimitados e análises avançadas!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
