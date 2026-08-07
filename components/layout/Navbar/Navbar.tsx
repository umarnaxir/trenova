"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import type { Category } from "@/types/category";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import {
  ActionWrap,
  Actions,
  CountDot,
  DesktopOnlyAction,
  Header,
  LoginButton,
  LogoWrap,
  MegaColumn,
  MegaGrid,
  MegaItem,
  MegaPanel,
  MegaTitle,
  MenuToggle,
  MobileMenu,
  NavInner,
  NavLink,
  NavLinks,
} from "@/components/layout/Navbar/Navbar.styles";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { LoginModal } from "@/features/auth/LoginModal";

type NavbarProps = {
  categories: Category[];
};

export function Navbar({ categories }: NavbarProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const cartCount = useCartStore((state) => state.itemCount());
  const wishCount = useWishlistStore((state) => state.items.length);
  const mobileMenuOpen = useUiStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);
  const searchOpen = useUiStore((state) => state.searchOpen);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const setLoginDrawerOpen = useUiStore((state) => state.setLoginDrawerOpen);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setMobileMenuOpen]);

  return (
    <>
    <Header
      onMouseLeave={() => setMegaOpen(false)}
    >
      <Container>
        <NavInner>
          <MenuToggle
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </MenuToggle>

          <LogoWrap>
            <Logo height={32} />
          </LogoWrap>

          <NavLinks aria-label="Primary">
            <NavLink
              href="/shop"
              onMouseEnter={() => setMegaOpen(true)}
              onFocus={() => setMegaOpen(true)}
            >
              Shop
            </NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/categories/new-arrivals">New</NavLink>
            <NavLink href="/categories/sale">Sale</NavLink>
            <NavLink href="/about">About</NavLink>
          </NavLinks>

          <Actions>
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </IconButton>
            <DesktopOnlyAction>
              <ActionWrap>
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart size={18} />
                </Link>
                {wishCount > 0 ? <CountDot>{wishCount}</CountDot> : null}
              </ActionWrap>
            </DesktopOnlyAction>
            <ActionWrap>
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingBag size={18} />
              </Link>
              {cartCount > 0 ? <CountDot>{cartCount}</CountDot> : null}
            </ActionWrap>
            {isAuthenticated ? (
              <DesktopOnlyAction>
                <ActionWrap>
                  <Link href="/account" aria-label="Account">
                    <User size={18} />
                  </Link>
                </ActionWrap>
              </DesktopOnlyAction>
            ) : (
              <LoginButton
                type="button"
                onClick={() => setLoginDrawerOpen(true)}
              >
                Login
              </LoginButton>
            )}
          </Actions>
        </NavInner>
      </Container>

      {megaOpen ? (
        <MegaPanel onMouseEnter={() => setMegaOpen(true)}>
          <Container>
            <MegaGrid>
              {categories.map((category) => (
                <MegaColumn key={category.id}>
                  <MegaTitle href={`/categories/${category.slug}`}>
                    {category.name}
                  </MegaTitle>
                  {category.children?.map((child) => (
                    <MegaItem
                      key={child.id}
                      href={`/categories/${child.slug}`}
                    >
                      {child.name}
                    </MegaItem>
                  ))}
                </MegaColumn>
              ))}
            </MegaGrid>
          </Container>
        </MegaPanel>
      ) : null}

      {mobileMenuOpen ? (
        <MobileMenu>
          <NavLink href="/shop" onClick={() => setMobileMenuOpen(false)}>
            Shop
          </NavLink>
          <NavLink href="/categories" onClick={() => setMobileMenuOpen(false)}>
            Categories
          </NavLink>
          <NavLink
            href="/categories/new-arrivals"
            onClick={() => setMobileMenuOpen(false)}
          >
            New Arrivals
          </NavLink>
          <NavLink
            href="/categories/sale"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sale
          </NavLink>
          <NavLink href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
            Wishlist
          </NavLink>
          {isAuthenticated ? (
            <NavLink href="/account" onClick={() => setMobileMenuOpen(false)}>
              Account
            </NavLink>
          ) : (
            <NavLink
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setMobileMenuOpen(false);
                setLoginDrawerOpen(true);
              }}
            >
              Login
            </NavLink>
          )}
          <NavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
            About
          </NavLink>
          <NavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </NavLink>
          {categories.map((category) => (
            <div key={category.id}>
              <Text as="p" variant="eyebrow" mb={2}>
                {category.name}
              </Text>
              {category.children?.slice(0, 4).map((child) => (
                <NavLink
                  key={child.id}
                  href={`/categories/${child.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ display: "block", marginBottom: 8 }}
                >
                  {child.name}
                </NavLink>
              ))}
            </div>
          ))}
        </MobileMenu>
      ) : null}

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </Header>
      <LoginModal />
    </>
  );
}
