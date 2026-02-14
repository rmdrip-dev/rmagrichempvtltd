import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ProductCategory } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isAdmin: boolean;
  isLoading: boolean;
  loginAdmin: (email: string, password: string) => Promise<{ error: any }>;
  logoutAdmin: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>, imageFile?: File) => Promise<{ error: any }>;
  updateProduct: (product: Product, imageFile?: File) => Promise<{ error: any }>;
  deleteProduct: (id: string, imageUrl: string) => Promise<{ error: any }>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Mock Auth Logic
  const loginAdmin = async (email: string, password: string) => {
    // Simple mock authentication
    if (email === 'admin@rmagrichem.com' && password === 'admin') {
      setIsAdmin(true);
      return { error: null };
    }
    return { error: { message: 'Invalid credentials. Try admin@rmagrichem.com / admin' } };
  };

  const logoutAdmin = async () => {
    setIsAdmin(false);
  };

  // Mock CRUD Logic
  const addProduct = async (product: Omit<Product, 'id'>, imageFile?: File) => {
    setIsLoading(true);
    let imageUrl = product.image;

    // Simulate image upload by creating a local object URL if a file is provided
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      image: imageUrl
    };

    setProducts(prev => [newProduct, ...prev]);
    setIsLoading(false);
    return { error: null };
  };

  const updateProduct = async (product: Product, imageFile?: File) => {
    setIsLoading(true);
    let imageUrl = product.image;

    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    setProducts(prev => prev.map(p => p.id === product.id ? { ...product, image: imageUrl } : p));
    setIsLoading(false);
    return { error: null };
  };

  const deleteProduct = async (id: string, imageUrl: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    return { error: null };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isAdmin,
        isLoading,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};