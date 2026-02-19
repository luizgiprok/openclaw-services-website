# OpenClaw Services Website

Um website moderno e completo para serviços de instalação, suporte e desenvolvimento OpenClaw.

## 🚀 Features

### ✅ Implementadas
- **Website Moderno**: Design com glassmorphism e gradientes
- **Formulário de Contato**: Validação completa + backend integration
- **Chat em Tempo Real**: Widget inteligente com WhatsApp integration
- **Área do Cliente**: Sistema de login completo com dashboard
- **Backend APIs**: Node.js + Express para todos os serviços
- **Docker Setup**: Containerização completa para produção
- **Monitoramento**: Sistema automático de reinício de serviços

### 🔧 Tecnologias
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Styling**: CSS moderno com Grid e Flexbox
- **Containerização**: Docker + docker-compose
- **Monitoramento**: Scripts de automação

## 📁 Estrutura do Projeto

```
website-2026-02/
├── README.md                 # Documentação do projeto
├── docker-compose.yml       # Configuração Docker
├── nginx.conf              # Configuração Nginx
├── TRACKING.md             # Progresso do projeto
├── PLAN.md                 # Planejamento
├── README.md               # Documentação principal
├── server/                 # Backend Node.js
│   ├── package.json
│   ├── server.js           # API principal
│   ├── chat-server.js      # API de chat
│   └── server.log         # Logs do servidor
├── react-app/              # Frontend React
│   ├── package.json
│   ├── vite.config.ts     # Configuração Vite
│   ├── index.html         # HTML principal
│   ├── src/
│   │   ├── App.tsx         # App principal
│   │   ├── main.tsx        # Entry point
│   │   ├── components/    # Componentes React
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── CustomerArea.tsx
│   │   │   └── CustomerAreaSimple.tsx
│   │   └── App.css         # Estilos globais
│   └── dist/              # Build production
└── public/                # Arquivos estáticos
    └── index.html         # Versão estática
```

## 🚀 Como Rodar

### Desenvolvimento
```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd react-app
npm install
npm run dev
```

### Produção com Docker
```bash
docker-compose up -d
```

## 🌐 Acessos

- **Local**: http://localhost:5173
- **Rede**: http://192.168.129.35:5173
- **Backend API**: http://localhost:3000
- **Chat API**: http://localhost:3001

## 📊 Status do Projeto

### ✅ Concluído
- [x] Design moderno e responsivo
- [x] Formulário de contato funcional
- [x] Sistema de chat em tempo real
- [x] Área do cliente com login
- [x] Backend APIs completas
- [x] Docker containerização
- [x] Sistema de monitoramento

### 🚀 Próximos Passos
- [ ] Sistema de agendamento
- [ ] SEO otimizado
- [ ] Analytics completo
- [ ] E-commerce de serviços
- [ ] Integração CRM

## 🛠️ Configuração Necessária

### Variáveis de Ambiente
```bash
# Backend
PORT=3000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3000
```

### Dependências
- Node.js 18+
- npm ou yarn
- Docker (opcional)

## 📱 Design Responsivo

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Paleta de Cores

```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #ec4899;
  --accent-color: #14b8a6;
  --dark-bg: #0f172a;
  --light-bg: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
}
```

## 🔒 Segurança

- CORS configurado
- Validação de inputs
- Rate limiting
- Logs de auditoria

## 📈 Performance

- Build otimizado com Vite
- CSS minificado
- Lazy loading
- Cache headers

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/nome-da-feature`
3. Commit suas mudanças: `git commit -am 'Adiciona feature'`
4. Push para a branch: `git push origin feature/nome-da-feature`
5. Submit um pull request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 📞 Contato

- **Email**: contato@openclawservices.com
- **WhatsApp**: +55 (11) 91234-5678
- **Site**: http://openclawservices.com

---

**Status**: 🚧 Pronto para deploy - Acesso externo configurado  
**Versão**: 1.0.0  
**Última Atualização**: 19/02/2026