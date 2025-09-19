import { TbUrgent } from "react-icons/tb";
import ReportTable from "@/features/ReportTable";
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
  isLastTimeline?: boolean;
}

export default function TimelineNewReport({
  reports,
  isLastTimeline = false,
}: Props) {
  const reportCount = reports.length;

  const firstReportedAt = reports[0].createdAt;
  const lastReportedAt = reports[reports.length - 1].createdAt;
  const reportDateString =
    reports.length > 1
      ? `${formatToKoreanDate(firstReportedAt)} - ${formatToKoreanDate(lastReportedAt)}`
      : formatToKoreanDate(firstReportedAt);

  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-5">
        {/* 신고 아이콘 */}
        <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <TbUrgent className="h-5 w-5 text-gray-600" />
        </div>

        {/* 신고 개수 & 신고 기간 & 신고 상태 뱃지 */}
        <div className="flex h-9 items-center gap-2">
          <span>
            <strong className="font-bold">{reportCount}</strong>개의{" "}
            <strong className="font-bold">새로운 신고</strong>
          </span>

          <span className="text-gray-600">·</span>
          <span className="text-gray-600">{reportDateString}</span>
        </div>
      </div>

      <div className="flex gap-5 pt-2">
        {/* 타임라인 선 */}
        <div className="flex w-9 justify-center">
          {!isLastTimeline && (
            <div className="-translate-y-7 h-[calc(100%+64px)] w-[1px] bg-gray-200" />
          )}
        </div>

        {/* 신고 목록 테이블 */}
        <ReportTable reports={reports} />
      </div>
    </div>
  );
}
