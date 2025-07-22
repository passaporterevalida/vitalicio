-- Corrigir RLS policies para usage_limits
-- Remover políticas antigas
DROP POLICY IF EXISTS "select_own_usage" ON public.usage_limits;
DROP POLICY IF EXISTS "update_own_usage" ON public.usage_limits;
DROP POLICY IF EXISTS "insert_usage" ON public.usage_limits;

-- Recriar políticas corretas
CREATE POLICY "select_own_usage" ON public.usage_limits
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "update_own_usage" ON public.usage_limits
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "insert_usage" ON public.usage_limits
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Verificar se a tabela usage_limits existe e tem a estrutura correta
DO $$
BEGIN
  -- Verificar se a coluna monthly_simulados_used existe
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'usage_limits' 
    AND column_name = 'monthly_simulados_used'
    AND table_schema = 'public'
  ) THEN
    -- Adicionar a coluna se não existir
    ALTER TABLE public.usage_limits ADD COLUMN monthly_simulados_used INTEGER DEFAULT 0;
  END IF;
END $$; 