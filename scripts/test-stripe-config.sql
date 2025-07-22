-- Script para testar configuração do Stripe e verificar dados completos
-- Execute este script no Supabase SQL Editor

-- 1. Verificar dados completos do usuário
SELECT 
    id,
    user_id,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at,
    CASE 
        WHEN stripe_customer_id IS NULL THEN 'PROBLEMA: Sem customer ID'
        WHEN stripe_customer_id = '' THEN 'PROBLEMA: Customer ID vazio'
        WHEN LENGTH(stripe_customer_id) < 10 THEN 'PROBLEMA: Customer ID muito curto'
        WHEN subscribed IS NULL THEN 'PROBLEMA: Status de assinatura não definido'
        WHEN subscribed = false THEN 'ATENÇÃO: Usuário não está inscrito'
        ELSE 'DADOS OK - Usuário inscrito'
    END as status_completo
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 2. Verificar se há assinaturas ativas no Stripe (via webhook events)
SELECT 
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details
FROM subscription_history
WHERE email = 'scalperline@gmail.com'
ORDER BY user_id DESC
LIMIT 5;

-- 3. Verificar se há eventos de assinatura recentes
SELECT 
    user_id,
    email,
    event_type,
    created_at
FROM subscription_events
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC
LIMIT 5;

-- 4. Verificar se há problemas de permissão na função
SELECT 
    function_name,
    function_schema,
    function_owner
FROM information_schema.routines
WHERE routine_name LIKE '%customer%' OR routine_name LIKE '%portal%';

-- 5. Verificar se há triggers que podem estar interferindo
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing
FROM information_schema.triggers
WHERE event_object_table = 'subscribers';

-- 6. Verificar se há RLS (Row Level Security) ativo
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'subscribers';

-- 7. Verificar se há problemas de conectividade com Stripe
-- (Este seria verificado via logs da função)

-- 8. Verificar se há dados inconsistentes
SELECT 
    COUNT(*) as total_registros,
    COUNT(DISTINCT stripe_customer_id) as customer_ids_unicos,
    COUNT(DISTINCT user_id) as user_ids_unicos,
    STRING_AGG(stripe_customer_id, ', ') as todos_customer_ids
FROM subscribers 
WHERE email = 'scalperline@gmail.com'; 