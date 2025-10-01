import { useEffect, useState } from 'react';
import { Category, Product, supabase, CartItem } from '../lib/supabase';
import { ProductCard } from './ProductCard';
import { TacosBuilder } from './TacosBuilder';
import { ProductInfoModal } from './ProductInfoModal';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedTacosProduct, setSelectedTacosProduct] = useState<Product | null>(null);
  const [selectedInfoProduct, setSelectedInfoProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (categoriesError) throw categoriesError;

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('available', true);

      if (productsError) throw productsError;

      const productsByCategory: Record<string, Product[]> = {};
      productsData.forEach((product) => {
        if (!productsByCategory[product.category_id]) {
          productsByCategory[product.category_id] = [];
        }
        productsByCategory[product.category_id].push(product);
      });

      setCategories(categoriesData || []);
      setProducts(productsByCategory);
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product: Product) => {
    if (product.name === 'Tacos Personnalisé') {
      setSelectedTacosProduct(product);
      return;
    }

    const cartItem: CartItem = {
      product,
      quantity: 1,
      totalPrice: product.price,
    };

    onAddToCart(cartItem);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {categories.map((category) => {
          const categoryProducts = products[category.id] || [];
          if (categoryProducts.length === 0) return null;

          return (
            <section
              key={category.id}
              id={category.name.toLowerCase().replace(/\s+/g, '-')}
              className="mb-16 scroll-mt-24"
            >
              <div className="mb-8">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                  {category.name}
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={() => handleAddProduct(product)}
                    onShowInfo={() => setSelectedInfoProduct(product)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {selectedTacosProduct && (
        <TacosBuilder
          product={selectedTacosProduct}
          onClose={() => setSelectedTacosProduct(null)}
          onAddToCart={(item) => {
            onAddToCart(item);
            setSelectedTacosProduct(null);
          }}
        />
      )}

      {selectedInfoProduct && (
        <ProductInfoModal
          product={selectedInfoProduct}
          onClose={() => setSelectedInfoProduct(null)}
        />
      )}
    </div>
  );
}
