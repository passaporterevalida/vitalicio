-- Script FINAL para corrigir todas as funções SQL
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- CORREÇÃO FINAL DAS FUNÇÕES SQL
-- =====================================================

-- 1. Remover funções existentes com problemas
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, BOOLEAN, INET, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, INET, TEXT, BOOLEAN, TEXT);
DROP FUNCTION IF EXISTS public.log_access_attempt(TEXT, BOOLEAN);

DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.add_authorized_email(TEXT);

DROP FUNCTION IF EXISTS public.is_email_authorized(TEXT);

-- 2. Criar função is_email_authorized CORRETA
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

-- 3. Criar função add_authorized_email CORRETA
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

-- 4. Criar função remove_authorized_email
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

-- 5. Criar função log_access_attempt CORRETA
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

-- 6. Verificar se as funções foram criadas
SELECT 'Funções criadas:' as status;
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('is_email_authorized', 'add_authorized_email', 'remove_authorized_email', 'log_access_attempt')
ORDER BY routine_name;

-- 7. Testar função is_email_authorized
SELECT 'Teste is_email_authorized:' as status;
SELECT 
  'maresiatragind@gmail.com' as email,
  public.is_email_authorized('maresiatragind@gmail.com') as autorizado;

SELECT 
  'medico@hospital.com' as email,
  public.is_email_authorized('medico@hospital.com') as autorizado;

SELECT 
  'teste@naoautorizado.com' as email,
  public.is_email_authorized('teste@naoautorizado.com') as autorizado;

-- 8. Testar função log_access_attempt
SELECT 'Teste log_access_attempt:' as status;
SELECT public.log_access_attempt(
  'teste@correcao.com', 
  true, 
  NULL, 
  'Teste via SQL', 
  'Teste de correção final'
) as log_id;

-- 9. Verificar log criado
SELECT 'Log criado:' as status;
SELECT email, was_authorized, notes, attempted_at 
FROM public.access_attempts 
WHERE email = 'teste@correcao.com'
ORDER BY attempted_at DESC;

-- 10. Limpar dados de teste
DELETE FROM public.access_attempts WHERE email = 'teste@correcao.com';

-- 11. Resultado final
SELECT 'Sistema corrigido com sucesso!' as status;
SELECT COUNT(*) as total_emails FROM public.authorized_emails;
SELECT COUNT(*) as total_attempts FROM public.access_attempts; 