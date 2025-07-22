
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Simple analytics tracking
export function Analytics() {
  const { user } = useAuth();

  useEffect(() => {
    // Track page views
    const trackPageView = (url: string) => {
      // Simple console tracking for MVP - replace with Google Analytics later
      console.log(`Page view: ${url}`, {
        timestamp: new Date().toISOString(),
        user_id: user?.id || 'anonymous',
        url
      });
    };

    // Track initial page load
    trackPageView(window.location.pathname);

    // Track navigation changes
    const handleNavigation = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, [user]);

  return null;
}

// Hook for tracking events
export function useAnalytics() {
  const { user } = useAuth();

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    console.log(`Event: ${eventName}`, {
      timestamp: new Date().toISOString(),
      user_id: user?.id || 'anonymous',
      ...properties
    });
  };

  return { trackEvent };
}
