"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Warehouse,
  TicketPercent,
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
  UserRound,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import {
  BrandBlock,
  CollapseButton,
  Main,
  MenuToggle,
  Nav,
  Overlay,
  ProfileAvatar,
  ProfileDropdown,
  ProfileDropdownHeader,
  ProfileDropdownItem,
  ProfileDropdownLink,
  ProfileMenuWrap,
  ProfileMeta,
  ProfileTrigger,
  Shell,
  SideButton,
  SideFooter,
  SideLink,
  Sidebar,
  TopBar,
  TopBarLeft,
  TopBarRight,
} from "@/features/admin/AdminShell.styles";
import { Text } from "@/components/Text/Text";
import { IconButton } from "@/components/IconButton/IconButton";
import { Logo } from "@/components/Logo/Logo";
import { ConfirmDialog } from "@/features/admin/ConfirmDialog";
import { AdminGlobalSearch } from "@/features/admin/AdminGlobalSearch";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/admin/instagram", label: "Instagram", icon: Images },
  { href: "/admin/analytics", label: "Analytics", icon: ChartColumn },
  { href: "/admin/team", label: "Team", icon: UsersRound },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
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
  const admin = useAdminAuthStore((state) => state.admin);
  const logout = useAdminAuthStore((state) => state.logout);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (!profileOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

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
          <TopBarLeft>
            <AdminGlobalSearch />
          </TopBarLeft>
          <TopBarRight>
            {actions}
            {admin ? (
              <ProfileMenuWrap ref={profileRef}>
                <ProfileTrigger
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  <ProfileAvatar aria-hidden>
                    {initials(admin.name) || "A"}
                  </ProfileAvatar>
                  <ProfileMeta>
                    <strong>{admin.name}</strong>
                    <small>{admin.role}</small>
                  </ProfileMeta>
                  <ChevronDown size={14} aria-hidden />
                </ProfileTrigger>
                <ProfileDropdown $open={profileOpen} role="menu">
                  <ProfileDropdownHeader>
                    <strong>{admin.name}</strong>
                    <small>
                      {admin.role} · {admin.email}
                    </small>
                  </ProfileDropdownHeader>
                  <ProfileDropdownLink
                    href="/admin/profile"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserRound size={16} aria-hidden />
                    Update Profile
                  </ProfileDropdownLink>
                  <ProfileDropdownLink
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setProfileOpen(false)}
                  >
                    <ExternalLink size={16} aria-hidden />
                    Visit Website
                  </ProfileDropdownLink>
                  <ProfileDropdownItem
                    type="button"
                    data-danger="true"
                    onClick={() => {
                      setProfileOpen(false);
                      setLogoutOpen(true);
                    }}
                  >
                    <LogOut size={16} aria-hidden />
                    Sign Out
                  </ProfileDropdownItem>
                </ProfileDropdown>
              </ProfileMenuWrap>
            ) : null}
            <MenuToggle>
              <IconButton
                label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </IconButton>
            </MenuToggle>
          </TopBarRight>
        </TopBar>
        <Text as="h1" variant="h2" fontWeight="bold" mb={4}>
          {title}
        </Text>
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
