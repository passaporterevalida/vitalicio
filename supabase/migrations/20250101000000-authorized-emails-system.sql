-- Sistema de E-mails Autorizados para Versão Vitalícia
-- Esta migração implementa controle de acesso por e-mails autorizados

-- Tabela para gerenciar e-mails autorizados
CREATE TABLE public.authorized_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  domain TEXT, -- Para autorizar domínios inteiros (ex: @hospital.com)
  is_active BOOLEAN DEFAULT true,
  added_by TEXT DEFAULT 'system',
  added_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.authorized_emails ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança (apenas service_role pode gerenciar)
CREATE POLICY "service_role_all" ON public.authorized_emails
  FOR ALL USING (auth.role() = 'service_role');

-- Política para leitura pública (necessário para validação)
CREATE POLICY "public_read" ON public.authorized_emails
  FOR SELECT USING (true);

-- Função para verificar se um e-mail está autorizado
CREATE OR REPLACE FUNCTION public.is_email_authorized(email_to_check TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar se o e-mail específico está autorizado
  IF EXISTS (
    SELECT 1 FROM public.authorized_emails 
    WHERE email = email_to_check AND is_active = true
  ) THEN
    RETURN true;
  END IF;
  
  -- Verificar se o domínio está autorizado
  IF EXISTS (
    SELECT 1 FROM public.authorized_emails 
    WHERE domain = split_part(email_to_check, '@', 2) AND is_active = true
  ) THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Função para adicionar e-mail autorizado
CREATE OR REPLACE FUNCTION public.add_authorized_email(
  email_address TEXT,
  domain_name TEXT DEFAULT NULL,
  notes_text TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  email_id UUID;
BEGIN
  INSERT INTO public.authorized_emails (email, domain, notes)
  VALUES (email_address, domain_name, notes_text)
  RETURNING id INTO email_id;
  
  RETURN email_id;
END;
$$;

-- Função para remover e-mail autorizado
CREATE OR REPLACE FUNCTION public.remove_authorized_email(email_address TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.authorized_emails WHERE email = email_address;
  RETURN FOUND;
END;
$$;

-- Tabela para log de tentativas de acesso não autorizado
CREATE TABLE public.access_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  attempted_at TIMESTAMPTZ DEFAULT now(),
  was_authorized BOOLEAN NOT NULL,
  notes TEXT
);

-- Habilitar RLS para access_attempts
ALTER TABLE public.access_attempts ENABLE ROW LEVEL SECURITY;

-- Políticas para access_attempts
CREATE POLICY "service_role_all" ON public.access_attempts
  FOR ALL USING (auth.role() = 'service_role');

-- Função para registrar tentativa de acesso
CREATE OR REPLACE FUNCTION public.log_access_attempt(
  email_address TEXT,
  ip_addr INET DEFAULT NULL,
  user_agent_text TEXT DEFAULT NULL,
  authorized BOOLEAN,
  notes_text TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  attempt_id UUID;
BEGIN
  INSERT INTO public.access_attempts (email, ip_address, user_agent, was_authorized, notes)
  VALUES (email_address, ip_addr, user_agent_text, authorized, notes_text)
  RETURNING id INTO attempt_id;
  
  RETURN attempt_id;
END;
$$;

-- Inserir alguns e-mails de exemplo (substitua pelos reais)
-- INSERT INTO public.authorized_emails (email, notes) VALUES 
--   ('admin@revalidaquest.com', 'Administrador do sistema'),
--   ('teste@hospital.com', 'Usuário de teste');

-- Inserir domínios autorizados (exemplo)
-- INSERT INTO public.authorized_emails (domain, notes) VALUES 
--   ('hospital.com', 'Domínio autorizado para hospitais'),
--   ('universidade.edu.br', 'Domínio autorizado para universidades');

-- Criar índices para performance
CREATE INDEX idx_authorized_emails_email ON public.authorized_emails(email);
CREATE INDEX idx_authorized_emails_domain ON public.authorized_emails(domain);
CREATE INDEX idx_authorized_emails_active ON public.authorized_emails(is_active);
CREATE INDEX idx_access_attempts_email ON public.access_attempts(email);
CREATE INDEX idx_access_attempts_date ON public.access_attempts(attempted_at); 