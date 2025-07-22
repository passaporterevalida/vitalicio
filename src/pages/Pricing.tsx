
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
      <Navbar />
      
      <div className="pt-20 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 App Vitalício Ativo!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Parabéns! Você tem acesso ilimitado a todas as funcionalidades do RevalidaQuest.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Recursos Inclusos:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✅ Questões ilimitadas</li>
                <li>✅ Simulados ilimitados</li>
                <li>✅ Missões ilimitadas</li>
                <li>✅ Estatísticas avançadas</li>
                <li>✅ Ranking completo</li>
                <li>✅ Todas as funcionalidades premium</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => window.location.href = '/app'}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg"
            >
              Continuar Estudando
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
