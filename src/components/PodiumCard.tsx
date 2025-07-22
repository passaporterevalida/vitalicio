import { Crown, Medal, Trophy, Zap, Star, Award } from 'lucide-react';
import { useState } from 'react';

interface PodiumCardProps {
  position: 1 | 2 | 3;
  name: string;
  avatarUrl?: string;
  level: string;
  score: number;
  accuracy: number;
}

// Componente de skeleton loading
export function PodiumCardSkeleton({ position }: { position: 1 | 2 | 3 }) {
  const config = positionConfig[position];
  
  return (
    <div className="relative group animate-pulse">
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-w-[280px] max-w-[320px]">
        {/* Cabeçalho skeleton */}
        <div className={`relative ${config.headerGradient} px-6 py-8 text-center opacity-50`}>
          <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3"></div>
          <div className="w-24 h-6 bg-white/30 rounded mx-auto"></div>
        </div>

        {/* Avatar skeleton */}
        <div className="relative -mt-12 px-6 pb-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>

        {/* Conteúdo skeleton */}
        <div className="px-6 pb-6">
          <div className="text-center mb-4">
            <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-2"></div>
            <div className="w-20 h-4 bg-gray-200 rounded mx-auto"></div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-12 h-3 bg-gray-200 rounded mb-1"></div>
                <div className="w-8 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
              <div className="w-8 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Configurações de design por posição
const positionConfig = {
  1: {
    headerGradient: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
    avatarBorder: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500',
    icon: <span className="text-white font-black text-4xl tracking-wider drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>1º</span>,
    positionText: '1º Lugar',
    scoreColor: 'text-yellow-700',
    levelColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    glowColor: 'shadow-yellow-400/30',
    badgeColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    accentColor: 'text-yellow-600'
  },
  2: {
    headerGradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
    avatarBorder: 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400',
    icon: <span className="text-white font-black text-3xl tracking-wider drop-shadow-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>2º</span>,
    positionText: '2º Lugar',
    scoreColor: 'text-gray-700',
    levelColor: 'bg-gray-100 text-gray-700 border-gray-300',
    glowColor: 'shadow-gray-400/30',
    badgeColor: 'bg-gradient-to-r from-gray-500 to-gray-600',
    accentColor: 'text-gray-600'
  },
  3: {
    headerGradient: 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500',
    avatarBorder: 'bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400',
    icon: <span className="text-white font-black text-3xl tracking-wider drop-shadow-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>3º</span>,
    positionText: '3º Lugar',
    scoreColor: 'text-orange-700',
    levelColor: 'bg-orange-100 text-orange-800 border-orange-300',
    glowColor: 'shadow-orange-400/30',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
    accentColor: 'text-orange-600'
  }
};

export function PodiumCard({ position, name, avatarUrl, level, score, accuracy }: PodiumCardProps) {
  const config = positionConfig[position];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <div 
      className={`relative group animate-podium-enter ${position === 1 ? 'animate-champion-glow' : 'animate-float'}`} 
      style={{ animationDelay: `${position * 0.2}s` }}
      role="article"
      aria-label={`${config.positionText}: ${name}`}
    >
      {/* Efeito de brilho no hover */}
      <div className={`absolute inset-0 rounded-3xl ${config.glowColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Card principal */}
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] min-w-[280px] max-w-[320px]">
        
        {/* Cabeçalho com gradiente */}
        <div className={`relative ${config.headerGradient} px-6 py-8 text-center`}>
          {/* Efeito de brilho no cabeçalho */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          

          
          {/* Ícone da posição */}
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full backdrop-blur-sm shadow-lg border border-white/20">
              {config.icon}
            </div>
          </div>
        </div>

        {/* Avatar centralizado */}
        <div className="relative -mt-6 px-6 pb-4">
          <div className="flex justify-center">
            <div className={`relative w-20 h-20 rounded-full p-1 ${config.avatarBorder} shadow-lg`}>
              {avatarUrl && !imageError ? (
                <img
                  src={avatarUrl}
                  alt={`Avatar de ${name}`}
                  className={`w-full h-full rounded-full object-cover bg-white transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400 tracking-wider">
                    {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Loading state para imagem */}
              {avatarUrl && !imageLoaded && !imageError && (
                <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="px-6 pb-6">
          {/* Nome do usuário */}
          <div className="text-center mb-4 mt-2">
            <h4 className="font-bold text-gray-900 text-lg truncate mb-2" title={name}>
              {name}
            </h4>
            <div className="flex items-center justify-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.levelColor}`}>
                <Star className="w-3 h-3 mr-1" />
                Nível {level}
              </span>
            </div>
          </div>

          {/* Pontuação */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Pontuação</p>
                  <p className={`font-bold text-lg ${config.scoreColor}`}>
                    {score.toLocaleString('pt-BR')} XP
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Precisão</p>
                <p className="font-bold text-sm text-gray-700">
                  {accuracy}%
                </p>
              </div>
            </div>
          </div>

          {/* Barra de progresso visual */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progresso</span>
              <span>{Math.round((score / 1000) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${config.headerGradient} transition-all duration-500`}
                style={{ width: `${Math.min((score / 1000) * 100, 100)}%` }}
                role="progressbar"
                aria-valuenow={Math.round((score / 1000) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
} 