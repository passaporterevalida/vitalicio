-- Script para corrigir as funções SQL com erro de parâmetros
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- CORREÇÃO DAS FUNÇÕES SQL
-- =====================================================

-- 1. Corrigir função add_authorized_email
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT, TEXT);
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

-- 2. Corrigir função log_access_attempt
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, INET, TEXT, BOOLEAN, TEXT);
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

-- 3. Verificar se as funções foram corrigidas
SELECT 'Funções corrigidas:' as status;
SELECT routine_name, routine_definition 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('add_authorized_email', 'log_access_attempt');

-- 4. Testar as funções corrigidas
SELECT 'Teste add_authorized_email:' as status;
SELECT public.add_authorized_email('teste@correcao.com', NULL, 'Teste de correção') as resultado;

SELECT 'Teste log_access_attempt:' as status;
SELECT public.log_access_attempt('teste@correcao.com', NULL, 'Teste', true, 'Teste de correção') as resultado;

-- 5. Limpar dados de teste
DELETE FROM public.authorized_emails WHERE email = 'teste@correcao.com';
DELETE FROM public.access_attempts WHERE email = 'teste@correcao.com';

-- 6. Verificar e-mails autorizados atuais
SELECT 'E-mails autorizados atuais:' as status;
SELECT email, domain, is_active, notes, added_at 
FROM public.authorized_emails 
ORDER BY added_at DESC; 