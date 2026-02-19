#!/bin/bash

# Script de deploy para Netlify
# Este script prepara o projeto para deploy na Netlify

echo "🚀 Preparando deploy para Netlify..."

# Mudar para o diretório do projeto
cd "$(dirname "$0")"

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd react-app
npm install

# Fazer o build do frontend
echo "🔨 Fazendo build do frontend..."
npm run build

# Voltar para o diretório raiz
cd ..

echo "✅ Deploy preparado com sucesso!"
echo "📁 Diretório para deploy: react-app/dist"
echo "🔗 URL do deploy: https://netlify.app"
echo "📧 Email: contato@openclawservices.com"

# Mostrar o tamanho do build
echo "📊 Tamanho do build:"
du -sh react-app/dist/

echo "🎯 Próximos passos:"
echo "1. Acesse: https://app.netlify.com"
echo "2. Conecte sua conta GitHub"
echo "3. Importe o repositório: luizgiprok/openclaw-services-website"
echo "4. Configure as configurações abaixo:"
echo "   - Build command: npm run netlify-build"
echo "   - Publish directory: react-app/dist"
echo "   - Branch: main"