const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Simulação de banco de dados de conversas
let conversations = [];
let chatStats = {
  totalConversations: 0,
  messagesToday: 0,
  activeUsers: 0
};

// Rota para obter estatísticas do chat
app.get('/api/chat/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      ...chatStats,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

// Rota para registrar uma nova conversa
app.post('/api/chat/start', (req, res) => {
  const { userId, userAgent } = req.body;
  
  const conversation = {
    id: Date.now().toString(),
    userId: userId || `user_${Date.now()}`,
    userAgent: userAgent || 'Unknown',
    startTime: new Date().toISOString(),
    messages: [],
    status: 'active'
  };
  
  conversations.push(conversation);
  chatStats.totalConversations++;
  chatStats.activeUsers++;
  
  console.log(`🚀 Nova conversa iniciada: ${conversation.id}`);
  
  res.json({
    success: true,
    conversation: {
      id: conversation.id,
      userId: conversation.userId,
      status: conversation.status
    }
  });
});

// Rota para enviar mensagem
app.post('/api/chat/message', (req, res) => {
  const { conversationId, message, userId } = req.body;
  
  // Encontrar a conversa
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) {
    return res.status(404).json({
      success: false,
      error: 'Conversa não encontrada'
    });
  }
  
  // Registrar mensagem do usuário
  const userMessage = {
    id: Date.now().toString(),
    text: message,
    sender: 'user',
    timestamp: new Date().toISOString()
  };
  
  conversation.messages.push(userMessage);
  chatStats.messagesToday++;
  
  console.log(`📨 Mensagem recebida na conversa ${conversationId}: "${message}"`);
  
  // Simular processamento e resposta
  setTimeout(() => {
    const botResponse = generateBotResponse(message);
    
    const botMessage = {
      id: Date.now().toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    
    conversation.messages.push(botMessage);
    
    console.log(`🤖 Resposta enviada para conversa ${conversationId}: "${botResponse}"`);
    
    // Notificar (simulação)
    notifyWhatsApp(conversation, userMessage, botResponse);
  }, 1000 + Math.random() * 2000); // 1-3 segundos de "processamento"
  
  res.json({
    success: true,
    message: 'Mensagem recebida',
    messageId: userMessage.id
  });
});

// Rota para obter histórico de conversa
app.get('/api/chat/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) {
    return res.status(404).json({
      success: false,
      error: 'Conversa não encontrada'
    });
  }
  
  res.json({
    success: true,
    conversation: {
      id: conversation.id,
      userId: conversation.userId,
      startTime: conversation.startTime,
      messages: conversation.messages,
      status: conversation.status
    }
  });
});

// Rota para finalizar conversa
app.post('/api/chat/end', (req, res) => {
  const { conversationId } = req.body;
  
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (conversation) {
    conversation.status = 'ended';
    conversation.endTime = new Date().toISOString();
    chatStats.activeUsers--;
    
    console.log(`✅ Conversa finalizada: ${conversationId}`);
    
    // Enviar resumo para WhatsApp
    sendConversationSummary(conversation);
  }
  
  res.json({
    success: true,
    message: 'Conversa finalizada'
  });
});

