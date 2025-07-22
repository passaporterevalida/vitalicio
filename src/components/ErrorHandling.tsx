import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

interface ErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
  onReset?: () => void;
  showDetails?: boolean;
}

export function ErrorDisplay({ error, onRetry, onReset, showDetails = false }: ErrorDisplayProps) {
  const [showFullDetails, setShowFullDetails] = useState(showDetails);

  const getErrorMessage = (error: Error) => {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Problema de conexão. Verifique sua internet e tente novamente.';
    }
    if (error.message.includes('auth') || error.message.includes('login')) {
      return 'Sessão expirada. Faça login novamente.';
    }
    if (error.message.includes('permission') || error.message.includes('access')) {
      return 'Você não tem permissão para acessar este recurso.';
    }
    return 'Ocorreu um erro inesperado. Tente novamente.';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-red-200 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ops! Algo deu errado
          </h3>
          <p className="text-gray-600 text-sm">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          {onRetry && (
            <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}
          
          {onReset && (
            <Button onClick={onReset} variant="outline">
              Resetar
            </Button>
          )}
        </div>

        {showFullDetails && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Detalhes técnicos
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

// Hook para detectar conectividade
export function useConnectivity() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Componente de status de conectividade
export function ConnectivityStatus() {
  const isOnline = useConnectivity();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <Alert className={`border-2 ${isOnline ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="flex items-center gap-2">
          {isOnline ? <Wifi className="w-4 h-4 text-green-600" /> : <WifiOff className="w-4 h-4 text-red-600" />}
          <AlertDescription className={isOnline ? 'text-green-800' : 'text-red-800'}>
            {isOnline ? 'Conexão restaurada' : 'Sem conexão com a internet'}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}

// Hook para retry automático
export function useRetry(fn: () => Promise<any>, maxRetries = 3) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const executeWithRetry = async () => {
    setIsRetrying(true);
    let lastError: Error;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const result = await fn();
        setRetryCount(0);
        setIsRetrying(false);
        return result;
      } catch (error) {
        lastError = error as Error;
        setRetryCount(i + 1);
        
        if (i < maxRetries) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    }

    setIsRetrying(false);
    throw lastError!;
  };

  return {
    executeWithRetry,
    retryCount,
    isRetrying,
    hasRetriesLeft: retryCount < maxRetries
  };
} 