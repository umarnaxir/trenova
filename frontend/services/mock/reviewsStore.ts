import type { AdminReview } from "@/types/admin";
import { reviews as seedReviews } from "@/services/mock/reviews";

const REVIEWS_KEY = "trenova-admin-reviews";

export function getReviewsStore(): AdminReview[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(REVIEWS_KEY);
  if (!raw) return [];
  try {
    const list: AdminReview[] = JSON.parse(raw);
    return list.filter((r) => !["rev-1", "rev-2", "rev-3", "rev-4"].includes(r.id));
  } catch {
    return [];
  }
}

export function saveReviewsStore(list: AdminReview[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
  }
}

export function appendPendingReview(input: {
  productId: string;
  productName?: string;
  rating: number;
  comment?: string;
  userName?: string;
  userEmail?: string;
}): AdminReview {
  const current = getReviewsStore();
  const newReview: AdminReview = {
    id: `rev-${Date.now()}`,
    productId: input.productId,
    product: {
      id: input.productId,
      name: input.productName || "Trenova Essential Product",
      slug: input.productId,
    },
    userId: `usr-${Date.now()}`,
    user: {
      id: `usr-${Date.now()}`,
      firstName: input.userName ? input.userName.split(" ")[0] : "Customer",
      lastName: input.userName && input.userName.split(" ").length > 1 ? input.userName.split(" ").slice(1).join(" ") : "",
      email: input.userEmail || "customer@example.com",
    },
    rating: input.rating,
    comment: input.comment,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  const updated = [newReview, ...current];
  saveReviewsStore(updated);
  return newReview;
}

export function updateReviewStatusInStore(id: string, status: "APPROVED" | "REJECTED" | "PENDING"): AdminReview | null {
  const current = getReviewsStore();
  const index = current.findIndex((r) => r.id === id);
  if (index < 0) return null;
  current[index] = { ...current[index], status };
  saveReviewsStore(current);
  return current[index];
}

export function deleteReviewFromStore(id: string): boolean {
  const current = getReviewsStore();
  const filtered = current.filter((r) => r.id !== id);
  saveReviewsStore(filtered);
  return true;
}

function mapSeedReviews(): AdminReview[] {
  return seedReviews.map((r) => ({
    id: r.id,
    productId: r.productId,
    product: {
      id: r.productId,
      name: r.productId === "prod-noir-hoodie" ? "Noir Essential Hoodie" : "Aurora Oversized Tee",
      slug: r.productId,
    },
    userId: "usr-seed",
    user: {
      id: "usr-seed",
      firstName: r.author.split(" ")[0] || "Aarav",
      lastName: r.author.split(" ")[1] || "Mehta",
      email: `${r.author.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    },
    rating: r.rating,
    comment: r.body,
    status: "APPROVED",
    createdAt: r.createdAt,
  }));
}
