import { TbQuote } from "react-icons/tb";

interface Props {
  writer: string;
  createdAt: string;
  memo: string;
  isLastTimeline?: boolean;
}

export default function TimelineMemo({
  writer,
  createdAt,
  memo,
  isLastTimeline = false,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-5">
        {/* 메모 아이콘 */}
        <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
          <TbQuote className="h-5 w-5 text-gray-600" />
        </div>

        {/* 작성자 & 작성일 */}
        <div className="flex min-h-9 flex-wrap items-center gap-x-2">
          <span>
            <strong className="font-bold">{writer}</strong>님의 메모
          </span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>·</span>
            <span>{createdAt}</span>
          </div>
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
        <p className="flex w-full whitespace-pre-wrap rounded-md bg-gray-100 px-3 py-2">
          {memo}
        </p>
      </div>
    </div>
  );
}
