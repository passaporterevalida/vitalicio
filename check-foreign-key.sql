-- Verificar a estrutura da foreign key da tabela usage_limits
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Verificar se existe uma tabela 'users' (não auth.users)
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'users'
) as public_users_table_exists;

-- 2. Verificar todas as foreign keys da tabela usage_limits
SELECT 
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'usage_limits';

-- 3. Verificar se a foreign key está correta (deveria referenciar auth.users)
-- Se estiver referenciando 'users' em vez de 'auth.users', vamos corrigir

-- 4. Verificar o user_id atual do usuário logado
-- Substitua 'gabrielbzerra1998@gmail.com' pelo email correto
SELECT 
  id,
  email,
  created_at
FROM auth.users 
WHERE email = 'gabrielbzerra1998@gmail.com';

-- 5. Verificar se existe algum registro na tabela usage_limits
SELECT 
  id,
  user_id,
  daily_questions_used,
  monthly_simulados_used,
  created_at
FROM public.usage_limits 
LIMIT 5; 