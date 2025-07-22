import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { CancellationModal } from './CancellationModal';

interface CancellationButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function CancellationButton({ 
  variant = 'destructive', 
  size = 'default',
  className = '',
  children = 'Cancelar Assinatura',
  showIcon = true 
}: CancellationButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShowModal(true)}
      >
        {showIcon && <XCircle className="w-4 h-4 mr-2" />}
        {children}
      </Button>

      <CancellationModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
} 