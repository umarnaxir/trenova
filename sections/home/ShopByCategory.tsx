"use client";

import Image from "next/image";
import {
  Baby,
  Dumbbell,
  ShoppingBag,
  User,
  UserRound,
  Watch,
} from "lucide-react";
import { Container } from "@/components/Container/Container";
import {
  CardContent,
  CardOverlay,
  CategoryCardItem,
  CategoryGrid,
  CategoryIcon,
  CategoryName,
  SectionTitle,
  SectionTitleWrap,
  ShopCategoryRoot,
} from "@/sections/home/ShopByCategory.styles";

const homeCategories = [
  {
    name: "Men",
    href: "/categories/men",
    image: "/products/category-men.jpg",
    icon: User,
  },
  {
    name: "Women",
    href: "/categories/women",
    image: "/products/category-women.jpg",
    icon: UserRound,
  },
  {
    name: "Kids",
    href: "/categories/kids",
    image: "/products/category-kids.jpg",
    icon: Baby,
  },
  {
    name: "Sports",
    href: "/categories/women-activewear",
    image: "/products/women-active-front.jpg",
    icon: Dumbbell,
  },
  {
    name: "Accessories",
    href: "/categories/accessories",
    image: "/products/category-accessories.jpg",
    icon: Watch,
  },
  {
    name: "Bags",
    href: "/categories/bags",
    image: "/products/category-accessories.jpg",
    icon: ShoppingBag,
  },
] as const;

export function ShopByCategory() {
  return (
    <ShopCategoryRoot>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>Shop by Category</SectionTitle>
        </SectionTitleWrap>

        <CategoryGrid>
          {homeCategories.map((category) => {
            const Icon = category.icon;
            return (
              <CategoryCardItem key={category.name} href={category.href}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
                <CardOverlay />
                <CardContent>
                  <CategoryIcon aria-hidden>
                    <Icon strokeWidth={1.75} />
                  </CategoryIcon>
                  <CategoryName>{category.name}</CategoryName>
                </CardContent>
              </CategoryCardItem>
            );
          })}
        </CategoryGrid>
      </Container>
    </ShopCategoryRoot>
  );
}
