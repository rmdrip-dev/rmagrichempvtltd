import { Product, ProductCategory } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'GrowMax Yield Booster',
    category: ProductCategory.FERTILIZER,
    description: 'A premium liquid fertilizer designed to maximize crop yield by enhancing nutrient absorption.',
    dosage: '2-3 ml per liter of water',
    crops: ['Wheat', 'Rice', 'Corn', 'Soybean'],
    benefits: ['Increases root development', 'Boosts flowering', 'Enhances stress resistance'],
    packSize: '1L',
    price: 1200,
    isFeatured: true,
    image: 'https://picsum.photos/seed/agri1/600/600'
  },
  {
    id: '2',
    title: 'PestControl Pro',
    category: ProductCategory.PESTICIDE,
    description: 'Broad-spectrum insecticide for controlling aphids, thrips, and whiteflies effectively.',
    dosage: '1.5 ml per liter',
    crops: ['Cotton', 'Vegetables', 'Fruits'],
    benefits: ['Quick knockdown effect', 'Long-lasting protection', 'Rainfast in 2 hours'],
    packSize: '500ml',
    price: 850,
    isFeatured: true,
    image: 'https://picsum.photos/seed/pest2/600/600'
  },
  {
    id: '3',
    title: 'RootKing Humic Acid',
    category: ProductCategory.GROWTH_PROMOTER,
    description: 'Concentrated humic acid to improve soil structure and nutrient uptake.',
    dosage: '5kg per acre (Soil Application)',
    crops: ['All Crops'],
    benefits: ['Improves soil aeration', 'Increases water holding capacity', 'Stimulates microbial activity'],
    packSize: '1kg',
    price: 450,
    isFeatured: false,
    image: 'https://picsum.photos/seed/soil3/600/600'
  },
  {
    id: '4',
    title: 'WeedWipe Herbicide',
    category: ProductCategory.HERBICIDE,
    description: 'Post-emergence herbicide for effective control of broadleaf weeds.',
    dosage: '10ml per liter',
    crops: ['Sugarcane', 'Maize'],
    benefits: ['Selective action', 'Safe for main crop', 'Controls tough weeds'],
    packSize: '1L',
    price: 1500,
    isFeatured: false,
    image: 'https://picsum.photos/seed/weed4/600/600'
  },
  {
    id: '5',
    title: 'FungiGuard Plus',
    category: ProductCategory.FUNGICIDE,
    description: 'Systemic fungicide for prevention and cure of fungal diseases like powdery mildew.',
    dosage: '2g per liter',
    crops: ['Grapes', 'Tomato', 'Potato'],
    benefits: ['Curative and preventive', 'Systemic action', 'Low residue'],
    packSize: '250g',
    price: 600,
    isFeatured: true,
    image: 'https://picsum.photos/seed/fungi5/600/600'
  }
];

export const WHATSAPP_NUMBER = "919876543210"; // Replace with real number
export const CONTACT_EMAIL = "info@rmagrichem.com";
export const COMPANY_ADDRESS = "123 Green Valley, Agri Tech Park, New Delhi, India";
