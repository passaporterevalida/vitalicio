
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail } from 'lucide-react';

interface AuthSuccessAlertProps {
  showSuccess: boolean;
}

export function AuthSuccessAlert({ showSuccess }: AuthSuccessAlertProps) {
  if (!showSuccess) return null;

  return (
    <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800 dark:text-green-200">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>Conta criada! Verifique seu email para confirmar o cadastro.</span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
