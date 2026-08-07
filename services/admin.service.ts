import {
  adminBrands,
  adminCatalog,
  adminCustomers,
  adminNotifications,
  adminStats,
  cmsPages,
  mediaLibrary,
  newsletterSubscribers,
} from "@/services/mock/admin";

export async function getAdminStats() {
  return adminStats;
}

export async function getAdminProducts() {
  return adminCatalog.products;
}

export async function getAdminCategories() {
  return adminCatalog.categories;
}

export async function getAdminBrands() {
  return adminBrands;
}

export async function getAdminCustomers() {
  return adminCustomers;
}

export async function getAdminOrders() {
  return adminCatalog.orders;
}

export async function getAdminInventory() {
  return adminCatalog.products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    status: product.stock > 20 ? "In Stock" : product.stock > 0 ? "Low" : "Out",
  }));
}

export async function getAdminCoupons() {
  return adminCatalog.coupons;
}

export async function getAdminReviews() {
  return adminCatalog.reviews;
}

export async function getAdminNotifications() {
  return adminNotifications;
}

export async function getAdminMedia() {
  return mediaLibrary;
}

export async function getAdminCmsPages() {
  return cmsPages;
}

export async function getAdminNewsletter() {
  return newsletterSubscribers;
}
