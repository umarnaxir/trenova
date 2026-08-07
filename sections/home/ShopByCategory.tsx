"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/category";
import { Container } from "@/components/Container/Container";
import {
  CardContent,
  CardOverlay,
  CategoryCardItem,
  CategoryGrid,
  CategoryName,
  SaleButton,
  SaleCardItem,
  SaleSubtitle,
  SaleTitle,
  SectionTitle,
  SectionTitleWrap,
  ShopCategoryRoot,
  ShopNowLink,
} from "@/sections/home/ShopByCategory.styles";

export function ShopByCategory({ categories }: { categories: Category[] }) {
  const displayCategories = categories.slice(0, 4);

  return (
    <ShopCategoryRoot>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>SHOP BY CATEGORY</SectionTitle>
        </SectionTitleWrap>

        <CategoryGrid>
          {displayCategories.map((category) => (
            <CategoryCardItem key={category.id} href={`/categories/${category.slug}`}>
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
              />
              <CardOverlay />
              <CardContent>
                <CategoryName>{category.name}</CategoryName>
                <ShopNowLink>
                  SHOP NOW <ArrowRight size={14} />
                </ShopNowLink>
              </CardContent>
            </CategoryCardItem>
          ))}

          <SaleCardItem>
            <SaleTitle>SALE</SaleTitle>
            <SaleSubtitle>UP TO 50% OFF</SaleSubtitle>
            <SaleButton href="/categories/sale">
              SHOP SALE <ArrowRight size={14} />
            </SaleButton>
          </SaleCardItem>
        </CategoryGrid>
      </Container>
    </ShopCategoryRoot>
  );
}

