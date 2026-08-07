"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Main,
  MenuToggle,
  Shell,
  SideLink,
  Sidebar,
  TopBar,
} from "@/features/admin/AdminShell.styles";
import { Text } from "@/components/Text/Text";
import { IconButton } from "@/components/IconButton/IconButton";
import { Logo } from "@/components/Logo/Logo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/brands", label: "Brands" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/coupons", label: "Coupons" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/cms", label: "CMS" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/notifications", label: "Notifications" },
];

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Shell>
      <Sidebar $open={open}>
        <Logo height={36} href="/admin" />
        <Text color="gold" variant="eyebrow">
          Admin
        </Text>
        {links.map((link) => (
          <SideLink
            key={link.href}
            href={link.href}
            $active={pathname === link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </SideLink>
        ))}
        <SideLink href="/">Back to store</SideLink>
      </Sidebar>
      <Main>
        <TopBar>
          <Text as="h1" variant="h2">
            {title}
          </Text>
          <MenuToggle>
            <IconButton
              label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </IconButton>
          </MenuToggle>
        </TopBar>
        {children}
      </Main>
    </Shell>
  );
}
