import type {
  AdminCoupon,
  AdminReview,
  AdminSettings,
  CmsPage,
  TeamMember,
} from "@/types/admin";
import type { Coupon } from "@/types/cart";
import type { OrderStatus } from "@/types/user";
import type { SizeStock } from "@/types/product";
import type { InstagramShot } from "@/services/mock/catalogStore";
import * as repo from "@/services/mock/adminRepository";
import {
  getReviewsStore,
  updateReviewStatusInStore,
  deleteReviewFromStore,
} from "@/services/mock/reviewsStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function getAdminToken(): string {
  if (typeof window === "undefined") return "mock-token-admin";
  const direct = localStorage.getItem("adminToken") || localStorage.getItem("token");
  if (direct && direct !== "undefined" && direct !== "null" && direct.trim() !== "") {
    return direct;
  }
  try {
    const raw = localStorage.getItem("trenova-admin-session") || localStorage.getItem("admin-session");
    if (raw) {
      const parsed = JSON.parse(raw);
      const t = parsed?.state?.token || parsed?.token;
      if (t && t !== "undefined" && t !== "null" && t.trim() !== "") {
        return t;
      }
    }
  } catch {}
  return "mock-token-admin";
}

export async function getAdminDashboard() {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/admin/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch {}
  return repo.repoGetDashboard();
}

export async function getAdminStats() {
  const dashboard = await getAdminDashboard();
  if (dashboard && dashboard.stats) {
    return dashboard.stats;
  }
  return repo.repoGetStats();
}

export async function getAdminAnalytics() {
  const dashboard = await getAdminDashboard();
  if (dashboard && dashboard.salesChart && Array.isArray(dashboard.salesChart) && dashboard.salesChart.length > 0) {
    return dashboard.salesChart.map((item: any) => ({
      label: item.day ? item.day.split('-').slice(1).join('/') : item.label,
      value: Math.round(item.revenue || item.value || 0),
    }));
  }
  return repo.repoGetAnalytics();
}
export async function getAdminProducts() {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/catalog/products?pageSize=100`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      const items = json.data?.items || json.data;
      if (Array.isArray(items) && items.length > 0) return items;
    }
  } catch {}
  return repo.repoGetProducts();
}

export async function getAdminUsers() {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) return json.data;
    }
  } catch {}
  return repo.repoGetUsers();
}

export async function getAdminOrders() {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      const items = json.data?.items || json.data;
      if (Array.isArray(items)) return items;
    }
  } catch {}
  return repo.repoGetOrders();
}

export async function getAdminInventory() {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/admin/inventory`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) {
        return json.data.map((item: any) => ({
          id: item.id,
          productName: item.name,
          sku: item.sku,
          category: item.categorySlug,
          stock: item.stock,
          sizeStock: item.sizeStock || {},
          status: item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock',
          updatedAt: item.updatedAt
        }));
      }
    }
  } catch {}
  return repo.repoGetInventory();
}

export const getAdminNotifications = repo.repoGetNotifications;
export const getAdminMedia = repo.repoGetMedia;
export const getAdminNewsletter = repo.repoGetNewsletter;

export async function getAdminSettings() {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch {}
  return repo.repoGetSettings();
}

export async function createAdminProduct(input: any) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/catalog/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) return repo.repoCreateProduct(input);
  const json = await res.json();
  return json.data;
}

export async function updateAdminProduct(id: string, input: any) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const res = await fetch(`${API_URL}/admin/catalog/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) return repo.repoUpdateProduct(id, input);
  const json = await res.json();
  return json.data;
}

export async function deleteAdminProduct(id: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const res = await fetch(`${API_URL}/admin/catalog/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token ?? ''}` }
  });
  if (!res.ok) return repo.repoDeleteProduct(id);
  return true;
}

export async function deleteAdminProducts(ids: string[]) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const res = await fetch(`${API_URL}/admin/catalog/products/bulk-delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify({ ids })
  });
  if (!res.ok) return repo.repoDeleteProducts(ids);
  return true;
}

export async function importAdminProducts(
  inputs: Parameters<typeof repo.repoImportProducts>[0],
) {
  return repo.repoImportProducts(inputs);
}

