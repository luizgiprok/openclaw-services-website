import React, { useState } from 'react';
import './ScheduleSystem.css';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface ScheduleData {
  selectedDate: string;
  selectedTime: string;
  selectedService: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

const ScheduleSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    selectedDate: '',
    selectedTime: '',
    selectedService: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock data for services
  const services: Service[] = [
    {
      id: 'installation',
      name: 'Instalação OpenClaw',
      duration: 120,
      price: 500,
      description: 'Instalação profissional e configuração completa'
    },
    {
      id: 'support',
      name: 'Suporte Premium 24/7',
      duration: 60,
      price: 200,
      description: 'Suporte técnico prioritário'
    },
    {
      id: 'development',
      name: 'Desenvolvimento Custom',
      duration: 90,
      price: 150,
      description: 'Desenvolvimento de agentes personalizados'
    },
    {
      id: 'consulting',
      name: 'Consultoria Estratégica',
      duration: 60,
      price: 150,
      description: 'Análise e planejamento estratégico'
    }
  ];

  // Generate time slots
  const generateTimeSlots = (date: string) => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          id: `${date}-${time}`,
          time,
          available: Math.random() > 0.3 // Mock availability
        });
      }
    }
    
    setTimeSlots(slots);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    generateTimeSlots(date);
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle form input changes
  const handleInputChange = (field: keyof ScheduleData, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Agendamento enviado:', {
        ...scheduleData,
        service: services.find(s => s.id === selectedService),
        timestamp: new Date().toISOString()
      });
      
      // Send confirmation (simulated)
      sendConfirmationEmail(scheduleData);
      
      setIsSubmitted(true);
      
      // Reset form
      setScheduleData({
        selectedDate: '',
        selectedTime: '',
        selectedService: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: ''
      });
      setSelectedDate('');
      setSelectedTime('');
      setSelectedService('');
      
    } catch (error) {
      console.error('Erro no agendamento:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send confirmation email (simulated)
  const sendConfirmationEmail = (data: ScheduleData) => {
    const service = services.find(s => s.id === data.selectedService);
    const message = `📅 Confirmação de Agendamento
    
Nome: ${data.customerName}
Email: ${data.customerEmail}
Telefone: ${data.customerPhone}

Serviço: ${service?.name}
Data: ${formatDate(data.selectedDate)}
Horário: ${data.selectedTime}
Valor: R$ ${service?.price}

Observações: ${data.notes}

Obrigado por agendar com a OpenClaw Services!
    
Data: ${new Date().toLocaleDateString('pt-BR')}`;
    
    console.log('Email de confirmação:', message);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get selected service
  const getSelectedService = () => {
    return services.find(s => s.id === selectedService);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = date.getTime() < today.setHours(0, 0, 0, 0);
      
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleDateString('pt-BR', { month: 'short' }),
        weekday: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        isWeekend,
        isPast
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="schedule-system">
      <div className="schedule-container">
        <div className="schedule-header">
          <h2>📅 Agende sua Consulta</h2>
          <p>Escolha o serviço, data e horário que preferir</p>
        </div>

        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Agendamento Confirmado!</h3>
            <p>Sua consulta foi agendada com sucesso.</p>
            <p>Enviamos um email de confirmação para seu email.</p>
            <button 
              className="btn primary-btn"
              onClick={() => setIsSubmitted(false)}
            >
              Agendar Novamente
            </button>
          </div>
        ) : (
          <div className="schedule-content">
            {/* Service Selection */}
            <div className="service-selection">
              <h3>Escolha o Serviço</h3>
              <div className="services-grid">
                {services.map(service => (
                  <div 
                    key={service.id}
                    className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="service-icon">🎯</div>
                    <div className="service-info">
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                      <div className="service-meta">
                        <span>⏱️ {service.duration} min</span>
                        <span>💰 R$ {service.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar and Time Selection */}
            <div className="schedule-form">
              <div className="form-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
                  onClick={() => setActiveTab('calendar')}
                >
                  📅 Calendário
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                  onClick={() => setActiveTab('form')}
                  disabled={!selectedDate || !selectedTime || !selectedService}
                >
                  📝 Dados
                </button>
              </div>

              {activeTab === 'calendar' && (
                <div className="calendar-section">
                  <div className="calendar">
                    <div className="calendar-header">
                      <h4>Selecione a Data</h4>
                    </div>
                    <div className="calendar-grid">
                      {calendarDays.map(day => (
                        <div
                          key={day.date}
                          className={`calendar-day ${
                            selectedDate === day.date ? 'selected' : ''
                          } ${
                            day.isWeekend ? 'weekend' : ''
                          } ${
                            day.isPast ? 'past' : ''
                          }`}
                          onClick={() => !day.isPast && handleDateSelect(day.date)}
                        >
                          <div className="day-number">{day.day}</div>
                          <div className="day-month">{day.month}</div>
                          <div className="day-week">{day.weekday}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="time-slots">
                      <h4>Selecione o Horário</h4>
                      <div className="time-grid">
                        {timeSlots.map(slot => (
                          <button
                            key={slot.id}
                            className={`time-slot ${
                              selectedTime === slot.time ? 'selected' : ''
                            } ${
                              !slot.available ? 'unavailable' : ''
                            }`}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'form' && (
                <div className="customer-form">
                  <h4>Informações do Cliente</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nome Completo *</label>
                        <input
                          type="text"
                          value={scheduleData.customerName}
                          onChange={(e) => handleInputChange('customerName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          value={scheduleData.customerEmail}
                          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Telefone *</label>
                        <input
                          type="tel"
                          value={scheduleData.customerPhone}
                          onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                          placeholder="+55 (11) 91234-5678"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Observações</label>
                        <textarea
                          value={scheduleData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Informações adicionais sobre sua necessidade..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="booking-summary">
                      <h4>Resumo do Agendamento</h4>
                      <div className="summary-item">
                        <span>Serviço:</span>
                        <span>{getSelectedService()?.name}</span>
                      </div>
                      <div className="summary-item">
                        <span>Data:</span>
                        <span>{formatDate(selectedDate)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Horário:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="summary-item total">
                        <span>Valor:</span>
                        <span>R$ {getSelectedService()?.price}</span>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="btn primary-btn large"
                      disabled={isLoading || !scheduleData.customerName || !scheduleData.customerEmail || !scheduleData.customerPhone}
                    >
                      {isLoading ? (
                        <>
                          <span>Agendando...</span>
                          <div className="loading-spinner"></div>
                        </>
                      ) : (
                        <>
                          <span>✅ Confirmar Agendamento</span>
                          <div className="btn-shine"></div>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSystem;