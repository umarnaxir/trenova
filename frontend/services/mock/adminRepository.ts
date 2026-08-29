
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { API_URL } from "@/lib/api";

import type {
  AdminCoupon,
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
import type { Product, ProductColor, ProductSize, SizeStock } from "@/types/product";
import type { Order, OrderStatus } from "@/types/user";
import { coupons as seedCoupons } from "@/services/mock/coupons";
import {
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
import {
  getOrdersStore,
  listAdminUsers,
  setUserStatus,
  updateOrderStatusInStore,
} from "@/services/mock/usersStore";
import {
  buildSizeStock,
  normalizeProductInventory,
  stockStatusLabel,
  sumSizeStock,
} from "@/utils/inventory";

export type AdminProductInput = {
  name: string;
  sku: string;
  brand?: string;
  price: number;
  compareAtPrice?: number;
  stock?: number;
  sizeStock?: import("@/types/product").SizeStock;
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
  lowStockCount: number;
  pendingOrders: number;
  featuredCount: number;
  bestSellerCount: number;
  newArrivalCount: number;
  onSaleCount: number;
  userCount: number;
  couponCount: number;
  teamCount: number;
  unreadNotifications: number;
  totalRevenue: number;
  avgOrderValue: number;
  deliveredOrders: number;
  cancelledOrders: number;
  inventoryUnits: number;
  productCount: number;
};

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

function clone<T>(value: T): T {
  return structuredClone(value);
}

function stockStatus(stock: number): InventoryRow["status"] {
  return stockStatusLabel(stock);
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
    password: "1122",
  },
  {
    id: "team-2",
    name: "Priya Sharma",
    email: "priya@trenova.in",
    role: "Editor",
    status: "active",
    joinedAt: "2026-03-15T00:00:00.000Z",
    password: "manager123",
  },
  {
    id: "team-3",
    name: "Rohan Desai",
    email: "rohan@trenova.in",
    role: "Editor",
    status: "invited",
    joinedAt: "2026-07-22T00:00:00.000Z",
    password: "editor123",
  },
];

function publicTeamMember(member: TeamMember): TeamMember {
  const rest = { ...member };
  delete rest.password;
  return rest;
}
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
  const orders = getOrdersStore();
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
      label: "Users",
      value: String(listAdminUsers().length),
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
  const orders = getOrdersStore();
  const inventory = products.map((product) => toInventoryRow(product));
  const stats = await repoGetStats();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  return {
    stats,
    recentOrders: orders.slice(0, 8),
    lowStockCount: inventory.filter((item) => item.status !== "In Stock").length,
    pendingOrders: orders.filter(
      (order) => order.status === "pending" || order.status === "confirmed",
    ).length,
    featuredCount: products.filter((item) => item.isFeatured).length,
    bestSellerCount: products.filter((item) => item.isBestSeller).length,
    newArrivalCount: products.filter((item) => item.isNewArrival).length,
    onSaleCount: products.filter((item) => item.isOnSale).length,
    userCount: listAdminUsers().length,
    couponCount: coupons.length,
    teamCount: team.length,
    unreadNotifications: notifications.filter((item) => !item.read).length,
    totalRevenue,
    avgOrderValue: orders.length ? Math.round(totalRevenue / orders.length) : 0,
    deliveredOrders: orders.filter((order) => order.status === "delivered").length,
    cancelledOrders: orders.filter((order) => order.status === "cancelled").length,
    inventoryUnits: inventory.reduce((sum, item) => sum + item.stock, 0),
    productCount: products.length,
  };
}

