import { useEffect } from 'react';

export function useNavbarVisibility(shouldHide: boolean) {
  useEffect(() => {
    const navbar = document.querySelector('nav') as HTMLElement;
    
    if (navbar) {
      if (shouldHide) {
        // Adicionar transição suave
        navbar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.pointerEvents = 'none';
      } else {
        // Restaurar visibilidade com transição
        navbar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
        navbar.style.pointerEvents = 'auto';
      }
    }

    // Cleanup: restaurar navbar quando componente for desmontado
    return () => {
      if (navbar) {
        navbar.style.transition = '';
        navbar.style.opacity = '';
        navbar.style.transform = '';
        navbar.style.pointerEvents = '';
      }
    };
  }, [shouldHide]);
} 