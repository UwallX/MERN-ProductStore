import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const router = Router();

router.get('/', ProductController.getProducts);
router.post('/', ProductController.createNewProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
