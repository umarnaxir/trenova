const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

import type { Review } from '@/types/review';
import { useAuthStore } from '@/hooks/stores/authStore';

export type MyReview = {
  id: string;
  rating: number;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

export async function getProductReviews(productId: string, page = 1, pageSize = 10): Promise<Review[]> {
  try {
    const res = await fetch(`${API_URL}/reviews/${productId}?page=${page}&pageSize=${pageSize}`);
    if (res.ok) {
      const json = await res.json();
      const apiReviews = json.data?.reviews ?? [];
      if (apiReviews.length > 0) {
        return apiReviews.map((r: any) => ({
          id: r.id,
          productId,
          author: r.reviewer || 'Anonymous',
          rating: r.rating,
          title: '',
          body: r.comment || '',
          createdAt: r.createdAt,
          verified: true
        }));
      }
    }
  } catch {
    // API fetch failed
  }

  try {
    const { getReviewsStore } = await import('@/services/mock/reviewsStore');
    const storeReviews = getReviewsStore();
    return storeReviews
      .filter((r) => (r.productId === productId || r.product?.id === productId || r.product?.slug === productId) && r.status === 'APPROVED')
      .map((r) => ({
        id: r.id,
        productId: r.productId,
        author: r.user ? `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() || r.user.email : 'Customer',
        rating: r.rating,
        title: '',
        body: r.comment || '',
        createdAt: r.createdAt,
        verified: true
      }));
  } catch {
    return [];
  }
}

export async function submitReview(productId: string, rating: number, comment: string): Promise<{ success: boolean; message?: string }> {
  let token = useAuthStore.getState().token;
  if (!token && typeof window !== 'undefined') {
    token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  }
  const user = useAuthStore.getState().user;
  if (!token && !user) return { success: false, message: 'Please log in to submit a review' };

  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`
      },
      body: JSON.stringify({ productId, rating, comment })
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, message: json.message || 'Review submitted for moderation' };
    }
    return { success: false, message: json.message || 'Could not submit review' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to submit review. Check your connection.' };
  }
}

export async function getMyReview(productId: string): Promise<MyReview | null> {
  let token = useAuthStore.getState().token;
  if (!token && typeof window !== 'undefined') {
    token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  }
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/reviews/my/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}
