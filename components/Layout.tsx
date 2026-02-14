import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Microscope, Leaf, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../services/store';
import { AIChat } from './AIChat';
import { WHATSAPP_NUMBER } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useStore();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-900 font-bold border-b-2 border-brand-500' : 'text-gray-600 hover:text-brand-700 font-medium transition-colors';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-brand-900 text-white text-xs py-2 px-4 text-center tracking-wide">
        Call Us: +{WHATSAPP_NUMBER} | Pioneer in Sustainable Agriculture
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative">
                 <div className="text-brand-900 group-hover:scale-105 transition-transform duration-300">
                   <Microscope className="h-10 w-10" strokeWidth={1.5} />
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                   <Leaf className="h-5 w-5 text-brand-500 fill-brand-100" />
                 </div>
              </div>
              <div className="ml-3 flex flex-col justify-center">
                <span className="text-2xl font-bold text-brand-900 leading-none tracking-tight">RM</span>
                <span className="text-[10px] font-bold text-brand-500 tracking-[0.2em] uppercase mt-0.5">Agrichem</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/about" className={isActive('/about')}>About Us</Link>
              <Link to="/products" className={isActive('/products')}>Products</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact Us</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
               <Link to="/cart" className="relative p-2 text-gray-600 hover:text-brand-700 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-lg font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-lg font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50">About Us</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-lg font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50">Products</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-lg font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50">Contact Us</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute left-14 bg-white text-gray-800 px-3 py-1 rounded shadow-md text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          Chat with us
        </div>
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* AI Chat Widget */}
      <AIChat />

      {/* Footer */}
      <footer className="bg-brand-950 text-white pt-16 pb-8 border-t-4 border-brand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-white p-1.5 rounded-lg">
                  <Leaf className="h-6 w-6 text-brand-900" />
                </div>
                <h3 className="text-2xl font-bold">RM Agrichem</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner in high-quality agrochemical solutions. 
                Nurturing growth and empowering farmers with science-backed products.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-brand-500">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Story & Board</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Our Products</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Investor Relations</Link></li>
                <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-brand-500">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5 mt-1 shrink-0" />
                  <span>123 Green Valley, Agri Tech Park,<br />New Delhi, India</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-5 w-5 shrink-0" />
                  <span>+91 987 654 3210</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-5 w-5 shrink-0" />
                  <span>info@rmagrichem.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-900 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} RM Agrichem Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};