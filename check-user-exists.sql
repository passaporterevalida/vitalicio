-- Script para verificar se o usuário existe na tabela auth.users
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Verificar se o usuário existe na tabela auth.users
-- Substitua 'gabrielbzerra1998@gmail.com' pelo email do usuário que está tendo problemas
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'gabrielbzerra1998@gmail.com';

-- 2. Verificar se existe perfil na tabela user_profiles
SELECT 
  up.id,
  up.user_id,
  up.display_name,
  up.created_at
FROM public.user_profiles up
JOIN auth.users au ON up.user_id = au.id
WHERE au.email = 'gabrielbzerra1998@gmail.com';

-- 3. Verificar se existe registro na tabela subscribers
SELECT 
  s.id,
  s.user_id,
  s.email,
  s.subscribed,
  s.subscription_tier,
  s.created_at
FROM public.subscribers s
WHERE s.email = 'gabrielbzerra1998@gmail.com';

-- 4. Verificar se existe registro na tabela usage_limits
SELECT 
  ul.id,
  ul.user_id,
  ul.daily_questions_used,
  ul.monthly_simulados_used,
  ul.created_at
FROM public.usage_limits ul
JOIN auth.users au ON ul.user_id = au.id
WHERE au.email = 'gabrielbzerra1998@gmail.com';

-- 5. Verificar se o user_id do auth.users corresponde ao user_id usado no frontend
-- Este comando mostra todos os usuários para comparação
SELECT 
  id,
  email,
  created_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10; 