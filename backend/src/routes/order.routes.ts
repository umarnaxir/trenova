import { Router } from 'express';
import { checkout, getMyOrders, trackOrder } from '../controllers/order.controller';
import { protect } from '../middleware/auth';

const router = Router();

// Public / Guest checkout allowed
router.post('/checkout', checkout);
router.get('/track', trackOrder);

// Protected routes (requires customer login)
router.get('/my-orders', protect, getMyOrders);

export default router;
