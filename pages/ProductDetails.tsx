import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sprout, Beaker, Shield, ShoppingCart } from 'lucide-react';
import { useStore } from '../services/store';
import { Product } from '../types';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) setProduct(found);
    else navigate('/products');
  }, [id, products, navigate]);

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Side */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Side */}
          <div>
            <div className="mb-2">
              <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex items-start">
                   <Beaker className="h-6 w-6 text-brand-500 mt-1 mr-3" />
                   <div>
                     <h4 className="font-semibold text-gray-900">Dosage</h4>
                     <p className="text-sm text-gray-600">{product.dosage}</p>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <Shield className="h-6 w-6 text-brand-500 mt-1 mr-3" />
                   <div>
                     <h4 className="font-semibold text-gray-900">Pack Size</h4>
                     <p className="text-sm text-gray-600">{product.packSize}</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Sprout className="h-5 w-5 text-brand-500 mr-2" /> Key Benefits
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Target Crops</h3>
              <div className="flex flex-wrap gap-2">
                {product.crops.map((crop, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 border-t border-gray-100 pt-8">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-brand-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20"
              >
                <ShoppingCart className="h-5 w-5" /> Add to Enquiry List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};