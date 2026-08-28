import { Router } from 'express';
import { protect } from '../middleware/auth';
import { submitReview, getProductReviews, getMyReview } from '../controllers/review.controller';

const router = Router();

router.get('/:productId', getProductReviews);
router.post('/', protect, submitReview);
router.get('/my/:productId', protect, getMyReview);

export default router;
