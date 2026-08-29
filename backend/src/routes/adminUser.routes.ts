import { Router } from 'express';
import { getAdminUsers, updateUserStatus } from '../controllers/adminUser.controller';
import { adminProtect, requireAdmin } from '../middleware/auth';

const router = Router();

router.use(adminProtect);
router.use(requireAdmin);

router.get('/', getAdminUsers);
router.put('/:id/status', updateUserStatus);
router.patch('/:id/status', updateUserStatus);

export default router;
