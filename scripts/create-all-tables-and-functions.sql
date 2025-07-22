-- Script COMPLETO para criar TODAS as tabelas e funções
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- CRIAÇÃO COMPLETA DO SISTEMA DE E-MAILS AUTORIZADOS
-- =====================================================

-- 1. Criar tabela authorized_emails (se não existir)
CREATE TABLE IF NOT EXISTS public.authorized_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  domain TEXT, -- Para autorizar domínios inteiros (ex: @hospital.com)
  is_active BOOLEAN DEFAULT true,
  added_by TEXT DEFAULT 'system',
  added_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Garantir que pelo menos email OU domain seja preenchido
  CONSTRAINT check_email_or_domain CHECK (email IS NOT NULL OR domain IS NOT NULL)
);

-- 2. Criar tabela access_attempts (se não existir)
CREATE TABLE IF NOT EXISTS public.access_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  attempted_at TIMESTAMPTZ DEFAULT now(),
  was_authorized BOOLEAN NOT NULL,
  notes TEXT
);

-- 3. Habilitar Row Level Security nas tabelas
ALTER TABLE public.authorized_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_attempts ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas de segurança para authorized_emails
DROP POLICY IF EXISTS "service_role_all" ON public.authorized_emails;
CREATE POLICY "service_role_all" ON public.authorized_emails
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "public_read" ON public.authorized_emails;
CREATE POLICY "public_read" ON public.authorized_emails
  FOR SELECT USING (true);

-- 5. Criar políticas de segurança para access_attempts
DROP POLICY IF EXISTS "service_role_all" ON public.access_attempts;
CREATE POLICY "service_role_all" ON public.access_attempts
  FOR ALL USING (auth.role() = 'service_role');

-- 6. Remover funções existentes com problemas
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, BOOLEAN, INET, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, INET, TEXT, BOOLEAN, TEXT);
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, BOOLEAN);

DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT);

DROP FUNCTION IF EXISTS public.is_email_authorized(TEXT);

-- 7. Criar função is_email_authorized
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

-- 8. Criar função add_authorized_email
CREATE OR REPLACE FUNCTION public.add_authorized_email(
  email_address TEXT DEFAULT NULL,
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
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO email_id;
  
  RETURN email_id;
END;
$$;

-- 9. Criar função remove_authorized_email
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

-- 10. Criar função log_access_attempt
CREATE OR REPLACE FUNCTION public.log_access_attempt(
  email_address TEXT,
  authorized BOOLEAN,
  ip_addr INET DEFAULT NULL,
  user_agent_text TEXT DEFAULT NULL,
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

-- 11. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_authorized_emails_email ON public.authorized_emails(email);
CREATE INDEX IF NOT EXISTS idx_authorized_emails_domain ON public.authorized_emails(domain);
CREATE INDEX IF NOT EXISTS idx_authorized_emails_active ON public.authorized_emails(is_active);
CREATE INDEX IF NOT EXISTS idx_access_attempts_email ON public.access_attempts(email);
CREATE INDEX IF NOT EXISTS idx_access_attempts_date ON public.access_attempts(attempted_at);

-- 12. Inserir e-mails de exemplo (se não existirem)
INSERT INTO public.authorized_emails (email, notes) VALUES 
  ('admin@revalidaquest.com', 'Administrador do sistema'),
  ('gabrielbzerra1998@gmail.com', 'Desenvolvedor do sistema'),
  ('maresiatragind@gmail.com', 'Usuário autorizado')
ON CONFLICT (email) DO NOTHING;

-- 13. Inserir domínios autorizados (exemplo)
INSERT INTO public.authorized_emails (domain, notes) VALUES 
  ('hospital.com', 'Domínio autorizado para hospitais'),
  ('universidade.edu.br', 'Domínio autorizado para universidades'),
  ('usp.br', 'Universidade de São Paulo'),
  ('unifesp.edu.br', 'Universidade Federal de São Paulo')
ON CONFLICT DO NOTHING;

-- 14. Verificar se tudo foi criado corretamente
SELECT 'Tabelas criadas:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('authorized_emails', 'access_attempts');

SELECT 'Funções criadas:' as status;
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_name IN ('is_email_authorized', 'add_authorized_email', 'remove_authorized_email', 'log_access_attempt');

SELECT 'E-mails autorizados:' as status;
SELECT email, domain, is_active, notes FROM public.authorized_emails ORDER BY added_at DESC;

-- 15. Testar as funções
SELECT 'Teste de validação:' as status;
SELECT 
  'maresiatragind@gmail.com' as email,
  public.is_email_authorized('maresiatragind@gmail.com') as autorizado;

SELECT 
  'medico@hospital.com' as email,
  public.is_email_authorized('medico@hospital.com') as autorizado;

SELECT 
  'usuario@naoautorizado.com' as email,
  public.is_email_authorized('usuario@naoautorizado.com') as autorizado;

-- 16. Testar função add_authorized_email
SELECT 'Testando add_authorized_email...' as status;
SELECT public.add_authorized_email('teste@correcao.com', NULL, 'Teste de correção') as resultado;

-- 17. Testar função log_access_attempt
SELECT 'Testando log_access_attempt...' as status;
SELECT public.log_access_attempt('teste@correcao.com', true, NULL, 'Teste', 'Teste de correção') as resultado;

-- 18. Limpar dados de teste
DELETE FROM public.authorized_emails WHERE email = 'teste@correcao.com';
DELETE FROM public.access_attempts WHERE email = 'teste@correcao.com';

-- 19. Verificar resultado final
SELECT 'Sistema criado com sucesso!' as status;
SELECT COUNT(*) as total_emails FROM public.authorized_emails;
SELECT COUNT(*) as total_attempts FROM public.access_attempts; 