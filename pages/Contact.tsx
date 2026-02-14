import React, { useState } from 'react';
import { MapPin, Phone, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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

    // REPLACE WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; 

    try {
      // Logic: Setup a Google Sheet -> Extensions -> Apps Script
      // Code:
      // function doPost(e) {
      //   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      //   var data = JSON.parse(e.postData.contents);
      //   sheet.appendRow([new Date(), data.name, data.email, data.phone, data.subject, data.message]);
      //   return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
      // }
      // Deploy as Web App -> Execute as Me -> Access: Anyone
      
      // Since we don't have a real URL, we mock the success for the UI demo
      // In production, uncomment the fetch below:
      
      /*
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      */

      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">We are here to help</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Get in Touch</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Have questions about our products or want to discuss a partnership? Reach out to our team of agricultural experts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="bg-brand-900 rounded-3xl p-10 text-white h-full relative overflow-hidden shadow-2xl">
               {/* Decorative Elements */}
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-800 rounded-full opacity-50 blur-2xl"></div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-700/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
               
               <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>
               
               <div className="space-y-8 relative z-10">
                 <div className="flex items-start space-x-4">
                   <div className="bg-white/10 p-3 rounded-lg">
                     <Phone className="h-6 w-6 text-brand-300" />
                   </div>
                   <div>
                     <p className="font-semibold text-lg">Phone & WhatsApp</p>
                     <p className="text-brand-100 mt-1">+{WHATSAPP_NUMBER}</p>
                     <p className="text-brand-200 text-sm mt-1">Mon-Sat, 9am - 6pm</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start space-x-4">
                   <div className="bg-white/10 p-3 rounded-lg">
                     <Mail className="h-6 w-6 text-brand-300" />
                   </div>
                   <div>
                     <p className="font-semibold text-lg">Email</p>
                     <p className="text-brand-100 mt-1">{CONTACT_EMAIL}</p>
                     <p className="text-brand-200 text-sm mt-1">For official enquiries</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                     <MapPin className="h-6 w-6 text-brand-300" />
                   </div>
                   <div>
                     <p className="font-semibold text-lg">Headquarters</p>
                     <p className="text-brand-100 mt-1">{COMPANY_ADDRESS}</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors outline-none bg-white"
                    placeholder="John Doe"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors outline-none bg-white"
                    placeholder="+91 98765 43210"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors outline-none bg-white"
                  placeholder="john@example.com"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors outline-none bg-white"
                  placeholder="Product Enquiry"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors outline-none bg-white"
                  placeholder="Tell us more about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-lg ${
                  status === 'success' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : status === 'error'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-200'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> Message Sent Successfully!
                  </>
                ) : status === 'error' ? (
                   <>
                    <AlertCircle className="mr-2 h-5 w-5" /> Failed. Try again.
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