import type {
  AdminCustomer,
  AdminSettings,
  AdminStat,
  AnalyticsPoint,
  CmsPage,
  InventoryRow,
  MediaItem,
  NewsletterSubscriber,
  TeamMember,
} from "@/types/admin";
import type { Coupon } from "@/types/cart";
import type { Product, ProductColor, ProductSize } from "@/types/product";
import type { Order, OrderStatus } from "@/types/user";
import type { Review } from "@/types/review";
import { coupons as seedCoupons } from "@/services/mock/coupons";
import { reviews as seedReviews } from "@/services/mock/reviews";
import { mockOrders as seedOrders } from "@/services/mock/user";
import {
  adminCustomers as seedCustomers,
  adminNotifications as seedNotifications,
  adminStats as seedStats,
  cmsPages as seedCms,
  newsletterSubscribers as seedNewsletter,
} from "@/services/mock/admin";
import {
  getCatalogProducts,
  getInstagramShots,
  setCatalogProducts,
  setInstagramShots,
  type InstagramShot,
} from "@/services/mock/catalogStore";
import {
  getSiteSettingsState,
  setSiteSettingsState,
} from "@/services/mock/siteSettingsStore";

export type AdminProductInput = {
  name: string;
  sku: string;
  brand?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categorySlug: string;
  shortDescription: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: Product["images"];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isOnSale?: boolean;
};

export type AdminDashboardData = {
  stats: AdminStat[];
  recentOrders: Order[];
  lowStock: InventoryRow[];
  pendingOrders: number;
  featuredCount: number;
  bestSellerCount: number;
  reviewCount: number;
  customerCount: number;
  couponCount: number;
  unreadNotifications: number;
};

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

function clone<T>(value: T): T {
  return structuredClone(value);
}

function stockStatus(stock: number): InventoryRow["status"] {
  if (stock <= 0) return "Out";
  if (stock <= 20) return "Low";
  return "In Stock";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

let coupons = clone(seedCoupons);
let reviews = clone(seedReviews);
const orders = clone(seedOrders);
let customers = clone(seedCustomers);
let notifications = clone(seedNotifications);
let cmsPages = clone(seedCms);
let newsletter = clone(seedNewsletter);
let team: TeamMember[] = [
  {
    id: "team-1",
    name: "Umar Pathan",
    email: "umar@gmail.com",
    role: "Admin",
    status: "active",
    joinedAt: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "team-2",
    name: "Priya Sharma",
    email: "priya@trenova.in",
    role: "Manager",
    status: "active",
    joinedAt: "2026-03-15T00:00:00.000Z",
  },
  {
    id: "team-3",
    name: "Rohan Desai",
    email: "rohan@trenova.in",
    role: "Editor",
    status: "invited",
    joinedAt: "2026-07-22T00:00:00.000Z",
  },
];

function rebuildMedia(): MediaItem[] {
  return getCatalogProducts().flatMap((product) =>
    (["front", "left", "right"] as const).map((angle, index) => ({
      id: `${product.id}-${angle}`,
      name: `${product.slug}-${angle}.jpg`,
      url: product.images[angle],
      type: "image" as const,
      sizeKb: 18 + index * 2,
      createdAt: product.createdAt,
    })),
  );
}

export async function repoGetStats(): Promise<AdminStat[]> {
  await delay();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  return [
    {
      label: "Revenue",
      value: `₹${(revenue / 1000).toFixed(1)}k`,
      change: seedStats[0].change,
      trend: "up",
    },
    {
      label: "Orders",
      value: String(orders.length),
      change: seedStats[1].change,
      trend: "up",
    },
    {
      label: "Customers",
      value: String(customers.length),
      change: seedStats[2].change,
      trend: "up",
    },
    {
      label: "Products",
      value: String(getCatalogProducts().length),
      change: "+2",
      trend: "up",
    },
  ];
}

export async function repoGetDashboard(): Promise<AdminDashboardData> {
  await delay();
  const products = getCatalogProducts();
  const inventory = products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    status: stockStatus(product.stock),
  }));
  const stats = await repoGetStats();
  return {
    stats,
    recentOrders: clone(orders).slice(0, 6),
    lowStock: inventory.filter((item) => item.status !== "In Stock").slice(0, 6),
    pendingOrders: orders.filter(
      (order) => order.status === "pending" || order.status === "confirmed",
    ).length,
    featuredCount: products.filter((item) => item.isFeatured).length,
    bestSellerCount: products.filter((item) => item.isBestSeller).length,
    reviewCount: reviews.length,
    customerCount: customers.length,
    couponCount: coupons.length,
    unreadNotifications: notifications.filter((item) => !item.read).length,
  };
}
  export async function repoGetAnalytics(): Promise<AnalyticsPoint[]> {
  await delay();
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  return months.map((label, index) => ({
    label,
    value: Math.max(
      20,
      Math.round(
        orders.reduce((sum, order) => sum + order.total, 0) /
          Math.max(orders.length, 1) /
          40 +
          (index + 1) * 8,
      ),
    ),
  }));
}

