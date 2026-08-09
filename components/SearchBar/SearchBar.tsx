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

  const goToSearchPage = () => {
    const value = query.trim();
    if (!value) return;
    handleClose();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const goToProduct = (slug: string) => {
    handleClose();
    router.push(`/product/${slug}`);
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
            placeholder="Try hoodie, tee, jacket..."
            autoFocus
            autoComplete="off"
            aria-label="Search products"
          />
        </SearchInputWrap>

        <ResultsWrap>
          {!trimmed ? (
            <EmptyHint>Start typing to see matching products.</EmptyHint>
          ) : null}

          {trimmed && !isPending && results.length === 0 ? (
            <EmptyHint>No matches for “{trimmed}”. Try another keyword.</EmptyHint>
          ) : null}

          {trimmed && results.length > 0 ? (
            <>
              <ResultsList>
                {results.map((product) => (
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
                      </ResultMeta>
                      <ResultPrice>
                        ₹{product.price.toLocaleString("en-IN")}
                      </ResultPrice>
                    </ResultLink>
                  </ResultItem>
                ))}
              </ResultsList>
              <ViewAllLink type="button" onClick={goToSearchPage}>
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
