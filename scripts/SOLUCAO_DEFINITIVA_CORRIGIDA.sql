-- 🚀 SOLUÇÃO DEFINITIVA CORRIGIDA - SISTEMA DE ASSINATURA
-- Execute este script ÚNICO no SQL Editor do Supabase Dashboard

-- =====================================================
-- LIMPEZA COMPLETA E RECONSTRUÇÃO (ESTRUTURA REAL)
-- =====================================================

-- 1. LIMPAR DADOS PROBLEMÁTICOS (ESTRUTURA REAL)
DELETE FROM public.subscription_history WHERE email = 'scalperline@gmail.com';
DELETE FROM public.subscribers WHERE email = 'scalperline@gmail.com';

-- 2. REMOVER TODAS AS POLÍTICAS CONFLITANTES
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.subscribers;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.subscribers;
DROP POLICY IF EXISTS "Enable read for users based on email" ON public.subscribers;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.subscribers;
DROP POLICY IF EXISTS "Enable all operations for service role" ON public.subscribers;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.subscribers;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable read for users based on email" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable all operations for service role" ON public.subscription_history;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.subscription_history;

-- 3. RECRIAR ESTRUTURA DAS TABELAS CORRETAMENTE
-- =====================================================

-- Garantir estrutura correta da tabela subscribers
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Garantir estrutura correta da tabela subscription_history
ALTER TABLE public.subscription_history 
ADD COLUMN IF NOT EXISTS user_id UUID,
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS details JSONB,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 4. CRIAR POLÍTICAS CORRETAS
-- =====================================================

-- Políticas para service role (webhook)
CREATE POLICY "service_role_all" ON public.subscribers
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_all" ON public.subscription_history
    FOR ALL USING (auth.role() = 'service_role');

-- Políticas para usuários autenticados (leitura)
CREATE POLICY "authenticated_read" ON public.subscribers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_read" ON public.subscription_history
    FOR SELECT USING (auth.role() = 'authenticated');

-- 5. CRIAR ÍNDICES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscription_history_email ON public.subscription_history(email);

-- 6. INSERIR DADOS CORRETAMENTE
-- =====================================================

-- Inserir subscriber
INSERT INTO public.subscribers (
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
) VALUES (
    'scalperline@gmail.com',
    'cus_ShrB4v0DLU7t1z',
    true,
    'Premium',
    (NOW() + INTERVAL '30 days'),
    NOW()
);

-- Inserir subscription history (JSON CORRETO)
INSERT INTO public.subscription_history (
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at
) VALUES (
    NULL,
    'scalperline@gmail.com',
    'created',
    'Premium',
    'sub_1RmRT7DQW6oxXGkUaihZ79Gh',
    '{"status": "active", "priceId": "revalida-premium", "subscriptionEnd": "' || (NOW() + INTERVAL '30 days')::text || '"}'::jsonb,
    NOW()
);

-- 7. VERIFICAÇÃO FINAL
-- =====================================================

SELECT '=== SOLUÇÃO DEFINITIVA APLICADA ===' as status;

-- Verificar dados inseridos
SELECT 
    'subscribers' as tabela,
    email,
    subscribed,
    subscription_tier,
    stripe_customer_id
FROM public.subscribers 
WHERE email = 'scalperline@gmail.com';

SELECT 
    'subscription_history' as tabela,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id
FROM public.subscription_history 
WHERE email = 'scalperline@gmail.com';

-- Verificar estrutura real da tabela usage_limits
SELECT 
    'usage_limits structure' as tipo,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'usage_limits' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verificar políticas
SELECT 
    'Políticas Criadas' as tipo,
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename IN ('subscribers', 'subscription_history')
ORDER BY tablename, policyname;

-- Teste final
SELECT 
    'TESTE FINAL' as tipo,
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.subscribers WHERE email = 'scalperline@gmail.com' AND subscribed = true) 
        THEN '✅ SUBSCRIBERS: OK'
        ELSE '❌ SUBSCRIBERS: FALHOU'
    END as resultado;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.subscription_history WHERE email = 'scalperline@gmail.com') 
        THEN '✅ HISTORY: OK'
        ELSE '❌ HISTORY: FALHOU'
    END as resultado;

SELECT '=== SISTEMA PRONTO PARA TESTE ===' as status;
SELECT 'Agora teste o webhook e frontend!' as proximo_passo; 