export async function repoGetProducts() {
  await delay();
  return clone(getCatalogProducts());
}

function buildTags(input: AdminProductInput) {
  const tags: string[] = [];
  if (input.isFeatured) tags.push("featured");
  if (input.isBestSeller) tags.push("best-seller");
  if (input.isNewArrival) tags.push("new-arrival");
  if (input.isTrending) tags.push("trending");
  if (input.isOnSale || (input.compareAtPrice && input.compareAtPrice > input.price)) {
    tags.push("sale");
  }
  return tags;
}

export async function repoCreateProduct(input: AdminProductInput) {
  await delay();
  const products = getCatalogProducts();
  const compareAt = input.compareAtPrice ? Number(input.compareAtPrice) : undefined;
  const price = Number(input.price);
  const slug = slugify(input.categorySlug || "men");
  const product: Product = {
    id: uid("prod"),
    slug: slugify(input.name),
    name: input.name,
    brand: input.brand || "Trenova",
    description: input.description || input.shortDescription,
    shortDescription: input.shortDescription,
    price,
    compareAtPrice: compareAt,
    rating: Number(input.rating ?? 0),
    reviewCount: Number(input.reviewCount ?? 0),
    colors: input.colors.length ? input.colors : [{ name: "Black", hex: "#0A0A0A" }],
    sizes: input.sizes.length ? input.sizes : ["S", "M", "L", "XL"],
    images: input.images,
    categoryId: `cat-${slug}`,
    categorySlug: input.categorySlug || "men",
    tags: buildTags(input),
    isFeatured: Boolean(input.isFeatured),
    isBestSeller: Boolean(input.isBestSeller),
    isNewArrival: Boolean(input.isNewArrival),
    isTrending: Boolean(input.isTrending),
    isOnSale:
      Boolean(input.isOnSale) || Boolean(compareAt && compareAt > price),
    stock: Number(input.stock),
    sku: input.sku,
    specifications: { Fabric: "Cotton", Fit: "Regular" },
    createdAt: new Date().toISOString(),
  };
  setCatalogProducts([product, ...products]);
  return clone(product);
}

export async function repoUpdateProduct(id: string, input: AdminProductInput) {
  await delay();
  const products = getCatalogProducts();
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Product not found");
  const current = products[index];
  const compareAt = input.compareAtPrice ? Number(input.compareAtPrice) : undefined;
  const price = Number(input.price);
  const slug = slugify(input.categorySlug || current.categorySlug);
  const next: Product = {
    ...current,
    name: input.name,
    sku: input.sku,
    brand: input.brand || current.brand || "Trenova",
    slug: slugify(input.name),
    shortDescription: input.shortDescription,
    description: input.description || input.shortDescription,
    price,
    compareAtPrice: compareAt,
    stock: Number(input.stock),
    rating: Number(input.rating ?? current.rating),
    reviewCount: Number(input.reviewCount ?? current.reviewCount),
    colors: input.colors.length ? input.colors : current.colors,
    sizes: input.sizes.length ? input.sizes : current.sizes,
    images: input.images,
    categoryId: `cat-${slug}`,
    categorySlug: input.categorySlug || current.categorySlug,
    tags: buildTags(input),
    isFeatured: Boolean(input.isFeatured),
    isBestSeller: Boolean(input.isBestSeller),
    isNewArrival: Boolean(input.isNewArrival),
    isTrending: Boolean(input.isTrending),
    isOnSale:
      Boolean(input.isOnSale) || Boolean(compareAt && compareAt > price),
  };
  const updated = [...products];
  updated[index] = next;
  setCatalogProducts(updated);
  return clone(next);
}

