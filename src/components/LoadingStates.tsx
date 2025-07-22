import { Loader2, Sparkles, Target, BookOpen } from 'lucide-react';

interface LoadingStateProps {
  type?: 'questions' | 'missions' | 'stats' | 'auth' | 'general';
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export function LoadingState({ 
  type = 'general', 
  message, 
  showProgress = false, 
  progress = 0 
}: LoadingStateProps) {
  const getLoadingConfig = () => {
    switch (type) {
      case 'questions':
        return {
          icon: BookOpen,
          defaultMessage: 'Carregando questões do Revalida...',
          color: 'text-blue-600'
        };
      case 'missions':
        return {
          icon: Target,
          defaultMessage: 'Preparando sua missão médica...',
          color: 'text-purple-600'
        };
      case 'stats':
        return {
          icon: Sparkles,
          defaultMessage: 'Analisando seu progresso...',
          color: 'text-green-600'
        };
      case 'auth':
        return {
          icon: Sparkles,
          defaultMessage: 'Autenticando...',
          color: 'text-blue-600'
        };
      default:
        return {
          icon: Loader2,
          defaultMessage: 'Carregando...',
          color: 'text-gray-600'
        };
    }
  };

  const config = getLoadingConfig();
  const IconComponent = config.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="relative mb-6">
        <div className={`animate-spin rounded-full h-16 w-16 border-b-2 ${config.color} mx-auto`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <IconComponent className={`w-8 h-8 ${config.color} animate-pulse`} />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {message || config.defaultMessage}
        </h3>
        
        {showProgress && (
          <div className="w-64 bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Isso pode levar alguns segundos...
        </p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-gray-100 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
} 