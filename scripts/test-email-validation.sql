-- Script para testar a validação de e-mail
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- TESTE DE VALIDAÇÃO DE E-MAIL
-- =====================================================

-- 1. Verificar e-mails autorizados na tabela
SELECT 'E-mails autorizados:' as status;
SELECT email, domain, is_active, notes 
FROM public.authorized_emails 
ORDER BY added_at DESC;

-- 2. Testar função is_email_authorized com e-mails específicos
SELECT 'Teste de validação:' as status;

-- Teste com e-mail que está na tabela
SELECT 
  'maresiatragind@gmail.com' as email,
  public.is_email_authorized('maresiatragind@gmail.com') as autorizado;

-- Teste com e-mail de domínio autorizado
SELECT 
  'medico@hospital.com' as email,
  public.is_email_authorized('medico@hospital.com') as autorizado;

-- Teste com e-mail não autorizado
SELECT 
  'teste@naoautorizado.com' as email,
  public.is_email_authorized('teste@naoautorizado.com') as autorizado;

-- 3. Verificar se a função existe e está funcionando
SELECT 'Verificando função:' as status;
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'is_email_authorized' AND routine_schema = 'public';

-- 4. Testar inserção de log
SELECT 'Testando log de acesso:' as status;
SELECT public.log_access_attempt(
  'teste@validacao.com', 
  true, 
  NULL, 
  'Teste via SQL', 
  'Teste de validação manual'
) as log_id;

-- 5. Verificar logs de acesso
SELECT 'Logs de acesso:' as status;
SELECT email, was_authorized, notes, attempted_at 
FROM public.access_attempts 
ORDER BY attempted_at DESC 
LIMIT 5;

-- 6. Limpar dados de teste
DELETE FROM public.access_attempts WHERE email = 'teste@validacao.com';

-- 7. Resultado final
SELECT 'Teste concluído!' as status; 