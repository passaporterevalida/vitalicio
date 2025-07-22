
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Zap, ArrowRight, X, Sparkles, Users } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'questions' | 'simulados';
  currentUsage: number;
  limit: number;
}

export function PaywallModal({ isOpen, onClose, feature, currentUsage, limit }: PaywallModalProps) {
  // App vitalício - PaywallModal desabilitado
  // Nunca exibe o modal de paywall
  return null;
}
