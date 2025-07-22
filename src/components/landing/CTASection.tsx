import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
export function CTASection() {
  return <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Comece sua jornada rumo à{" "}
          <span className="text-yellow-300 text-3xl lg:text-5xl">aprovação</span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Junte-se a mais de 11.200 médicos que já escolheram o RevalidaQuest
          para transformar sua preparação em uma experiência gamificada e eficiente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-800 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300">
              <BookOpen className="w-5 h-5 mr-2" />
              Começar Grátis Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
            <span>Experimente grátis</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
            <span>Acesso imediato</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
            <span>Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </section>;
}