#!/bin/bash

# 🏥 Script de Deploy - Revalida Quest Versão Vitalícia
# Este script automatiza o processo de deploy da versão vitalícia

set -e

echo "🏥 Iniciando deploy da versão vitalícia..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Verificar se o Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    error "Supabase CLI não encontrado. Instale com: npm install -g supabase"
    exit 1
fi

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    error "Execute este script no diretório raiz do projeto"
    exit 1
fi

step "1. Verificando dependências..."
if [ ! -d "node_modules" ]; then
    log "Instalando dependências..."
    npm install
else
    log "Dependências já instaladas"
fi

step "2. Verificando configuração do Supabase..."
if [ ! -f "supabase/config.toml" ]; then
    error "Arquivo supabase/config.toml não encontrado"
    exit 1
fi

step "3. Executando migrações do banco..."
log "Executando migração de e-mails autorizados..."
supabase db push

step "4. Deploy das funções Supabase..."
log "Deploy da função validate-email..."
supabase functions deploy validate-email

step "5. Inserindo e-mails autorizados padrão..."
log "Executando script de inserção de e-mails..."
# Você pode personalizar este comando para inserir e-mails específicos
echo "⚠️  IMPORTANTE: Execute manualmente o script scripts/insert-authorized-emails.sql"
echo "   no SQL Editor do Supabase Dashboard para inserir e-mails autorizados"

step "6. Build do projeto..."
log "Gerando build de produção..."
npm run build

step "7. Verificando build..."
if [ ! -d "dist" ]; then
    error "Build falhou - pasta dist não encontrada"
    exit 1
fi

log "✅ Build gerado com sucesso!"

step "8. Deploy finalizado!"
echo ""
echo "🎉 Deploy da versão vitalícia concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Execute o script SQL: scripts/insert-authorized-emails.sql"
echo "2. Personalize os e-mails autorizados no painel admin (/admin)"
echo "3. Teste o signup com e-mails autorizados e não autorizados"
echo "4. Verifique os logs de acesso no painel admin"
echo ""
echo "🔗 URLs importantes:"
echo "- Aplicação: http://localhost:3000"
echo "- Painel Admin: http://localhost:3000/admin"
echo "- Supabase Dashboard: https://supabase.com/dashboard"
echo ""
echo "📞 Suporte: admin@revalidaquest.com"

# Verificar se há variáveis de ambiente necessárias
if [ ! -f ".env" ]; then
    warn "Arquivo .env não encontrado. Configure as variáveis de ambiente necessárias."
fi

echo ""
log "Deploy concluído com sucesso! 🏥" 