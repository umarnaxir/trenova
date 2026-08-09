export type AdminStat = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

export type AdminBrand = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  joinedAt: string;
};

export type AdminNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image";
  sizeKb: number;
  createdAt: string;
};

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  updatedAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
};

/** Roles ready for future permission maps — not enforced yet. */
export type AdminRole = "Admin" | "Manager" | "Editor" | "Viewer";

export type AdminSession = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "invited" | "disabled";
  joinedAt: string;
};

export type InventoryRow = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: "In Stock" | "Low" | "Out";
};

export type AdminSettings = {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
};

export type AnalyticsPoint = {
  label: string;
  value: number;
};
