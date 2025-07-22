
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { AuthFormHeader } from './AuthFormHeader';
import { AuthSuccessAlert } from './AuthSuccessAlert';
import { AuthErrorAlert } from './AuthErrorAlert';
import { AuthTabs } from './AuthTabs';
import { AuthStatsFooter } from './AuthStatsFooter';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export function AuthForm() {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const { error: signInError } = await signIn(email, password);
    
    if (signInError) {
      if (signInError.message === "Invalid login credentials") {
        setError('Email ou senha incorretos. Verifique suas credenciais.');
      } else if (signInError.message.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.');
      } else {
        setError('Erro no login. Tente novamente em alguns instantes.');
      }
    }
    
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmEmail) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (email !== confirmEmail) {
      setError('Os e-mails não coincidem. Verifique e tente novamente.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const { error: signUpError } = await signUp(email, password, displayName);
    
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Este email já está cadastrado. Tente fazer login ou use outro email.');
      } else if (signUpError.message.includes('Password should be')) {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Erro no cadastro. Tente novamente em alguns instantes.');
      }
    } else {
      setShowSuccess(true);
      setEmail('');
      setConfirmEmail('');
      setPassword('');
      setDisplayName('');
    }
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setError('');
    setShowSuccess(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden rounded-2xl">
          <AuthFormHeader />
          
          <CardContent className="px-6 pb-6">
            <AuthSuccessAlert showSuccess={showSuccess} />
            <AuthErrorAlert error={error} />

            <AuthTabs
              email={email}
              confirmEmail={confirmEmail}
              password={password}
              displayName={displayName}
              isSubmitting={isSubmitting}
              loading={loading}
              onEmailChange={setEmail}
              onConfirmEmailChange={setConfirmEmail}
              onPasswordChange={setPassword}
              onDisplayNameChange={setDisplayName}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onResetForm={resetForm}
              onForgotPassword={handleForgotPassword}
            />

            <AuthStatsFooter />
          </CardContent>
        </Card>
      </div>

      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}
