"use client";

import { useState } from "react";
import type { Product, ProductSize } from "@/types/product";
import type { AdminProductInput } from "@/services/admin.service";
import {
  createAdminProduct,
  updateAdminProduct,
} from "@/services/admin.service";
import { AdminForm } from "@/features/admin/AdminForm";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import {
  CheckLabel,
  FieldHint,
  FlagGrid,
  FormSection,
  FormSectionTitle,
  SizeGrid,
} from "@/features/admin/AdminShared.styles";
import { Input } from "@/components/Input/Input";
import { TextArea } from "@/components/TextArea/TextArea";
import { Stack } from "@/components/Stack/Stack";
import { Grid } from "@/components/Grid/Grid";
import { useUiStore } from "@/hooks/stores/uiStore";

const ALL_SIZES: ProductSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "ONE SIZE",
  "FREE SIZE",
];

function parseColors(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [name, hex] = part.split(":").map((item) => item.trim());
      return {
        name: name || "Black",
        hex: hex || "#0A0A0A",
      };
    });
}

function colorsToString(product: Product | null) {
  if (!product?.colors?.length) return "Black:#0A0A0A";
  return product.colors.map((color) => `${color.name}:${color.hex}`).join(", ");
}

export function ProductForm({
  item,
  onClose,
  onSaved,
}: {
  item: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);
  const [sizes, setSizes] = useState<ProductSize[]>(
    item?.sizes?.length ? item.sizes : ["S", "M", "L", "XL"],
  );
  const [images, setImages] = useState({
    front: item?.images.front ?? "",
    left: item?.images.left ?? "",
    right: item?.images.right ?? "",
  });

  return (
    <AdminForm
      submitting={submitting}
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const retail = Number(data.get("compareAtPrice") ?? 0);
        const sale = Number(data.get("price") ?? 0);

        if (!images.front || !images.left || !images.right) {
          pushToast("Upload all three product images", "error");
          return;
        }
        if (!sizes.length) {
          pushToast("Select at least one size", "error");
          return;
        }

        const colors = parseColors(String(data.get("colors") ?? ""));
        if (!colors.length) {
          pushToast("Add at least one color", "error");
          return;
        }

        const payload: AdminProductInput = {
          name: String(data.get("name") ?? ""),
          sku: String(data.get("sku") ?? ""),
          brand: "Trenova",
          price: sale,
          compareAtPrice: retail > 0 ? retail : undefined,
          stock: Number(data.get("stock") ?? 0),
          categorySlug: String(data.get("categorySlug") ?? "men"),
          shortDescription: String(data.get("shortDescription") ?? ""),
          description: String(data.get("description") ?? ""),
          rating: Number(data.get("rating") ?? 0),
          reviewCount: Number(data.get("reviewCount") ?? 0),
          colors,
          sizes,
          images,
          isFeatured: data.get("isFeatured") === "on",
          isBestSeller: data.get("isBestSeller") === "on",
          isNewArrival: data.get("isNewArrival") === "on",
          isTrending: data.get("isTrending") === "on",
          isOnSale: data.get("isOnSale") === "on" || (retail > sale && sale > 0),
        };

        setSubmitting(true);
        try {
          if (item) {
            await updateAdminProduct(item.id, payload);
            pushToast("Product updated — homepage cards refreshed");
          } else {
            await createAdminProduct(payload);
            pushToast("Product created");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Save failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Stack gap={4}>
        <FormSection>
          <FormSectionTitle>Homepage placement</FormSectionTitle>
          <FieldHint>
            Tick Featured or Best Seller to show this product on the matching
            homepage rail.
          </FieldHint>
          <FlagGrid>
            <CheckLabel>
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={item?.isFeatured}
              />
              Featured Collection
            </CheckLabel>
            <CheckLabel>
              <input
                type="checkbox"
                name="isBestSeller"
                defaultChecked={item?.isBestSeller}
              />
              Best Seller
            </CheckLabel>
            <CheckLabel>
              <input
                type="checkbox"
                name="isNewArrival"
                defaultChecked={item?.isNewArrival ?? !item}
              />
              New Arrival
            </CheckLabel>
            <CheckLabel>
              <input
                type="checkbox"
                name="isTrending"
                defaultChecked={item?.isTrending}
              />
              Trending
            </CheckLabel>
            <CheckLabel>
              <input
                type="checkbox"
                name="isOnSale"
                defaultChecked={item?.isOnSale}
              />
              On Sale
            </CheckLabel>
          </FlagGrid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>Basics</FormSectionTitle>
          <Grid
            gridTemplateColumns={["1fr", null, "1fr 1fr"]}
            style={{ gap: "1rem" }}
          >
            <Input name="name" label="Product name" defaultValue={item?.name} required />
            <Input name="sku" label="SKU" defaultValue={item?.sku} required />
            <Input
              name="categorySlug"
              label="Category slug"
              defaultValue={item?.categorySlug ?? "men"}
              hint="e.g. men-hoodies, women-tees"
              required
            />
            <Input
              name="stock"
              label="Quantity / stock"
              type="number"
              min={0}
              defaultValue={item?.stock ?? 0}
              required
            />
          </Grid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>Pricing</FormSectionTitle>
          <FieldHint>
            Retail price is the original (struck-through) price. Sale price is
            what customers pay.
          </FieldHint>
          <Grid
            gridTemplateColumns={["1fr", null, "1fr 1fr"]}
            style={{ gap: "1rem" }}
          >
            <Input
              name="compareAtPrice"
              label="Retail price"
              type="number"
              min={0}
              defaultValue={item?.compareAtPrice ?? item?.price}
            />
            <Input
              name="price"
              label="Sale / discount price"
              type="number"
              min={0}
              defaultValue={item?.price ?? 999}
              required
            />
          </Grid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>Images (drag & drop)</FormSectionTitle>
          <Grid
            gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]}
            style={{ gap: "1rem" }}
          >
            <ImageDropzone
              label="Front image"
              value={images.front}
              onChange={(front) => setImages((current) => ({ ...current, front }))}
            />
            <ImageDropzone
              label="Left image"
              value={images.left}
              onChange={(left) => setImages((current) => ({ ...current, left }))}
            />
            <ImageDropzone
              label="Right image"
              value={images.right}
              onChange={(right) => setImages((current) => ({ ...current, right }))}
            />
          </Grid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>Sizes</FormSectionTitle>
          <SizeGrid>
            {ALL_SIZES.map((size) => (
              <CheckLabel key={size}>
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={(event) => {
                    setSizes((current) =>
                      event.target.checked
                        ? [...current, size]
                        : current.filter((value) => value !== size),
                    );
                  }}
                />
                {size}
              </CheckLabel>
            ))}
          </SizeGrid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>Colors</FormSectionTitle>
          <Input
            name="colors"
            label="Colors"
            defaultValue={colorsToString(item)}
            hint="Format: Name:#hex, Name:#hex"
            required
          />
        </FormSection>

        <FormSection>
          <FormSectionTitle>Descriptions</FormSectionTitle>
          <TextArea
            name="shortDescription"
            label="Short description"
            defaultValue={item?.shortDescription}
            rows={2}
            required
          />
          <TextArea
            name="description"
            label="Full description"
            defaultValue={item?.description}
            rows={4}
            required
          />
        </FormSection>

        <FormSection>
          <FormSectionTitle>Reviews summary</FormSectionTitle>
          <Grid
            gridTemplateColumns={["1fr", null, "1fr 1fr"]}
            style={{ gap: "1rem" }}
          >
            <Input
              name="rating"
              label="Average rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              defaultValue={item?.rating ?? 0}
            />
            <Input
              name="reviewCount"
              label="Review count"
              type="number"
              min={0}
              defaultValue={item?.reviewCount ?? 0}
            />
          </Grid>
        </FormSection>
      </Stack>
    </AdminForm>
  );
}
