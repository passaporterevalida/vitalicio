import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Sparkles, Users } from 'lucide-react';
export function SubscriptionBadge() {
  // App vitalício - sempre exibe badge de acesso vitalício
  return (
    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-sm drop-shadow-lg">
      <Crown className="w-3 h-3 mr-1" />
      Vitalício
    </Badge>
  );
}