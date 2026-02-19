const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../react-app/dist')));

// API routes
app.get('/api/services', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Instalação OpenClaw',
      description: 'Instalação profissional e configuração otimizada',
      icon: '🚀',
      features: [
        'Instalação completa e segura',
        'Configuração inicial otimizada',
        'Integração com sistemas existentes',
        'Configuração de segurança básica',
        'Testes funcionais e validação'
      ],
      pricing: 'R$ 500 - R$ 2.000'
    },
    {
      id: 2,
      title: 'Suporte Técnico',
      description: 'Suporte especializado 24/7 para sua equipe',
      icon: '🛠️',
      features: [
        'Suporte remoto dedicado',
        'Troubleshooting e diagnóstico',
        'Otimização de performance',
        'Atualizações de segurança',
        'Backup e recovery'
      ],
      pricing: 'R$ 200 - R$ 800/mês'
    },
    {
      id: 3,
      title: 'Desenvolvimento Customizado',
      description: 'Agentes e soluções sob medida para seu negócio',
      icon: '💻',
      features: [
        'Desenvolvimento de agentes custom',
        'Automação de workflows',
        'Integração com terceiros',
        'API development',
        'Plugin development'
      ],
      pricing: 'R$ 100 - R$ 200/hora'
    },
    {
      id: 4,
      title: 'Consultoria & Treinamento',
      description: 'Estratégia e capacitação da sua equipe',
      icon: '🎯',
      features: [
        'Assessments de maturidade',
        'Roadmap de implementação',
        'Treinamento da equipe',
        'Best practices',
        'Otimização de processos'
      ],
      pricing: 'R$ 150 - R$ 300/hora'
    }
  ]);
});

app.get('/api/contact', (req, res) => {
  res.json({
    email: 'contato@openclawservices.com',
    phone: '+55 (11) 91234-5678',
    linkedin: 'linkedin.com/company/openclaw-services'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, service, message } = req.body;
  
  // Log the contact form submission
  console.log('New contact form submission:', {
    name,
    email,
    service,
    message,
    timestamp: new Date().toISOString()
  });
  
  // Here you would typically save to a database and send an email
  res.json({ success: true, message: 'Form submitted successfully' });
});

// Handle React routing - return index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-app/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 OpenClaw Services server running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌍 Network: http://0.0.0.0:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;