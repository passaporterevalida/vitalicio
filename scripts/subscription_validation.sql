-- 🚀 SCRIPT DE VALIDAÇÃO E LIMPEZA - SISTEMA DE ASSINATURA
-- Execute este script no SQL Editor do Supabase Dashboard

-- =====================================================
-- FASE 1: VALIDAÇÃO E LIMPEZA
-- =====================================================

-- 1.1 Verificar configuração atual
SELECT '=== VERIFICAÇÃO ATUAL ===' as status;

-- Verificar dados do usuário problemático
SELECT 
    'subscribers' as tabela,
    COUNT(*) as total_registros,
    MAX(CASE WHEN email = 'scalperline@gmail.com' THEN 'EXISTE' ELSE 'NÃO EXISTE' END) as usuario_problematico
FROM public.subscribers 
WHERE email = 'scalperline@gmail.com';

SELECT 
    'subscription_history' as tabela,
    COUNT(*) as total_registros,
    MAX(CASE WHEN email = 'scalperline@gmail.com' THEN 'EXISTE' ELSE 'NÃO EXISTE' END) as usuario_problematico
FROM public.subscription_history 
WHERE email = 'scalperline@gmail.com';

-- Verificar RLS policies atuais
SELECT 
    'RLS Policies' as tipo,
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE tablename IN ('subscribers', 'subscription_history', 'usage_limits')
ORDER BY tablename, policyname;

-- Verificar foreign keys
SELECT 
    'Foreign Keys' as tipo,
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name IN ('subscribers', 'subscription_history', 'usage_limits');

-- =====================================================
-- 1.2 LIMPEZA DE DADOS INCONSISTENTES
-- =====================================================

-- ATENÇÃO: Execute apenas se necessário
-- Descomente as linhas abaixo para limpar dados antigos

/*
-- Limpar dados antigos que podem causar conflitos
DELETE FROM public.subscription_history WHERE email = 'scalperline@gmail.com';
DELETE FROM public.subscribers WHERE email = 'scalperline@gmail.com';

-- Verificar se foi limpo
SELECT '=== APÓS LIMPEZA ===' as status;
SELECT COUNT(*) as total_subscribers FROM public.subscribers WHERE email = 'scalperline@gmail.com';
SELECT COUNT(*) as total_history FROM public.subscription_history WHERE email = 'scalperline@gmail.com';
*/

-- =====================================================
-- 1.3 VERIFICAÇÃO DE ESTRUTURA
-- =====================================================

-- Verificar estrutura das tabelas
SELECT 
    'Estrutura subscribers' as tabela,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'subscribers' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 
    'Estrutura subscription_history' as tabela,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'subscription_history' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 
    'Estrutura usage_limits' as tabela,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'usage_limits' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- =====================================================
-- RESULTADO FINAL
-- =====================================================

SELECT '=== VALIDAÇÃO CONCLUÍDA ===' as status;
SELECT 
    'Próximo passo: Executar FASE 2 - Correção de Infraestrutura' as acao; 