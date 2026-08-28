"use client";

import {
  PageButton,
  PaginationRoot,
} from "@/components/Pagination/Pagination.styles";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <PaginationRoot aria-label="Pagination">
      <PageButton
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        Prev
      </PageButton>
      {Array.from({ length: totalPages }).map((_, index) => {
        const value = index + 1;
        return (
          <PageButton
            key={value}
            type="button"
            $active={value === page}
            onClick={() => onChange(value)}
            aria-label={`Page ${value}`}
            aria-current={value === page ? "page" : undefined}
          >
            {value}
          </PageButton>
        );
      })}
      <PageButton
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        Next
      </PageButton>
    </PaginationRoot>
  );
}
