#!/bin/bash

# Script de deploy alternativo para Netlify
# Usa deploy direto via GitHub

echo "🚀 Deploy alternativo para Netlify..."

# Verificar se o Netlify CLI está instalado
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI não encontrado. Instalando..."
    npm install -g netlify-cli
fi

# Fazer login na Netlify
echo "🔑 Fazendo login na Netlify..."
netlify login

# Criar site na Netlify
echo "🌐 Criando site na Netlify..."
netlify sites:create --name "openclaw-services" --repo "luizgiprok/openclaw-services-website" --branch "main"

# Configurar variáveis de ambiente
echo "🔧 Configurando variáveis de ambiente..."
netlify env:set NODE_ENV production

# Fazer deploy
echo "🚀 Fazendo deploy..."
netlify deploy --prod --dir "react-app/dist"

echo "✅ Deploy concluído!"
echo "📧 Email: contato@openclawservices.com"