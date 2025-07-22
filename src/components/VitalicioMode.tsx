import { ReactNode } from 'react';

interface VitalicioModeProps {
  children: ReactNode;
}

/**
 * Componente para configurar o modo vitalício
 * Remove ou modifica elementos relacionados ao sistema de assinatura
 */
export function VitalicioMode({ children }: VitalicioModeProps) {
  return <>{children}</>;
}

/**
 * Hook para verificar se está no modo vitalício
 */
export function useVitalicioMode() {
  // Sempre retorna true para esta versão
  return {
    isVitalicioMode: true,
    hasSubscription: true, // Simula que todos têm assinatura
    subscriptionTier: 'Vitalício',
    canAccessPremium: true,
    canAccessPro: true,
  };
}

/**
 * Componente para mostrar badge de modo vitalício
 */
export function VitalicioBadge() {
  return (
    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <span className="mr-1">🏥</span>
      Vitalício
    </div>
  );
}

/**
 * Componente para substituir elementos de assinatura
 */
export function VitalicioUpgrade() {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
      <div className="text-4xl mb-2">🏥</div>
      <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
        Acesso Vitalício
      </h3>
      <p className="text-purple-700 dark:text-purple-300 text-sm">
        Você tem acesso completo a todas as funcionalidades do Revalida Quest.
      </p>
    </div>
  );
} 