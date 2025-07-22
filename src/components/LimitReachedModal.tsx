
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LimitReachedModalProps {
  open: boolean;
  onClose: () => void;
  limitType: 'questions' | 'simulados' | 'missions';
}

export function LimitReachedModal({ open, onClose, limitType }: LimitReachedModalProps) {
  // App vitalício - LimitReachedModal desabilitado
  // Nunca exibe o modal de limite atingido
  return null;
}
