import React, { useState } from 'react';
import './CustomerArea.css';

const CustomerArea: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simulação de validação
    setTimeout(() => {
      if (loginData.email === 'joao@empresa.com' && loginData.password === '123456') {
        setIsLoggedIn(true);
        setShowLogin(false);
        console.log('✅ Login realizado com sucesso');
      } else {
        setLoginError('Email ou senha incorretos');
        console.log('❌ Falha no login');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true);
    setLoginData({ email: '', password: '' });
    console.log('👋 Logout realizado');
  };

  if (!showLogin) {
    return (
      <div className="customer-area-main">
        <div className="customer-header">
          <div className="header-content">
            <h1>Área do Cliente</h1>
            <div className="user-info">
              <span className="user-avatar">👤</span>
              <div className="user-details">
                <div className="user-name">João Silva</div>
                <div className="user-company">Tech Solutions Ltda</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Sair
            </button>
          </div>
        </div>

        <div className="customer-dashboard">
          <div className="dashboard-header">
            <h2>Bem-vindo de volta!</h2>
            <p>Aqui está o resumo da sua conta e atividades recentes</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <div className="stat-number">3</div>
                <div className="stat-label">Ordens de Serviço</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎫</div>
              <div className="stat-content">
                <div className="stat-number">2</div>
                <div className="stat-label">Tickets de Suporte</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <div className="stat-number">R$ 5.700</div>
                <div className="stat-label">Valor Total Faturado</div>
              </div>
            </div>
          </div>

          <div className="dashboard-actions">
            <div className="action-section">
              <h3>Ordens Recentes</h3>
              <div className="orders-list">
                <div className="order-item">
                  <div className="order-title">Instalação OpenClaw Pro</div>
                  <div className="order-status">Em Progresso</div>
                  <div className="order-meta">👤 Carlos Mendes • 📅 25/01/2024</div>
                </div>
                <div className="order-item">
                  <div className="order-title">Desenvolvimento Agente Custom</div>
                  <div className="order-status">Pendente</div>
                  <div className="order-meta">👤 Ana Paula • 📅 01/02/2024</div>
                </div>
              </div>
            </div>

            <div className="action-section">
              <h3>Ações Rápidas</h3>
              <div className="quick-actions">
                <button className="action-btn">📋 Nova Ordem</button>
                <button className="action-btn">🎫 Novo Ticket</button>
                <button className="action-btn">💻 Dashboard</button>
                <button className="action-btn">⚙️ Configurações</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-area-login">
      <div className="login-container">
        <div className="login-header">
          <div className="login-avatar">
            <span className="avatar-icon">🔐</span>
          </div>
          <h2>Área do Cliente</h2>
          <p>Acesse seu painel personalizado</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              placeholder="joao@empresa.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              placeholder="Digite sua senha"
              required
            />
          </div>
          
          {loginError && (
            <div className="login-error">
              {loginError}
            </div>
          )}
          
          <button 
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span>Acessando...</span>
                <div className="loading-spinner"></div>
              </>
            ) : (
              <>
                <span>🔑 Acessar Área</span>
                <div className="btn-shine"></div>
              </>
            )}
          </button>
        </form>
        
        <div className="login-demo">
          <h3>Conta de Demonstração</h3>
          <p>📧 Email: joao@empresa.com</p>
          <p>🔑 Senha: 123456</p>
          <p className="demo-note">Use estas credenciais para acessar a área do cliente</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerArea;