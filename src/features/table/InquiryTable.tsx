import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Inquiry {
  id: string;
  type: "bug_report" | "account" | "feature_request" | "other";
  content: string;
  createdAt: string;
  status: "pending" | "ignored" | "processing" | "resolved";
}
interface Props {
  inquiries: Inquiry[];
}

export default function InquiryTable({ inquiries }: Props) {
  const typeLabel: Record<Inquiry["type"], string> = {
    bug_report: "오류제보",
    account: "계정문의",
    feature_request: "기능제안",
    other: "기타",
  };
  const statusLabel: Record<Inquiry["status"], string> = {
    pending: "-",
    ignored: "무시",
    processing: "진행중",
    resolved: "완료",
  };

  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="max-w-[100px] text-center">
          타입
        </TableHeadItem>
        <TableHeadItem className="text-center">내용</TableHeadItem>
        <TableHeadItem className="max-w-[150px] text-center">
          작성일
        </TableHeadItem>
        <TableHeadItem className="max-w-[100px] text-center">
          처리 상태
        </TableHeadItem>
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {inquiries.map((inquiry) => (
          <TableRow
            key={inquiry.id}
            className="hover:bg-gray-50 active:bg-gray-100"
          >
            {/* 타입 */}
            <TableRowItem className="max-w-[100px] text-center">
              {typeLabel[inquiry.type]}
            </TableRowItem>

            {/* 내용 */}
            <TableRowItem>
              <Link
                className="line-clamp-1 w-full whitespace-pre-wrap text-left hover:underline"
                href={`/inquiries/${inquiry.id}`}
              >
                {inquiry.content}
              </Link>
            </TableRowItem>

            {/* 작성일 */}
            <TableRowItem className="max-w-[150px] text-center">
              {formatToKoreanDate(inquiry.createdAt)}
            </TableRowItem>

            {/* 처리 상태 */}
            <TableRowItem className="max-w-[100px] text-center">
              {statusLabel[inquiry.status]}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
