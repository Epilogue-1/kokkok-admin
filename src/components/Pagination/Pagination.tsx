import IndicatorLink from "./IndicatorLink";
import PageLink from "./PageLink";

type SearchParams = Record<string, string | string[] | undefined>;
interface Props {
  query: SearchParams;
  total: number;
}

const PAGE_SIZE = 5;
const QUERY_KEY = "page";

export default function Pagination({ query, total }: Props) {
  // page query가 존재하지 않다면 현재 페이지는 1로 간주
  const current = Number(query?.[QUERY_KEY] ?? 1);

  const startPage = Math.floor((current - 1) / PAGE_SIZE) * PAGE_SIZE + 1;
  const endPage = Math.min(startPage + 4, total);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => {
    return startPage + i;
  });

  const hasPrevPage = startPage > 1;
  const hasNextPage = endPage < total;

  return (
    <div className="flex gap-3">
      <IndicatorLink
        direction="prev"
        disabled={!hasPrevPage}
        href={{ query: { ...query, [QUERY_KEY]: startPage - 1 } }}
      />

      {pages.map((page) => (
        <PageLink
          key={page}
          active={page === current}
          href={{ query: { ...query, [QUERY_KEY]: page } }}
        >
          {page}
        </PageLink>
      ))}

      <IndicatorLink
        direction="next"
        disabled={!hasNextPage}
        href={{ query: { ...query, [QUERY_KEY]: endPage + 1 } }}
      />
    </div>
  );
}
