'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  User,
  Tag
} from 'lucide-react';

const InputGroup = ({ 
  label, 
  placeholder, 
  icon, 
  value,
  onChange, 
  type = "text", 
  minLength,
  required = true
}: { 
  label: string, 
  placeholder: string, 
  icon?: React.ReactNode, 
  value: string,
  onChange: (v: string) => void,
  type?: string,
  minLength?: number,
  required?: boolean
}) => {
  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    if (target.validity.valueMissing) {
      target.setCustomValidity(`${label} is required`);
    } else if (target.validity.tooShort) {
      target.setCustomValidity(`${label} must be at least ${minLength} characters`);
    } else if (target.validity.typeMismatch && type === 'email') {
      target.setCustomValidity("Please enter a valid email address");
    } else {
      target.setCustomValidity("");
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity("");
  };

  return (
    <div className="space-y-3">
      <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">{label}</label>
      <div className="relative group">
        {icon && React.cloneElement(icon as React.ReactElement<any>, { className: "absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#14B8A6] transition-colors" })}
        <input 
          required={required}
          type={type}
          minLength={minLength}
          onInvalid={handleInvalid}
          onInput={handleInput}
          value={value}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 ${icon ? 'pl-16' : 'px-8'} pr-8 py-5 text-[#1A2B3C] font-black placeholder:text-gray-200 focus:ring-4 focus:ring-[#14B8A6]/5 focus:border-[#14B8A6] outline-none transition-all`}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-[#14B8A6]/20 overflow-x-hidden pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-[#14B8A6]/10 px-6 py-2 rounded-full"
          >
            <Sparkles className="text-[#14B8A6] w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#14B8A6]">Get in Touch</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-[#1A2B3C]"
          >
            Contact <span className="italic font-light text-gray-400">Our Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Have a custom expedition in mind? Or need more details about our curated trips? We're here to guide your next discovery.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-[#1A2B3C] text-white flex items-center justify-center rounded-2xl group-hover:bg-[#14B8A6] transition-all duration-500 shadow-xl">
                  <Mail strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1A2B3C] mb-2">Email Base</h3>
                  <p className="text-gray-400 font-light">expeditions@360explorers.com</p>
                  <p className="text-gray-400 font-light">support@360explorers.com</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-[#1A2B3C] text-white flex items-center justify-center rounded-2xl group-hover:bg-[#14B8A6] transition-all duration-500 shadow-xl">
                  <Phone strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1A2B3C] mb-2">Satellite Link</h3>
                  <p className="text-gray-400 font-light">+91 98765 43210</p>
                  <p className="text-gray-400 font-light">+91 12345 67890</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-[#1A2B3C] text-white flex items-center justify-center rounded-2xl group-hover:bg-[#14B8A6] transition-all duration-500 shadow-xl">
                  <MapPin strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1A2B3C] mb-2">Command Center</h3>
                  <p className="text-gray-400 font-light">123 Adventure Way, Himalayan Base</p>
                  <p className="text-gray-400 font-light">Uttarakhand, India - 248001</p>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold">Expedition Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Monday - Friday</span>
                  <span className="text-[#1A2B3C] font-black">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Saturday - Sunday</span>
                  <span className="text-[#14B8A6] font-black italic">24/7 Support Only</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FDFBF7] border border-gray-100 p-10 md:p-14 shadow-2xl space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-[#14B8A6]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight uppercase">Transmission</h2>
                  <p className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase">Secure end-to-end communication</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InputGroup 
                    label="Full Name" 
                    placeholder="e.g. John Doe" 
                    icon={<User />}
                    minLength={2}
                    value={formData.fullName}
                    onChange={(v) => setFormData({...formData, fullName: v})}
                  />
                  <InputGroup 
                    label="Email Address" 
                    type="email"
                    placeholder="john@360explorers.com" 
                    icon={<Mail />}
                    value={formData.email}
                    onChange={(v) => setFormData({...formData, email: v})}
                  />
                  <InputGroup 
                    label="Phone Number" 
                    type="tel"
                    placeholder="+91 00000 00000" 
                    icon={<Phone />}
                    value={formData.phone}
                    onChange={(v) => setFormData({...formData, phone: v})}
                  />
                  <InputGroup 
                    label="Subject" 
                    placeholder="Expedition Inquiry" 
                    icon={<Tag />}
                    minLength={2}
                    value={formData.subject}
                    onChange={(v) => setFormData({...formData, subject: v})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Message</label>
                  <textarea 
                    required
                    minLength={10}
                    placeholder="Tell us about your next adventure..."
                    value={formData.message}
                    className="w-full bg-white border border-gray-200 px-8 py-5 text-[#1A2B3C] font-black placeholder:text-gray-200 focus:ring-4 focus:ring-[#14B8A6]/5 focus:border-[#14B8A6] outline-none transition-all min-h-[200px] resize-none"
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setFormData({...formData, message: e.target.value});
                    }}
                    onInvalid={(e) => {
                      const target = e.currentTarget;
                      if (target.validity.valueMissing) target.setCustomValidity("Message is required");
                      else if (target.validity.tooShort) target.setCustomValidity("Message must be at least 10 characters");
                    }}
                  />
                </div>

                <div className="pt-6">
                  <button 
                    disabled={status === 'submitting'}
                    type="submit"
                    className={`w-full bg-[#1A2B3C] text-white px-10 py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-[#14B8A6] transition-all flex items-center justify-center gap-4 group shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {status === 'submitting' ? 'Transmitting...' : 'Send Transmission'}
                    <Send className={`w-5 h-5 transition-transform ${status === 'submitting' ? '' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-center gap-4 text-green-700"
                    >
                      <CheckCircle2 className="flex-shrink-0" />
                      <p className="text-sm font-bold">Transmission successful! Our team will get back to you shortly.</p>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-700"
                    >
                      <AlertCircle className="flex-shrink-0" />
                      <p className="text-sm font-bold">{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
