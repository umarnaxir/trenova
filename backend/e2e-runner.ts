import app from './src/app.js';
import prisma from './src/lib/prisma.js';
import jwt from 'jsonwebtoken';

async function runE2ETests() {
  const PORT = 5005;
  const server = app.listen(PORT);
  const BASE_URL = `http://localhost:${PORT}/api/v1`;

  console.log('====================================================');
  console.log('🚀 STARTING COMPREHENSIVE END-TO-END (E2E) TEST SUITE');
  console.log('====================================================\n');

  let passedTests = 0;
  let failedTests = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failedTests++;
    }
  }

  // State to track between tests
  let userToken = '';
  let userId = '';
  let userEmail = `e2e_user_${Date.now()}@example.com`;
  let adminToken = '';
  let categoryId = '';
  let categorySlug = `e2e-cat-${Date.now()}`;
  let productId = '';
  let productSlug = `e2e-jacket-${Date.now()}`;
  let couponCode = `E2E50_${Date.now()}`;
  let couponId = '';
  let orderId = '';
  let orderNumber = '';
  let reviewId = '';

  try {
    // ----------------------------------------------------
    // TEST 1: User Registration & Authentication
    // ----------------------------------------------------
    console.log('▶️  TEST 1: User Registration, Login & Profile Management');

    const otpPhone = '9' + Math.floor(100000000 + Math.random() * 900000000).toString();
    const sendOtpRes = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: otpPhone })
    });
    const sendOtpData = await sendOtpRes.json();
    assert(sendOtpRes.status === 200 && sendOtpData.success, 'Send OTP for registration');
    const devOtp = sendOtpData.devOtp;

    const verifyOtpRes = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: otpPhone, code: devOtp })
    });
    const verifyOtpData = await verifyOtpRes.json();
    assert(verifyOtpRes.status === 200 && verifyOtpData.success && !!verifyOtpData.data?.otpToken, 'Verify OTP for registration');
    const otpToken = verifyOtpData.data?.otpToken;

    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        password: 'Password123!',
        firstName: 'E2E',
        lastName: 'Tester',
        phone: otpPhone,
        otpToken: otpToken
      })
    });
    const regData = await regRes.json();
    assert(regRes.status === 201 && regData.success && !!regData.data.token, 'Register new user account');
    userToken = regData.data.token;
    userId = regData.data.user.id;

    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: 'Password123!' })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.success && loginData.data.user.email === userEmail, 'User login & token issuance');

    const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const profileData = await profileRes.json();
    assert(profileRes.status === 200 && profileData.data.id === userId, 'Fetch authenticated user profile');

    const addAddressRes = await fetch(`${BASE_URL}/user/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        label: 'Workplace',
        fullName: 'E2E Tester',
        phone: '9876543210',
        line1: '42 Innovation Way',
        city: 'TechCity',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
        isDefault: true
      })
    });
    const addAddressData = await addAddressRes.json();
    assert(addAddressRes.status === 201 && addAddressData.data.city === 'TechCity', 'Add new shipping address to user profile');

    const getAddressesRes = await fetch(`${BASE_URL}/user/addresses`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const getAddressesData = await getAddressesRes.json();
    assert(getAddressesRes.status === 200 && getAddressesData.data.length > 0, 'Fetch saved user addresses');

    console.log();

    // ----------------------------------------------------
    // TEST 2: Admin Authentication & Privileged Operations
    // ----------------------------------------------------
    console.log('▶️  TEST 2: Admin Authentication & Privileged Access');

    adminToken = jwt.sign(
      { id: 'e2e-admin-id', role: 'SUPERADMIN', type: 'admin' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );
    assert(!!adminToken, 'Sign admin JWT token with SUPERADMIN claims');

    const adminDashRes = await fetch(`${BASE_URL}/admin/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminDashData = await adminDashRes.json();
    assert(adminDashRes.status === 200 && adminDashData.success, 'Access admin analytics dashboard API');

    console.log();

    // ----------------------------------------------------
    // TEST 3: Catalog Management & Storefront API
    // ----------------------------------------------------
    console.log('▶️  TEST 3: Catalog Management & Storefront Operations');

    const createdCat = await prisma.category.create({
      data: {
        slug: categorySlug,
        name: 'E2E Category',
        description: 'E2E Testing Category',
        image: 'https://example.com/cat.jpg'
      }
    });
    categoryId = createdCat.id;
    assert(!!categoryId, 'Create product category in DB');

    const newProduct = {
      name: 'E2E Cyber Jacket',
      sku: `SKU-${Date.now()}`,
      price: 2500,
      compareAtPrice: 3000,
      categorySlug: categorySlug,
      shortDescription: 'High-tech performance jacket',
      description: 'Full technical specifications for end-to-end testing jacket',
      colors: [{ name: 'Black', hex: '#000000' }],
      sizes: ['L', 'XL'],
      images: { front: 'https://example.com/jacket-front.jpg' },
      stock: 50,
      sizeStock: { L: 30, XL: 20 },
      isFeatured: true,
      tags: ['cyber', 'winter']
    };

    const createProductRes = await fetch(`${BASE_URL}/admin/catalog/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify(newProduct)
    });
    const createProductData = await createProductRes.json();
    assert(createProductRes.status === 201 && createProductData.success, 'Admin creates product via catalog API');
    productId = createProductData.data.id;
    productSlug = createProductData.data.slug;

    const listProductsRes = await fetch(`${BASE_URL}/catalog/products?category=${categorySlug}`);
    const listProductsData = await listProductsRes.json();
    assert(
      listProductsRes.status === 200 &&
      listProductsData.data.items.some((p: any) => p.id === productId),
      'Fetch public catalog products filtered by category'
    );

    const getSingleProductRes = await fetch(`${BASE_URL}/catalog/products/${productSlug}`);
    const getSingleProductData = await getSingleProductRes.json();
    assert(
      getSingleProductRes.status === 200 && getSingleProductData.data.name === 'E2E Cyber Jacket',
      'Fetch single product detail by slug'
    );

    console.log();

    // ----------------------------------------------------
    // TEST 4: Coupon Engine & Discount Validation
    // ----------------------------------------------------
    console.log('▶️  TEST 4: Coupon Engine & Validation Rules');

    const createCouponRes = await fetch(`${BASE_URL}/admin/coupons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        code: couponCode,
        description: 'E2E Flat ₹500 discount',
        type: 'FIXED',
        value: 500,
        minOrder: 1500,
        maxUses: 100,
        isActive: true
      })
    });
    const createCouponData = await createCouponRes.json();
    assert(createCouponRes.status === 201 && createCouponData.success, 'Admin creates promo coupon');
    couponId = createCouponData.data.id;

    const validateMinFailRes = await fetch(`${BASE_URL}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: couponCode, cartTotal: 1000 })
    });
    const validateMinFailData = await validateMinFailRes.json();
    assert(!validateMinFailData.data.valid && validateMinFailData.data.reason === 'MinOrderNotMet', 'Coupon minOrder restriction enforced');

    const validateSuccessRes = await fetch(`${BASE_URL}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: couponCode, cartTotal: 2500 })
    });
    const validateSuccessData = await validateSuccessRes.json();
    assert(
      validateSuccessData.data.valid &&
      validateSuccessData.data.discountAmount === 500 &&
      validateSuccessData.data.finalTotal === 2000,
      'Coupon discount calculation (FIXED 500 off 2500)'
    );

    console.log();

    // ----------------------------------------------------
    // TEST 5: Cart & Checkout Order Processing
    // ----------------------------------------------------
    console.log('▶️  TEST 5: Checkout Order Processing & Stock Allocation');

    const checkoutRes = await fetch(`${BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        userEmail: userEmail,
        fullName: 'E2E Tester',
        phone: '9876543210',
        line1: '42 Innovation Way',
        city: 'TechCity',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
        items: [
          {
            productId: productId,
            name: 'E2E Cyber Jacket',
            size: 'L',
            color: 'Black',
            quantity: 2,
            price: 2500,
            image: 'https://example.com/jacket-front.jpg'
          }
        ],
        paymentMethod: 'COD',
        couponCode: couponCode
      })
    });
    const checkoutData = await checkoutRes.json();
    assert(checkoutRes.status === 201 && checkoutData.success && !!checkoutData.data.orderNumber, 'Place COD Order with coupon');
    orderId = checkoutData.data.id;
    orderNumber = checkoutData.data.orderNumber;
    assert(checkoutData.data.total === 4500 && checkoutData.data.discount === 500, 'Order totals correctly calculated (2x2500 - 500 = 4500)');

    const updatedProductDB = await prisma.product.findUnique({ where: { id: productId } });
    const sizeStockObj: any = updatedProductDB?.sizeStock;
    assert(updatedProductDB?.stock === 48 && sizeStockObj['L'] === 28, 'Atomic stock deduction on order checkout (50 -> 48, L: 30 -> 28)');

    console.log();

    // ----------------------------------------------------
    // TEST 6: Order Tracking & Admin Fulfillment
    // ----------------------------------------------------
    console.log('▶️  TEST 6: Order Tracking & Admin Fulfillment Lifecycle');

    const trackRes = await fetch(`${BASE_URL}/orders/track?orderNumber=${orderNumber}&email=${encodeURIComponent(userEmail)}`);
    const trackData = await trackRes.json();
    assert(trackRes.status === 200 && trackData.success && trackData.data.status === 'PENDING', 'Public guest/customer order tracking');

    const updateStatusRes = await fetch(`${BASE_URL}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'DELIVERED' })
    });
    const updateStatusData = await updateStatusRes.json();
    assert(updateStatusRes.status === 200 && updateStatusData.data.status === 'DELIVERED', 'Admin updates order status to DELIVERED');

    console.log();

    // ----------------------------------------------------
    // TEST 7: Customer Reviews & Rating Moderation Engine
    // ----------------------------------------------------
    console.log('▶️  TEST 7: Customer Reviews & Rating Moderation Engine');

    const reviewRes = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        productId: productId,
        rating: 5,
        comment: 'Outstanding quality and fit! Verified E2E review.'
      })
    });
    const reviewData = await reviewRes.json();
    assert(reviewRes.status === 201 && reviewData.success && reviewData.data.status === 'PENDING', 'Purchaser submits product review (starts PENDING)');
    reviewId = reviewData.data.id;

    const publicReviewsBeforeRes = await fetch(`${BASE_URL}/reviews/${productId}`);
    const publicReviewsBeforeData = await publicReviewsBeforeRes.json();
    assert(
      publicReviewsBeforeRes.status === 200 && publicReviewsBeforeData.data.reviews.length === 0,
      'Pending reviews hidden from public storefront'
    );

    const approveReviewRes = await fetch(`${BASE_URL}/admin/reviews/${reviewId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'APPROVED' })
    });
    const approveReviewData = await approveReviewRes.json();
    assert(approveReviewRes.status === 200 && approveReviewData.data.status === 'APPROVED', 'Admin approves customer review');

    const publicReviewsAfterRes = await fetch(`${BASE_URL}/reviews/${productId}`);
    const publicReviewsAfterData = await publicReviewsAfterRes.json();
    assert(
      publicReviewsAfterRes.status === 200 && publicReviewsAfterData.data.reviews.length === 1,
      'Approved review appears on public storefront'
    );

    const ratedProductDB = await prisma.product.findUnique({ where: { id: productId } });
    assert(ratedProductDB?.rating === 5 && ratedProductDB?.reviewCount === 1, 'Product average rating & review count recalculated dynamically');

    console.log();

    // ----------------------------------------------------
    // TEST 8: Admin Analytics Dashboard Aggregations
    // ----------------------------------------------------
    console.log('▶️  TEST 8: Admin Analytics & Financial Metrics');

    const finalDashRes = await fetch(`${BASE_URL}/admin/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const finalDashData = await finalDashRes.json();
    assert(
      finalDashRes.status === 200 &&
      typeof finalDashData.data.totalRevenue === 'number' &&
      finalDashData.data.totalOrders > 0,
      'Live database analytics aggregation returns total revenue and order metrics'
    );

    console.log();

    // ----------------------------------------------------
    // TEST 9: Dynamic Site Settings & CMS Pages
    // ----------------------------------------------------
    console.log('▶️  TEST 9: Site Settings & CMS Pages');

    const updateSettingRes = await fetch(`${BASE_URL}/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        announcement_bar: { text: 'Festive Season Offer: Flat 20% OFF!', active: true }
      })
    });
    const updateSettingData = await updateSettingRes.json();
    assert(updateSettingRes.status === 200 && updateSettingData.success, 'Admin updates site setting');

    const getSettingRes = await fetch(`${BASE_URL}/admin/settings/public/announcement_bar`);
    const getSettingData = await getSettingRes.json();
    assert(
      getSettingRes.status === 200 && getSettingData.data?.text === 'Festive Season Offer: Flat 20% OFF!',
      'Public endpoint retrieves updated site setting'
    );

    console.log();

    // ----------------------------------------------------
    // TEST 10: Admin Editorial & CMS Page Operations
    // ----------------------------------------------------
    console.log('▶️  TEST 10: Admin Editorial & CMS Pages');

    const cmsPageSlug = `e2e-editorial-${Date.now()}`;
    const createCmsRes = await fetch(`${BASE_URL}/admin/cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        title: 'E2E Editorial Story',
        slug: cmsPageSlug,
        content: '# E2E Autumn Collection Story',
        status: 'published'
      })
    });
    const createCmsData = await createCmsRes.json();
    assert(createCmsRes.status === 201 && createCmsData.success && createCmsData.data.slug === cmsPageSlug, 'Admin creates published CMS editorial page');
    const cmsPageId = createCmsData.data.id;

    const listCmsRes = await fetch(`${BASE_URL}/admin/cms`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const listCmsData = await listCmsRes.json();
    assert(listCmsRes.status === 200 && listCmsData.data.some((p: any) => p.id === cmsPageId), 'Admin lists all CMS pages');

    const getPublicCmsRes = await fetch(`${BASE_URL}/cms/${cmsPageSlug}`);
    const getPublicCmsData = await getPublicCmsRes.json();
    assert(getPublicCmsRes.status === 200 && getPublicCmsData.data.title === 'E2E Editorial Story', 'Public storefront retrieves published editorial page by slug');

    const deleteCmsRes = await fetch(`${BASE_URL}/admin/cms/${cmsPageId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const deleteCmsData = await deleteCmsRes.json();
    assert(deleteCmsRes.status === 200 && deleteCmsData.success, 'Admin deletes CMS editorial page');

    console.log();

    // ----------------------------------------------------
    // CLEANUP
    // ----------------------------------------------------
    console.log('▶️  CLEANUP: Removing E2E Test Data');

    if (reviewId) await prisma.review.delete({ where: { id: reviewId } }).catch(() => {});
    if (orderId) await prisma.order.delete({ where: { id: orderId } }).catch(() => {});
    if (couponId) await prisma.coupon.delete({ where: { id: couponId } }).catch(() => {});
    if (productId) await prisma.product.delete({ where: { id: productId } }).catch(() => {});
    if (categoryId) await prisma.category.delete({ where: { id: categoryId } }).catch(() => {});
    if (userId) await prisma.user.delete({ where: { id: userId } }).catch(() => {});

    console.log('  ✅ Cleaned up temporary database records successfully\n');

  } catch (error) {
    console.error('❌ Unexpected error during E2E testing:', error);
  } finally {
    server.close();
    await prisma.$disconnect();
  }

  console.log('====================================================');
  console.log(`📊 E2E TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runE2ETests();
