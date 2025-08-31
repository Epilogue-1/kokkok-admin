import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";

interface Inquiry {
  type: "오류제보" | "계정문의" | "기능제안" | "기타";
  content: string;
  createdDate: string;
  status: "-" | "무시" | "진행중" | "완료";
}

const INQUIRIES: Inquiry[] = [
  {
    type: "기능제안",
    content: "운동을 할 때마다 응원의 메세지가 음성으로 나왔으면 좋겠어요.",
    createdDate: "2025년 7월 14일",
    status: "진행중",
  },
  {
    type: "오류제보",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "-",
  },
  {
    type: "기타",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "무시",
  },
  {
    type: "계정문의",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "-",
  },
  {
    type: "계정문의",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "-",
  },
  {
    type: "오류제보",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "무시",
  },
  {
    type: "기타",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "진행중",
  },
  {
    type: "기능제안",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "무시",
  },
  {
    type: "계정문의",
    content: "비밀번호를 바꾸고 싶어요.",
    createdDate: "2025년 7월 10일",
    status: "-",
  },
  {
    type: "오류제보",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "무시",
  },
  {
    type: "기타",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "완료",
  },
  {
    type: "기타",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "-",
  },
  {
    type: "계정문의",
    content: "계정 이메일 바꾸고 싶은데 가능한가요??",
    createdDate: "2025년 7월 10일",
    status: "-",
  },
  {
    type: "오류제보",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "진행중",
  },
  {
    type: "기능제안",
    content:
      "댓글 삭제가 안돼요 ㅠㅠㅠㅠㅠㅠ 왜이러나요?? 아이폰 13 미니입니다.",
    createdDate: "2025년 7월 10일",
    status: "완료",
  },
];

export default function InquiryTable() {
  return (
    <Table>
      {/* 표 머리글 */}
      <TableHead>
        <TableHeadItem className="max-w-[100px] text-center">
          타입
        </TableHeadItem>
        <TableHeadItem className="text-center">내용</TableHeadItem>
        <TableHeadItem className="max-w-[150px] text-center">
          작성일
        </TableHeadItem>
        <TableHeadItem className="max-w-[100px] text-center">
          처리 상태
        </TableHeadItem>
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {INQUIRIES.map((inquiry, index) => (
          <TableRow key={index} className="hover:bg-gray-50 active:bg-gray-100">
            {/* 타입 */}
            <TableRowItem className="max-w-[100px] text-center">
              {inquiry.type}
            </TableRowItem>

            {/* 내용 */}
            <TableRowItem>
              <Link
                className="line-clamp-1 w-full whitespace-pre-wrap text-left hover:underline"
                href={"/inquiries/123"}
              >
                {inquiry.content}
              </Link>
            </TableRowItem>

            {/* 작성일 */}
            <TableRowItem className="max-w-[150px] text-center">
              {inquiry.createdDate}
            </TableRowItem>

            {/* 처리 상태 */}
            <TableRowItem className="max-w-[100px] text-center">
              {inquiry.status}
            </TableRowItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
