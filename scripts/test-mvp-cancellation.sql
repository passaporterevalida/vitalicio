-- 🎯 MVP TEST - Sistema de Cancelamento
-- Execute este script no Supabase SQL Editor para verificar o MVP

-- 1. VERIFICAR DADOS DO USUÁRIO (CRÍTICO)
SELECT 
    'DADOS DO USUÁRIO' as teste,
    id,
    user_id,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 2. VERIFICAR CONFIGURAÇÃO DA TABELA
SELECT 
    'CONFIGURAÇÃO DA TABELA' as teste,
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE tablename = 'subscribers';

-- 3. VERIFICAR POLÍTICAS RLS
SELECT 
    'POLÍTICAS RLS' as teste,
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'subscribers';

-- 4. VERIFICAR AUTENTICAÇÃO DO USUÁRIO
SELECT 
    'AUTENTICAÇÃO' as teste,
    id,
    email,
    created_at,
    last_sign_in_at,
    confirmed_at,
    email_confirmed_at
FROM auth.users 
WHERE email = 'scalperline@gmail.com';

-- 5. VERIFICAR SESSÕES ATIVAS
SELECT 
    'SESSÕES ATIVAS' as teste,
    user_id,
    created_at,
    not_after,
    refreshed_at
FROM auth.sessions 
WHERE user_id = 'a5862376-8c44-4953-b730-90fabae838e1'
ORDER BY created_at DESC
LIMIT 3;

-- 6. VERIFICAR HISTÓRICO DE ASSINATURA
SELECT 
    'HISTÓRICO' as teste,
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    created_at
FROM subscription_history 
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC
LIMIT 5;

-- 7. VERIFICAR LIMITES DE USO
SELECT 
    'LIMITES DE USO' as teste,
    user_id,
    daily_questions_used,
    monthly_simulados_used,
    last_reset_date,
    created_at,
    updated_at
FROM usage_limits 
WHERE user_id = 'a5862376-8c44-4953-b730-90fabae838e1';

-- 8. TESTE DE PERMISSÕES (SIMULAR ACESSO)
-- Este teste simula o que a função customer-portal faria
SELECT 
    'TESTE DE PERMISSÕES' as teste,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ ACESSO PERMITIDO'
        ELSE '❌ ACESSO NEGADO'
    END as resultado,
    COUNT(*) as registros_encontrados
FROM subscribers 
WHERE email = 'scalperline@gmail.com' 
  AND stripe_customer_id IS NOT NULL 
  AND stripe_customer_id != '';

-- 9. VERIFICAR INTEGRIDADE DOS DADOS
SELECT 
    'INTEGRIDADE DOS DADOS' as teste,
    CASE 
        WHEN stripe_customer_id IS NULL THEN '❌ CUSTOMER_ID NULO'
        WHEN stripe_customer_id = '' THEN '❌ CUSTOMER_ID VAZIO'
        WHEN stripe_customer_id NOT LIKE 'cus_%' THEN '❌ CUSTOMER_ID INVÁLIDO'
        WHEN subscribed = false THEN '⚠️ NÃO ASSINADO'
        WHEN subscription_tier IS NULL THEN '⚠️ TIER NULO'
        ELSE '✅ DADOS VÁLIDOS'
    END as status,
    stripe_customer_id,
    subscribed,
    subscription_tier
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 10. RESUMO EXECUTIVO
SELECT 
    'RESUMO MVP' as teste,
    'Para o MVP funcionar, todos os testes acima devem passar:' as instrucao,
    '1. Dados do usuário devem existir' as requisito1,
    '2. Customer ID deve ser válido (cus_...)' as requisito2,
    '3. Usuário deve estar assinado' as requisito3,
    '4. RLS deve permitir acesso' as requisito4,
    '5. Autenticação deve estar válida' as requisito5; 