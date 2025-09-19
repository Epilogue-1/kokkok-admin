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
  reportedUser: {
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

export default function UserReportTable({ reports }: Props) {
  const statusLabel: Record<Report["reportStatus"], string> = {
    pending: "-",
    ignored: "기각",
    banned: "퇴출",
  };

  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="text-center">사용자</TableHeadItem>
        <TableHeadItem className="max-w-[80px] text-center">
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
            key={report.reportedUser.id}
            className="hover:bg-gray-50 active:bg-gray-100"
          >
            {/* 사용자 */}
            <TableRowItem>
              <Link
                className="flex w-full truncate text-left hover:underline"
                href={`/user-reports/${report.reportedUser.id}`}
              >
                {`${report.reportedUser.username} (${report.reportedUser.email})`}
              </Link>
            </TableRowItem>

            {/* 신고 수 */}
            <TableRowItem className="max-w-[80px] text-center">
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
