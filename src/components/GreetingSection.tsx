import React from "react";
import { Target, Sparkles } from "lucide-react";

interface GreetingSectionProps {
  displayName: string;
  level: number;
  xp: number;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({ displayName, level, xp }) => (
  <section className="text-center mb-8 relative">
    <div className="relative z-10 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Bem-vindo (a) ao <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-bold text-3xl md:text-4xl">RevalidaQuest</span>, {displayName}! <span className="inline-block animate-bounce ml-2 text-lg">👋</span>
      </h1>
      <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
        Sua jornada de preparação para o Revalida começa aqui. Pratique com questões oficiais, complete missões gamificadas e acompanhe seu progresso em tempo real.
      </p>
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-full px-4 py-2 shadow-lg animate-fade-in">
        <Target className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-green-800 whitespace-nowrap">
          Você está no nível {level} com {xp} XP!
        </span>
        <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
      </div>
    </div>
  </section>
); 