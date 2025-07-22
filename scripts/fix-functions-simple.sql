-- Script SIMPLES para corrigir as funções SQL
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- CORREÇÃO SIMPLES DAS FUNÇÕES
-- =====================================================

-- 1. Remover funções existentes com problemas
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT);

DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, INET, TEXT, BOOLEAN, TEXT);
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, INET, TEXT, BOOLEAN);
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, BOOLEAN);

-- 2. Criar função add_authorized_email CORRIGIDA
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
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO email_id;
  
  RETURN email_id;
END;
$$;

-- 3. Criar função log_access_attempt CORRIGIDA
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

-- 4. Verificar se as funções foram criadas
SELECT 'Funções criadas com sucesso!' as status;

-- 5. Testar função add_authorized_email
SELECT 'Testando add_authorized_email...' as status;
SELECT public.add_authorized_email('teste@correcao.com', NULL, 'Teste de correção') as resultado;

-- 6. Testar função log_access_attempt
SELECT 'Testando log_access_attempt...' as status;
SELECT public.log_access_attempt('teste@correcao.com', true, NULL, 'Teste', 'Teste de correção') as resultado;

-- 7. Limpar dados de teste
DELETE FROM public.authorized_emails WHERE email = 'teste@correcao.com';
DELETE FROM public.access_attempts WHERE email = 'teste@correcao.com';

-- 8. Verificar e-mails autorizados
SELECT 'E-mails autorizados:' as status;
SELECT email, domain, is_active, notes 
FROM public.authorized_emails 
ORDER BY added_at DESC; 