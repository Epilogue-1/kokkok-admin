import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import Title from "@/components/Title";
import InquiryTable from "@/features/InquiryTable";

export default async function Inquiries(props: PageProps<"/inquiries">) {
  const query = await props.searchParams;

  const totalPage = 13;

  return (
    <>
      <Header currentNav="문의" />

      <Main>
        <Title>문의</Title>

        <div className="flex items-end justify-between">
          {/* 필터 */}
          <div className="flex grow items-center gap-3">
            <Filter
              query={query}
              queryKey="type"
              items={[
                { label: "오류제보", value: "error" },
                { label: "계정문의", value: "account" },
                { label: "기능제안", value: "feature" },
                { label: "기타", value: "etc" },
              ]}
            />
            <div className="h-5 w-[1px] bg-gray-300" />
            <Filter
              query={query}
              queryKey="status"
              items={[
                { label: "-", value: "none" },
                { label: "무시", value: "dismiss" },
                { label: "진행중", value: "processing" },
                { label: "완료", value: "complete" },
              ]}
            />
          </div>

          {/* 정렬 드롭다운 */}
          <SortDropdown
            items={[
              { label: "최신순", value: "latest" },
              { label: "오래된순", value: "oldest" },
              { label: "문의 많은순", value: "most" },
            ]}
          />
        </div>

        {/* 문의 목록 테이블 */}
        <div className="mt-2">
          <InquiryTable />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-3 flex w-full justify-center">
          <Pagination query={query} total={totalPage} />
        </div>
      </Main>
    </>
  );
}
