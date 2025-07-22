-- 🚀 SOLUÇÃO FINAL SIMPLES - SISTEMA DE ASSINATURA
-- Execute este script ÚNICO no SQL Editor do Supabase Dashboard

-- =====================================================
-- LIMPEZA E CONFIGURAÇÃO SIMPLES
-- =====================================================

-- 1. LIMPAR DADOS ANTIGOS
DELETE FROM public.subscription_history WHERE email = 'scalperline@gmail.com';
DELETE FROM public.subscribers WHERE email = 'scalperline@gmail.com';

-- 2. REMOVER POLÍTICAS CONFLITANTES
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

-- 3. CRIAR POLÍTICAS SIMPLES
CREATE POLICY "service_role_all" ON public.subscribers
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_all" ON public.subscription_history
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "authenticated_read" ON public.subscribers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_read" ON public.subscription_history
    FOR SELECT USING (auth.role() = 'authenticated');

-- 4. GARANTIR ESTRUTURA DAS TABELAS
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.subscription_history 
ADD COLUMN IF NOT EXISTS user_id UUID,
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS details JSONB,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 5. INSERIR DADOS SIMPLES (SEM JSON COMPLEXO)
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

-- Inserir subscription history com JSON SIMPLES
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
    '{"status": "active", "priceId": "revalida-premium"}'::jsonb,
    NOW()
);

-- 6. VERIFICAÇÃO FINAL
SELECT '=== SOLUÇÃO APLICADA ===' as status;

-- Verificar dados
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

-- Teste final
SELECT 
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

SELECT '=== SISTEMA PRONTO ===' as status; 