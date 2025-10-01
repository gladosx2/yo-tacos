import { X, Plus, Minus, Trash2, ShoppingBag, Phone, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../data/menuData';

interface CartProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
  onClearCart: () => void;
  totalAmount: number;
}

export function Cart({ cart, onClose, onUpdateQuantity, onRemove, totalAmount }: CartProps) {
  const [copied, setCopied] = useState(false);

  const generateOrderText = () => {
    let orderText = '--- MA COMMANDE ---\n\n';

    cart.forEach((item, index) => {
      orderText += `${index + 1}. ${item.product.name} (x${item.quantity})\n`;

      if (item.selectedOptions) {
        if (item.selectedOptions.size) {
          orderText += `   Taille: ${item.selectedOptions.size.name}\n`;
        }
        if (item.selectedOptions.meats && item.selectedOptions.meats.length > 0) {
          orderText += `   Viandes: ${item.selectedOptions.meats.map(m => m.name).join(', ')}\n`;
        }
        if (item.selectedOptions.sauces && item.selectedOptions.sauces.length > 0) {
          orderText += `   Sauces: ${item.selectedOptions.sauces.map(s => s.name).join(', ')}\n`;
        }
        if (item.selectedOptions.supplements && item.selectedOptions.supplements.length > 0) {
          orderText += `   Suppléments: ${item.selectedOptions.supplements.map(s => s.name).join(', ')}\n`;
        }
      }

      orderText += `   Prix: ${(item.totalPrice * item.quantity).toFixed(2)}€\n\n`;
    });

    orderText += `TOTAL: ${totalAmount.toFixed(2)}€`;
    return orderText;
  };

  const copyOrderToClipboard = () => {
    const orderText = generateOrderText();
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-t sm:border border-orange-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-orange-500/30 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Panier ({cart.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{item.product.name}</h3>
                      {item.selectedOptions && (
                        <div className="text-sm text-gray-400 space-y-1">
                          {item.selectedOptions.size && (
                            <div>Taille: {item.selectedOptions.size.name}</div>
                          )}
                          {item.selectedOptions.meats && item.selectedOptions.meats.length > 0 && (
                            <div>Viandes: {item.selectedOptions.meats.map((m) => m.name).join(', ')}</div>
                          )}
                          {item.selectedOptions.sauces && item.selectedOptions.sauces.length > 0 && (
                            <div>Sauces: {item.selectedOptions.sauces.map((s) => s.name).join(', ')}</div>
                          )}
                          {item.selectedOptions.supplements && item.selectedOptions.supplements.length > 0 && (
                            <div>Suppléments: {item.selectedOptions.supplements.map((s) => s.name).join(', ')}</div>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onRemove(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="text-xl font-bold text-orange-400">
                      {(item.totalPrice * item.quantity).toFixed(2)}€
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-orange-500/30 p-6 space-y-4 bg-gray-900/50">
            <div className="flex items-center justify-between text-2xl font-bold mb-4">
              <span className="text-white">Total</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {totalAmount.toFixed(2)}€
              </span>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3 text-orange-300">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-bold mb-1">Pour commander, appelez-nous!</p>
                  <p className="text-gray-400">Copiez votre commande ci-dessous et communiquez-la par téléphone</p>
                </div>
              </div>
            </div>

            <button
              onClick={copyOrderToClipboard}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Commande Copiée!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copier Ma Commande
                </>
              )}
            </button>

            {copied && (
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2 font-bold">Aperçu de votre commande:</p>
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                  {generateOrderText()}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
