import Badge from "@/components/Badge";

type InquiryType = "오류제보" | "계정문의" | "기능제안" | "기타";
interface Props {
  type: InquiryType;
  writer: string;
  createdDate: string;
  content: string;
}

export default function InquiryCard({
  type,
  writer,
  createdDate,
  content,
}: Props) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-gray-300 px-5 py-4">
      <div className="flex items-center justify-between">
        {/* 문의 타입 */}
        <Badge content={type} />

        {/* 문의자 & 문의일 */}
        <div className="flex gap-2.5 text-gray-600">
          <span>{writer}</span>
          <span>·</span>
          <span>{createdDate}</span>
        </div>
      </div>

      {/* 문의 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}
