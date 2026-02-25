import { formatToKoreanDate } from "@/utils/formatDate";

interface Report {
  id: string;
  createdAt: string;
  reportType:
    | "Inappropriate"
    | "Conflict"
    | "Violence"
    | "Ads"
    | "Spam"
    | "Other";
  reportContent: string;
  user: {
    id: string;
    email: string;
  };
}
interface Props {
  reports: Report[];
}

export default function ReportTable({ reports }: Props) {
  const typeLabel: Record<Report["reportType"], string> = {
    Inappropriate: "부적절한 컨텐츠",
    Conflict: "정치·사회적 갈등 유발",
    Violence: "폭력 조장",
    Ads: "광고 및 홍보",
    Spam: "게시글 / 댓글 도배",
    Other: "기타",
  };

  return (
    <div className="w-full min-w-0 border-gray-400">
      {/* 표 머리글 (PC 전용) */}
      <div className="hidden h-9 w-full items-center gap-3 border-gray-400 border-b bg-gray-100 px-3 font-bold text-sm md:flex">
        <div className="w-[150px] text-center">타입</div>
        <div className="flex-1 text-center">내용</div>
        <div className="w-[160px] text-center">신고자</div>
        <div className="w-[150px] text-center">신고일</div>
      </div>

      {/* 표 내용 */}
      <div className="flex flex-col border-gray-200 border-t md:border-none">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex w-full flex-col border-gray-200 border-b px-2 py-2 md:min-h-10 md:flex-row md:items-center md:gap-3 md:px-3 md:py-0"
          >
            {/* 타입 */}
            <div className="text-gray-500 text-sm md:w-[150px] md:text-center md:text-base md:text-black">
              {typeLabel[report.reportType]}
            </div>

            {/* 내용 */}
            <div className="flex-1 text-left text-base">
              {report.reportContent}
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap text-gray-500 text-sm md:gap-3 md:text-base md:text-black">
              {/* 신고자 */}
              <div className="truncate md:w-[160px] md:text-center">
                {report.user.email}
              </div>
              {/* 세로 구분선 (모바일 전용) */}
              <div className="h-3 w-[1px] shrink-0 bg-gray-300 md:hidden" />
              {/* 최근 신고일 */}
              <div className="md:w-[150px] md:text-center">
                {formatToKoreanDate(report.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
