import { User, Target, Star, Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
export function ProfilePageHeader() {
  const {
    userProgress
  } = useGamification();
  return <div className="text-center mb-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-4 left-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-5 h-5 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div className="relative z-10">
        {/* Main Title */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-md py-[12px] px-[12px]">
              <User className="w-8 h-8 text-white" />
            </div>
            
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Gerencie sua conta, configurações e acompanhe seu progresso acadêmico personalizado na preparação para o Revalida.</p>
        </div>

        {/* Player Status Badge */}
        

        {/* Motivational Message */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-green-800">
            <Star className="w-5 h-5" />
            <span className="font-medium text-sm">
              Personalize sua experiência e mantenha seu perfil sempre atualizado!
            </span>
          </div>
        </div>
      </div>
    </div>;
}