export async function repoGetAnalytics(): Promise<AnalyticsPoint[]> {
  await delay();
  const orders = getOrdersStore();
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
  const res = await fetch(`${API_URL}/catalog/products?pageSize=100`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.items as Product[];
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
  const token = useAdminAuthStore.getState().token;
  const res = await fetch(`${API_URL}/admin/catalog/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error('Failed to create product');
  return (await res.json()).data;
}

export async function repoUpdateProduct(id: string, input: AdminProductInput) {
  const token = useAdminAuthStore.getState().token;
  const res = await fetch(`${API_URL}/admin/catalog/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error('Failed to update product');
  return (await res.json()).data;
}

export async function repoDeleteProduct(id: string) {
  const token = useAdminAuthStore.getState().token;
  const res = await fetch(`${API_URL}/admin/catalog/products/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete product');
}

export async function repoDeleteProducts(ids: string[]) {
  const token = useAdminAuthStore.getState().token;
  const res = await fetch(`${API_URL}/admin/catalog/products/bulk-delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ids })
  });
  if (!res.ok) throw new Error('Failed to delete products');
}

export async function repoImportProducts(inputs: AdminProductInput[]) {
  await delay();
  if (!inputs.length) return { imported: 0 };
  const existing = getCatalogProducts();
  const created = inputs.map((input, index) => {
    const compareAt = input.compareAtPrice ? Number(input.compareAtPrice) : undefined;
    const price = Number(input.price);
    const slug = slugify(input.categorySlug || "men");
    const sizes = input.sizes.length
      ? input.sizes
      : (["S", "M", "L", "XL"] as ProductSize[]);
    const sizeStock = buildSizeStock(
      sizes,
      input.sizeStock,
      Number(input.stock ?? 0),
    );
    return normalizeProductInventory({
      id: uid("prod"),
      slug: `${slugify(input.name) || "product"}-${Date.now()}-${index}`,
      name: input.name,
      brand: input.brand || "Trenova",
      description: input.description || input.shortDescription,
      shortDescription: input.shortDescription,
      price,
      compareAtPrice: compareAt,
      rating: Number(input.rating ?? 0),
      reviewCount: Number(input.reviewCount ?? 0),
      colors: input.colors.length
        ? input.colors
        : [{ name: "Black", hex: "#0A0A0A" }],
      sizes,
      sizeStock,
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
      stock: sumSizeStock(sizeStock),
      sku: input.sku || `TRN-IMP-${Date.now()}-${index}`,
      specifications: { Fabric: "Cotton", Fit: "Regular" },
      createdAt: new Date().toISOString(),
    });
  });
  setCatalogProducts([...created, ...existing]);
  return { imported: created.length };
}

export async function repoGetOrders() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") ||
        useAdminAuthStore.getState().token
      : useAdminAuthStore.getState().token;
  try {
    const res = await fetch(`${API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });
    if (!res.ok) throw new Error("Failed to fetch admin orders");
    const json = await res.json();
    return json.data.items.map((order: any) => ({
      ...order,
      status: order.status.toLowerCase(),
    }));
  } catch {
    return getOrdersStore();
  }
}

export async function repoUpdateOrderStatus(id: string, status: OrderStatus) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") ||
        useAdminAuthStore.getState().token
      : useAdminAuthStore.getState().token;
  try {
    const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify({ status: status.toUpperCase() }),
    });
    if (!res.ok) throw new Error("Failed to update order status");
    const json = await res.json();
    const order = json.data;
    if (order && order.status) {
      order.status = order.status.toLowerCase();
    }
    updateOrderStatusInStore(id, order.status);
    return order;
  } catch {
    return updateOrderStatusInStore(id, status);
  }
}

function toInventoryRow(product: Product): InventoryRow {
  const normalized = normalizeProductInventory(product);
  const sizeStock = normalized.sizeStock ?? {};
  const sizeSummary = normalized.sizes
    .map((size) => `${size}:${sizeStock[size] ?? 0}`)
    .join(" · ");
  return {
    id: normalized.id,
    name: normalized.name,
    sku: normalized.sku,
    stock: normalized.stock,
    status: stockStatus(normalized.stock),
    sizes: normalized.sizes,
    sizeStock,
    sizeSummary: sizeSummary || "—",
  };
}

export async function repoGetInventory(): Promise<InventoryRow[]> {
  await delay();
  return getCatalogProducts().map((product) => toInventoryRow(product));
}

export async function repoUpdateInventory(
  id: string,
  stockOrSizeStock: number | SizeStock,
) {
  await delay();
  const products = getCatalogProducts();
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Product not found");
  const current = products[index];

  const sizeStock =
    typeof stockOrSizeStock === "number"
      ? buildSizeStock(current.sizes, undefined, stockOrSizeStock)
      : buildSizeStock(current.sizes, stockOrSizeStock, current.stock);

  const updated = [...products];
  updated[index] = normalizeProductInventory({
    ...current,
    sizeStock,
    stock: sumSizeStock(sizeStock),
  });
  setCatalogProducts(updated);
  return toInventoryRow(updated[index]);
}

export async function repoGetUsers() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") ||
        useAdminAuthStore.getState().token
      : useAdminAuthStore.getState().token;
  try {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    const json = await res.json();
    return json.data;
  } catch {
    return listAdminUsers();
  }
}

export async function repoUpdateUserStatus(
  id: string,
  status: "active" | "inactive",
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") ||
        useAdminAuthStore.getState().token
      : useAdminAuthStore.getState().token;
  try {
    const res = await fetch(`${API_URL}/admin/users/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setUserStatus(id, status);
    }
  } catch {
    setUserStatus(id, status);
  }
  return listAdminUsers().find((user) => user.id === id) ?? null;
}

