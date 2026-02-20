import React, { useState } from 'react';

const ScheduleSystemSimple: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { id: 'installation', name: 'Instalação OpenClaw', price: 500 },
    { id: 'support', name: 'Suporte Premium 24/7', price: 200 },
    { id: 'development', name: 'Desenvolvimento Custom', price: 150 },
    { id: 'consulting', name: 'Consultoria Estratégica', price: 150 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Agendamento:', { selectedDate, selectedTime, selectedService });
  };

  if (isSubmitted) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        padding: '3rem',
        borderRadius: '16px',
        margin: '2rem 0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2>Agendamento Confirmado!</h2>
        <p>Sua consulta foi agendada com sucesso.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          style={{
            background: 'white',
            color: '#10b981',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Agendar Novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
      padding: '3rem',
      borderRadius: '16px',
      margin: '2rem 0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>📅 Agende sua Consulta</h2>
        <p>Escolha o serviço, data e horário que preferir</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Service Selection */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <h3>Escolha o Serviço</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {services.map(service => (
              <div 
                key={service.id}
                style={{
                  padding: '1rem',
                  border: selectedService === service.id ? '2px solid #6366f1' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedService(service.id)}
              >
                <div style={{ fontWeight: '600' }}>{service.name}</div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>R$ {service.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar and Form */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label>Data</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                  required
                />
              </div>
              
              <div>
                <label>Horário</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                  required
                >
                  <option value="">Selecione um horário</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                </select>
              </div>
              
              <div>
                <label>Nome</label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
              </div>
              
              <div>
                <label>Email</label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
              </div>
              
              <div>
                <label>Telefone</label>
                <input
                  type="tel"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                ✅ Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSystemSimple;