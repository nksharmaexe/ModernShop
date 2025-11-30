import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import {type Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Loading';
import { Filter, X, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedCategories = searchParams.getAll('category');
  const sort = (searchParams.get('sort') as 'asc' | 'desc' | 'default') || 'default';

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts(selectedCategories, sort);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    newCategories.forEach(c => newParams.append('category', c));
    setSearchParams(newParams);
  };

  const handleSortChange = (newSort: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newSort === 'default') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', newSort);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 lg:hidden flex justify-between items-center">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-700"
        >
          <Filter size={18} />
          <span>Filters & Sort</span>
        </button>
        <span className="text-xs text-gray-500">{products.length} Items</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:bg-transparent lg:w-64 lg:block
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="h-full overflow-y-auto p-6 lg:p-0">
              <div className="flex justify-between items-center lg:hidden mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  Sort Order
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'default', label: 'Recommended', icon: null },
                    { value: 'asc', label: 'Price: Low to High', icon: <ArrowUpAZ size={14} /> },
                    { value: 'desc', label: 'Price: High to Low', icon: <ArrowDownAZ size={14} /> }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full flex items-center space-x-2 text-sm px-3 py-2 rounded-md transition-colors ${
                        sort === option.value ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">Categories</h3>
                  {(selectedCategories.length > 0 || sort !== 'default') && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group p-1">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="peer h-4 w-4 rounded border-gray-300 text-black focus:ring-black transition duration-150 ease-in-out"
                        />
                      </div>
                      <span className="text-sm text-gray-600 capitalize group-hover:text-black transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            ></div>
          )}

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6 hidden lg:flex">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategories.length > 0 ? 'Filtered Results' : 'All Products'}
              </h1>
              <span className="text-sm text-gray-500">{products.length} Products Found</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;