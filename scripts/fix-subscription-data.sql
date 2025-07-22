-- Script para corrigir problemas nos dados de assinatura
-- Execute este script no Supabase SQL Editor

-- 1. Verificar e corrigir registros sem stripe_customer_id
UPDATE subscribers 
SET stripe_customer_id = NULL 
WHERE stripe_customer_id = '';

-- 2. Verificar e corrigir registros sem user_id
UPDATE subscribers 
SET user_id = NULL 
WHERE user_id = '';

-- 3. Verificar se há registros duplicados e manter apenas o mais recente
WITH ranked_subscribers AS (
  SELECT 
    *,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY updated_at DESC) as rn
  FROM subscribers
)
DELETE FROM subscribers 
WHERE id IN (
  SELECT id FROM ranked_subscribers WHERE rn > 1
);

-- 4. Verificar se o usuário específico tem dados corretos
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
        WHEN stripe_customer_id IS NULL OR stripe_customer_id = '' THEN 'PROBLEMA: Sem customer ID'
        WHEN user_id IS NULL OR user_id = '' THEN 'PROBLEMA: Sem user ID'
        WHEN subscribed IS NULL THEN 'PROBLEMA: Status de assinatura não definido'
        ELSE 'DADOS OK'
    END as status
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 5. Verificar se há problemas de permissão na tabela
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE tablename = 'subscribers';

-- 6. Criar índices se não existirem (para melhorar performance)
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_customer_id ON subscribers(stripe_customer_id);

-- 7. Verificar se há constraints que podem estar causando problemas
SELECT 
    constraint_name,
    constraint_type,
    table_name,
    column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'subscribers';

-- 8. Verificar se há triggers que podem estar interferindo
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'subscribers'; 