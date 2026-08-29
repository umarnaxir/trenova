import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import {
  getInstagramShots,
  createInstagramShot,
  updateInstagramShot,
  deleteInstagramShot,
  replaceInstagramShots,
} from '../controllers/adminInstagram.controller';

const router = Router();

router.use(adminProtect);

router.get('/', getInstagramShots);
router.post('/', createInstagramShot);
router.put('/:id', updateInstagramShot);
router.delete('/:id', deleteInstagramShot);
router.put('/', replaceInstagramShots);

export default router;
