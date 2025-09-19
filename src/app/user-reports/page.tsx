import { getUserReports } from "@/api/report";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import Title from "@/components/Title";
import { UserReportTable } from "@/features/table";
import { asArray } from "@/utils/array";

type Status = NonNullable<
  Parameters<typeof getUserReports>[0]["status"]
>[number];
type Sort = Parameters<typeof getUserReports>[0]["sort"];

const PAGE_SIZE = 15;

export default async function UserReports(props: PageProps<"/user-reports">) {
  const query = await props.searchParams;

  // query에서 값 꺼내기
  const status = asArray(query.status) as Status[];
  const sort = (query.sort as Sort) || "latest";
  const page = query.page ? Number(query.page) : 1;

  const { data: reports, total } = await getUserReports({
    status,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = total === 0 ? 0 : Math.ceil(total / PAGE_SIZE);

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
              { label: "-", value: "pending" },
              { label: "기각", value: "ignored" },
              { label: "퇴출", value: "banned" },
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
          <UserReportTable reports={reports} />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-3 flex w-full justify-center">
          <Pagination query={query} total={totalPages} />
        </div>
      </Main>
    </>
  );
}
