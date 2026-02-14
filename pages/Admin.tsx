import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../services/store';
import { Product, ProductCategory } from '../types';

const LoginView: React.FC = () => {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await loginAdmin(email, password);
    if (error) {
      setError(error.message || 'Invalid login credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
           <div className="bg-brand-50 inline-block p-3 rounded-full mb-4">
             <div className="h-8 w-8 text-brand-700 font-bold flex items-center justify-center">RM</div>
           </div>
           <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
           <p className="text-gray-500 text-sm">Sign in to manage inventory</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
              placeholder="admin@rmagrichem.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
              placeholder="••••••••"
            />
          </div>
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-900 text-white py-2.5 rounded-lg hover:bg-brand-800 font-medium transition-colors flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Login securely'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const Admin: React.FC = () => {
  const { isAdmin, logoutAdmin, products, addProduct, updateProduct, deleteProduct, isLoading } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const initialFormState = {
    title: '',
    category: ProductCategory.FERTILIZER,
    description: '',
    dosage: '',
    crops: '', 
    benefits: '', 
    packSize: '',
    price: 0,
    isFeatured: false,
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const openModal = (product?: Product) => {
    setSelectedFile(undefined);
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        crops: product.crops.join(', '),
        benefits: product.benefits.join(', ')
      });
      setPreviewUrl(product.image);
    } else {
      setEditingProduct(null);
      setFormData(initialFormState);
      setPreviewUrl('');
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const productData: any = {
      ...formData,
      crops: formData.crops.split(',').map(s => s.trim()).filter(Boolean),
      benefits: formData.benefits.split(',').map(s => s.trim()).filter(Boolean),
      price: Number(formData.price)
    };

    if (editingProduct) {
      productData.id = editingProduct.id;
      await updateProduct(productData, selectedFile);
    } else {
      // If no file selected for new product, use placeholder
      if (!selectedFile) productData.image = 'https://placehold.co/600x600?text=No+Image';
      await addProduct(productData, selectedFile);
    }
    
    setIsSaving(false);
    setIsModalOpen(false);
  };

  if (!isAdmin) return <LoginView />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-500 text-sm">Supabase Connected • {products.length} Products</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => logoutAdmin()} className="text-gray-500 hover:text-red-600 font-medium px-4 py-2">Logout</button>
             <button 
              onClick={() => openModal()}
              className="bg-brand-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all"
            >
              <Plus className="h-4 w-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex justify-center text-gray-400">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Info</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 mr-4 border border-gray-200">
                            <img className="h-full w-full object-cover" src={product.image} alt="" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{product.title}</div>
                            <div className="text-gray-500 text-xs mt-0.5">{product.isFeatured && <span className="text-amber-600 font-medium">★ Featured</span>}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>{product.packSize}</span>
                          <span className="text-xs text-gray-400">₹{product.price}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => openModal(product)} className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if(window.confirm('Delete this product?')) deleteProduct(product.id, product.image);
                            }} 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No products found. Click "Add Product" to start.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-6 w-6 text-gray-400" /></button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-6">
                
                {/* Image Upload */}
                <div className="flex items-center gap-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-32 w-32 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all overflow-hidden group relative"
                  >
                    {previewUrl ? (
                      <img src={previewUrl} className="h-full w-full object-cover" alt="Preview" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-gray-400 group-hover:text-brand-500 mb-2" />
                        <span className="text-xs text-gray-500 group-hover:text-brand-600">Upload Image</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-medium text-gray-900">Product Image</h4>
                     <p className="text-sm text-gray-500 mb-2">Supported formats: JPG, PNG. Max 5MB.</p>
                     <input 
                       type="file" 
                       ref={fileInputRef} 
                       onChange={handleFileChange} 
                       accept="image/*"
                       className="hidden" 
                     />
                     <button 
                       type="button" 
                       onClick={() => fileInputRef.current?.click()}
                       className="text-sm text-brand-600 font-semibold hover:underline"
                     >
                       Choose File
                     </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g. YieldMax 500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ProductCategory})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none">
                      {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                    <input type="text" required value={formData.dosage} onChange={e => setFormData({...formData, dosage: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pack Size</label>
                    <input type="text" required value={formData.packSize} onChange={e => setFormData({...formData, packSize: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (Estimate)</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crops (comma separated)</label>
                  <input type="text" value={formData.crops} onChange={e => setFormData({...formData, crops: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Wheat, Rice, Cotton" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (comma separated)</label>
                  <input type="text" value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Higher yield, Better roots" />
                </div>
                
                 <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                   <label className="flex items-center space-x-3 cursor-pointer">
                     <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-gray-300" />
                     <span className="text-sm font-medium text-gray-900">Mark as Featured Product</span>
                   </label>
                 </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-brand-900 text-white rounded-lg hover:bg-brand-800 font-medium shadow-lg shadow-brand-200 transition-colors flex items-center"
                  >
                    {isSaving ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};