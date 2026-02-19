import React, { useState } from 'react';
import './ContactForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  company: string;
  message: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação de campos obrigatórios
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.service) {
      newErrors.service = 'Selecione um serviço';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Enviar para o backend
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      await response.json();
      
      // Log no console para tracking
      console.log('Formulário enviado:', {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });

      // Sucesso!
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        company: '',
        message: '',
        budget: '',
        timeline: ''
      });

      // Disparar webhook para WhatsApp (simulado)
      sendWhatsAppNotification(formData);

    } catch (error) {
      console.error('Erro no formulário:', error);
      setSubmitError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWhatsAppNotification = (data: FormData) => {
    // Simulação de envio de WhatsApp
    const message = `📢 Novo lead recebido!\n\nNome: ${data.name}\nEmail: ${data.email}\nTelefone: ${data.phone}\nEmpresa: ${data.company}\nServiço: ${data.service}\nOrçamento: ${data.budget}\nPrazo: ${data.timeline}\n\nMensagem: ${data.message}`;
    
    console.log('WhatsApp Message:', message);
    
    // Aqui você integraria com a API real do WhatsApp
    // Ex: Twilio API, WhatsApp Business API, etc.
  };

  const serviceOptions = [
    { value: 'installation', label: 'Instalação OpenClaw' },
    { value: 'support', label: 'Suporte Técnico 24/7' },
    { value: 'development', label: 'Desenvolvimento Customizado' },
    { value: 'consulting', label: 'Consultoria Estratégica' },
    { value: 'all', label: 'Todos os Serviços' }
  ];

  const budgetOptions = [
    { value: '500-2000', label: 'R$ 500 - R$ 2.000' },
    { value: '200-800', label: 'R$ 200 - R$ 800/mês' },
    { value: '100-200', label: 'R$ 100 - R$ 200/hora' },
    { value: '150-300', label: 'R$ 150 - R$ 300/hora' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Imediato' },
    { value: '1week', label: '1 semana' },
    { value: '1month', label: '1 mês' },
    { value: '3months', label: '3 meses' },
    { value: '6months', label: '6+ meses' }
  ];

  if (isSubmitted) {
    return (
      <div className="contact-success">
        <div className="success-icon">✅</div>
        <h2>Mensagem Enviada com Sucesso!</h2>
        <p>Obrigado, {formData.name}! Entraremos em contato em breve.</p>
        <div className="success-details">
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Telefone:</strong> {formData.phone}</p>
          <p><strong>Serviço:</strong> {serviceOptions.find(s => s.value === formData.service)?.label}</p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="btn secondary-btn"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h2>Solicite uma Consulta Gratuita</h2>
        <p>Preencha o formulário e nossa equipe entrará em contato em até 24 horas</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="João Silva"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Profissional *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="joao@empresa.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone com WhatsApp *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+55 (11) 91234-5678"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="company">Empresa</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Nome da Empresa"
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Serviço de Interesse *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={errors.service ? 'error' : ''}
            >
              <option value="">Selecione um serviço</option>
              {serviceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && <span className="error-message">{errors.service}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="budget">Orçamento Aproximado</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma faixa</option>
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeline">Prazo Desejado</label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
            >
              <option value="">Selecione um prazo</option>
              {timelineOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">Mensagem *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={errors.message ? 'error' : ''}
              rows={5}
              placeholder="Descreva seus objetivos, desafios e o que você espera alcançar com nossos serviços..."
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
        </div>

        {submitError && (
          <div className="form-error">
            {submitError}
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn primary-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>Enviando...</span>
                <div className="loading-spinner"></div>
              </>
            ) : (
              <>
                <span>📞 Enviar Mensagem</span>
                <div className="btn-shine"></div>
              </>
            )}
          </button>
          
          <div className="form-disclaimer">
            <p>✓ Sem compromisso</p>
            <p>✓ Resposta em até 24h</p>
            <p>✓ Suporte especializado</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;