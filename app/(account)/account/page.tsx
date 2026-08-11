"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useCartStore } from "@/hooks/stores/cartStore";
import { getUserOrders } from "@/services/user.service";
import { useIsClient } from "@/hooks/useIsClient";
import {
  AccountHero,
  AccountShell,
  ActionCard,
  CardCopy,
  CardCta,
  CardIcon,
  CardTitle,
  CardsGrid,
  HeroActions,
  HeroButton,
  HeroCopy,
  StatCard,
  StatsGrid,
} from "@/features/account/AccountDashboard.styles";

export default function AccountDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const cartCount = useCartStore((state) => state.itemCount());
  const isClient = useIsClient();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    getUserOrders(user.id, user.email).then((orders) =>
      setOrderCount(orders.length),
    );
  }, [user]);

  return (
    <AccountShell>
      <AccountHero>
        <HeroCopy>
          <h1>Welcome, {user?.firstName}</h1>
          <p>
            Manage orders, wishlist, cart, addresses, and profile in one place.
          </p>
        </HeroCopy>
        <HeroActions>
          <HeroButton href="/shop" $primary>
            Continue shopping
          </HeroButton>
          <HeroButton href="/track-order">Track order</HeroButton>
        </HeroActions>
      </AccountHero>

      <StatsGrid>
        <StatCard>
          <span>Orders</span>
          <strong>{isClient ? orderCount : "—"}</strong>
        </StatCard>
        <StatCard>
          <span>Wishlist</span>
          <strong>{isClient ? wishlistCount : "—"}</strong>
        </StatCard>
        <StatCard>
          <span>Cart items</span>
          <strong>{isClient ? cartCount : "—"}</strong>
        </StatCard>
        <StatCard>
          <span>Addresses</span>
          <strong>{user?.addresses.length ?? 0}</strong>
        </StatCard>
      </StatsGrid>

      <CardsGrid>
        <ActionCard href="/account/orders" scroll={false}>
          <CardIcon className="icon">
            <Package size={18} />
          </CardIcon>
          <CardTitle>Orders</CardTitle>
          <CardCopy>Track purchases, view totals, and reorder essentials.</CardCopy>
          <CardCta>View orders</CardCta>
        </ActionCard>

        <ActionCard href="/wishlist">
          <CardIcon className="icon">
            <Heart size={18} />
          </CardIcon>
          <CardTitle>Wishlist</CardTitle>
          <CardCopy>Saved pieces ready when you are — revisit anytime.</CardCopy>
          <CardCta>Open wishlist</CardCta>
        </ActionCard>

        <ActionCard href="/cart">
          <CardIcon className="icon">
            <ShoppingBag size={18} />
          </CardIcon>
          <CardTitle>Shopping cart</CardTitle>
          <CardCopy>Review quantities and move to secure checkout.</CardCopy>
          <CardCta>View cart</CardCta>
        </ActionCard>

        <ActionCard href="/account/addresses" scroll={false}>
          <CardIcon className="icon">
            <MapPin size={18} />
          </CardIcon>
          <CardTitle>Addresses</CardTitle>
          <CardCopy>Keep delivery locations updated for faster checkout.</CardCopy>
          <CardCta>Manage addresses</CardCta>
        </ActionCard>

        <ActionCard href="/account/profile" scroll={false}>
          <CardIcon className="icon">
            <UserRound size={18} />
          </CardIcon>
          <CardTitle>Profile</CardTitle>
          <CardCopy>Edit your name, email, and contact details.</CardCopy>
          <CardCta>Edit profile</CardCta>
        </ActionCard>

        <ActionCard href="/track-order">
          <CardIcon className="icon">
            <Package size={18} />
          </CardIcon>
          <CardTitle>Track order</CardTitle>
          <CardCopy>Look up any order with number and checkout email.</CardCopy>
          <CardCta>Track now</CardCta>
        </ActionCard>
      </CardsGrid>
    </AccountShell>
  );
}
