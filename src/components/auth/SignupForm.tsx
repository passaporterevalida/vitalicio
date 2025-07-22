
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface SignupFormProps {
  email: string;
  confirmEmail: string;
  password: string;
  displayName: string;
  isSubmitting: boolean;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onConfirmEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupForm({
  email,
  confirmEmail,
  password,
  displayName,
  isSubmitting,
  loading,
  onEmailChange,
  onConfirmEmailChange,
  onPasswordChange,
  onDisplayNameChange,
  onSubmit
}: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">
          Nome de exibição
        </Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Como deseja ser chamado?"
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          disabled={isSubmitting || loading}
          className="h-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 px-3 text-sm"
        />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 px-3 text-sm"
        />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="signup-confirm-email" className="text-sm font-medium text-gray-700">
          Confirmar Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="signup-confirm-email"
          type="email"
          placeholder="Repita seu e-mail"
          value={confirmEmail}
          onChange={(e) => onConfirmEmailChange(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 px-3 text-sm"
        />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
          Senha <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onFocus={() => setShowPasswordStrength(true)}
            onBlur={() => setShowPasswordStrength(false)}
            required
            disabled={isSubmitting || loading}
            className="h-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 px-3 pr-10 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting || loading}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        
        <PasswordStrengthIndicator 
          password={password}
          showIndicator={showPasswordStrength}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-10 medical-button-primary text-sm font-semibold"
        disabled={isSubmitting || loading}
      >
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Criando conta...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Criar Minha Conta
          </div>
        )}
      </Button>
    </form>
  );
}
