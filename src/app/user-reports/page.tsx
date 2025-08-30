import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import Title from "@/components/Title";
import UserReportTable from "@/features/UserReportTable";

export default async function UserReports(props: PageProps<"/user-reports">) {
  const query = await props.searchParams;

  const totalPage = 13;

  return (
    <>
      <Header currentNav="사용자 신고" />

      <Main>
        <Title>사용자 신고</Title>

        <div className="flex items-end justify-between">
          {/* 필터 */}
          <Filter
            query={query}
            queryKey="status"
            items={[
              { label: "-", value: "none" },
              { label: "기각", value: "dismiss" },
              { label: "퇴출", value: "ban" },
            ]}
          />

          {/* 정렬 드롭다운 */}
          <SortDropdown
            items={[
              { label: "최신순", value: "latest" },
              { label: "오래된순", value: "oldest" },
              { label: "신고 많은순", value: "most" },
            ]}
          />
        </div>

        {/* 사용자 신고 목록 테이블 */}
        <div className="mt-2">
          <UserReportTable />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-3 flex w-full justify-center">
          <Pagination query={query} total={totalPage} />
        </div>
      </Main>
    </>
  );
}
