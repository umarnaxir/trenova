import type { Order, User } from "@/types/user";
import { mockOrders, mockUser } from "@/services/mock/user";

export async function getCurrentUser(): Promise<User | null> {
  return mockUser;
}

export async function getUserOrders(): Promise<Order[]> {
  return mockOrders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  return mockOrders.find((order) => order.id === id) ?? null;
}
