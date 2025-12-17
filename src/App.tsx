
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
// ProtectedRoute não é necessário nesta versão sem login
import { CookieBanner } from "@/components/CookieBanner";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { ConnectivityStatus } from "@/components/ErrorHandling";
import { PreloadResources } from "@/components/PerformanceOptimizations";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Questions from "./pages/Questions";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Missions from "./pages/Missions";
import Simulados from "./pages/Simulados";
import Ranking from "./pages/Ranking";
// Página de Auth removida nesta versão
import Pricing from "./pages/Pricing";
import Success from "./pages/Success";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Admin from "./pages/Admin";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect } from "react";

// Componente global para garantir scroll ao topo a cada mudança de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    localStorage.removeItem('revalida-progress');
    localStorage.removeItem('mission-progress');
    localStorage.removeItem('premium_challenge_won');
  }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <CookieBanner />
            <ConnectivityStatus />
            <PreloadResources />
            <BrowserRouter>
              <AccessibilityEnhancer />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/app" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/success" element={<Success />} />
                <Route path="/termos" element={<Terms />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/ajuda" element={<Help />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/provas" element={<Questions />} />
                <Route path="/questoes" element={<Questions />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/quests" element={<Missions />} />
                <Route path="/missoes" element={<Missions />} />
                <Route path="/simulados" element={<Simulados />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/estatisticas" element={<Stats />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
