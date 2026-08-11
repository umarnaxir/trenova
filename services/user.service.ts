import type { Address, Order, OrderItem } from "@/types/user";
import type { CartItem } from "@/types/cart";
import type { ProductSize } from "@/types/product";
import {
  appendOrder,
  getOrdersForUser,
  getOrdersStore,
  upsertRegisteredUser,
} from "@/services/mock/usersStore";
import {
  getCatalogProducts,
  setCatalogProducts,
} from "@/services/mock/catalogStore";
import {
  getSizeQty,
  normalizeProductInventory,
  sumSizeStock,
} from "@/utils/inventory";

export async function getUserOrders(userId?: string, email?: string): Promise<Order[]> {
  if (userId || email) {
    return getOrdersForUser(userId ?? "", email);
  }
  return getOrdersStore();
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
};

export async function placeOrder(input: PlaceOrderInput): Promise<Order> {
  // Decrement size-wise stock
  const products = getCatalogProducts().map((product) =>
    normalizeProductInventory(product),
  );
  const updated = [...products];

  for (const item of input.items) {
    const index = updated.findIndex((product) => product.id === item.productId);
    if (index < 0) {
      throw new Error(`Product unavailable: ${item.name}`);
    }
    const product = updated[index];
    const size = item.size as ProductSize;
    const available = getSizeQty(product, size);
    if (item.quantity > available) {
      throw new Error(
        `Only ${available} left for ${product.name} (${size})`,
      );
    }
    const sizeStock = { ...(product.sizeStock ?? {}) };
    sizeStock[size] = available - item.quantity;
    updated[index] = normalizeProductInventory({
      ...product,
      sizeStock,
      stock: sumSizeStock(sizeStock),
    });
  }
  setCatalogProducts(updated);

  const user = upsertRegisteredUser({
    id: input.userId,
    email: input.userEmail,
    firstName: input.fullName.split(" ")[0] || "Guest",
    lastName: input.fullName.split(" ").slice(1).join(" ") || "User",
    phone: input.phone,
    addresses: [
      {
        id: `addr-${Date.now().toString(36)}`,
        label: "Shipping",
        fullName: input.fullName,
        phone: input.phone,
        line1: input.line1,
        city: input.city,
        state: input.state,
        postalCode: input.postalCode,
        country: input.country ?? "India",
        isDefault: true,
      } satisfies Address,
    ],
  });

  const orderItems: OrderItem[] = input.items.map((item) => ({
    productId: item.productId,
    name: item.name,
    image: item.image,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    price: item.price,
  }));

  const order: Order = {
    id: `ord-${Date.now().toString(36)}`,
    orderNumber: `TRN-${Math.floor(10000 + Math.random() * 89999)}`,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    total: input.total,
    items: orderItems,
    userId: user.id,
    userEmail: user.email,
    shippingAddress: user.addresses[0],
  };

  return appendOrder(order);
}
