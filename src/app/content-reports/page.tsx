import { getContentReports } from "@/api/contentReport";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import Title from "@/components/Title";
import ContentReportTable from "@/features/ContentReportTable";
import { asArray } from "@/utils/array";

type Content = NonNullable<
  Parameters<typeof getContentReports>[0]["content"]
>[number];
type Status = NonNullable<
  Parameters<typeof getContentReports>[0]["status"]
>[number];
type Sort = Parameters<typeof getContentReports>[0]["sort"];

const PAGE_SIZE = 15;

export default async function ContentReports(
  props: PageProps<"/content-reports">,
) {
  const query = await props.searchParams;

  // query에서 값 꺼내기
  const content = asArray(query.content) as Content[];
  const status = asArray(query.status) as Status[];
  const sort = (query.sort as Sort) || "latest";
  const page = query.page ? Number(query.page) : 1;

  const { data: reports, total } = await getContentReports({
    content,
    status,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = total === 0 ? 0 : Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <Header currentNav="게시글/댓글 신고" />

      <Main>
        <Title>게시글/댓글 신고</Title>

        <div className="flex items-end">
          {/* 필터 */}
          <div className="flex grow items-center gap-3">
            <Filter
              query={query}
              queryKey="content"
              items={[
                { label: "게시글", value: "post" },
                { label: "댓글", value: "comment" },
              ]}
            />
            <div className="h-5 w-[1px] bg-gray-300" />
            <Filter
              query={query}
              queryKey="status"
              items={[
                { label: "-", value: "pending" },
                { label: "기각", value: "ignored" },
                { label: "제한", value: "banned" },
              ]}
            />
          </div>

          {/* 정렬 드롭다운 */}
          <SortDropdown
            items={[
              { label: "최신순", value: "latest" },
              { label: "오래된순", value: "oldest" },
              { label: "신고 많은순", value: "most" },
            ]}
          />
        </div>

        {/* 게시글/댓글 신고 목록 테이블 */}
        <div className="mt-2">
          <ContentReportTable reports={reports} />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-3 flex w-full justify-center">
          <Pagination query={query} total={totalPages} />
        </div>
      </Main>
    </>
  );
}
