import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableRow,
  TableRowItem,
} from "@/components/Table";

interface Report {
  type: "오류제보" | "계정문의" | "기능제안" | "기타";
  content: string;
  createdDate: string;
  status: "-" | "무시" | "진행중" | "완료";
}

const REPORTS: Report[] = [
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
        <TableHeadItem className="max-w-[100px] text-center" content="타입" />
        <TableHeadItem className="text-center" content="내용" />
        <TableHeadItem className="max-w-[150px] text-center" content="작성일" />
        <TableHeadItem
          className="max-w-[100px] text-center"
          content="처리 상태"
        />
      </TableHead>

      {/* 표 내용 */}
      <TableBody>
        {REPORTS.map((report, index) => (
          <TableRow key={index}>
            <TableRowItem
              className="max-w-[100px] text-center"
              content={report.type}
            />
            <TableRowItem
              className="line-clamp-1 whitespace-pre-wrap text-left"
              content={report.content}
            />
            <TableRowItem
              className="max-w-[150px] text-center"
              content={report.createdDate}
            />
            <TableRowItem
              className="max-w-[100px] text-center"
              content={report.status}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
