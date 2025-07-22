
import { BookOpen, Users, Trophy, Zap } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: BookOpen,
      value: "1.500+",
      label: "Questões Oficiais",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      value: "11.200+",
      label: "Médicos Ativos",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Trophy,
      value: "87%",
      label: "Taxa de Aprovação",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      value: "15",
      label: "Anos de Provas",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100/50 hover:border-blue-200"
            >
              <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <stat.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
