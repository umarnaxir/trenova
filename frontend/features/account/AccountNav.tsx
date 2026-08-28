"use client";

import { usePathname } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  MapPin,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "@/hooks/stores/authStore";
import {
  AccountLayoutGrid,
  AccountMain,
  Nav,
  NavLink,
  Sidebar,
  SidebarAvatar,
  SidebarFooter,
  SidebarHeader,
  SidebarShopLink,
  SidebarUser,
} from "@/features/account/AccountNav.styles";

const links = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/profile", label: "Profile", icon: UserRound },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
] as const;

function initials(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "U";
}

function AccountNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  return (
    <Sidebar aria-label="Account">
      <SidebarHeader>
        <SidebarAvatar aria-hidden>
          {initials(user?.firstName, user?.lastName)}
        </SidebarAvatar>
        <SidebarUser>
          <strong>
            {user?.firstName} {user?.lastName}
          </strong>
          <span>{user?.email}</span>
        </SidebarUser>
      </SidebarHeader>

      <Nav>
        {links.map((link) => {
          const Icon = link.icon;
          const isAccountRoute = link.href.startsWith("/account");
          const active =
            "exact" in link && link.exact
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <NavLink
              key={link.href}
              href={link.href}
              $active={active}
              scroll={!isAccountRoute}
              prefetch
            >
              <Icon size={15} aria-hidden />
              {link.label}
            </NavLink>
          );
        })}
      </Nav>

      <SidebarFooter>
        <SidebarShopLink href="/shop">Continue shopping</SidebarShopLink>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AccountLayoutGrid>
      <AccountNav />
      <AccountMain key={pathname}>{children}</AccountMain>
    </AccountLayoutGrid>
  );
}
