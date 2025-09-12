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
    <div className="flex flex-col gap-2.5 rounded-2xl border border-gray-300 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* 문의 타입 */}
        <Badge content={type} />

        <div className="flex gap-5 text-gray-600">
          {/* 문의자 */}
          <div className="flex items-center gap-1">
            <TbUser className="text-gray-400 text-lg" />
            <span>{writer}</span>
          </div>
          {/* 문의 날짜 */}
          <div className="flex items-center gap-1">
            <TbCalendar className="text-gray-400 text-lg" />
            <span>{createdDate}</span>
          </div>
          {/* 답장받을 이메일 */}
          <div className="flex items-center gap-1">
            <TbMail className="text-gray-400 text-lg" />
            <span>{email}</span>
          </div>
        </div>
      </div>

      {/* 문의 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}
