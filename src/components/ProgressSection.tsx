
import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function ProgressSection() {
  const { userProgress } = useGamification();
  const { subscribed, subscription_tier } = useSubscription();
  const { user } = useAuth();

  // Gamification level (separate from subscription plan)
  const gamificationLevel = userProgress.level;
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);

  // Subscription plan info (separate from gamification)
  const getPlanInfo = () => {
    if (!subscribed) return { name: 'Gratuito', color: 'from-gray-400 to-gray-600' };
    
    switch (subscription_tier) {
      case 'Basic':
        return { name: 'Basic', color: 'from-blue-400 to-blue-600' };
      case 'Premium':
        return { name: 'Premium', color: 'from-purple-400 to-purple-600' };
      case 'Pro':
        return { name: 'Pro', color: 'from-gold-400 to-gold-600' };
      default:
        return { name: 'Premium', color: 'from-purple-400 to-purple-600' };
    }
  };

  const planInfo = getPlanInfo();
  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.display_name || 'Usuário';

  return (
    <Button 
      variant="ghost" 
      className="h-7 md:h-8 lg:h-9 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 rounded-md md:rounded-lg transition-all duration-300 shadow-sm hover:shadow-md group min-w-0 flex-shrink-0 text-left px-1.5 md:px-2 lg:px-3 py-0.5 text-gray-500"
    >
      <div className="flex items-center gap-0.5 md:gap-1 lg:gap-1.5 min-w-0">
        {/* Ícone e Nível de Gamificação */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-semibold text-gray-800">
            Nv {gamificationLevel}
          </span>
        </div>

        {/* Separador - oculto em tablets menores */}
        <div className="hidden lg:block w-px h-2 sm:h-3 bg-gray-300"></div>

        {/* XP Info - mais compacto */}
        <div className="flex items-center gap-0.5 md:gap-1 min-w-0">
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
            {userProgress.xp}/{userProgress.xpToNextLevel}
          </span>
          {/* Barra de Progresso XP - mais estreita */}
          <div className="relative w-4 md:w-6 lg:w-8 h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 group-hover:from-orange-500 group-hover:to-orange-700" 
              style={{ width: `${xpPercentage}%` }} 
            />
          </div>
        </div>

        {/* Separador - oculto em tablets */}
        <div className="hidden lg:block w-px h-2 sm:h-3 bg-gray-300"></div>

        {/* Plano de Assinatura - oculto em tablet */}
        <div className="hidden lg:flex items-center gap-0.5 flex-shrink-0">
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${planInfo.color}`}></div>
          <span className="text-xs font-medium text-gray-600">
            {planInfo.name}
          </span>
        </div>

        {/* Avatar do usuário - sempre visível na ponta direita do balance */}
        <div className="ml-2 flex items-center">
          <Avatar className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-2 border-transparent bg-gradient-to-br from-blue-600 via-purple-500 to-purple-700 p-0.5">
            <div className="bg-white rounded-full w-full h-full flex items-center justify-center overflow-hidden">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
            </div>
          </Avatar>
        </div>
      </div>
    </Button>
  );
}
