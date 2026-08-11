"use client";

import { useCallback, useState } from "react";
import styled from "styled-components";
import type { InventoryRow } from "@/types/admin";
import type { ProductSize, SizeStock } from "@/types/product";
import {
  getAdminInventory,
  deleteAdminProduct,
  deleteAdminProducts,
  updateAdminInventory,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { useUiStore } from "@/hooks/stores/uiStore";
import { sumSizeStock } from "@/utils/inventory";

const SIZE_ORDER: ProductSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "ONE SIZE",
  "FREE SIZE",
];

const SIZE_LABELS: Record<ProductSize, string> = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  "ONE SIZE": "ONE",
  "FREE SIZE": "FREE",
};

const MetaCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.25rem;
`;

const MetaTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const MetaSku = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: 0.06em;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
`;

const TotalBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray300};

  strong {
    color: ${({ theme }) => theme.colors.gold};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
  }
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const SizeCell = styled.label`
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid rgba(198, 167, 94, 0.35);
  background: ${({ theme }) => theme.colors.white};
  min-width: 0;

  input {
    min-height: 38px !important;
    font-size: 0.9375rem !important;
    font-weight: 700;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.body} !important;
    /* Hide native number spinners */
    appearance: textfield;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const SizeName = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const Hint = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

function orderedSizes(sizes: string[]): ProductSize[] {
  const set = new Set(sizes);
  return SIZE_ORDER.filter((size) => set.has(size));
}

function InventoryForm({
  item,
  onClose,
  onSaved,
}: {
  item: InventoryRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);
  const sizes = item ? orderedSizes(item.sizes) : [];
  const [sizeStock, setSizeStock] = useState<SizeStock>(() => {
    if (!item) return {};
    return Object.fromEntries(
      sizes.map((size) => [size, Math.max(0, Number(item.sizeStock[size] ?? 0))]),
    ) as SizeStock;
  });

  const setQty = useCallback((size: ProductSize, qty: number) => {
    setSizeStock((current) => ({
      ...current,
      [size]: Math.max(0, Math.floor(qty)),
    }));
  }, []);

  if (!item) return null;

  const total = sumSizeStock(sizeStock);

  return (
    <AdminForm
      submitting={submitting}
      submitLabel="Update stock"
      onCancel={onClose}
      onSubmit={async () => {
        setSubmitting(true);
        try {
          const payload = Object.fromEntries(
            sizes.map((size) => [size, Math.max(0, Number(sizeStock[size] ?? 0))]),
          ) as SizeStock;
          await updateAdminInventory(item.id, payload);
          pushToast("Size inventory updated");
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Update failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <MetaCard>
        <div>
          <MetaTitle>{item.name}</MetaTitle>
          <MetaSku>{item.sku}</MetaSku>
        </div>
        <MetaRow>
          <TotalBadge>
            Total units <strong>{total}</strong>
          </TotalBadge>
          <StatusPill $tone={toneFor(item.status)}>{item.status}</StatusPill>
        </MetaRow>
      </MetaCard>

      <Hint>Adjust quantity per size. Changes apply to the live catalog stock.</Hint>

      {sizes.length ? (
        <SizeGrid>
          {sizes.map((size) => (
            <SizeCell key={size}>
              <SizeName title={size}>{SIZE_LABELS[size]}</SizeName>
              <Input
                aria-label={`${size} quantity`}
                type="number"
                min={0}
                inputMode="numeric"
                value={sizeStock[size] ?? 0}
                onChange={(event) => {
                  const next = Math.max(0, Number(event.target.value) || 0);
                  setQty(size, next);
                }}
              />
            </SizeCell>
          ))}
        </SizeGrid>
      ) : (
        <Text color="gray500">
          This product has no sizes. Add sizes from the Products form first.
        </Text>
      )}
    </AdminForm>
  );
}

function toneFor(status: InventoryRow["status"]) {
  if (status === "In Stock") return "success" as const;
  if (status === "Low") return "warning" as const;
  return "danger" as const;
}

export default function AdminInventoryPage() {
  const load = useCallback(() => getAdminInventory(), []);

  return (
    <AdminPage<InventoryRow>
      title="Inventory"
      description="Adjust size-wise stock levels across SKUs. Use the ··· menu in Actions for select and bulk delete."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) =>
        `${row.name} ${row.sku} ${row.status} ${row.sizeSummary}`
      }
      formTitle={() => "Adjust size stock"}
      formSize="md"
      onDelete={(item) => deleteAdminProduct(item.id)}
      deleteMessage={(item) =>
        `Delete “${item.name}” from inventory? This also removes the product.`
      }
      onBulkDelete={(items) =>
        deleteAdminProducts(items.map((item) => item.id))
      }
      bulkDeleteMessage={(count, mode) =>
        mode === "all"
          ? `Delete all ${count} inventory item(s)? This also removes the products.`
          : `Delete ${count} selected inventory item(s)? This also removes the products.`
      }
      renderForm={(props) =>
        props.item ? (
          <InventoryForm key={props.item.id} {...props} />
        ) : null
      }
      columns={[
        { key: "name", header: "Product", render: (row) => row.name },
        { key: "sku", header: "SKU", render: (row) => row.sku },
        {
          key: "sizes",
          header: "Size stock",
          render: (row) => row.sizeSummary,
        },
        { key: "stock", header: "Total", render: (row) => row.stock },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={toneFor(row.status)}>{row.status}</StatusPill>
          ),
        },
      ]}
    />
  );
}
