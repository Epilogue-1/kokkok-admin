import Dropdown from "@/components/Dropdown";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
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
          <div className="flex grow items-center gap-5">
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
          <Dropdown content="최신순" />
        </div>

        {/* 문의 목록 테이블 */}
        <div className="mt-4">
          <InquiryTable />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-4 flex w-full justify-center">
          <Pagination query={query} total={totalPage} />
        </div>
      </Main>
    </>
  );
}
