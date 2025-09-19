import { getInquiries } from "@/api/inquiry";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import Title from "@/components/Title";
import { InquiryTable } from "@/features/table";
import { asArray } from "@/utils/array";

type Type = NonNullable<Parameters<typeof getInquiries>[0]["type"]>[number];
type Status = NonNullable<Parameters<typeof getInquiries>[0]["status"]>[number];
type Sort = Parameters<typeof getInquiries>[0]["sort"];

const PAGE_SIZE = 15;

export default async function Inquiries(props: PageProps<"/inquiries">) {
  const query = await props.searchParams;

  // query에서 값 꺼내기
  const type = asArray(query.type) as Type[];
  const status = asArray(query.status) as Status[];
  const sort = (query.sort as Sort) || "latest";
  const page = query.page ? Number(query.page) : 1;

  const { data: inquiries, total } = await getInquiries({
    type,
    status,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = total === 0 ? 0 : Math.ceil(total / PAGE_SIZE);

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
                { label: "오류제보", value: "bug_report" },
                { label: "계정문의", value: "account" },
                { label: "기능제안", value: "feature_request" },
                { label: "기타", value: "other" },
              ]}
            />
            <div className="h-5 w-[1px] bg-gray-300" />
            <Filter
              query={query}
              queryKey="status"
              items={[
                { label: "-", value: "pending" },
                { label: "무시", value: "ignored" },
                { label: "진행중", value: "processing" },
                { label: "완료", value: "resolved" },
              ]}
            />
          </div>

          {/* 정렬 드롭다운 */}
          <SortDropdown
            items={[
              { label: "최신순", value: "latest" },
              { label: "오래된순", value: "oldest" },
            ]}
          />
        </div>

        {/* 문의 목록 테이블 */}
        <div className="mt-2">
          <InquiryTable inquiries={inquiries} />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-3 flex w-full justify-center">
          <Pagination query={query} total={totalPages} />
        </div>
      </Main>
    </>
  );
}
