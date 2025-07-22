
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CookieBanner } from "@/components/CookieBanner";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { ConnectivityStatus } from "@/components/ErrorHandling";
import { PreloadResources } from "@/components/PerformanceOptimizations";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Questions from "./pages/Questions";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Missions from "./pages/Missions";
import Simulados from "./pages/Simulados";
import Ranking from "./pages/Ranking";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Success from "./pages/Success";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
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
                <Route path="/" element={<Landing />} />
                <Route path="/app" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/auth" element={<Auth />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/success" element={<Success />} />
                <Route path="/termos" element={<Terms />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/ajuda" element={<Help />} />
                <Route path="/questions" element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                } />
                <Route path="/provas" element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                } />
                <Route path="/questoes" element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                } />
                <Route path="/missions" element={
                  <ProtectedRoute>
                    <Missions />
                  </ProtectedRoute>
                } />
                <Route path="/quests" element={
                  <ProtectedRoute>
                    <Missions />
                  </ProtectedRoute>
                } />
                <Route path="/missoes" element={
                  <ProtectedRoute>
                    <Missions />
                  </ProtectedRoute>
                } />
                <Route path="/simulados" element={
                  <ProtectedRoute>
                    <Simulados />
                  </ProtectedRoute>
                } />
                <Route path="/stats" element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                } />
                <Route path="/estatisticas" element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/perfil" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/ranking" element={
                  <ProtectedRoute>
                    <Ranking />
                  </ProtectedRoute>
                } />
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
