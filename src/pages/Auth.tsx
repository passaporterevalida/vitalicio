
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Stethoscope } from 'lucide-react';
import { AuthHeroSection } from '@/components/auth/AuthHeroSection';
import { AuthForm } from '@/components/auth/AuthForm';
import { MobileOfficialCards } from '@/components/auth/MobileOfficialCards';
import { PricingBackground } from '@/components/pricing/PricingBackground';
import { LandingNavbar } from "@/components/landing/LandingNavbar";

export default function Auth() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();

  // Redirect if already logged in
  if (user && !loading) {
    const redirectTo = searchParams.get('redirect') || '/app';
    return <Navigate to={redirectTo} replace />;
  }

  if (loading) {
    return (
      <>
        <LandingNavbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LandingNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Elementos decorativos do fundo da LandingPage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <svg className="absolute top-20 right-20 w-6 h-6 text-blue-300 opacity-30 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        <svg className="absolute bottom-20 left-20 w-5 h-5 text-purple-400 opacity-30 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-[3fr_2fr] gap-12 items-center pt-24 sm:pt-28">
          {/* Hero Section - Desktop 60% */}
          <AuthHeroSection />
          {/* Auth Form - Desktop 40% */}
          <div className="w-full">
            <AuthForm />
          </div>
        </div>
      </div>
      {/* Mobile Official Cards - Only shown on mobile, positioned at the bottom */}
      <MobileOfficialCards />
    </div>
    </>
  );
}
