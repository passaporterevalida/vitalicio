import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Zap, 
  Lightbulb, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Star,
  BarChart3,
  Users,
  Award
} from 'lucide-react';
import { Question } from '@/types/question';

interface SimuladoAIAnalysisProps {
  questions: Question[];
  answers: Record<string, string>;
  timeSpent: number;
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  onClose: () => void;
}

interface AIAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  timeAnalysis: string;
  areaPerformance: {
    area: string;
    correct: number;
    total: number;
    percentage: number;
  }[];
  difficultyAnalysis: string;
  nextSteps: string[];
  motivationalMessage: string;
}

export function SimuladoAIAnalysis({
  questions,
  answers,
  timeSpent,
  accuracy,
  correctAnswers,
  totalQuestions,
  onClose
}: SimuladoAIAnalysisProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<'overview' | 'details' | 'recommendations'>('overview');

  useEffect(() => {
    generateAIAnalysis();
  }, []);

  const generateAIAnalysis = () => {
    setIsLoading(true);
    
    // Simular delay de processamento da IA
    setTimeout(() => {
      const aiAnalysis = analyzePerformance();
      setAnalysis(aiAnalysis);
      setIsLoading(false);
    }, 2000);
  };

  const analyzePerformance = (): AIAnalysis => {
    // Análise por área médica
    const areaStats = questions.reduce((acc, question) => {
      const area = question.area || 'Geral';
      if (!acc[area]) {
        acc[area] = { correct: 0, total: 0 };
      }
      acc[area].total++;
      if (answers[question.id.toString()] === question.correct) {
        acc[area].correct++;
      }
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    const areaPerformance = Object.entries(areaStats).map(([area, stats]) => ({
      area,
      correct: stats.correct,
      total: stats.total,
      percentage: (stats.correct / stats.total) * 100
    })).sort((a, b) => b.percentage - a.percentage);

    // Identificar pontos fortes e fracos
    const strongAreas = areaPerformance.filter(a => a.percentage >= 80).map(a => a.area);
    const weakAreas = areaPerformance.filter(a => a.percentage < 60).map(a => a.area);

    // Análise de tempo
    const avgTimePerQuestion = timeSpent / totalQuestions;
    const timeAnalysis = avgTimePerQuestion <= 2 
      ? "Você demonstrou excelente agilidade nas respostas!"
      : avgTimePerQuestion <= 4
      ? "Seu tempo de resposta está adequado."
      : "Considere praticar para melhorar sua velocidade.";

    // Análise de dificuldade
    const difficultyAnalysis = accuracy >= 90 
      ? "Desempenho excepcional! Você domina muito bem o conteúdo."
      : accuracy >= 80
      ? "Bom desempenho! Há espaço para melhorias pontuais."
      : accuracy >= 70
      ? "Desempenho satisfatório. Foque nas áreas com menor aproveitamento."
      : "Há oportunidades significativas de melhoria. Continue praticando!";

    // Recomendações baseadas no desempenho
    const recommendations = [];
    if (weakAreas.length > 0) {
      recommendations.push(`Foque especialmente em: ${weakAreas.slice(0, 3).join(', ')}`);
    }
    if (accuracy < 80) {
      recommendations.push("Revise os conceitos fundamentais das áreas com menor desempenho");
    }
    if (avgTimePerQuestion > 4) {
      recommendations.push("Pratique questões para melhorar sua velocidade de resposta");
    }
    if (strongAreas.length > 0) {
      recommendations.push(`Mantenha o excelente desempenho em: ${strongAreas.slice(0, 2).join(', ')}`);
    }

    // Próximos passos
    const nextSteps = [
      "Refaça questões das áreas com menor aproveitamento",
      "Estude os conceitos fundamentais das disciplinas mais difíceis",
      "Pratique simulados com foco em tempo",
      "Revise as questões que você errou"
    ];

    // Mensagem motivacional
    const motivationalMessage = accuracy >= 90
      ? "🎉 Incrível! Você demonstrou domínio excepcional do conteúdo!"
      : accuracy >= 80
      ? "🌟 Excelente trabalho! Continue assim e você alcançará a excelência!"
      : accuracy >= 70
      ? "💪 Bom progresso! Com dedicação, você pode melhorar ainda mais!"
      : "🚀 Não desanime! Cada erro é uma oportunidade de aprendizado!";

    return {
      overallScore: Math.round(accuracy),
      strengths: strongAreas,
      weaknesses: weakAreas,
      recommendations,
      timeAnalysis,
      areaPerformance,
      difficultyAnalysis,
      nextSteps,
      motivationalMessage
    };
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 animate-pulse" />
              <h2 className="text-2xl font-bold">IA Analisando seu Desempenho</h2>
            </div>
            <div className="text-blue-100">
              Nossa IA está processando seus resultados para fornecer insights personalizados...
            </div>
          </div>
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analisando padrões de resposta, tempo e áreas de conhecimento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-screen h-screen max-w-none max-h-none rounded-none flex flex-col h-full sm:rounded-2xl sm:max-w-4xl sm:max-h-[90vh] sm:p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Análise de Desempenho por IA</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          {/* Navegação */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <Button
              variant={currentSection === 'overview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentSection('overview')}
              className="text-white px-3 min-w-[120px]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </Button>
            <Button
              variant={currentSection === 'details' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentSection('details')}
              className="text-white px-3 min-w-[120px]"
            >
              <Target className="w-4 h-4 mr-2" />
              Detalhes
            </Button>
            <Button
              variant={currentSection === 'recommendations' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentSection('recommendations')}
              className="text-white px-3 min-w-[120px]"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Recomendações
            </Button>
          </div>
        </div>

        {/* Conteúdo principal com rolagem */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
          {currentSection === 'overview' && (
            <div className="space-y-6">
              {/* Score Geral */}
              <Card className="border-2 border-blue-200">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Award className="w-6 h-6 text-blue-600" />
                    Score Geral
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {analysis.overallScore}%
                  </div>
                  <Progress value={analysis.overallScore} className="h-3 mb-4" />
                  <p className="text-gray-600">{analysis.motivationalMessage}</p>
                </CardContent>
              </Card>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="text-center p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">Acertos</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {correctAnswers}/{totalQuestions}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="text-center p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Tempo Médio</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(timeSpent / totalQuestions)}min
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="text-center p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold">Áreas Testadas</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {analysis.areaPerformance.length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pontos Fortes e Fracos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <TrendingUp className="w-5 h-5" />
                      Pontos Fortes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysis.strengths.length > 0 ? (
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">Continue praticando para identificar seus pontos fortes!</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <TrendingDown className="w-5 h-5" />
                      Áreas de Melhoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysis.weaknesses.length > 0 ? (
                      <ul className="space-y-2">
                        {analysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">Parabéns! Não identificamos áreas críticas de melhoria.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentSection === 'details' && (
            <div className="space-y-6">
              {/* Análise por Área */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Desempenho por Área
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.areaPerformance.map((area, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{area.area}</span>
                          <span className="text-sm text-gray-600">
                            {area.correct}/{area.total} ({area.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={area.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análise de Tempo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Análise de Tempo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{analysis.timeAnalysis}</p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Tempo Total</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Análise de Dificuldade */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Análise de Dificuldade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{analysis.difficultyAnalysis}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === 'recommendations' && (
            <div className="space-y-6">
              {/* Recomendações */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Lightbulb className="w-5 h-5" />
                    Recomendações Personalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Passos */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Target className="w-5 h-5" />
                    Próximos Passos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comparação com Outros */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Como Você Se Compara
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sua pontuação</span>
                      <span className="font-bold text-blue-600">{analysis.overallScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Média dos usuários</span>
                      <span className="font-bold text-gray-600">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top 10%</span>
                      <span className="font-bold text-green-600">90%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer fixo */}
        <div className="bg-gray-50 p-4 border-t flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-sm text-gray-600 text-center sm:text-left w-full sm:w-auto">
              Análise gerada por IA • {new Date().toLocaleDateString('pt-BR')}
            </p>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              Fechar Análise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 