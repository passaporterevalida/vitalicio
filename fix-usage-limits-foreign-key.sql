-- CORREÇÃO DEFINITIVA: Remover e recriar a foreign key da tabela usage_limits
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Remover a foreign key problemática (se existir)
ALTER TABLE public.usage_limits 
DROP CONSTRAINT IF EXISTS usage_limits_user_id_fkey;

-- 2. Recriar a foreign key correta para auth.users
ALTER TABLE public.usage_limits 
ADD CONSTRAINT usage_limits_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Verificar se a foreign key foi criada corretamente
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

-- 4. Testar inserção com o user_id correto
INSERT INTO public.usage_limits (
  user_id, 
  daily_questions_used, 
  monthly_simulados_used, 
  last_reset_date
) VALUES (
  '73f1ed16-16c2-452a-b001-630d969da835', 
  0, 
  0, 
  CURRENT_DATE
) ON CONFLICT (user_id) DO NOTHING;

-- 5. Verificar se a inserção funcionou
SELECT 
  id,
  user_id,
  daily_questions_used,
  monthly_simulados_used,
  created_at
FROM public.usage_limits 
WHERE user_id = '73f1ed16-16c2-452a-b001-630d969da835'; 