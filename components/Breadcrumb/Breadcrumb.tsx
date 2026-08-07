"use client";

import {
  CrumbCurrent,
  CrumbLink,
  CrumbList,
} from "@/components/Breadcrumb/Breadcrumb.styles";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <CrumbList aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} style={{ display: "contents" }}>
            {index > 0 ? <span aria-hidden>/</span> : null}
            {isLast || !item.href ? (
              <CrumbCurrent aria-current={isLast ? "page" : undefined}>
                {item.label}
              </CrumbCurrent>
            ) : (
              <CrumbLink href={item.href}>{item.label}</CrumbLink>
            )}
          </span>
        );
      })}
    </CrumbList>
  );
}
