import Badge from "@/components/Badge";
import Header from "@/components/Header";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import CommentCard from "@/features/CommentCard";
import ProcessForm from "@/features/ProcessForm";
import TimelineMemo from "@/features/TimelineMemo";
import TimelineNewReport from "@/features/TimelineNewReport";
import TimelineReportDismiss from "@/features/TimelineReportDismiss";
import TimelineRestrict from "@/features/TimelineRestrict";

type ReportType =
  | "부적절한 컨텐츠"
  | "정치·사회적 갈등 유발"
  | "폭력 조장"
  | "광고 및 홍보"
  | "게시글 / 댓글 도배"
  | "기타";
interface Report {
  type: ReportType;
  content: string;
  writerEmail: string;
  reportDate: string;
}

const REPORTS_1: Report[] = [
  {
    type: "부적절한 컨텐츠",
    content: "사진이 이상해요..",
    writerEmail: "test@test.com",
    reportDate: "2024년 12월 19일",
  },
  {
    type: "정치·사회적 갈등 유발",
    content:
      "정치 얘기 끌고 와서 싸움 붙이려는 글을 계속 올려요. 아무 상관없는 게시판에도 그런 말 적고 분위기 망칩니다. 일부러 분란 일으키려는 거 같아요.",
    writerEmail: "1ds6k21n7@privaterelay.appleid.com",
    reportDate: "2025년 1월 1일",
  },
  {
    type: "폭력 조장",
    content:
      "댓글에다 대놓고 ‘어디서 보이면 한 대 치겠다’는 식으로 쓰는데, 이런 거 보고도 가만히 있어야 하나요? 보는 사람 입장에선 무섭고 불쾌해요.",
    writerEmail: "heony704@gmail.com",
    reportDate: "2025년 3월 18일",
  },
  {
    type: "광고 및 홍보",
    content:
      "계속 이상한 링크 보내고 광고 댓글 달고 진짜 너무 짜증나요. 차단해도 또 오고 또 오고, 도저히 못 참겠어요. 운영진이 좀 제재 좀 해주세요 제발.",
    writerEmail: "1213widm70@naver.com",
    reportDate: "2025년 3월 18일",
  },
  {
    type: "게시글 / 댓글 도배",
    content:
      "하루에도 몇 번씩 같은 사진 올리고, 혼자 떠들고 진짜 피곤해요. 커뮤니티를 자기 일기장처럼 쓰는데 이건 아니잖아요? 신고 여러 번 들어갔을 텐데 왜 아직도 있나요? 이 사람 안 없어지면 제가 나갑니다. 처리 꼭 부탁드립니다.",
    writerEmail: "ryu22@gmail.com",
    reportDate: "2025년 6월 2일",
  },
  {
    type: "기타",
    content:
      "아니 대체 왜 저한테 시비 거는 건데요? 처음부터 말투가 비꼬는 식이고 완전 무례했어요. 이런 사람 계속 두면 다른 사람들도 피해봅니다.",
    writerEmail: "5fysn9bvv4@privaterelay.appleid.com",
    reportDate: "2025년 6월 29일",
  },
  {
    type: "기타",
    content: "특정 사용자에 대한 근거 없는 비방을 계속 올립니다.",
    writerEmail: "heony704@gmail.com",
    reportDate: "2025년 7월 22일",
  },
];

const REPORTS_2: Report[] = [
  {
    type: "기타",
    content:
      "자꾸 밤길 조심하라고 협박 댓글을 달아요. 이 사람 어떻게 좀 해주세요.",
    writerEmail: "1997heony704@gmail.com",
    reportDate: "2025년 7월 23일",
  },
];

export default function ContentReportDetail() {
  const contentType: "게시글" | "댓글" = "댓글";

  const isRestricted = true;

  return (
    <>
      <Header currentNav="게시글/댓글 신고" />

      <main className="mx-auto w-full max-w-[1240px] px-5 pt-5 pb-[60px]">
        <div className="flex items-center justify-between">
          <Title>
            {contentType === "게시글" ? "게시글 신고" : "댓글 신고"}
          </Title>

          {/* 제한된 신고라면 표시 */}
          {isRestricted && (
            <Badge className="mb-5" variant="destructive" content="제한됨" />
          )}
        </div>

        <div className="flex flex-col gap-10">
          {/* 게시글/댓글 내용 */}
          {contentType === "게시글" ? (
            <div>게시글 카드</div>
          ) : (
            <CommentCard
              authorAvatarSrc="/tmp/profile_avatar.jpg"
              author="이승헌 (heony704@gmail.com)"
              createdDate="2025년 1월 2일"
              content="유튜브 쇼츠 댓글창에서 누가 “내란견 배급견 누구 뽑음?” 이런 분탕 댓글을 도배했는데요. “니 이빨 뽑음” 이라는 대댓이 마음에 들었습니다."
            />
          )}

          {/* 신고 이력 */}
          <section>
            <SubTitle>신고 이력</SubTitle>

            <div className="flex flex-col gap-5">
              <TimelineNewReport reports={REPORTS_1} isDismissed />
              <TimelineMemo
                author="이승헌"
                createdDate="2025년 7월 22일"
                memo={`이상한 댓글 아니에요!!!!\n안녕하세요 :)`}
              />
              <TimelineReportDismiss
                author="이승헌"
                createdDate="2025년 7월 22일"
              />
              <TimelineNewReport reports={REPORTS_2} />
              <TimelineRestrict
                author="유예하"
                createdDate="2025년 7월 24일"
                memo="회의 결과 만장일치 제한 결정"
                isLastTimeline
              />
            </div>
          </section>

          {/* 신고 처리 */}
          <section>
            <SubTitle>신고 처리</SubTitle>

            <ProcessForm />
          </section>
        </div>
      </main>
    </>
  );
}
