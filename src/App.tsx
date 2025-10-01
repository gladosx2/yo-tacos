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

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-orange-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <img src="/image.png" alt="Yo Tacos" className="h-12 w-auto object-contain" />
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  YO TACOS
                </h3>
              </div>
              <p className="text-gray-400 mb-2">Saveurs Authentiques & Qualité Premium</p>
              <p className="text-gray-500 text-sm">
                Ouvert tous les jours • Commande rapide • Livraison disponible
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border border-orange-500/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d850.3771142375292!2d2.1558574!3d44.0508868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12adeb13b6beb459%3A0xbdf369bdf1940dd9!2sYo%20tacos!5e1!3m2!1sfr!2sfr!4v1759317133583!5m2!1sfr!2sfr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Yo Tacos"
              ></iframe>
            </div>
          </div>

          <div className="text-center text-gray-600 text-sm border-t border-gray-800 pt-6">
            © 2025 Yo Tacos. Tous droits réservés.
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
