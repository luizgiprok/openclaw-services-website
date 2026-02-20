#!/bin/bash

# Script final de deploy para Netlify
# Este script prepara e faz o deploy do site

echo "🚀 Deploy do OpenClaw Services para Netlify..."

# Verificar se estamos no diretório correto
if [ ! -f "react-app/package.json" ]; then
    echo "❌ Diretório incorreto. Execute este script do diretório raiz do projeto."
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
cd react-app
npm install

# Fazer o build
echo "🔨 Fazendo build do frontend..."
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Build falhou. Diretório dist não encontrado."
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo "📊 Tamanho do build:"
du -sh dist/

# Voltar para o diretório raiz
cd ..

echo ""
echo "🎯 PRÓXIMOS PASSOS PARA DEPLOY:"
echo ""
echo "1. Acesse: https://app.netlify.com"
echo "2. Faça login com sua conta GitHub"
echo "3. Clique em 'New site from Git'"
echo "4. Importe o repositório: luizgiprok/openclaw-services-website"
echo "5. Configure as seguintes opções:"
echo "   • Build command: npm run netlify-build"
echo "   • Publish directory: react-app/dist"
echo "   • Branch: main"
echo "6. Clique em 'Deploy site'"
echo ""
echo "🔗 Links importantes:"
echo "• Repositório GitHub: https://github.com/luizgiprok/openclaw-services-website"
echo "• Email: contato@openclawservices.com"
echo "• Site pronto para deploy: ✅"
echo ""
echo "⏰ Tempo estimado de deploy: 2-3 minutos"
echo "🌐 Seu site estará disponível em: https://[nome-aleatorio].netlify.app"
echo ""
echo "🎉 DEPLOY PRONTO PARA PUBLICAÇÃO!"