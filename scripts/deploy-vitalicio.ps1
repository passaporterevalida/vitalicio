# 🏥 Script de Deploy - Revalida Quest Versão Vitalícia (PowerShell)
# Este script automatiza o processo de deploy da versão vitalícia no Windows

param(
    [switch]$SkipBuild,
    [switch]$SkipDeploy
)

# Configurar para parar em caso de erro
$ErrorActionPreference = "Stop"

Write-Host "🏥 Iniciando deploy da versão vitalícia..." -ForegroundColor Cyan

# Função para log colorido
function Write-Log {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Step {
    param([string]$Message)
    Write-Host "[STEP] $Message" -ForegroundColor Blue
}

# Verificar se o Supabase CLI está instalado
try {
    $null = Get-Command supabase -ErrorAction Stop
    Write-Log "Supabase CLI encontrado"
} catch {
    Write-Error "Supabase CLI não encontrado. Instale com: npm install -g supabase"
    exit 1
}

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Error "Execute este script no diretório raiz do projeto"
    exit 1
}

Write-Step "1. Verificando dependências..."
if (-not (Test-Path "node_modules")) {
    Write-Log "Instalando dependências..."
    npm install
} else {
    Write-Log "Dependências já instaladas"
}

Write-Step "2. Verificando configuração do Supabase..."
if (-not (Test-Path "supabase/config.toml")) {
    Write-Error "Arquivo supabase/config.toml não encontrado"
    exit 1
}

if (-not $SkipDeploy) {
    Write-Step "3. Executando migrações do banco..."
    Write-Log "Executando migração de e-mails autorizados..."
    supabase db push

    Write-Step "4. Deploy das funções Supabase..."
    Write-Log "Deploy da função validate-email..."
    supabase functions deploy validate-email
}

Write-Step "5. Inserindo e-mails autorizados padrão..."
Write-Log "Executando script de inserção de e-mails..."
Write-Warn "IMPORTANTE: Execute manualmente o script scripts/insert-authorized-emails.sql"
Write-Warn "   no SQL Editor do Supabase Dashboard para inserir e-mails autorizados"

if (-not $SkipBuild) {
    Write-Step "6. Build do projeto..."
    Write-Log "Gerando build de produção..."
    npm run build

    Write-Step "7. Verificando build..."
    if (-not (Test-Path "dist")) {
        Write-Error "Build falhou - pasta dist não encontrada"
        exit 1
    }

    Write-Log "✅ Build gerado com sucesso!"
}

Write-Step "8. Deploy finalizado!"
Write-Host ""
Write-Host "🎉 Deploy da versão vitalícia concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Execute o script SQL: scripts/insert-authorized-emails.sql"
Write-Host "2. Personalize os e-mails autorizados no painel admin (/admin)"
Write-Host "3. Teste o signup com e-mails autorizados e não autorizados"
Write-Host "4. Verifique os logs de acesso no painel admin"
Write-Host ""
Write-Host "🔗 URLs importantes:" -ForegroundColor Cyan
Write-Host "- Aplicação: http://localhost:3000"
Write-Host "- Painel Admin: http://localhost:3000/admin"
Write-Host "- Supabase Dashboard: https://supabase.com/dashboard"
Write-Host ""
Write-Host "📞 Suporte: admin@revalidaquest.com" -ForegroundColor Gray

# Verificar se há variáveis de ambiente necessárias
if (-not (Test-Path ".env")) {
    Write-Warn "Arquivo .env não encontrado. Configure as variáveis de ambiente necessárias."
}

Write-Host ""
Write-Log "Deploy concluído com sucesso! 🏥" 