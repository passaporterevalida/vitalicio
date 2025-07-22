-- Script para verificar e corrigir dados de assinatura
-- Execute este script no Supabase SQL Editor

-- 1. Verificar estrutura da tabela subscribers
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'subscribers'
ORDER BY ordinal_position;

-- 2. Verificar dados de assinatura
SELECT 
    email,
    user_id,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    cancelled_at,
    created_at,
    updated_at
FROM subscribers
ORDER BY created_at DESC
LIMIT 10;

-- 3. Verificar se há registros sem stripe_customer_id
SELECT 
    email,
    user_id,
    stripe_customer_id,
    subscribed
FROM subscribers 
WHERE stripe_customer_id IS NULL OR stripe_customer_id = '';

-- 4. Verificar se há registros duplicados
SELECT 
    email,
    COUNT(*) as count
FROM subscribers 
GROUP BY email 
HAVING COUNT(*) > 1;

-- 5. Verificar histórico de assinaturas
SELECT 
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    created_at
FROM subscription_history
ORDER BY created_at DESC
LIMIT 10;

-- 6. Verificar se há assinaturas ativas no Stripe que não estão no banco
-- (Este seria executado via API do Stripe)

-- 7. Criar índice para melhorar performance (se não existir)
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_customer_id ON subscribers(stripe_customer_id);

-- 8. Verificar constraints da tabela
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name = 'subscribers'; 