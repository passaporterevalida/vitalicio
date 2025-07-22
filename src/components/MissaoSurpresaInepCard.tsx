import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap } from 'lucide-react';

interface MissaoSurpresaInepCardProps {
  onStart: () => void;
  className?: string;
}

export function MissaoSurpresaInepCard({ onStart, className }: MissaoSurpresaInepCardProps) {
  return (
    <Card className={`bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 xs:p-3 sm:p-4 lg:p-6 shadow-lg sm:shadow-xl border-2 border-blue-100 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 transition-all duration-300 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Missão Surpresa INEP
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg border-2 border-blue-100 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-blue-800">Desafio Surpresa</h3>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            Responda 5 questões oficiais do Revalida em sequência. Supere o desafio e conquiste XP extra!
          </p>
          <Badge variant="secondary" className="text-xs">
            +75 XP
          </Badge>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span className="font-medium text-orange-800 dark:text-orange-200">
              Bônus por Performance
            </span>
          </div>
          <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
            <li>• 100% acerto: +30 XP bônus</li>
            <li>• 80%+ acerto: +15 XP bônus</li>
            <li>• Tempo restante: +1 XP por segundo</li>
          </ul>
        </div>

        <Button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3"
          size="lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          Iniciar Missão Surpresa
        </Button>
      </CardContent>
    </Card>
  );
} 