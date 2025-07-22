-- Script para corrigir o usuário de teste que falhou no webhook
-- gabrielbzerra1998@gmail.com

-- 1. Verificar se o usuário existe na tabela subscribers
SELECT * FROM subscribers WHERE email = 'gabrielbzerra1998@gmail.com';

-- 2. Inserir/atualizar o usuário como assinante Premium
INSERT INTO subscribers (email, subscribed, subscription_tier, updated_at)
VALUES ('gabrielbzerra1998@gmail.com', true, 'Premium', NOW())
ON CONFLICT (email) 
DO UPDATE SET 
    subscribed = true,
    subscription_tier = 'Premium',
    updated_at = NOW();

-- 3. Verificar se foi inserido corretamente
SELECT * FROM subscribers WHERE email = 'gabrielbzerra1998@gmail.com';

-- 4. Verificar o histórico de assinatura
SELECT * FROM subscription_history WHERE email = 'gabrielbzerra1998@gmail.com' ORDER BY created_at DESC; 