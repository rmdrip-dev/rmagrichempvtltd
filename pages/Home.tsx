import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Sprout } from 'lucide-react';
import { useStore } from '../services/store';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-551e5051d939?q=80&w=2664&auto=format&fit=crop" 
            alt="Lush green farm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 to-brand-900/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <div className="inline-block bg-brand-500/20 backdrop-blur-md border border-brand-500/30 px-4 py-2 rounded-full mb-6">
              <span className="text-brand-100 font-medium tracking-wide text-sm uppercase">Pioneering Sustainable Agriculture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Cultivating the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-green-200">Future of Farming</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
              RM Agrichem provides world-class fertilizers and crop protection solutions designed to maximize yield for modern farmers and deliver value for investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-full transition-all text-center shadow-lg shadow-brand-900/50 flex items-center justify-center gap-2">
                Explore Products <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full transition-all text-center">
                Investor Relations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RM Agrichem?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We combine advanced biotechnology with sustainable farming practices to deliver products that perform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: TrendingUp, title: "Yield Maximization", desc: "Scientifically formulated to boost crop output by up to 30%." },
              { icon: ShieldCheck, title: "Certified Quality", desc: "ISO 9001:2015 certified manufacturing processes ensure purity." },
              { icon: Sprout, title: "Eco-Friendly", desc: "Sustainable solutions that protect soil health for future generations." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:bg-brand-50 transition-colors duration-300 group border border-gray-100 hover:border-brand-100">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-500">Our best-selling solutions trusted by thousands of farmers.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center text-brand-600 font-semibold hover:text-brand-700">
              View All <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link to="/products" className="text-brand-600 font-semibold hover:text-brand-700 inline-flex items-center">
               View All Products <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to boost your harvest?</h2>
            <p className="text-brand-100 text-lg max-w-xl">Consult with our experts or browse our catalog to find the perfect solution for your crops.</p>
          </div>
          <div className="flex gap-4">
             <Link to="/products" className="px-8 py-3 bg-white text-brand-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
               Shop Now
             </Link>
             <Link to="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
               Contact Us
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};