import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { getInventory, updateInventory } from '../controllers/adminInventory.controller';

const router = Router();

router.use(adminProtect);
router.get('/', getInventory);
router.patch('/:id', updateInventory);

export default router;
