
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Stethoscope, ShieldCheck } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Carregando Revalida Quest
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Preparando sua experiência médica...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-4">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Acesso Restrito
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Você precisa estar logado para acessar esta página do Revalida Quest.
            </p>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Faça login ou crie uma conta para começar sua jornada médica! 🏥
              </p>
            </div>
          </div>
        </div>
        <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />
      </div>
    );
  }

  return <>{children}</>;
}
