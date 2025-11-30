import React from 'react';
import { Link,  } from 'react-router-dom';
import { ShoppingBag,   } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-black text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <ShoppingBag size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ModernShop</span>
          </Link>

          <div className="flex items-center space-x-6">
            

            <Link 
              to="/cart" 
              className="relative p-2 text-gray-500 hover:text-black transition-colors duration-200"
              aria-label="View Cart"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full min-w-[20px] shadow-sm animate-bounce-short">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;