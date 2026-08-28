import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
  updateProfile,
  changePassword,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
} from '../controllers/user.controller';

const router = Router();

router.use(protect); // All routes require login

router.put('/profile', updateProfile);
router.put('/password', changePassword);

router.get('/addresses', getAddresses);
router.post('/addresses', addAddress);
router.put('/addresses/:id', updateAddress);
router.delete('/addresses/:id', deleteAddress);

export default router;
