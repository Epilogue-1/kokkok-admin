import { formatToKoreanDate } from "@/utils/formatDate";

interface Comment {
  id: string;
  contents: string;
  createdAt: string;
  banned: boolean;
  reports: { count: number }[];
}
interface Props {
  comments: Comment[];
}

export default function UserCommentTable({ comments }: Props) {
  return (
    <div className="w-full border-gray-400">
      {/* 표 머리글 (PC 전용) */}
      <div className="hidden h-9 w-full items-center gap-3 border-gray-400 border-b bg-gray-100 px-3 font-bold text-sm md:flex">
        <div className="flex-1 text-center">내용</div>
        <div className="w-[130px] text-center">작성일</div>
        <div className="w-[80px] text-center">신고 수</div>
      </div>

      {/* 표 내용 */}
      <div className="flex flex-col border-gray-200 border-t md:border-none">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="group flex w-full flex-row items-center justify-between gap-3 border-gray-200 border-b px-2 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 md:h-10 md:px-3 md:py-0"
          >
            <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-3">
              {/* 내용 */}
              <div className="flex-1 truncate text-left font-normal text-base">
                {comment.contents}
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap text-gray-500 text-sm md:gap-3 md:text-base md:text-black">
                {/* 작성일 */}
                <div className="md:w-[130px] md:text-center">
                  {formatToKoreanDate(comment.createdAt)}
                </div>
                {/* 세로 구분선 (모바일 전용) */}
                <div className="h-3 w-[1px] shrink-0 bg-gray-300 md:hidden" />
                {/* 신고 수 */}
                <div className="md:w-[80px] md:text-center">
                  <span className="mr-1 md:hidden">신고 </span>
                  {String(comment.reports[0].count)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
