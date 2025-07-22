# Script de Deploy da Integração Kiwify + RevalidaQuest
# Este script automatiza o deploy da integração webhook

Write-Host "🚀 Iniciando Deploy da Integração Kiwify + RevalidaQuest" -ForegroundColor Green
Write-Host ""

# Verificar se o Supabase CLI está instalado
try {
    $supabaseVersion = supabase --version
    Write-Host "✅ Supabase CLI encontrado: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI não encontrado. Instalando..." -ForegroundColor Red
    Write-Host "Por favor, instale o Supabase CLI primeiro:" -ForegroundColor Yellow
    Write-Host "https://supabase.com/docs/guides/cli" -ForegroundColor Cyan
    exit 1
}

# Verificar se estamos no diretório correto
if (-not (Test-Path "supabase/config.toml")) {
    Write-Host "❌ Arquivo supabase/config.toml não encontrado." -ForegroundColor Red
    Write-Host "Execute este script na raiz do projeto RevalidaQuest." -ForegroundColor Yellow
    exit 1
}

Write-Host "📁 Diretório do projeto verificado" -ForegroundColor Green

# Deploy das funções Supabase
Write-Host ""
Write-Host "🔧 Deployando funções Supabase..." -ForegroundColor Blue

# Deploy da função validate-email
Write-Host "  📤 Deployando validate-email..." -ForegroundColor Yellow
try {
    supabase functions deploy validate-email
    Write-Host "  ✅ validate-email deployada com sucesso" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Erro ao deployar validate-email" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Deploy da função kiwify-webhook
Write-Host "  📤 Deployando kiwify-webhook..." -ForegroundColor Yellow
try {
    supabase functions deploy kiwify-webhook
    Write-Host "  ✅ kiwify-webhook deployada com sucesso" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Erro ao deployar kiwify-webhook" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Aplicar migrações do banco de dados
Write-Host ""
Write-Host "🗄️ Aplicando migrações do banco de dados..." -ForegroundColor Blue

try {
    supabase db push
    Write-Host "✅ Migrações aplicadas com sucesso" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao aplicar migrações" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Obter URLs das funções
Write-Host ""
Write-Host "🔗 URLs das funções deployadas:" -ForegroundColor Blue

try {
    $projectUrl = supabase status --output json | ConvertFrom-Json | Select-Object -ExpandProperty API
    Write-Host "  🌐 URL Base: $projectUrl" -ForegroundColor Cyan
    Write-Host "  📧 Validate Email: $projectUrl/functions/v1/validate-email" -ForegroundColor Cyan
    Write-Host "  🔗 Kiwify Webhook: $projectUrl/functions/v1/kiwify-webhook" -ForegroundColor Cyan
} catch {
    Write-Host "  ⚠️ Não foi possível obter as URLs automaticamente" -ForegroundColor Yellow
    Write-Host "  Verifique no painel do Supabase Dashboard" -ForegroundColor Yellow
}

# Instruções de configuração
Write-Host ""
Write-Host "📋 PRÓXIMOS PASSOS:" -ForegroundColor Green
Write-Host ""
Write-Host "1. 🌐 Acesse o painel da Kiwify:" -ForegroundColor Yellow
Write-Host "   https://app.kiwify.com.br/dashboard" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. ⚙️ Configure o Webhook:" -ForegroundColor Yellow
Write-Host "   - Vá em Configurações > Webhooks" -ForegroundColor White
Write-Host "   - Adicione a URL: [URL_BASE]/functions/v1/kiwify-webhook" -ForegroundColor White
Write-Host "   - Evento: purchase.completed" -ForegroundColor White
Write-Host ""
Write-Host "3. 🧪 Teste a integração:" -ForegroundColor Yellow
Write-Host "   - Faça uma compra de teste do Passaporte Revalida" -ForegroundColor White
Write-Host "   - Verifique se o e-mail foi autorizado automaticamente" -ForegroundColor White
Write-Host ""
Write-Host "4. 📊 Monitore no painel admin:" -ForegroundColor Yellow
Write-Host "   - Acesse: http://localhost:3000/admin" -ForegroundColor White
Write-Host "   - Verifique a aba 'Tentativas de Acesso'" -ForegroundColor White
Write-Host ""

# Verificar se o projeto está rodando
Write-Host "🔍 Verificando se o projeto está rodando..." -ForegroundColor Blue
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✅ Projeto rodando em http://localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Projeto não está rodando em http://localhost:3000" -ForegroundColor Yellow
    Write-Host "Execute: npm run dev" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Deploy da integração concluído!" -ForegroundColor Green
Write-Host "Agora configure o webhook na Kiwify e teste a integração." -ForegroundColor White 