import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { createProduct, updateProduct, deleteProduct, deleteProducts } from '../controllers/adminCatalog.controller';
import { getProducts } from '../controllers/catalog.controller';

const router = Router();

router.use(adminProtect);

router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/products/bulk-delete', deleteProducts);

export default router;
