import mongoose from 'mongoose';
import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('> Error while fetching products: ', error.message);
    return res.status(400).json({ success: false, message: 'Erro ao buscar todos os produtos!' });
  }
};

const createNewProduct = async (req, res) => {
  const product = req.body;

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios!' });
  };

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('> Error while creating new product: ', error.message);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  };
};

const updateProduct = async (req, res) => {
  const fields = req.body;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ success: false, message: 'ID inválido.' });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, fields, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('> Error while updating product: ', error.message);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  };
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ success: false, message: 'ID inválido.' })

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Produto deletado.' });
  } catch (error) {
    console.error('> Error while trying to delete project');
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  };
};

const ProductController = {
  getProducts: async (req, res) => await getProducts(req, res),
  createNewProduct: async (req, res) => await createNewProduct(req, res),
  updateProduct: async (req, res) => await updateProduct(req, res),
  deleteProduct: async (req, res) => await deleteProduct(req, res),
}

export default ProductController;
