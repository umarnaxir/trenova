"use client";

import {
  PageButton,
  PaginationBar,
  PaginationControls,
  PaginationMeta,
} from "@/features/admin/AdminPagination.styles";

export const ADMIN_PAGE_SIZE = 15;

type AdminPaginationProps = {
  page: number;
  pageSize?: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function AdminPagination({
  page,
  pageSize = ADMIN_PAGE_SIZE,
  total,
  onPageChange,
}: AdminPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (total <= pageSize) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationBar>
      <PaginationMeta>
        Showing {start}–{end} of {total}
      </PaginationMeta>
      <PaginationControls>
        <PageButton
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          Prev
        </PageButton>
        {pages.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            type="button"
            $active={pageNumber === page}
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </PageButton>
        ))}
        <PageButton
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          Next
        </PageButton>
      </PaginationControls>
    </PaginationBar>
  );
}

export function paginateItems<T>(items: T[], page: number, pageSize = ADMIN_PAGE_SIZE) {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
