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
  { id: 'buckets', name: 'Buckets', display_order: 4 },
  { id: 'drinks', name: 'Boissons & Desserts', display_order: 5 },
];

export const products: Product[] = [
  {
    id: 'student-menu',
    category_id: 'student',
    name: 'Menu Étudiant',
    description: 'Tacos M, Burger (hors Yo Burger et Montagnard) ou Sandwich + Frites + Boisson',
    price: 7.00,
    available: true,
    ingredients: ['Au choix : Tacos M, Burger ou Sandwich', 'Frites', 'Boisson'],
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

  // Accompagnements - Onion Rings
  {
    id: 'onion-rings-10',
    category_id: 'sides',
    name: 'Onion Rings x10',
    description: 'Rondelles d\'oignon panées et croustillantes',
    price: 3.00,
    available: true,
    ingredients: ['Oignons', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'onion-rings-15',
    category_id: 'sides',
    name: 'Onion Rings x15',
    description: 'Rondelles d\'oignon panées et croustillantes',
    price: 4.00,
    available: true,
    ingredients: ['Oignons', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'onion-rings-20',
    category_id: 'sides',
    name: 'Onion Rings x20',
    description: 'Rondelles d\'oignon panées et croustillantes',
    price: 5.00,
    available: true,
    ingredients: ['Oignons', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },

  // Wings
  {
    id: 'wings-3',
    category_id: 'sides',
    name: 'Wings x3',
    description: 'Ailes de poulet croustillantes',
    price: 3.00,
    available: true,
    ingredients: ['Ailes de poulet', 'Marinade', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'wings-6',
    category_id: 'sides',
    name: 'Wings x6',
    description: 'Ailes de poulet croustillantes',
    price: 5.00,
    available: true,
    ingredients: ['Ailes de poulet', 'Marinade', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'wings-9',
    category_id: 'sides',
    name: 'Wings x9',
    description: 'Ailes de poulet croustillantes',
    price: 7.00,
    available: true,
    ingredients: ['Ailes de poulet', 'Marinade', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'wings-12',
    category_id: 'sides',
    name: 'Wings x12',
    description: 'Ailes de poulet croustillantes',
    price: 9.00,
    available: true,
    ingredients: ['Ailes de poulet', 'Marinade', 'Épices'],
    allergens: ['Gluten'],
  },

  // Falafels
  {
    id: 'falafels-10',
    category_id: 'sides',
    name: 'Falafels x10',
    description: 'Boulettes végétariennes aux pois chiches',
    price: 5.00,
    available: true,
    ingredients: ['Pois chiches', 'Persil', 'Coriandre', 'Oignon', 'Épices'],
    allergens: [],
  },
  {
    id: 'falafels-15',
    category_id: 'sides',
    name: 'Falafels x15',
    description: 'Boulettes végétariennes aux pois chiches',
    price: 7.00,
    available: true,
    ingredients: ['Pois chiches', 'Persil', 'Coriandre', 'Oignon', 'Épices'],
    allergens: [],
  },
  {
    id: 'falafels-20',
    category_id: 'sides',
    name: 'Falafels x20',
    description: 'Boulettes végétariennes aux pois chiches',
    price: 8.00,
    available: true,
    ingredients: ['Pois chiches', 'Persil', 'Coriandre', 'Oignon', 'Épices'],
    allergens: [],
  },

  // Nuggets
  {
    id: 'nuggets-6',
    category_id: 'sides',
    name: 'Nuggets x6',
    description: 'Nuggets de poulet croustillants',
    price: 5.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'nuggets-9',
    category_id: 'sides',
    name: 'Nuggets x9',
    description: 'Nuggets de poulet croustillants',
    price: 7.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'nuggets-12',
    category_id: 'sides',
    name: 'Nuggets x12',
    description: 'Nuggets de poulet croustillants',
    price: 9.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },

  // Tenders
  {
    id: 'tenders-3',
    category_id: 'sides',
    name: 'Tenders x3',
    description: 'Tenders de poulet XXL',
    price: 4.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'tenders-6',
    category_id: 'sides',
    name: 'Tenders x6',
    description: 'Tenders de poulet XXL',
    price: 7.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'tenders-9',
    category_id: 'sides',
    name: 'Tenders x9',
    description: 'Tenders de poulet XXL',
    price: 10.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },
  {
    id: 'tenders-12',
    category_id: 'sides',
    name: 'Tenders x12',
    description: 'Tenders de poulet XXL',
    price: 13.00,
    available: true,
    ingredients: ['Poulet', 'Panure', 'Épices'],
    allergens: ['Gluten'],
  },

  // Sticks Mozzarella
  {
    id: 'mozza-sticks-4',
    category_id: 'sides',
    name: 'Sticks Mozzarella x4',
    description: 'Bâtonnets de mozzarella panés',
    price: 3.50,
    available: true,
    ingredients: ['Mozzarella', 'Panure'],
    allergens: ['Gluten', 'Produits laitiers'],
  },
  {
    id: 'mozza-sticks-8',
    category_id: 'sides',
    name: 'Sticks Mozzarella x8',
    description: 'Bâtonnets de mozzarella panés',
    price: 6.00,
    available: true,
    ingredients: ['Mozzarella', 'Panure'],
    allergens: ['Gluten', 'Produits laitiers'],
  },
  {
    id: 'mozza-sticks-12',
    category_id: 'sides',
    name: 'Sticks Mozzarella x12',
    description: 'Bâtonnets de mozzarella panés',
    price: 9.00,
    available: true,
    ingredients: ['Mozzarella', 'Panure'],
    allergens: ['Gluten', 'Produits laitiers'],
  },

  // Frites
  {
    id: 'frites-p',
    category_id: 'sides',
    name: 'Frites Petite',
    description: 'Portion de frites fraîches',
    price: 1.50,
    available: true,
    ingredients: ['Pommes de terre', 'Huile végétale', 'Sel'],
    allergens: [],
  },
  {
    id: 'frites-m',
    category_id: 'sides',
    name: 'Frites Moyenne',
    description: 'Portion de frites fraîches',
    price: 3.00,
    available: true,
    ingredients: ['Pommes de terre', 'Huile végétale', 'Sel'],
    allergens: [],
  },
  {
    id: 'frites-g',
    category_id: 'sides',
    name: 'Frites Grande',
    description: 'Portion de frites fraîches',
    price: 4.00,
    available: true,
    ingredients: ['Pommes de terre', 'Huile végétale', 'Sel'],
    allergens: [],
  },

  // Kabab
  {
    id: 'kabab-p',
    category_id: 'sides',
    name: 'Kabab Petit',
    description: 'Barquette de viande kabab',
    price: 5.00,
    available: true,
    ingredients: ['Viande de bœuf', 'Épices orientales', 'Oignons'],
    allergens: [],
  },
  {
    id: 'kabab-m',
    category_id: 'sides',
    name: 'Kabab Moyen',
    description: 'Barquette de viande kabab',
    price: 7.00,
    available: true,
    ingredients: ['Viande de bœuf', 'Épices orientales', 'Oignons'],
    allergens: [],
  },
  {
    id: 'kabab-g',
    category_id: 'sides',
    name: 'Kabab Grand',
    description: 'Barquette de viande kabab',
    price: 9.00,
    available: true,
    ingredients: ['Viande de bœuf', 'Épices orientales', 'Oignons'],
    allergens: [],
  },

  // Buckets
  {
    id: 'bucket-22',
    category_id: 'buckets',
    name: 'Bucket 22€',
    description: '12 Tenders + 12 Wings + 2 Frites',
    price: 22.00,
    available: true,
    ingredients: ['Tenders de poulet', 'Wings de poulet', 'Frites'],
    allergens: ['Gluten'],
  },
  {
    id: 'bucket-30',
    category_id: 'buckets',
    name: 'Bucket 30€',
    description: '12 Tenders + 12 Wings + 12 Nuggets + Frites',
    price: 30.00,
    available: true,
    ingredients: ['Tenders de poulet', 'Wings de poulet', 'Nuggets de poulet', 'Frites'],
    allergens: ['Gluten'],
  },

  // Boissons 2L
  {
    id: 'drink-2l',
    category_id: 'drinks',
    name: 'Boisson 2L',
    description: 'Coca-Cola, Coca Zero, Fanta, Sprite, Ice Tea',
    price: 4.00,
    available: true,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Arômes'],
    allergens: [],
  },
  // Boissons 1.5L
  {
    id: 'drink-1-5l',
    category_id: 'drinks',
    name: 'Boisson 1,5L',
    description: 'Coca-Cola, Coca Zero, Fanta, Sprite, Ice Tea',
    price: 3.50,
    available: true,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Arômes'],
    allergens: [],
  },
  // Boissons 1L
  {
    id: 'drink-1l',
    category_id: 'drinks',
    name: 'Boisson 1L',
    description: 'Coca-Cola, Coca Zero, Fanta, Sprite, Ice Tea',
    price: 3.00,
    available: true,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Arômes'],
    allergens: [],
  },
  // Red Bull
  {
    id: 'drink-redbull',
    category_id: 'drinks',
    name: 'Red Bull',
    description: 'Boisson énergisante',
    price: 3.00,
    available: true,
    ingredients: ['Taurine', 'Caféine', 'Vitamines'],
    allergens: [],
  },
  // Monster
  {
    id: 'drink-monster',
    category_id: 'drinks',
    name: 'Monster',
    description: 'Boisson énergisante',
    price: 3.00,
    available: true,
    ingredients: ['Taurine', 'Caféine', 'Vitamines'],
    allergens: [],
  },
  // Boissons 50cl
  {
    id: 'drink-50cl',
    category_id: 'drinks',
    name: 'Boisson 50cl',
    description: 'Coca-Cola, Coca Zero, Fanta, Sprite, Ice Tea, Oasis',
    price: 2.00,
    available: true,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Arômes'],
    allergens: [],
  },
  // Boissons 33cl
  {
    id: 'drink-33cl',
    category_id: 'drinks',
    name: 'Boisson 33cl',
    description: 'Coca-Cola, Coca Zero, Fanta, Sprite, Orangina',
    price: 1.50,
    available: true,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Arômes'],
    allergens: [],
  },
  // Capri-Sun
  {
    id: 'drink-caprisun',
    category_id: 'drinks',
    name: 'Capri-Sun',
    description: 'Jus de fruits pour enfants',
    price: 1.00,
    available: true,
    ingredients: ['Jus de fruits', 'Eau', 'Sucre'],
    allergens: [],
  },
  // Café
  {
    id: 'drink-cafe',
    category_id: 'drinks',
    name: 'Café',
    description: 'Café expresso',
    price: 1.00,
    available: true,
    ingredients: ['Café arabica'],
    allergens: [],
  },
  // Eau minérale
  {
    id: 'drink-eau',
    category_id: 'drinks',
    name: 'Eau Minérale 50cl',
    description: 'Eau minérale naturelle',
    price: 1.00,
    available: true,
    ingredients: ['Eau minérale naturelle'],
    allergens: [],
  },

  // Desserts
  {
    id: 'dessert-tiramisu',
    category_id: 'drinks',
    name: 'Tiramisu',
    description: 'Dessert italien au café',
    price: 3.00,
    available: true,
    ingredients: ['Mascarpone', 'Biscuits', 'Café', 'Cacao'],
    allergens: ['Gluten', 'Œufs', 'Produits laitiers'],
  },
  {
    id: 'dessert-daim',
    category_id: 'drinks',
    name: 'Tarte au Daim',
    description: 'Tarte gourmande au Daim',
    price: 3.00,
    available: true,
    ingredients: ['Biscuit', 'Caramel', 'Chocolat Daim', 'Crème'],
    allergens: ['Gluten', 'Œufs', 'Produits laitiers', 'Fruits à coque'],
  },
  {
    id: 'dessert-panini-nutella',
    category_id: 'drinks',
    name: 'Panini Nutella',
    description: 'Panini garni de Nutella',
    price: 3.00,
    available: true,
    ingredients: ['Pain panini', 'Nutella'],
    allergens: ['Gluten', 'Fruits à coque', 'Produits laitiers'],
  },
];

export const productOptions: ProductOption[] = [
  // Sizes
  { id: 'size-m', product_id: 'tacos-custom', option_type: 'size', name: 'M (1 viande)', price: 6.00 },
  { id: 'size-l', product_id: 'tacos-custom', option_type: 'size', name: 'L (2 viandes)', price: 7.00 },
  { id: 'size-xl', product_id: 'tacos-custom', option_type: 'size', name: 'XL (3 viandes)', price: 9.00 },
  { id: 'size-xxl', product_id: 'tacos-custom', option_type: 'size', name: 'XXL (4 viandes)', price: 11.00 },

  // Meats
  { id: 'meat-poulet', product_id: 'tacos-custom', option_type: 'meat', name: 'Poulet Mariné', price: 0 },
  { id: 'meat-cordon', product_id: 'tacos-custom', option_type: 'meat', name: 'Cordon Bleu', price: 0 },
  { id: 'meat-viande-hachee', product_id: 'tacos-custom', option_type: 'meat', name: 'Viande Hachée (Kefta)', price: 0 },
  { id: 'meat-merguez', product_id: 'tacos-custom', option_type: 'meat', name: 'Merguez', price: 0 },
  { id: 'meat-tenders', product_id: 'tacos-custom', option_type: 'meat', name: 'Tenders', price: 0 },
  { id: 'meat-nuggets', product_id: 'tacos-custom', option_type: 'meat', name: 'Nuggets', price: 0 },
  { id: 'meat-kabab', product_id: 'tacos-custom', option_type: 'meat', name: 'Kabab', price: 0 },
  { id: 'meat-falafel', product_id: 'tacos-custom', option_type: 'meat', name: 'Falafel', price: 0 },

  // Sauces
  { id: 'sauce-algerienne', product_id: 'tacos-custom', option_type: 'sauce', name: 'Algérienne', price: 0 },
  { id: 'sauce-barbecue', product_id: 'tacos-custom', option_type: 'sauce', name: 'Barbecue', price: 0 },
  { id: 'sauce-biggy', product_id: 'tacos-custom', option_type: 'sauce', name: 'Biggy Burger', price: 0 },
  { id: 'sauce-chili', product_id: 'tacos-custom', option_type: 'sauce', name: 'Chili Thaï', price: 0 },
  { id: 'sauce-curry', product_id: 'tacos-custom', option_type: 'sauce', name: 'Curry', price: 0 },
  { id: 'sauce-samourai', product_id: 'tacos-custom', option_type: 'sauce', name: 'Samouraï', price: 0 },
  { id: 'sauce-harissa', product_id: 'tacos-custom', option_type: 'sauce', name: 'Harissa', price: 0 },
  { id: 'sauce-ketchup', product_id: 'tacos-custom', option_type: 'sauce', name: 'Ketchup', price: 0 },
  { id: 'sauce-mayo', product_id: 'tacos-custom', option_type: 'sauce', name: 'Mayonnaise', price: 0 },
  { id: 'sauce-andalouse', product_id: 'tacos-custom', option_type: 'sauce', name: 'Andalouse', price: 0 },
  { id: 'sauce-poivrons', product_id: 'tacos-custom', option_type: 'sauce', name: 'Poivrons', price: 0 },
  { id: 'sauce-blanche', product_id: 'tacos-custom', option_type: 'sauce', name: 'Blanche', price: 0 },
  { id: 'sauce-bresil', product_id: 'tacos-custom', option_type: 'sauce', name: 'Brésil', price: 0 },
  { id: 'sauce-roasted', product_id: 'tacos-custom', option_type: 'sauce', name: 'Roasted Oignons', price: 0 },
  { id: 'sauce-cheezy', product_id: 'tacos-custom', option_type: 'sauce', name: 'Cheezy', price: 0 },

  // Supplements
  { id: 'sup-kiri', product_id: 'tacos-custom', option_type: 'supplement', name: 'Kiri', price: 0.50 },
  { id: 'sup-fromage', product_id: 'tacos-custom', option_type: 'supplement', name: 'Fromage', price: 0.50 },
  { id: 'sup-boursin', product_id: 'tacos-custom', option_type: 'supplement', name: 'Boursin', price: 0.50 },
  { id: 'sup-cheddar', product_id: 'tacos-custom', option_type: 'supplement', name: 'Cheddar', price: 0.50 },
  { id: 'sup-raclette', product_id: 'tacos-custom', option_type: 'supplement', name: 'Raclette', price: 0.50 },
  { id: 'sup-chevre', product_id: 'tacos-custom', option_type: 'supplement', name: 'Chèvre', price: 0.50 },
  { id: 'sup-mozza', product_id: 'tacos-custom', option_type: 'supplement', name: 'Mozza', price: 0.50 },
  { id: 'sup-emmental', product_id: 'tacos-custom', option_type: 'supplement', name: 'Emmental', price: 0.50 },
  { id: 'sup-oeuf', product_id: 'tacos-custom', option_type: 'supplement', name: 'Œuf', price: 0.50 },
  { id: 'sup-poivrons', product_id: 'tacos-custom', option_type: 'supplement', name: 'Poivrons', price: 0.50 },
  { id: 'sup-oignons-frits', product_id: 'tacos-custom', option_type: 'supplement', name: 'Oignons Frits', price: 0.50 },
  { id: 'sup-oignons-caramelises', product_id: 'tacos-custom', option_type: 'supplement', name: 'Oignons Caramélisés', price: 0.50 },
  { id: 'sup-chorizo', product_id: 'tacos-custom', option_type: 'supplement', name: 'Chorizo', price: 1.00 },
  { id: 'sup-lardons', product_id: 'tacos-custom', option_type: 'supplement', name: 'Lardons', price: 1.00 },
  { id: 'sup-bacon', product_id: 'tacos-custom', option_type: 'supplement', name: 'Bacon', price: 1.00 },
];
