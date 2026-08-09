"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Warehouse,
  TicketPercent,
  Star,
  ChartColumn,
  UsersRound,
  Images,
  Settings,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Store,
} from "lucide-react";
import {
  BrandBlock,
  CollapseButton,
  Main,
  MenuToggle,
  Nav,
  Overlay,
  Shell,
  SideButton,
  SideFooter,
  SideLink,
  Sidebar,
  TopBar,
} from "@/features/admin/AdminShell.styles";
import { Text } from "@/components/Text/Text";
import { IconButton } from "@/components/IconButton/IconButton";
import { Logo } from "@/components/Logo/Logo";
import { ConfirmDialog } from "@/features/admin/ConfirmDialog";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/instagram", label: "Instagram", icon: Images },
  { href: "/admin/analytics", label: "Analytics", icon: ChartColumn },
  { href: "/admin/team", label: "Team", icon: UsersRound },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const collapsed = useAdminUiStore((state) => state.sidebarCollapsed);
  const mobileOpen = useAdminUiStore((state) => state.mobileSidebarOpen);
  const toggleCollapsed = useAdminUiStore((state) => state.toggleSidebarCollapsed);
  const setMobileOpen = useAdminUiStore((state) => state.setMobileSidebarOpen);
  const logout = useAdminAuthStore((state) => state.logout);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <Shell $collapsed={collapsed}>
      <Overlay
        type="button"
        aria-label="Close sidebar"
        $open={mobileOpen}
        onClick={closeMobile}
      />
      <Sidebar $open={mobileOpen} $collapsed={collapsed}>
        <BrandBlock $collapsed={collapsed}>
          <Logo height={collapsed ? 28 : 36} href="/admin" />
          {!collapsed ? (
            <Text color="gold" variant="eyebrow">
              Admin
            </Text>
          ) : null}
        </BrandBlock>

        <Nav aria-label="Admin">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <SideLink
                key={link.href}
                as={Link}
                href={link.href}
                $active={isActive(pathname, link.href)}
                $collapsed={collapsed}
                title={link.label}
                onClick={closeMobile}
              >
                <Icon size={18} aria-hidden />
                <span>{link.label}</span>
              </SideLink>
            );
          })}
        </Nav>

        <SideFooter>
          <SideLink
            as={Link}
            href="/"
            $collapsed={collapsed}
            title="Back to store"
            onClick={closeMobile}
          >
            <Store size={18} aria-hidden />
            <span>Back to store</span>
          </SideLink>
          <SideButton
            type="button"
            $collapsed={collapsed}
            title="Logout"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut size={18} aria-hidden />
            <span>Logout</span>
          </SideButton>
        </SideFooter>
      </Sidebar>

      <CollapseButton
        type="button"
        $collapsed={collapsed}
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </CollapseButton>

      <Main>
        <TopBar>
          <Text as="h1" variant="h2">
            {title}
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {actions}
            <MenuToggle>
              <IconButton
                label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </IconButton>
            </MenuToggle>
          </div>
        </TopBar>
        {children}
      </Main>

      <ConfirmDialog
        open={logoutOpen}
        title="Log out"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        tone="danger"
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          closeMobile();
          logout();
          router.replace("/admin");
        }}
      />
    </Shell>
  );
}
