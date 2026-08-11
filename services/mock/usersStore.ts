import type { Address, Order, User, UserStatus } from "@/types/user";
import type { AdminUser, AdminUserOrderSummary } from "@/types/admin";
import { mockOrders as seedOrders, mockUser } from "@/services/mock/user";

export type RegisteredUser = User & {
  status: UserStatus;
  createdAt: string;
  lastLoginAt: string;
  password?: string;
  deactivatedAt?: string;
  pendingDeletionAt?: string;
};

const USERS_KEY = "trenova-registered-users";
const ORDERS_KEY = "trenova-orders";

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

const seedUsers: RegisteredUser[] = [
  {
    ...clone(mockUser),
    status: "active",
    password: "1122",
    createdAt: "2026-01-12T00:00:00.000Z",
    lastLoginAt: new Date().toISOString(),
  },
];

const seedOrdersList: Order[] = clone(seedOrders).map((order) => ({
  ...order,
  userId: order.userId ?? mockUser.id,
  userEmail: order.userEmail ?? mockUser.email,
}));

let users: RegisteredUser[] = clone(seedUsers);
let orders: Order[] = clone(seedOrdersList);
let hydrated = false;

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readStorage<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota / private mode write failures.
  }
}

function ensureHydrated() {
  if (hydrated || !canUseStorage()) return;
  hydrated = true;

  const storedUsers = readStorage<RegisteredUser[]>(USERS_KEY);
  if (Array.isArray(storedUsers) && storedUsers.length) {
    const byEmail = new Map<string, RegisteredUser>();
    for (const user of [...seedUsers, ...storedUsers]) {
      byEmail.set(user.email.trim().toLowerCase(), user);
    }
    users = Array.from(byEmail.values());
  }

  const storedOrders = readStorage<Order[]>(ORDERS_KEY);
  if (Array.isArray(storedOrders) && storedOrders.length) {
    const byId = new Map<string, Order>();
    for (const order of [...seedOrdersList, ...storedOrders]) {
      byId.set(order.id, order);
    }
    orders = Array.from(byId.values());
  }

  purgeExpiredAccounts();
  persistUsers();
  persistOrders();
}

function monthsBetween(fromIso: string, to = new Date()) {
  const from = new Date(fromIso).getTime();
  return (to.getTime() - from) / (1000 * 60 * 60 * 24 * 30.44);
}

function hoursBetween(fromIso: string, to = new Date()) {
  const from = new Date(fromIso).getTime();
  return (to.getTime() - from) / (1000 * 60 * 60);
}

function purgeExpiredAccounts() {
  users = users.filter((user) => {
    if (user.pendingDeletionAt && hoursBetween(user.pendingDeletionAt) >= 24) {
      return false;
    }
    if (
      user.status === "inactive" &&
      user.deactivatedAt &&
      !user.pendingDeletionAt &&
      monthsBetween(user.deactivatedAt) >= 6
    ) {
      return false;
    }
    return true;
  });
}

function persistUsers() {
  writeStorage(USERS_KEY, users);
}

function persistOrders() {
  writeStorage(ORDERS_KEY, orders);
}

export function getRegisteredUsers(): RegisteredUser[] {
  ensureHydrated();
  return clone(users);
}

export function getOrdersStore(): Order[] {
  ensureHydrated();
  return clone(orders);
}

export function upsertRegisteredUser(
  input: Partial<RegisteredUser> &
    Pick<User, "email"> & {
      firstName?: string;
      lastName?: string;
    },
): RegisteredUser {
  ensureHydrated();
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
      password: input.password ?? current.password,
      status: input.status ?? current.status ?? "active",
      lastLoginAt: now,
      createdAt: current.createdAt ?? now,
    };
    users[index] = next;
    persistUsers();
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
    password: input.password,
    status: input.status ?? "active",
    createdAt: input.createdAt ?? now,
    lastLoginAt: now,
  };
  users = [created, ...users];
  persistUsers();
  return clone(created);
}

export function verifyUserPassword(id: string, password: string): boolean {
  ensureHydrated();
  const user = users.find((item) => item.id === id);
  if (!user) return false;
  if (!user.password) return password.trim().length >= 4;
  return user.password === password;
}

export function deactivateRegisteredUser(id: string): RegisteredUser {
  ensureHydrated();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found");
  users[index] = {
    ...users[index],
    status: "inactive",
    deactivatedAt: new Date().toISOString(),
    pendingDeletionAt: undefined,
  };
  persistUsers();
  return clone(users[index]);
}

export function scheduleAccountDeletion(id: string): RegisteredUser {
  ensureHydrated();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found");
  const now = new Date().toISOString();
  users[index] = {
    ...users[index],
    status: "inactive",
    pendingDeletionAt: now,
    deactivatedAt: users[index].deactivatedAt ?? now,
  };
  persistUsers();
  return clone(users[index]);
}

export function reactivateRegisteredUser(id: string): RegisteredUser {
  ensureHydrated();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found");
  const user = users[index];
  if (user.pendingDeletionAt) {
    throw new Error("Account is scheduled for deletion and cannot be reactivated");
  }
  if (user.deactivatedAt && monthsBetween(user.deactivatedAt) >= 6) {
    throw new Error("Deactivation window expired");
  }
  users[index] = {
    ...user,
    status: "active",
    deactivatedAt: undefined,
    pendingDeletionAt: undefined,
    lastLoginAt: new Date().toISOString(),
  };
  persistUsers();
  return clone(users[index]);
}

export function setUserStatus(id: string, status: UserStatus): RegisteredUser {
  ensureHydrated();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found");
  users[index] = {
    ...users[index],
    status,
    deactivatedAt:
      status === "inactive"
        ? users[index].deactivatedAt ?? new Date().toISOString()
        : undefined,
  };
  persistUsers();
  return clone(users[index]);
}

export function deleteRegisteredUser(id: string): void {
  ensureHydrated();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found");
  users = users.filter((user) => user.id !== id);
  persistUsers();
}

export function appendOrder(order: Order): Order {
  ensureHydrated();
  orders = [order, ...orders];
  persistOrders();
  return clone(order);
}

export function updateOrderStatusInStore(
  id: string,
  status: Order["status"],
): Order {
  ensureHydrated();
  const index = orders.findIndex((order) => order.id === id);
  if (index < 0) throw new Error("Order not found");
  orders[index] = { ...orders[index], status };
  persistOrders();
  return clone(orders[index]);
}

export function getOrdersForUser(userId: string, email?: string): Order[] {
  ensureHydrated();
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
  ensureHydrated();
  const user = users.find((item) => item.id === id);
  return user ? toAdminUser(user) : null;
}
