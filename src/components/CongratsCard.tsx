import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CongratsCardProps {
  xp: number;
  correct: number;
  total: number;
  badge: string;
  onClose?: () => void;
}

export function CongratsCard({ xp, correct, total, badge, onClose }: CongratsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-yellow-200 via-yellow-50 to-amber-100 border-yellow-400 shadow-2xl max-w-md mx-auto mt-8 animate-fade-in">
      <CardHeader className="flex flex-col items-center">
        <Trophy className="w-12 h-12 text-yellow-500 mb-2 animate-bounce" />
        <CardTitle className="text-2xl font-bold text-yellow-800 text-center">
          Parabéns! Missão Surpresa Concluída 🎉
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-lg text-yellow-900 font-semibold text-center">
          Você concluiu a Missão Surpresa INEP!
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-yellow-800 font-medium">Acertos: <span className="font-bold">{correct}/{total}</span></span>
          <span className="text-yellow-800 font-medium">XP Recebido: <span className="font-bold">+{xp} XP</span></span>
          <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-base px-4 py-2 mt-2">
            🏅 {badge}
          </Badge>
        </div>
        {onClose && (
          <button
            className="mt-4 px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold shadow"
            onClick={onClose}
          >
            Fechar
          </button>
        )}
      </CardContent>
    </Card>
  );
} 