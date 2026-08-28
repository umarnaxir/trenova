"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Copy,
  Globe,
  Heart,
  Link2,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Ruler,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import type { Product, ProductSize } from "@/types/product";
import type { Review } from "@/types/review";
import {
  ActionButton,
  Actions,
  BadgeRow,
  BlockTitle,
  BrandLabel,
  ColorChip,
  ColorDot,
  ComparePrice,
  CurrentPrice,
  DetailsRoot,
  DiscountTag,
  Gallery,
  InfoPanel,
  Layout,
  MainImage,
  MainStage,
  OptionBlock,
  OptionLabel,
  OptionRow,
  PriceBlock,
  ProductTitle,
  QtyRow,
  RatingLine,
  RelatedGrid,
  ReviewsGrid,
  ShareMenu,
  ShareMenuItem,
  ShareWrap,
  ShortCopy,
  SizeChip,
  SpecCard,
  SpecGrid,
  StockHint,
  TabButton,
  TabCopy,
  TabList,
  TabPanel,
  TabsSection,
  Thumb,
  ThumbColumn,
  TopMeta,
  TrustBar,
  TrustItem,
  UtilityButton,
  UtilityRow,
} from "@/features/product/ProductDetails.styles";
import { Badge } from "@/components/Badge/Badge";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { ReviewCard } from "@/components/ReviewCard/ReviewCard";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useRecentlyViewedStore } from "@/hooks/stores/recentlyViewedStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useIsClient } from "@/hooks/useIsClient";
import { discountPercent, formatCurrency } from "@/utils/format";
import { getSizeQty } from "@/utils/inventory";
import { submitReview, getProductReviews } from "@/services/review.service";

type ProductDetailsProps = {
  product: Product;
  reviews: Review[];
  related: Product[];
};

type Angle = "front" | "left" | "right";
type TabKey = "description" | "details" | "shipping" | "reviews";

const ANGLES: Angle[] = ["front", "left", "right"];

const TRUST = [
  { icon: Truck, title: "Free Shipping", copy: "Orders above ₹999" },
  { icon: RotateCcw, title: "Easy Returns", copy: "7-day returns" },
  { icon: ShieldCheck, title: "Secure Payment", copy: "100% protected" },
  { icon: BadgeCheck, title: "Quality Assured", copy: "Premium materials" },
] as const;

