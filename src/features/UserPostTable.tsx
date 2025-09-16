import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";
import { formatToKoreanDate } from "@/utils/formatDate";

interface Post {
  id: string;
  contents: string;
  createdAt: string;
  banned: boolean;
  reports: { count: number }[];
}
interface Props {
  posts: Post[];
}

export default function UserPostTable({ posts }: Props) {
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
        {posts.map((post) => (
          <TableRow key={post.id}>
            {/* 내용: 게시글 글 내용이 없다면 (없음)이라고 표시 */}
            <TableRowItem
              className={`${
                post.contents.length > 0 ? "" : "text-gray-400"
              } line-clamp-1 whitespace-pre-wrap text-left`}
            >
              {post.contents.length > 0 ? post.contents : "(없음)"}
            </TableRowItem>

            {/* 작성일 */}
            <TableRowItem className="max-w-[130px] text-center">
              {formatToKoreanDate(post.createdAt)}
            </TableRowItem>

            {/* 신고*/}
            <TableRowItem className="max-w-[80px] text-center">
              {post.reports[0].count}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
