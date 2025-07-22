
import { useState, useEffect } from 'react';
import { MobileSidebar } from './MobileSidebar';
import { MobileHamburgerButton } from './MobileHamburgerButton';

interface Props {
  className?: string;
}

export function MobileHamburgerMenu({ className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <MobileHamburgerButton 
        isOpen={isOpen} 
        onToggle={toggleMenu} 
        className={className}
      />
      <MobileSidebar 
        isOpen={isOpen} 
        onClose={closeMenu} 
      />
    </>
  );
}
