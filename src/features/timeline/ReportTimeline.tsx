import { formatToKoreanDate } from "@/utils/formatDate";
import TimelineMemo from "./TimelineMemo";
import TimelineNewReport from "./TimelineNewReport";
import TimelineReport from "./TimelineReport";
import TimelineReportDismiss from "./TimelineReportDismiss";
import TimelineRestrict from "./TimelineRestrict";

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
interface ReportLog {
  id: string;
  createdAt: string;
  occuredAt: string;
  type: "memo" | "ignore" | "ban";
  memo: string;
  reports: Report[];
  user: { name: string; userId: string };
}
interface Props {
  reportLogs: ReportLog[];
  newReports: Report[];
}

export default function ReportTimeline({ reportLogs, newReports }: Props) {
  const hasNewReports = newReports.length > 0;

  return (
    <div className="flex flex-col gap-5">
      {reportLogs.map((log, index) => {
        const isLastTimeline =
          index === reportLogs.length - 1 && !hasNewReports;

        if (log.type === "memo") {
          return (
            <TimelineMemo
              key={log.id}
              writer={log.user.name}
              createdAt={formatToKoreanDate(log.createdAt)}
              memo={log.memo ?? ""}
              isLastTimeline={isLastTimeline}
            />
          );
        }

        if (log.type === "ban") {
          return (
            <TimelineRestrict
              key={log.id}
              writer={log.user.name}
              createdAt={formatToKoreanDate(log.createdAt)}
              memo={log.memo ?? undefined}
              isLastTimeline={isLastTimeline}
            />
          );
        }

        if (log.type === "ignore" && log.reports.length <= 0) {
          return (
            <TimelineReportDismiss
              key={log.id}
              writer={log.user.name}
              createdAt={formatToKoreanDate(log.createdAt)}
              memo={log.memo ?? undefined}
              isLastTimeline={isLastTimeline}
            />
          );
        }

        return (
          <TimelineReport
            key={log.id}
            reports={log.reports}
            isLastTimeline={isLastTimeline}
          />
        );
      })}

      {hasNewReports && (
        <TimelineNewReport reports={newReports} isLastTimeline />
      )}
    </div>
  );
}
