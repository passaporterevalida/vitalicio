-- 🚀 SCRIPT DE CORREÇÃO DE INFRAESTRUTURA - SISTEMA DE ASSINATURA
-- Execute este script no SQL Editor do Supabase Dashboard APÓS executar o script de validação

-- =====================================================
-- FASE 2: CORREÇÃO DE INFRAESTRUTURA
-- =====================================================

-- 2.1 CORRIGIR RLS POLICIES
-- =====================================================

-- Remover políticas conflitantes existentes
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.subscribers;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.subscribers;
DROP POLICY IF EXISTS "Enable read for users based on email" ON public.subscribers;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.subscribers;

-- Remover políticas conflitantes do subscription_history
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable read for users based on email" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.subscription_history;

-- Remover políticas conflitantes do usage_limits
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.usage_limits;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.usage_limits;
DROP POLICY IF EXISTS "Enable read for users based on email" ON public.usage_limits;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.usage_limits;

-- Criar políticas corretas para service role
CREATE POLICY "Enable all operations for service role" ON public.subscribers
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Enable all operations for service role" ON public.subscription_history
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Enable all operations for service role" ON public.usage_limits
    FOR ALL USING (auth.role() = 'service_role');

-- Criar políticas para usuários autenticados (leitura)
CREATE POLICY "Enable read for authenticated users" ON public.subscribers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read for authenticated users" ON public.subscription_history
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read for authenticated users" ON public.usage_limits
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- 2.2 VERIFICAR E CORRIGIR FOREIGN KEYS
-- =====================================================

-- Verificar se a foreign key problemática existe e removê-la
DO $$
BEGIN
    -- Verificar se existe a foreign key problemática
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'usage_limits_user_id_fkey' 
        AND table_name = 'usage_limits'
    ) THEN
        -- Remover a foreign key problemática
        ALTER TABLE public.usage_limits DROP CONSTRAINT IF EXISTS usage_limits_user_id_fkey;
        RAISE NOTICE 'Foreign key usage_limits_user_id_fkey removida';
    ELSE
        RAISE NOTICE 'Foreign key usage_limits_user_id_fkey não existe';
    END IF;
END $$;

-- =====================================================
-- 2.3 GARANTIR ESTRUTURA CORRETA DAS TABELAS
-- =====================================================

-- Garantir que a tabela subscribers tenha as colunas necessárias
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Garantir que a tabela subscription_history tenha as colunas necessárias
ALTER TABLE public.subscription_history 
ADD COLUMN IF NOT EXISTS user_id UUID,
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS details JSONB,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Garantir que a tabela usage_limits tenha as colunas necessárias
ALTER TABLE public.usage_limits 
ADD COLUMN IF NOT EXISTS user_id UUID,
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS questions_answered INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS questions_limit INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS reset_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =====================================================
-- 2.4 CRIAR ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_customer_id ON public.subscribers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscription_history_email ON public.subscription_history(email);
CREATE INDEX IF NOT EXISTS idx_subscription_history_stripe_subscription_id ON public.subscription_history(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_usage_limits_email ON public.usage_limits(email);
CREATE INDEX IF NOT EXISTS idx_usage_limits_user_id ON public.usage_limits(user_id);

-- =====================================================
-- 2.5 VERIFICAÇÃO FINAL
-- =====================================================

-- Verificar se as correções foram aplicadas
SELECT '=== VERIFICAÇÃO APÓS CORREÇÕES ===' as status;

-- Verificar RLS policies
SELECT 
    'RLS Policies Corrigidas' as tipo,
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE tablename IN ('subscribers', 'subscription_history', 'usage_limits')
ORDER BY tablename, policyname;

-- Verificar foreign keys
SELECT 
    'Foreign Keys Corrigidas' as tipo,
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name IN ('subscribers', 'subscription_history', 'usage_limits');

-- Verificar índices
SELECT 
    'Índices Criados' as tipo,
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('subscribers', 'subscription_history', 'usage_limits')
    AND schemaname = 'public'
ORDER BY tablename, indexname;

-- =====================================================
-- RESULTADO FINAL
-- =====================================================

SELECT '=== CORREÇÕES CONCLUÍDAS ===' as status;
SELECT 
    'Próximo passo: Testar webhook e validar funcionamento' as acao; 