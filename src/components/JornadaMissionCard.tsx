import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Trophy, CheckCircle, AlertTriangle, PlayCircle, Repeat, Star, Target, Crown, List } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface JornadaMissionCardProps {
  nivel: number;
  totalNiveis: number;
  questoes: number;
  xp: number;
  tentativasRestantes: number | 'ilimitado';
  timerPorQuestao: number; // em minutos
  status: 'disponivel' | 'em_andamento' | 'concluido';
  onStart: () => void;
  locked?: boolean;
  acertosAcumulados?: number;
}

export function JornadaMissionCard({
  nivel,
  totalNiveis,
  questoes,
  xp,
  tentativasRestantes,
  timerPorQuestao,
  status,
  onStart,
  locked = false,
  acertosAcumulados = 0
}: JornadaMissionCardProps) {
  // Barra de progresso fake para exemplo
  const progresso = status === 'em_andamento' ? 0.4 : status === 'concluido' ? 1 : 0;
  const borderColor = status === 'concluido' ? 'border-green-400' : status === 'em_andamento' ? 'border-yellow-400' : 'border-blue-300';
  const progressoAcertos = Math.min(acertosAcumulados / questoes, 1);

  // Lista dinâmica de regras da missão
  const missionRules: { icon: LucideIcon; color: string; text: string }[] = [
    { icon: List, color: 'text-blue-300', text: `${questoes} questões oficiais INEP` },
    { icon: Clock, color: 'text-yellow-200', text: `${timerPorQuestao} minutos para cada questão` },
    { icon: Repeat, color: 'text-green-200', text: 'Tentativas ilimitadas' },
    { icon: Zap, color: 'text-yellow-400', text: `+${xp} XP ao concluir` },
  ];

  return (
    <Card className={`relative overflow-visible transition-all duration-300 shadow-lg rounded-3xl ${locked ? 'opacity-60 pointer-events-none' : ''}`} style={{ background: 'rgba(16,28,54,0.85)' }}>  
      {/* Overlay de bloqueio */}
      {locked && (
        <div className="absolute inset-0 bg-black/60 rounded-3xl flex flex-col items-center justify-center z-30 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <div className="text-5xl text-yellow-300 animate-pulse drop-shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-2V9a6 6 0 10-12 0v6m12 0a2 2 0 01-2 2H8a2 2 0 01-2-2m12 0V9a6 6 0 00-12 0v6" />
              </svg>
            </div>
            <span className="text-yellow-100 text-base font-semibold text-center drop-shadow">Complete a missão anterior para desbloquear</span>
          </div>
        </div>
      )}
      {/* Barra de topo com degradê */}
      {/* <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-t-3xl" /> */}
      {/* Selo circular de concluída */}
      {status === 'concluido' && (
        <div className="absolute top-5 right-5 z-20">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold shadow-lg border-4 border-white">
            <CheckCircle className="w-6 h-6" />
          </span>
        </div>
      )}
      {/* Badge circular de nível com degradê e brilho (mantido intacto) */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col items-center justify-center shadow-xl border-4 border-white relative">
          <span className="absolute inset-0 rounded-full bg-white/10 blur-sm animate-pulse-slow" />
          <span className="text-3xl font-extrabold text-white drop-shadow relative z-10">{nivel}</span>
          <span className="text-xs text-white/80 relative z-10">/ {totalNiveis}</span>
        </div>
      </div>
      <CardHeader className="pt-16 pb-4 px-7 flex flex-col items-center text-center">
        <CardTitle className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-100 bg-clip-text text-transparent drop-shadow flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-300 drop-shadow-sm animate-pulse-slow" />
          Missão Nível {nivel}
        </CardTitle>
        {/* Descrição motivacional/gamificada */}
        <span className="text-sm text-blue-100 font-medium mb-2 block">Supere este desafio, conquiste XP e avance no ranking!</span>
        {/* Regras da missão com ícones */}
        <div className="w-full flex flex-col gap-2 mb-3">
          {missionRules.map((rule, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-800/90 rounded-lg px-3 py-2">
              <rule.icon className={`w-5 h-5 ${rule.color}`} />
              <span className="text-gray-100 text-sm font-medium">{rule.text}</span>
            </div>
          ))}
        </div>
        {/* Removido: bloco de chips coloridos de descrição */}
        {/* Barra de progresso animada */}
        {status === 'em_andamento' && (
          <div className="w-full h-3 rounded-full bg-blue-800 mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-700" style={{ width: `${progresso * 100}%` }}></div>
          </div>
        )}
      </CardHeader>
      <CardContent className="px-7 pb-10 flex flex-col items-center">
        <div className="flex flex-col gap-3 w-full">
          {/* Acertos acumulados e barra de progresso acima do botão */}
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-green-200 font-bold text-base">Acertos acumulados: <span className="text-white">{acertosAcumulados}</span> / {questoes}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-green-900/40 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700" style={{ width: `${progressoAcertos * 100}%` }}></div>
            </div>
          </div>
          {status === 'disponivel' && (
            <>
              <Button className="w-full text-lg font-bold py-3 rounded-xl shadow bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:brightness-110 text-white flex items-center justify-center gap-2 mt-2 group-hover:scale-105 transition-transform border-2 border-blue-700" onClick={onStart} disabled={locked}>
                <PlayCircle className="w-5 h-5" /> Iniciar Missão
              </Button>
              {/* Contador gamificado de tentativas restantes - SEMPRE ILIMITADAS */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-sm font-semibold text-green-400">
                  ♾️ Tentativas ilimitadas
                </span>
              </div>
            </>
          )}
          {status === 'em_andamento' && (
            <Button className="w-full text-lg font-bold py-3 rounded-xl shadow bg-gradient-to-r from-yellow-400 to-yellow-600 hover:brightness-110 text-yellow-900 flex items-center justify-center gap-2 mt-2 group-hover:scale-105 transition-transform border-2 border-yellow-600" onClick={onStart} variant="secondary">
              <Repeat className="w-5 h-5" /> Continuar Missão
            </Button>
          )}
          {status === 'concluido' && (
            <span className="block text-green-200 font-semibold text-center text-base mt-2">Missão concluída!</span>
          )}

        </div>
      </CardContent>
    </Card>
  );
} 

// Card de parabéns pós-missão
export function JornadaMissionCongratsCard({ nivel, onNextMission }: { nivel: number; onNextMission: () => void }) {
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-6 border-4 border-yellow-300 mt-10 animate-fade-in">
      <div className="text-6xl select-none">🏆</div>
      <h2 className="text-3xl font-extrabold text-yellow-900 text-center drop-shadow mb-2">Parabéns!</h2>
      <p className="text-lg text-yellow-900 text-center font-medium mb-2">Você concluiu a Missão Nível {nivel} com sucesso.</p>
      <p className="text-base text-yellow-900 text-center mb-4">Prepare-se para desafios ainda maiores na próxima missão!</p>
      <button
        className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-bold text-lg shadow hover:brightness-110 transition"
        onClick={onNextMission}
      >
        Avançar para a próxima missão
      </button>
    </div>
  );
}