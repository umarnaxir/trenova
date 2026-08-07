"use client";

import Image from "next/image";
import type { Category } from "@/types/category";
import {
  CategoryLabel,
  CategoryLink,
} from "@/components/CategoryCard/CategoryCard.styles";
import { Text } from "@/components/Text/Text";

type CategoryCardProps = {
  category: Category;
  href?: string;
};

export function CategoryCard({ category, href }: CategoryCardProps) {
  return (
    <CategoryLink href={href ?? `/categories/${category.slug}`}>
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <CategoryLabel>
        <Text as="h3" variant="h3" color="white">
          {category.name}
        </Text>
        {category.description ? (
          <Text color="gray300" mt={2} fontSize="sm">
            {category.description}
          </Text>
        ) : null}
      </CategoryLabel>
    </CategoryLink>
  );
}
