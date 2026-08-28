import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { recalculateProductRating } from './review.controller';

// GET /api/v1/admin/reviews — list all reviews
export const listReviews = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    const where = status ? { status: status as any } : {};

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          product: { select: { id: true, name: true, slug: true } }
        }
      }),
      prisma.review.count({ where })
    ]);

    // Attach user names
    const userIds = [...new Set(reviews.map(r => r.userId))];
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, firstName: true, lastName: true, email: true }
    });
    const userMap = Object.fromEntries(users.map(u => [u.id, u]));

    const enriched = reviews.map(r => ({
      ...r,
      user: userMap[r.userId] || null
    }));

    res.status(200).json({ success: true, data: { reviews: enriched, total, page, pageSize } });
  } catch (error) {
    console.error('Admin List Reviews Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};

// PUT /api/v1/admin/reviews/:id/status — approve or reject
export const updateReviewStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status }
    });

    // Recalculate product rating after approval/rejection
    await recalculateProductRating(review.productId);

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error('Update Review Status Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update review status' });
  }
};

// DELETE /api/v1/admin/reviews/:id
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    await prisma.review.delete({ where: { id } });
    await recalculateProductRating(review.productId);

    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
};
