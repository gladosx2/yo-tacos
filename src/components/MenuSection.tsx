import { useState } from 'react';
import { Category, Product, CartItem, categories, products } from '../lib/data';
import { ProductCard } from './ProductCard';
import { TacosBuilder } from './TacosBuilder';
import { ProductInfoModal } from './ProductInfoModal';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedTacosProduct, setSelectedTacosProduct] = useState<Product | null>(null);
  const [selectedInfoProduct, setSelectedInfoProduct] = useState<Product | null>(null);

  const productsByCategory: Record<string, Product[]> = {};
  products.forEach((product) => {
    if (!productsByCategory[product.category_id]) {
      productsByCategory[product.category_id] = [];
    }
    productsByCategory[product.category_id].push(product);
  });

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

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {categories.map((category) => {
          const categoryProducts = productsByCategory[category.id] || [];
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
