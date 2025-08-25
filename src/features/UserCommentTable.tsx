import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";

interface Comment {
  content: string;
  createdDate: string;
  reportCount: number;
  isRestricted: boolean;
}

const COMMENTS: Comment[] = [
  {
    content: "튼튼발자님 안녕하세요? 물렁발자입니다.",
    createdDate: "2025년 7월 21일",
    reportCount: 0,
    isRestricted: false,
  },
  {
    content: "진짜 초대박이네요 👍",
    createdDate: "2025년 7월 21일",
    reportCount: 2,
    isRestricted: false,
  },
  {
    content: "맞아 그네 타면서 찍었거든 ㅎㅎ",
    createdDate: "2025년 7월 21일",
    reportCount: 0,
    isRestricted: false,
  },
  {
    content: "얏호 전 체 공 개 너무좋아요 😇",
    createdDate: "2025년 7월 21일",
    reportCount: 0,
    isRestricted: false,
  },
  {
    content: "이제 당신이 글을 언제 올리는지 감시할 수 있어요",
    createdDate: "2025년 7월 20일",
    reportCount: 32,
    isRestricted: true,
  },
];

export default function UserCommentTable() {
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
        {COMMENTS.map((comment, index) => (
          <TableRow key={index}>
            <TableRowItem
              className="text-left line-clamp-1 whitespace-pre-wrap"
              content={`${comment.content}`}
            />
            <TableRowItem
              className="max-w-[130px] text-center"
              content={comment.createdDate}
            />
            <TableRowItem
              className="max-w-[80px] text-center"
              content={`${comment.reportCount}`}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
