
import { useEffect, useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function UsageMonitor() {
  const { 
    usageLimits, 
    subscribed, 
    subscription_tier,
    getFeatureLimit,
    loading 
  } = useSubscription();

  const [systemStatus, setSystemStatus] = useState<'healthy' | 'warning' | 'error'>('healthy');

  useEffect(() => {
    if (!usageLimits) return;

    const questionsLimit = getFeatureLimit('questions');

    // Check system health based on usage
    if (!subscribed) {
      const questionsUsage = (questionsLimit.used / questionsLimit.limit) * 100;

      if (questionsUsage >= 100) {
        setSystemStatus('error');
      } else if (questionsUsage >= 80) {
        setSystemStatus('warning');
      } else {
        setSystemStatus('healthy');
      }
    } else {
      setSystemStatus('healthy');
    }
  }, [usageLimits, subscribed, getFeatureLimit]);

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const questionsLimit = getFeatureLimit('questions');

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Monitor de Uso
          </div>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            {systemStatus === 'healthy' && 'Saudável'}
            {systemStatus === 'warning' && 'Atenção'}
            {systemStatus === 'error' && 'Limite'}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Plan Status */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div>
            <span className="font-medium">Plano Atual</span>
            <p className="text-sm text-gray-600">
              {subscribed ? subscription_tier : 'Gratuito'}
            </p>
          </div>
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>

        {/* Usage Stats */}
        <div className="space-y-4">
          {/* Questions Usage */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Questões (hoje)</span>
              <span className="text-gray-600">
                {questionsLimit.unlimited ? 'Ilimitado' : `${questionsLimit.used}/${questionsLimit.limit}`}
              </span>
            </div>
            <Progress 
              value={questionsLimit.unlimited ? 100 : (questionsLimit.used / questionsLimit.limit) * 100}
              className="h-2"
            />
          </div>
        </div>

        {/* Alerts */}
        {systemStatus === 'error' && !subscribed && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-red-800">
              Você atingiu seu limite diário/mensal. Faça upgrade para continuar estudando!
            </AlertDescription>
          </Alert>
        )}

        {systemStatus === 'warning' && !subscribed && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-yellow-800">
              Você está próximo do limite. Considere fazer upgrade para acesso ilimitado.
            </AlertDescription>
          </Alert>
        )}

        {/* Usage Tips */}
        {!subscribed && (
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Limites resetam diariamente (questões)</p>
            <p>• Planos pagos oferecem acesso ilimitado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
