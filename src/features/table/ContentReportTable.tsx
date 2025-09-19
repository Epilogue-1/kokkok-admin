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

interface Report {
  content: "post" | "comment";
  reportContentId: string;
  reportContent: string;
  writer: {
    id: string;
    username: string;
    email: string;
  };
  reportCount: number;
  lastReportedAt: string;
  reportStatus: "pending" | "ignored" | "banned";
}
interface Props {
  reports: Report[];
}

export default function ContentReportTable({ reports }: Props) {
  const contentLabel: Record<Report["content"], string> = {
    post: "게시글",
    comment: "댓글",
  };
  const statusLabel: Record<Report["reportStatus"], string> = {
    pending: "-",
    ignored: "기각",
    banned: "제한",
  };

  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="max-w-[60px] text-center">분류</TableHeadItem>
        <TableHeadItem className="text-center">내용</TableHeadItem>
        <TableHeadItem className="max-w-[150px] text-center">
          글쓴이
        </TableHeadItem>
        <TableHeadItem className="max-w-[60px] text-center">
          신고 수
        </TableHeadItem>
        <TableHeadItem className="max-w-[150px] text-center">
          최근 신고일
        </TableHeadItem>
        <TableHeadItem className="max-w-[100px] text-center">
          처리 상태
        </TableHeadItem>
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {reports.map((report) => (
          <TableRow
            key={`${report.content}-${report.reportContentId}`}
            className="hover:bg-gray-50 active:bg-gray-100"
          >
            {/* 분류 */}
            <TableRowItem className="max-w-[60px] text-center">
              {contentLabel[report.content]}
            </TableRowItem>

            {/* 내용: 게시글 글 내용이 없다면 (없음)이라고 표시 */}
            <TableRowItem>
              <Link
                className={`${
                  report.reportContent.length > 0 ? "" : "text-gray-400"
                } line-clamp-1 w-full whitespace-pre-wrap text-left hover:underline`}
                href={`/content-reports/${report.content}/${report.reportContentId}`}
              >
                {report.reportContent.length > 0
                  ? report.reportContent
                  : "(없음)"}
              </Link>
            </TableRowItem>

            {/* 글쓴이 */}
            <TableRowItem className="max-w-[150px] truncate text-center">
              {`${report.writer.username} (${report.writer.email})`}
            </TableRowItem>

            {/* 신고 수 */}
            <TableRowItem className="max-w-[60px] text-center">
              {String(report.reportCount)}
            </TableRowItem>

            {/* 최근 신고일 */}
            <TableRowItem className="max-w-[150px] text-center">
              {formatToKoreanDate(report.lastReportedAt)}
            </TableRowItem>

            {/* 처리 상태 */}
            <TableRowItem className="max-w-[100px] text-center">
              {statusLabel[report.reportStatus]}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
