import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'f68faf4a-2c68-41d3-af62-81bd1842d9b5',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `Nova mensagem de contato de ${formData.name}`,
          from_name: 'Portfólio Contato'
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResponseMsg('Mensagem enviada com sucesso! Em breve entrarei em contato.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Ocorreu um erro ao enviar a mensagem. Tente novamente.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('Falha de conexão. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="bg-brand-bg border border-brand-line p-6 md:p-8 space-y-6">
      <div className="space-y-1">
        <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted">
          Envie uma Mensagem
        </h3>
        <p className="text-sm text-brand-ink font-semibold">
          Preencha o formulário abaixo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-brand-muted">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            className="w-full px-4 py-3 bg-transparent border border-brand-line text-sm text-brand-ink focus:outline-none focus:border-brand-ink transition-colors placeholder:text-brand-muted/50 font-sans"
          />
        </div>

        {/* Grid for Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-brand-muted">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-transparent border border-brand-line text-sm text-brand-ink focus:outline-none focus:border-brand-ink transition-colors placeholder:text-brand-muted/50 font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-brand-muted">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(19) 99999-9999"
              className="w-full px-4 py-3 bg-transparent border border-brand-line text-sm text-brand-ink focus:outline-none focus:border-brand-ink transition-colors placeholder:text-brand-muted/50 font-sans"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-brand-muted">
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Como posso te ajudar?"
            className="w-full px-4 py-3 bg-transparent border border-brand-line text-sm text-brand-ink focus:outline-none focus:border-brand-ink transition-colors placeholder:text-brand-muted/50 font-sans resize-none"
          />
        </div>

        {/* Feedback Messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
            <span>{responseMsg}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs font-mono">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{responseMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-brand-ink text-brand-bg font-mono text-xs uppercase tracking-[0.2em] hover:invert transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Enviar Mensagem</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
