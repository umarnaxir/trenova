"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { Product } from "@/types/product";
import { searchProducts } from "@/services/product.service";
import { useIsClient } from "@/hooks/useIsClient";
import { Text } from "@/components/Text/Text";
import {
  CloseButton,
  EmptyHint,
  QuickChip,
  QuickChipsWrap,
  QuickSuggestionsLabel,
  QuickSuggestionsSection,
  ResultBadge,
  ResultBadgesWrap,
  ResultCategory,
  ResultImage,
  ResultItem,
  ResultLink,
  ResultMeta,
  ResultName,
  ResultPrice,
  ResultsList,
  ResultsWrap,
  SearchHeader,
  SearchInputWrap,
  SearchOverlay,
  SearchPanel,
  ViewAllLink,
} from "@/components/SearchBar/SearchBar.styles";

type SearchBarProps = {
  open: boolean;
  onClose: () => void;
};

const QUICK_SUGGESTIONS = [
  { label: "Best Sellers", icon: "🔥", query: "Best Sellers" },
  { label: "Featured", icon: "✨", query: "Featured" },
  { label: "New Arrivals", icon: "🆕", query: "New Arrivals" },
  { label: "On Sale", icon: "🏷️", query: "Sale" },
  { label: "Hoodies", query: "Hoodie" },
  { label: "Tees", query: "Tee" },
];

export function SearchBar({ open, onClose }: SearchBarProps) {
  const isClient = useIsClient();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuery("");
        setResults([]);
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const value = query.trim();

    const timer = window.setTimeout(() => {
      if (!value) {
        setResults([]);
        return;
      }

      startTransition(() => {
        void searchProducts(value).then((items) => {
          setResults(items.slice(0, 8));
        });
      });
    }, value ? 180 : 0);

    return () => window.clearTimeout(timer);
  }, [query, open]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const goToSearchPage = (customQuery?: string) => {
    const value = (customQuery ?? query).trim();
    if (!value) return;
    handleClose();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const goToProduct = (slug: string) => {
    handleClose();
    router.push(`/product/${slug}`);
  };

  const handleQuickSuggestionClick = (chipQuery: string) => {
    setQuery(chipQuery);
  };

  if (!isClient || !open) return null;

  const trimmed = query.trim();

  return createPortal(
    <SearchOverlay onClick={handleClose}>
      <SearchPanel onClick={(event) => event.stopPropagation()}>
        <CloseButton
          type="button"
          aria-label="Close search"
          onClick={handleClose}
        >
          <X size={18} />
        </CloseButton>
        <SearchHeader>
          <Text as="h2" variant="h3" pr={8}>
            Search Trenova
          </Text>
        </SearchHeader>

        <SearchInputWrap>
          <Search size={18} aria-hidden />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                goToSearchPage();
              }
            }}
            placeholder="Try hoodie, best sellers, featured..."
            autoFocus
            autoComplete="off"
            aria-label="Search products"
          />
        </SearchInputWrap>

        <ResultsWrap>
          <QuickSuggestionsSection>
            <QuickSuggestionsLabel>Popular Searches</QuickSuggestionsLabel>
            <QuickChipsWrap>
              {QUICK_SUGGESTIONS.map((item) => {
                const isActive =
                  trimmed.toLowerCase() === item.query.toLowerCase();
                return (
                  <QuickChip
                    key={item.label}
                    type="button"
                    $active={isActive}
                    onClick={() => handleQuickSuggestionClick(item.query)}
                  >
                    {item.icon ? <span>{item.icon}</span> : null}
                    <span>{item.label}</span>
                  </QuickChip>
                );
              })}
            </QuickChipsWrap>
          </QuickSuggestionsSection>

          {!trimmed ? (
            <EmptyHint>
              Start typing or select a popular category above.
            </EmptyHint>
          ) : null}

          {trimmed && !isPending && results.length === 0 ? (
            <EmptyHint>No matches for “{trimmed}”. Try another keyword.</EmptyHint>
          ) : null}

          {trimmed && results.length > 0 ? (
            <>
              <ResultsList>
                {results.map((product) => {
                  const isBestSeller =
                    product.isBestSeller ||
                    product.tags?.includes("best-seller");
                  const isFeatured =
                    product.isFeatured || product.tags?.includes("featured");
                  const isNew =
                    product.isNewArrival ||
                    product.tags?.includes("new-arrival");
                  const isOnSale =
                    product.isOnSale || product.tags?.includes("sale");

                  return (
                    <ResultItem key={product.id}>
                      <ResultLink
                        href={`/product/${product.slug}`}
                        onClick={(event) => {
                          event.preventDefault();
                          goToProduct(product.slug);
                        }}
                      >
                        <ResultImage>
                          <Image
                            src={product.images.front}
                            alt={product.name}
                            fill
                            sizes="56px"
                          />
                        </ResultImage>
                        <ResultMeta>
                          <ResultName>{product.name}</ResultName>
                          <ResultCategory>
                            {product.categorySlug.replace(/-/g, " ")}
                          </ResultCategory>
                          {(isBestSeller || isFeatured || isNew || isOnSale) && (
                            <ResultBadgesWrap>
                              {isBestSeller && (
                                <ResultBadge $variant="bestseller">
                                  Best Seller
                                </ResultBadge>
                              )}
                              {isFeatured && (
                                <ResultBadge $variant="featured">
                                  Featured
                                </ResultBadge>
                              )}
                              {isNew && (
                                <ResultBadge $variant="new">New</ResultBadge>
                              )}
                              {isOnSale && (
                                <ResultBadge $variant="sale">Sale</ResultBadge>
                              )}
                            </ResultBadgesWrap>
                          )}
                        </ResultMeta>
                        <ResultPrice>
                          ₹{product.price.toLocaleString("en-IN")}
                        </ResultPrice>
                      </ResultLink>
                    </ResultItem>
                  );
                })}
              </ResultsList>
              <ViewAllLink type="button" onClick={() => goToSearchPage()}>
                View all results
              </ViewAllLink>
            </>
          ) : null}
        </ResultsWrap>
      </SearchPanel>
    </SearchOverlay>,
    document.body,
  );
}
