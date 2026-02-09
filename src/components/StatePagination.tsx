"use client";

import {
  Pagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "./Pagination";

interface Props {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5; // 페이지를 최대 5개 표시

export default function StatePagination({
  total,
  current,
  onPageChange,
}: Props) {
  const startPage =
    Math.floor((current - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, total);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => {
    return startPage + index;
  });

  const hasPrevPage = startPage > 1;
  const hasNextPage = endPage < total;

  const handleClickPrev = () => {
    if (!hasPrevPage) return;
    onPageChange(startPage - 1);
  };
  const handleClickNext = () => {
    if (!hasNextPage) return;
    onPageChange(endPage + 1);
  };
  const handleClickPage = (page: number) => {
    onPageChange(page);
  };

  return (
    <Pagination>
      {/* 이전 페이지 그룹 버튼 */}
      <PaginationPrevious
        as="button"
        size="small"
        disabled={!hasPrevPage}
        onClick={handleClickPrev}
      />

      {/* 페이지 버튼들 */}
      {pages.map((page) => (
        <PaginationPage
          key={page}
          as="button"
          size="small"
          active={page === current}
          onClick={() => handleClickPage(page)}
        >
          {page}
        </PaginationPage>
      ))}

      {/* 다음 페이지 그룹 버튼 */}
      <PaginationNext
        as="button"
        size="small"
        disabled={!hasNextPage}
        onClick={handleClickNext}
      />
    </Pagination>
  );
}