export async function repoGetCoupons() {
  await delay();
  return clone(coupons);
}

export async function repoCreateCoupon(input: AdminCoupon) {
  await delay();
  if (coupons.some((item: AdminCoupon) => item.code.toUpperCase() === input.code.toUpperCase())) {
    throw new Error("Coupon code already exists");
  }
  const coupon: AdminCoupon = {
    id: input.id || `cpn-${Date.now()}`,
    code: input.code.toUpperCase(),
    description: input.description,
    type: input.type || "PERCENT",
    value: Number(input.value),
    minOrder: input.minOrder ? Number(input.minOrder) : null,
    maxDiscountAmount: input.maxDiscountAmount ? Number(input.maxDiscountAmount) : null,
    maxUses: input.maxUses ? Number(input.maxUses) : null,
    expiresAt: input.expiresAt || null,
    isActive: input.isActive ?? true,
    usedCount: input.usedCount || 0,
  };
  coupons = [coupon, ...coupons];
  return clone(coupon);
}

export async function repoUpdateCoupon(idOrCode: string, input: Partial<AdminCoupon>) {
  await delay();
  const index = coupons.findIndex(
    (item: AdminCoupon) =>
      item.id === idOrCode || item.code.toUpperCase() === idOrCode.toUpperCase(),
  );
  if (index < 0) throw new Error("Coupon not found");
  coupons[index] = {
    ...coupons[index],
    ...input,
    code: input.code ? input.code.toUpperCase() : coupons[index].code,
    value: input.value !== undefined ? Number(input.value) : coupons[index].value,
    minOrder: input.minOrder !== undefined ? (input.minOrder ? Number(input.minOrder) : null) : coupons[index].minOrder,
    maxDiscountAmount: input.maxDiscountAmount !== undefined ? (input.maxDiscountAmount ? Number(input.maxDiscountAmount) : null) : coupons[index].maxDiscountAmount,
    maxUses: input.maxUses !== undefined ? (input.maxUses ? Number(input.maxUses) : null) : coupons[index].maxUses,
    expiresAt: input.expiresAt !== undefined ? input.expiresAt : coupons[index].expiresAt,
  };
  return clone(coupons[index]);
}

export async function repoDeleteCoupon(idOrCode: string) {
  await delay();
  coupons = coupons.filter(
    (item: AdminCoupon) =>
      item.id !== idOrCode && item.code.toUpperCase() !== idOrCode.toUpperCase(),
  );
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
  return clone(team.map(publicTeamMember));
}

