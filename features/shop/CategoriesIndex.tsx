"use client";

import Image from "next/image";
import {
  ArrowRight,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smile,
  Sparkles,
  Star,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types/category";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import {
  BenefitCopy,
  BenefitItem,
  BenefitsBar,
  BenefitsGrid,
  BenefitTitle,
  CategoryGrid,
  CategoryTile,
  ExploreCta,
  IconBadge,
  PageHeader,
  PageLead,
  PageTitle,
  TileContent,
  TileDescription,
  TileShade,
  TileTitle,
} from "@/features/shop/CategoriesIndex.styles";

const categoryIcons: Record<string, LucideIcon> = {
  men: Shirt,
  women: ShoppingBag,
  kids: Smile,
  accessories: Headphones,
  "best-sellers": Star,
  "new-arrivals": Sparkles,
};

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    copy: "On all orders above ₹999",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    copy: "14 days return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    copy: "100% secure checkout",
  },
  {
    icon: Headphones,
    title: "Help & Support",
    copy: "We're here to help you",
  },
] as const;

type CategoriesIndexProps = {
  categories: Category[];
};

export function CategoriesIndex({ categories }: CategoriesIndexProps) {
  return (
    <>
      <PageHeader>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Categories" },
          ]}
        />
        <PageTitle>Categories</PageTitle>
        <PageLead>
          Navigate the full Trenova wardrobe architecture.
        </PageLead>
      </PageHeader>

      <CategoryGrid>
        {categories.map((category) => {
          const Icon = categoryIcons[category.slug] ?? Sparkles;
          return (
            <CategoryTile
              key={category.id}
              href={`/categories/${category.slug}`}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <TileShade />
              <TileContent>
                <IconBadge aria-hidden>
                  <Icon strokeWidth={1.6} />
                </IconBadge>
                <TileTitle>{category.name}</TileTitle>
                {category.description ? (
                  <TileDescription>{category.description}</TileDescription>
                ) : null}
                <ExploreCta>
                  Explore
                  <ArrowRight size={11} strokeWidth={2} aria-hidden />
                </ExploreCta>
              </TileContent>
            </CategoryTile>
          );
        })}
      </CategoryGrid>

      <BenefitsBar aria-label="Shopping benefits">
        <BenefitsGrid>
          {benefits.map(({ icon: Icon, title, copy }) => (
            <BenefitItem key={title}>
              <Icon size={18} strokeWidth={1.6} aria-hidden />
              <div>
                <BenefitTitle>{title}</BenefitTitle>
                <BenefitCopy>{copy}</BenefitCopy>
              </div>
            </BenefitItem>
          ))}
        </BenefitsGrid>
      </BenefitsBar>
    </>
  );
}
