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
  type: "게시글" | "댓글";
  content: string;
  writerName: string;
  writerEmail: string;
  count: number;
  lastReportDate: string;
  status: "-" | "기각" | "제한";
}

const REPORTS: Report[] = [
  {
    type: "댓글",
    content: "튼튼발자님 안녕하세요? 물렁발자입니다.",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    type: "게시글",
    content:
      "우와~~!!\n이제 글을 올릴 때 공개 범위를 지정할 수 있고 즐겨찾기한 친구가 운동을 하면 내가 알림을 받을 수 있다고??!! (오늘 첫 게시글만 알림 전송)\n당장 업데이트해야지!!!\n하지만 사람들이 친구 공개로만 올린다면 나같은 아싸는 너무나 쓸쓸할거 같아 ㅠㅠ",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    type: "게시글",
    content:
      "예하님께 받은 더위를 이겨내는 꿀팁입니다\n실제로 마인드컨트롤은 굉장히 도움이 되는데요\n여름은 더운 게 당연한데 현대인은 에어컨이라는 문명의 이기에 기대어 조금만 더우면 힘들어합니다\n이 사실을 받아들이고 땀날 때마다 “이래야 여름이지”라고 생각하면 견딜만해요\n다들 수분이 충만한 하루 되시길 바라요 💦💦",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 5,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    type: "게시글",
    content:
      "전주북초등학교에는 저녁마다 남녀노소 모여 회전초밥을 이루는 문화가 있다\n회전초밥은 반시계방향으로 도는 게 규칙이다",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    type: "게시글",
    content: "",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    type: "댓글",
    content: "진짜 초대박이네요 👍",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 3,
    lastReportDate: "2025년 7월 23일",
    status: "제한",
  },
  {
    type: "댓글",
    content: "멋져요",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    type: "게시글",
    content: "러닝 🏃🏻‍♀️\n너무 힘들어요 근육이 다 녹았어요",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "제한",
  },
  {
    type: "댓글",
    content: "그게뭔가요당장알려주세요저급해요",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    type: "게시글",
    content: "다이어트 3921일째\n새벽러닝",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "제한",
  },
  {
    type: "댓글",
    content: "손목을 아껴주세요 60년은 함께할 친구입니다",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 3,
    lastReportDate: "2025년 7월 23일",
    status: "제한",
  },
  {
    type: "게시글",
    content: "",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 2,
    lastReportDate: "2025년 7월 23일",
    status: "기각",
  },
  {
    type: "댓글",
    content: "더위와 싸워 이기셔야 해요",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 7,
    lastReportDate: "2025년 7월 23일",
    status: "제한",
  },
  {
    type: "게시글",
    content:
      "오늘도 오송제 갔다왔어요.\n다리에 병변 뭐시기가 4주째 안사라지는데요.\n의사선생님은 노술 노운동 충분한 수분과 수면이라는 형벌을 내렸어요.\n1~2주 지켰는데 안나아서 그냥 이대로 살려구요.\n정강이 니가 붓기 단단해지기 말고 뭘 할수 있는데.",
    writerName: "5fysn9bvv4",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    count: 1,
    lastReportDate: "2025년 7월 23일",
    status: "-",
  },
  {
    type: "댓글",
    content:
      "지금 페이커의 의견을 궤변이라고 하시는 거에요?? 감당 가능하세요??",
    writerName: "이승헌",
    writerEmail: "heony704@gmail.com",
    count: 12,
    lastReportDate: "2025년 7월 23일",
    status: "제한",
  },
];

export default function ContentReportTable() {
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
        {REPORTS.map((report, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO: 실제 데이터 반영 시 id key 사용하도록 수정
          <TableRow key={index} className="hover:bg-gray-50 active:bg-gray-100">
            {/* 분류 */}
            <TableRowItem className="max-w-[60px] text-center">
              {report.type}
            </TableRowItem>

            {/* 내용: 게시글 글 내용이 없다면 (없음)이라고 표시 */}
            <TableRowItem>
              <Link
                className={`${
                  report.content.length > 0 ? "" : "text-gray-400"
                } line-clamp-1 w-full whitespace-pre-wrap text-left hover:underline`}
                href="/content-reports/123"
              >
                {report.content.length > 0 ? report.content : "(없음)"}
              </Link>
            </TableRowItem>

            {/* 글쓴이 */}
            <TableRowItem className="max-w-[150px] truncate text-center">
              {`${report.writerName} (${report.writerEmail})`}
            </TableRowItem>

            {/* 신고 수 */}
            <TableRowItem className="max-w-[60px] text-center">
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
