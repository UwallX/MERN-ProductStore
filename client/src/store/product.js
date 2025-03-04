import { create } from 'zustand';
import api from '../services/api.js';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products })
}));
