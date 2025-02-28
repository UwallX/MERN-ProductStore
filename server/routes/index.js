import { Router } from 'express';
import ProductRoutes from './product.routes.js';

const routes = Router();
routes.get('/api', (req, res) => {
  res.send('Server is ready!');
});

routes.use('/api/products', ProductRoutes);

export default routes;
