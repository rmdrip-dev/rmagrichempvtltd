import React from 'react';
import { Target, Eye, Heart, User } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brand-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">About RM Agrichem</h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto">
            Driven by science, rooted in nature. We are committed to transforming agriculture through innovation and sustainable practices.
          </p>
        </div>
      </div>

      {/* Mission Vision Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the global leader in sustainable agricultural inputs, empowering every farmer to achieve maximum potential while preserving the earth.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality, research-backed agrochemicals that ensure food security and improve the livelihood of the farming community.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity in business, Quality in products, Innovation in approach, and Respect for nature are the pillars of our organization.
            </p>
          </div>
        </div>
      </div>

      {/* Board of Directors */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Board of Directors</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Rajesh Verma", role: "Chairman & Managing Director", img: "https://picsum.photos/seed/director1/400/400" },
              { name: "Ms. Anita Desai", role: "Director of Research", img: "https://picsum.photos/seed/director2/400/400" },
              { name: "Mr. Vikram Singh", role: "Director of Marketing", img: "https://picsum.photos/seed/director3/400/400" },
              { name: "Mrs. Sunita Rao", role: "Independent Director", img: "https://picsum.photos/seed/director4/400/400" }
            ].map((director, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={director.img} alt={director.name} className="w-full h-64 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{director.name}</h3>
                  <p className="text-brand-600 font-medium text-sm">{director.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Info */}
      <div className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Corporate Responsibility</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At RM Agrichem, we believe that true growth is inclusive. We actively invest in rural education programs 
          and conduct free soil testing camps across 15 states in India. Our manufacturing plants adhere to Zero Liquid Discharge (ZLD) norms, 
          reaffirming our commitment to the environment.
        </p>
      </div>
    </div>
  );
};