export async function updateAdminUserStatus(
  id: string,
  status: "active" | "inactive",
) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  try {
    const res = await fetch(`${API_URL}/admin/users/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`
      },
      body: JSON.stringify({ status })
    });
    if (!res.ok) return repo.repoUpdateUserStatus(id, status);
    return true;
  } catch {
    return repo.repoUpdateUserStatus(id, status);
  }
}

export async function updateAdminOrderStatus(id: string, status: OrderStatus) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  try {
    const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`
      },
      body: JSON.stringify({ status: String(status).toUpperCase() })
    });
    if (!res.ok) return repo.repoUpdateOrderStatus(id, status);
    return true;
  } catch {
    return repo.repoUpdateOrderStatus(id, status);
  }
}

export async function updateAdminInventory(
  id: string,
  stockOrSizeStock: number | SizeStock,
) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const body = typeof stockOrSizeStock === 'number'
    ? { stock: stockOrSizeStock }
    : { sizeStock: stockOrSizeStock };

  const res = await fetch(`${API_URL}/admin/inventory/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) return repo.repoUpdateInventory(id, stockOrSizeStock);
  const json = await res.json();
  return json.data;
}

export async function getAdminCoupons(): Promise<AdminCoupon[]> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/coupons`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Failed to load coupons from database (${res.status}) ${errorText}`);
  }
  const json = await res.json();
  return json.data || [];
}

export async function createAdminCoupon(input: any): Promise<AdminCoupon> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/coupons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(input)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Failed to create coupon in database");
  }
  return json.data;
}

export async function updateAdminCoupon(id: string, input: any): Promise<AdminCoupon> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/coupons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(input)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Failed to update coupon in database");
  }
  return json.data;
}

export async function deleteAdminCoupon(id: string): Promise<boolean> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/admin/coupons/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Failed to delete coupon from database");
  }
  return true;
}

export async function getAdminReviews(): Promise<AdminReview[]> {
  const token = getAdminToken();
  try {
    const res = await fetch(`${API_URL}/admin/reviews`, {
      headers: { Authorization: `Bearer ${token ?? ''}` }
    });
    if (!res.ok) return getReviewsStore();
    const json = await res.json();
    const apiReviews: AdminReview[] = json.data?.reviews ?? [];
    const storeReviews = getReviewsStore();
    const apiIds = new Set(apiReviews.map((r) => r.id));
    const merged = [...apiReviews, ...storeReviews.filter((r) => !apiIds.has(r.id))];
    return merged;
  } catch {
    return getReviewsStore();
  }
}

export async function updateAdminReviewStatus(id: string, status: string): Promise<void> {
  const token = typeof window !== "undefined" ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/reviews/${id}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token ?? ''}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      updateReviewStatusInStore(id, status as any);
      return;
    }
  } catch {
    updateReviewStatusInStore(id, status as any);
  }
}

export async function deleteAdminReview(id: string): Promise<void> {
  const token = typeof window !== "undefined" ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token ?? ''}` },
    });
    if (!res.ok) {
      deleteReviewFromStore(id);
      return;
    }
  } catch {
    deleteReviewFromStore(id);
  }
}

export async function markAdminNotificationRead(id: string) {
  return repo.repoMarkNotificationRead(id);
}

export async function deleteAdminNotification(id: string) {
  return repo.repoDeleteNotification(id);
}

export async function getAdminCmsPages() {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  if (!token) return repo.repoGetCmsPages();
  try {
    const res = await fetch(`${API_URL}/admin/cms`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return repo.repoGetCmsPages();
    const json = await res.json();
    return json.data;
  } catch {
    return repo.repoGetCmsPages();
  }
}

export async function createAdminCmsPage(
  input: Pick<CmsPage, "title" | "status">,
) {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  const res = await fetch(`${API_URL}/admin/cms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) return repo.repoCreateCmsPage(input);
  const json = await res.json();
  return json.data;
}

