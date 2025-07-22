import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthorizedEmail {
  id: string;
  email: string;
  domain: string | null;
  is_active: boolean;
  added_by: string;
  added_at: string;
  notes: string | null;
}

interface AccessAttempt {
  id: string;
  email: string;
  ip_address: string | null;
  user_agent: string | null;
  attempted_at: string;
  was_authorized: boolean;
  notes: string | null;
}

export function useAuthorizedEmails() {
  const [authorizedEmails, setAuthorizedEmails] = useState<AuthorizedEmail[]>([]);
  const [accessAttempts, setAccessAttempts] = useState<AccessAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Carregar e-mails autorizados
  const loadAuthorizedEmails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('authorized_emails')
        .select('*')
        .order('added_at', { ascending: false });

      if (error) throw error;
      setAuthorizedEmails(data || []);
    } catch (error) {
      console.error('Erro ao carregar e-mails autorizados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de e-mails autorizados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Carregar tentativas de acesso
  const loadAccessAttempts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('access_attempts')
        .select('*')
        .order('attempted_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAccessAttempts(data || []);
    } catch (error) {
      console.error('Erro ao carregar tentativas de acesso:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as tentativas de acesso.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Adicionar e-mail autorizado
  const addAuthorizedEmail = async (email: string, domain?: string, notes?: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('add_authorized_email', {
        email_address: email,
        domain_name: domain || null,
        notes_text: notes || null
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "E-mail autorizado adicionado com sucesso!",
      });

      await loadAuthorizedEmails();
      return data;
    } catch (error) {
      console.error('Erro ao adicionar e-mail autorizado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o e-mail autorizado.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remover e-mail autorizado
  const removeAuthorizedEmail = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.rpc('remove_authorized_email', {
        email_address: email
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "E-mail autorizado removido com sucesso!",
      });

      await loadAuthorizedEmails();
    } catch (error) {
      console.error('Erro ao remover e-mail autorizado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o e-mail autorizado.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verificar se um e-mail está autorizado
  const checkEmailAuthorization = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('is_email_authorized', {
        email_to_check: email
      });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Erro ao verificar autorização:', error);
      return false;
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    loadAuthorizedEmails();
  }, []);

  return {
    authorizedEmails,
    accessAttempts,
    loading,
    loadAuthorizedEmails,
    loadAccessAttempts,
    addAuthorizedEmail,
    removeAuthorizedEmail,
    checkEmailAuthorization,
  };
} 