export async function repoDeleteProduct(id: string) {
  await delay();
  setCatalogProducts(getCatalogProducts().filter((item) => item.id !== id));
}

export async function repoGetCustomers() {
  await delay();
  return clone(customers);
}

export async function repoCreateCustomer(
  input: Pick<AdminCustomer, "name" | "email">,
) {
  await delay();
  const customer: AdminCustomer = {
    id: uid("cust"),
    name: input.name,
    email: input.email,
    orders: 0,
    spent: 0,
    joinedAt: new Date().toISOString(),
  };
  customers = [customer, ...customers];
  return clone(customer);
}

export async function repoUpdateCustomer(
  id: string,
  input: Partial<Pick<AdminCustomer, "name" | "email">>,
) {
  await delay();
  const index = customers.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Customer not found");
  customers[index] = { ...customers[index], ...input };
  return clone(customers[index]);
}

export async function repoDeleteCustomer(id: string) {
  await delay();
  customers = customers.filter((item) => item.id !== id);
}

export async function repoGetOrders() {
  await delay();
  return clone(orders);
}

export async function repoUpdateOrderStatus(id: string, status: OrderStatus) {
  await delay();
  const index = orders.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Order not found");
  orders[index] = { ...orders[index], status };
  return clone(orders[index]);
}

export async function repoGetInventory(): Promise<InventoryRow[]> {
  await delay();
  return getCatalogProducts().map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    status: stockStatus(product.stock),
  }));
}

export async function repoUpdateInventory(id: string, stock: number) {
  await delay();
  const products = getCatalogProducts();
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Product not found");
  const updated = [...products];
  updated[index] = { ...products[index], stock: Number(stock) };
  setCatalogProducts(updated);
  return {
    id: updated[index].id,
    name: updated[index].name,
    sku: updated[index].sku,
    stock: updated[index].stock,
    status: stockStatus(updated[index].stock),
  } satisfies InventoryRow;
}

export async function repoGetCoupons() {
  await delay();
  return clone(coupons);
}

export async function repoCreateCoupon(input: Coupon) {
  await delay();
  if (coupons.some((item) => item.code.toUpperCase() === input.code.toUpperCase())) {
    throw new Error("Coupon code already exists");
  }
  const coupon: Coupon = {
    ...input,
    code: input.code.toUpperCase(),
    value: Number(input.value),
    minOrder: input.minOrder ? Number(input.minOrder) : undefined,
  };
  coupons = [coupon, ...coupons];
  return clone(coupon);
}

export async function repoUpdateCoupon(code: string, input: Partial<Coupon>) {
  await delay();
  const index = coupons.findIndex(
    (item) => item.code.toUpperCase() === code.toUpperCase(),
  );
  if (index < 0) throw new Error("Coupon not found");
  coupons[index] = {
    ...coupons[index],
    ...input,
    code: input.code ? input.code.toUpperCase() : coupons[index].code,
    value: input.value !== undefined ? Number(input.value) : coupons[index].value,
    minOrder:
      input.minOrder !== undefined
        ? Number(input.minOrder) || undefined
        : coupons[index].minOrder,
  };
  return clone(coupons[index]);
}

export async function repoDeleteCoupon(code: string) {
  await delay();
  coupons = coupons.filter(
    (item) => item.code.toUpperCase() !== code.toUpperCase(),
  );
}

export async function repoGetReviews() {
  await delay();
  return clone(reviews);
}

export async function repoUpdateReview(
  id: string,
  input: Partial<Pick<Review, "title" | "body" | "rating" | "verified">>,
) {
  await delay();
  const index = reviews.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Review not found");
  reviews[index] = {
    ...reviews[index],
    ...input,
    rating: input.rating !== undefined ? Number(input.rating) : reviews[index].rating,
  };
  return clone(reviews[index]);
}

export async function repoDeleteReview(id: string) {
  await delay();
  reviews = reviews.filter((item) => item.id !== id);
}

