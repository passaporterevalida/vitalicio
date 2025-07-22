-- Script para debugar problemas com customer portal
-- Execute este script no Supabase SQL Editor

-- 1. Verificar se o usuário existe na tabela subscribers
SELECT 
    email,
    user_id,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    created_at,
    updated_at
FROM subscribers 
WHERE email = 'gabriel@example.com'  -- Substitua pelo email do usuário
ORDER BY created_at DESC;

-- 2. Verificar se há registros duplicados
SELECT 
    email,
    COUNT(*) as count,
    STRING_AGG(stripe_customer_id, ', ') as customer_ids
FROM subscribers 
GROUP BY email 
HAVING COUNT(*) > 1;

-- 3. Verificar registros sem stripe_customer_id
SELECT 
    email,
    user_id,
    stripe_customer_id,
    subscribed
FROM subscribers 
WHERE stripe_customer_id IS NULL OR stripe_customer_id = '';

-- 4. Verificar estrutura da tabela subscribers
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'subscribers'
ORDER BY ordinal_position;

-- 5. Verificar se há problemas com o user_id
SELECT 
    email,
    user_id,
    stripe_customer_id,
    CASE 
        WHEN user_id IS NULL THEN 'user_id é NULL'
        WHEN user_id = '' THEN 'user_id está vazio'
        ELSE 'user_id OK'
    END as user_id_status
FROM subscribers 
WHERE email = 'gabriel@example.com';  -- Substitua pelo email do usuário

-- 6. Verificar histórico de assinaturas
SELECT 
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id
FROM subscription_history
WHERE email = 'gabriel@example.com'  -- Substitua pelo email do usuário
ORDER BY user_id DESC
LIMIT 10;

-- 7. Verificar se há problemas de permissão
-- (Execute como superuser se necessário)
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename = 'subscribers';

-- 8. Verificar índices
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'subscribers'; 