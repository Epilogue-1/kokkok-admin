import { TbRepeat } from "react-icons/tb";

type InquiryState = "-" | "무시" | "진행중" | "완료";
interface Props {
  author: string;
  createdDate: string;
  from?: InquiryState;
  to: InquiryState;
  memo?: string;
  isLastTimeline?: boolean;
}

// 상태 변경 타임라인은 문의에서만 사용됨
export default function TimelineStatusChange({
  author,
  createdDate,
  from,
  to,
  memo,
  isLastTimeline = false,
}: Props) {
  const stateChangeString = from ? `${from} → ${to}` : to;

  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-5">
        {/* 상태 변경 아이콘 */}
        <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <TbRepeat className="h-5 w-5 text-gray-600" />
        </div>

        {/* 작성자 & 상태 변경 내용 & 작성일 */}
        <div className="flex h-9 items-center gap-2">
          <span>
            <strong className="font-bold">{author}</strong>님이 상태 변경:{" "}
            <strong className="font-bold">{stateChangeString}</strong>
          </span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-600">{createdDate}</span>
        </div>
      </div>

      <div className="flex gap-5 pt-2">
        {/* 타임라인 선 */}
        <div className="flex w-9 justify-center">
          {!isLastTimeline && (
            <div className="-translate-y-7 h-[calc(100%+64px)] w-[1px] bg-gray-200" />
          )}
        </div>

        {/* 메모 */}
        {memo && (
          <p className="flex w-full whitespace-pre-wrap rounded-md bg-gray-100 px-3 py-2">
            {memo}
          </p>
        )}
      </div>
    </div>
  );
}
