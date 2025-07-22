
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";

const DEMO_DATA = [
  { nome: 'Clínica Médica', valor: 75, total: 120, corretas: 90 },
  { nome: 'Pediatria', valor: 68, total: 85, corretas: 58 },
  { nome: 'Ginecologia', valor: 82, total: 95, corretas: 78 },
  { nome: 'Cirurgia', valor: 71, total: 110, corretas: 78 },
  { nome: 'Medicina Preventiva', valor: 79, total: 75, corretas: 59 }
];

const COLORS = ["#3182ce", "#4FD1C5", "#68D391", "#F6AD55", "#F56565"];

export function DemoChart() {
  return (
    <div className="relative">
      {/* Demo Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
          📊 Dados Demonstrativos
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={DEMO_DATA}
            dataKey="valor"
            nameKey="nome"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {DEMO_DATA.map((entry, idx) => (
              <Cell key={entry.nome} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Call to Action */}
      <div className="mt-6 text-center space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Comece Sua Jornada no Revalida!
            </h3>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
            Este é um exemplo do que você verá quando começar a responder questões. 
            Suas estatísticas reais aparecerão aqui conforme você pratica!
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.location.href = '/questions'}
          >
            Começar a Praticar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          💡 Responda pelo menos 3 questões em cada área para ver estatísticas confiáveis
        </p>
      </div>
    </div>
  );
}
