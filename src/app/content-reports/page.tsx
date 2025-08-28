import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import Title from "@/components/Title";
import ContentReportTable from "@/features/ContentReportTable";

export default async function ContentReports(
  props: PageProps<"/content-reports">,
) {
  const query = await props.searchParams;

  const totalPage = 13;

  return (
    <>
      <Header currentNav="게시글/댓글 신고" />

      <Main>
        <Title>게시글/댓글 신고</Title>

        <div className="flex items-end">
          {/* 필터 */}
          <div className="flex grow items-center gap-5">
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
                { label: "-", value: "none" },
                { label: "기각", value: "dismiss" },
                { label: "제한", value: "restrict" },
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
        <div className="mt-4">
          <ContentReportTable />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-4 flex w-full justify-center">
          <Pagination query={query} total={totalPage} />
        </div>
      </Main>
    </>
  );
}