export function ProductDetails({
  product,
  reviews,
  related,
}: ProductDetailsProps) {
  const router = useRouter();
  const [angleIndex, setAngleIndex] = useState(0);
  const angle = ANGLES[angleIndex];
  const firstAvailable =
    product.sizes.find((item) => getSizeQty(product, item) > 0) ??
    product.sizes[0];
  const [size, setSize] = useState<ProductSize>(firstAvailable);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<TabKey>("description");
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWish = useWishlistStore((state) => state.toggle);
  const wishedRaw = useWishlistStore((state) => state.has(product.id));
  const isClient = useIsClient();
  const wished = isClient && wishedRaw;
  const addRecent = useRecentlyViewedStore((state) => state.add);
  const pushToast = useUiStore((state) => state.pushToast);
  const user = useAuthStore((state) => state.user);
  const [activeReviews, setActiveReviews] = useState<Review[]>(reviews);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const sizeStock = getSizeQty(product, size);
  const selectedColor = product.colors.find((item) => item.name === color);
  
  const totalReviewsCount = activeReviews.length > 0 ? activeReviews.length : (product.reviewCount || 0);
  const calculatedRating = activeReviews.length > 0
    ? Number((activeReviews.reduce((sum, r) => sum + r.rating, 0) / activeReviews.length).toFixed(1))
    : (product.rating || 0);
  const filledStars = Math.round(calculatedRating);
  const shareText = `Check out ${product.name} on Trenova`;

  const specEntries = useMemo(() => {
    const entries = Object.entries(product.specifications).slice(0, 3);
    return [...entries, ["SKU", product.sku] as const].slice(0, 4);
  }, [product.specifications, product.sku]);

  useEffect(() => {
    addRecent(product);
  }, [addRecent, product]);

  useEffect(() => {
    setActiveReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    getProductReviews(product.id).then((list) => {
      if (list.length > 0) {
        setActiveReviews(list);
      }
    });
  }, [product.id]);

  useEffect(() => {
    setQuantity((current) => Math.min(current, Math.max(1, sizeStock || 1)));
  }, [sizeStock]);

  useEffect(() => {
    if (!shareOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!shareRef.current?.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShareOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [shareOpen]);

  const getPageUrl = () => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  };

  const copyToClipboard = async (value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {
        // Fall through to legacy copy for non-secure origins (e.g. 0.0.0.0).
      }
    }

    try {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.top = "0";
      input.style.left = "0";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.focus();
      input.select();
      input.setSelectionRange(0, value.length);
      const copied = document.execCommand("copy");
      document.body.removeChild(input);
      return copied;
    } catch {
      return false;
    }
  };

  const openExternal = (href: string) => {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const addToCart = () => {
    if (sizeStock <= 0) {
      pushToast("Selected size is out of stock", "error");
      return false;
    }
    addItem({ product, size, color, quantity: Math.min(quantity, sizeStock) });
    pushToast("Added to cart");
    return true;
  };

  const copyLink = async () => {
    const url = getPageUrl();
    if (!url) {
      pushToast("Unable to copy link", "error");
      return;
    }
    const copied = await copyToClipboard(url);
    if (copied) {
      pushToast("Link copied", "success");
      setShareOpen(false);
      return;
    }
    pushToast("Unable to copy link", "error");
  };

  const shareToWhatsApp = () => {
    const url = getPageUrl();
    openExternal(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`,
    );
    setShareOpen(false);
  };

  const shareToFacebook = () => {
    const url = getPageUrl();
    openExternal(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );
    setShareOpen(false);
  };

  const shareToTwitter = () => {
    const url = getPageUrl();
    openExternal(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    );
    setShareOpen(false);
  };

  const shareToEmail = () => {
    const url = getPageUrl();
    openExternal(
      `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(`${shareText}\n${url}`)}`,
    );
    setShareOpen(false);
  };

  const nativeShare = async () => {
    const url = getPageUrl();
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: product.name,
          text: shareText,
          url,
        });
        setShareOpen(false);
        return;
      }
      await copyLink();
    } catch (error) {
      // Ignore user cancel; surface other failures.
      if (error instanceof DOMException && error.name === "AbortError") return;
      pushToast("Unable to share right now", "error");
    }
  };

  const toggleWishlist = () => {
    toggleWish(product);
    pushToast(wished ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  return (
    <DetailsRoot>
      <Layout>
        <Gallery>
          <ThumbColumn>
            {ANGLES.map((key, index) => (
              <Thumb
                key={key}
                type="button"
                $active={angle === key}
                aria-label={`Show ${key} image`}
                aria-pressed={angle === key}
                onMouseEnter={() => setAngleIndex(index)}
                onFocus={() => setAngleIndex(index)}
                onClick={() => setAngleIndex(index)}
              >
                <Image
                  src={product.images[key]}
                  alt={`${product.name} by Trenova — ${key} view`}
                  title={`${product.name} ${key} view`}
                  fill
                  sizes="80px"
                />
              </Thumb>
            ))}
          </ThumbColumn>

          <MainStage>
            <MainImage>
              <Image
                key={angle}
                src={product.images[angle]}
                alt={`${product.name} by Trenova — ${angle} view`}
                title={`${product.name} ${angle} view`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </MainImage>
          </MainStage>
        </Gallery>

        <InfoPanel>
          <TopMeta>
            <BadgeRow>
              {product.isNewArrival ? <Badge>New</Badge> : null}
              {product.isBestSeller ? (
                <Badge tone="dark">Best seller</Badge>
              ) : null}
              {discount ? <Badge tone="sale">-{discount}% off</Badge> : null}
            </BadgeRow>
            <UtilityRow>
              <UtilityButton
                type="button"
                data-active={wished}
                onClick={toggleWishlist}
              >
                <Heart size={14} fill={wished ? "currentColor" : "none"} />
                <span>{wished ? "Wishlisted" : "Add to Wishlist"}</span>
              </UtilityButton>
              <ShareWrap ref={shareRef}>
                <UtilityButton
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={shareOpen}
                  onClick={() => setShareOpen((open) => !open)}
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </UtilityButton>
                <ShareMenu $open={shareOpen} role="menu">
                  <ShareMenuItem
                    type="button"
                    role="menuitem"
                    onClick={shareToWhatsApp}
                  >
                    <MessageCircle size={15} aria-hidden />
                    WhatsApp
                  </ShareMenuItem>
                  <ShareMenuItem
                    type="button"
                    role="menuitem"
                    onClick={shareToFacebook}
                  >
                    <Globe size={15} aria-hidden />
                    Facebook
                  </ShareMenuItem>
                  <ShareMenuItem
                    type="button"
                    role="menuitem"
                    onClick={shareToTwitter}
                  >
                    <Link2 size={15} aria-hidden />
                    X / Twitter
                  </ShareMenuItem>
                  <ShareMenuItem
                    type="button"
                    role="menuitem"
                    onClick={shareToEmail}
                  >
                    <Mail size={15} aria-hidden />
                    Email
                  </ShareMenuItem>
                  <ShareMenuItem
                    type="button"
                    role="menuitem"
                    onClick={copyLink}
                  >
                    <Copy size={15} aria-hidden />
                    Copy link
                  </ShareMenuItem>
                  <ShareMenuItem
                    type="button"
                    role="menuitem"
                    onClick={nativeShare}
                  >
                    <MoreHorizontal size={15} aria-hidden />
                    More apps
                  </ShareMenuItem>
                </ShareMenu>
              </ShareWrap>
            </UtilityRow>
          </TopMeta>

          <div>
            <BrandLabel>{product.brand}</BrandLabel>
            <ProductTitle>{product.name}</ProductTitle>
          </div>

          <RatingLine aria-label={`Rated ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                fill={index < filledStars ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
            <span>
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </RatingLine>

          <div>
            <PriceBlock>
              <CurrentPrice>{formatCurrency(product.price)}</CurrentPrice>
              {product.compareAtPrice &&
              product.compareAtPrice > product.price ? (
                <ComparePrice>
                  {formatCurrency(product.compareAtPrice)}
                </ComparePrice>
              ) : null}
              {discount ? <DiscountTag>{discount}% OFF</DiscountTag> : null}
            </PriceBlock>
            <ShortCopy>{product.shortDescription}</ShortCopy>
          </div>

          <OptionBlock>
            <OptionLabel>
              <span>Color</span>
              <small>Selected: {selectedColor?.name ?? color}</small>
            </OptionLabel>
            <OptionRow>
              {product.colors.map((item) => {
                const active = color === item.name;
                return (
                  <ColorChip
                    key={item.name}
                    type="button"
                    $active={active}
                    aria-label={item.name}
                    aria-pressed={active}
                    onClick={() => setColor(item.name)}
                  >
                    <ColorDot $hex={item.hex} />
                    <span>{item.name}</span>
                    {active ? <Check size={14} strokeWidth={2.5} /> : null}
                  </ColorChip>
                );
              })}
            </OptionRow>
          </OptionBlock>

          <OptionBlock>
            <OptionLabel>
              <span>Size</span>
              <Link href="/size-guide">
                <Ruler size={14} aria-hidden />
                Size Guide
              </Link>
            </OptionLabel>
            <OptionRow>
              {product.sizes.map((item) => {
                const qty = getSizeQty(product, item);
                const disabled = qty <= 0;
                return (
                  <SizeChip
                    key={item}
                    type="button"
                    $active={size === item}
                    disabled={disabled}
                    title={disabled ? "Out of stock" : `${qty} in stock`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </SizeChip>
                );
              })}
            </OptionRow>
          </OptionBlock>

          <OptionBlock>
            <OptionLabel>
              <span>Quantity</span>
            </OptionLabel>
            <QtyRow>
              <QuantityStepper
                value={quantity}
                max={Math.max(1, sizeStock)}
                onChange={setQuantity}
              />
              <StockHint $danger={sizeStock <= 0}>
                {sizeStock > 0 ? (
                  <>
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                    {sizeStock} available in size {size}
                  </>
                ) : (
                  `Size ${size} is out of stock`
                )}
              </StockHint>
            </QtyRow>
          </OptionBlock>

          <Actions>
            <ActionButton
              type="button"
              $variant="dark"
              disabled={sizeStock <= 0}
              onClick={() => {
                addToCart();
              }}
            >
              <ShoppingBag size={16} aria-hidden />
              Add to Cart
            </ActionButton>
            <ActionButton
              type="button"
              $variant="gold"
              disabled={sizeStock <= 0}
              onClick={() => {
                if (addToCart()) router.push("/checkout");
              }}
            >
              Buy Now
            </ActionButton>
          </Actions>
        </InfoPanel>
      </Layout>

      <TrustBar>
        {TRUST.map(({ icon: Icon, title, copy }) => (
          <TrustItem key={title}>
            <Icon size={16} strokeWidth={1.75} aria-hidden />
            <div>
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          </TrustItem>
        ))}
      </TrustBar>

      <TabsSection>
        <TabList role="tablist" aria-label="Product information">
          {(
            [
              ["description", "Description"],
              ["details", "Details & Specs"],
              ["shipping", "Shipping & Returns"],
              ["reviews", `Reviews (${totalReviewsCount})`],
            ] as const
          ).map(([key, label]) => (
            <TabButton
              key={key}
              type="button"
              role="tab"
              $active={tab === key}
              aria-selected={tab === key}
              onClick={() => setTab(key)}
            >
              {label}
            </TabButton>
          ))}
        </TabList>

        {tab === "description" ? (
          <TabPanel role="tabpanel">
            <TabCopy>{product.description}</TabCopy>
            <SpecGrid>
              {specEntries.map(([key, value]) => (
                <SpecCard key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </SpecCard>
              ))}
            </SpecGrid>
          </TabPanel>
        ) : null}

        {tab === "details" ? (
          <TabPanel role="tabpanel">
            <SpecGrid>
              {Object.entries(product.specifications).map(([key, value]) => (
                <SpecCard key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </SpecCard>
              ))}
              <SpecCard>
                <dt>SKU</dt>
                <dd>{product.sku}</dd>
              </SpecCard>
              <SpecCard>
                <dt>Category</dt>
                <dd>{product.categorySlug.replace(/-/g, " ")}</dd>
              </SpecCard>
            </SpecGrid>
          </TabPanel>
        ) : null}

        {tab === "shipping" ? (
          <TabPanel role="tabpanel">
            <TabCopy>
              Free shipping on orders above ₹999. Standard delivery typically
              takes 3–7 business days depending on your location.               Easy returns
              are available within 7 days of delivery for unused items with
              original tags.
            </TabCopy>
          </TabPanel>
        ) : null}

        {tab === "reviews" ? (
          <TabPanel role="tabpanel">
            {activeReviews.length ? (
              <ReviewsGrid>
                {activeReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </ReviewsGrid>
            ) : (
              <TabCopy>No reviews yet. Be the first to leave one!</TabCopy>
            )}

            {user ? (
              <div style={{ marginTop: "2rem", borderTop: "1px solid #eee", paddingTop: "1.5rem" }}>
                <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Write a Review</p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmittingReview(true);
                    const result = await submitReview(product.id, reviewRating, reviewComment);
                    setSubmittingReview(false);
                    if (result.success) {
                      pushToast("Review submitted for approval!");
                      setReviewComment('');
                      setReviewRating(5);
                    } else {
                      pushToast(result.message || "Could not submit review", "error");
                    }
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "480px" }}
                >
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReviewRating(n)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                      >
                        <Star
                          size={24}
                          fill={n <= reviewRating ? "#C6A75E" : "none"}
                          color={n <= reviewRating ? "#C6A75E" : "#ccc"}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                    style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ddd", resize: "vertical", fontSize: "14px" }}
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    style={{ padding: "0.75rem 1.5rem", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: 600, alignSelf: "flex-start" }}
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            ) : (
              <p style={{ marginTop: "1.5rem", fontSize: "14px", color: "#666" }}>
                <a href="/login" style={{ color: "#C6A75E", fontWeight: 600 }}>Log in</a> to leave a review.
              </p>
            )}
          </TabPanel>
        ) : null}
      </TabsSection>

      {related.length ? (
        <section>
          <BlockTitle>You may also like</BlockTitle>
          <RelatedGrid>
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </RelatedGrid>
        </section>
      ) : null}
    </DetailsRoot>
  );
}
