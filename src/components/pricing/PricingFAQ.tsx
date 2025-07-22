
import { Card, CardContent } from '@/components/ui/card';

export function PricingFAQ() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Perguntas Frequentes</h2>
      <div className="grid gap-6">
        <Card className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-white">Posso cancelar a qualquer momento?</h3>
            <p className="text-gray-600 dark:text-slate-300">
              Sim, você pode cancelar sua assinatura a qualquer momento através do portal do cliente. Não há taxas de cancelamento e você mantém o acesso até o fim do período já pago.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-white">Preciso de cartão de crédito para o plano gratuito?</h3>
            <p className="text-gray-600 dark:text-slate-300">
              Não, o plano gratuito não requer cartão de crédito. Basta criar sua conta e começar a estudar imediatamente, sem compromisso.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-white">Posso fazer upgrade ou downgrade do meu plano?</h3>
            <p className="text-gray-600 dark:text-slate-300">
              Sim, você pode alterar seu plano a qualquer momento. As mudanças são processadas imediatamente e o valor é ajustado proporcionalmente ao tempo restante do seu ciclo atual.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
