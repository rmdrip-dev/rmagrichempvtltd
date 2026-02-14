import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../services/store';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

export const Products: React.FC = () => {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-500">Scientific solutions for every stage of crop growth.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products, crops, pests..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button 
            className="lg:hidden flex items-center gap-2 text-gray-600 font-medium"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" /> Filters
          </button>

          {/* Categories (Desktop) */}
          <div className="hidden lg:flex gap-2 flex-wrap justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-900 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="lg:hidden mb-6 bg-white p-4 rounded-xl border border-gray-100 animate-in slide-in-from-top-4">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-semibold text-gray-900">Categories</h3>
               <button onClick={() => setShowFilters(false)}><X className="h-5 w-5 text-gray-400" /></button>
             </div>
             <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      selectedCategory === cat 
                        ? 'bg-brand-900 text-white border-brand-900' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or category.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 text-brand-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};