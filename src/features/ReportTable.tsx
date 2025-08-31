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
        <TableHeadItem className="max-w-[150px] text-center" content="타입" />
        <TableHeadItem className="text-center" content="내용" />
        <TableHeadItem className="max-w-[160px] text-center" content="신고자" />
        <TableHeadItem className="max-w-[150px] text-center" content="신고일" />
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {reports.map((report, index) => (
          <TableRow key={index}>
            <TableRowItem
              className="max-w-[150px] text-center"
              content={report.type}
            />
            <TableRowItem
              className="whitespace-pre-wrap text-left"
              content={report.content}
            />
            <TableRowItem
              className="max-w-[160px] break-all text-center"
              content={report.writerEmail}
            />
            <TableRowItem
              className="max-w-[150px] text-center"
              content={report.reportDate}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
