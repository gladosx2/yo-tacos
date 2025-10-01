import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Product, ProductOption, CartItem, supabase } from '../lib/supabase';

interface TacosBuilderProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function TacosBuilder({ product, onClose, onAddToCart }: TacosBuilderProps) {
  const [sizes, setSizes] = useState<ProductOption[]>([]);
  const [meats, setMeats] = useState<ProductOption[]>([]);
  const [sauces, setSauces] = useState<ProductOption[]>([]);
  const [supplements, setSupplements] = useState<ProductOption[]>([]);

  const [selectedSize, setSelectedSize] = useState<ProductOption | null>(null);
  const [selectedMeats, setSelectedMeats] = useState<ProductOption[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<ProductOption[]>([]);
  const [selectedSupplements, setSelectedSupplements] = useState<ProductOption[]>([]);
  const [addMenu, setAddMenu] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadOptions();
  }, [product.id]);

  const loadOptions = async () => {
    const { data, error } = await supabase
      .from('product_options')
      .select('*')
      .eq('product_id', product.id);

    if (error) {
      console.error('Error loading options:', error);
      return;
    }

    setSizes(data.filter((o) => o.option_type === 'size'));
    setMeats(data.filter((o) => o.option_type === 'meat'));
    setSauces(data.filter((o) => o.option_type === 'sauce'));
    setSupplements(data.filter((o) => o.option_type === 'supplement'));
  };

  const getMaxMeats = () => {
    if (!selectedSize) return 0;
    if (selectedSize.name.includes('M (1')) return 1;
    if (selectedSize.name.includes('L (2')) return 2;
    if (selectedSize.name.includes('XL (3')) return 3;
    if (selectedSize.name.includes('XXL (4')) return 4;
    return 0;
  };

  const toggleMeat = (meat: ProductOption) => {
    const maxMeats = getMaxMeats();
    const index = selectedMeats.findIndex((m) => m.id === meat.id);

    if (index >= 0) {
      setSelectedMeats(selectedMeats.filter((m) => m.id !== meat.id));
    } else if (selectedMeats.length < maxMeats) {
      setSelectedMeats([...selectedMeats, meat]);
    }
  };

  const toggleSauce = (sauce: ProductOption) => {
    const index = selectedSauces.findIndex((s) => s.id === sauce.id);
    if (index >= 0) {
      setSelectedSauces(selectedSauces.filter((s) => s.id !== sauce.id));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const toggleSupplement = (supplement: ProductOption) => {
    const index = selectedSupplements.findIndex((s) => s.id === supplement.id);
    if (index >= 0) {
      setSelectedSupplements(selectedSupplements.filter((s) => s.id !== supplement.id));
    } else {
      setSelectedSupplements([...selectedSupplements, supplement]);
    }
  };

  const calculateTotal = () => {
    let total = selectedSize?.price || 0;
    if (addMenu) total += 2;
    total += selectedSupplements.reduce((sum, s) => sum + s.price, 0);
    return total;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }

    const maxMeats = getMaxMeats();
    if (selectedMeats.length !== maxMeats) {
      alert(`Veuillez sélectionner ${maxMeats} viande(s)`);
      return;
    }

    if (selectedSauces.length === 0) {
      alert('Veuillez sélectionner au moins une sauce');
      return;
    }

    const cartItem: CartItem = {
      product,
      quantity,
      selectedOptions: {
        size: selectedSize,
        meats: selectedMeats,
        sauces: selectedSauces,
        supplements: selectedSupplements,
      },
      totalPrice: calculateTotal(),
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-500/30">
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-orange-500/30 p-6 flex items-center justify-between z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Compose Ton Tacos
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">1. Choisis Ta Taille *</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => {
                    setSelectedSize(size);
                    setSelectedMeats([]);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedSize?.id === size.id
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/50'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500/50'
                  }`}
                >
                  <div className="font-bold">{size.name.split(' ')[0]}</div>
                  <div className="text-sm opacity-80">{size.name.substring(size.name.indexOf('('))}</div>
                  <div className="text-lg font-bold mt-2">{size.price.toFixed(2)}€</div>
                </button>
              ))}
            </div>
          </div>

          {selectedSize && (
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">
                2. Choisis {getMaxMeats()} Viande(s) * ({selectedMeats.length}/{getMaxMeats()})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {meats.map((meat) => {
                  const isSelected = selectedMeats.some((m) => m.id === meat.id);
                  const isDisabled = !isSelected && selectedMeats.length >= getMaxMeats();

                  return (
                    <button
                      key={meat.id}
                      onClick={() => toggleMeat(meat)}
                      disabled={isDisabled}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        isSelected
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                          : isDisabled
                          ? 'bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500/50'
                      }`}
                    >
                      {meat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedSize && selectedMeats.length === getMaxMeats() && (
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">3. Choisis Tes Sauces * (plusieurs choix possibles)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sauces.map((sauce) => {
                  const isSelected = selectedSauces.some((s) => s.id === sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      onClick={() => toggleSauce(sauce)}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        isSelected
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500/50'
                      }`}
                    >
                      {sauce.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedSauces.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">4. Ajoute Des Suppléments (optionnel)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {supplements.map((supplement) => {
                  const isSelected = selectedSupplements.some((s) => s.id === supplement.id);
                  return (
                    <button
                      key={supplement.id}
                      onClick={() => toggleSupplement(supplement)}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        isSelected
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500/50'
                      }`}
                    >
                      <div>{supplement.name}</div>
                      <div className="text-xs opacity-80">+{supplement.price.toFixed(2)}€</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedSauces.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">5. Options Menu</h3>
              <button
                onClick={() => setAddMenu(!addMenu)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  addMenu
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500/50'
                }`}
              >
                <div className="font-bold">Menu avec Frites + Boisson</div>
                <div className="text-sm opacity-80">+2.00€</div>
              </button>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 to-gray-800 border-t border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              <span className="text-2xl font-bold text-white w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-400">Total</div>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {(calculateTotal() * quantity).toFixed(2)}€
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
          >
            Ajouter au Panier
          </button>
        </div>
      </div>
    </div>
  );
}
