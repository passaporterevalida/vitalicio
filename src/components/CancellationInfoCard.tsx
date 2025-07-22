import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  Clock, 
  Shield, 
  CreditCard, 
  CheckCircle,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export function CancellationInfoCard() {
  return (
    <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <HelpCircle className="w-5 h-5" />
          Como Cancelar sua Assinatura
        </CardTitle>
        <CardDescription>
          Processo simples e transparente de cancelamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Process Steps */}
        <div className="space-y-3">
          <h4 className="font-medium text-blue-900">Passo a passo:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Acesse o Portal do Cliente</p>
                <p className="text-sm text-gray-600">Clique em "Gerenciar Assinatura" no seu perfil</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Escolha Cancelar</p>
                <p className="text-sm text-gray-600">No portal, selecione "Cancelar Assinatura"</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Confirme a Ação</p>
                <p className="text-sm text-gray-600">Confirme o cancelamento no portal do Stripe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Importante:</strong> O cancelamento é processado pelo Stripe, garantindo segurança e transparência.
          </AlertDescription>
        </Alert>

        {/* What Happens After */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">O que acontece após o cancelamento:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800 text-sm">Acesso Mantido</p>
                <p className="text-xs text-green-600">Seus benefícios continuam até o final do período pago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800 text-sm">Sem Cobranças</p>
                <p className="text-xs text-green-600">Não haverá mais cobranças automáticas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800 text-sm">Reativação Fácil</p>
                <p className="text-xs text-green-600">Pode reativar a qualquer momento</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-800 text-sm">Limites Aplicados</p>
                <p className="text-xs text-orange-600">Após o período pago, voltará ao plano gratuito</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Precisa de Ajuda?</h4>
              <p className="text-sm text-gray-600 mb-2">
                Nossa equipe está aqui para ajudar com qualquer dúvida sobre cancelamento.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  📧 suporte@revalidaquest.com
                </Badge>
                <Badge variant="outline" className="text-xs">
                  💬 Chat em tempo real
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Info */}
        <div className="text-xs text-gray-500 text-center border-t border-gray-200 pt-3">
          <p>
            Cancelamento conforme Código de Defesa do Consumidor (CDC) e LGPD. 
            Processo transparente e sem taxas ocultas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 