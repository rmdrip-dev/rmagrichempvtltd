import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, MessageCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useStore } from '../services/store';
import { WHATSAPP_NUMBER } from '../constants';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const generateWhatsAppLink = () => {
    const header = `Hello RM Agrichem! I am interested in the following products:\n\n`;
    const items = cart.map(item => `- *${item.title}* (${item.packSize}) x ${item.quantity}`).join('\n');
    const footer = `\n\nPlease provide me with a quotation and availability.`;
    
    const message = encodeURIComponent(header + items + footer);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Enquiry List is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any agricultural solutions yet.</p>
        <Link to="/products" className="px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Enquiry List</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{item.category} • {item.packSize}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-medium text-gray-900 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link to="/products" className="text-gray-500 hover:text-gray-900 font-medium flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" /> Add more products
              </Link>
              
              <a 
                href={generateWhatsAppLink()}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1"
              >
                <MessageCircle className="h-6 w-6" /> Send Enquiry via WhatsApp
              </a>
            </div>
            <p className="text-xs text-center sm:text-right mt-4 text-gray-400">
              * This will open WhatsApp with your product list pre-filled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};