export async function repoCreateTeamMember(
  input: Pick<TeamMember, "name" | "email" | "role"> & { password: string },
) {
  await delay();
  if (team.some((item) => item.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("Team member already exists");
  }
  if (!input.password || input.password.length < 4) {
    throw new Error("Password must be at least 4 characters");
  }
  const member: TeamMember = {
    id: uid("team"),
    name: input.name,
    email: input.email.trim().toLowerCase(),
    role: input.role,
    status: "active",
    joinedAt: new Date().toISOString(),
    password: input.password,
  };
  team = [member, ...team];
  return clone(publicTeamMember(member));
}

export async function repoUpdateTeamMember(
  id: string,
  input: Partial<Pick<TeamMember, "name" | "email" | "role" | "status" | "password">>,
) {
  await delay();
  const index = team.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Team member not found");
  if (input.password !== undefined && input.password.length > 0 && input.password.length < 4) {
    throw new Error("Password must be at least 4 characters");
  }
  const nextPassword =
    input.password && input.password.length > 0
      ? input.password
      : team[index].password;
  team[index] = {
    ...team[index],
    ...input,
    email: input.email ? input.email.trim().toLowerCase() : team[index].email,
    password: nextPassword,
  };
  return clone(publicTeamMember(team[index]));
}

export async function repoDeleteTeamMember(id: string) {
  await delay();
  team = team.filter((item) => item.id !== id);
}

/** Sync auth helpers for admin login / password changes (mock). */
export function authenticateTeamMember(
  email: string,
  password: string,
): TeamMember | null {
  const normalized = email.trim().toLowerCase();
  const member = team.find(
    (item) =>
      item.email.toLowerCase() === normalized &&
      item.password === password &&
      item.status !== "disabled",
  );
  return member ? publicTeamMember(member) : null;
}

export function changeTeamPasswordByEmail(
  email: string,
  currentPassword: string,
  nextPassword: string,
): { ok: true } | { ok: false; error: string } {
  if (!nextPassword || nextPassword.length < 4) {
    return { ok: false, error: "New password must be at least 4 characters" };
  }
  const normalized = email.trim().toLowerCase();
  const index = team.findIndex((item) => item.email.toLowerCase() === normalized);
  if (index < 0) return { ok: false, error: "Account not found" };
  if (team[index].password !== currentPassword) {
    return { ok: false, error: "Current password is incorrect" };
  }
  team[index] = { ...team[index], password: nextPassword };
  return { ok: true };
}

export function resetTeamPasswordByEmail(
  email: string,
  nextPassword: string,
): { ok: true } | { ok: false; error: string } {
  if (!nextPassword || nextPassword.length < 4) {
    return { ok: false, error: "Password must be at least 4 characters" };
  }
  const normalized = email.trim().toLowerCase();
  const index = team.findIndex((item) => item.email.toLowerCase() === normalized);
  if (index < 0) return { ok: false, error: "Account not found" };
  team[index] = { ...team[index], password: nextPassword, status: "active" };
  return { ok: true };
}

export function updateTeamProfileByEmail(
  email: string,
  payload: Partial<Pick<TeamMember, "name" | "email">>,
): TeamMember | null {
  const normalized = email.trim().toLowerCase();
  const index = team.findIndex((item) => item.email.toLowerCase() === normalized);
  if (index < 0) return null;
  team[index] = {
    ...team[index],
    ...payload,
    email: payload.email
      ? payload.email.trim().toLowerCase()
      : team[index].email,
  };
  return publicTeamMember(team[index]);
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

export async function repoCreateInstagramShot(input: { src: string; alt?: string }) {
  await delay();
  const shots = getInstagramShots();
  const shot: InstagramShot = {
    id: `ig-${Date.now()}`,
    src: input.src,
    alt: input.alt || `Trenova look ${shots.length + 1}`,
  };
  const next = [...shots, shot];
  setInstagramShots(next);
  return clone(shot);
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

export async function repoDeleteInstagramShot(id: string) {
  await delay();
  const shots = getInstagramShots();
  const next = shots.filter((item) => item.id !== id);
  setInstagramShots(next);
  return true;
}

export async function repoReplaceInstagram(shots: InstagramShot[]) {
  await delay();
  setInstagramShots(clone(shots));
  return clone(getInstagramShots());
}
