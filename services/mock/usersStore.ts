import type { Address, Order, User, UserStatus } from "@/types/user";
import type { AdminUser, AdminUserOrderSummary } from "@/types/admin";
import { mockOrders as seedOrders, mockUser } from "@/services/mock/user";

export type RegisteredUser = User & {
  status: UserStatus;
  createdAt: string;
  lastLoginAt: string;
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function formatLocation(addresses: Address[]): string {
  const address = addresses.find((item) => item.isDefault) ?? addresses[0];
  if (!address) return "—";
  return [address.city, address.state, address.country].filter(Boolean).join(", ");
}

let users: RegisteredUser[] = [
  {
    ...clone(mockUser),
    status: "active",
    createdAt: "2026-01-12T00:00:00.000Z",
    lastLoginAt: new Date().toISOString(),
  },
];

/** Shared orders list — admin + account + checkout. */
let orders: Order[] = clone(seedOrders).map((order) => ({
  ...order,
  userId: order.userId ?? mockUser.id,
  userEmail: order.userEmail ?? mockUser.email,
}));

export function getRegisteredUsers(): RegisteredUser[] {
  return clone(users);
}

export function getOrdersStore(): Order[] {
  return clone(orders);
}

export function upsertRegisteredUser(
  input: Partial<User> &
    Pick<User, "email"> & {
      firstName?: string;
      lastName?: string;
    },
): RegisteredUser {
  const email = input.email.trim().toLowerCase();
  const index = users.findIndex(
    (user) => user.email.trim().toLowerCase() === email,
  );
  const now = new Date().toISOString();

  if (index >= 0) {
    const current = users[index];
    const next: RegisteredUser = {
      ...current,
      ...input,
      email,
      firstName: input.firstName ?? current.firstName,
      lastName: input.lastName ?? current.lastName,
      phone: input.phone ?? current.phone,
      addresses: input.addresses ?? current.addresses,
      status: input.status ?? current.status ?? "active",
      lastLoginAt: now,
      createdAt: current.createdAt ?? now,
    };
    users[index] = next;
    return clone(next);
  }

  const created: RegisteredUser = {
    id: input.id ?? uid("user"),
    firstName: input.firstName ?? "Guest",
    lastName: input.lastName ?? "User",
    email,
    phone: input.phone,
    avatar: input.avatar,
    addresses: input.addresses ?? [],
    status: input.status ?? "active",
    createdAt: input.createdAt ?? now,
    lastLoginAt: now,
  };
  users = [created, ...users];
  return clone(created);
}

export function setUserStatus(id: string, status: UserStatus): RegisteredUser {
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found");
  users[index] = { ...users[index], status };
  return clone(users[index]);
}

export function appendOrder(order: Order): Order {
  orders = [order, ...orders];
  return clone(order);
}

export function updateOrderStatusInStore(
  id: string,
  status: Order["status"],
): Order {
  const index = orders.findIndex((order) => order.id === id);
  if (index < 0) throw new Error("Order not found");
  orders[index] = { ...orders[index], status };
  return clone(orders[index]);
}

export function getOrdersForUser(userId: string, email?: string): Order[] {
  const normalized = email?.trim().toLowerCase();
  return clone(
    orders.filter(
      (order) =>
        order.userId === userId ||
        (normalized && order.userEmail?.toLowerCase() === normalized),
    ),
  );
}

function toAdminUser(user: RegisteredUser): AdminUser {
  const userOrders = getOrdersForUser(user.id, user.email);
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const summaries: AdminUserOrderSummary[] = userOrders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt,
    total: order.total,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  }));

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: user.phone ?? "—",
    location: formatLocation(user.addresses),
    status: user.status,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    totalOrders: userOrders.length,
    totalSpent,
    hasPurchased: userOrders.length > 0,
    addresses: clone(user.addresses),
    orders: summaries,
  };
}

export function listAdminUsers(): AdminUser[] {
  return getRegisteredUsers()
    .map(toAdminUser)
    .sort(
      (a, b) =>
        new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime(),
    );
}

export function getAdminUserById(id: string): AdminUser | null {
  const user = users.find((item) => item.id === id);
  return user ? toAdminUser(user) : null;
}
