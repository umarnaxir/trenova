import { Router } from 'express';
import { adminProtect } from '../middleware/auth';
import { listReviews, updateReviewStatus, deleteReview } from '../controllers/adminReview.controller';

const router = Router();

router.use(adminProtect);

router.get('/', listReviews);
router.put('/:id/status', updateReviewStatus);
router.delete('/:id', deleteReview);

export default router;
