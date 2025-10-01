import { Plus, Info } from 'lucide-react';
import { Product } from '../lib/data';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
  onShowInfo: () => void;
}

export function ProductCard({ product, onAdd, onShowInfo }: ProductCardProps) {
  const hasInfo = product.ingredients || product.allergens;

  return (
    <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-orange-500/50">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-2">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors flex-1">
                {product.name}
              </h3>
              {hasInfo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowInfo();
                  }}
                  className="p-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-full transition-colors flex-shrink-0"
                  title="Voir les informations"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}
            </div>
            {product.description && (
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            {product.price.toFixed(2)}€
          </span>
          <button
            onClick={onAdd}
            disabled={!product.available}
            className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {!product.available && (
          <div className="mt-3 text-center">
            <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
              Indisponible
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
