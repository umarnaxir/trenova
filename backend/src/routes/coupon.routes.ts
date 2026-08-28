import { Router } from 'express';
import { validateCoupon } from '../controllers/coupon.controller';
import { couponRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/validate', couponRateLimiter, validateCoupon);

export default router;
