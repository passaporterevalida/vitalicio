-- Script para corrigir problemas na tabela usage_limits
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Verificar se a tabela usage_limits existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'usage_limits'
) as table_exists;

-- 2. Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'usage_limits' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Verificar RLS policies atuais
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'usage_limits';

-- 4. Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "select_own_usage" ON public.usage_limits;
DROP POLICY IF EXISTS "update_own_usage" ON public.usage_limits;
DROP POLICY IF EXISTS "insert_usage" ON public.usage_limits;

-- 5. Recriar políticas corretas
CREATE POLICY "select_own_usage" ON public.usage_limits
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "update_own_usage" ON public.usage_limits
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "insert_usage" ON public.usage_limits
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- 6. Verificar se a coluna monthly_simulados_used existe, se não, adicionar
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'usage_limits' 
    AND column_name = 'monthly_simulados_used'
    AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.usage_limits ADD COLUMN monthly_simulados_used INTEGER DEFAULT 0;
    RAISE NOTICE 'Coluna monthly_simulados_used adicionada';
  ELSE
    RAISE NOTICE 'Coluna monthly_simulados_used já existe';
  END IF;
END $$;

-- 7. Verificar se RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usage_limits';

-- 8. Habilitar RLS se não estiver
ALTER TABLE public.usage_limits ENABLE ROW LEVEL SECURITY;

-- 9. Verificar políticas finais
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'usage_limits'; 