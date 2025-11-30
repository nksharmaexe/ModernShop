import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import {  type Product } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <Link to={`/product/${product.id}`} className="relative block h-48 sm:h-64 overflow-hidden bg-white p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
          {product.category}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mt-2 space-x-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-500 font-medium">{product.rating.rate}</span>
          <span className="text-xs text-gray-400">({product.rating.count})</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="p-2.5 rounded-full bg-gray-50 text-gray-900 hover:bg-black hover:text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;