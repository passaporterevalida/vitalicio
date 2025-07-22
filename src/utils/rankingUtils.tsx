import { Crown, Medal, Star, Trophy } from 'lucide-react';

export const AREAS = [
  { value: '', label: 'Todas as Áreas' },
  { value: 'Clínica', label: 'Clínica' },
  { value: 'Cirurgia', label: 'Cirurgia' },
  { value: 'Pediatria', label: 'Pediatria' },
  { value: 'Ginecologia', label: 'Ginecologia' },
  { value: 'Preventiva', label: 'Preventiva' },
];

export const NIVEIS = [
  { value: 'all', label: 'Todos os Níveis' },
  { value: 'beginner', label: 'Intermediário' },
  { value: 'advanced', label: 'Avançado' },
  { value: 'especialista', label: 'Especialista' },
];

export function getLevelTitle(level: number): string {
  if (level >= 20) return 'Especialista';
  if (level >= 15) return 'Avançado';
  if (level >= 10) return 'Intermediário';
  return 'Iniciante';
}

export function getPodiumColor(pos: number): string {
  if (pos === 1) return 'bg-yellow-400 border-yellow-400';
  if (pos === 2) return 'bg-gray-300 border-gray-300';
  if (pos === 3) return 'bg-orange-400 border-orange-400';
  return 'bg-blue-200 border-blue-200';
}

export function getPodiumIcon(pos: number) {
  if (pos === 1) return <Crown className="w-6 h-6 text-yellow-600 mx-auto mb-1" />;
  if (pos === 2) return <Medal className="w-6 h-6 text-gray-500 mx-auto mb-1" />;
  if (pos === 3) return <Star className="w-6 h-6 text-orange-500 mx-auto mb-1" />;
  return null;
}

export function getLevelBadge(level: number) {
  if (level >= 20) return <Crown className="inline w-5 h-5 text-yellow-500 mr-1" />;
  if (level >= 15) return <Trophy className="inline w-5 h-5 text-purple-500 mr-1" />;
  if (level >= 10) return <Star className="inline w-5 h-5 text-blue-500 mr-1" />;
  return <Medal className="inline w-5 h-5 text-gray-400 mr-1" />;
}

export function getAvatarBorderStyle(user: any, isTop3: boolean): string {
  if (isTop3) {
    if (user.position === 1) return 'linear-gradient(135deg, #e7c873 60%, #bfa14a 100%)'; // dourado
    if (user.position === 2) return 'linear-gradient(135deg, #d1d5db 60%, #a3a3a3 100%)'; // prata
    if (user.position === 3) return 'linear-gradient(135deg, #f59e42 60%, #b45309 100%)'; // bronze
  }
  return 'linear-gradient(135deg, #e5e7eb 60%, #9ca3af 100%)'; // cinza-claro
}

export function getAccuracy(user: any): number {
  if (!user.total_questions || user.total_questions === 0) return 0;
  return Math.round((user.correct_answers / user.total_questions) * 100);
}

export function getXpPercent(user: any): number {
  if (!user.xpToNextLevel || !user.total_xp) return 0;
  const xpAtual = user.total_xp - (user.xpBaseLevel || 0);
  return Math.min(100, Math.round((xpAtual / user.xpToNextLevel) * 100));
}

// Simular movimentação para todos do top 10 (MVP)
export function simulateMovement(idx: number) {
  // Alterna entre 'up', 'down', 'same' para simulação
  if (idx % 3 === 0) return { type: 'up', value: 1 };
  if (idx % 3 === 1) return { type: 'down', value: 1 };
  return { type: 'same', value: 0 };
}

// Componentes SVG reutilizáveis
export const XpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle">
    <path d="M13 2L3 14h7v8l8-12h-7l2-8z" fill="url(#xp-gradient)"/>
    <defs>
      <linearGradient id="xp-gradient" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffe066"/>
        <stop offset="1" stopColor="#ffb700"/>
      </linearGradient>
    </defs>
  </svg>
);

export const LevelBadge = ({ level }: { level: number }) => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-400 shadow border-2 border-yellow-300">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-1">
      <path d="M10 2l7 3v5c0 5-3.5 9-7 9s-7-4-7-9V5l7-3z" fill="#fffde4" stroke="#bfa14a" strokeWidth="1.5"/>
    </svg>
    <span className="text-yellow-900 font-bold text-xs">{level}</span>
  </span>
);

export const ArrowUp = () => (
  <svg className="w-4 h-4 text-green-400 animate-bounce-up" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

export const ArrowDown = () => (
  <svg className="w-4 h-4 text-red-400 animate-bounce-down" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
); 