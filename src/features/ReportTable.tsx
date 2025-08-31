import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";

type ReportType =
  | "부적절한 컨텐츠"
  | "정치·사회적 갈등 유발"
  | "폭력 조장"
  | "광고 및 홍보"
  | "게시글 / 댓글 도배"
  | "기타";
interface Report {
  type: ReportType;
  content: string;
  writerEmail: string;
  reportDate: string;
}

interface Props {
  reports: Report[];
}

export default function ReportTable({ reports }: Props) {
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
        {reports.map((report, index) => (
          <TableRow key={index}>
            {/* 타입 */}
            <TableRowItem className="max-w-[150px] text-center">
              {report.type}
            </TableRowItem>

            {/* 내용 */}
            <TableRowItem className="whitespace-pre-wrap text-left">
              {report.content}
            </TableRowItem>

            {/* 신고자 */}
            <TableRowItem className="max-w-[160px] break-all text-center">
              {report.writerEmail}
            </TableRowItem>

            {/* 신고일 */}
            <TableRowItem className="max-w-[150px] text-center">
              {report.reportDate}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
