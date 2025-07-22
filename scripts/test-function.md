# Guia para Testar a Função Customer Portal

## 1. Testar via Supabase Dashboard

### Passos:
1. Acesse o Supabase Dashboard
2. Vá para "Edge Functions"
3. Clique na função `customer-portal`
4. Clique em "Invoke"
5. Adicione os headers necessários:
   ```json
   {
     "Authorization": "Bearer SEU_ACCESS_TOKEN_AQUI"
   }
   ```
6. Clique em "Invoke" e verifique os logs

## 2. Testar via cURL

### Obter Access Token:
```bash
# Faça login no Supabase e obtenha o access token
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/auth/v1/token?grant_type=password' \
  -H 'apikey: SUA_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "scalperline@gmail.com",
    "password": "SUA_SENHA"
  }'
```

### Testar a Função:
```bash
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/customer-portal' \
  -H 'Authorization: Bearer SEU_ACCESS_TOKEN' \
  -H 'Content-Type: application/json'
```

## 3. Verificar Logs da Função

### No Supabase Dashboard:
1. Vá para "Edge Functions"
2. Clique na função `customer-portal`
3. Clique em "Logs"
4. Execute a função e veja os logs em tempo real

### Logs Esperados:
```
[customer-portal] Function started
[customer-portal] Authorization header found
[customer-portal] Authenticating user with token
[customer-portal] User authenticated {"userId":"a5862376-8c44-4953-b730-90fabae838e1","email":"scalperline@gmail.com"}
[customer-portal] Fetching subscriber data {"email":"scalperline@gmail.com"}
[customer-portal] Subscriber data retrieved {"hasData":true,"stripeCustomerId":"cus_ShrB4v0DLU7t1z","subscribed":true,"tier":"Enterprise"}
[customer-portal] Stripe customer ID found {"customerId":"cus_ShrB4v0DLU7t1z"}
[customer-portal] Stripe client created
[customer-portal] Creating portal session {"origin":"http://localhost:3000","customerId":"cus_ShrB4v0DLU7t1z"}
[customer-portal] Portal session created successfully {"sessionId":"bps_xxx","url":"https://billing.stripe.com/session/xxx"}
```

## 4. Possíveis Erros e Soluções

### Erro: "No authorization header provided"
- **Causa:** Token não enviado
- **Solução:** Verifique se o Authorization header está correto

### Erro: "Authentication error"
- **Causa:** Token inválido ou expirado
- **Solução:** Obtenha um novo token

### Erro: "No subscription data found"
- **Causa:** Usuário não encontrado na tabela subscribers
- **Solução:** Verifique se o usuário existe na tabela

### Erro: "Stripe configuration error"
- **Causa:** STRIPE_SECRET_KEY não configurada
- **Solução:** Configure a variável de ambiente no Supabase

### Erro: "Stripe API error"
- **Causa:** Problema com a API do Stripe
- **Solução:** Verifique a chave do Stripe e a conta

## 5. Verificar Variáveis de Ambiente

### No Supabase Dashboard:
1. Vá para "Settings" → "Edge Functions"
2. Verifique se as seguintes variáveis estão configuradas:
   - `STRIPE_SECRET_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Formato da STRIPE_SECRET_KEY:
- Deve começar com `sk_`
- Deve ter aproximadamente 100 caracteres
- Exemplo: `sk_test_...` ou `sk_live_...`

## 6. Testar Customer no Stripe

### No Dashboard do Stripe:
1. Acesse https://dashboard.stripe.com/customers
2. Procure por `cus_ShrB4v0DLU7t1z`
3. Verifique se o customer está ativo
4. Verifique se há assinaturas ativas

## 7. Comandos Úteis

### Verificar Status da Função:
```bash
curl -X GET 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/customer-portal' \
  -H 'Authorization: Bearer SEU_ACCESS_TOKEN'
```

### Testar com Dados Específicos:
```bash
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/customer-portal' \
  -H 'Authorization: Bearer SEU_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000'
``` 