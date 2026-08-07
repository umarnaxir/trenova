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
