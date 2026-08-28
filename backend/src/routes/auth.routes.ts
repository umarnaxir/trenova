import { Router } from 'express';
import { 
  sendOtp, 
  verifyOtp, 
  register, 
  login, 
  getProfile, 
  changePassword, 
  sendForgotOtp, 
  verifyForgotOtp, 
  resetPassword,
  forgotPassword 
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { otpRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/send-otp', otpRateLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password/send-otp', otpRateLimiter, sendForgotOtp);
router.post('/forgot-password/verify-otp', verifyForgotOtp);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', otpRateLimiter, forgotPassword);
router.get('/profile', protect, getProfile);
router.put('/change-password', protect, changePassword);

export default router;


