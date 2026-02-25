import Link from "next/link";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Report {
  reportedUser: {
    id: string;
    username: string;
    email: string;
  };
  reportCount: number;
  lastReportedAt: string;
  reportStatus: "pending" | "ignored" | "banned";
}
interface Props {
  reports: Report[];
}

export default function UserReportTable({ reports }: Props) {
  const statusLabel: Record<Report["reportStatus"], string> = {
    pending: "-",
    ignored: "기각",
    banned: "퇴출",
  };

  return (
    <div className="w-full border-gray-400">
      {/* 표 머리글 (PC 전용) */}
      <div className="hidden h-9 w-full items-center gap-3 border-gray-400 border-b bg-gray-100 px-3 font-bold text-sm md:flex">
        <div className="flex-1 text-center">사용자</div>
        <div className="w-[80px] text-center">신고 수</div>
        <div className="w-[150px] text-center">최근 신고일</div>
        <div className="w-[100px] text-center">처리 상태</div>
      </div>

      {/* 표 내용 */}
      <div className="flex flex-col border-gray-200 border-t md:border-none">
        {reports.map((report) => (
          <Link
            key={report.reportedUser.id}
            href={`/user-reports/${report.reportedUser.id}`}
            className="group flex w-full flex-row items-center justify-between gap-3 border-gray-200 border-b px-2 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 md:h-10 md:px-3 md:py-0"
          >
            <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-3">
              {/* 사용자 */}
              <div className="flex-1 truncate text-left font-medium text-base group-hover:underline md:font-normal">
                {`${report.reportedUser.username} (${report.reportedUser.email})`}
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm md:gap-3 md:text-base md:text-black">
                {/* 신고 수 */}
                <div className="md:w-[80px] md:text-center">
                  <span className="mr-1 md:hidden">신고 </span>
                  {String(report.reportCount)}
                </div>
                {/* 세로 구분선 (모바일 전용) */}
                <div className="h-3 w-[1px] shrink-0 bg-gray-300 md:hidden" />
                {/* 최근 신고일 */}
                <div className="md:w-[150px] md:text-center">
                  {formatToKoreanDate(report.lastReportedAt)}
                </div>
              </div>
            </div>

            {/* 처리 상태 */}
            <div className="flex w-11 shrink-0 items-center justify-center md:w-[100px]">
              <span className="whitespace-nowrap rounded-lg bg-gray-100 px-2 py-1 font-semibold text-gray-600 text-sm md:rounded-none md:bg-transparent md:p-0 md:font-normal md:text-base md:text-black">
                {statusLabel[report.reportStatus]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
