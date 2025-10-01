import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  ingredients: string[] | null;
  allergens: string[] | null;
  nutritional_info: Record<string, any> | null;
  created_at: string;
}

export interface ProductOption {
  id: string;
  product_id: string;
  option_type: 'size' | 'meat' | 'sauce' | 'supplement';
  name: string;
  price: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: {
    size?: ProductOption;
    meats?: ProductOption[];
    sauces?: ProductOption[];
    supplements?: ProductOption[];
  };
  totalPrice: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
}
