import {type Product } from "../types";

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    return res.json();
  },

  getProducts: async (categories: string[] = [], sort: 'asc' | 'desc' | 'default' = 'default'): Promise<Product[]> => {
    let url = `${BASE_URL}/products`;
    let serverSort = sort;
    
    // If multiple categories, we can't use server-side sorting effectively
    // so fetch all and sort client-side
    if (categories.length > 1) {
      serverSort = 'default';
    } else if (categories.length === 1) {
      url = `${BASE_URL}/products/category/${categories[0]}`;
    }

    // Add sort query parameter to URL if not default
    if (serverSort !== 'default') {
      url += `?sort=${serverSort}`;
    }

    const res = await fetch(url);
    let data: Product[] = await res.json();

    // Handle multiple categories by filtering client-side
    if (categories.length > 1) {
      data = data.filter(p => categories.includes(p.category));
    }

    // Client-side sorting for consistency across all scenarios
    if (sort === 'asc') {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  },

  
  getProduct: async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  }
};