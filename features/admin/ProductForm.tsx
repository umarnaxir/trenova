"use client";

import { useState } from "react";
import type { Product, ProductColor, ProductSize, SizeStock } from "@/types/product";
import type { AdminProductInput } from "@/services/admin.service";
import {
  createAdminProduct,
  updateAdminProduct,
} from "@/services/admin.service";
import { AdminForm } from "@/features/admin/AdminForm";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import {
  ColorList,
  ColorPickerWrap,
  ColorRow,
  ColorSwatch,
  CompactGrid,
  CompactHint,
  CompactSection,
  CompactTitle,
  FlagRow,
  HiddenColorInput,
  ImageGrid,
  InlineActions,
  ProductFormRoot,
  SizeQtyCell,
  SizeQtyGrid,
  SizeToggle,
  SizeToggleRow,
  SplitRow,
  TinyCheck,
} from "@/features/admin/ProductForm.styles";
import { Input } from "@/components/Input/Input";
import { TextArea } from "@/components/TextArea/TextArea";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { useUiStore } from "@/hooks/stores/uiStore";
import { buildSizeStock, sumSizeStock } from "@/utils/inventory";
import {
  hexFromColorName,
  toColorInputValue,
} from "@/utils/colorNames";
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

function initialSizeStock(item: Product | null, sizes: ProductSize[]): SizeStock {
  return buildSizeStock(sizes, item?.sizeStock, item?.stock ?? 0);
}