// Função para gerar respostas do bot
function generateBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Respostas baseadas em palavras-chave
  if (lowerMessage.includes('instalação') || lowerMessage.includes('setup')) {
    return '🚀 Ótima escolha! A instalação OpenClaw inclui configuração segura, integração com seus sistemas existentes e treinamento básico da equipe. Qual o porte da sua empresa?';
  }
  
  if (lowerMessage.includes('suporte') || lowerMessage.includes('ajuda')) {
    return '🛠️ Nosso suporte 24/7 é premium! Inclui atendimento prioritário, monitoramento contínuo, updates de segurança e SLA garantido. Você já tem suporte atualmente?';
  }
  
  if (lowerMessage.includes('desenvolvimento') || lowerMessage.includes('custom')) {
    return '💻 Desenvolvimento customizado é nossa especialidade! Podemos criar agentes sob medida, automação de workflows, integração com APIs e plugins personalizados. Qual tipo de solução você precisa?';
  }
  
  if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
    return '💰 Nossos planos:\n\n🚀 **Instalação**: R$ 500 - R$ 2.000\n🛠️ **Suporte**: R$ 200 - R$ 800/mês\n💻 **Desenvolvimento**: R$ 100 - R$ 200/hora\n🎯 **Consultoria**: R$ 150 - R$ 300/hora\n\nPosso enviar uma proposta detalhada?';
  }
  
  if (lowerMessage.includes('horário') || lowerMessage.includes('atendimento')) {
    return '🕐 Nosso atendimento é:\n\n📞 **Telefone**: 24/7 para clientes ativos\n💬 **Chat**: Segunda a Sexta, 9h-18h\n📧 **Email**: Resposta em até 24h\n🌐 **WhatsApp**: +55 (11) 91234-5678\n\nPrecisa de ajuda agora?';
  }
  
  if (lowerMessage.includes('humano') || lowerMessage.includes('falar pessoa')) {
    return '👋 Com certeza! Vou te conectar com um especialista agora mesmo.\n\n📞 **Ligue para**: +55 (11) 91234-5678\n💬 **WhatsApp**: +55 (11) 91234-5678\n📧 **Email**: contato@openclawservices.com\n\nQual é a sua urgência?';
  }
  
  if (lowerMessage.includes('obrigado') || lowerMessage.includes('valeu')) {
    return '🎉 De nada! Estou aqui para ajudar. Se precisar de mais informações sobre OpenClaw ou quiser agendar uma consulta, é só me chamar. Tenha um ótimo dia! 😊';
  }
  
  if (lowerMessage.includes('oi') || lowerMessage.includes('ola') || lowerMessage.includes('olá')) {
    return '👋 Olá! Sou o assistente virtual do OpenClaw Services. Em que posso ajudar você hoje? Posso te informar sobre instalação, suporte 24/7, desenvolvimento customizado ou consultoria estratégica.';
  }
  
  // Resposta padrão
  return 'Entendi! Estou aqui para ajudar com tudo relacionado ao OpenClaw. Posso te ajudar com:\n\n🚀 Instalação profissional\n🛠️ Suporte 24/7\n💻 Desenvolvimento customizado\n🎯 Consultoria estratégica\n\nEm qual área você precisa de ajuda?';
}

// Função para notificar via WhatsApp (simulação)
function notifyWhatsApp(conversation, userMessage, botResponse) {
  console.log(`📱 Notificação WhatsApp para conversa ${conversation.id}`);
  console.log(`👤 Usuário: ${userMessage.text}`);
  console.log(`🤖 Bot: ${botResponse}`);
  
  // Aqui você integraria com a API real do WhatsApp
  // Twilio, WhatsApp Business API, etc.
  
  // Simulação de envio
  const whatsappMessage = `📢 Nova mensagem no chat:\n\nUsuário: ${userMessage.text}\n\nResposta: ${botResponse}\n\nConversa ID: ${conversation.id}`;
  
  console.log(`📤 WhatsApp Message: ${whatsappMessage}`);
}

// Função para enviar resumo da conversa
function sendConversationSummary(conversation) {
  const messageCount = conversation.messages.length;
  const duration = conversation.endTime ? 
    new Date(conversation.endTime) - new Date(conversation.startTime) : 0;
  
  const summary = `📊 Resumo de Conversa:\n\nID: ${conversation.id}\nMensagens: ${messageCount}\nDuração: ${Math.round(duration / 1000)}s\nStatus: Finalizada\n\nInício: ${new Date(conversation.startTime).toLocaleString('pt-BR')}\nFim: ${new Date(conversation.endTime).toLocaleString('pt-BR')}`;
  
  console.log(`📄 Resumo de conversa: ${summary}`);
}

// Rota para limpar conversas antigas (manutenção)
app.delete('/api/chat/clean', (req, res) => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  const oldConversations = conversations.filter(c => 
    new Date(c.startTime) < oneDayAgo && c.status === 'ended'
  );
  
  conversations = conversations.filter(c => 
    !(new Date(c.startTime) < oneDayAgo && c.status === 'ended')
  );
  
  console.log(`🧹 Limpeza: ${oldConversations.length} conversas antigas removidas`);
  
  res.json({
    success: true,
    cleaned: oldConversations.length,
    remaining: conversations.length
  });
});

// Rota de status
app.get('/api/chat/status', (req, res) => {
  const activeConversations = conversations.filter(c => c.status === 'active').length;
  
  res.json({
    success: true,
    status: 'online',
    activeConversations,
    totalConversations: conversations.length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Chat API Error:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log('🤖 Chat API server running on port', PORT);
  console.log('📱 Local: http://localhost:' + PORT);
  console.log('🌍 Network: http://0.0.0.0:' + PORT);
  console.log('🌍 Environment: development');
});

module.exports = app;