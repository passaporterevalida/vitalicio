-- Script para verificar dados específicos do usuário
-- Execute este script no Supabase SQL Editor

-- 1. Verificar estrutura da tabela subscribers
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'subscribers'
ORDER BY ordinal_position;

-- 2. Verificar dados do usuário específico (substitua pelo email correto)
SELECT 
    id,
    user_id,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
FROM subscribers 
WHERE email = 'scalperline@gmail.com'  -- Email do usuário que está com problema
ORDER BY updated_at DESC;

-- 3. Verificar se há registros duplicados para este email
SELECT 
    email,
    COUNT(*) as count,
    STRING_AGG(stripe_customer_id, ', ') as customer_ids,
    STRING_AGG(user_id::text, ', ') as user_ids
FROM subscribers 
WHERE email = 'scalperline@gmail.com'
GROUP BY email;

-- 4. Verificar estrutura da tabela subscription_history
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'subscription_history'
ORDER BY ordinal_position;

-- 5. Verificar histórico para este usuário
SELECT 
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id
FROM subscription_history
WHERE email = 'scalperline@gmail.com'
ORDER BY user_id DESC
LIMIT 10;

-- 6. Verificar se o user_id existe na tabela auth.users
SELECT 
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'scalperline@gmail.com';

-- 7. Verificar se há problemas com o stripe_customer_id
SELECT 
    email,
    user_id,
    stripe_customer_id,
    CASE 
        WHEN stripe_customer_id IS NULL THEN 'stripe_customer_id é NULL'
        WHEN stripe_customer_id = '' THEN 'stripe_customer_id está vazio'
        WHEN LENGTH(stripe_customer_id) < 10 THEN 'stripe_customer_id muito curto'
        ELSE 'stripe_customer_id parece válido'
    END as customer_id_status
FROM subscribers 
WHERE email = 'scalperline@gmail.com'; 