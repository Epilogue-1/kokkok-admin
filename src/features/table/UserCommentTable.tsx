import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Comment {
  id: string;
  contents: string;
  createdAt: string;
  banned: boolean;
  reports: { count: number }[];
}
interface Props {
  comments: Comment[];
}

export default function UserCommentTable({ comments }: Props) {
  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="text-center">내용</TableHeadItem>
        <TableHeadItem className="max-w-[130px] text-center">
          작성일
        </TableHeadItem>
        <TableHeadItem className="max-w-[80px] text-center">신고</TableHeadItem>
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {comments.map((comment) => (
          <TableRow key={comment.id}>
            {/* 내용 */}
            <TableRowItem className="line-clamp-1 whitespace-pre-wrap text-left">
              {comment.contents}
            </TableRowItem>

            {/* 작성일 */}
            <TableRowItem className="max-w-[130px] text-center">
              {formatToKoreanDate(comment.createdAt)}
            </TableRowItem>

            {/* 신고 */}
            <TableRowItem className="max-w-[80px] text-center">
              {comment.reports[0].count}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
