import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all hover:shadow-md"
              >
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                </Link>

                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <Link to={`/product/${item.id}`} className="font-semibold text-lg text-gray-900 hover:text-blue-600 line-clamp-1">
                      {item.title}
                    </Link>
                    <span className="font-bold text-gray-900 mt-2 sm:mt-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 capitalize mb-4">{item.category}</p>

                  <div className="flex items-center justify-center sm:justify-between w-full">
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-gray-600 hover:text-black transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-gray-600 hover:text-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-6 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (Estimated)</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${(totalPrice * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 group">
                <span>Checkout</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="mt-4 text-xs text-center text-gray-400">
                Secure Checkout powered by Stripe (Demo)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;