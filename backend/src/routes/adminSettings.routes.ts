import { Router } from 'express';
import { adminProtect, requireAdmin } from '../middleware/auth';
import { getSettings, updateSettings, getPublicSetting } from '../controllers/adminSettings.controller';

const router = Router();

// Public route for storefront to read individual settings (e.g. announcement_bar)
router.get('/public/:key', getPublicSetting);

// Admin protected routes (Admin role only)
router.get('/', adminProtect, requireAdmin, getSettings);
router.put('/', adminProtect, requireAdmin, updateSettings);

export default router;
