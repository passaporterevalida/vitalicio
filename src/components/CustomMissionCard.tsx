import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { 
  Settings, 
  Clock, 
  Target, 
  Stethoscope, 
  Play,
  Timer,
  Award,
  Zap,
  Star,
  List
} from 'lucide-react';
import { CustomMission, CustomMissionFilters, MEDICAL_AREAS } from '@/types/missions';

interface CustomMissionCardProps {
  onStartMission: (mission: CustomMission) => void;
}

export function CustomMissionCard({ onStartMission }: CustomMissionCardProps) {
  const [filters, setFilters] = useState<CustomMissionFilters>({
    questionCount: 10,
    totalTime: 30, // será calculado, mas mantido para compatibilidade
    timePerQuestion: 3,
    medicalAreas: ['Todas'],
    specialties: [] // mantido para compatibilidade, mas não exibido
  });

  const handleAreaToggle = (area: string) => {
    setFilters(prev => {
      // Se clicar em 'Todas', limpa as áreas específicas e marca só 'Todas'
      if (area === 'Todas') {
        return { ...prev, medicalAreas: ['Todas'] };
      }
      // Se já está marcada, desmarca
      if (prev.medicalAreas.includes(area)) {
        const newAreas = prev.medicalAreas.filter(a => a !== area && a !== 'Todas');
        // Se nenhuma área específica restar, volta para 'Todas'
        return { ...prev, medicalAreas: newAreas.length === 0 ? ['Todas'] : newAreas };
      } else {
        // Ao marcar uma área específica, remove 'Todas' se estiver marcada
        const newAreas = prev.medicalAreas.filter(a => a !== 'Todas');
        return { ...prev, medicalAreas: [...newAreas, area] };
      }
    });
  };

  // Calcula o tempo total
  const totalTime = filters.questionCount * filters.timePerQuestion;

  const createCustomMission = (): CustomMission => {
    const areasText = filters.medicalAreas.length > 0 
      ? filters.medicalAreas.join(', ') 
      : 'Todas as áreas';

    return {
      id: `custom_${Date.now()}`,
      title: '🎯 Missão Personalizada',
      description: `Questão personalizada com ${filters.questionCount} questões`,
      objective: `Responder ${filters.questionCount} questões de ${areasText}`,
      area: 'Mista',
      targetQuestions: filters.questionCount,
      targetAccuracy: 70,
      progress: 0,
      completed: false,
      reward: {
        xp: filters.questionCount * 10,
        badge: 'Personalizador'
      },
      difficulty: 'medium',
      timeLimit: totalTime,
      filters: { ...filters, totalTime },
      isCustom: true
    };
  };

  const handleStartMission = () => {
    const mission = createCustomMission();
    onStartMission(mission);
  };

  const isValidConfig = filters.questionCount > 0 && filters.timePerQuestion > 0 && filters.medicalAreas.length > 0;

  // Regras fixas
  const missionRules: { icon: any; color: string; text: string }[] = [
    { icon: List, color: 'text-blue-300', text: `${filters.questionCount} questões personalizadas` },
    { icon: Clock, color: 'text-yellow-200', text: `${filters.timePerQuestion} minutos para cada questão` },
    { icon: Timer, color: 'text-purple-200', text: `${totalTime} minutos no total` },
    { icon: Zap, color: 'text-yellow-400', text: `10 XP por questão correta` },
  ];

  // Resumo dos filtros no mesmo formato das regras
  const filterSummary = [
    {
      icon: Stethoscope,
      color: 'text-purple-200',
      text: `Áreas: ${filters.medicalAreas.includes('Todas') ? 'Todas' : filters.medicalAreas.join(', ')}`
    }
  ];

  return (
    <Card className="relative overflow-visible transition-all duration-300 shadow-lg rounded-3xl" style={{ background: 'rgba(16,28,54,0.85)' }}>  
      {/* Badge circular de missão personalizada com degradê e brilho */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex flex-col items-center justify-center shadow-xl border-4 border-white relative">
          <span className="absolute inset-0 rounded-full bg-white/10 blur-sm animate-pulse-slow" />
          <Settings className="w-8 h-8 text-white drop-shadow relative z-10" />
        </div>
      </div>

      <CardHeader className="pt-16 pb-4 px-7 flex flex-col items-center text-center">
        <CardTitle className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-100 bg-clip-text text-transparent drop-shadow flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-purple-300 drop-shadow-sm animate-pulse-slow" />
          Missão Personalizada
        </CardTitle>
        <span className="text-sm text-purple-100 font-medium mb-2 block">Crie seu próprio desafio e teste seus conhecimentos!</span>
        {/* Accordion de filtros - DESIGN MELHORADO */}
        <Accordion type="multiple" className="w-full mb-2">
          <AccordionItem value="questoes">
            <AccordionTrigger className="text-purple-200 font-bold bg-purple-900/30 rounded-lg px-4 py-3 mb-1 flex items-center gap-2 hover:bg-purple-800/40 focus:bg-purple-800/50 border border-purple-700 transition-all shadow-sm">
              <Target className="w-5 h-5 text-purple-300 mr-2" />
              Quantidade de Questões
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900/70 rounded-b-lg px-4 py-3 border-t border-purple-800">
              <Input
                type="number"
                min="1"
                max="50"
                value={filters.questionCount}
                onChange={(e) => setFilters(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 1 }))}
                className="bg-gray-800 border-2 border-purple-500 text-white focus:border-purple-300 focus:ring-2 focus:ring-purple-400/40 rounded-lg px-3 py-2 text-base font-semibold"
                placeholder="Número"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tempo">
            <AccordionTrigger className="text-purple-200 font-bold bg-purple-900/30 rounded-lg px-4 py-3 mb-1 flex items-center gap-2 hover:bg-purple-800/40 focus:bg-purple-800/50 border border-purple-700 transition-all shadow-sm">
              <Timer className="w-5 h-5 text-purple-300 mr-2" />
              Tempo por Questão
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900/70 rounded-b-lg px-4 py-3 border-t border-purple-800">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={filters.timePerQuestion}
                  onChange={(e) => setFilters(prev => ({ ...prev, timePerQuestion: parseInt(e.target.value) || 1 }))}
                  className="bg-gray-800 border-2 border-purple-500 text-white focus:border-purple-300 focus:ring-2 focus:ring-purple-400/40 rounded-lg px-3 py-2 text-base font-semibold w-24"
                  placeholder="Tempo"
                />
                <span className="text-xs text-purple-200 font-semibold select-none">minuto(s) / questão</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="areas">
            <AccordionTrigger className="text-purple-200 font-bold bg-purple-900/30 rounded-lg px-4 py-3 mb-1 flex items-center gap-2 hover:bg-purple-800/40 focus:bg-purple-800/50 border border-purple-700 transition-all shadow-sm">
              <Stethoscope className="w-5 h-5 text-purple-300 mr-2" />
              Áreas Médicas
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900/70 rounded-b-lg px-4 py-3 border-t border-purple-800">
                <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto">
                  {["Todas", ...MEDICAL_AREAS].map((area) => {
                    const selected = filters.medicalAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleAreaToggle(area)}
                        className={`transition-all px-0 py-0 rounded-xl flex items-center justify-center h-14 w-full font-semibold text-base text-gray-100
                          ${selected ? 'border-2 border-purple-400 bg-purple-700/30 shadow-sm' : 'border border-purple-800 bg-transparent'}
                          hover:bg-purple-800/40 focus:outline-none focus:ring-2 focus:ring-purple-400/40 cursor-pointer`}
                        style={{ minHeight: 48 }}
                      >
                        <span className="w-full text-center text-sm md:text-base font-bold select-none">
                          {area}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
        </Accordion>
        {/* Separador visual */}
        <div className="w-full border-t border-purple-800 my-2" />
        {/* Resumo dos filtros no mesmo formato das regras */}
        <div className="w-full flex flex-col gap-2 mb-3">
          {filterSummary.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-800/70 rounded-lg px-3 py-2">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-gray-100 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        {/* Regras da missão com ícones */}
        <div className="w-full flex flex-col gap-2 mb-3">
          {missionRules.map((rule, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-800/90 rounded-lg px-3 py-2">
              <rule.icon className={`w-5 h-5 ${rule.color}`} />
              <span className="text-gray-100 text-sm font-medium">{rule.text}</span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-7 pb-10 flex flex-col items-center">
        <div className="flex flex-col gap-3 w-full">
          {isValidConfig ? (
            <>
              <Button 
                className="w-full text-lg font-bold py-3 rounded-xl shadow bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 hover:brightness-110 text-white flex items-center justify-center gap-2 mt-2 group-hover:scale-105 transition-transform border-2 border-purple-700" 
                onClick={handleStartMission}
              >
                <Play className="w-5 h-5" /> Iniciar Missão Personalizada
              </Button>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">
                  {filters.questionCount} questões • {totalTime}min
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex items-center gap-2 text-yellow-300 text-sm font-medium justify-center mb-3">
                <Settings className="w-4 h-4" />
                Configure os filtros para iniciar
              </div>
              {filters.medicalAreas.length === 0 && (
                <div className="text-red-300 text-xs">
                  Selecione pelo menos uma área médica
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 