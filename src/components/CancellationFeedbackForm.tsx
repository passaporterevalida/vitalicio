import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle,
  Send
} from 'lucide-react';

interface CancellationFeedbackFormProps {
  reasons: Array<{ value: string; label: string }>;
  onSubmit: (reason: string, feedback: string) => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export function CancellationFeedbackForm({ 
  reasons, 
  onSubmit, 
  onCancel, 
  isProcessing 
}: CancellationFeedbackFormProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    onSubmit(selectedReason, feedback);
    setShowThankYou(true);
  };

  if (showThankYou) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Obrigado pelo feedback!
              </h3>
              <p className="text-green-700 text-sm">
                Sua opinião é muito importante para nós. Continuaremos melhorando nossos serviços.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <MessageSquare className="w-5 h-5" />
          Ajude-nos a melhorar
        </CardTitle>
        <CardDescription className="text-orange-700">
          Conte-nos por que você está cancelando. Sua opinião é valiosa!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Opcional:</strong> Este feedback nos ajuda a melhorar nossos serviços.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Qual o principal motivo do cancelamento?
            </Label>
            <RadioGroup 
              value={selectedReason} 
              onValueChange={setSelectedReason}
              className="space-y-2"
            >
              {reasons.map((reason) => (
                <div key={reason.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.value} id={reason.value} />
                  <Label htmlFor={reason.value} className="text-sm text-gray-700 cursor-pointer">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
              Comentários adicionais (opcional)
            </Label>
            <Textarea
              id="feedback"
              placeholder="Conte-nos mais sobre sua experiência ou sugestões de melhoria..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[80px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {feedback.length}/500 caracteres
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              onClick={onCancel} 
              variant="outline" 
              className="flex-1"
              disabled={isProcessing}
            >
              Pular
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              disabled={isProcessing || !selectedReason}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 