"use client";

import { useCallback } from "react";
import type { Product } from "@/types/product";
import { deleteAdminProduct, getAdminProducts } from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { ProductForm } from "@/features/admin/ProductForm";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatCurrency } from "@/utils/format";

export default function AdminProductsPage() {
  const load = useCallback(() => getAdminProducts(), []);

  return (
    <AdminPage<Product>
      title="Products"
      description="Manage catalog details, homepage rails (Featured / Best Seller), images, sizes, colors, and pricing."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) =>
        `${row.name} ${row.sku} ${row.categorySlug}`
      }
      createLabel="Add product"
      formTitle={(item) => (item ? "Edit product" : "Add product")}
      renderForm={(props) => <ProductForm {...props} />}
      onDelete={(item) => deleteAdminProduct(item.id)}
      deleteMessage={(item) => `Delete “${item.name}”? This cannot be undone.`}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        {
          key: "price",
          header: "Price",
          render: (row) => (
            <span>
              {formatCurrency(row.price)}
              {row.compareAtPrice && row.compareAtPrice > row.price ? (
                <span style={{ color: "#6B6B6B", marginLeft: 6 }}>
                  <s>{formatCurrency(row.compareAtPrice)}</s>
                </span>
              ) : null}
            </span>
          ),
        },
        { key: "stock", header: "Qty", render: (row) => row.stock },
        {
          key: "placement",
          header: "Homepage",
          render: (row) => (
            <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
              {row.isFeatured ? (
                <StatusPill $tone="success">Featured</StatusPill>
              ) : null}
              {row.isBestSeller ? (
                <StatusPill $tone="warning">Best seller</StatusPill>
              ) : null}
              {row.isNewArrival ? <StatusPill>New</StatusPill> : null}
              {!row.isFeatured && !row.isBestSeller && !row.isNewArrival
                ? "—"
                : null}
            </span>
          ),
        },
        {
          key: "category",
          header: "Category",
          render: (row) => row.categorySlug,
        },
      ]}
    />
  );
}
