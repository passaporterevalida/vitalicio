
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend, LabelList } from "recharts";
import { DemoChart } from "./DemoChart";

const COLORS = ["#3182ce", "#4FD1C5", "#68D391", "#F6AD55", "#F56565"];

type Dado = {
  nome: string;
  valor: number;
  total?: number;
  corretas?: number;
};

interface PerformanceChartProps {
  dados: Dado[];
  showDemo?: boolean;
}

export default function PerformanceChart({ dados, showDemo = false }: PerformanceChartProps) {
  if (showDemo || dados.length === 0) {
    return <DemoChart />;
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(260, dados.length * 48)}>
      <BarChart
        data={dados}
        layout="vertical"
        margin={{ top: 16, right: 32, left: 16, bottom: 16 }}
        barCategoryGap={24}
      >
        <XAxis type="number" domain={[0, 100]} hide axisLine={false} tick={false} />
        <YAxis type="category" dataKey="nome" width={180} tick={{ fontWeight: 600, fontSize: 16 }} />
        <Tooltip formatter={(value: number, name: string, props: any) => [`${value}%`, 'Desempenho']} />
        <Legend />
        <Bar dataKey="valor" radius={[16, 16, 16, 16]} minPointSize={6}>
          {dados.map((entry, idx) => (
            <Cell key={entry.nome} fill={COLORS[idx % COLORS.length]} />
          ))}
          <LabelList dataKey="valor" position="right" formatter={(v: number) => `${v}%`} style={{ fontWeight: 700, fontSize: 16 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
