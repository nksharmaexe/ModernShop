import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Truck, Shield } from 'lucide-react';
import { api } from '../services/api';
import {type Product } from '../types';
import { useCart } from '../context/CartContext';
import { Spinner } from '../components/Loading';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getProduct(id)
      .then(setProduct)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 flex items-center justify-center border border-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[500px] w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                <Star size={16} className="text-yellow-500 fill-current mr-1.5" />
                <span className="font-bold text-gray-900">{product.rating.rate}</span>
                <span className="text-gray-500 ml-1">({product.rating.count} reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-b border-gray-100 py-8 mb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-3">
                <Truck size={20} />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield size={20} />
                <span>2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;