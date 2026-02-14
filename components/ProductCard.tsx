import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../services/store';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {product.isFeatured && (
          <span className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Best Seller
          </span>
        )}
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-brand-600 mb-2 uppercase tracking-wider">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors line-clamp-1">{product.title}</h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
           <span className="text-gray-400 text-sm font-medium">{product.packSize}</span>
           <div className="flex space-x-2">
             <Link 
                to={`/product/${product.id}`}
                className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
             >
               <ArrowRight className="h-5 w-5" />
             </Link>
             <button 
                onClick={() => addToCart(product)}
                className="p-2 bg-brand-900 text-white rounded-full hover:bg-brand-700 shadow-md hover:shadow-lg transition-all"
             >
               <Plus className="h-5 w-5" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};