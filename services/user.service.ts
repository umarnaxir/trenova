import type { Order } from "@/types/user";
import { mockOrders } from "@/services/mock/user";

export async function getUserOrders(): Promise<Order[]> {
  return mockOrders;
}
