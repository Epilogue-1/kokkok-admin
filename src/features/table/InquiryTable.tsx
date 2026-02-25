import Link from "next/link";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Inquiry {
  id: string;
  type: "bug_report" | "account" | "feature_request" | "other";
  content: string;
  createdAt: string;
  status: "pending" | "ignored" | "processing" | "resolved";
}
interface Props {
  inquiries: Inquiry[];
}

export default function InquiryTable({ inquiries }: Props) {
  const typeLabel: Record<Inquiry["type"], string> = {
    bug_report: "오류제보",
    account: "계정문의",
    feature_request: "기능제안",
    other: "기타",
  };
  const statusLabel: Record<Inquiry["status"], string> = {
    pending: "-",
    ignored: "무시",
    processing: "진행중",
    resolved: "완료",
  };

  return (
    <div className="w-full border-gray-400">
      {/* 표 머리글 (PC 전용) */}
      <div className="hidden h-9 w-full items-center gap-3 border-gray-400 border-b bg-gray-100 px-3 font-bold text-sm md:flex">
        <div className="w-[100px] text-center">타입</div>
        <div className="flex-1 text-center">내용</div>
        <div className="w-[150px] text-center">작성일</div>
        <div className="w-[100px] text-center">처리 상태</div>
      </div>

      {/* 표 내용 */}
      <div className="flex flex-col border-gray-200 border-t md:border-none">
        {inquiries.map((inquiry) => (
          <Link
            key={inquiry.id}
            href={`/inquiries/${inquiry.id}`}
            className="group flex w-full flex-row items-center justify-between gap-3 border-gray-200 border-b px-2 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 md:h-10 md:px-3 md:py-0"
          >
            <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
                {/* 타입 */}
                <div className="text-gray-500 text-sm leading-none md:w-[100px] md:text-center md:text-base md:text-black">
                  {typeLabel[inquiry.type]}
                </div>

                {/* 내용 */}
                <div className="flex-1 truncate text-left font-medium text-base group-hover:underline md:font-normal">
                  {inquiry.content}
                </div>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap text-gray-500 text-sm md:gap-3 md:text-base md:text-black">
                {/* 작성일 */}
                <div className="md:w-[150px] md:text-center">
                  {formatToKoreanDate(inquiry.createdAt)}
                </div>
              </div>
            </div>

            {/* 처리 상태 */}
            <div className="flex w-13 shrink-0 items-center justify-center md:w-[100px]">
              <span className="whitespace-nowrap rounded-lg bg-gray-100 px-2 py-1 font-semibold text-gray-600 text-sm md:rounded-none md:bg-transparent md:p-0 md:font-normal md:text-base md:text-black">
                {statusLabel[inquiry.status]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
