
import { Stethoscope, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Brand - Better spacing and alignment */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">RevalidaQuest</span>
            </div>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg">
              A plataforma de preparação para o Revalida mais completa do Brasil.
              Transforme seus estudos em uma jornada gamificada rumo à aprovação.
            </p>
            <div className="flex items-center gap-3 text-sm lg:text-base text-gray-400">
              <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>contato@revalidaquest.com.br</span>
            </div>
          </div>

          {/* Quick Links - Better spacing */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg lg:text-xl mb-6">Links Rápidos</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/auth" className="hover:text-white transition-colors text-base lg:text-lg">Entrar</Link></li>
            </ul>
          </div>

          {/* Legal - Better spacing */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg lg:text-xl mb-6">Informações</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/termos" className="hover:text-white transition-colors text-base lg:text-lg">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-white transition-colors text-base lg:text-lg">Privacidade</Link></li>
              <li><Link to="/ajuda" className="hover:text-white transition-colors text-base lg:text-lg">Ajuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Better alignment and spacing */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm lg:text-base">
            © {new Date().getFullYear()} RevalidaQuest. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm lg:text-base">
            Feito com ❤️ para médicos brasileiros
          </p>
        </div>
      </div>
    </footer>
  );
}
