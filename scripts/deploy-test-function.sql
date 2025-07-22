-- Script para verificar configuração e permissões
-- Execute este script no Supabase SQL Editor

-- 1. Verificar se o usuário tem permissão para acessar a tabela subscribers
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE tablename = 'subscribers';

-- 2. Verificar se há RLS (Row Level Security) ativo na tabela
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'subscribers';

-- 3. Verificar se há triggers que podem estar interferindo
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing
FROM information_schema.triggers
WHERE event_object_table = 'subscribers';

-- 4. Verificar se há constraints que podem estar causando problemas
SELECT 
    constraint_name,
    constraint_type,
    table_name,
    column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'subscribers';

-- 5. Verificar se há problemas de conectividade com a função
-- (Este seria verificado via logs da função)

-- 6. Verificar se há problemas de autenticação
SELECT 
    id,
    email,
    created_at,
    last_sign_in_at,
    confirmed_at,
    email_confirmed_at
FROM auth.users 
WHERE email = 'scalperline@gmail.com';

-- 7. Verificar se há problemas de sessão
SELECT 
    user_id,
    created_at,
    not_after,
    refreshed_at
FROM auth.sessions 
WHERE user_id = 'a5862376-8c44-4953-b730-90fabae838e1'
ORDER BY created_at DESC
LIMIT 5; 