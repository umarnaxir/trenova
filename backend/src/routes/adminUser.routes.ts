import { Router } from 'express';
import { getAdminUsers, updateUserStatus } from '../controllers/adminUser.controller';

const router = Router();

router.get('/', getAdminUsers);
router.patch('/:id/status', updateUserStatus);

export default router;
