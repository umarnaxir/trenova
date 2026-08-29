import { Router } from 'express';
import { getPublicCmsPage } from '../controllers/adminCms.controller';
import { getInstagramShots } from '../controllers/adminInstagram.controller';

const router = Router();

router.get('/instagram', getInstagramShots);
router.get('/:slug', getPublicCmsPage);

export default router;
