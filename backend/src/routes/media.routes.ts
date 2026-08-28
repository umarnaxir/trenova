import { Router } from 'express';
import multer from 'multer';
import { adminProtect } from '../middleware/auth';
import { uploadMedia } from '../controllers/media.controller';

const router = Router();

// Use memory storage for Cloudinary upload stream
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

router.use(adminProtect);

router.post('/upload', upload.single('image'), uploadMedia);

export default router;
