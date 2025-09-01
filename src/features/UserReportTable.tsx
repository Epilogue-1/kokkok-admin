import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";

interface Report {
  userEmail: string;
  userName: string;
  count: number;
  lastReportDate: string;
  status: "-" | "기각" | "퇴출";
}

const REPORTS: Report[] = [
  {
    userEmail: "asdfeccus04@naver.com",
    userName: "준혁학생",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    userEmail: "ciwoejkcv12@datingel.com",
    userName: "ㅁㄴㅇㄹ",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    userEmail: "dsd5p4hn1@privaterelay.appleid.com",
    userName: "고독한 러너",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    userEmail: "399gkejide@motivue.com",
    userName: "ㅁㅁㅁㅁㅁ",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "퇴출",
  },
  {
    userEmail: "5fysn9bvv4@privaterelay.appleid.com",
    userName: "5fysn9bvv4",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    userEmail: "eickdkssx20290@gmail.com",
    userName: "주앙이아빠",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    userEmail: "beicyskd0902@gmail.com",
    userName: "YYY",
    count: 3,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    userEmail: "allcatismine1203@eoilup.com",
    userName: "테스트",
    count: 5,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    userEmail: "gguggu0805@naver.com",
    userName: "꾸꾸",
    count: 12,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    userEmail: "wlkejdje12@naver.com",
    userName: "정민재",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    userEmail: "asdfeccus04cali@gmail.com",
    userName: "Dani California",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    userEmail: "heony704@gmail.com",
    userName: "이승헌",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "퇴출",
  },
  {
    userEmail: "zklxvik12034@ikowat.com",
    userName: "안뇨옹",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    userEmail: "test@test.com",
    userName: "AAAAABBBBBCCCCCDDDDDEEEEEFFFFFGGGGG",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    userEmail: "ryuhw@gmail.com",
    userName: "류혜원",
    count: 7,
    lastReportDate: "2025년 7월 23일",
    status: "퇴출",
  },
];

export default function UserReportTable() {
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
        {REPORTS.map((report, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO: 실제 데이터 반영 시 id key 사용하도록 수정
          <TableRow key={index} className="hover:bg-gray-50 active:bg-gray-100">
            {/* 사용자 */}
            <TableRowItem>
              <Link
                className="flex w-full truncate text-left hover:underline"
                href="/user-reports/123"
              >
                {`${report.userName} (${report.userEmail})`}
              </Link>
            </TableRowItem>

            {/* 신고 수 */}
            <TableRowItem className="max-w-[80px] text-center">
              {String(report.count)}
            </TableRowItem>

            {/* 최근 신고일 */}
            <TableRowItem className="max-w-[150px] text-center">
              {report.lastReportDate}
            </TableRowItem>

            {/* 처리 상태 */}
            <TableRowItem className="max-w-[100px] text-center">
              {report.status}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
