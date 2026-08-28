import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { getDashboardAnalytics } from '../controllers/adminAnalytics.controller';

const router = Router();

router.use(adminProtect);
router.get('/dashboard', getDashboardAnalytics);

export default router;
