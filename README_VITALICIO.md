# 🏥 Revalida Quest - Versão Vitalícia

Sistema de questões médicas com **acesso vitalício** para e-mails autorizados.

## 🎯 **Características da Versão Vitalícia**

### ✅ **Funcionalidades Incluídas**
- **Acesso Ilimitado**: Todas as questões e simulados disponíveis
- **Conteúdo Premium**: Acesso completo a funcionalidades avançadas
- **Sistema de Gamificação**: XP, níveis, conquistas e ranking
- **Missions/Quests**: Desafios diários e semanais
- **Estatísticas Detalhadas**: Progresso completo do usuário
- **Interface Responsiva**: Funciona em desktop e mobile

### 🔐 **Sistema de Controle de Acesso**
- **E-mails Autorizados**: Apenas e-mails específicos podem se cadastrar
- **Domínios Autorizados**: E-mails de domínios específicos são autorizados
- **Painel de Administração**: Interface para gerenciar e-mails autorizados
- **Logs de Acesso**: Registro de todas as tentativas de acesso
- **Segurança**: Validação no momento do signup

### 🚫 **Funcionalidades Removidas**
- Sistema de assinatura Stripe
- Página de pricing
- Prompts de upgrade
- Limitações de uso
- Verificações de assinatura

## 🚀 **Instalação e Configuração**

### **1. Pré-requisitos**
```bash
# Node.js 18+ e npm/yarn
node --version
npm --version
```

### **2. Clone e Instalação**
```bash
git clone <url-do-repositorio-vitalicio>
cd vitalicio
npm install
```

### **3. Configuração do Supabase**

#### **A. Executar Migrações**
```sql
-- Execute no SQL Editor do Supabase Dashboard
-- Arquivo: supabase/migrations/20250101000000-authorized-emails-system.sql
```

#### **B. Deploy das Funções**
```bash
# Deploy da função de validação de e-mails
supabase functions deploy validate-email
```

#### **C. Inserir E-mails Autorizados**
```sql
-- Execute o script: scripts/insert-authorized-emails.sql
-- Personalize com os e-mails reais
```

### **4. Configuração de Ambiente**
```bash
# Copiar e configurar variáveis de ambiente
cp .env.example .env
```

### **5. Executar em Desenvolvimento**
```bash
npm run dev
```

## 🔧 **Configuração de E-mails Autorizados**

### **Via Painel de Administração**
1. Acesse `/admin` (apenas para e-mails admin)
2. Adicione e-mails específicos
3. Adicione domínios autorizados
4. Monitore tentativas de acesso

### **Via SQL Direto**
```sql
-- Adicionar e-mail específico
INSERT INTO public.authorized_emails (email, notes) 
VALUES ('usuario@exemplo.com', 'Médico residente');

-- Adicionar domínio autorizado
INSERT INTO public.authorized_emails (domain, notes) 
VALUES ('hospital.com', 'Domínio do hospital');
```

## 🛡️ **Segurança**

### **Controle de Acesso**
- Validação no momento do signup
- Logs de todas as tentativas
- IP e User-Agent registrados
- Painel de admin protegido

### **E-mails Admin**
Por padrão, os seguintes e-mails têm acesso ao painel admin:
- `admin@revalidaquest.com`
- `gabrielbzerra1998@gmail.com`
- Qualquer e-mail contendo "admin"

## 📊 **Monitoramento**

### **Logs de Acesso**
- Todas as tentativas de signup são registradas
- E-mails autorizados e negados
- IP e User-Agent capturados
- Timestamp de cada tentativa

### **Estatísticas**
- Total de e-mails autorizados
- Total de domínios autorizados
- Tentativas de acesso (autorizadas/negadas)
- Histórico de tentativas

## 🎨 **Personalização**

### **Cores e Branding**
```typescript
// src/config/vitalicio.ts
customBranding: {
  primaryColor: '#8B5CF6', // Purple
  secondaryColor: '#EC4899', // Pink
  gradient: 'from-purple-500 to-pink-500',
}
```

### **Mensagens**
```typescript
messages: {
  unauthorizedEmail: 'Mensagem personalizada para e-mails não autorizados',
  vitalicioMode: 'Modo Vitalício - Acesso completo ativado',
}
```

## 🔄 **Diferenças da Versão Pública**

| Funcionalidade | Versão Pública | Versão Vitalícia |
|----------------|----------------|------------------|
| Sistema de Assinatura | ✅ Stripe | ❌ Removido |
| Controle de Acesso | ❌ Livre | ✅ E-mails Autorizados |
| Limitações de Uso | ✅ Sim | ❌ Ilimitado |
| Painel Admin | ❌ Não | ✅ Sim |
| Logs de Acesso | ❌ Não | ✅ Sim |
| Pricing Page | ✅ Sim | ❌ Removida |

## 🚀 **Deploy**

### **Vercel**
```bash
npm run build
vercel --prod
```

### **Outros Plataformas**
```bash
npm run build
# Deploy dos arquivos da pasta dist/
```

## 📞 **Suporte**

Para solicitar acesso ou suporte:
- **E-mail**: admin@revalidaquest.com
- **Desenvolvedor**: gabrielbzerra1998@gmail.com

## 📝 **Licença**

Este projeto é privado e destinado apenas para e-mails autorizados.

---

**🏥 Revalida Quest - Versão Vitalícia**  
*Sistema médico com acesso controlado e vitalício* 