import { TbCancel } from "react-icons/tb";

interface Props {
  writer: string;
  createdDate: string;
  isLastTimeline?: boolean;
  memo?: string;
}

export default function TimelineReportDismiss({
  writer,
  createdDate,
  isLastTimeline = false,
  memo,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-5">
        {/* 기각 아이콘 */}
        <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <TbCancel className="h-5 w-5 text-gray-600" />
        </div>

        {/* 작성자 & 작성일 */}
        <div className="flex h-9 items-center gap-2">
          <span>
            <strong className="font-bold">{writer}</strong>님이{" "}
            <strong className="font-bold">신고 기각</strong>
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
