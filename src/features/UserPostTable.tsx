import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";

interface Post {
  content: string;
  createdDate: string;
  reportCount: number;
  isRestricted: boolean;
}

const POSTS: Post[] = [
  {
    content:
      "우와~~!!\n이제 글을 올릴 때 공개 범위를 지정할 수 있고 즐겨찾기한 친구가 운동을 하면 내가 알림을 받을 수 있다고??!! (오늘 첫 게시글만 알림 전송)\n당장 업데이트해야지!!!\n하지만 사람들이 친구 공개로만 올린다면 나같은 아싸는 너무나 쓸쓸할거 같아 ㅠㅠ",
    createdDate: "2025년 7월 20일",
    reportCount: 1,
    isRestricted: true,
  },
  {
    content:
      "예하님께 받은 더위를 이겨내는 꿀팁입니다\n실제로 마인드컨트롤은 굉장히 도움이 되는데요\n여름은 더운 게 당연한데 현대인은 에어컨이라는 문명의 이기에 기대어 조금만 더우면 힘들어합니다\n이 사실을 받아들이고 땀날 때마다 “이래야 여름이지”라고 생각하면 견딜만해요\n다들 수분이 충만한 하루 되시길 바라요 💦💦",
    createdDate: "2025년 7월 7일",
    reportCount: 0,
    isRestricted: false,
  },
  {
    content:
      "전주북초등학교에는 저녁마다 남녀노소 모여 회전초밥을 이루는 문화가 있다\n회전초밥은 반시계방향으로 도는 게 규칙이다",
    createdDate: "2025년 6월 26일",
    reportCount: 0,
    isRestricted: false,
  },
  {
    content: "",
    createdDate: "2025년 6월 23일",
    reportCount: 12,
    isRestricted: false,
  },
  {
    content: "다이어트 3921일째\n새벽러닝",
    createdDate: "2025년 6월 11일",
    reportCount: 0,
    isRestricted: false,
  },
];

export default function UserPostTable() {
  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="text-center" content="내용" />
        <TableHeadItem className="max-w-[130px] text-center" content="작성일" />
        <TableHeadItem className="max-w-[80px] text-center" content="신고" />
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {POSTS.map((post, index) => (
          <TableRow key={index}>
            <TableRowItem
              className="text-left line-clamp-1 whitespace-pre-wrap"
              content={`${post.content}`}
            />
            <TableRowItem
              className="max-w-[130px] text-center"
              content={post.createdDate}
            />
            <TableRowItem
              className="max-w-[80px] text-center"
              content={`${post.reportCount}`}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
