
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  email: string;
  password: string;
  isSubmitting: boolean;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword?: () => void;
}

export function LoginForm({
  email,
  password,
  isSubmitting,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
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
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha <span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 px-3 text-sm"
        />
      </div>
      
      {/* Forgot Password Link */}
      {onForgotPassword && (
        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            disabled={isSubmitting || loading}
          >
            Esqueci minha senha
          </button>
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transition-all duration-300 text-sm"
        disabled={isSubmitting || loading}
      >
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Entrando...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>⚡</span>
            Iniciar Jornada
          </div>
        )}
      </Button>
    </form>
  );
}
