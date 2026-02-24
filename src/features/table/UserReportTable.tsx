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
          <div
            key={report.reportedUser.id}
            className="flex w-full flex-row items-center justify-between gap-4 border-gray-200 border-b px-3 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 md:h-10 md:py-0"
          >
            <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-3">
              {/* 사용자 */}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/user-reports/${report.reportedUser.id}`}
                  className="block truncate text-left font-medium text-base hover:underline md:font-normal"
                >
                  {`${report.reportedUser.username} (${report.reportedUser.email})`}
                </Link>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm md:text-base md:text-black">
                {/* 신고 수 */}
                <div className="md:w-[80px] md:text-center">
                  <span className="mr-1 inline-block md:hidden">신고 </span>
                  {String(report.reportCount)}
                </div>
                {/* 세로 구분선 (모바일 전용) */}
                <div className="inline-block h-3 w-[1px] bg-gray-300 md:hidden" />
                {/* 최근 신고일 */}
                <div className="md:w-[150px] md:text-center">
                  {formatToKoreanDate(report.lastReportedAt)}
                </div>
              </div>
            </div>

            {/* 처리 상태 */}
            <div className="flex shrink-0 items-center justify-end md:w-[100px] md:justify-center">
              <span className="inline-block whitespace-nowrap rounded-lg bg-gray-100 px-2 py-1 font-semibold text-gray-600 text-sm md:rounded-none md:bg-transparent md:p-0 md:font-normal md:text-base md:text-black">
                {statusLabel[report.reportStatus]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
