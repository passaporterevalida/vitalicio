
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthTabsProps {
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
  onSignIn: (e: React.FormEvent) => void;
  onSignUp: (e: React.FormEvent) => void;
  onResetForm: () => void;
  onForgotPassword?: () => void;
}

export function AuthTabs({
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
  onSignIn,
  onSignUp,
  onResetForm,
  onForgotPassword
}: AuthTabsProps) {
  return (
    <Tabs defaultValue="login" className="w-full" onValueChange={onResetForm}>
      <TabsList className="grid w-full grid-cols-2 bg-gray-50 rounded-lg p-1 mb-4 h-9">
        <TabsTrigger 
          value="login" 
          className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm py-1.5"
        >
          <LogIn className="w-3.5 h-3.5" />
          Entrar
        </TabsTrigger>
        <TabsTrigger 
          value="signup" 
          className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm py-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Cadastrar
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="space-y-4">
        <LoginForm
          email={email}
          password={password}
          isSubmitting={isSubmitting}
          loading={loading}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onSubmit={onSignIn}
          onForgotPassword={onForgotPassword}
        />
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-4">
        <SignupForm
          email={email}
          confirmEmail={confirmEmail}
          password={password}
          displayName={displayName}
          isSubmitting={isSubmitting}
          loading={loading}
          onEmailChange={onEmailChange}
          onConfirmEmailChange={onConfirmEmailChange}
          onPasswordChange={onPasswordChange}
          onDisplayNameChange={onDisplayNameChange}
          onSubmit={onSignUp}
        />
      </TabsContent>
    </Tabs>
  );
}
