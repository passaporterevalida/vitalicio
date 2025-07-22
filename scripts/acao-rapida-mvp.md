# 🚀 AÇÃO RÁPIDA - MVP Cancelamento

## 🎯 **PROBLEMA ATUAL**
- ❌ Função `customer-portal` retorna erro 500
- ❌ Usuários não conseguem cancelar assinatura
- ✅ Todos os dados estão corretos no banco

## ⚡ **AÇÃO IMEDIATA (5 MINUTOS)**

### **1. Verificar Configuração do Stripe (2 min)**
```bash
# No Supabase Dashboard:
# 1. Settings → Edge Functions
# 2. Verificar se STRIPE_SECRET_KEY existe
# 3. Confirmar que começa com "sk_"
```

### **2. Teste Direto da Função (2 min)**
```bash
# No Supabase Dashboard:
# 1. Edge Functions → customer-portal
# 2. Clique em "Invoke"
# 3. Adicione header: {"Authorization": "Bearer SEU_TOKEN"}
# 4. Clique "Invoke"
# 5. Verifique logs em tempo real
```

### **3. Executar Script de Diagnóstico (1 min)**
```sql
-- No Supabase SQL Editor, execute:
-- scripts/test-mvp-cancellation.sql
```

## 🔍 **DIAGNÓSTICO RÁPIDO**

### **Se o erro persistir, verifique:**

#### **A. Configuração do Stripe**
- [ ] `STRIPE_SECRET_KEY` configurada
- [ ] Chave válida (teste no Stripe Dashboard)
- [ ] Conta Stripe ativa

#### **B. Dados do Usuário**
- [ ] Customer ID existe: `cus_ShrB4v0DLU7t1z`
- [ ] Usuário assinado: `true`
- [ ] Tier válido: `Enterprise`

#### **C. Permissões**
- [ ] Service role key válida
- [ ] RLS policies corretas
- [ ] Autenticação funcionando

## 🛠️ **SOLUÇÃO ALTERNATIVA (Se necessário)**

### **Criar Função de Teste Simplificada:**
```typescript
// supabase/functions/test-customer-portal/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });
    
    // Teste direto com customer ID conhecido
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: "cus_ShrB4v0DLU7t1z",
      return_url: "https://revalidaquest.com/profile",
    });
    
    return new Response(JSON.stringify({ url: portalSession.url }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
```

## 📊 **CHECKLIST MVP FUNCIONAL**

### **✅ Frontend (Já Funcional)**
- [x] Hook de cancelamento
- [x] Modal de confirmação
- [x] Página de cancelamento
- [x] Integração com Stripe

### **✅ Backend (Parcialmente Funcional)**
- [x] Função customer-portal (código OK)
- [x] Webhook Stripe (funcional)
- [x] Check subscription (funcional)
- [ ] **ERRO 500 na customer-portal**

### **✅ Banco de Dados (Funcional)**
- [x] Tabela subscribers
- [x] Dados do usuário
- [x] RLS policies
- [x] Histórico

## 🎯 **RESULTADO ESPERADO**

### **Após resolver o erro 500:**
1. ✅ Usuário clica "Cancelar Assinatura"
2. ✅ Modal de confirmação aparece
3. ✅ Portal do Stripe abre em nova aba
4. ✅ Usuário cancela no Stripe
5. ✅ Webhook atualiza banco
6. ✅ Usuário vê mudança na interface

## 🚨 **SE NADA FUNCIONAR**

### **Solução de Emergência:**
1. **Cancelamento Manual:** Usuário cancela diretamente no Stripe Dashboard
2. **Suporte:** Email para `suporte@revalidaquest.com`
3. **Fallback:** Processo manual de cancelamento

## 📞 **CONTATO DE EMERGÊNCIA**

### **Para problemas técnicos:**
- **Email:** suporte@revalidaquest.com
- **Stripe Dashboard:** Cancelamento manual
- **Logs:** Supabase Dashboard → Edge Functions → Logs

---

## 🎯 **CONCLUSÃO**

**O MVP está 95% pronto.** Apenas o erro 500 na função `customer-portal` precisa ser resolvido.

**Tempo estimado para solução:** 5-10 minutos
**Impacto:** Sistema de cancelamento 100% funcional 