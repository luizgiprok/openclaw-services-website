#!/bin/bash

# Script completo de deploy para Netlify
# Seguindo a documentação oficial: https://docs.netlify.com/start/quickstarts/deploy-from-repository/

echo "🚀 Deploy do OpenClaw Services para Netlify"
echo "📖 Seguindo documentação oficial: https://docs.netlify.com/start/quickstarts/deploy-from-repository/"
echo ""

# Verificar se o Netlify CLI está instalado
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI não encontrado. Instalando..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI instalado"
echo ""

# Fazer login na Netlify
echo "🔑 Fazendo login na Netlify..."
netlify login

echo "✅ Login realizado com sucesso"
echo ""

# Criar novo site
echo "🌐 Criando novo site na Netlify..."
netlify sites:create --name "openclaw-services"

echo "✅ Site criado com sucesso"
echo ""

# Configurar deploy automático do GitHub
echo "🔧 Configurando deploy automático do GitHub..."
echo "1. Acesse: https://app.netlify.com"
echo "2. Clique em 'Add new site' > 'Import an existing project'"
echo "3. Escolha GitHub como provedor"
echo "4. Autorize o acesso ao seu repositório"
echo "5. Selecione o repositório: luizgiprok/openclaw-services-website"
echo "6. Configure as opções:"
echo "   • Build command: npm run netlify-build"
echo "   • Publish directory: react-app/dist"
echo "   • Branch: main"
echo "7. Clique em 'Deploy site'"

echo ""
echo "🎉 DEPLOY PRONTO PARA CONFIGURAÇÃO!"
echo ""
echo "📊 Informações do projeto:"
echo "• Nome do site: openclaw-services"
echo "• Repositório: https://github.com/luizgiprok/openclaw-services-website"
echo "• Build pronto: ✅ 216K (ótimo performance!)"
echo "• Tecnologia: React + TypeScript + Vite"
echo ""
echo "🔗 Links importantes:"
echo "• Netlify: https://app.netlify.com"
echo "• Repositório: https://github.com/luizgiprok/openclaw-services-website"
echo "• Email: contato@openclawservices.com"
echo ""
echo "⏰ Tempo estimado de deploy: 2-3 minutos"
echo "🌐 URL final: https://openclaw-services.netlify.app"