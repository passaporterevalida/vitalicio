import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function AccessibilityEnhancer() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Focus management for route changes
    const mainElement = mainRef.current || document.querySelector('main');
    if (mainElement) {
      mainElement.focus();
    }

    // Announce route changes to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);

    const pageTitle = document.title || 'Revalida Quest';
    announcement.textContent = `Navegou para ${pageTitle}`;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [location]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Navigation shortcuts
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            window.location.href = '/app';
            break;
          case '2':
            e.preventDefault();
            window.location.href = '/questions';
            break;
          case '3':
            e.preventDefault();
            window.location.href = '/missions';
            break;
          case '4':
            e.preventDefault();
            window.location.href = '/stats';
            break;
          case '5':
            e.preventDefault();
            window.location.href = '/ranking';
            break;
        }
      }

      // Skip to main content
      if (e.key === 'Tab' && e.shiftKey && e.altKey) {
        e.preventDefault();
        const mainElement = document.querySelector('main') || document.querySelector('#main-content');
        if (mainElement) {
          (mainElement as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}

// Hook para melhorar foco em componentes interativos
export function useFocusManagement() {
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const trapFocus = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  };

  const focusFirstElement = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  };

  return { trapFocus, focusFirstElement };
}

// Componente para melhorar acessibilidade de botões
export function AccessibleButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Componente para melhorar acessibilidade de links
export function AccessibleLink({ 
  children, 
  href, 
  className = '', 
  ...props 
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
} 