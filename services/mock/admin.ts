import type {
  AdminBrand,
  AdminNotification,
  AdminStat,
  CmsPage,
  MediaItem,
  NewsletterSubscriber,
} from "@/types/admin";
import { products } from "@/services/mock/products";
import { categories } from "@/services/mock/categories";
import { coupons } from "@/services/mock/coupons";
import { reviews } from "@/services/mock/reviews";
import { mockOrders } from "@/services/mock/user";

export const adminStats: AdminStat[] = [
  { label: "Revenue", value: "₹4.2L", change: "+12.4%", trend: "up" },
  { label: "Orders", value: "318", change: "+8.1%", trend: "up" },
  { label: "Users", value: "1,204", change: "+5.6%", trend: "up" },
  { label: "Conversion", value: "3.8%", change: "-0.3%", trend: "down" },
];

export const adminBrands: AdminBrand[] = [
  { id: "brand-1", name: "Trenova", slug: "trenova", productCount: products.length },
];

export const adminNotifications: AdminNotification[] = [
  {
    id: "n1",
    title: "New order received",
    body: "Order TRN-10511 is awaiting fulfillment.",
    createdAt: "2026-08-01T09:35:00.000Z",
    read: false,
  },
  {
    id: "n2",
    title: "Low inventory",
    body: "Noir Essential Hoodie has 32 units remaining.",
    createdAt: "2026-07-30T16:00:00.000Z",
    read: false,
  },
  {
    id: "n3",
    title: "Coupon used",
    body: "TRENOVA10 was applied on a checkout.",
    createdAt: "2026-07-28T08:05:00.000Z",
    read: true,
  },
];

export const mediaLibrary: MediaItem[] = products.flatMap((product) =>
  (["front", "left", "right"] as const).map((angle, index) => ({
    id: `${product.id}-${angle}`,
    name: `${product.slug}-${angle}.svg`,
    url: product.images[angle],
    type: "image" as const,
    sizeKb: 18 + index * 2,
    createdAt: product.createdAt,
  })),
);

export const cmsPages: CmsPage[] = [
  { id: "cms-1", title: "About", slug: "about", status: "published", updatedAt: "2026-07-01T00:00:00.000Z" },
  { id: "cms-2", title: "FAQ", slug: "faq", status: "published", updatedAt: "2026-07-05T00:00:00.000Z" },
  { id: "cms-3", title: "Home Promo", slug: "home-promo", status: "draft", updatedAt: "2026-08-02T00:00:00.000Z" },
];

export const newsletterSubscribers: NewsletterSubscriber[] = [
  { id: "ns-1", email: "hello@example.com", subscribedAt: "2026-06-01T00:00:00.000Z", status: "active" },
  { id: "ns-2", email: "style@example.com", subscribedAt: "2026-07-11T00:00:00.000Z", status: "active" },
  { id: "ns-3", email: "left@example.com", subscribedAt: "2026-05-20T00:00:00.000Z", status: "unsubscribed" },
];

export const adminCatalog = {
  products,
  categories,
  coupons,
  reviews,
  orders: mockOrders,
};
