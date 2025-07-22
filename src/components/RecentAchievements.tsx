import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target } from 'lucide-react';
export function RecentAchievements() {
  const {
    userProgress
  } = useGamification();
  const recentAchievements = userProgress.achievements?.filter(a => a.unlocked)?.sort((a, b) => {
    if (!a.unlockedAt || !b.unlockedAt) return 0;
    return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
  })?.slice(0, 3) || [];
  const upcomingAchievements = userProgress.achievements?.filter(a => !a.unlocked)?.slice(0, 2) || [];
  if (recentAchievements.length === 0 && upcomingAchievements.length === 0) {
    return null;
  }
  return;
}