function initialColors(item: Product | null): ProductColor[] {
  if (item?.colors?.length) return item.colors.map((color) => ({ ...color }));
  return [{ name: "Black", hex: "#0A0A0A" }];
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
  const [sizeStock, setSizeStock] = useState<SizeStock>(() =>
    initialSizeStock(item, item?.sizes?.length ? item.sizes : ["S", "M", "L", "XL"]),
  );
  const [images, setImages] = useState({
    front: item?.images.front ?? "",
    left: item?.images.left ?? "",
    right: item?.images.right ?? "",
  });
  const [colors, setColors] = useState<ProductColor[]>(() => initialColors(item));

  const orderedSizes = ALL_SIZES.filter((size) => sizes.includes(size));
  const totalUnits = sumSizeStock(sizeStock);

  const toggleSize = (size: ProductSize) => {
    const checked = !sizes.includes(size);
    setSizes((current) => {
      const next = checked
        ? [...current, size]
        : current.filter((value) => value !== size);
      setSizeStock((stock) => {
        if (checked) {
          return { ...stock, [size]: stock[size] ?? 0 };
        }
        const rest = { ...stock };
        delete rest[size];
        return rest;
      });
      return next;
    });
  };

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

        const cleanedColors = colors
          .map((color) => ({
            name: color.name.trim() || "Color",
            hex: color.hex.trim() || "#0A0A0A",
          }))
          .filter((color) => color.name);
        if (!cleanedColors.length) {
          pushToast("Add at least one color", "error");
          return;
        }

        const nextSizeStock = buildSizeStock(sizes, sizeStock, 0);

        const payload: AdminProductInput = {
          name: String(data.get("name") ?? ""),
          sku: String(data.get("sku") ?? ""),
          brand: "Trenova",
          price: sale,
          compareAtPrice: retail > 0 ? retail : undefined,
          stock: sumSizeStock(nextSizeStock),
          sizeStock: nextSizeStock,
          categorySlug: String(data.get("categorySlug") ?? "men"),
          shortDescription: String(data.get("shortDescription") ?? ""),
          description: String(data.get("description") ?? ""),
          rating: Number(data.get("rating") ?? 0),
          reviewCount: Number(data.get("reviewCount") ?? 0),
          colors: cleanedColors,
          sizes: orderedSizes,
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
      <ProductFormRoot>
        <CompactSection>
          <CompactTitle>Homepage placement</CompactTitle>
          <CompactHint>
            Tick Featured or Best Seller to show this product on the matching
            homepage rail.
          </CompactHint>
          <FlagRow>
            <TinyCheck>
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={item?.isFeatured}
              />
              Featured
            </TinyCheck>
            <TinyCheck>
              <input
                type="checkbox"
                name="isBestSeller"
                defaultChecked={item?.isBestSeller}
              />
              Best Seller
            </TinyCheck>
            <TinyCheck>
              <input
                type="checkbox"
                name="isNewArrival"
                defaultChecked={item?.isNewArrival ?? !item}
              />
              New
            </TinyCheck>
            <TinyCheck>
              <input
                type="checkbox"
                name="isTrending"
                defaultChecked={item?.isTrending}
              />
              Trending
            </TinyCheck>
            <TinyCheck>
              <input
                type="checkbox"
                name="isOnSale"
                defaultChecked={item?.isOnSale}
              />
              Sale
            </TinyCheck>
          </FlagRow>
        </CompactSection>

        <CompactSection>
          <CompactTitle>Basics</CompactTitle>
          <CompactGrid $cols={3}>
            <Input name="name" label="Product name" defaultValue={item?.name} required />
            <Input name="sku" label="SKU" defaultValue={item?.sku} required />
            <Input
              name="categorySlug"
              label="Category slug"
              defaultValue={item?.categorySlug ?? "men"}
              hint="e.g. men-hoodies"
              required
            />
          </CompactGrid>
        </CompactSection>

        <CompactSection>
          <CompactTitle>Pricing</CompactTitle>
          <CompactHint>
            Retail = struck-through price. Sale = what customers pay.
          </CompactHint>
          <CompactGrid $cols={2}>
            <Input
              name="compareAtPrice"
              label="Retail price"
              type="number"
              min={0}
              defaultValue={item?.compareAtPrice ?? item?.price}
            />
            <Input
              name="price"
              label="Sale price"
              type="number"
              min={0}
              defaultValue={item?.price ?? 999}
              required
            />
          </CompactGrid>
        </CompactSection>

        <CompactSection>
          <CompactTitle>Images</CompactTitle>
          <ImageGrid>
            <ImageDropzone
              compact
              label="Front"
              value={images.front}
              onChange={(front) => setImages((current) => ({ ...current, front }))}
            />
            <ImageDropzone
              compact
              label="Left"
              value={images.left}
              onChange={(left) => setImages((current) => ({ ...current, left }))}
            />
            <ImageDropzone
              compact
              label="Right"
              value={images.right}
              onChange={(right) => setImages((current) => ({ ...current, right }))}
            />
          </ImageGrid>
        </CompactSection>

        <SplitRow>
          <CompactSection>
            <CompactTitle>Sizes & quantity</CompactTitle>
            <CompactHint>
              Tap sizes to enable, then set stock. Total:{" "}
              <strong>{totalUnits}</strong>
            </CompactHint>
            <SizeToggleRow>
              {ALL_SIZES.map((size) => (
                <SizeToggle
                  key={size}
                  type="button"
                  title={size}
                  $active={sizes.includes(size)}
                  onClick={() => toggleSize(size)}
                >
                  {SIZE_LABELS[size]}
                </SizeToggle>
              ))}
            </SizeToggleRow>

            {orderedSizes.length ? (
              <SizeQtyGrid>
                {orderedSizes.map((size) => (
                  <SizeQtyCell key={size}>
                    <span title={size}>{SIZE_LABELS[size]}</span>
                    <Input
                      aria-label={`${size} quantity`}
                      type="number"
                      min={0}
                      value={sizeStock[size] ?? 0}
                      onChange={(event) => {
                        const qty = Math.max(0, Number(event.target.value) || 0);
                        setSizeStock((current) => ({ ...current, [size]: qty }));
                      }}
                    />
                  </SizeQtyCell>
                ))}
              </SizeQtyGrid>
            ) : (
              <Text variant="small" color="gray500">
                Select at least one size.
              </Text>
            )}
          </CompactSection>

          <CompactSection>
            <CompactTitle>Colors</CompactTitle>
            <CompactHint>
              Type a name (e.g. green) or click the circle to pick a color —
              hex fills automatically.
            </CompactHint>
            <ColorList>
              {colors.map((color, index) => {
                const swatchHex = toColorInputValue(color.hex);
                return (
                  <ColorRow key={`color-${index}`}>
                    <Input
                      aria-label="Color name"
                      placeholder="e.g. Green"
                      value={color.name}
                      onChange={(event) => {
                        const name = event.target.value;
                        const fromName = hexFromColorName(name);
                        setColors((current) =>
                          current.map((entry, i) =>
                            i === index
                              ? {
                                  ...entry,
                                  name,
                                  ...(fromName ? { hex: fromName } : {}),
                                }
                              : entry,
                          ),
                        );
                      }}
                      required
                    />
                    <Input
                      aria-label="Hex"
                      placeholder="#0A0A0A"
                      value={color.hex}
                      onChange={(event) => {
                        const hex = event.target.value;
                        setColors((current) =>
                          current.map((entry, i) =>
                            i === index ? { ...entry, hex } : entry,
                          ),
                        );
                      }}
                      required
                    />
                    <ColorPickerWrap title="Pick a color">
                      <ColorSwatch $hex={swatchHex} />
                      <HiddenColorInput
                        type="color"
                        value={swatchHex}
                        aria-label={`Pick color for ${color.name || "swatch"}`}
                        onChange={(event) => {
                          const hex = event.target.value.toUpperCase();
                          setColors((current) =>
                            current.map((entry, i) =>
                              i === index
                                ? {
                                    ...entry,
                                    hex,
                                    name: entry.name.trim()
                                      ? entry.name
                                      : "Custom",
                                  }
                                : entry,
                            ),
                          );
                        }}
                      />
                    </ColorPickerWrap>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      disabled={colors.length <= 1}
                      onClick={() =>
                        setColors((current) =>
                          current.filter((_, i) => i !== index),
                        )
                      }
                    >
                      ×
                    </Button>
                  </ColorRow>
                );
              })}
            </ColorList>
            <InlineActions>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() =>
                  setColors((current) => [
                    ...current,
                    { name: "", hex: "#C6A75E" },
                  ])
                }
              >
                + Add color
              </Button>
            </InlineActions>
          </CompactSection>
        </SplitRow>

        <CompactSection>
          <CompactTitle>Descriptions & reviews</CompactTitle>
          <CompactGrid $cols={1}>
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
              rows={3}
              required
            />
          </CompactGrid>
          <CompactGrid $cols={2}>
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
          </CompactGrid>
        </CompactSection>
      </ProductFormRoot>
    </AdminForm>
  );
}
