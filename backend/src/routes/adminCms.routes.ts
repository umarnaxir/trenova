import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import {
  listCmsPages,
  createCmsPage,
  getCmsPage,
  updateCmsPage,
  deleteCmsPage
} from '../controllers/adminCms.controller';

const router = Router();

router.use(adminProtect);

router.get('/', listCmsPages);
router.post('/', createCmsPage);
router.get('/:id', getCmsPage);
router.put('/:id', updateCmsPage);
router.delete('/:id', deleteCmsPage);

export default router;
