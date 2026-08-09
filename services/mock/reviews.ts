import type { Review } from "@/types/review";

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-aurora-tee",
    author: "Aarav Mehta",
    rating: 5,
    title: "Exceptional fabric quality",
    body: "Soft, structured, and true to size. Feels like a luxury essential.",
    createdAt: "2026-07-28T08:00:00.000Z",
    verified: true,
  },
  {
    id: "rev-2",
    productId: "prod-aurora-tee",
    author: "Ishita Kapoor",
    rating: 5,
    title: "Clean fit",
    body: "Premium look without loud branding. Perfect everyday tee.",
    createdAt: "2026-07-21T11:30:00.000Z",
    verified: true,
  },
  {
    id: "rev-3",
    productId: "prod-noir-hoodie",
    author: "Rohan Desai",
    rating: 5,
    title: "Worth every rupee",
    body: "Warm, refined, and holds shape after washes. Instant wardrobe staple.",
    createdAt: "2026-07-15T09:10:00.000Z",
    verified: true,
  },
  {
    id: "rev-4",
    productId: "prod-noir-hoodie",
    author: "Meera Shah",
    rating: 4,
    title: "Beautiful finish",
    body: "Great drape and color. Slightly roomy in XL, otherwise excellent.",
    createdAt: "2026-07-08T14:20:00.000Z",
    verified: true,
  },
];
