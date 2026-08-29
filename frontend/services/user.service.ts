import type { Address, Order, OrderItem } from "@/types/user";
import type { CartItem } from "@/types/cart";
import { useAuthStore } from "@/hooks/stores/authStore";
import { appendOrder } from "@/services/mock/usersStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function getUserOrders(userId?: string, email?: string): Promise<Order[]> {
  const token = useAuthStore.getState().token;
  if (!token) return [];
  
  try {
    const res = await fetch(`${API_URL}/orders/my-orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((order: any) => ({
      ...order,
      status: (order.status || 'pending').toLowerCase(),
      shippingAddress: order.shippingAddress || {
        fullName: order.fullName,
        phone: order.phone,
        line1: order.line1,
        city: order.city,
        state: order.state,
        postalCode: order.postalCode,
        country: order.country || 'India',
      },
      items: (order.items || []).map((item: any) => ({
        ...item,
        name: item.productName || item.name,
        image: item.productImage || item.image || '/placeholder.png',
      }))
    }));
  } catch {
    return [];
  }
}

export type PlaceOrderInput = {
  userId?: string;
  userEmail: string;
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  items: CartItem[];
  total: number;
  subtotal?: number;
  discount?: number;
  shipping?: number;
  couponCode?: string;
  paymentMethod?: string;
};

export async function placeOrder(input: PlaceOrderInput): Promise<Order> {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/orders/checkout`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...input,
      paymentMethod: input.paymentMethod || 'COD'
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to place order');
  }

  const json = await res.json();
  const order = json.data;
  if (order && order.status) {
    order.status = order.status.toLowerCase();
  }
  return order;
}

export async function trackOrderAPI(orderNumber: string, email: string): Promise<Order | null> {
  try {
    const res = await fetch(`${API_URL}/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
    if (!res.ok) return null;
    const json = await res.json();
    const order = json.data;
    if (order && order.status) {
      order.status = order.status.toLowerCase();
    }
    return order;
  } catch {
    return null;
  }
}

export async function deactivateAccountAPI(password: string): Promise<boolean> {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}/user/deactivate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Failed to deactivate account");
  }
  return true;
}

export async function deleteAccountAPI(password: string): Promise<boolean> {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}/user/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete account");
  }
  return true;
}