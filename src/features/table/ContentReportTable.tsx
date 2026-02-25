import Link from "next/link";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Report {
  content: "post" | "comment";
  reportContentId: string;
  reportContent: string;
  writer: {
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

export default function ContentReportTable({ reports }: Props) {
  const contentLabel: Record<Report["content"], string> = {
    post: "게시글",
    comment: "댓글",
  };
  const statusLabel: Record<Report["reportStatus"], string> = {
    pending: "-",
    ignored: "기각",
    banned: "제한",
  };

  return (
    <div className="w-full border-gray-400">
      {/* 표 머리글 (PC 전용) */}
      <div className="hidden h-9 w-full items-center gap-3 border-gray-400 border-b bg-gray-100 px-3 font-bold text-sm md:flex">
        <div className="w-[60px] text-center">분류</div>
        <div className="flex-1 text-center">내용</div>
        <div className="w-[150px] text-center">글쓴이</div>
        <div className="w-[60px] text-center">신고 수</div>
        <div className="w-[150px] text-center">최근 신고일</div>
        <div className="w-[100px] text-center">처리 상태</div>
      </div>

      {/* 표 내용 */}
      <div className="flex flex-col border-gray-200 border-t md:border-none">
        {reports.map((report) => (
          <Link
            key={`${report.content}-${report.reportContentId}`}
            href={`/content-reports/${report.content}/${report.reportContentId}`}
            className="group flex w-full flex-row items-center justify-between gap-3 border-gray-200 border-b px-2 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 md:h-10 md:px-3 md:py-0"
          >
            <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
                {/* 분류 */}
                <div className="text-gray-500 text-sm leading-none md:w-[60px] md:text-center md:text-base md:text-black">
                  {contentLabel[report.content]}
                </div>

                {/* 내용: 게시글 글 내용이 없다면 (없음)이라고 표시 */}
                <div
                  className={`${report.reportContent.length > 0 ? "" : "text-gray-400"} flex-1 truncate text-left font-medium text-base group-hover:underline md:font-normal`}
                >
                  {report.reportContent.length > 0
                    ? report.reportContent
                    : "(없음)"}
                </div>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap text-gray-500 text-sm md:gap-3 md:text-base md:text-black">
                {/* 글쓴이 */}
                <div className="truncate md:w-[150px] md:text-center">
                  {`${report.writer.username} (${report.writer.email})`}
                </div>
                {/* 세로 구분선 (모바일 전용) */}
                <div className="h-3 w-[1px] shrink-0 bg-gray-300 md:hidden" />
                {/* 신고 수 */}
                <div className="md:w-[60px] md:text-center">
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
