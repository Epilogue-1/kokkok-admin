import { formatToKoreanDate } from "@/utils/formatDate";
import TimelineMemo from "./TimelineMemo";
import TimelineStatusChange from "./TimelineStatusChange";

type InquiryType = "memo" | "statusChange";
type Status = "pending" | "ignored" | "processing" | "resolved";
interface Inquiry {
  id: number;
  createdAt: string;
  inquiryId: string;
  type: InquiryType;
  memo: string | null;
  prevStatus: Status | null;
  nextStatus: Status | null;
  user: {
    userId: string;
    name: string;
  };
}
interface Props {
  inquiries: Inquiry[];
}

export default function InquiryTimeline({ inquiries }: Props) {
  const statusLabel = {
    pending: "-",
    ignored: "무시",
    processing: "진행중",
    resolved: "완료",
  };

  return (
    <div className="flex flex-col gap-5">
      {inquiries.map((log, index) => {
        const isLastTimeline = index === inquiries.length - 1;

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

        return (
          <TimelineStatusChange
            key={log.id}
            writer={log.user.name}
            createdAt={formatToKoreanDate(log.createdAt)}
            from={log.prevStatus ? statusLabel[log.prevStatus] : ""}
            to={log.nextStatus ? statusLabel?.[log.nextStatus] : ""}
            memo={log.memo ?? undefined}
            isLastTimeline={isLastTimeline}
          />
        );
      })}
    </div>
  );
}
