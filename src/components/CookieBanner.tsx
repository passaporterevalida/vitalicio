
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    // Clear any existing tracking cookies
    localStorage.removeItem('analytics-enabled');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-2xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                🍪 Cookies e Privacidade
              </h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                Utilizamos cookies essenciais para o funcionamento da plataforma e cookies de análise para melhorar sua experiência. 
                Seus dados de estudo e progresso são protegidos conforme nossa{' '}
                <a href="/privacidade" className="text-blue-600 hover:underline font-medium">
                  Política de Privacidade
                </a>
                .
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={acceptCookies}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
                >
                  Aceitar Todos
                </Button>
                <Button
                  onClick={rejectCookies}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1 sm:flex-none"
                >
                  Apenas Essenciais
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Você pode alterar suas preferências a qualquer momento nas configurações.
              </p>
            </div>
            
            <Button
              onClick={rejectCookies}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
