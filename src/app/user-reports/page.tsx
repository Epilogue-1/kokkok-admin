import Dropdown from "@/components/Dropdown";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import Title from "@/components/Title";
import UserReportTable from "@/features/UserReportTable";

export default function UserReports() {
  return (
    <>
      <Header currentNav="사용자 신고" />

      <Main>
        <Title>사용자 신고</Title>

        <div className="flex items-end justify-between">
          {/* 필터 */}
          <Filter items={["-", "기각", "퇴출"]} />

          {/* 정렬 드롭다운 */}
          <Dropdown content="최신순" />
        </div>

        {/* 사용자 신고 목록 테이블 */}
        <div className="mt-4">
          <UserReportTable />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-4 flex w-full justify-center">
          <Pagination />
        </div>
      </Main>
    </>
  );
}
