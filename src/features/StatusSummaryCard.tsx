interface Props {
  content: string;
  isTodayUpdated?: boolean;
  count: number;
  color?: "red" | "blue";
}

export default function StatusSummaryCard({
  content,
  isTodayUpdated = false,
  count,
  color = "red",
}: Props) {
  const colorStyle: Record<NonNullable<Props["color"]>, string> = {
    red: "text-red-500",
    blue: "text-blue-500",
  };

  return (
    <div className="flex min-w-0 flex-1 items-center rounded-lg bg-gray-100 px-7 py-4 md:px-9 md:py-6">
      {/* 항목 이름 */}
      <span>{content}</span>

      {/* 오늘 추가된 건이 있다면 New 아이콘 표시 */}
      {isTodayUpdated && (
        <div className="ml-2 flex h-3.5 w-3.5 select-none items-center justify-center rounded-full bg-red-500">
          <span className="font-bold text-[8px] text-white leading-none">
            N
          </span>
        </div>
      )}

      {/* 항목 건수 */}
      <span
        className={`${colorStyle[color]} ml-auto font-bold text-lg md:text-xl`}
      >
        {count}
      </span>
    </div>
  );
}
