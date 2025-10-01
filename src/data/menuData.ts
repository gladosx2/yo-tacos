export interface Category {
  id: string;
  name: string;
  display_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  available: boolean;
  ingredients: string[] | null;
  allergens: string[] | null;
}

export interface ProductOption {
  id: string;
  product_id: string;
  option_type: 'size' | 'meat' | 'sauce' | 'supplement';
  name: string;
  price: number;
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

export const categories: Category[] = [
  { id: 'student', name: 'Menu Étudiant', display_order: 1 },
  { id: 'tacos', name: 'Tacos', display_order: 2 },
  { id: 'sides', name: 'Accompagnements', display_order: 3 },
  { id: 'drinks', name: 'Boissons', display_order: 4 },
];

export const products: Product[] = [
  {
    id: 'student-menu',
    category_id: 'student',
    name: 'Menu Étudiant',
    description: 'Tacos M (1 viande) + Frites + Boisson',
    price: 7.50,
    available: true,
    ingredients: ['Galette', 'Viande au choix', 'Frites', 'Crudités', 'Sauce'],
    allergens: ['Gluten', 'Produits laitiers'],
  },
  {
    id: 'tacos-custom',
    category_id: 'tacos',
    name: 'Tacos Personnalisé',
    description: 'Compose ton tacos à ta façon',
    price: 0,
    available: true,
    ingredients: null,
    allergens: null,
  },
  {
    id: 'side-fries',
    category_id: 'sides',
    name: 'Frites',
    description: 'Portion de frites fraîches',
    price: 3.00,
    available: true,
    ingredients: ['Pommes de terre', 'Huile végétale', 'Sel'],
    allergens: [],
  },
  {
    id: 'side-nuggets',
    category_id: 'sides',
    name: 'Nuggets (6 pièces)',
    description: 'Nuggets de poulet croustillants',
    price: 4.50,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'side-cheese-nuggets',
    category_id: 'sides',
    name: 'Cheese Nuggets (6 pièces)',
    description: 'Nuggets de fromage fondant',
    price: 4.50,
    available: true,
    ingredients: ['Fromage', 'Panure'],
    allergens: ['Gluten', 'Produits laitiers'],
  },
  {
    id: 'side-tenders',
    category_id: 'sides',
    name: 'Tenders (4 pièces)',
    description: 'Tenders de poulet XXL',
    price: 5.50,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'drink-cola',
    category_id: 'drinks',
    name: 'Coca-Cola 33cl',
    description: null,
    price: 2.00,
    available: true,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Colorant'],
    allergens: [],
  },
  {
    id: 'drink-cola-zero',
    category_id: 'drinks',
    name: 'Coca-Cola Zero 33cl',
    description: null,
    price: 2.00,
    available: true,
    ingredients: ['Eau gazéifiée', 'Édulcorants', 'Colorant'],
    allergens: [],
  },
  {
    id: 'drink-ice-tea',
    category_id: 'drinks',
    name: 'Ice Tea 33cl',
    description: null,
    price: 2.00,
    available: true,
    ingredients: ['Thé', 'Sucre', 'Arômes'],
    allergens: [],
  },
  {
    id: 'drink-orangina',
    category_id: 'drinks',
    name: 'Orangina 33cl',
    description: null,
    price: 2.00,
    available: true,
    ingredients: ['Jus d\'orange', 'Eau gazéifiée', 'Sucre'],
    allergens: [],
  },
  {
    id: 'drink-oasis',
    category_id: 'drinks',
    name: 'Oasis 33cl',
    description: null,
    price: 2.00,
    available: true,
    ingredients: ['Jus de fruits', 'Eau', 'Sucre'],
    allergens: [],
  },
  {
    id: 'drink-water',
    category_id: 'drinks',
    name: 'Eau 50cl',
    description: null,
    price: 1.50,
    available: true,
    ingredients: ['Eau minérale naturelle'],
    allergens: [],
  },
];

export const productOptions: ProductOption[] = [
  // Sizes
  { id: 'size-m', product_id: 'tacos-custom', option_type: 'size', name: 'M (1 viande)', price: 6.00 },
  { id: 'size-l', product_id: 'tacos-custom', option_type: 'size', name: 'L (2 viandes)', price: 7.50 },
  { id: 'size-xl', product_id: 'tacos-custom', option_type: 'size', name: 'XL (3 viandes)', price: 9.00 },
  { id: 'size-xxl', product_id: 'tacos-custom', option_type: 'size', name: 'XXL (4 viandes)', price: 10.50 },

  // Meats
  { id: 'meat-poulet', product_id: 'tacos-custom', option_type: 'meat', name: 'Poulet', price: 0 },
  { id: 'meat-cordon', product_id: 'tacos-custom', option_type: 'meat', name: 'Cordon Bleu', price: 0 },
  { id: 'meat-viande-hachee', product_id: 'tacos-custom', option_type: 'meat', name: 'Viande Hachée', price: 0 },
  { id: 'meat-merguez', product_id: 'tacos-custom', option_type: 'meat', name: 'Merguez', price: 0 },
  { id: 'meat-kefta', product_id: 'tacos-custom', option_type: 'meat', name: 'Kefta', price: 0 },
  { id: 'meat-nuggets', product_id: 'tacos-custom', option_type: 'meat', name: 'Nuggets', price: 0 },
  { id: 'meat-tenders', product_id: 'tacos-custom', option_type: 'meat', name: 'Tenders', price: 0 },
  { id: 'meat-mixte', product_id: 'tacos-custom', option_type: 'meat', name: 'Mixte', price: 0 },

  // Sauces
  { id: 'sauce-algerienne', product_id: 'tacos-custom', option_type: 'sauce', name: 'Algérienne', price: 0 },
  { id: 'sauce-blanche', product_id: 'tacos-custom', option_type: 'sauce', name: 'Blanche', price: 0 },
  { id: 'sauce-biggy', product_id: 'tacos-custom', option_type: 'sauce', name: 'Biggy', price: 0 },
  { id: 'sauce-ketchup', product_id: 'tacos-custom', option_type: 'sauce', name: 'Ketchup', price: 0 },
  { id: 'sauce-mayo', product_id: 'tacos-custom', option_type: 'sauce', name: 'Mayonnaise', price: 0 },
  { id: 'sauce-barbecue', product_id: 'tacos-custom', option_type: 'sauce', name: 'Barbecue', price: 0 },
  { id: 'sauce-samourai', product_id: 'tacos-custom', option_type: 'sauce', name: 'Samouraï', price: 0 },
  { id: 'sauce-harissa', product_id: 'tacos-custom', option_type: 'sauce', name: 'Harissa', price: 0 },

  // Supplements
  { id: 'sup-fromage', product_id: 'tacos-custom', option_type: 'supplement', name: 'Fromage', price: 0.50 },
  { id: 'sup-oeuf', product_id: 'tacos-custom', option_type: 'supplement', name: 'Œuf', price: 0.50 },
  { id: 'sup-bacon', product_id: 'tacos-custom', option_type: 'supplement', name: 'Bacon', price: 1.00 },
  { id: 'sup-oignons', product_id: 'tacos-custom', option_type: 'supplement', name: 'Oignons Frits', price: 0.50 },
];
