import React from 'react';
import { Trophy } from 'lucide-react';

interface ProgressHeaderProps {
  nivel: number;
  xpAtual: number;
  xpProximo: number;
  ranking: number;
  xpTotal: number;
}

export function ProgressHeader({ nivel, xpAtual, xpProximo, ranking, xpTotal }: ProgressHeaderProps) {
  // Cálculo do progresso percentual
  const percent = Math.min(100, Math.round((xpAtual / xpProximo) * 100));

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-6">
      {/* Nível e ranking */}
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg shadow">
          <Trophy className="w-5 h-5 text-white" />
          Nível {nivel}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base shadow">
          #{ranking}
        </span>
      </div>
      {/* Barra de progresso */}
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden mb-1">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between w-full text-xs text-gray-600 font-semibold">
          <span>{xpAtual} XP</span>
          <span>{xpProximo} XP</span>
        </div>
      </div>
    </div>
  );
} 