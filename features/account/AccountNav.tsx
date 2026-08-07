"use client";

import { usePathname } from "next/navigation";
import { Nav, NavLink } from "@/features/account/AccountNav.styles";

const links = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <Nav aria-label="Account">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          $active={pathname === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </Nav>
  );
}
