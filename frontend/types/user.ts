export type Address = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  status?: UserStatus;
  createdAt?: string;
  lastLoginAt?: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  subtotal?: number;
  discount?: number;
  shipping?: number;
  couponCode?: string;
  paymentMethod?: string;
  items: OrderItem[];
  shippingAddress?: Address;
  fullName?: string;
  userEmail?: string;
  userId?: string;
  phone?: string;
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};
