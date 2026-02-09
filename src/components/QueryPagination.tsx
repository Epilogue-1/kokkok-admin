import {
  Pagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "./Pagination";

interface Props {
  total: number;
  query: SearchParams;
  queryKey?: string;
}

const PAGE_GROUP_SIZE = 5; // 페이지를 최대 5개 표시

export default function QueryPagination({
  total,
  query,
  queryKey = "page",
}: Props) {
  // queryKey의 값이 존재하지 않다면 현재 페이지는 1로 간주
  const current = Number(query?.[queryKey] ?? 1);

  const startPage =
    Math.floor((current - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, total);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => {
    return startPage + index;
  });

  const hasPrevPage = startPage > 1;
  const hasNextPage = endPage < total;

  return (
    <Pagination>
      {/* 이전 페이지 그룹 버튼 */}
      <PaginationPrevious
        as="link"
        size="big"
        disabled={!hasPrevPage}
        href={{ query: { ...query, [queryKey]: startPage - 1 } }}
      />

      {/* 페이지 버튼들 */}
      {pages.map((page) => (
        <PaginationPage
          key={page}
          as="link"
          size="big"
          active={page === current}
          href={{ query: { ...query, [queryKey]: page } }}
        >
          {page}
        </PaginationPage>
      ))}

      {/* 다음 페이지 그룹 버튼 */}
      <PaginationNext
        as="link"
        size="big"
        disabled={!hasNextPage}
        href={{ query: { ...query, [queryKey]: endPage + 1 } }}
      />
    </Pagination>
  );
}
