import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo - Better alignment and spacing */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-3 py-2 group transition-all duration-300 hover:scale-105 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3 rounded-xl">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse whitespace-nowrap">
                  RevalidaQuest
                </span>
                <span className="text-xs sm:text-sm text-gray-500 -mt-0.5 whitespace-nowrap hidden xs:block">
                  Sua jornada médica
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Removido pois não há mais itens de navegação */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
            {/* Espaço vazio para manter o layout centralizado */}
          </div>

          {/* Auth Buttons - Desktop - Better spacing and alignment */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-200 flex items-center justify-center gap-3">
              <Link to="/auth" className="flex items-center justify-center text-gray-800 hover:text-gray-900 transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                Entrar
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button substituído por botão Entrar */}
          <div className="md:hidden flex items-center">
            <Link to="/auth">
              <button
                className="px-4 py-1.5 rounded-xl bg-gradient-to-br from-white to-gray-100 text-gray-800 font-medium font-sans shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200 text-sm"
                aria-label="Entrar"
              >
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}