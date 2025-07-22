import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Hook para detectar gestos de swipe
export function useSwipeNavigation() {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const isMobile = useIsMobile();

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!isMobile) return;
    
    setSwipeDirection(direction);
    
    // Navegação por swipe (implementar conforme necessário)
    if (direction === 'left') {
      // Navegar para próxima página
      console.log('Swipe left - next page');
    } else if (direction === 'right') {
      // Navegar para página anterior
      console.log('Swipe right - previous page');
    }
    
    // Reset direction after animation
    setTimeout(() => setSwipeDirection(null), 300);
  };

  return { swipeDirection, handleSwipe };
}

// Componente para melhorar botões touch
export function TouchButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isPressed, setIsPressed] = useState(false);
  const isMobile = useIsMobile();

  const handleTouchStart = () => {
    if (isMobile) setIsPressed(true);
  };

  const handleTouchEnd = () => {
    if (isMobile) setIsPressed(false);
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        min-h-[44px] min-w-[44px] 
        transition-all duration-200 
        active:scale-95 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isPressed ? 'scale-95 shadow-inner' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

// Componente para melhorar scroll em mobile
export function MobileScrollContainer({ 
  children, 
  className = '',
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`overflow-y-auto overscroll-contain ${className}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth'
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Hook para detectar orientação do dispositivo
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return orientation;
}

// Componente para otimizar layout baseado na orientação
export function OrientationAwareLayout({ 
  children, 
  portraitClass = '', 
  landscapeClass = '' 
}: {
  children: React.ReactNode;
  portraitClass?: string;
  landscapeClass?: string;
}) {
  const orientation = useOrientation();
  
  return (
    <div className={orientation === 'portrait' ? portraitClass : landscapeClass}>
      {children}
    </div>
  );
}

// Hook para detectar se o dispositivo suporta hover
export function useHoverSupport() {
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return supportsHover;
}

// Componente para melhorar feedback tátil
export function HapticFeedback({ 
  children, 
  onPress 
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const handlePress = () => {
    // Trigger haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    onPress?.();
  };

  return (
    <div onClick={handlePress} className="cursor-pointer">
      {children}
    </div>
  );
}

// Componente para melhorar navegação por gestos
export function GestureNavigation({ 
  children, 
  onSwipeLeft, 
  onSwipeRight 
}: {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  // Implementação básica de swipe sem dependência externa
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft?.();
    }
    if (isRightSwipe) {
      onSwipeRight?.();
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
} 