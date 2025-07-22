import React from 'react';
import { Crown, Medal, Star, Trophy } from 'lucide-react';

// Componentes de ícones do ranking
export const RankingIcons = {
  XpIcon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle">
      <path d="M13 2L3 14h7v8l8-12h-7l2-8z" fill="url(#xp-gradient)"/>
      <defs>
        <linearGradient id="xp-gradient" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe066"/>
          <stop offset="1" stopColor="#ffb700"/>
        </linearGradient>
      </defs>
    </svg>
  ),

  LevelBadge: ({ level }: { level: number }) => (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-400 shadow border-2 border-yellow-300">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-1">
        <path d="M10 2l7 3v5c0 5-3.5 9-7 9s-7-4-7-9V5l7-3z" fill="#fffde4" stroke="#bfa14a" strokeWidth="1.5"/>
      </svg>
      <span className="text-yellow-900 font-bold text-xs">{level}</span>
    </span>
  ),

  ArrowUp: () => (
    <svg className="w-4 h-4 text-green-400 animate-bounce-up" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),

  ArrowDown: () => (
    <svg className="w-4 h-4 text-red-400 animate-bounce-down" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),

  PodiumIcon: ({ position }: { position: number }) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-600 mx-auto mb-1" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-500 mx-auto mb-1" />;
      case 3:
        return <Star className="w-6 h-6 text-orange-500 mx-auto mb-1" />;
      default:
        return null;
    }
  },

  LevelBadgeIcon: ({ level }: { level: number }) => {
    if (level >= 20) return <Crown className="inline w-5 h-5 text-yellow-500 mr-1" />;
    if (level >= 15) return <Trophy className="inline w-5 h-5 text-purple-500 mr-1" />;
    if (level >= 10) return <Star className="inline w-5 h-5 text-blue-500 mr-1" />;
    return <Medal className="inline w-5 h-5 text-gray-400 mr-1" />;
  }
}; 