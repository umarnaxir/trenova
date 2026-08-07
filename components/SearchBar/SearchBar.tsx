"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  CloseButton,
  SearchFormRow,
  SearchHeader,
  SearchOverlay,
  SearchPanel,
} from "@/components/SearchBar/SearchBar.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useIsClient } from "@/hooks/useIsClient";

type SearchBarProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchBar({ open, onClose }: SearchBarProps) {
  const isClient = useIsClient();
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuery("");
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

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  if (!isClient || !open) return null;

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
            Search TRENOvA
          </Text>
        </SearchHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const value = query.trim();
            if (!value) return;
            setQuery("");
            onClose();
            router.push(`/search?q=${encodeURIComponent(value)}`);
          }}
        >
          <SearchFormRow>
            <Input
              label="Search products"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try hoodie, tee, jacket..."
              autoFocus
            />
            <Button type="submit" aria-label="Search">
              <Search size={16} />
              Search
            </Button>
          </SearchFormRow>
        </form>
      </SearchPanel>
    </SearchOverlay>,
    document.body,
  );
}
