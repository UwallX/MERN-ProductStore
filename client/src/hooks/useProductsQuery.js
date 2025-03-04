import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from '../services/api';
import { useProductStore } from "../store/product";

const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return data.data;
}

export const useProductsQuery = () => {
  const setProducts = useProductStore((state) => state.setProducts);
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => setProducts(data)
  });

  const createProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      if(!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: 'Todos os campos são obrigatórios!' };
      };
      const res = await api.post('/products', newProduct);
      return { success: true, message: 'Produto adicionado com sucesso', data: res.data.data };
    },
    onSuccess: (newProduct) => {
      queryClient.setQueryData(['products'], (oldProducts) => [...oldProducts, newProduct.data]);
      setProducts((state) => [...state, newProduct.data]);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (pid) => {
      const res = await api.delete(`/products/${pid}`);
      return { success: true, message: res.data.message, id: pid };
    },
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData(['products'], (oldProducts) => oldProducts.filter(p => p._id !== deletedProduct.id));
      setProducts((state) => state.filter(p => p._id != deletedProduct.id));
    }
  });

  const editProductMutation = useMutation({
    mutationFn: async ({ pid, data }) => {
      const res = await api.put(`/products/${pid}`, data);
      return { success: true, message: res.data.message, data: res.data.data };
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldProducts) => oldProducts.map(p => p._id === updatedProduct.data._id ? updatedProduct.data : p));
      setProducts((state) => state.map(p => p._id === updatedProduct.data._id ? updatedProduct.data : p));
    }
  });

  return {
    products, isLoading, error,
    createProduct: createProductMutation,
    deleteProduct: deleteProductMutation,
    editProduct: editProductMutation
  };
}
