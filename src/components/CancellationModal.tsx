import { useState } from 'react';
import { useSubscriptionCancellation } from '@/hooks/useSubscriptionCancellation';
import { useToast } from '@/hooks/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  XCircle, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  CheckCircle,
  Clock,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CancellationModal({ isOpen, onClose }: CancellationModalProps) {
  const { toast } = useToast();
  const {
    isProcessing,
    showConfirmation,
    showReasonModal,
    cancellationReason,
    feedback,
    initiateCancellation,
    confirmCancellation,
    cancelCancellation,
    showReasonModal: showReason,
    hideReasonModal,
    cancellationInfo,
    cancellationReasons,
    subscribed,
    subscription_tier
  } = useSubscriptionCancellation();

  // Controlar visibilidade da navbar
  useNavbarVisibility(isOpen);

  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customFeedback, setCustomFeedback] = useState<string>('');
  const [step, setStep] = useState<'reason' | 'confirm'>('reason');

  const handleStartCancellation = () => {
    initiateCancellation();
    setStep('reason');
  };

  const handleReasonSubmit = () => {
    if (!selectedReason) {
      toast({
        title: "Selecione um motivo",
        description: "Por favor, selecione um motivo para o cancelamento.",
        variant: "destructive",
      });
      return;
    }
    setStep('confirm');
  };

  const handleConfirmCancellation = async () => {
    await confirmCancellation(selectedReason, customFeedback);
    onClose();
    // Reset state
    setStep('reason');
    setSelectedReason('');
    setCustomFeedback('');
  };

  const handleClose = () => {
    cancelCancellation();
    setStep('reason');
    setSelectedReason('');
    setCustomFeedback('');
    onClose();
  };

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

  if (!subscribed) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-red-700">
            <XCircle className="w-6 h-6" />
            Cancelar Assinatura
          </DialogTitle>
          <DialogDescription>
            Temos pena de vê-lo partir. Ajude-nos a melhorar!
          </DialogDescription>
        </DialogHeader>

        {step === 'reason' && (
          <div className="space-y-6">
            {/* Current Plan Info */}
            <Card className="border-2 border-red-100 bg-gradient-to-br from-red-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tierInfo.color} text-white`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Plano Atual</span>
                    <Badge className="ml-2 bg-gradient-to-r from-green-500 to-green-600 text-white">
                      Ativo
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <span className="font-medium text-gray-900">{tierInfo.name}</span>
                    <span className="font-semibold text-gray-900">{tierInfo.price}/mês</span>
                  </div>
                  
                  {cancellationInfo.renewalDate && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                      <span className="text-sm text-gray-600">Próxima renovação:</span>
                      <span className="font-medium text-gray-900">
                        {cancellationInfo.renewalDate.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Method Info */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                  Cancelamento via Portal Stripe
                </CardTitle>
                <CardDescription>
                  Processo seguro e confiável através do portal oficial do Stripe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-700">Seguro e Confiável</h4>
                      <p className="text-sm text-green-600">Processo oficial do Stripe com todas as garantias de segurança</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-700">Acesso Mantido</h4>
                      <p className="text-sm text-blue-600">Seu acesso premium continua até o final do período pago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-700">Reativação Fácil</h4>
                      <p className="text-sm text-purple-600">Pode reativar sua assinatura a qualquer momento</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reason Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Por que está cancelando?</h3>
              </div>
              
              <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                <div className="grid grid-cols-1 gap-3">
                  {cancellationReasons.map((reason) => (
                    <div key={reason.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={reason.value} id={reason.value} />
                      <Label htmlFor={reason.value} className="flex items-center gap-2 cursor-pointer">
                        <span className="text-lg">{reason.icon}</span>
                        <span className="font-medium">{reason.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {selectedReason === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="custom-feedback">Conte-nos mais sobre seu motivo:</Label>
                  <Textarea
                    id="custom-feedback"
                    placeholder="Descreva o motivo do cancelamento..."
                    value={customFeedback}
                    onChange={(e) => setCustomFeedback(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleClose}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button onClick={handleReasonSubmit} disabled={!selectedReason}>
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            {/* Confirmation Alert */}
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Atenção:</strong> Após o cancelamento, você perderá acesso aos recursos premium no final do período pago.
              </AlertDescription>
            </Alert>

            {/* What happens when you cancel */}
            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-700">
                  <Info className="w-5 h-5" />
                  O que acontece ao cancelar:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-sm">
                      Seu acesso premium continuará até <strong>{cancellationInfo.renewalDate?.toLocaleDateString('pt-BR')}</strong>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                    <XCircle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">Não haverá mais cobranças automáticas</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Você voltará ao plano gratuito automaticamente</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Pode reativar a qualquer momento</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('reason')}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button 
                onClick={handleConfirmCancellation} 
                disabled={isProcessing}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancelar Assinatura
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 