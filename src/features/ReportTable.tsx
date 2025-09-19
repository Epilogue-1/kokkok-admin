import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Report {
  id: string;
  createdAt: string;
  reportType:
    | "Inappropriate"
    | "Conflict"
    | "Violence"
    | "Ads"
    | "Spam"
    | "Other";
  reportContent: string;
  user: {
    id: string;
    email: string;
  };
}
interface Props {
  reports: Report[];
}

export default function ReportTable({ reports }: Props) {
  const typeLabel: Record<Report["reportType"], string> = {
    Inappropriate: "부적절한 컨텐츠",
    Conflict: "정치·사회적 갈등 유발",
    Violence: "폭력 조장",
    Ads: "광고 및 홍보",
    Spam: "게시글 / 댓글 도배",
    Other: "기타",
  };

  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="max-w-[150px] text-center">
          타입
        </TableHeadItem>
        <TableHeadItem className="text-center">내용</TableHeadItem>
        <TableHeadItem className="max-w-[160px] text-center">
          신고자
        </TableHeadItem>
        <TableHeadItem className="max-w-[150px] text-center">
          신고일
        </TableHeadItem>
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            {/* 타입 */}
            <TableRowItem className="max-w-[150px] text-center">
              {typeLabel[report.reportType]}
            </TableRowItem>

            {/* 내용 */}
            <TableRowItem className="whitespace-pre-wrap text-left">
              {report.reportContent}
            </TableRowItem>

            {/* 신고자 */}
            <TableRowItem className="max-w-[160px] break-all text-center">
              {report.user.email}
            </TableRowItem>

            {/* 신고일 */}
            <TableRowItem className="max-w-[150px] text-center">
              {formatToKoreanDate(report.createdAt)}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
