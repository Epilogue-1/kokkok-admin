import Dropdown from "@/components/Dropdown";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Title from "@/components/Title";
import InquiryTable from "@/features/InquiryTable";

export default function Inquiries() {
  return (
    <>
      <Header currentNav="문의" />

      <main className="mx-auto w-full max-w-[1240px] px-5 pt-5 pb-[60px]">
        <Title>문의</Title>

        <div className="flex items-end justify-between">
          {/* 필터 */}
          <div className="flex grow items-center gap-5">
            <Filter items={["오류제보", "계정문의", "기능제안", "기타"]} />
            <div className="h-5 w-[1px] bg-gray-300" />
            <Filter items={["-", "무시", "진행중", "완료"]} />
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
          <Pagination />
        </div>
      </main>
    </>
  );
}
