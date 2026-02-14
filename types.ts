export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  dosage: string;
  crops: string[];
  benefits: string[];
  packSize: string;
  price: number; // For estimation/display
  isFeatured: boolean;
  image: string;
}

export enum ProductCategory {
  FERTILIZER = 'Fertilizer',
  PESTICIDE = 'Pesticide',
  HERBICIDE = 'Herbicide',
  FUNGICIDE = 'Fungicide',
  GROWTH_PROMOTER = 'Growth Promoter',
  SEEDS = 'Seeds'
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AdminUser {
  isAuthenticated: boolean;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
  location: string;
}
