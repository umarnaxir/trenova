"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import type { Category } from "@/types/category";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { IconButton } from "@/components/IconButton/IconButton";
import {
  ActionWrap,
  Actions,
  CountDot,
  DesktopLogoWrap,
  DesktopOnlyAction,
  DesktopRightGroup,
  Header,
  LogoWrap,
  MegaCategorySub,
  MegaCategoryTitle,
  MegaHeader,
  MegaGrid,
  MegaItemCard,
  MegaPanel,
  MenuToggle,
  MobileAccordionBody,
  MobileAccordionHeader,
  MobileAccordionItem,
  MobileDivider,
  MobileHeaderLeft,
  MobileHeaderRight,
  MobileMenu,
  MobileNavLink,
  MobileSection,
  MobileSectionTitle,
  MobileSubLink,
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

const primaryLinks = [
  { label: "Men", slug: "men", href: "/categories/men" },
  { label: "Women", slug: "women", href: "/categories/women" },
  { label: "Kids", slug: "kids", href: "/categories/kids" },
  { label: "Accessories", slug: "accessories", href: "/categories/accessories" },
  { label: "New Arrivals", slug: "new-arrivals", href: "/categories/new-arrivals" },
  { label: "Best Sellers", slug: "best-sellers", href: "/categories/best-sellers" },
  { label: "Sale", slug: "sale", href: "/categories/sale" },
];

const mainPages = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/categories/new-arrivals" },
  { label: "Best Sellers", href: "/categories/best-sellers" },
  { label: "Sale — Up to 50% Off", href: "/categories/sale", accent: true },
];

