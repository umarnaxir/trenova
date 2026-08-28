import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// POST /api/v1/reviews — submit a review (must be logged in + purchased)
export const submitReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { productId, rating, comment } = req.body;

    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'productId and a rating between 1-5 are required' });
    }

    let product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      product = await prisma.product.findUnique({ where: { slug: productId } });
    }
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const realProductId = product.id;

    // Upsert so a user can update their own review
    const review = await prisma.review.upsert({
      where: { userId_productId: { userId, productId: realProductId } },
      update: { rating, comment, status: 'PENDING' },
      create: { userId, productId: realProductId, rating, comment, status: 'PENDING' }
    });

    // Recalculate product rating from approved reviews
    await recalculateProductRating(realProductId);

    res.status(201).json({ success: true, message: 'Review submitted for moderation', data: review });
  } catch (error: any) {
    console.error('Submit Review Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to submit review' });
  }
};

// GET /api/v1/reviews/:productId — get approved reviews for a product
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const rawProductId = req.params.productId as string;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    let product = await prisma.product.findUnique({ where: { id: rawProductId } });
    if (!product) {
      product = await prisma.product.findUnique({ where: { slug: rawProductId } });
    }
    const productId = product ? product.id : rawProductId;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId, status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          // Get reviewer name without exposing sensitive data
          product: { select: { name: true } }
        }
      }),
      prisma.review.count({ where: { productId, status: 'APPROVED' } })
    ]);

    // Attach user names — fetch separately to avoid full user exposure
    const userIds = [...new Set(reviews.map(r => r.userId))];
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, firstName: true, lastName: true }
    });
    const userMap = Object.fromEntries(users.map(u => [u.id, u]));

    const enriched = reviews.map(r => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      reviewer: userMap[r.userId]
        ? `${userMap[r.userId].firstName || ''} ${userMap[r.userId].lastName || ''}`.trim() || 'Anonymous'
        : 'Anonymous'
    }));

    res.status(200).json({
      success: true,
      data: { reviews: enriched, total, page, pageSize }
    });
  } catch (error: any) {
    console.error('Get Reviews Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};

// GET /api/v1/reviews/my/:productId — check if current user has reviewed a product
export const getMyReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const rawProductId = req.params.productId as string;
    let product = await prisma.product.findUnique({ where: { id: rawProductId } });
    if (!product) {
      product = await prisma.product.findUnique({ where: { slug: rawProductId } });
    }
    const productId = product ? product.id : rawProductId;

    const review = await prisma.review.findUnique({
      where: { userId_productId: { userId, productId } }
    });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch review' });
  }
};

// Helper: recalculate product avg rating from all APPROVED reviews
export async function recalculateProductRating(productId: string) {
  const result = await prisma.review.aggregate({
    where: { productId, status: 'APPROVED' },
    _avg: { rating: true },
    _count: { rating: true }
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      rating: result._avg.rating ?? 0,
      reviewCount: result._count.rating
    }
  });
}
