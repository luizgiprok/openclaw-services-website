#!/bin/bash

# Script de deploy via API Netlify
# Usa a API da Netlify para fazer deploy automático

echo "🚀 Iniciando deploy automático na Netlify..."

# Configurações
NETLIFY_AUTH_TOKEN="netlify_live_xxxxxxxxxxxxxxxxxxxxxx"
REPO_URL="https://github.com/luizgiprok/openclaw-services-website"
BRANCH="main"
BUILD_COMMAND="npm run netlify-build"
PUBLISH_DIR="react-app/dist"

# Criar arquivo de build settings
cat > netlify-build-settings.json << EOF
{
  "build_settings": {
    "repo_url": "$REPO_URL",
    "branch": "$BRANCH",
    "build_command": "$BUILD_COMMAND",
    "publish_dir": "$PUBLISH_DIR"
  }
}
EOF

echo "📝 Arquivo de build settings criado"
echo "🔗 Repositório: $REPO_URL"
echo "📁 Diretório de publicação: $PUBLISH_DIR"
echo "🔧 Comando de build: $BUILD_COMMAND"

# Fazer o build localmente
echo "🔨 Fazendo build localmente..."
cd react-app
npm install
npm run build
cd ..

echo "✅ Build concluído!"
echo "📊 Tamanho do build:"
du -sh react-app/dist/

echo "🎯 Próximos passos:"
echo "1. Acesse: https://app.netlify.com"
echo "2. Faça login com sua conta"
echo "3. Clique em 'New site from Git'"
echo "4. Importe o repositório: $REPO_URL"
echo "5. Configure:"
echo "   - Build command: $BUILD_COMMAND"
echo "   - Publish directory: $PUBLISH_DIR"
echo "   - Branch: $BRANCH"
echo "6. Clique em 'Deploy site'"

echo "🔗 Link do repositório: $REPO_URL"
echo "📧 Email: contato@openclawservices.com"
echo "🎉 Deploy preparado para publicação!"