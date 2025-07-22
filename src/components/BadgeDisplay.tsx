
import { Achievement } from '@/types/gamification';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock, Star, Crown, Target, Award } from 'lucide-react';

// Componente responsável por exibir os badges (conquistas) do usuário de forma visual e interativa.
// Siga o padrão de nomenclatura: PascalCase para componentes.
interface BadgeDisplayProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeDisplay({ achievement, size = 'md' }: BadgeDisplayProps) {
  const getCardSize = () => {
    switch (size) {
      case 'sm': return 'w-20 h-20';
      case 'lg': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-6 h-6';
      case 'lg': return 'w-12 h-12';
      default: return 'w-8 h-8';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-base';
      default: return 'text-sm';
    }
  };

  const getBadgeIcon = () => {
    const iconProps = { className: `${getIconSize()} text-white` };
    
    if (achievement.category === 'area') return <Star {...iconProps} />;
    if (achievement.category === 'streak') return <Crown {...iconProps} />;
    if (achievement.category === 'performance') return <Trophy {...iconProps} />;
    return <Award {...iconProps} />;
  };

  const getBadgeColors = () => {
    if (!achievement.unlocked) {
      return {
        bg: 'bg-gray-400',
        border: 'border-gray-300',
        shadow: '',
        glow: ''
      };
    }

    switch (achievement.category) {
      case 'area':
        return {
          bg: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700',
          border: 'border-purple-300',
          shadow: 'shadow-purple-500/25',
          glow: 'shadow-lg hover:shadow-purple-500/40'
        };
      case 'streak':
        return {
          bg: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
          border: 'border-yellow-300',
          shadow: 'shadow-orange-500/25',
          glow: 'shadow-lg hover:shadow-orange-500/40'
        };
      case 'performance':
        return {
          bg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
          border: 'border-blue-300',
          shadow: 'shadow-blue-500/25',
          glow: 'shadow-lg hover:shadow-blue-500/40'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700',
          border: 'border-green-300',
          shadow: 'shadow-green-500/25',
          glow: 'shadow-lg hover:shadow-green-500/40'
        };
    }
  };

  const colors = getBadgeColors();

  return (
    <div className="relative group">
      <Card className={`${getCardSize()} ${colors.border} border-2 ${colors.shadow} ${colors.glow} transition-all duration-300 hover:scale-105`}>
        <CardContent className={`${colors.bg} w-full h-full rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden`}>
          {/* Glow effect for unlocked badges */}
          {achievement.unlocked && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse" />
          )}
          
          {/* Lock overlay for locked badges */}
          {!achievement.unlocked && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white/70" />
            </div>
          )}
          
          {/* Badge icon */}
          <div className="relative z-10">
            {getBadgeIcon()}
          </div>
          
          {/* Badge emoji */}
          <div className={`text-xl ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl'} relative z-10`}>
            {achievement.icon}
          </div>
        </CardContent>
      </Card>
      
      {/* Badge info */}
      <div className="mt-2 text-center">
        <h4 className={`font-semibold ${getTextSize()} ${achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {achievement.title}
        </h4>
        <p className={`${getTextSize()} text-muted-foreground mt-1`}>
          {achievement.unlocked ? achievement.description : `Conquiste ao ${achievement.description.toLowerCase()}`}
        </p>
        {achievement.unlocked && achievement.unlockedAt && (
          <Badge variant="secondary" className="mt-1 text-xs">
            {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
          </Badge>
        )}
      </div>
    </div>
  );
}
