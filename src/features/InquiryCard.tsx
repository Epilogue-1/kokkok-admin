import { TbCalendar, TbMail, TbUser } from "react-icons/tb";
import Badge from "@/components/Badge";

interface Props {
  type: string;
  writer: string;
  createdDate: string;
  email: string;
  content: string;
}

export default function InquiryCard({
  type,
  writer,
  createdDate,
  email,
  content,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-2.5 rounded-2xl border border-gray-300 px-4 py-3">
      {/* 문의 타입 */}
      <Badge content={type} />

      {/* 문의 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>

      <div className="flex w-full flex-col items-end justify-end gap-x-5 text-gray-400 md:flex-row">
        {/* 문의자 */}
        <div className="flex min-w-0 items-center gap-1">
          <TbUser className="shrink-0 text-gray-400 text-lg" />
          <span className="truncate">{writer}</span>
        </div>
        {/* 문의 날짜 */}
        <div className="flex min-w-0 items-center gap-1">
          <TbCalendar className="shrink-0 text-gray-400 text-lg" />
          <span className="truncate">{createdDate}</span>
        </div>
        {/* 답장받을 이메일 */}
        <div className="flex min-w-0 items-center gap-1">
          <TbMail className="shrink-0 text-gray-400 text-lg" />
          <span className="truncate">{email}</span>
        </div>
      </div>
    </div>
  );
}
