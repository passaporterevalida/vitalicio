
import { BadgeCheck, Trophy, Users, Star, CheckCircle, Award, Target, TrendingUp, Crown } from 'lucide-react';

export function MobileOfficialCards() {
  return (
    <div className="lg:hidden relative z-10 px-4 pb-8 mt-8">
      <div className="space-y-6">
        {/* Official Questions Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 border-2 border-blue-200/50 dark:border-blue-700/50 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <BadgeCheck className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Questões Oficiais</h3>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500 fill-current" />
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold text-green-600">Verificado</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Banco completo com mais de 1.500 questões oficiais e organizadas por ano
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                <div className="text-lg font-bold text-blue-700">1.500+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Questões</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                <div className="text-lg font-bold text-blue-800">15</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Anos</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                <div className="text-lg font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Oficial</div>
              </div>
            </div>
          </div>
        </div>

        {/* XP System Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 border-2 border-yellow-200/50 dark:border-yellow-700/50 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Sistema de XP</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold text-yellow-600">Gamificado</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ganhe experiência a cada questão respondida e evolua com feedback imediato
            </p>
          </div>
        </div>

        {/* Ranking Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 border-2 border-cyan-200/50 dark:border-cyan-700/50 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Ranking Nacional</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-blue-600">Competitivo</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compare seu desempenho com outros médicos em uma competição saudável
            </p>
          </div>
        </div>

        {/* Enhanced Mobile Stats */}
        <div className="relative mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-900/95 rounded-3xl p-6 border-2 border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm shadow-2xl">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-full mb-3">
                <Crown className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Comunidade Elite</span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Junte-se aos Melhores!
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl"></div>
                <div className="relative p-3">
                  <div className="text-xl font-bold text-blue-700">1.5k+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Questões</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl"></div>
                <div className="relative p-3">
                  <div className="text-xl font-bold text-green-700">500k+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Questões</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl"></div>
                <div className="relative p-3">
                  <div className="text-xl font-bold text-yellow-700">87%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Aprovação</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  Resultados Comprovados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
