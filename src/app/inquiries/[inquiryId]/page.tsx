import { getInquiryById } from "@/api/inquiry";
import Badge from "@/components/Badge";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import InquiryCard from "@/features/InquiryCard";
import ProcessForm from "@/features/ProcessForm";
import TimelineMemo from "@/features/TimelineMemo";
import TimelineStatusChange from "@/features/TimelineStatusChange";
import { formatToKoreanDate } from "@/utils/formatDate";

export default async function InquiryDetail(
  props: PageProps<"/inquiries/[inquiryId]">,
) {
  const { inquiryId } = await props.params;
  const { data: inquiry } = await getInquiryById(inquiryId);

  const statusLabel = {
    pending: "-",
    ignored: "무시",
    processing: "진행중",
    resolved: "완료",
  };
  const typeLabel = {
    bug_report: "오류제보",
    account: "계정문의",
    feature_request: "기능제안",
    other: "기타",
  };

  return (
    <>
      <Header currentNav="문의" />

      <Main>
        <div className="flex items-end justify-between">
          <Title>문의</Title>

          {/* 문의 상태 */}
          <Badge
            className="mb-3"
            variant="outline"
            size="large"
            content={statusLabel[inquiry.status]}
          />
        </div>

        <div className="flex flex-col gap-6">
          {/* 문의 내용 */}
          <InquiryCard
            type={typeLabel[inquiry.type]}
            writer={`${inquiry.user.username} (${inquiry.user.email})`}
            createdDate={formatToKoreanDate(inquiry.createdAt)}
            email={inquiry.email ?? "-"}
            content={inquiry.content}
          />

          {/* 문의 이력 */}
          <section>
            <SubTitle>문의 이력</SubTitle>

            <div className="flex flex-col gap-5">
              <TimelineMemo
                writer="유예하"
                createdDate="2025년 1월 20일"
                memo="2025/01/20 회의 결과, 진행하기로 결정"
              />
              <TimelineStatusChange
                writer="정민재"
                createdDate="2025년 2월 2일"
                to="진행중"
              />
              <TimelineMemo
                writer="정민재"
                createdDate="2025년 2월 2일"
                memo={`깃허브 이슈: https://github.com/Epilogue-1/kokkok/issues/176`}
              />
              <TimelineStatusChange
                writer="장준혁"
                createdDate="2025년 5월 24일"
                from="진행중"
                to="완료"
                isLastTimeline
              />
            </div>
          </section>

          {/* 문의 처리 */}
          <section>
            <SubTitle>문의 처리</SubTitle>

            <ProcessForm />
          </section>
        </div>
      </Main>
    </>
  );
}
