# 🚫 Guia para Remover Elementos de Assinatura

Este guia lista os elementos que devem ser removidos ou modificados para transformar a versão pública em vitalícia.

## 📋 **Elementos a Remover/Modificar**

### **1. Páginas Completas**
- [ ] `src/pages/Pricing.tsx` - Remover ou redirecionar
- [ ] `src/pages/Success.tsx` - Modificar para versão vitalícia
- [ ] `src/pages/CancelSubscription.tsx` - Remover

### **2. Componentes de Assinatura**
- [ ] `src/components/pricing/` - Pasta inteira
- [ ] `src/components/premium/` - Modificar ou remover
- [ ] `src/components/CancellationButton.tsx` - Remover

### **3. Funções Supabase**
- [ ] `supabase/functions/create-checkout/` - Desabilitar
- [ ] `supabase/functions/customer-portal/` - Desabilitar
- [ ] `supabase/functions/check-subscription/` - Modificar para sempre retornar vitalício
- [ ] `supabase/functions/stripe-webhook/` - Desabilitar

### **4. Rotas no App.tsx**
```typescript
// Remover estas rotas:
<Route path="/pricing" element={<Pricing />} />
<Route path="/success" element={<Success />} />

// Manter apenas:
<Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
```

### **5. Hooks e Utils**
- [ ] `src/hooks/useSubscription.ts` - Modificar para sempre retornar vitalício
- [ ] `src/utils/subscriptionHelpers.ts` - Modificar
- [ ] Verificar outros hooks que usam assinatura

### **6. Componentes UI**
- [ ] Badges de "Premium" ou "Pro"
- [ ] Botões de "Upgrade"
- [ ] Prompts de assinatura
- [ ] Limitações de uso

## 🔧 **Modificações Específicas**

### **1. useSubscription Hook**
```typescript
// Substituir por:
export function useSubscription() {
  return {
    hasSubscription: true,
    subscriptionTier: 'Vitalício',
    canAccessPremium: true,
    canAccessPro: true,
    isLoading: false,
  };
}
```

### **2. Verificações de Limite**
```typescript
// Substituir todas as verificações por:
export function isWithinLimit(type: string, currentUsage: number): boolean {
  return true; // Sempre true no modo vitalício
}
```

### **3. Mensagens de Upgrade**
```typescript
// Substituir por:
export function getUpgradeMessage(): string {
  return "Você tem acesso vitalício a todas as funcionalidades!";
}
```

## 📝 **Checklist de Implementação**

### **Fase 1: Banco de Dados**
- [x] Criar tabela `authorized_emails`
- [x] Criar tabela `access_attempts`
- [x] Criar funções de validação
- [x] Executar migração

### **Fase 2: Backend**
- [x] Criar função `validate-email`
- [x] Deploy da função
- [x] Testar validação

### **Fase 3: Frontend**
- [x] Modificar `useAuth.tsx`
- [x] Criar `useAuthorizedEmails.ts`
- [x] Criar página `Admin.tsx`
- [x] Adicionar rota `/admin`

### **Fase 4: Limpeza**
- [ ] Remover componentes de pricing
- [ ] Modificar verificações de assinatura
- [ ] Atualizar mensagens
- [ ] Testar funcionalidades

### **Fase 5: Testes**
- [ ] Testar signup com e-mail autorizado
- [ ] Testar signup com e-mail não autorizado
- [ ] Testar painel admin
- [ ] Verificar logs de acesso

## 🎯 **Resultado Final**

Após as modificações, o sistema deve:
1. ✅ Validar e-mails no signup
2. ✅ Permitir apenas e-mails autorizados
3. ✅ Remover todas as limitações de uso
4. ✅ Fornecer acesso vitalício completo
5. ✅ Manter painel de administração
6. ✅ Registrar logs de acesso

## 📞 **Suporte**

Para dúvidas sobre as modificações:
- Verificar logs do Supabase
- Testar função `validate-email`
- Verificar permissões de admin 