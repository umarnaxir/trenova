import { Router } from 'express';
import { getCategories, getCategoryBySlug, getProducts, getProductBySlug } from '../controllers/catalog.controller';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:slug', getCategoryBySlug);
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);

export default router;
