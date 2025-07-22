
import { Brain, Target, BarChart3, Users, Sparkles, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Análises inteligentes do seu desempenho com sugestões personalizadas de estudo baseadas em suas dificuldades.",
      color: "from-purple-500 to-indigo-600",
      borderColor: "border-purple-200/50",
      hoverBorder: "hover:border-purple-300"
    },
    {
      icon: Target,
      title: "Missões Gamificadas",
      description: "Complete desafios diários, conquiste badges e suba de nível enquanto estuda de forma mais engajada.",
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-200/50",
      hoverBorder: "hover:border-blue-300"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Acompanhe seu progresso com gráficos detalhados por área médica e performance ao longo do tempo.",
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-200/50",
      hoverBorder: "hover:border-green-300"
    },
    {
      icon: Users,
      title: "Ranking Nacional",
      description: "Compare seu desempenho com outros médicos e participe de competições mensais exclusivas.",
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-200/50",
      hoverBorder: "hover:border-orange-300"
    },
    {
      icon: Shield,
      title: "Questões Oficiais",
      description: "Banco completo com todas as questões oficiais do Revalida de 2011 a 2025, sempre atualizado.",
      color: "from-teal-500 to-cyan-600",
      borderColor: "border-teal-200/50",
      hoverBorder: "hover:border-teal-300"
    },
    {
      icon: Sparkles,
      title: "Acesso Imediato",
      description: "Comece a estudar em poucos minutos, sem burocracia. Cadastre-se e tenha acesso instantâneo a todos os recursos da plataforma.",
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-200/50",
      hoverBorder: "hover:border-yellow-300"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Recursos que fazem a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-4xl sm:text-4xl lg:text-5xl">
              diferença
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta combinada com gamificação para acelerar sua preparação
            e tornar o estudo mais eficiente e divertido.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-2 ${feature.borderColor} ${feature.hoverBorder} group overflow-hidden text-center`}
            >
              {/* Subtle background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                  <feature.icon className="w-6 h-6 text-white relative z-10" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Decorative corner element */}
              <div className={`absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
