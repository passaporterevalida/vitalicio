
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Crown, Zap, ArrowRight, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMissions } from '@/hooks/useMissions';
import { useEffect, useState } from 'react';

export function UsageLimitsCard() {
  const { 
    usageLimits, 
    loading 
  } = useSubscription();

  const { getMissionAttemptsThisMonth, missions } = useMissions();
  const [missionsAttempts, setMissionsAttempts] = useState<{used: number} | null>(null);
  
  useEffect(() => {
    let mounted = true;
    async function fetchMissionAttempts() {
      if (!missions || missions.length === 0) return;
      let maxUsed = 0;
      for (const mission of missions) {
        const used = await getMissionAttemptsThisMonth(mission.id);
        if (used > maxUsed) maxUsed = used;
      }
      if (mounted) setMissionsAttempts({ used: maxUsed });
    }
    fetchMissionAttempts();
    return () => { mounted = false; };
  }, [missions, getMissionAttemptsThisMonth]);

  if (loading || !usageLimits) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const questionsUsed = usageLimits.daily_questions_used || 0;
  const simuladosUsed = usageLimits.monthly_simulados_used || 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Estatísticas de Uso
          </CardTitle>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600">
            <Crown className="w-4 h-4" />
            Vitalício
          </div>
        </div>
        <CardDescription>
          App Vitalício - Acesso ilimitado a todas as funcionalidades
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Questions Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Questões respondidas hoje</span>
            </div>
            <span className="text-gray-600 font-semibold">
              {questionsUsed}
            </span>
          </div>
        </div>

        {/* Simulados Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <span className="font-medium">Simulados realizados este mês</span>
            </div>
            <span className="text-gray-600 font-semibold">
              {simuladosUsed}
            </span>
          </div>
        </div>

        {/* Missões Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Missões realizadas este mês</span>
            </div>
            <span className="text-gray-600 font-semibold">
              {missionsAttempts ? missionsAttempts.used : 0}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-green-600 font-medium">
              ✅ Acesso ilimitado ativo
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Continue estudando sem limitações!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
