import {type Product } from "../types";

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    return res.json();
  },

  getProducts: async (categories: string[] = [], sort: 'asc' | 'desc' | 'default' = 'default'): Promise<Product[]> => {
    let url = `${BASE_URL}/products`;
    
    if (categories.length === 1) {
      url = `${BASE_URL}/products/category/${categories[0]}`;
    }

    if (sort !== 'default') {
      url += `?sort=${sort}`;
    }

    const res = await fetch(url);
    const data: Product[] = await res.json();

    if (categories.length > 1) {
      return data.filter(p => categories.includes(p.category));
    }

    return data;
  },

  
  getProduct: async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  }
};