import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { getCoupons, createCoupon, updateCoupon, deleteCoupon } from '../controllers/adminCoupon.controller';

const router = Router();

router.use(adminProtect);

router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;
