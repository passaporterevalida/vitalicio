
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle auth events - only show login success for actual login, not session restoration
        if (event === 'SIGNED_IN' && !isInitialLoad) {
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta ao Revalida Quest! 🎉",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Logout realizado",
            description: "Até logo! Continue sua jornada quando quiser. 👋",
          });
        }
        
        // Mark that initial load is complete after first auth state change
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Erro no Login",
          description: error.message === "Invalid login credentials" 
            ? "Email ou senha incorretos" 
            : error.message.includes('Email not confirmed')
            ? "Por favor, confirme seu email antes de fazer login"
            : "Erro no login. Tente novamente.",
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      toast({
        title: "Erro no Login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName?.trim() || 'Aventureiro',
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Erro no Cadastro",
          description: error.message.includes('already registered')
            ? "Este email já está cadastrado. Tente fazer login."
            : error.message.includes('Password should be')
            ? "A senha deve ter pelo menos 6 caracteres."
            : "Erro no cadastro. Tente novamente.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cadastro realizado! 🎉",
          description: "Verifique seu email para confirmar a conta e fazer login.",
        });
      }

      return { error };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      toast({
        title: "Erro no Cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Erro no Logout",
          description: "Ocorreu um erro. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast({
        title: "Erro no Logout",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
