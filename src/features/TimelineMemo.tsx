import { TbQuote } from "react-icons/tb";

interface Props {
  author: string;
  createdDate: string;
  memo: string;
  isLastTimeline?: boolean;
}

export default function TimelineMemo({
  author,
  createdDate,
  memo,
  isLastTimeline = false,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-5">
        {/* 메모 아이콘 */}
        <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <TbQuote className="h-5 w-5 text-gray-600" />
        </div>

        {/* 작성자 & 작성일 */}
        <div className="flex h-9 items-center gap-2">
          <span>
            <strong className="font-bold">{author}</strong>님의 메모
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
        <p className="flex w-full whitespace-pre-wrap rounded-md bg-gray-100 px-3 py-2">
          {memo}
        </p>
      </div>
    </div>
  );
}
