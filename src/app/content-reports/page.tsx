import Dropdown from "@/components/Dropdown";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import Title from "@/components/Title";
import ContentReportTable from "@/features/ContentReportTable";

export default function ContentReports() {
  return (
    <>
      <Header currentNav="게시글/댓글 신고" />

      <Main>
        <Title>게시글/댓글 신고</Title>

        <div className="flex items-end">
          {/* 필터 */}
          <div className="flex grow items-center gap-5">
            <Filter items={["게시글", "댓글"]} />
            <div className="h-5 w-[1px] bg-gray-300" />
            <Filter items={["-", "기각", "제한"]} />
          </div>

          {/* 정렬 드롭다운 */}
          <Dropdown content="최신순" />
        </div>

        {/* 게시글/댓글 신고 목록 테이블 */}
        <div className="mt-4">
          <ContentReportTable />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-4 flex w-full justify-center">
          <Pagination />
        </div>
      </Main>
    </>
  );
}
