import { Router } from 'express';

import authRoutes from './auth.routes';
import adminAuthRoutes from './adminAuth.routes';
import catalogRoutes from './catalog.routes';
import adminCatalogRoutes from './adminCatalog.routes';
import mediaRoutes from './media.routes';
import orderRoutes from './order.routes';
import adminOrderRoutes from './adminOrder.routes';
import userRoutes from './user.routes';
import couponRoutes from './coupon.routes';
import adminCouponRoutes from './adminCoupon.routes';
import paymentRoutes from './payment.routes';
import reviewRoutes from './review.routes';
import adminReviewRoutes from './adminReview.routes';
import adminAnalyticsRoutes from './adminAnalytics.routes';
import adminSettingsRoutes from './adminSettings.routes';
import adminInventoryRoutes from './adminInventory.routes';
import adminCmsRoutes from './adminCms.routes';
import adminInstagramRoutes from './adminInstagram.routes';
import adminUserRoutes from './adminUser.routes';
import adminTeamRoutes from './adminTeam.routes';
import cmsRoutes from './cms.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/coupons', couponRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/cms', cmsRoutes);
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/catalog', adminCatalogRoutes);
router.use('/admin/media', mediaRoutes);
router.use('/admin/orders', adminOrderRoutes);
router.use('/admin/users', adminUserRoutes);
router.use('/admin/team', adminTeamRoutes);
router.use('/admin/coupons', adminCouponRoutes);
router.use('/admin/reviews', adminReviewRoutes);
router.use('/admin/analytics', adminAnalyticsRoutes);
router.use('/admin/settings', adminSettingsRoutes);
router.use('/admin/inventory', adminInventoryRoutes);
router.use('/admin/cms', adminCmsRoutes);
router.use('/admin/instagram', adminInstagramRoutes);
router.use('/catalog', catalogRoutes);
router.use('/orders', orderRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is healthy',
    data: {
      timestamp: new Date().toISOString(),
    }
  });
});

export default router;
