import { useCallback } from 'react';

/**
 * Hook customizado para ancoragem suave em elementos
 * Remove duplicação de código entre SimuladoModal e JornadaMissionModal
 */
export function useSmoothAnchor() {
  const scrollToRef = useCallback((ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return scrollToRef;
} 