
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Users, BookOpen, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function HeroSection() {

  useEffect(() => {
    let player: any = null;
    let apiLoaded = false;
    function onYouTubeIframeAPIReady() {
      player = new (window as any).YT.Player('demo-youtube', {
        events: {
          'onStateChange': function (event: any) {
            // 0 = ended
            if (event.data === 0) {
              player.seekTo(0);
              player.pauseVideo();
            }
          }
        }
      });
    }

    // Carrega a API do YouTube apenas uma vez
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else if ((window as any).YT && (window as any).YT.Player) {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (player && player.destroy) player.destroy();
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <Sparkles className="absolute top-20 right-20 w-6 h-6 text-blue-300 opacity-30 animate-pulse delay-500" />
        <Trophy className="absolute bottom-20 left-20 w-5 h-5 text-purple-400 opacity-30 animate-bounce delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 py-[16px]">
          {/* Badge */}
          <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            #1 Plataforma Gamificada para Revalida no Brasil
          </Badge>

          {/* Headline */}
          <h1 className="font-bold mb-6 leading-tight flex flex-wrap justify-center items-center gap-1">
            <span className="text-gray-800 text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">A Nova Era da Preparação Para o </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Revalida INEP</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A única plataforma que transforma sua preparação para o Revalida em uma 
            jornada gamificada com mais de 1.500 questões oficiais, missões exclusivas, simulados personalizados 
            e análises com IA.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Começar Grátis Agora
              </Button>
            </Link>

          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>+11.200 médicos ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 estrelas (2.400+ avaliações)</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>87% de aprovação</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl border-4 border-white overflow-hidden">
            <iframe
              id="demo-youtube"
              className="w-full h-full"
              src="https://www.youtube.com/embed/udbUFjgUV4A?rel=0&modestbranding=1&enablejsapi=1"
              title="Demonstração do Produto"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-bounce">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Missão Completa!</p>
                <p className="text-xs text-gray-500">+50 XP</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600 fill-current" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Nível 15</p>
                <p className="text-xs text-gray-500">Especialista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
