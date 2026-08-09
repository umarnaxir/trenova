import type {
  AdminCustomer,
  AdminSettings,
  CmsPage,
  TeamMember,
} from "@/types/admin";
import type { Coupon } from "@/types/cart";
import type { Review } from "@/types/review";
import type { OrderStatus } from "@/types/user";
import * as repo from "@/services/mock/adminRepository";

export const getAdminStats = repo.repoGetStats;
export const getAdminAnalytics = repo.repoGetAnalytics;
export const getAdminDashboard = repo.repoGetDashboard;
export const getAdminProducts = repo.repoGetProducts;
export const getAdminCustomers = repo.repoGetCustomers;
export const getAdminOrders = repo.repoGetOrders;
export const getAdminInventory = repo.repoGetInventory;
export const getAdminCoupons = repo.repoGetCoupons;
export const getAdminReviews = repo.repoGetReviews;
export const getAdminNotifications = repo.repoGetNotifications;
export const getAdminMedia = repo.repoGetMedia;
export const getAdminCmsPages = repo.repoGetCmsPages;
export const getAdminNewsletter = repo.repoGetNewsletter;
export const getAdminTeam = repo.repoGetTeam;
export const getAdminSettings = repo.repoGetSettings;

export async function createAdminProduct(
  input: Parameters<typeof repo.repoCreateProduct>[0],
) {
  return repo.repoCreateProduct(input);
}

export async function updateAdminProduct(
  id: string,
  input: Parameters<typeof repo.repoUpdateProduct>[1],
) {
  return repo.repoUpdateProduct(id, input);
}

export async function deleteAdminProduct(id: string) {
  return repo.repoDeleteProduct(id);
}

export async function createAdminCustomer(
  input: Pick<AdminCustomer, "name" | "email">,
) {
  return repo.repoCreateCustomer(input);
}

export async function updateAdminCustomer(
  id: string,
  input: Partial<Pick<AdminCustomer, "name" | "email">>,
) {
  return repo.repoUpdateCustomer(id, input);
}

export async function deleteAdminCustomer(id: string) {
  return repo.repoDeleteCustomer(id);
}

export async function updateAdminOrderStatus(id: string, status: OrderStatus) {
  return repo.repoUpdateOrderStatus(id, status);
}

export async function updateAdminInventory(id: string, stock: number) {
  return repo.repoUpdateInventory(id, stock);
}

export async function createAdminCoupon(input: Coupon) {
  return repo.repoCreateCoupon(input);
}

export async function updateAdminCoupon(code: string, input: Partial<Coupon>) {
  return repo.repoUpdateCoupon(code, input);
}

export async function deleteAdminCoupon(code: string) {
  return repo.repoDeleteCoupon(code);
}

export async function updateAdminReview(
  id: string,
  input: Partial<Pick<Review, "title" | "body" | "rating" | "verified">>,
) {
  return repo.repoUpdateReview(id, input);
}

export async function deleteAdminReview(id: string) {
  return repo.repoDeleteReview(id);
}

export async function markAdminNotificationRead(id: string) {
  return repo.repoMarkNotificationRead(id);
}

export async function deleteAdminNotification(id: string) {
  return repo.repoDeleteNotification(id);
}

export async function createAdminCmsPage(
  input: Pick<CmsPage, "title" | "status">,
) {
  return repo.repoCreateCmsPage(input);
}

export async function updateAdminCmsPage(
  id: string,
  input: Partial<Pick<CmsPage, "title" | "status">>,
) {
  return repo.repoUpdateCmsPage(id, input);
}

export async function deleteAdminCmsPage(id: string) {
  return repo.repoDeleteCmsPage(id);
}

export async function updateAdminNewsletterStatus(
  id: string,
  status: "active" | "unsubscribed",
) {
  return repo.repoUpdateNewsletterStatus(id, status);
}

export async function deleteAdminNewsletter(id: string) {
  return repo.repoDeleteNewsletter(id);
}

export async function createAdminTeamMember(
  input: Pick<TeamMember, "name" | "email" | "role">,
) {
  return repo.repoCreateTeamMember(input);
}

export async function updateAdminTeamMember(
  id: string,
  input: Partial<Pick<TeamMember, "name" | "email" | "role" | "status">>,
) {
  return repo.repoUpdateTeamMember(id, input);
}

export async function deleteAdminTeamMember(id: string) {
  return repo.repoDeleteTeamMember(id);
}

export async function updateAdminSettings(input: AdminSettings) {
  return repo.repoUpdateSettings(input);
}

export const getAdminInstagram = repo.repoGetInstagram;
export const updateAdminInstagramShot = repo.repoUpdateInstagramShot;
export const replaceAdminInstagram = repo.repoReplaceInstagram;

export type { AdminProductInput, AdminDashboardData } from "@/services/mock/adminRepository";
export type { InstagramShot } from "@/services/mock/catalogStore";