export function Navbar({ categories }: NavbarProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

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

  const activeMegaCategory = categories.find(
    (c) => c.slug === hoveredCategorySlug && c.children && c.children.length > 0
  );

  const productCategories = categories.filter(
    (c) => c.children && c.children.length > 0
  );

  const handleLinkHover = (slug: string) => {
    const matchedCategory = categories.find(
      (c) => c.slug === slug && c.children && c.children.length > 0
    );
    if (matchedCategory) {
      setHoveredCategorySlug(slug);
      setMegaOpen(true);
    } else {
      setHoveredCategorySlug(null);
      setMegaOpen(false);
    }
  };

  const toggleMobileCategory = (slug: string) => {
    setExpandedMobileCategory((prev) => (prev === slug ? null : slug));
  };

  return (
    <>
      <Header onMouseLeave={() => setMegaOpen(false)}>
        <Container>
          <NavInner>
            {/* Mobile View Left: Hamburger */}
            <MobileHeaderLeft>
              <MenuToggle
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </MenuToggle>
            </MobileHeaderLeft>

            {/* Desktop View Left: Logo */}
            <DesktopLogoWrap>
              <Logo height={48} />
            </DesktopLogoWrap>

            {/* Mobile View Right: Logo before Actions */}
            <MobileHeaderRight>
              <LogoWrap>
                <Logo height={38} />
              </LogoWrap>

              <Actions>
                <IconButton
                  label="Search"
                  tone="light"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={18} />
                </IconButton>
                <ActionWrap>
                  {isAuthenticated ? (
                    <Link href="/account" aria-label="Account">
                      <User size={18} />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-label="Account"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "inherit",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                      onClick={() => setLoginDrawerOpen(true)}
                    >
                      <User size={18} />
                    </button>
                  )}
                </ActionWrap>
                <ActionWrap>
                  <Link href="/wishlist" aria-label="Wishlist">
                    <Heart size={18} />
                  </Link>
                  <CountDot>{wishCount}</CountDot>
                </ActionWrap>
                <ActionWrap>
                  <Link href="/cart" aria-label="Shopping cart">
                    <ShoppingBag size={18} />
                  </Link>
                  <CountDot>{cartCount}</CountDot>
                </ActionWrap>
              </Actions>
            </MobileHeaderRight>

            {/* Desktop View Right: NavLinks + Actions */}
            <DesktopRightGroup>
              <NavLinks aria-label="Primary">
                {primaryLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => handleLinkHover(link.slug)}
                    onFocus={() => handleLinkHover(link.slug)}
                    $accent={link.label === "Sale"}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </NavLinks>

              <Actions>
                <IconButton
                  label="Search"
                  tone="light"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={18} />
                </IconButton>
                <DesktopOnlyAction>
                  <ActionWrap>
                    {isAuthenticated ? (
                      <Link href="/account" aria-label="Account">
                        <User size={18} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-label="Account"
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "inherit",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                        onClick={() => setLoginDrawerOpen(true)}
                      >
                        <User size={18} />
                      </button>
                    )}
                  </ActionWrap>
                </DesktopOnlyAction>
                <DesktopOnlyAction>
                  <ActionWrap>
                    <Link href="/wishlist" aria-label="Wishlist">
                      <Heart size={18} />
                    </Link>
                    <CountDot>{wishCount}</CountDot>
                  </ActionWrap>
                </DesktopOnlyAction>
                <ActionWrap>
                  <Link href="/cart" aria-label="Shopping cart">
                    <ShoppingBag size={18} />
                  </Link>
                  <CountDot>{cartCount}</CountDot>
                </ActionWrap>
              </Actions>
            </DesktopRightGroup>
          </NavInner>
        </Container>

        {/* Desktop Mega Menu Panel (Specific to Hovered Category Only) */}
        {megaOpen && activeMegaCategory ? (
          <MegaPanel
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <Container>
              <MegaHeader>
                <MegaCategoryTitle href={`/categories/${activeMegaCategory.slug}`}>
                  {activeMegaCategory.name} Collection
                </MegaCategoryTitle>
                {activeMegaCategory.description ? (
                  <MegaCategorySub>{activeMegaCategory.description}</MegaCategorySub>
                ) : null}
              </MegaHeader>

              <MegaGrid>
                {activeMegaCategory.children?.map((child) => (
                  <MegaItemCard
                    key={child.id}
                    href={`/categories/${child.slug}`}
                    onClick={() => setMegaOpen(false)}
                  >
                    <span>{child.name}</span>
                    <ChevronRight size={16} />
                  </MegaItemCard>
                ))}
              </MegaGrid>
            </Container>
          </MegaPanel>
        ) : null}

        {/* Mobile Hamburger Menu Drawer */}
        {mobileMenuOpen ? (
          <MobileMenu>
            <MobileSection>
              <MobileSectionTitle>MAIN PAGES</MobileSectionTitle>
              {mainPages.map((page) => (
                <MobileNavLink
                  key={page.href}
                  href={page.href}
                  $accent={page.accent}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {page.label}
                </MobileNavLink>
              ))}
            </MobileSection>

            <MobileDivider />

            <MobileSection>
              <MobileSectionTitle>PRODUCT CATEGORIES</MobileSectionTitle>
              {productCategories.map((category) => {
                const isExpanded = expandedMobileCategory === category.slug;
                const hasChildren =
                  category.children && category.children.length > 0;

                return (
                  <MobileAccordionItem key={category.id}>
                    <MobileAccordionHeader
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          toggleMobileCategory(category.slug);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <span>{category.name}</span>
                      {hasChildren ? (
                        <ChevronDown
                          size={18}
                          style={{
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                            color: "#C6A75E",
                          }}
                        />
                      ) : null}
                    </MobileAccordionHeader>

                    <AnimatePresence>
                      {hasChildren && isExpanded ? (
                        <MobileAccordionBody
                          as={motion.div}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          {category.children?.map((child) => (
                            <MobileSubLink
                              key={child.id}
                              href={`/categories/${child.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </MobileSubLink>
                          ))}
                        </MobileAccordionBody>
                      ) : null}
                    </AnimatePresence>
                  </MobileAccordionItem>
                );
              })}
            </MobileSection>

            <MobileDivider />

            <MobileSection>
              <MobileSectionTitle>ACCOUNT &amp; SUPPORT</MobileSectionTitle>
              {isAuthenticated ? (
                <MobileNavLink
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </MobileNavLink>
              ) : (
                <MobileNavLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setLoginDrawerOpen(true);
                  }}
                >
                  Login / Register
                </MobileNavLink>
              )}
              <MobileNavLink
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </MobileNavLink>
              <MobileNavLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </MobileSection>
          </MobileMenu>
        ) : null}

        <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      </Header>
      <LoginModal />
    </>
  );
}
