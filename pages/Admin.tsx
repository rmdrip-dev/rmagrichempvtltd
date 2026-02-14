import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { useStore } from '../services/store';
import { Product, ProductCategory } from '../types';

// Mock Supabase Auth would go here
const LoginView: React.FC = () => {
  const { loginAdmin } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      loginAdmin();
    } else {
      setError('Invalid credentials (try admin/admin)');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Admin Dashboard</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-brand-900 text-white py-2 rounded-lg hover:bg-brand-800">Login</button>
        </form>
      </div>
    </div>
  );
};

export const Admin: React.FC = () => {
  const { isAdmin, logoutAdmin, products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const initialFormState = {
    title: '',
    category: ProductCategory.FERTILIZER,
    description: '',
    dosage: '',
    crops: '', // comma separated string for input
    benefits: '', // comma separated
    packSize: '',
    price: 0,
    isFeatured: false,
    image: 'https://picsum.photos/seed/new/600/600'
  };

  const [formData, setFormData] = useState(initialFormState);

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        crops: product.crops.join(', '),
        benefits: product.benefits.join(', ')
      });
    } else {
      setEditingProduct(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      crops: formData.crops.split(',').map(s => s.trim()),
      benefits: formData.benefits.split(',').map(s => s.trim())
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
  };

  if (!isAdmin) return <LoginView />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <div className="flex gap-4">
             <button onClick={logoutAdmin} className="text-gray-500 hover:text-red-500">Logout</button>
             <button 
              onClick={() => openModal()}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700"
            >
              <Plus className="h-4 w-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Pack Size</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover mr-3" src={product.image} alt="" />
                        <div>
                          <div className="font-medium text-gray-900">{product.title}</div>
                          <div className="text-gray-500 text-xs">{product.isFeatured ? 'Featured' : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.packSize}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button onClick={() => openModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-400" /></button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full mt-1 p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ProductCategory})} className="w-full mt-1 p-2 border rounded-lg">
                      {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full mt-1 p-2 border rounded-lg" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dosage</label>
                    <input type="text" required value={formData.dosage} onChange={e => setFormData({...formData, dosage: e.target.value})} className="w-full mt-1 p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pack Size</label>
                    <input type="text" required value={formData.packSize} onChange={e => setFormData({...formData, packSize: e.target.value})} className="w-full mt-1 p-2 border rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Crops (comma separated)</label>
                  <input type="text" value={formData.crops} onChange={e => setFormData({...formData, crops: e.target.value})} className="w-full mt-1 p-2 border rounded-lg" placeholder="Wheat, Rice, Cotton" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Benefits (comma separated)</label>
                  <input type="text" value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} className="w-full mt-1 p-2 border rounded-lg" placeholder="Higher yield, Better roots" />
                </div>
                
                 <div className="flex items-center space-x-4">
                   <label className="flex items-center space-x-2">
                     <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="rounded text-brand-600 focus:ring-brand-500" />
                     <span className="text-sm font-medium text-gray-700">Featured Product</span>
                   </label>
                 </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-900 text-white rounded-lg hover:bg-brand-800">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};