export async function updateAdminCmsPage(
  id: string,
  input: Partial<Pick<CmsPage, "title" | "status">>,
) {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  const res = await fetch(`${API_URL}/admin/cms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) return repo.repoUpdateCmsPage(id, input);
  const json = await res.json();
  return json.data;
}

export async function deleteAdminCmsPage(id: string) {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  const res = await fetch(`${API_URL}/admin/cms/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token ?? ''}` }
  });
  if (!res.ok) return repo.repoDeleteCmsPage(id);
  return true;
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

export async function getAdminTeam(): Promise<TeamMember[]> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token") || "mock-token-admin") : "mock-token-admin";
  try {
    const res = await fetch(`${API_URL}/admin/team`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return repo.repoGetTeam();
    const json = await res.json();
    return json.data;
  } catch {
    return repo.repoGetTeam();
  }
}

export async function createAdminTeamMember(
  input: Pick<TeamMember, "name" | "email" | "role"> & { password: string },
) {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token") || "mock-token-admin") : "mock-token-admin";
  try {
    const res = await fetch(`${API_URL}/admin/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });
    const json = await res.json();
    if (res.ok && json.success) return json.data;
    if (!res.ok) {
      if (json.message) throw new Error(json.message);
      return repo.repoCreateTeamMember(input);
    }
  } catch (err: any) {
    if (err.message && err.message !== 'Failed to fetch') throw err;
    return repo.repoCreateTeamMember(input);
  }
}

export async function updateAdminTeamMember(
  id: string,
  input: Partial<
    Pick<TeamMember, "name" | "email" | "role" | "status" | "password">
  >,
) {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token") || "mock-token-admin") : "mock-token-admin";
  try {
    const res = await fetch(`${API_URL}/admin/team/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });
    const json = await res.json();
    if (res.ok && json.success) return json.data;
    if (!res.ok) {
      if (json.message) throw new Error(json.message);
      return repo.repoUpdateTeamMember(id, input);
    }
  } catch (err: any) {
    if (err.message && err.message !== 'Failed to fetch') throw err;
    return repo.repoUpdateTeamMember(id, input);
  }
}

export async function deleteAdminTeamMember(id: string) {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token") || "mock-token-admin") : "mock-token-admin";
  try {
    const res = await fetch(`${API_URL}/admin/team/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) return true;
    return repo.repoDeleteTeamMember(id);
  } catch {
    return repo.repoDeleteTeamMember(id);
  }
}

export async function updateAdminSettings(input: AdminSettings) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const res = await fetch(`${API_URL}/admin/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) return repo.repoUpdateSettings(input);
  const json = await res.json();
  return json.data;
}

export async function getAdminInstagram(): Promise<InstagramShot[]> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/instagram`, {
      headers: { ...(token && { Authorization: `Bearer ${token}` }) }
    });
    if (!res.ok) return repo.repoGetInstagram();
    const json = await res.json();
    return json.data || [];
  } catch {
    return repo.repoGetInstagram();
  }
}

export async function createAdminInstagramShot(input: { src: string; alt?: string }): Promise<InstagramShot> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/instagram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`
      },
      body: JSON.stringify(input)
    });
    if (!res.ok) return repo.repoCreateInstagramShot(input);
    const json = await res.json();
    return json.data;
  } catch {
    return repo.repoCreateInstagramShot(input);
  }
}

export async function updateAdminInstagramShot(
  id: string,
  input: Partial<Pick<InstagramShot, "src" | "alt">>
): Promise<InstagramShot> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/instagram/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`
      },
      body: JSON.stringify(input)
    });
    if (!res.ok) return repo.repoUpdateInstagramShot(id, input);
    const json = await res.json();
    return json.data;
  } catch {
    return repo.repoUpdateInstagramShot(id, input);
  }
}

export async function deleteAdminInstagramShot(id: string): Promise<boolean> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/instagram/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token ?? ''}` }
    });
    if (!res.ok) return repo.repoDeleteInstagramShot(id);
    return true;
  } catch {
    return repo.repoDeleteInstagramShot(id);
  }
}

export async function replaceAdminInstagram(shots: InstagramShot[]): Promise<InstagramShot[]> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;
  try {
    const res = await fetch(`${API_URL}/admin/instagram`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`
      },
      body: JSON.stringify({ shots })
    });
    if (!res.ok) return repo.repoReplaceInstagram(shots);
    const json = await res.json();
    return json.data;
  } catch {
    return repo.repoReplaceInstagram(shots);
  }
}

export type { AdminProductInput, AdminDashboardData } from "@/services/mock/adminRepository";
export type { InstagramShot } from "@/services/mock/catalogStore";
