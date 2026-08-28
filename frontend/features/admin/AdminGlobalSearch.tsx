"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  ClearButton,
  ResultGroup,
  ResultGroupTitle,
  ResultItem,
  ResultsEmpty,
  ResultsLoading,
  ResultsPanel,
  SearchInputShell,
  SearchWrap,
} from "@/features/admin/AdminGlobalSearch.styles";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";
import {
  getAdminCoupons,
  getAdminInventory,
  getAdminOrders,
  getAdminProducts,
  getAdminTeam,
  getAdminUsers,
} from "@/services/admin.service";

type SearchHit = {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  href: string;
};

function matches(query: string, ...parts: Array<string | number | undefined | null>) {
  const haystack = parts
    .filter((part) => part !== undefined && part !== null)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

async function runUniversalSearch(rawQuery: string): Promise<SearchHit[]> {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 1) return [];

  const [products, users, orders, inventory, coupons, team] = await Promise.all([
    getAdminProducts(),
    getAdminUsers(),
    getAdminOrders(),
    getAdminInventory(),
    getAdminCoupons(),
    getAdminTeam(),
  ]);

  const hits: SearchHit[] = [];

  for (const product of products) {
    if (
      !matches(
        query,
        product.name,
        product.sku,
        product.slug,
        product.categorySlug,
        ...(product.sizes ?? []),
      )
    ) {
      continue;
    }
    hits.push({
      id: `product-${product.id}`,
      group: "Products",
      title: product.name,
      subtitle: `${product.sku} · ${product.categorySlug}`,
      href: "/admin/products",
    });
  }

  for (const user of users) {
    if (!matches(query, user.name, user.email, user.phone, user.location)) continue;
    hits.push({
      id: `user-${user.id}`,
      group: "Users",
      title: user.name,
      subtitle: user.email,
      href: "/admin/users",
    });
  }

  for (const order of orders) {
    if (
      !matches(
        query,
        order.orderNumber,
        order.status,
        order.shippingAddress?.fullName,
        order.shippingAddress?.phone,
      )
    ) {
      continue;
    }
    hits.push({
      id: `order-${order.id}`,
      group: "Orders",
      title: order.orderNumber,
      subtitle: `${order.shippingAddress?.fullName ?? "Customer"} · ${order.status}`,
      href: "/admin/orders",
    });
  }

  for (const row of inventory) {
    if (!matches(query, row.name, row.sku, row.status, row.sizeSummary)) continue;
    hits.push({
      id: `inventory-${row.id}`,
      group: "Inventory",
      title: row.name,
      subtitle: `${row.sku} · ${row.sizeSummary}`,
      href: "/admin/inventory",
    });
  }

  for (const coupon of coupons) {
    if (!matches(query, coupon.code, coupon.description, coupon.type)) continue;
    hits.push({
      id: `coupon-${coupon.code}`,
      group: "Coupons",
      title: coupon.code,
      subtitle: coupon.description || "",
      href: "/admin/coupons",
    });
  }

  for (const member of team) {
    if (!matches(query, member.name, member.email, member.role, member.status)) {
      continue;
    }
    hits.push({
      id: `team-${member.id}`,
      group: "Team",
      title: member.name,
      subtitle: `${member.email} · ${member.role}`,
      href: "/admin/team",
    });
  }

  return hits.slice(0, 24);
}

export function AdminGlobalSearch() {
  const router = useRouter();
  const query = useAdminUiStore((state) => state.globalSearchQuery);
  const setQuery = useAdminUiStore((state) => state.setGlobalSearchQuery);
  const clearQuery = useAdminUiStore((state) => state.clearGlobalSearch);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setHits([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(() => {
      void runUniversalSearch(q)
        .then((next) => {
          if (cancelled) return;
          setHits(next);
        })
        .catch(() => {
          if (cancelled) return;
          setHits([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchHit[]>();
    for (const hit of hits) {
      const list = map.get(hit.group) ?? [];
      list.push(hit);
      map.set(hit.group, list);
    }
    return Array.from(map.entries());
  }, [hits]);

  const showPanel = open && query.trim().length > 0;

  return (
    <SearchWrap ref={wrapRef}>
      <SearchInputShell>
        <Search size={16} aria-hidden />
        <input
          type="text"
          value={query}
          placeholder="Search products, orders, users…"
          aria-label="Search admin"
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
        />
        {query ? (
          <ClearButton
            type="button"
            onClick={() => {
              clearQuery();
              setHits([]);
              setOpen(false);
            }}
          >
            <X size={14} aria-hidden />
          </ClearButton>
        ) : null}
      </SearchInputShell>

      {showPanel ? (
        <ResultsPanel role="listbox" aria-label="Search results">
          {loading ? <ResultsLoading>Searching…</ResultsLoading> : null}
          {!loading && hits.length === 0 ? (
            <ResultsEmpty>No matches for “{query.trim()}”</ResultsEmpty>
          ) : null}
          {!loading
            ? grouped.map(([group, items]) => (
                <ResultGroup key={group}>
                  <ResultGroupTitle>{group}</ResultGroupTitle>
                  {items.map((item) => (
                    <ResultItem
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        router.push(item.href);
                      }}
                    >
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </ResultItem>
                  ))}
                </ResultGroup>
              ))
            : null}
        </ResultsPanel>
      ) : null}
    </SearchWrap>
  );
}
