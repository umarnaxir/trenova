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
import { CATEGORY_IMAGES } from "@/constants/categoryImages";
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
    image: CATEGORY_IMAGES.men,
    icon: User,
  },
  {
    name: "Women",
    href: "/categories/women",
    image: CATEGORY_IMAGES.women,
    icon: UserRound,
  },
  {
    name: "Kids",
    href: "/categories/kids",
    image: CATEGORY_IMAGES.kids,
    icon: Baby,
  },
  {
    name: "Sports",
    href: "/categories/women-activewear",
    image: CATEGORY_IMAGES.sports,
    icon: Dumbbell,
  },
  {
    name: "Accessories",
    href: "/categories/accessories",
    image: CATEGORY_IMAGES.accessories,
    icon: Watch,
  },
  {
    name: "Bags",
    href: "/categories/bags",
    image: CATEGORY_IMAGES.bags,
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
                  sizes="(max-width: 1024px) 33vw, 16vw"
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
