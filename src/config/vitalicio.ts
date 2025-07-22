/**
 * Configurações para o modo vitalício do Revalida Quest
 * Esta versão remove o sistema de assinatura e implementa controle por e-mails autorizados
 */

export const VITALICIO_CONFIG = {
  // Configurações gerais
  isVitalicioMode: true,
  appName: 'Revalida Quest - Versão Vitalícia',
  appDescription: 'Sistema de questões médicas com acesso vitalício para e-mails autorizados',
  
  // Configurações de acesso
  requireEmailAuthorization: true,
  allowDomainAuthorization: true,
  
  // Configurações de assinatura (simuladas)
  subscription: {
    enabled: false, // Sistema de assinatura desabilitado
    defaultTier: 'Vitalício',
    features: {
      unlimitedQuestions: true,
      unlimitedSimulados: true,
      premiumContent: true,
      proFeatures: true,
      prioritySupport: true,
    }
  },
  
  // Configurações de UI
  ui: {
    showPricingPage: false,
    showSubscriptionElements: false,
    showUpgradePrompts: false,
    showVitalicioBadge: true,
    customBranding: {
      primaryColor: '#8B5CF6', // Purple
      secondaryColor: '#EC4899', // Pink
      gradient: 'from-purple-500 to-pink-500',
    }
  },
  
  // Configurações de admin
  admin: {
    adminEmails: [
      'admin@revalidaquest.com',
      'gabrielbzerra1998@gmail.com',
    ],
    adminDomains: ['admin'],
    enableAdminPanel: true,
  },
  
  // Mensagens personalizadas
  messages: {
    unauthorizedEmail: 'Este e-mail não está autorizado para acessar o Revalida Quest. Entre em contato com o administrador para solicitar acesso.',
    accessDenied: 'Acesso negado. Este e-mail não está na lista de autorizados.',
    contactAdmin: 'Para solicitar acesso, entre em contato com o administrador do sistema.',
    vitalicioMode: 'Modo Vitalício - Acesso completo ativado',
  },
  
  // Configurações de segurança
  security: {
    logAccessAttempts: true,
    logUnauthorizedAttempts: true,
    requireEmailConfirmation: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutos
  }
};

/**
 * Função para verificar se um recurso está disponível no modo vitalício
 */
export function isFeatureAvailable(feature: string): boolean {
  const availableFeatures = [
    'questions',
    'simulados', 
    'missions',
    'ranking',
    'stats',
    'profile',
    'premium_content',
    'pro_features',
    'unlimited_access'
  ];
  
  return availableFeatures.includes(feature);
}

/**
 * Função para obter o tier de assinatura (sempre vitalício)
 */
export function getSubscriptionTier(): string {
  return 'Vitalício';
}

/**
 * Função para verificar se o usuário tem acesso premium
 */
export function hasPremiumAccess(): boolean {
  return true; // Sempre true no modo vitalício
}

/**
 * Função para verificar se o usuário tem acesso pro
 */
export function hasProAccess(): boolean {
  return true; // Sempre true no modo vitalício
}

/**
 * Função para obter limite de uso (sempre ilimitado)
 */
export function getUsageLimit(type: 'questions' | 'simulados' | 'missions'): number {
  return -1; // -1 significa ilimitado
}

/**
 * Função para verificar se o uso está dentro do limite
 */
export function isWithinLimit(type: 'questions' | 'simulados' | 'missions', currentUsage: number): boolean {
  return true; // Sempre true no modo vitalício
} 