import React, { useState } from 'react';
import { MapPin, Phone, Mail, Loader2, CheckCircle } from 'lucide-react';
import { COMPANY_ADDRESS, CONTACT_EMAIL, WHATSAPP_NUMBER } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate Google Apps Script Web App submission
    // In production, fetch('YOUR_GOOGLE_SCRIPT_URL', { method: 'POST', body: JSON.stringify(formData) })
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-500">We'd love to hear from you. Our team is always here to chat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="bg-brand-900 rounded-2xl p-10 text-white h-full relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-800 rounded-full opacity-50"></div>
               
               <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
               
               <div className="space-y-8 relative z-10">
                 <div className="flex items-start space-x-4">
                   <Phone className="h-6 w-6 text-brand-300" />
                   <div>
                     <p className="font-semibold text-lg">Phone</p>
                     <p className="text-brand-100">+{WHATSAPP_NUMBER}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start space-x-4">
                   <Mail className="h-6 w-6 text-brand-300" />
                   <div>
                     <p className="font-semibold text-lg">Email</p>
                     <p className="text-brand-100">{CONTACT_EMAIL}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start space-x-4">
                   <MapPin className="h-6 w-6 text-brand-300" />
                   <div>
                     <p className="font-semibold text-lg">Office</p>
                     <p className="text-brand-100">{COMPANY_ADDRESS}</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-brand-600 text-white font-bold py-4 rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> Message Sent!
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};