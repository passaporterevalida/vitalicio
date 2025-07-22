-- Script simples para testar dados do customer portal
-- Execute este script no Supabase SQL Editor

-- 1. Verificar dados básicos do usuário
SELECT 
    id,
    user_id,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 2. Verificar se há registros duplicados
SELECT 
    COUNT(*) as total_registros
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 3. Verificar estrutura da tabela subscribers
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'subscribers'
ORDER BY ordinal_position;

-- 4. Verificar se há RLS ativo
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'subscribers';

-- 5. Verificar se há triggers
SELECT 
    trigger_name,
    event_manipulation,
    action_timing
FROM information_schema.triggers
WHERE event_object_table = 'subscribers'; 