
import { 
  CheckCircle,
  Trophy,
  Users,
  Target,
  Stethoscope,
  Star,
  Award,
  Shield,
  TrendingUp,
  Zap
} from 'lucide-react';

export function AuthHeroSection() {
  return (
    <div className="hidden lg:block space-y-6 pr-6">
      {/* Logo e Cabeçalho */}
      <div className="text-left stagger-animation">
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="ml-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              RevalidaQuest
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-black leading-relaxed mb-6">
          Prepare-se para o <span className="font-semibold text-black">Revalida INEP</span> com questões e gabaritos oficiais em uma experiência única. 
          Sua jornada médica começa aqui.
        </p>
      </div>

      {/* Cards de Features Gamificados - Mais Compactos */}
      <div className="space-y-4">
        {/* Card 1: Questões Oficiais - Enhanced & Compact */}
        <div className="gamified-feature-card stagger-animation-delay-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative flex items-center gap-4 p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] border-2 border-green-200/50 dark:border-green-800/50 shadow-lg group-hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg truncate">Questões Oficiais</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex-shrink-0">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-700 dark:text-green-300">Verificado</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-tight mb-2">
                Banco com +1.500 questões oficiais organizadas por ano
              </p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Sistema de XP - Enhanced & Compact */}
        <div className="gamified-feature-card stagger-animation-delay-2 group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative flex items-center gap-4 p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] border-2 border-yellow-200/50 dark:border-yellow-800/50 shadow-lg group-hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg truncate">Sistema de Níveis</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full flex-shrink-0">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">Gamificado</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-tight mb-2">
                Ganhe XP a cada questão e evolua com feedback imediato
              </p>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-orange-500 fill-current" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Avançado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Ranking Nacional - Enhanced & Compact */}
        <div className="gamified-feature-card stagger-animation-delay-3 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative flex items-center gap-4 p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] border-2 border-blue-200/50 dark:border-blue-800/50 shadow-lg group-hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg truncate">Ranking Nacional</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full flex-shrink-0">
                  <Target className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700 dark:text-cyan-300">Competitivo</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-tight mb-2">
                Compare seu desempenho em competição saudável
              </p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-blue-500 fill-current" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Tempo Real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
