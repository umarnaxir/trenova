import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { getAdminOrders, updateOrderStatus } from '../controllers/adminOrder.controller';

const router = Router();

router.use(adminProtect);

router.get('/', getAdminOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