export async function repoGetNotifications() {
  await delay();
  return clone(notifications);
}

export async function repoMarkNotificationRead(id: string) {
  await delay();
  notifications = notifications.map((item) =>
    item.id === id ? { ...item, read: true } : item,
  );
}

export async function repoDeleteNotification(id: string) {
  await delay();
  notifications = notifications.filter((item) => item.id !== id);
}

export async function repoGetMedia() {
  await delay();
  return clone(rebuildMedia());
}

export async function repoDeleteMedia(id: string) {
  await delay();
  // Media is derived from product images — mark by clearing matching product angle if needed.
  // Soft-delete: filter from a session overlay would be ideal; for mock, no-op delete from view
  // is handled by filtering client-side after toast. Keep products intact.
  void id;
}

export async function repoGetCmsPages() {
  await delay();
  return clone(cmsPages);
}

export async function repoCreateCmsPage(
  input: Pick<CmsPage, "title" | "status">,
) {
  await delay();
  const page: CmsPage = {
    id: uid("cms"),
    title: input.title,
    slug: slugify(input.title),
    status: input.status,
    updatedAt: new Date().toISOString(),
  };
  cmsPages = [page, ...cmsPages];
  return clone(page);
}

export async function repoUpdateCmsPage(
  id: string,
  input: Partial<Pick<CmsPage, "title" | "status">>,
) {
  await delay();
  const index = cmsPages.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("CMS page not found");
  cmsPages[index] = {
    ...cmsPages[index],
    ...input,
    slug: input.title ? slugify(input.title) : cmsPages[index].slug,
    updatedAt: new Date().toISOString(),
  };
  return clone(cmsPages[index]);
}

export async function repoDeleteCmsPage(id: string) {
  await delay();
  cmsPages = cmsPages.filter((item) => item.id !== id);
}

export async function repoGetNewsletter() {
  await delay();
  return clone(newsletter);
}

export async function repoUpdateNewsletterStatus(
  id: string,
  status: NewsletterSubscriber["status"],
) {
  await delay();
  const index = newsletter.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Subscriber not found");
  newsletter[index] = { ...newsletter[index], status };
  return clone(newsletter[index]);
}

export async function repoDeleteNewsletter(id: string) {
  await delay();
  newsletter = newsletter.filter((item) => item.id !== id);
}

export async function repoGetTeam() {
  await delay();
  return clone(team);
}

export async function repoCreateTeamMember(
  input: Pick<TeamMember, "name" | "email" | "role">,
) {
  await delay();
  if (team.some((item) => item.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("Team member already exists");
  }
  const member: TeamMember = {
    id: uid("team"),
    name: input.name,
    email: input.email,
    role: input.role,
    status: "invited",
    joinedAt: new Date().toISOString(),
  };
  team = [member, ...team];
  return clone(member);
}

export async function repoUpdateTeamMember(
  id: string,
  input: Partial<Pick<TeamMember, "name" | "email" | "role" | "status">>,
) {
  await delay();
  const index = team.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Team member not found");
  team[index] = { ...team[index], ...input };
  return clone(team[index]);
}

export async function repoDeleteTeamMember(id: string) {
  await delay();
  team = team.filter((item) => item.id !== id);
}

export async function repoGetSettings() {
  await delay();
  return getSiteSettingsState();
}

export async function repoUpdateSettings(input: AdminSettings) {
  await delay();
  setSiteSettingsState(input);
  return getSiteSettingsState();
}

export async function repoGetInstagram() {
  await delay();
  return clone(getInstagramShots());
}

export async function repoUpdateInstagramShot(
  id: string,
  input: Partial<Pick<InstagramShot, "src" | "alt">>,
) {
  await delay();
  const shots = getInstagramShots();
  const index = shots.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Instagram shot not found");
  const next = [...shots];
  next[index] = { ...shots[index], ...input };
  setInstagramShots(next);
  return clone(next[index]);
}

export async function repoReplaceInstagram(shots: InstagramShot[]) {
  await delay();
  if (shots.length !== 9) {
    throw new Error("Homepage Instagram gallery requires exactly 9 images");
  }
  setInstagramShots(clone(shots));
  return clone(getInstagramShots());
}
