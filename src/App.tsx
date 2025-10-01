import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { Cart } from './components/Cart';
import { useCart } from './hooks/useCart';

function App() {
  const cart = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionMap: Record<string, string> = {
      student: 'menu-étudiant',
      tacos: 'tacos',
      sides: 'accompagnements',
      drinks: 'boissons',
    };

    const targetId = sectionMap[sectionId];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleExplore = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        onCartClick={() => cart.setIsOpen(true)}
        cartItemCount={cart.itemCount}
        onNavigate={scrollToSection}
      />

      <Hero onExplore={handleExplore} />

      <div ref={menuRef}>
        <MenuSection onAddToCart={cart.addToCart} />
      </div>

      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t-2 border-orange-500/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <img src="/image.png" alt="Yo Tacos" className="h-16 w-auto object-contain drop-shadow-2xl" />
                  <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                    YO TACOS
                  </h3>
                </div>
                <p className="text-lg text-gray-300 mb-3 font-medium">Saveurs Authentiques & Qualité Premium</p>
                <p className="text-gray-400 text-sm mb-6">
                  Ouvert tous les jours • Commande rapide • Livraison disponible
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-orange-500/30 shadow-xl">
                <h4 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contactez-nous
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Téléphone</p>
                      <a href="tel:+33565340000" className="text-lg font-bold text-white hover:text-orange-400 transition-colors">
                        05 65 34 00 00
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Adresse</p>
                      <p className="text-white font-medium leading-relaxed">
                        10 Avenue de Rodez<br />
                        12450 Luc-la-Primaube<br />
                        France
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Horaires</p>
                      <p className="text-white font-medium">Lun - Dim: 11h30 - 14h00, 18h00 - 22h30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-orange-400 mb-4 text-center lg:text-left">
                Où nous trouver
              </h4>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/40 hover:border-orange-500/60 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-orange-500/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d850.3771142375292!2d2.1558574!3d44.0508868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12adeb13b6beb459%3A0xbdf369bdf1940dd9!2sYo%20tacos!5e1!3m2!1sfr!2sfr!4v1759317133583!5m2!1sfr!2sfr"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Yo Tacos"
                  className="grayscale-[0.3] contrast-125 brightness-95"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm border-t-2 border-gray-800/50 pt-8">
            <p className="mb-2">© 2025 Yo Tacos. Tous droits réservés.</p>
            <p className="text-xs text-gray-600">Cuisine traditionnelle • Produits frais • Fait maison</p>
          </div>
        </div>
      </footer>

      {cart.isOpen && (
        <Cart
          cart={cart.cart}
          onClose={() => cart.setIsOpen(false)}
          onUpdateQuantity={cart.updateQuantity}
          onRemove={cart.removeFromCart}
          onClearCart={cart.clearCart}
          totalAmount={cart.totalAmount}
        />
      )}
    </div>
  );
}

export default App;
