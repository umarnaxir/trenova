import { Router } from 'express';
import { status, setup, login, changePassword } from '../controllers/adminAuth.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/status', status);
router.post('/setup', setup);
router.post('/login', login);
router.put('/change-password', protect, changePassword);

export default router;
