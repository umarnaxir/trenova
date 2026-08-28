import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { getSettings, updateSettings, getPublicSetting } from '../controllers/adminSettings.controller';

const router = Router();

// Public route for storefront to read individual settings (e.g. announcement_bar)
router.get('/public/:key', getPublicSetting);

// Admin protected routes
router.get('/', adminProtect, getSettings);
router.put('/', adminProtect, updateSettings);

export default router;
