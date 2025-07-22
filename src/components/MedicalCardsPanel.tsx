
import { useState } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Lock, Gift } from 'lucide-react';

export function MedicalCardsPanel() {
  const { userProgress } = useGamification();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'lendário': return 'from-yellow-400 to-orange-500';
      case 'épico': return 'from-purple-400 to-pink-500';
      case 'raro': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'lendário': return '👑';
      case 'épico': return '💎';
      case 'raro': return '⭐';
      default: return '📄';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-500" />
          Cartas Médicas
          <Badge variant="secondary">
            {userProgress.medicalCards.filter(c => c.unlocked).length}/{userProgress.medicalCards.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {userProgress.medicalCards.map(card => (
            <div
              key={card.id}
              className={`relative aspect-[3/4] rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                card.unlocked
                  ? `bg-gradient-to-br ${getRarityColor(card.rarity)} shadow-lg hover:shadow-xl`
                  : 'bg-gray-200 dark:bg-gray-700 opacity-60'
              }`}
              onClick={() => card.unlocked && setSelectedCard(card.id)}
            >
              {card.unlocked ? (
                <div className="p-3 h-full flex flex-col">
                  <div className="text-center mb-2">
                    <div className="text-2xl mb-1">{getRarityIcon(card.rarity)}</div>
                    <Badge variant="outline" className="text-xs bg-white/20 border-white/30">
                      {card.area}
                    </Badge>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-white font-bold text-sm text-center leading-tight">
                      {card.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getRarityIcon(userProgress.medicalCards.find(c => c.id === selectedCard)?.rarity || 'comum')}
                    {userProgress.medicalCards.find(c => c.id === selectedCard)?.title}
                  </CardTitle>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const card = userProgress.medicalCards.find(c => c.id === selectedCard);
                  if (!card) return null;
                  
                  return (
                    <div className="space-y-4">
                      <Badge variant="outline">{card.area}</Badge>
                      <p className="text-sm text-muted-foreground">{card.content}</p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm">
                          💡 Dica Médica
                        </div>
                        <p className="text-sm mt-1">{card.tip}</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
