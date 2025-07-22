import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, AlertTriangle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
export function DataDeletionModal() {
  const {
    user,
    session
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const handleDeleteRequest = async () => {
    if (!user || !session) return;
    if (confirmText !== 'EXCLUIR MEUS DADOS') {
      toast({
        title: "Texto de confirmação incorreto",
        description: "Digite exatamente: EXCLUIR MEUS DADOS",
        variant: "destructive"
      });
      return;
    }
    try {
      setLoading(true);
      const {
        error
      } = await supabase.functions.invoke('delete-user-data', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      if (error) throw error;
      toast({
        title: "Solicitação enviada com sucesso",
        description: "Você receberá um email de confirmação em até 24 horas. Seus dados serão excluídos conforme a LGPD."
      });
      setIsOpen(false);
      setStep(1);
      setConfirmText('');
    } catch (error) {
      console.error('Error requesting data deletion:', error);
      toast({
        title: "Erro na solicitação",
        description: "Tente novamente ou entre em contato: privacidade@revalidaquest.com",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  if (!user) return null;
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="text-xs">
          <Trash2 className="w-3 h-3 mr-1" />
          Excluir Meus Dados
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Exclusão de Dados (LGPD)
          </DialogTitle>
          <DialogDescription>
            Solicitação de exclusão permanente de dados pessoais
          </DialogDescription>
        </DialogHeader>

        {step === 1 && <div className="space-y-4">
            <Alert className="border-orange-200 bg-orange-50">
              <Shield className="w-4 h-4" />
              <AlertDescription className="text-sm">
                <strong>Direito garantido pela LGPD:</strong> Você pode solicitar a exclusão completa dos seus dados pessoais.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-medium">O que será excluído:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Dados da conta (nome, email)</li>
                <li>• Histórico de questões e simulados</li>
                <li>• Estatísticas e progresso</li>
                <li>• Informações de pagamento*</li>
              </ul>
              
              <p className="text-xs text-gray-500">
                *Dados fiscais serão mantidos por 5 anos conforme legislação brasileira
              </p>
            </div>

            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-sm text-red-800">
                <strong>Ação irreversível:</strong> Após confirmação, não será possível recuperar seus dados.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button onClick={() => setStep(2)} variant="destructive" className="flex-1">
                Continuar
              </Button>
            </div>
          </div>}

        {step === 2 && <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-sm">
                Para confirmar, digite exatamente: <strong>EXCLUIR MEUS DADOS</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="confirm-deletion">Texto de confirmação</Label>
              <Input id="confirm-deletion" type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder="EXCLUIR MEUS DADOS" className="text-center font-mono" />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p><strong>Processo:</strong></p>
              <ol className="mt-2 space-y-1 text-gray-600">
                <li>1. Solicitação registrada</li>
                <li>2. Email de confirmação (24h)</li>
                <li>3. Exclusão dos dados (72h)</li>
                <li>4. Confirmação final por email</li>
              </ol>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Voltar
              </Button>
              <Button onClick={handleDeleteRequest} variant="destructive" className="flex-1" disabled={loading || confirmText !== 'EXCLUIR MEUS DADOS'}>
                {loading ? 'Processando...' : 'Confirmar Exclusão'}
              </Button>
            </div>
          </div>}
      </DialogContent>
    </Dialog>;
}