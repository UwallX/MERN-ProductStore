import { create } from 'zustand';
import api from '../services/api.js';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async(newProduct) => {
    if(!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Todos os campos são obrigatórios!' }
    }

    const res = await api.post('/products', newProduct);
    set((state) => ({ products: [...state.products, res.data.data]}));
    return { success: true, message: 'Produto adicionado com sucesso!' };
  }
}));
