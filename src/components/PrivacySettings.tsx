
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Shield, Cookie, Download, Trash2 } from 'lucide-react';
import { DataDeletionModal } from './DataDeletionModal';
import { useToast } from '@/hooks/use-toast';

export function PrivacySettings() {
  const { toast } = useToast();
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const analytics = localStorage.getItem('analytics-enabled') === 'true';
    setCookieConsent(consent);
    setAnalyticsEnabled(analytics);
  }, []);

  const updateCookieSettings = (enableAnalytics: boolean) => {
    localStorage.setItem('analytics-enabled', enableAnalytics.toString());
    localStorage.setItem('cookie-consent', 'accepted');
    setAnalyticsEnabled(enableAnalytics);
    
    toast({
      title: "Configurações atualizadas",
      description: enableAnalytics 
        ? "Cookies de análise habilitados" 
        : "Apenas cookies essenciais serão utilizados",
    });
  };

  const downloadData = () => {
    // Placeholder for data export functionality
    toast({
      title: "Exportação de dados",
      description: "Funcionalidade em desenvolvimento. Entre em contato: privacidade@revalidaquest.com",
    });
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Configurações de Privacidade
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Cookie Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cookie className="w-4 h-4 text-orange-600" />
            <Label className="text-base font-medium">Cookies</Label>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Cookies Essenciais</Label>
                <p className="text-sm text-gray-600">Necessários para funcionamento básico</p>
              </div>
              <Switch checked={true} disabled />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Cookies de Análise</Label>
                <p className="text-sm text-gray-600">Ajudam a melhorar a plataforma</p>
              </div>
              <Switch 
                checked={analyticsEnabled} 
                onCheckedChange={updateCookieSettings}
              />
            </div>
          </div>
          
          {cookieConsent && (
            <p className="text-xs text-gray-500">
              Consentimento: {cookieConsent === 'accepted' ? 'Aceito' : 'Rejeitado'} 
              em {new Date(localStorage.getItem('cookie-consent-date') || '').toLocaleDateString()}
            </p>
          )}
        </div>

        <Separator />

        {/* Data Rights (LGPD) */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Seus Direitos (LGPD)</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <Label className="font-medium">Exportar Dados</Label>
                <p className="text-sm text-gray-600">Baixe uma cópia dos seus dados</p>
              </div>
              <Button onClick={downloadData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Exportar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <Label className="font-medium text-red-700">Excluir Dados</Label>
                <p className="text-sm text-red-600">Exclusão permanente e irreversível</p>
              </div>
              <DataDeletionModal />
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Dúvidas sobre Privacidade?</Label>
          <p className="text-sm text-gray-600">
            Entre em contato: <a href="mailto:privacidade@revalidaquest.com" className="text-blue-600 hover:underline">privacidade@revalidaquest.com</a>
          </p>
          <p className="text-xs text-gray-500">
            Respondemos em até 15 dias úteis conforme LGPD
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
