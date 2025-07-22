-- Script para corrigir a estrutura da tabela authorized_emails
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- CORREÇÃO DA ESTRUTURA DA TABELA
-- =====================================================

-- 1. Verificar estrutura atual
SELECT 'Estrutura atual da tabela:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'authorized_emails' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Remover constraint problemática
ALTER TABLE public.authorized_emails DROP CONSTRAINT IF EXISTS check_email_or_domain;

-- 3. Permitir NULL no campo email
ALTER TABLE public.authorized_emails ALTER COLUMN email DROP NOT NULL;

-- 4. Adicionar constraint correta
ALTER TABLE public.authorized_emails ADD CONSTRAINT check_email_or_domain 
CHECK (email IS NOT NULL OR domain IS NOT NULL);

-- 5. Verificar se a correção funcionou
SELECT 'Estrutura corrigida:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'authorized_emails' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Testar inserção de domínio
SELECT 'Testando inserção de domínio...' as status;
INSERT INTO public.authorized_emails (domain, notes) VALUES 
  ('teste.com', 'Domínio de teste')
ON CONFLICT DO NOTHING;

-- 7. Testar inserção de email
SELECT 'Testando inserção de email...' as status;
INSERT INTO public.authorized_emails (email, notes) VALUES 
  ('teste@email.com', 'Email de teste')
ON CONFLICT (email) DO NOTHING;

-- 8. Verificar dados inseridos
SELECT 'Dados na tabela:' as status;
SELECT id, email, domain, is_active, notes, added_at 
FROM public.authorized_emails 
ORDER BY added_at DESC;

-- 9. Limpar dados de teste
DELETE FROM public.authorized_emails WHERE domain = 'teste.com';
DELETE FROM public.authorized_emails WHERE email = 'teste@email.com';

-- 10. Inserir domínios autorizados corretamente
SELECT 'Inserindo domínios autorizados...' as status;
INSERT INTO public.authorized_emails (domain, notes) VALUES 
  ('hospital.com', 'Domínio autorizado para hospitais'),
  ('universidade.edu.br', 'Domínio autorizado para universidades'),
  ('usp.br', 'Universidade de São Paulo'),
  ('unifesp.edu.br', 'Universidade Federal de São Paulo')
ON CONFLICT DO NOTHING;

-- 11. Verificar resultado final
SELECT 'Sistema corrigido com sucesso!' as status;
SELECT 
  COUNT(*) as total_registros,
  COUNT(CASE WHEN email IS NOT NULL THEN 1 END) as emails_especificos,
  COUNT(CASE WHEN domain IS NOT NULL THEN 1 END) as dominios_autorizados
FROM public.authorized_emails;

-- 12. Testar função de validação
SELECT 'Teste de validação:' as status;
SELECT 
  'medico@hospital.com' as email,
  public.is_email_authorized('medico@hospital.com') as autorizado;

SELECT 
  'aluno@usp.br' as email,
  public.is_email_authorized('aluno@usp.br') as autorizado;

SELECT 
  'usuario@naoautorizado.com' as email,
  public.is_email_authorized('usuario@naoautorizado.com') as autorizado; 