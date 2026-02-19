import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'typing' | 'quickReply' | 'suggestion';
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick replies iniciais
  const initialQuickReplies: QuickReply[] = [
    { id: '1', text: 'Instalação OpenClaw', action: 'installation' },
    { id: '2', text: 'Suporte 24/7', action: 'support' },
    { id: '3', text: 'Desenvolvimento', action: 'development' },
    { id: '4', text: 'Orçamento', action: 'budget' }
  ];

  const quickReplies: QuickReply[] = [
    { id: '5', text: 'Horários de atendimento', action: 'hours' },
    { id: '6', text: 'Formas de pagamento', action: 'payment' },
    { id: '7', text: 'Cases de sucesso', action: 'cases' },
    { id: '8', text: 'Falar com humano', action: 'human' }
  ];

  // Auto-scroll para o final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Inicializar chat
  const startChat = () => {
    setIsOpen(true);
    
    // Mensagem de boas-vindas
    const welcomeMessage: Message = {
      id: '1',
      text: 'Olá! 👋 Sou o assistente virtual do OpenClaw Services. Em que posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages([welcomeMessage]);
  };

  // Enviar mensagem
  const sendMessage = (text: string, action?: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular resposta do bot
    setTimeout(() => {
      handleBotResponse(text, action);
    }, 1000 + Math.random() * 1000); // 1-2 segundos de "digitação"
  };

  // Respostas do bot baseadas na ação
  const handleBotResponse = (userInput: string, action?: string) => {
    let botResponse: Message;
    let followUpReplies: QuickReply[] = [];

    switch (action) {
      case 'installation':
        botResponse = {
          id: Date.now().toString(),
          text: '🚀 Ótima escolha! A instalação OpenClaw inclui:\n\n✓ Configuração segura e otimizada\n✓ Integração com seus sistemas existentes\n✓ Treinamento básico da equipe\n✓ Suporte pós-instalação\n\nQual o porte da sua empresa para eu dar um orçamento mais preciso?',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        followUpReplies = [
          { id: '9', text: 'Pequena empresa (1-10 funcionários)', action: 'small' },
          { id: '10', text: 'Média empresa (11-50 funcionários)', action: 'medium' },
          { id: '11', text: 'Grande empresa (50+ funcionários)', action: 'large' }
        ];
        break;

      case 'support':
        botResponse = {
          id: Date.now().toString(),
          text: '🛠️ Nosso suporte 24/7 é premium! Inclui:\n\n✓ Atendimento prioritário\n✓ Monitoramento contínuo\n✓ Updates de segurança\n✓ Backup automático\n✓ SLA garantido\n\nVocê já tem suporte atualmente? Posso te mostrar como podemos melhorar!',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        followUpReplies = [
          { id: '12', text: 'Preciso de suporte agora', action: 'need_support' },
          { id: '13', text: 'Comparar planos', action: 'compare_plans' },
          { id: '14', text: 'Ver casos de sucesso', action: 'success_cases' }
        ];
        break;

      case 'development':
        botResponse = {
          id: Date.now().toString(),
          text: '💻 Desenvolvimento customizado é nossa especialidade! Podemos criar:\n\n✓ Agentes sob medida\n✓ Automação de workflows\n✓ Integração com APIs\n✓ Plugins personalizados\n✓ Dashboards customizados\n\nQual tipo de solução você precisa?',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        followUpReplies = [
          { id: '15', text: 'Automação de tarefas', action: 'automation' },
          { id: '16', text: 'Integração de sistemas', action: 'integration' },
          { id: '17', text: 'Dashboard personalizado', action: 'dashboard' }
        ];
        break;

      case 'budget':
        botResponse = {
          id: Date.now().toString(),
          text: '💰 Vamos calcular seu orçamento!\n\nNossos planos:\n\n🚀 **Instalação**: R$ 500 - R$ 2.000\n🛠️ **Suporte**: R$ 200 - R$ 800/mês\n💻 **Desenvolvimento**: R$ 100 - R$ 200/hora\n🎯 **Consultoria**: R$ 150 - R$ 300/hora\n\nQual serviço você mais precisa?',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        followUpReplies = initialQuickReplies;
        break;

      default:
        // Resposta baseada no texto do usuário
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('preço') || lowerInput.includes('valor') || lowerInput.includes('custo')) {
          botResponse = {
            id: Date.now().toString(),
            text: '💰 Os preços variam conforme o tamanho da sua necessidade:\n\n🚀 **Instalação**: R$ 500 - R$ 2.000\n🛠️ **Suporte**: R$ 200 - R$ 800/mês\n💻 **Desenvolvimento**: R$ 100 - R$ 200/hora\n🎯 **Consultoria**: R$ 150 - R$ 300/hora\n\nPosso enviar uma proposta detalhada?',
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          };
        } else if (lowerInput.includes('horário') || lowerInput.includes('atendimento')) {
          botResponse = {
            id: Date.now().toString(),
            text: '🕐 Nosso atendimento é:\n\n📞 **Telefone**: 24/7 para clientes ativos\n💬 **Chat**: Segunda a Sexta, 9h-18h\n📧 **Email**: Resposta em até 24h\n🌐 **WhatsApp**: +55 (11) 91234-5678\n\nPrecisa de ajuda agora?',
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          };
        } else if (lowerInput.includes('humano') || lowerInput.includes('falar pessoa')) {
          botResponse = {
            id: Date.now().toString(),
            text: '👋 Com certeza! Vou te conectar com um especialista agora mesmo.\n\n📞 **Ligue para**: +55 (11) 91234-5678\n💬 **WhatsApp**: +55 (11) 91234-5678\n📧 **Email**: contato@openclawservices.com\n\nQual é a sua urgência?',
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          };
        } else {
          botResponse = {
            id: Date.now().toString(),
            text: 'Entendi! Estou aqui para ajudar com tudo relacionado ao OpenClaw. Posso te ajudar com:\n\n🚀 Instalação profissional\n🛠️ Suporte 24/7\n💻 Desenvolvimento customizado\n🎯 Consultoria estratégica\n\nEm qual área você precisa de ajuda?',
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          };
        }
        break;
    }

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);

    // Adicionar quick replies se houver
    if (followUpReplies.length > 0) {
      setTimeout(() => {
        const suggestionMessage: Message = {
          id: Date.now().toString(),
          text: '',
          sender: 'bot',
          timestamp: new Date(),
          type: 'suggestion'
        };
        setMessages(prev => [...prev, suggestionMessage]);
      }, 500);
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.text, reply.action);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getQuickReplies = () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.sender !== 'bot') return [];

    // Retorna quick replies baseadas na última mensagem do bot
    if (lastMessage.text.includes('porte da sua empresa')) {
      return [
        { id: '9', text: 'Pequena empresa (1-10 funcionários)', action: 'small' },
        { id: '10', text: 'Média empresa (11-50 funcionários)', action: 'medium' },
        { id: '11', text: 'Grande empresa (50+ funcionários)', action: 'large' }
      ];
    }

    if (lastMessage.text.includes('tipo de solução')) {
      return [
        { id: '15', text: 'Automação de tarefas', action: 'automation' },
        { id: '16', text: 'Integração de sistemas', action: 'integration' },
        { id: '17', text: 'Dashboard personalizado', action: 'dashboard' }
      ];
    }

    if (lastMessage.text.includes('qual serviço')) {
      return initialQuickReplies;
    }

    return quickReplies;
  };

  const currentQuickReplies = getQuickReplies();

  return (
    <div className="chat-widget">
      {/* Botão de chat */}
      {!isOpen && (
        <button 
          className="chat-button"
          onClick={startChat}
        >
          <span className="chat-icon">💬</span>
          <span className="chat-badge">Online</span>
        </button>
      )}

      {/* Janela de chat */}
      {isOpen && (
        <div className="chat-window">
          {/* Cabeçalho */}
          <div className="chat-header">
            <div className="chat-avatar">
              <span className="avatar-icon">🤖</span>
            </div>
            <div className="chat-info">
              <h3>Assistente OpenClaw</h3>
              <div className="chat-status">
                <span className="status-dot"></span>
                <span>Online • Resposta rápida</span>
              </div>
            </div>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Área de mensagens */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
              >
                <div className="message-content">
                  {message.type === 'suggestion' && currentQuickReplies.length > 0 && (
                    <div className="quick-replies">
                      {currentQuickReplies.map((reply) => (
                        <button
                          key={reply.id}
                          className="quick-reply-btn"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {message.type !== 'suggestion' && (
                    <div className="message-text">
                      {message.text}
                    </div>
                  )}
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              disabled={isTyping}
            />
            <button 
              className="send-button"
              onClick={() => sendMessage(inputText)}
              disabled={isTyping || !inputText.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;