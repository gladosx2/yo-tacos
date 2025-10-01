import { X, AlertTriangle, Package } from 'lucide-react';
import { Product } from '../data/menuData';

interface ProductInfoModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductInfoModal({ product, onClose }: ProductInfoModalProps) {
  const hasInfo = product.ingredients || product.allergens;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-lg w-full shadow-2xl border border-orange-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-orange-500/30 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {product.description && (
            <div>
              <p className="text-gray-300">{product.description}</p>
            </div>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-orange-400">Ingrédients</h3>
              </div>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-300 pl-4 border-l-2 border-orange-500/30">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.allergens && product.allergens.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-bold text-red-400">Allergènes</h3>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <ul className="space-y-2">
                  {product.allergens.map((allergen, index) => (
                    <li key={index} className="text-red-300 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{allergen}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {!hasInfo && (
            <div className="text-center py-8">
              <p className="text-gray-400">Aucune information détaillée disponible pour ce produit.</p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Prix</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {product.price.toFixed(2)}€
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-500/30 p-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
