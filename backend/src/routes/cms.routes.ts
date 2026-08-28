import { Router } from 'express';
import { getPublicCmsPage } from '../controllers/adminCms.controller';

const router = Router();

router.get('/:slug', getPublicCmsPage);

export default router;
