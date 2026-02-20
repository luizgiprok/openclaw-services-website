import ScheduleSystem from './components/ScheduleSystemSimple';

function App() {
  return (
    <div>
      <h1>🚀 OpenClaw Services</h1>
      <p>Se você está vendo esta página, o acesso externo está funcionando!</p>
      
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem',
        margin: '2rem 0',
        borderRadius: '16px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2>🚀 Área do Cliente</h2>
        <p>Esta é a sua área personalizada!</p>
        <button style={{
          background: 'white',
          color: '#667eea',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '1rem'
        }}>
          Acessar Dashboard
        </button>
      </div>
      
      <div style={{
        background: '#f8fafc',
        padding: '2rem',
        borderRadius: '16px',
        margin: '2rem 0'
      }}>
        <h3>📋 Informações de Acesso:</h3>
        <p><strong>Acesso Local:</strong> http://localhost:5173</p>
        <p><strong>Acesso Externo:</strong> http://91.180.81.125:5173</p>
        <p><strong>Status:</strong> ✅ Online e funcionando</p>
        <p><strong>Data:</strong> 19/02/2026</p>
      </div>

      {/* Sistema de Agendamento */}
      <ScheduleSystem />
    </div>
  );
}

export default App;